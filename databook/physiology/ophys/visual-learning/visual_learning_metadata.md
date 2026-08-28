---
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.19.5
kernelspec:
  display_name: Python 3 (ipykernel)
  language: python
  name: query
---

# Visual Learning session metadata

The metadata for every Visual Learning session lives in the AIND document
database (docDB). This page queries docDB and assembles a dataframe with one row
per session, carrying the mouse, the session type, the acquisition date, the
imaging planes and their depths, and the z-drift QC result.

That dataframe is the thing to take away. It is what the Visual Learning
tutorials use to choose sessions, and the same query can be adapted to pull
whatever other fields an analysis needs. Writing it to a CSV, at the end of this
page, is a convenience rather than the goal.

## Setup

```{code-cell} ipython3
import re
import time
from datetime import datetime

import numpy as np
import pandas as pd

pd.set_option('display.width', 220)
pd.set_option('display.max_columns', 40)
```

```{code-cell} ipython3
from aind_data_access_api.document_db import MetadataDbClient

API_GATEWAY_HOST = "api.allenneuraldynamics.org"
OUTPUT_DIR = '/data/metadata'
DATABASE = 'metadata_index'
COLLECTION = 'data_assets'

docdb_api_client = MetadataDbClient(
   host=API_GATEWAY_HOST,
   version="v2",
   database=DATABASE,
   collection=COLLECTION,
)
print(docdb_api_client._base_url)
```

```{code-cell} ipython3
# The cohort is defined by subject: five different project_name values are
# interleaved across the same six mice.
VISUAL_LEARNING_MICE = ['782149', '790322', '788406', '800792', '800995', '804363']

# Assets are selected by modality rather than by a pattern on the asset name.
# 'pophys' is planar optical physiology, the modality for multiplane ophys.
MODALITY = 'pophys'

# Processed asset names end in _processed_<date>_<time>. Anchoring at end-of-string
# drops further-derived assets (behavior-nwb, cortical-zstack, coreg, ROICat) that
# carry _processed_ mid-name.
PROCESSED_PATTERN = (r'^multiplane-ophys_\d+_\d{4}-\d{2}-\d{2}_[\d-]+'
                     r'_processed_\d{4}-\d{2}-\d{2}_[\d-]+$')

# The QC request sends one asset name per document, so the whole cohort at once
# exceeds the gateway's header limit -- fetch it in batches.
BATCH = 40
```

## Query

```{code-cell} ipython3
aggregate = [
  {
    "$match": {
      "data_description.subject_id": {"$in": VISUAL_LEARNING_MICE},
      "data_description.modalities.abbreviation": MODALITY,
      # exclude the post-training passive block
      "acquisition.acquisition_type": {"$exists": True,
                                       "$ne": "CENTER_MOUSEMOTION"},
    },
  },
  {
    "$project": {
      "name": 1,
      "subject_id": "$data_description.subject_id",
      "project_name": "$data_description.project_name",
      "modality": "$data_description.modalities.abbreviation",
      "acquisition_type": "$acquisition.acquisition_type",
      "session_start_time": "$acquisition.acquisition_start_time",
      "session_end_time": "$acquisition.acquisition_end_time",
      "rig": "$acquisition.instrument_id",
      "genotype": "$subject.subject_details.genotype",
      "sex": "$subject.subject_details.sex",
      "date_of_birth": "$subject.subject_details.date_of_birth",
      # flatten data_streams[] -> configurations[] -> images[] -> planes[]
      "planes": {"$reduce": {
          "input": {"$reduce": {
              "input": "$acquisition.data_streams", "initialValue": [],
              "in": {"$concatArrays": [
                  "$$value", {"$ifNull": ["$$this.configurations", []]}]}}},
          "initialValue": [],
          "in": {"$concatArrays": ["$$value",
              {"$reduce": {
                  "input": {"$ifNull": ["$$this.images", []]}, "initialValue": [],
                  "in": {"$concatArrays": [
                      "$$value", {"$ifNull": ["$$this.planes", []]}]}}}]}}},
    }
  },
  {
    "$project": {
      "name": 1, "subject_id": 1, "project_name": 1, "modality": 1,
      "acquisition_type": 1,
      "session_start_time": 1, "session_end_time": 1, "rig": 1,
      "genotype": 1, "sex": 1, "date_of_birth": 1,
      "n_planes": {"$size": "$planes"},
      "plane_indices": "$planes.plane_index",
      "imaging_depths": "$planes.depth",
      "targeted_structures": "$planes.targeted_structure.acronym",
    }
  },
  # drop the 2-plane test sessions (800792, 800995 -- 2 planes in every
  # processing generation, so nothing is recovered by keeping them)
  {"$match": {"n_planes": 8}},
]

records = docdb_api_client.aggregate_docdb_records(
    pipeline = aggregate,
)
print(f'{len(records)} assets')

if len(records) == 0:
    raise RuntimeError(
        f'No assets matched. If the cohort and client are right, check that '
        f'MODALITY={MODALITY!r} is the abbreviation docDB uses for these assets.')

# Confirm the modality filter selected what we expect, and nothing else.
print('modalities returned:', {m for r in records for m in (r.get('modality') or [])})
```

## Building the session table

One row per session, keeping only the newest `_processed_` generation: a session is
reprocessed whenever the pipeline changes, so it appears several times (3-8 deep) under
different stamps. The stamp format sorts lexicographically in chronological order, so
`sort_values` + `keep='last'` picks the newest.

```{code-cell} ipython3
sessions = pd.DataFrame(records)
sessions = sessions[sessions.name.str.match(PROCESSED_PATTERN)].copy()

sessions['session_id'] = sessions.name.str.extract(
    r'^(multiplane-ophys_\d+_\d{4}-\d{2}-\d{2}_[\d-]+)_processed_')
sessions['processed_stamp'] = sessions.name.str.extract(
    r'_processed_(\d{4}-\d{2}-\d{2}_[\d-]+)$')

sessions = (sessions.sort_values('processed_stamp')
                    .drop_duplicates('session_id', keep='last'))

print(f'{len(sessions)} unique sessions across {sessions.subject_id.nunique()} mice')
print(sessions.subject_id.value_counts().sort_index().to_string())
```

```{code-cell} ipython3
# acquisition_date comes off the asset name; session_date/time off the timestamp.
# They agree on every row today -- kept separate because the name is what the mount
# and every derived asset are keyed by.
sessions['acquisition_date'] = sessions.session_id.str.extract(r'_(\d{4}-\d{2}-\d{2})_')
sessions['session_date'] = sessions.session_start_time.map(
    lambda x: datetime.fromisoformat(x).date())
sessions['session_time'] = sessions.session_start_time.map(
    lambda x: datetime.fromisoformat(x).time())
sessions['date_of_birth'] = sessions.date_of_birth.map(
    lambda x: datetime.strptime(x, '%Y-%m-%d').date() if isinstance(x, str) else x)
sessions['age_days'] = [(a - b).days if pd.notnull(b) else np.nan
                        for a, b in zip(pd.to_datetime(sessions.acquisition_date).dt.date,
                                        sessions.date_of_birth)]

sessions['session_type'] = sessions.acquisition_type
sessions['stage'] = sessions.session_type.str.extract(
    r'^(TRAINING_\d|OPHYS_\d|STAGE_\d)')
sessions['image_set'] = sessions.session_type.str.extract(r'_images_([AB])')

sessions = sessions.sort_values(['subject_id', 'acquisition_date'])
sessions['session_number'] = sessions.groupby('subject_id').cumcount() + 1

# Plane columns, ordered by plane_index so depths line up with names
sessions['plane_names'] = [
    [f'{s}_{i}' for i, s in sorted(zip(r.plane_indices, r.targeted_structures))]
    for r in sessions.itertuples()]
sessions['imaging_depths'] = [
    [d for _, d in sorted(zip(r.plane_indices, r.imaging_depths))]
    for r in sessions.itertuples()]
sessions['targeted_structures'] = [
    sorted(set(r.targeted_structures)) for r in sessions.itertuples()]
```

### Z-drift QC

QC lives in `quality_control.metrics` — a flat array of per-plane metrics, each with a
`status_history` whose last entry is current. Metric names carry the plane either
leading (`VISp_0 Z-drift Analysis`) or trailing
(`VISp_0 Z-drift Analysis - VISp_0`), so we check both ends.

Sessions whose processing generation predates the z-drift evaluation have no metric to
read; those stay `NA` rather than `0`, so a session with no QC is not mistaken for a
session that passed.

```{code-cell} ipython3
zdrift = []
targets = sessions.name.tolist()

for i in range(0, len(targets), BATCH):
    docs = docdb_api_client.retrieve_docdb_records(
        filter_query={'name': {'$in': targets[i:i + BATCH]}},
        projection={'name': 1, 'quality_control.metrics': 1},
        limit=BATCH,
    )
    for doc in docs:
        for metric in ((doc.get('quality_control') or {}).get('metrics') or []):
            name = str(metric.get('name'))
            if not re.search(r'z-?drift', name, re.I):
                continue
            history = metric.get('status_history') or []
            zdrift.append({
                'name': doc['name'],
                'metric_name': name,
                'status': history[-1].get('status') if history else None,
            })

zdrift = pd.DataFrame(zdrift)
print(f'{len(zdrift)} z-drift metric rows from {zdrift.name.nunique()} assets')

# plane may lead or trail the metric name
zdrift['plane_name'] = zdrift.metric_name.str.extract(r'^(VISp_\d+)')[0].fillna(
    zdrift.metric_name.str.extract(r'(VISp_\d+)\s*$')[0])
assert zdrift.plane_name.notna().all(), 'unparsed plane in a z-drift metric name'

zdrift = zdrift.drop_duplicates(['name', 'plane_name'])
print(zdrift.status.value_counts().to_string())
```

```{code-cell} ipython3
# Failing plane names per session, plus the count. Sessions with no z-drift QC
# stay NA -- distinct from an empty list, which means QC ran and nothing failed.
failed = zdrift[zdrift.status == 'Fail'].copy()
failed['plane_index'] = failed.plane_name.str.extract(r'_(\d+)$').astype(int)

# sort by plane index, not lexically (VISp_10 would otherwise precede VISp_2)
failed_names = (failed.sort_values(['name', 'plane_index'])
                      .groupby('name').plane_name.apply(list))

have_qc = sessions.name.isin(zdrift.name)

sessions['planes_failing_zdrift'] = [
    (failed_names.get(n, []) if has else pd.NA)
    for n, has in zip(sessions.name, have_qc)]
sessions['n_planes_failing_zdrift'] = (
    sessions.name.map(zdrift.status.eq('Fail').groupby(zdrift.name).sum())
            .where(have_qc).astype('Int64'))

print(f'{int(have_qc.sum())} sessions with z-drift QC, '
      f'{int((~have_qc).sum())} left NA')
print(sessions.n_planes_failing_zdrift.value_counts(dropna=False).sort_index().to_string())
```

### The session table

Ordered and reset, this is the finished table.

```{code-cell} ipython3
order = ['subject_id', 'session_id', 'name', 'session_type', 'acquisition_type',
         'stage', 'image_set', 'session_number', 'acquisition_date', 'session_date',
         'session_time', 'age_days', 'genotype', 'sex', 'date_of_birth', 'rig',
         'project_name', 'modality', 'n_planes', 'plane_names', 'imaging_depths',
         'targeted_structures', 'planes_failing_zdrift',
         'n_planes_failing_zdrift', 'processed_stamp', '_id']

sessions = sessions[order].reset_index(drop=True)
sessions
```

## Views of the table

With the table built, these views show what the dataset actually offers before
picking sessions for an analysis.

```{code-cell} ipython3
# Column inventory: type, fill rate, and how much each column varies
rows = []
for col in sessions.columns:
    s = sessions[col]
    as_str = s.map(lambda v: str(v) if isinstance(v, list) else v)
    rows.append({
        'column': col,
        'dtype': str(s.dtype),
        'n_missing': int(s.isna().sum()),
        'n_unique': int(as_str.nunique(dropna=True)),
        'example': str(s.dropna().iloc[0])[:44] if s.notna().any() else '',
    })
pd.DataFrame(rows)
```

```{code-cell} ipython3
# Which columns are constant across the cohort (no use as a selector)?
varying, constant = [], []
for col in sessions.columns:
    as_str = sessions[col].map(lambda v: str(v) if isinstance(v, list) else v)
    (constant if as_str.nunique(dropna=True) <= 1 else varying).append(col)

print(f'constant across all {len(sessions)} sessions:')
for c in constant:
    print(f'  {c} = {sessions[c].dropna().iloc[0] if sessions[c].notna().any() else "all NA"}')
print(f'\nvarying ({len(varying)}): {varying}')
```

```{code-cell} ipython3
# Categorical columns worth filtering on
for col in ['session_type', 'image_set', 'rig', 'project_name', 'sex']:
    counts = sessions[col].value_counts(dropna=False)
    print(f'--- {col} ({counts.size} values)')
    print(counts.to_string(), '\n')
```

```{code-cell} ipython3
# Sessions per mouse per session_type -- where the usable data actually is
pd.crosstab(sessions.subject_id, sessions.session_type,
            margins=True, margins_name='TOTAL')
```

```{code-cell} ipython3
# Imaging geometry: are the 8 planes at consistent depths across sessions?
depths = sessions.explode('imaging_depths')
print('distinct imaging depths:', sorted(depths.imaging_depths.dropna().unique()))
print('\ndepth range per plane count')
print(sessions.groupby('n_planes').imaging_depths.apply(
    lambda col: f'{min(min(d) for d in col)} - {max(max(d) for d in col)} um').to_string())

print('\ntargeted structures:',
      sorted({s for lst in sessions.targeted_structures for s in lst}))
```

```{code-cell} ipython3
# Numeric spread, and how age and session count relate per mouse
print(sessions[['age_days', 'n_planes', 'session_number',
                'n_planes_failing_zdrift']].describe().to_string())

print('\nper-mouse span')
print(sessions.groupby('subject_id').agg(
    n_sessions=('session_id', 'size'),
    first_date=('acquisition_date', 'min'),
    last_date=('acquisition_date', 'max'),
    age_first=('age_days', 'min'),
    age_last=('age_days', 'max'),
).to_string())
```

```{code-cell} ipython3
# Z-drift QC coverage -- and the caveat that NA is not a pass
qc_cov = sessions.n_planes_failing_zdrift.notna()
print(f'sessions with z-drift QC: {int(qc_cov.sum())} / {len(sessions)}')
print(f'  clean (0 failing planes):  {int((sessions.n_planes_failing_zdrift == 0).sum())}')
print(f'  >=1 failing plane:         {int((sessions.n_planes_failing_zdrift > 0).sum())}')
print(f'  no QC (NA, NOT a pass):    {int((~qc_cov).sum())}')

print('\nQC coverage by session_type')
print(sessions.assign(has_qc=qc_cov).groupby('session_type').has_qc.agg(
    n='size', with_qc='sum').to_string())
```

```{code-cell} ipython3
# Candidate sessions for a problem set: QC present and nothing failing
usable = sessions[sessions.n_planes_failing_zdrift == 0]
print(f'{len(usable)} sessions with zero z-drift failures')
print(usable.groupby(['subject_id', 'session_type']).size().to_string())

# Which planes fail z-drift most often across the cohort?
exploded = sessions.planes_failing_zdrift.dropna().explode().dropna()
print('\nz-drift failures by plane')
print(exploded.value_counts().sort_index().to_string())
```

### Sanity checks

docDB drops rows silently — it returns no error when an asset simply is not indexed.
Read these counts against what you expect from the processing batch; if a mouse is
short, re-run rather than assuming the data is missing.

```{code-cell} ipython3
print('sessions per mouse')
print(sessions.subject_id.value_counts().sort_index().to_string())

print('\nplanes per session (8 for all -- enforced in the query)')
print(sessions.n_planes.value_counts().sort_index().to_string())

print('\nsession types')
print(sessions.session_type.value_counts().to_string())

missing = set(VISUAL_LEARNING_MICE) - set(sessions.subject_id)
if missing:
    print(f'\nno sessions returned for: {sorted(missing)}')
```

## Saving the table

The tutorials read this table from a CSV in the mounted data asset, so it is
written out here for that purpose. Nothing above depends on it.

```{code-cell} ipython3
session_csv = f'{OUTPUT_DIR}/visual_learning_session_metadata.csv'
sessions.to_csv(session_csv, index=False)
print(f'{session_csv}  ({len(sessions)} rows, {sessions.shape[1]} columns)')
```
