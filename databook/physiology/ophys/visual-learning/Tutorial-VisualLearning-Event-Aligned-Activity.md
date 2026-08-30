---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.19.5
kernelspec:
  display_name: base
  language: python
  name: python3
---

<h1 align="center">Visual Learning: aligning activity to visual events</h1>

+++

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h2>What this notebook does</h2>

A calcium trace on its own says very little. Everything interesting in this dataset comes from
cutting that trace up around **events** — the moments when something happened on the screen or in
the behavior — and averaging over them. This notebook builds that machinery one step at a time and
then uses it on two sessions.

The events a task session gives you:

| event | where the times come from | what a response to it means |
| --- | --- | --- |
| **image change** | `change_time` in the `trials` table | the stimulus changed identity: a visual response |
| **image omission** | `start_time` of flashes with `omitted == True` | *nothing* appeared when one was due: expectation, not stimulus |
| **stimulus identity** | `change_orientation` / `change_image_name` in `trials` | which orientation or image a neuron prefers |

We do the two sessions in a deliberate order:

1. **A gratings session** (`TRAINING_1_gratings`). The grating is held on screen for a couple of
   seconds and there are no omissions, so the change response is one clean bump. That is the easiest
   possible case in which to check that an alignment is correct.
2. **A familiar image session** (`OPHYS_1_images_A`). Now images flash every 750 ms, the response
   rings at the flash rate, and about 5% of flashes are omitted — which gives us the second event
   type.

<h3>How to read it</h3>

Almost every function below is followed by a cell that **runs it on a few rows and shows what came
out**. When an array changes shape, the shape is printed; when a step is easier to see than to
describe, it is plotted. Nothing is hidden inside a helper without first being done in the open.

<h3>Before you start</h3>

This is the second notebook in the series. The first one —
`Tutorial-VisualLearning-Physiology-and-CellTypes.ipynb` — covers the session metadata table, what
is inside an NWB file, and the ID chain that attaches a transcriptomic cell type to an imaged ROI.
Those steps are repeated here as four short functions, but not re-explained.

</div>

+++

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h2>The data</h2>

Code Ocean mounts each attached data asset read-only under `/data`, in a folder named after the
asset. This notebook needs the same three assets as the first one, plus the metadata table:

| Asset | What it provides |
| --- | --- |
| `Visual-Learning-SWDB` | one NWB per imaging session: activity, behavior, ROI masks |
| `Visual-Learning-Cell-Gene-Tables` | per-mouse cell x gene **AnnData**, carrying the cell-type labels |
| `Visual-Learning-Coreg-Tables` | the ID table linking imaged ROIs to HCR cells |
| `/data/metadata/visual_learning_session_metadata.csv` | one row per session: mouse, date, session type |

If a folder is missing, the asset is not attached — attach it in the capsule's Data panel.

</div>

+++

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h2>Setup</h2>

</div>

```{code-cell} ipython3
import ast
import gc
import os
import glob

import numpy as np
import pandas as pd
import anndata as ad
import pynwb
import matplotlib.pyplot as plt

# Show wide tables without pandas truncating the middle columns.
pd.set_option('display.width', 200)
pd.set_option('display.max_columns', 30)

# Every attached data asset appears as its own directory under /data.
data_dir = '/data'
dataset_dir = os.path.join(data_dir, 'Visual-Learning-SWDB')

plt.rcParams.update({
    'font.size': 14, 'axes.titlesize': 16, 'axes.labelsize': 15,
    'xtick.labelsize': 13, 'ytick.labelsize': 13, 'legend.fontsize': 13,
    'figure.titlesize': 18, 'figure.dpi': 100,
})
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h2>Part 1: Loading a session, one step at a time</h2>

Four steps get us from a metadata row to something we can analyze:

1. **open** the NWB store,
2. **read** the 8 imaging planes into one activity matrix plus one ROI table,
3. **attach** the coregistration IDs and the cell types to that ROI table,
4. **subset** to the neurons worth analyzing.

We run them one at a time on the gratings session, looking at what each produces, and then bundle
them into a single function to use on the second session.

First, the session metadata table and the mouse's coregistered sessions.

</div>

```{code-cell} ipython3
# One row per imaging session, across every mouse in the dataset.
session_metadata = pd.read_csv(
    os.path.join(data_dir, 'metadata', 'visual_learning_session_metadata.csv'))

# EDIT: any mouse in the table. 800995 has every session type these notebooks use.
mouse = 800995

mouse_sessions = (session_metadata[session_metadata['subject_id'] == mouse]
                  .sort_values('session_number'))

# Which sessions of this mouse have coregistration data? The coregistration asset holds
# one folder per mouse, each with that mouse's table. Glob only one level inside THAT
# mount -- a recursive search of all of /data would walk every chunk file of every NWB.
coreg_path = glob.glob(os.path.join(data_dir, 'Visual-Learning-Coreg-Tables', '*',
                                    f'{mouse}_coreg_id_mapping_table.csv'))[0]

# A session_key is '<mouse>_<date>', so the date is the piece after the last underscore.
session_keys = pd.read_csv(coreg_path, usecols=['session_key'])['session_key']
coregistered_dates = set(session_keys.str.split('_').str[-1])

coregistered_sessions = mouse_sessions[mouse_sessions['session_date'].isin(coregistered_dates)]

print(f'{len(coregistered_sessions)} of {len(mouse_sessions)} sessions are coregistered')
coregistered_sessions[['session_number', 'session_date', 'session_type', 'n_planes']]
```

Pick the two sessions by querying the table rather than hardcoding dates, so the same code works for any mouse.

```{code-cell} ipython3
def first_session_of_type(sessions, session_type):
    """Earliest session of this type among the sessions passed in.

    sessions : rows of the metadata table, already sorted by date.
    """
    matching = sessions[sessions['session_type'] == session_type]
    if matching.empty:
        raise ValueError('no coregistered session of type ' + session_type)
    return matching.iloc[0]


# Each of these is a single row of the metadata table: a pandas Series.
gratings_session = first_session_of_type(coregistered_sessions, 'TRAINING_1_gratings')
familiar_session = first_session_of_type(coregistered_sessions, 'OPHYS_1_images_A')

for session in [gratings_session, familiar_session]:
    print(f"{session['session_type']:<22} {session['session_date']}  "
          f"planes: {session['n_planes']}")
```

The cell types, and the table that links them to imaged ROIs. Neither is session-specific: one coregistration table and one AnnData cover every session of this mouse.

```{code-cell} ipython3
# The coregistration table: one row per (ROI, session) for this mouse. It carries
# identifiers only -- which HCR cell an imaged ROI is, and which neuron it belongs to.
coreg_table = pd.read_csv(coreg_path, index_col=0)

# The cell-type labels: one row per HCR cell, in an AnnData. The folder name carries a
# date stamp we do not want to hardcode, so glob one level down.
hcr_path = glob.glob(os.path.join(data_dir, 'Visual-Learning-Cell-Gene-Tables', '*',
                                  f'{mouse}_cellxgene_annotated.h5ad'))[0]
adata = ad.read_h5ad(hcr_path)

cell_types = adata.obs[['class', 'subclass', 'cluster']].copy()
cell_types.columns = ['cell_class', 'subclass', 'cluster_name']

# 'none' / 'unassigned' are placeholder strings, not labels -- make them real missing values.
cell_types['subclass'] = cell_types['subclass'].astype(str).replace('none', np.nan)
cell_types['cluster_name'] = cell_types['cluster_name'].astype(str).replace('unassigned', np.nan)

# Match the coreg table's integer hcr_id so the merge inside load_session finds anything.
cell_types.index = cell_types.index.astype(np.int64)
cell_types.index.name = 'hcr_id'

print(coreg_table.shape, 'coregistration rows |', len(cell_types), 'annotated HCR cells')

# The inhibitory subclasses this HCR gene panel resolves, in standard order.
subclass_order = ['Pvalb', 'Sst', 'Vip', 'Lamp5']
subclass_colors = {'Pvalb': '#D93137', 'Sst': '#FF9900',
                   'Vip': '#A45FBF', 'Lamp5': '#DA808C'}

# The coregistration columns worth carrying onto the ROI table: hcr_id is the key into
# the AnnData, unique_roicat_id is the key across sessions, resolved_cz_stack_id names
# the z-stack cell (the RESOLVED column, never the raw one), and matched flags cells
# tracked across sessions.
coreg_columns = ['unique_roi_id', 'unique_roicat_id', 'hcr_id', 'resolved_cz_stack_id',
                 'matched', 'cell_class', 'cluster_name', 'subclass']
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<b>Step 1 — open the session.</b> This one is bookkeeping: find the single NWB store in the
session's folder, open it, and read the plane names and depths out of the metadata row.

</div>

```{code-cell} ipython3
def open_session(session_row):
    """Open the NWB store for one session.

    Returns (nwb, session_key, depth_of_plane). session_key is how the coregistration
    table names a session, '<mouse>_<date>'; depth_of_plane maps each imaging plane to
    its depth in microns, and its keys are this session's plane names.
    """
    session_key = f"{session_row['subject_id']}_{session_row['session_date']}"

    # Planes and depths for THIS session, from its own metadata row. Both columns are
    # Python lists stored as text, and imaging_depths is in plane_names order.
    plane_names = ast.literal_eval(session_row['plane_names'])
    imaging_depths = ast.literal_eval(session_row['imaging_depths'])
    depth_of_plane = dict(zip(plane_names, imaging_depths))

    # One NWB store per session directory. Match on 'nwb' to catch both forms it can
    # take -- a .nwb file or a .nwb.zarr directory -- and skip the .json sidecars.
    session_dir = os.path.join(dataset_dir, session_row['name'])
    nwb_files = [path for path in os.listdir(session_dir)
                 if 'nwb' in path and not path.endswith('.json')]
    assert len(nwb_files) == 1, f'expected one NWB store, found {len(nwb_files)}'

    return pynwb.read_nwb(os.path.join(session_dir, nwb_files[0])), session_key, depth_of_plane
```

```{code-cell} ipython3
gratings_nwb, gratings_key, gratings_depths = open_session(gratings_session)

print('session_key:', gratings_key)
print('genotype   :', gratings_nwb.subject.genotype)
print('planes and depths (um):')
for plane, depth in gratings_depths.items():
    print(f'   {plane}  {depth}')
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<b>Step 2 — read the planes.</b> Each plane contributes three things: its &Delta;F/F matrix, its
**own** timestamps, and its ROI table. The function concatenates the matrices side by side into one
`(frames, ROIs)` array, and builds one table row per column of that array.

The ROI table is where each ROI gets its name. The coregistration table identifies ROIs by position
within a plane, so we build the same strings here — `<session_key>_<plane>_<index>` — and every join
after this is on a name rather than on an array offset.

</div>

```{code-cell} ipython3
def read_planes(nwb, session_key, depth_of_plane):
    """Read all 8 imaging planes into one activity matrix and one ROI table.

    Returns (dff_all, timestamps, roi_table):

    - dff_all    : (frames, all segmented ROIs) -- the planes concatenated side by side
    - timestamps : {plane name: frame times} -- one clock per plane, NEVER a shared one
    - roi_table  : one row per column of dff_all, carrying that column number
    """
    dff_per_plane = []
    roi_rows_per_plane = []
    timestamps = {}

    for plane in depth_of_plane:
        dff_series = nwb.processing[plane]['dff_timeseries']['dff_timeseries']
        plane_dff = np.asarray(dff_series.data[:])
        timestamps[plane] = np.asarray(dff_series.timestamps[:])

        roi_table = (nwb.processing[plane]['image_segmentation']
                     .plane_segmentations['roi_table'].to_dataframe())

        # THE positional assumption, asserted once and then never relied on again:
        # row i of the ROI table is column i of this plane's dF/F matrix.
        assert len(roi_table) == plane_dff.shape[1], f'{plane}: ROI table and dff disagree'

        # Turn each ROI's position in its plane into the id strings the coregistration
        # table uses, so every join from here on is on a name, not an array offset.
        roi_index = np.arange(len(roi_table))
        roi_rows_per_plane.append(pd.DataFrame({
            'plane': plane,
            'imaging_depth_um': depth_of_plane[plane],
            'roi_id': [f'{plane}_{i:04d}' for i in roi_index],
            'unique_roi_id': [f'{session_key}_{plane}_{i:04d}' for i in roi_index],
            'plane_roi_index': roi_index,
            'is_soma': roi_table['is_soma'].values.astype(bool),
        }))
        dff_per_plane.append(plane_dff)

    # One activity matrix for the session, and one table row per column of it.
    # NOTE: this stacks planes sampled at slightly DIFFERENT times, so a row of this
    # matrix is not one instant. That is what the per-plane timestamps are for.
    dff_all = np.concatenate(dff_per_plane, axis=1)

    roi_table = pd.concat(roi_rows_per_plane, ignore_index=True)
    roi_table['column_in_dff'] = np.arange(len(roi_table))
    assert roi_table['unique_roi_id'].is_unique, 'unique_roi_id is not unique'

    return dff_all, timestamps, roi_table
```

```{code-cell} ipython3
gratings_dff, gratings_timestamps, gratings_roi_table = read_planes(
    gratings_nwb, gratings_key, gratings_depths)

print('dff (frames, all segmented ROIs):', gratings_dff.shape)
print('one timestamp array per plane   :', len(gratings_timestamps))
print('roi_table rows                  :', len(gratings_roi_table))
```

One row per segmented ROI. `column_in_dff` is the row's column in the activity matrix, and it is the only neuron numbering in this notebook.

```{code-cell} ipython3
gratings_roi_table.head(4)
```

Which columns of the activity matrix came from which plane — the concatenation, read back off the table.

```{code-cell} ipython3
columns_per_plane = gratings_roi_table.groupby('plane')['column_in_dff'].agg(['count', 'min', 'max'])
columns_per_plane.columns = ['ROIs', 'first column', 'last column']
columns_per_plane
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

The eight planes do **not** share a clock. The mesoscope visits them in sequence, so frame `f` of
one plane was acquired slightly before frame `f` of another. That is why `read_planes` returns a
dictionary of timestamp arrays rather than one vector, and it is the reason every alignment below
loops over planes. Measure the offsets rather than assuming them.

</div>

```{code-cell} ipython3
reference_plane = list(gratings_timestamps)[0]
reference_times = gratings_timestamps[reference_plane]

frame_interval = np.median(np.diff(reference_times))
print(f'frame interval: {frame_interval * 1000:.1f} ms ({1 / frame_interval:.2f} Hz)')
print(f'session length: {reference_times[-1] / 60:.1f} min')
print()
print(f'each plane\'s first frame, relative to {reference_plane}:')
for plane, times in gratings_timestamps.items():
    offset_ms = (times[0] - reference_times[0]) * 1000
    print(f'   {plane}  {offset_ms:+7.1f} ms   ({len(times)} frames)')
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<b>Step 3 — attach the cell types.</b> Two joins: the coregistration table's `hcr_id` picks up the
cell-type labels, and the ID string puts the result onto the ROI table. Nothing is dropped, so the
table still lines up row-for-column with the activity matrix — ROIs with no coregistration simply
get `NaN`.

</div>

```{code-cell} ipython3
def attach_cell_types(roi_table, coreg_table, cell_types, session_key):
    """Join the coregistration IDs and the HCR cell types onto a session's ROI table.

    Nothing is dropped: the result has the same rows in the same order as roi_table, so
    it still lines up with the activity matrix. ROIs with no coregistration get NaN.
    """
    # This session's coregistration rows. Unmatched entries are -1, not empty: convert
    # them BEFORE the join, or every failed ROI joins to whatever sits at id -1.
    coreg = coreg_table[coreg_table['session_key'] == session_key].copy()
    for column in ['hcr_id', 'resolved_cz_stack_id']:
        coreg[column] = coreg[column].where(coreg[column] > 0)

    # hcr_id is the key into the cell-type table; then the ID string joins onto the ROIs.
    # The validate= arguments fail loudly if a join is not the cardinality we think.
    coreg = coreg.merge(cell_types, left_on='hcr_id', right_index=True,
                        how='left', validate='many_to_one')

    return roi_table.merge(coreg[coreg_columns], on='unique_roi_id',
                           how='left', validate='one_to_one')
```

```{code-cell} ipython3
gratings_roi_table = attach_cell_types(gratings_roi_table, coreg_table,
                                       cell_types, gratings_key)

# The funnel, one stage per line: how many ROIs survive each step of the chain.
print(f'{len(gratings_roi_table)} segmented ROIs')
for label, column in [('in the coregistration table', 'unique_roicat_id'),
                      ('matched to a z-stack cell', 'resolved_cz_stack_id'),
                      ('matched to an HCR cell', 'hcr_id'),
                      ('with an inhibitory subclass label', 'subclass')]:
    print(f'  {gratings_roi_table[column].notna().sum():>5} {label}')
```

The same table as before, now with the identity columns filled in where the chain reached an HCR cell. Compare a matched row with an unmatched one.

```{code-cell} ipython3
identity_columns = ['plane', 'column_in_dff', 'is_soma', 'unique_roicat_id',
                    'hcr_id', 'subclass', 'cluster_name']

matched = gratings_roi_table['hcr_id'].notna()
pd.concat([gratings_roi_table.loc[matched, identity_columns].head(3),
           gratings_roi_table.loc[~matched, identity_columns].head(2)])
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<b>Step 4 — subset by rows only.</b> We keep somas that reached an HCR cell, and within those, the
ones carrying a subclass label. Both are **row filters**: the activity matrix is untouched and no
row is renumbered, so a `column_in_dff` means the same thing before and after.

</div>

```{code-cell} ipython3
def subset_neurons(roi_table, subclass_order):
    """The two subsets every plot uses: analyzed neurons, and typed neurons.

    Subsetting is a ROW FILTER on the table. The activity matrix is left alone and no
    row is renumbered, so column_in_dff means the same thing before and after.

    - rois  : somas that were matched to an HCR cell -- what we analyze
    - typed : those of them with an inhibitory subclass label, sorted by subclass so
              same-subclass neurons are adjacent rows in a heatmap
    """
    rois = roi_table[roi_table['is_soma'] & roi_table['hcr_id'].notna()].copy()

    typed = rois.dropna(subset=['subclass']).copy()
    typed['subclass'] = pd.Categorical(typed['subclass'], subclass_order, ordered=True)
    typed = typed.sort_values(['subclass', 'cluster_name'])

    return rois, typed
```

```{code-cell} ipython3
gratings_rois, gratings_typed = subset_neurons(gratings_roi_table, subclass_order)

print(f'{len(gratings_roi_table)} segmented ROIs')
print(f'  -> {len(gratings_rois)} analyzed (soma AND matched to an HCR cell)')
print(f'  -> {len(gratings_typed)} with a subclass label')
print()
print(gratings_typed['subclass'].value_counts().to_string())
print()
print('the activity matrix is unchanged:', gratings_dff.shape)
print('the kept rows keep their old column numbers:',
      gratings_rois['column_in_dff'].values[:8], '...')
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<b>The behavior, on the same clock.</b> The trials and stimulus tables are read straight off the
NWB file, and their times are in the same seconds as the imaging timestamps — which is the entire
reason alignment is possible.

</div>

```{code-cell} ipython3
gratings_trials = gratings_nwb.intervals['trials'].to_dataframe()
gratings_stimulus = gratings_nwb.intervals['stimulus_presentations'].to_dataframe()

print('trials                :', len(gratings_trials))
print('stimulus presentations:', len(gratings_stimulus))
print('  changes             :', int(gratings_stimulus['is_change'].sum()))
print('  omitted             :', int(gratings_stimulus['omitted'].sum()))
print('  stimuli present     :', sorted(gratings_stimulus['image_name'].unique()))
print()

# Outcome columns are booleans, one per category, so summing gives the trial count.
outcome_columns = ['go', 'catch', 'auto_rewarded', 'aborted',
                   'hit', 'miss', 'false_alarm', 'correct_reject']
print(gratings_trials[outcome_columns].sum().to_string())
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h3>What we are actually going to do</h3>

Here is the whole problem in one figure. We want a neuron that responds to the image changes, so
score every analyzed neuron by comparing its activity just after each change with just before it,
and take the winner. The scoring below is deliberately crude — it works in a single plane and rounds
each change to the next frame — and Part 2 is about doing it properly.

</div>

```{code-cell} ipython3
change_times_all = gratings_trials['change_time'].dropna().values

# Work in the plane that holds the most analyzed neurons, so we only need one clock.
example_plane = gratings_rois['plane'].value_counts().idxmax()
plane_columns = gratings_rois.loc[gratings_rois['plane'] == example_plane,
                                  'column_in_dff'].values
example_times = gratings_timestamps[example_plane]

# The frame at or after each change, dropping changes without 10 frames on either side.
frame_at_change = np.searchsorted(example_times, change_times_all)
frame_at_change = frame_at_change[(frame_at_change > 10)
                                  & (frame_at_change < len(example_times) - 10)]

# Mean dF/F over the 10 frames after each change, minus the 10 frames before it.
plane_traces = gratings_dff[:, plane_columns]          # (frames, neurons in this plane)
after = np.mean([plane_traces[f:f + 10].mean(axis=0) for f in frame_at_change], axis=0)
before = np.mean([plane_traces[f - 10:f].mean(axis=0) for f in frame_at_change], axis=0)

example_column = plane_columns[int(np.argmax(after - before))]
example_trace = gratings_dff[:, example_column]

print(f'{len(plane_columns)} analyzed neurons in {example_plane}, '
      f'scored over {len(frame_at_change)} changes')
print(f'best: column {example_column} '
      f'({gratings_roi_table["roi_id"][example_column]}), '
      f'{(after - before).max():.3f} dF/F above its pre-change level')
```

That neuron's &Delta;F/F for the entire session, and then a 90-second stretch of it with the image-change times drawn on top. Look at the zoom: some changes are followed by a transient and some are not, and a single trial tells you nothing. Everything in the rest of this notebook is a way of averaging over those red lines so that the reliable part separates from the noise.

```{code-cell} ipython3
fig, axes = plt.subplots(2, 1, figsize=(14, 6))

axes[0].plot(example_times / 60, example_trace, linewidth=0.4, color='black')
axes[0].set_xlabel('Time from session start (min)')
axes[0].set_title(f'ROI {gratings_roi_table["roi_id"][example_column]} '
                  f'(column {example_column}) -- whole session')

# A 90 s window from the middle of the session, with every change marked.
zoom_start = example_times[len(example_times) // 2]
zoom_stop = zoom_start + 90

in_view = (example_times >= zoom_start) & (example_times <= zoom_stop)
axes[1].plot(example_times[in_view], example_trace[in_view], linewidth=1, color='black')
for change_time in change_times_all[(change_times_all > zoom_start)
                                    & (change_times_all < zoom_stop)]:
    axes[1].axvline(change_time, color='tab:red', linewidth=1)
axes[1].set_xlabel('Time from session start (s)')
axes[1].set_title('90 s of it, with the image changes in red')

for ax in axes:
    ax.set_ylabel(r'$\Delta$F/F')
fig.tight_layout()
plt.show()
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h3>The four steps as one function</h3>

That was one session. We need a second one later, so here are the same four steps wrapped up, plus a
`describe` that prints what came back. The dictionary it returns is exactly the set of objects we
just built by hand:

| key | what it is |
| --- | --- |
| `dff` | `(frames, all segmented ROIs)` activity matrix for the whole session |
| `timestamps` | `{plane name: frame times}` — one clock per plane, never a shared one |
| `plane_names`, `depth_of_plane` | this session's planes, and how deep each one sat |
| `roi_table` | one row per segmented ROI, after the coregistration and cell-type joins |
| `rois` | the subset we analyze: somas matched to an HCR cell |
| `typed` | the subset with an inhibitory subclass label, sorted by subclass |
| `trials`, `stimulus` | the behavior and stimulus tables, on the imaging clock |
| `nwb`, `row`, `key`, `title` | the open file, its metadata row, its `session_key`, a figure title |

</div>

```{code-cell} ipython3
def load_session(session_row, coreg_table, cell_types, subclass_order):
    """The four steps above, in order, bundled into one dictionary."""
    nwb, session_key, depth_of_plane = open_session(session_row)
    dff_all, timestamps, roi_table = read_planes(nwb, session_key, depth_of_plane)
    roi_table = attach_cell_types(roi_table, coreg_table, cell_types, session_key)
    rois, typed = subset_neurons(roi_table, subclass_order)

    return {
        'row': session_row,
        'key': session_key,
        'nwb': nwb,
        'plane_names': list(depth_of_plane),
        'depth_of_plane': depth_of_plane,
        'dff': dff_all,
        'timestamps': timestamps,
        'roi_table': roi_table,
        'rois': rois,
        'typed': typed,
        'trials': nwb.intervals['trials'].to_dataframe(),
        'stimulus': nwb.intervals['stimulus_presentations'].to_dataframe(),
        'title': (f"mouse {session_row['subject_id']}  --  {session_row['session_date']}"
                  f"  --  {session_row['session_type']}"),
    }


def describe(session):
    """One line per thing load_session returned, so the shapes are visible."""
    print(session['title'])
    print('  dff (frames, all segmented ROIs):', session['dff'].shape)
    print('  segmented ROIs                  :', len(session['roi_table']))
    print('  analyzed (soma + HCR match)     :', len(session['rois']))
    print('  with a subclass label           :', len(session['typed']))
    print('  trials                          :', len(session['trials']))
    print('  stimulus presentations          :', len(session['stimulus']))
```

For the gratings session we already have every piece, so put them in the same dictionary rather than reading the file a second time.

```{code-cell} ipython3
gratings = {
    'row': gratings_session,
    'key': gratings_key,
    'nwb': gratings_nwb,
    'plane_names': list(gratings_depths),
    'depth_of_plane': gratings_depths,
    'dff': gratings_dff,
    'timestamps': gratings_timestamps,
    'roi_table': gratings_roi_table,
    'rois': gratings_rois,
    'typed': gratings_typed,
    'trials': gratings_trials,
    'stimulus': gratings_stimulus,
    'title': (f"mouse {gratings_session['subject_id']}  --  "
              f"{gratings_session['session_date']}  --  {gratings_session['session_type']}"),
}

describe(gratings)
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h2>Part 2: Building an event-aligned response</h2>

The steps are: find which frame is closest to each time we want, pull out those frames, subtract
each trial's own pre-event baseline so every trial starts at zero, then average over trials.

Three subtleties, all of which change the answer:

- **Each plane gets its own clock**, so event times have to be converted to frame indices using
  *that plane's* timestamps. Doing it once for the whole concatenated matrix would misplace the
  later-sampled planes by the offsets printed in Part 1 — and the resulting figure would look
  completely normal.
- **Edge events have to go.** An event too close to the start or end of the recording cannot fill a
  whole window. Drop those explicitly rather than letting the indexing silently clamp them to the
  first or last frame, which would quietly average edge artefacts into the response.
- **Round to the nearest frame, not the next one.** `np.searchsorted` gives the first frame at or
  *after* the time you ask for, so on average every sample comes from half a frame later than
  intended. At ~10 Hz that is ~50 ms of systematic shift — enough to make a response look like it
  begins slightly *before* the event.

Two small functions first, then the alignment done by hand on a single event, and only then the
function that does it for every neuron.

</div>

+++

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h4>Helper 1: which frame is closest to a given time</h4>

Behavior is recorded in seconds and imaging in frames, so every alignment starts by turning a list
of times into a list of frame indices. This is the one place that conversion happens.

</div>

```{code-cell} ipython3
def nearest_frame(timestamps, wanted_times):
    """Index of the imaging frame closest in time to each wanted time.

    timestamps   : this plane's frame times, in seconds, increasing
    wanted_times : the times we want frames for, in seconds

    Why "closest" and not "the first frame at or after": np.searchsorted returns the
    first frame at or AFTER the wanted time, so on average every sample comes from half
    a frame later than intended. At ~10 Hz that is ~50 ms of systematic shift -- enough
    to make a response look like it begins slightly BEFORE the event. So we look at the
    frame on either side of each wanted time and keep whichever is nearer.
    """
    # Step 1: the first frame at or after each wanted time.
    frame_after = np.searchsorted(timestamps, wanted_times)

    # Step 2: keep the index in range, so wanted times outside the recording clamp to
    # the first or last frame instead of indexing off the end of the array.
    frame_after = np.clip(frame_after, 1, len(timestamps) - 1)

    # Step 3: the frame just before it. These two bracket the wanted time.
    frame_before = frame_after - 1

    # Step 4: how far each candidate is from the time we asked for.
    gap_after = np.abs(timestamps[frame_after] - wanted_times)
    gap_before = np.abs(timestamps[frame_before] - wanted_times)

    # Step 5: take the nearer of the two, elementwise.
    return np.where(gap_after < gap_before, frame_after, frame_before)
```

Give it three arbitrary times and look at what comes back: a frame index, and the frame time that goes with it. The error is at most half a frame — about 50 ms here — and it has no systematic sign, which is the point of rounding to the nearest frame.

```{code-cell} ipython3
wanted = np.array([100.0, 100.04, 500.0, 1000.0])
frames = nearest_frame(example_times, wanted)

pd.DataFrame({
    'wanted time (s)': wanted,
    'frame': frames,
    'frame time (s)': example_times[frames].round(3),
    'error (ms)': ((example_times[frames] - wanted) * 1000).round(1),
})
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h4>Helper 2: which events can we actually use</h4>

Nothing in this function looks at *what kind* of event it was — it takes a list of times and returns
the ones with a full window of recording on both sides, in **every** plane. That is why the same
function works for changes and for omissions later.

</div>

```{code-cell} ipython3
def usable_event_times(event_times, session, window):
    """The event times that fall far enough inside EVERY plane's recording.

    event_times : the times we would like to align to, in seconds
    session     : a session dictionary from load_session
    window      : the peri-event window, in seconds relative to the event

    Because each plane starts and stops at a slightly different time, an event has to be
    usable in every plane: hence the LATEST start and the EARLIEST stop across planes.
    """
    timestamps = session['timestamps']

    latest_start = max(timestamps[plane][0] for plane in session['plane_names'])
    earliest_stop = min(timestamps[plane][-1] for plane in session['plane_names'])

    # window[0] is negative (time before the event) and window[-1] is positive, so an
    # event is usable if it sits at least |window[0]| after the latest start and at
    # least window[-1] before the earliest stop.
    event_times = np.asarray(event_times)
    starts_late_enough = event_times > latest_start - window[0]
    ends_early_enough = event_times < earliest_stop - window[-1]

    return event_times[starts_late_enough & ends_early_enough]
```

The window this notebook uses is 2 s before to 4 s after the event, sampled every 100 ms. With a window that short almost nothing is dropped in this session — so ask for a 60 s window too, and watch events fall off both ends.

```{code-cell} ipython3
# The peri-event window used for every alignment here: -2 s to +4 s at 100 ms.
window = np.arange(-2, 4, 0.1)

gratings_change_times = usable_event_times(change_times_all, gratings, window)

print(f'window {window[0]:+.0f} s to {window[-1]:+.1f} s, {len(window)} samples')
print(f'  {len(change_times_all)} change times in the trials table')
print(f'  {len(gratings_change_times)} usable')
print()

wide_window = np.arange(-30, 30, 0.1)
print(f'window {wide_window[0]:+.0f} s to {wide_window[-1]:+.1f} s:')
print(f'  {len(usable_event_times(change_times_all, gratings, wide_window))} usable')
```

Which ones went, and why. Each tick is one image change; the dashed lines are the cut-offs the function computes from the latest plane start and the earliest plane stop.

```{code-cell} ipython3
was_kept = np.isin(change_times_all, gratings_change_times)

# The two edges the function works out internally, recomputed here so they can be drawn.
latest_start = max(times[0] for times in gratings['timestamps'].values())
earliest_stop = min(times[-1] for times in gratings['timestamps'].values())

fig, ax = plt.subplots(figsize=(14, 2.8))
ax.eventplot(change_times_all[was_kept] / 60, lineoffsets=1, linelengths=0.8,
             color='black', label=f'kept (n={was_kept.sum()})')
ax.eventplot(change_times_all[~was_kept] / 60, lineoffsets=1, linelengths=0.8,
             color='tab:red', linewidths=2.5, label=f'dropped (n={(~was_kept).sum()})')

ax.axvline((latest_start - wide_window[0]) / 60, color='tab:blue', linestyle='--')
ax.axvline((earliest_stop - wide_window[-1]) / 60, color='tab:blue', linestyle='--',
           label='cut-offs for the 60 s window')

ax.set_yticks([])
ax.set_xlabel('Time from session start (min)')
ax.set_title('Every image change, and where a wide window stops fitting')
ax.legend(frameon=False, loc='upper center', ncol=3, fontsize=11)
fig.tight_layout()
plt.show()
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h4>One event, by hand</h4>

Before writing anything general, do the whole alignment for **one neuron and one image change**. The
window is a list of offsets in seconds; add the change time to get the times we want; pass those to
`nearest_frame` to get frame indices; read those rows out of the activity matrix.

The table below is that chain, one row per window sample.

</div>

```{code-cell} ipython3
one_change = gratings_change_times[10]

wanted_times = one_change + window                       # (60,) times we want
frames = nearest_frame(example_times, wanted_times)      # (60,) frame indices
one_cut = gratings_dff[frames, example_column]           # (60,) dF/F values

print(f'change at {one_change:.2f} s, neuron in plane {example_plane}')
print('window        :', window.shape)
print('wanted_times  :', wanted_times.shape)
print('frames        :', frames.shape)
print('one_cut       :', one_cut.shape)

pd.DataFrame({'window (s)': window, 'wanted time (s)': wanted_times.round(3),
              'frame': frames, 'dF/F': one_cut.round(4)}).head(6)
```

The same 60 numbers as a picture, before and after subtracting the pre-change baseline. The baseline is just the mean of the samples at negative window times — the dashed grey line on the left.

```{code-cell} ipython3
baseline = one_cut[window < 0].mean()

fig, axes = plt.subplots(1, 2, figsize=(13, 4), sharey=False)

axes[0].plot(window, one_cut, color='black', linewidth=1.5)
axes[0].axhline(baseline, color='gray', linestyle='--',
                label=f'baseline = {baseline:.3f}')
axes[0].set_title('the cut, as read out of the matrix')
axes[0].legend(frameon=False)

axes[1].plot(window, one_cut - baseline, color='black', linewidth=1.5)
axes[1].axhline(0, color='gray', linestyle='--')
axes[1].set_title('after subtracting its own baseline')

for ax in axes:
    ax.axvline(0, color='tab:red', linestyle='--', linewidth=1)
    ax.set_xlabel('Time from change (s)')
    ax.set_ylabel(r'$\Delta$F/F')
fig.tight_layout()
plt.show()
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h4>Every event, every neuron</h4>

`align_to_events` is the loop that does what we just did, for every event, every analyzed neuron and
every plane. Two loops: the outer one is over **planes**, because each has its own clock, and the
inner one is over **events**.

The array it returns is `(events, window samples, ALL segmented ROIs)`. Note the last axis: it is
the full width of `session['dff']`, not the number of analyzed neurons. That way `column_in_dff`
indexes the aligned array exactly as it indexes the raw traces, and there is never a second neuron
numbering to keep straight. Columns for ROIs we are not analyzing stay zero and are never read.

</div>

```{code-cell} ipython3
def align_to_events(session, event_times, window):
    """Baseline-subtracted activity around each event.

    session     : a session dictionary from load_session
    event_times : the usable event times, in seconds
    window      : offsets from the event, in seconds (e.g. -2 to +4 in 0.1 s steps)

    Returns (n_events, n_window_samples, ALL segmented ROIs). The neuron axis is the
    same width as session['dff'], so `column_in_dff` indexes this result exactly as it
    indexes the raw traces -- there is only ever ONE column numbering. Columns for ROIs
    we are not analyzing stay zero and are never read.
    """
    dff_all = session['dff']
    neuron_columns = session['rois']['column_in_dff'].values
    neuron_planes = session['rois']['plane'].values

    aligned = np.zeros((len(event_times), len(window), dff_all.shape[1]))

    # One plane at a time: a plane's frame times are its own, so an event time maps to
    # a different frame index in each plane.
    for plane in session['plane_names']:
        # Which of our neurons are in this plane, and which columns are they?
        columns_here = neuron_columns[neuron_planes == plane]
        if len(columns_here) == 0:
            continue

        # This plane's neurons, pulled out of the big matrix once rather than inside the
        # loop below: (frames, neurons in this plane). And this plane's own clock.
        plane_dff = dff_all[:, columns_here]
        plane_timestamps = session['timestamps'][plane]

        # One event at a time. For each event we ask "which frames are the window
        # samples?" and copy those rows out of the activity matrix.
        for event_index, event_time in enumerate(event_times):
            frames = nearest_frame(plane_timestamps, event_time + window)

            # (window samples, neurons in this plane) for this one event.
            cut = plane_dff[frames]

            # Subtract THIS window's own pre-event baseline, so a neuron that happens to
            # be more active later in the session does not show up as a response.
            baseline = cut[window < 0].mean(axis=0)

            aligned[event_index][:, columns_here] = cut - baseline

    return aligned
```

```{code-cell} ipython3
gratings_aligned = align_to_events(gratings, gratings_change_times, window)

print('dff             (frames, ROIs)          :', gratings_dff.shape)
print('aligned (events, window samples, ROIs)  :', gratings_aligned.shape)
```

Does the function agree with the cut we made by hand? Same neuron, same event, so the two should be identical to the last decimal.

```{code-cell} ipython3
by_hand = one_cut - one_cut[window < 0].mean()
from_function = gratings_aligned[10, :, example_column]

print('max difference:', np.abs(by_hand - from_function).max())
print('identical     :', np.allclose(by_hand, from_function))
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h4>Two ways to summarise that array</h4>

The aligned array has three axes, and the two things we plot are averages over **different** ones:

- average over *events* → `(window, neurons)`: the mean time course, the shape of the response.
- average over the *first second after the event* → `(events, neurons)`: one number per trial per
  neuron, which is what tuning and cross-session correlations need.

Do both explicitly, then look at what each gives for our example neuron.

</div>

```{code-cell} ipython3
# Average over events -> the mean time course.
gratings_change_aligned = gratings_aligned.mean(axis=0)

# Average over the first second after the event -> one number per event per neuron.
in_response_window = (window >= 0) & (window <= 1)
gratings_response_per_change = gratings_aligned[:, in_response_window, :].mean(axis=1)

print('aligned             (events, window, neurons):', gratings_aligned.shape)
print('  mean over axis 0  (window, neurons)        :', gratings_change_aligned.shape)
print('  mean over axis 1  (events, neurons)        :', gratings_response_per_change.shape)
```

```{code-cell} ipython3
fig, axes = plt.subplots(1, 3, figsize=(16, 4))

# LEFT: every event for this neuron, and their mean -- what axis 0 averages over.
for one_event in gratings_aligned[:, :, example_column]:
    axes[0].plot(window, one_event, color='gray', linewidth=0.4, alpha=0.4)
axes[0].plot(window, gratings_change_aligned[:, example_column],
             color='black', linewidth=2.5, label='mean over events')
axes[0].axvspan(0, 1, color='#4C8FCC', alpha=0.15)
axes[0].set_title(f'all {gratings_aligned.shape[0]} changes, one neuron')
axes[0].set_ylabel(r'$\Delta$F/F change from baseline')
axes[0].legend(frameon=False, fontsize=11)

# MIDDLE: the mean time course on its own.
axes[1].plot(window, gratings_change_aligned[:, example_column], color='black', linewidth=2)
axes[1].axvspan(0, 1, color='#4C8FCC', alpha=0.15, label='response window')
axes[1].set_title('mean time course')
axes[1].legend(frameon=False, fontsize=11)

# RIGHT: one number per event -- the shaded window above, averaged.
axes[2].plot(gratings_response_per_change[:, example_column], marker='o', linestyle='none',
             markersize=3, color='black')
axes[2].axhline(0, color='gray', linewidth=0.5)
axes[2].set_xlabel('Change number')
axes[2].set_ylabel(r'mean $\Delta$F/F, 0 to 1 s')
axes[2].set_title('response per change')

for ax in axes[:2]:
    ax.axhline(0, color='gray', linewidth=0.5)
    ax.axvline(0, color='tab:red', linestyle='--', linewidth=1)
    ax.set_xlabel('Time from change (s)')
fig.tight_layout()
plt.show()
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

The left panel is the honest picture of what an event-aligned average is: a cloud of single trials,
most of which look like nothing, with a mean that is much smaller than any individual transient.

We need these two summaries for the second session as well, so wrap them up. The full
`(events, window, neurons)` array is the largest object this notebook creates, so it is deleted once
the two summaries are derived from it.

</div>

```{code-cell} ipython3
def event_response(session, event_times, window):
    """The two summaries of the aligned array that every plot below uses.

    Returns (mean_time_course, response_per_event):

    - mean_time_course   : (window, neurons) -- averaged over EVENTS
    - response_per_event : (events, neurons) -- averaged over the first second AFTER
                           the event, i.e. one number per event per neuron

    Both keep the full neuron axis, so the same column_in_dff selects a neuron in the
    raw traces, in the mean time course, and in the per-event responses.
    """
    aligned = align_to_events(session, event_times, window)

    mean_time_course = aligned.mean(axis=0)

    in_response_window = (window >= 0) & (window <= 1)
    response_per_event = aligned[:, in_response_window, :].mean(axis=1)

    print(f'{len(event_times)} events  |  aligned {aligned.shape} '
          '(events, window, all ROIs)')
    print('  mean_time_course   (window, neurons):', mean_time_course.shape)
    print('  response_per_event (events, neurons):', response_per_event.shape)

    # Both summaries are derived, so the full array -- the largest object here -- can go.
    del aligned
    gc.collect()

    return mean_time_course, response_per_event
```

```{code-cell} ipython3
del gratings_aligned
gc.collect()
print('freed the full (events, window, neurons) array')
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h2>Part 3: The change response, by cell type</h2>

Now the population version. Two figures: a heatmap with one row per typed neuron, and the mean
trace per inhibitory subclass.

Start with the array behind the heatmap. `gratings_change_aligned` is `(window, all ROIs)`, and the
heatmap wants only the typed neurons — selected, as always, with `column_in_dff`.

</div>

```{code-cell} ipython3
typed_columns = gratings['typed']['column_in_dff'].values
typed_aligned = gratings_change_aligned[:, typed_columns]

print('change_aligned (window, ALL ROIs)  :', gratings_change_aligned.shape)
print('typed_aligned  (window, typed ROIs):', typed_aligned.shape)
print()

# The numbers behind the top-left corner of the heatmap: 4 neurons, 6 time points.
print('the first 4 typed neurons, from -0.2 s to +0.3 s:')
pd.DataFrame(typed_aligned[(window >= -0.2) & (window <= 0.3)][:, :4].T.round(4),
             index=[f'column {c}' for c in typed_columns[:4]],
             columns=[f'{t:+.1f} s' for t in window[(window >= -0.2) & (window <= 0.3)]])
```

Those numbers, transposed and coloured, are the heatmap. The colour strip on the left marks where each subclass block starts and ends, since `typed` is sorted by subclass.

```{code-cell} ipython3
def add_subclass_bar(ax, typed_rois, subclass_order, subclass_colors, label=True):
    """Draw a subclass colour strip just left of a heatmap whose y axis is neurons.

    ax              : the heatmap axes, with one row per neuron
    typed_rois      : the neurons in the heatmap, in the SAME row order as the heatmap
    subclass_order  : which subclasses to draw, top to bottom
    subclass_colors : {subclass name: colour}
    """
    block_sizes = typed_rois['subclass'].value_counts()[subclass_order].values
    block_ends = np.cumsum(block_sizes)
    block_starts = block_ends - block_sizes
    block_centres = block_ends - block_sizes / 2

    # A narrow inset axes glued to the left edge of ax. We set its limits to match rather
    # than using sharey, because sharing would make clearing ax's ticks clear the bar's too.
    bar = ax.inset_axes([-0.045, 0, 0.03, 1])
    bar.set_ylim(len(typed_rois), 0)          # inverted, to match imshow's row order
    bar.set_xlim(0, 1)
    bar.set_xticks([])

    for name, start, size in zip(subclass_order, block_starts, block_sizes):
        bar.axhspan(start, start + size, color=subclass_colors[name], linewidth=0)

    if label:
        bar.set_yticks(block_centres)
        bar.set_yticklabels(subclass_order)
        for tick, name in zip(bar.get_yticklabels(), subclass_order):
            tick.set_color(subclass_colors[name])
            tick.set_fontweight('bold')
        bar.tick_params(length=0, pad=4)
    else:
        bar.set_yticks([])

    for side in bar.spines.values():
        side.set_visible(False)

    # Dividers between adjacent blocks, drawn on the heatmap itself.
    for edge in block_ends[:-1]:
        ax.axhline(edge, color='white', linewidth=2)

    ax.set_yticks([])
    return bar
```

```{code-cell} ipython3
def plot_response_heatmap(session, change_aligned, window,
                         subclass_order, subclass_colors):
    """One row per typed neuron, x is time from the event, colour is dF/F."""
    typed_rois = session['typed']
    typed_aligned = change_aligned[:, typed_rois['column_in_dff'].values]

    # These are baseline-subtracted, so values go both ways and 0 is meaningful. Take
    # the 98th percentile of the absolute values and apply it symmetrically, which keeps
    # white at zero instead of shifting it.
    response_limit = np.percentile(np.abs(typed_aligned), 98)

    fig, ax = plt.subplots(figsize=(8, 6))
    image = ax.imshow(typed_aligned.T, aspect='auto', cmap='RdBu_r',
                      vmin=-response_limit, vmax=response_limit,
                      extent=[window[0], window[-1], len(typed_rois), 0])
    add_subclass_bar(ax, typed_rois, subclass_order, subclass_colors)

    ax.axvline(0, color='black', linestyle='--', linewidth=1)
    ax.set_xlabel('Time from change (s)')
    ax.set_title(f"{len(typed_rois)} typed neurons\n{session['title']}")
    fig.colorbar(image, ax=ax, label=r'$\Delta$F/F', fraction=0.04)
    fig.tight_layout()
    plt.show()


plot_response_heatmap(gratings, gratings_change_aligned, window,
                      subclass_order, subclass_colors)
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h4>The mean trace per subclass</h4>

Averaging the rows of that heatmap within each subclass gives four traces. The averaging itself is
two lines, so pull them out where they can be seen:

</div>

```{code-cell} ipython3
def mean_trace(aligned, columns):
    """Mean across a set of neurons, and the standard error of that mean.

    aligned : (window samples, neurons) -- e.g. a change_aligned array
    columns : which columns to average over

    Returns two (window samples,) arrays.
    """
    traces = aligned[:, columns]
    return traces.mean(axis=1), traces.std(axis=1) / np.sqrt(len(columns))


# What it does, for one subclass.
pvalb_columns = typed_columns[gratings['typed']['subclass'].values == 'Pvalb']
pvalb_mean, pvalb_error = mean_trace(gratings_change_aligned, pvalb_columns)

print(f'{len(pvalb_columns)} Pvalb neurons averaged to one trace of {pvalb_mean.shape[0]} samples')
print(f'peak of that trace: {pvalb_mean.max():.4f} dF/F '
      f'at {window[np.argmax(pvalb_mean)]:+.1f} s')
```

The stimulus shading is read off the stimulus table rather than hardcoded, so the same code handles a grating held on screen for seconds and images flashed several times a second. Look at what `stimulus_spans` returns for this session: a single span, because the grating stays up longer than the window.

```{code-cell} ipython3
def stimulus_spans(stimulus_presentations, window):
    """Where to shade: a list of (start, stop, is_aligned_event) in seconds.

    Read off the stimulus table itself rather than hardcoded, so the same function works
    for gratings held on screen for seconds and for images flashed several times a second.
    """
    # How long one presentation lasts, and how often a new one starts. Medians, because
    # a few presentations at the very start or end of a session can be irregular.
    durations = stimulus_presentations['stop_time'] - stimulus_presentations['start_time']
    duration = np.median(durations)
    interval = np.median(np.diff(stimulus_presentations['start_time']))

    # Is there room for a second presentation inside the plotted window? If not, the
    # stimulus is held on screen and only the aligned event itself is shaded.
    if interval > window[-1] - window[0]:
        return [(0, duration, True)]

    # Flashed stimulus: a regular train of onsets across the window. Build the train,
    # then slide it so that one onset sits exactly at time 0, which is the event.
    onsets = np.arange(window[0], window[-1], interval)
    onsets = onsets - onsets[np.argmin(np.abs(onsets))]

    # The flash at time 0 is the event we aligned to; the rest are its neighbours.
    return [(onset, onset + duration, abs(onset) < 0.01) for onset in onsets]


def shade_stimulus(ax, stimulus_presentations, window):
    """Shade the flashes on a change-aligned axis: the change blue, the repeats grey."""
    for start, stop, is_change in stimulus_spans(stimulus_presentations, window):
        shade_color = '#4C8FCC' if is_change else '#D9D9D9'
        ax.axvspan(start, stop, color=shade_color, alpha=0.30, linewidth=0)

    ax.axvline(0, color='#2C5F8A', linestyle='--', linewidth=1)


def shade_omission(ax, stimulus_presentations, window):
    """Shade the flashes on an omission-aligned axis, leaving time 0 blank.

    stimulus_spans marks the presentation at time 0 as the aligned-to event. Here that
    flash was omitted, so we skip its span instead of shading it.
    """
    for start, stop, is_aligned_event in stimulus_spans(stimulus_presentations, window):
        if is_aligned_event:
            continue
        ax.axvspan(start, stop, color='#D9D9D9', alpha=0.30, linewidth=0)

    ax.axvline(0, color='#2C5F8A', linestyle='--', linewidth=1)
```

```{code-cell} ipython3
spans = stimulus_spans(gratings['stimulus'], window)

print(f'{len(spans)} span(s) to shade, in seconds relative to the change:')
for start, stop, is_event in spans:
    print(f'   {start:+.2f} to {stop:+.2f}   aligned event: {is_event}')
```

```{code-cell} ipython3
def plot_subclass_means(session, change_aligned, window,
                        subclass_order, subclass_colors, xlabel='Time from change (s)'):
    """One mean trace per inhibitory subclass, with a shaded standard error."""
    typed_rois = session['typed']
    typed_columns = typed_rois['column_in_dff'].values
    subclass_of_row = typed_rois['subclass'].values

    fig, ax = plt.subplots(figsize=(8, 5.5))
    shade_stimulus(ax, session['stimulus'], window)

    for name in subclass_order:
        columns = typed_columns[subclass_of_row == name]
        if len(columns) == 0:
            continue
        mean, standard_error = mean_trace(change_aligned, columns)

        ax.plot(window, mean, color=subclass_colors[name], linewidth=2,
                label=f'{name} (n={len(columns)})')
        ax.fill_between(window, mean - standard_error, mean + standard_error,
                        color=subclass_colors[name], alpha=0.2)

    ax.axhline(0, color='gray', linewidth=0.5)
    ax.set_xlabel(xlabel)
    ax.set_ylabel(r'$\Delta$F/F change from baseline')
    ax.set_title(f"Mean by subclass\n{session['title']}")
    ax.legend(frameon=False)
    fig.tight_layout()
    plt.show()


plot_subclass_means(gratings, gratings_change_aligned, window,
                    subclass_order, subclass_colors)
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

The response is a single bump that decays while the grating is still on screen. That shape is the
sanity check: it peaks after time 0, not before, which is what tells you the frame rounding and the
per-plane clocks were handled correctly.

Read the subclass means with the sample sizes in mind — some subclasses have only a dozen neurons in
one session.

</div>

+++

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h2>Part 4: Which stimulus did each neuron prefer?</h2>

The change-aligned trace collapses over *what* the stimulus was. Splitting by stimulus instead gives
tuning, and what "tuning" means depends on the session: in gratings sessions the stimulus that
changes has an **orientation**, in natural image sessions it has an **image identity**. Both are
columns of the trials table, so we read whichever one varies.

One trap: in gratings sessions *both* columns are filled, but `change_image_name` holds strings like
`'gratings_0'`, `'gratings_180'`, which sort alphabetically into the wrong order.
`change_orientation` is numeric, so prefer it.

</div>

```{code-cell} ipython3
def change_stimulus_labels(trials, change_times):
    """What was shown at each usable change: orientation for gratings, image for images.

    Returns (column_name, one label per change). change_orientation is filled in on
    every trial including aborted ones, so we select the same trials we aligned to
    rather than calling dropna().
    """
    is_used_change = trials['change_time'].isin(change_times).values

    for column in ['change_orientation', 'change_image_name']:
        if column not in trials:
            continue

        values = trials[column].values[is_used_change]

        # Only one of the two columns actually varies in a given session; that is the
        # one describing the stimulus the mouse had to discriminate.
        present_values = values[pd.notna(values)]
        if len(pd.unique(present_values)) > 1:
            return column, values

    raise ValueError('no varying stimulus column found in the trials table')


gratings_stimulus_column, gratings_change_labels = change_stimulus_labels(
    gratings['trials'], gratings_change_times)

print('stimulus column:', gratings_stimulus_column)
print('one label per usable change:', gratings_change_labels.shape)
print()

# The two arrays side by side: what happened, and when.
pd.DataFrame({'change time (s)': gratings_change_times.round(2),
              gratings_stimulus_column: gratings_change_labels}).head(6)
```

How often each stimulus was the change.

```{code-cell} ipython3
pd.Series(gratings_change_labels).value_counts().sort_index()
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h4>From per-trial responses to a tuning curve</h4>

`response_per_change` is `(changes, neurons)`. Grouping its rows by what was on screen and averaging
each group gives `(conditions, neurons)` — one tuning curve per neuron, down a column.

</div>

```{code-cell} ipython3
conditions = sorted(pd.unique(gratings_change_labels))

# One row per condition: the mean response over the changes of that condition.
gratings_tuning = np.stack([
    gratings_response_per_change[gratings_change_labels == condition].mean(axis=0)
    for condition in conditions])

print('response_per_change (changes, neurons)   :', gratings_response_per_change.shape)
print('tuning              (conditions, neurons):', gratings_tuning.shape)
print()

print('the tuning curves of four typed neurons, as raw dF/F:')
pd.DataFrame(gratings_tuning[:, typed_columns[:4]].round(4), index=conditions,
             columns=[f'column {c}' for c in typed_columns[:4]])
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

Those raw numbers are not comparable between neurons: a neuron with big transients has a big value
in every condition. **Z-scoring** each neuron across conditions — subtract its mean, divide by its
standard deviation — removes the overall responsiveness and leaves only the *relative* preference,
which is what the heatmap should show.

Here is what that does to one neuron.

</div>

```{code-cell} ipython3
gratings_tuning_z = ((gratings_tuning - gratings_tuning.mean(axis=0))
                     / (gratings_tuning.std(axis=0) + 1e-9))

# The neuron whose preference is strongest, so the effect of z-scoring is visible.
tuned_column = typed_columns[int(np.argmax(gratings_tuning_z[:, typed_columns].max(axis=0)))]

fig, axes = plt.subplots(1, 2, figsize=(12, 4))
condition_positions = np.arange(len(conditions))

axes[0].bar(condition_positions, gratings_tuning[:, tuned_column], color='#4C72B0')
axes[0].set_ylabel(r'mean $\Delta$F/F')
axes[0].set_title('raw tuning curve')

axes[1].bar(condition_positions, gratings_tuning_z[:, tuned_column], color='#4C72B0')
axes[1].axhline(0, color='gray', linewidth=0.8)
axes[1].set_ylabel('z-scored')
axes[1].set_title('after z-scoring within this neuron')

for ax in axes:
    ax.set_xticks(condition_positions)
    ax.set_xticklabels([str(c).replace('.0', '') for c in conditions])
    ax.set_xlabel('orientation (deg)')
fig.suptitle(f'One neuron (column {tuned_column})')
fig.tight_layout()
plt.show()
```

Both steps in one function, since the second session needs them too.

```{code-cell} ipython3
def tuning_matrix(response_per_change, change_labels):
    """Mean response per stimulus condition, z-scored within each neuron.

    Returns (conditions, tuning_z) where tuning_z is (conditions, neurons).
    """
    conditions = sorted(pd.unique(change_labels))

    tuning = np.stack([response_per_change[change_labels == condition].mean(axis=0)
                       for condition in conditions])
    tuning_z = (tuning - tuning.mean(axis=0)) / (tuning.std(axis=0) + 1e-9)

    return conditions, tuning_z
```

The heatmap: one row per neuron, one column per condition. Neurons are sorted by which condition they prefer, which is what produces the diagonal.

```{code-cell} ipython3
def plot_tuning(session, conditions, tuning_z, stimulus_column,
                subclass_order, subclass_colors):
    """Z-scored tuning, all analyzed neurons then the typed ones grouped by subclass."""
    analyzed_columns = session['rois']['column_in_dff'].values
    typed_rois = session['typed']

    # Colour limit from the data: the 98th percentile of the absolute z-scores, applied
    # symmetrically so 0 stays at the middle of the diverging colormap.
    response_limit = np.percentile(np.abs(tuning_z[:, analyzed_columns]), 98)

    # Which condition each neuron responds to most strongly. One index per neuron.
    preferred_condition = tuning_z.argmax(axis=0)

    fig, axes = plt.subplots(1, 2, figsize=(13, 8.5),
                             gridspec_kw={'wspace': 0.45, 'right': 0.86})

    # LEFT: every analyzed neuron, sorted by preference.
    analyzed_order = analyzed_columns[np.argsort(preferred_condition[analyzed_columns])]
    axes[0].imshow(tuning_z[:, analyzed_order].T, aspect='auto', cmap='RdBu_r',
                   vmin=-response_limit, vmax=response_limit)
    axes[0].set_ylabel('Neuron (sorted by preference)')
    axes[0].set_title(f'All {len(analyzed_columns)} analyzed neurons')

    # RIGHT: typed neurons, grouped by subclass and sorted by preference WITHIN each
    # block. Sorting the table keeps each neuron with its column number.
    typed_by_preference = typed_rois.assign(
        preferred_condition=preferred_condition[typed_rois['column_in_dff'].values],
    ).sort_values(['subclass', 'preferred_condition'])

    image = axes[1].imshow(tuning_z[:, typed_by_preference['column_in_dff'].values].T,
                           aspect='auto', cmap='RdBu_r',
                           vmin=-response_limit, vmax=response_limit)
    add_subclass_bar(axes[1], typed_by_preference, subclass_order, subclass_colors)
    axes[1].set_title('Sorted by cell type, then preference')

    for ax in axes:
        ax.set_xticks(range(len(conditions)))
        ax.set_xticklabels([str(c).replace('.0', '') for c in conditions], rotation=45)
        ax.set_xlabel('orientation (deg)' if 'orientation' in stimulus_column else 'image')

    colorbar_axes = fig.add_axes([0.90, 0.15, 0.02, 0.7])
    fig.colorbar(image, cax=colorbar_axes, label='z-scored response')
    fig.suptitle(session['title'])
    plt.show()


plot_tuning(gratings, conditions, gratings_tuning_z, gratings_stimulus_column,
            subclass_order, subclass_colors)
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

Look at the columns of the left panel. The **0&deg; and 180&deg;** columns resemble each other, and
so do 90&deg; and 270&deg;.

That is expected: a *static* grating at 0&deg; and one at 180&deg; are the same image. There are
really only two orientations here, each measured twice — which is a free reliability check, since a
genuinely tuned neuron should give the same answer both times.

Always look at the raw tuning matrix before computing a selectivity score from it.

</div>

+++

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h2>Part 5: A familiar natural image session</h2>

Now the same analysis on `OPHYS_1_images_A`, where the mouse performs the same task with natural
images it has seen for days.

What differs from gratings:

| | Gratings (`TRAINING_1`) | Natural images (`OPHYS_*`) |
| --- | --- | --- |
| What changes | orientation (4 values, 2 distinct) | image identity (8 images) |
| Trials column | `change_orientation` | `change_image_name` |
| On screen | static, ~2.4 s, every ~10 s | flashed, 250 ms every 750 ms |
| Blank flashes | no | yes, ~5% of flashes **omitted** |

Not one of the functions above needs changing, because every one of them reads the stimulus out of
the session rather than assuming it. Loading is now a single call.

</div>

```{code-cell} ipython3
familiar = load_session(familiar_session, coreg_table, cell_types, subclass_order)
describe(familiar)

print()
print('flashes  :', len(familiar['stimulus']))
print('  changes:', int(familiar['stimulus']['is_change'].sum()))
print('  omitted:', int(familiar['stimulus']['omitted'].sum()))
print('  images :', sorted(familiar['stimulus']['image_name'].unique()))
```

Align it to its image changes: the same three calls as before.

```{code-cell} ipython3
familiar_change_times = usable_event_times(
    familiar['trials']['change_time'].dropna().values, familiar, window)

familiar_change_aligned, familiar_response_per_change = event_response(
    familiar, familiar_change_times, window)
```

The stimulus is flashed here, so `stimulus_spans` returns a whole train instead of one span — the same function, a different answer, read off this session's stimulus table.

```{code-cell} ipython3
spans = stimulus_spans(familiar['stimulus'], window)

print(f'{len(spans)} spans to shade. The first four:')
for start, stop, is_event in spans[:4]:
    print(f'   {start:+.2f} to {stop:+.2f}   aligned event: {is_event}')
```

```{code-cell} ipython3
plot_response_heatmap(familiar, familiar_change_aligned, window,
                      subclass_order, subclass_colors)
```

```{code-cell} ipython3
plot_subclass_means(familiar, familiar_change_aligned, window,
                    subclass_order, subclass_colors)
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

The traces **oscillate at 1.33 Hz**, which is the flash rate — the grey spans line up with each
subsequent peak, so the ringing is the stimulus, not noise. This is why we did gratings first: a
static stimulus gives one clean bump, which makes it much easier to recognise that the alignment is
correct before moving to a rhythmic stimulus.

</div>

+++

Tuning, now over the eight natural images of set A rather than over orientation.

```{code-cell} ipython3
familiar_stimulus_column, familiar_change_labels = change_stimulus_labels(
    familiar['trials'], familiar_change_times)

familiar_conditions, familiar_tuning_z = tuning_matrix(
    familiar_response_per_change, familiar_change_labels)

print('stimulus column:', familiar_stimulus_column)
print('tuning_z (conditions, neurons):', familiar_tuning_z.shape)
print()
print(pd.Series(familiar_change_labels).value_counts().sort_index().to_string())
```

```{code-cell} ipython3
plot_tuning(familiar, familiar_conditions, familiar_tuning_z, familiar_stimulus_column,
            subclass_order, subclass_colors)
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h3>Is that diagonal real?</h3>

The tuning heatmap has a striking diagonal — but be careful, because **sorting neurons by their
preferred condition produces a diagonal even in pure noise.** Each neuron's peak is put in its own
column by construction.

The honest check is **split-half reliability**: build the tuning curve twice from random halves of
the trials, and correlate the two. A neuron with a real preference gives the same answer both
times. The function returns the two half-curves as well as the correlation, so we can look at
them.

</div>

```{code-cell} ipython3
def tuning_reliability(session, response_per_change, change_labels, seed=1):
    """Split-half reliability of each neuron's tuning.

    Returns (reliability, curve_a, curve_b): one correlation per analyzed neuron, and
    the two half-session tuning curves it was computed from, each (conditions, neurons).
    """
    analyzed_columns = session['rois']['column_in_dff'].values
    conditions = sorted(pd.unique(change_labels))

    # Split the changes into two random halves. Shuffling the trial numbers first is
    # what makes the halves random rather than first-half / second-half of the session,
    # which would confound reliability with drift over the session.
    n_changes = len(change_labels)
    shuffled_trials = np.random.default_rng(seed).permutation(n_changes)
    half_a = shuffled_trials[:n_changes // 2]
    half_b = shuffled_trials[n_changes // 2:]

    # One tuning curve per half: mean response per condition, (conditions, neurons).
    def tuning_curve(trials_to_use):
        rows = []
        for condition in conditions:
            trials_in_condition = trials_to_use[change_labels[trials_to_use] == condition]
            rows.append(response_per_change[trials_in_condition][:, analyzed_columns].mean(axis=0))
        return np.stack(rows)

    curve_a = tuning_curve(half_a)
    curve_b = tuning_curve(half_b)

    # Correlate the two curves, one neuron at a time.
    reliability = np.array([np.corrcoef(curve_a[:, i], curve_b[:, i])[0, 1]
                            for i in range(len(analyzed_columns))])

    return reliability, curve_a, curve_b


familiar_reliability, curve_a, curve_b = tuning_reliability(
    familiar, familiar_response_per_change, familiar_change_labels)

print('one r per analyzed neuron:', familiar_reliability.shape)
print(f'median split-half r: {np.nanmedian(familiar_reliability):.2f}')
print(f'fraction of neurons with r > 0.5: {np.nanmean(familiar_reliability > 0.5):.2f}')
```

What a high and a low correlation actually look like: the two half-session tuning curves for the most and least reliable neuron, and the distribution over all of them.

```{code-cell} ipython3
most_reliable = int(np.nanargmax(familiar_reliability))
least_reliable = int(np.nanargmin(familiar_reliability))

fig, axes = plt.subplots(1, 3, figsize=(16, 4))
condition_positions = np.arange(len(familiar_conditions))

for ax, neuron, label in [(axes[0], most_reliable, 'most reliable'),
                          (axes[1], least_reliable, 'least reliable')]:
    ax.plot(condition_positions, curve_a[:, neuron], marker='o', label='half A')
    ax.plot(condition_positions, curve_b[:, neuron], marker='o', label='half B')
    ax.set_xticks(condition_positions)
    ax.set_xticklabels(familiar_conditions, rotation=45)
    ax.set_xlabel('image')
    ax.set_ylabel(r'mean $\Delta$F/F')
    ax.set_title(f'{label}: r = {familiar_reliability[neuron]:.2f}')
    ax.legend(frameon=False, fontsize=11)

axes[2].hist(familiar_reliability[~np.isnan(familiar_reliability)],
             bins=np.arange(-1, 1.05, 0.1), color='#4C72B0')
axes[2].axvline(0.5, color='tab:red', linestyle='--', label='r = 0.5')
axes[2].set_xlabel('Split-half r')
axes[2].set_ylabel('Neurons')
axes[2].set_title('All analyzed neurons')
axes[2].legend(frameon=False, fontsize=11)

fig.tight_layout()
plt.show()
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

If the median is comfortably positive and a good fraction of neurons exceed 0.5, image preference in
this session is a real, repeatable property and the diagonal is not just the sorting.

Try the same function on the gratings session to compare — there are only two distinct orientations
there, so expect a different picture.

</div>

+++

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h2>Part 6: The event that is an absence — omissions</h2>

In the `OPHYS_` sessions about 5% of flashes are simply **left out**: the screen stays grey for one
750 ms cycle and then the train resumes. Nothing appears, nothing changes, and the mouse is not
required to do anything.

That makes omissions the natural companion to changes. A change response is driven by the stimulus;
an omission response cannot be, because there was no stimulus — it reflects what the animal
*expected* to see. The gratings session has none of these, which is why this part needs the image
session.

Omissions are rows of the **stimulus** table, not the trials table.

</div>

```{code-cell} ipython3
omitted_flashes = familiar['stimulus'][familiar['stimulus']['omitted']]

print(f"{len(omitted_flashes)} omitted flashes out of {len(familiar['stimulus'])}")
print()
omitted_flashes[['start_time', 'stop_time', 'image_name', 'omitted', 'is_change']].head(4)
```

What an omission looks like in the stimulus table: the flash train around one of them, with the gap where a flash should have been.

```{code-cell} ipython3
one_omission = omitted_flashes['start_time'].values[5]

# Every flash within 3 s of it, omitted or not.
nearby = familiar['stimulus'][
    (familiar['stimulus']['start_time'] > one_omission - 3)
    & (familiar['stimulus']['start_time'] < one_omission + 3)]

fig, ax = plt.subplots(figsize=(13, 2.6))
for _, flash in nearby.iterrows():
    if flash['omitted']:
        continue
    ax.axvspan(flash['start_time'] - one_omission, flash['stop_time'] - one_omission,
               color='#D9D9D9')

ax.axvline(0, color='#2C5F8A', linestyle='--', linewidth=1.5)
ax.text(0, 0.5, ' the flash that never came', color='#2C5F8A', va='center', fontsize=12)
ax.set_yticks([])
ax.set_xlim(-3, 3)
ax.set_xlabel('Time from omission (s)')
ax.set_title('The flash train around one omission')
fig.tight_layout()
plt.show()
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

The alignment machinery is already written. `usable_event_times` and `align_to_events` never look at
what the event was; they take a list of times and cut windows around them. So the only new thing
here is where the times come from.

</div>

```{code-cell} ipython3
# start_time of an omitted flash is when the flash WOULD have come on.
familiar_omission_times = usable_event_times(
    omitted_flashes['start_time'].values, familiar, window)

familiar_omission_aligned, _ = event_response(familiar, familiar_omission_times, window)

print(f'\n{len(omitted_flashes)} omissions in the stimulus table, '
      f'{len(familiar_omission_times)} usable')
```

The shading has to change with the alignment. On an omission-aligned axis the flash at time 0 is the one that never happened, so `shade_omission` skips it — compare the two functions on the same spans.

```{code-cell} ipython3
fig, axes = plt.subplots(1, 2, figsize=(13, 2.6), sharey=True)

shade_stimulus(axes[0], familiar['stimulus'], window)
axes[0].set_title('shade_stimulus: the change is blue')

shade_omission(axes[1], familiar['stimulus'], window)
axes[1].set_title('shade_omission: time 0 left blank')

for ax in axes:
    ax.set_yticks([])
    ax.set_xlim(window[0], window[-1])
    ax.set_xlabel('Time from event (s)')
fig.tight_layout()
plt.show()
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

Both alignments for the same neurons, on shared axes so the two rows are directly comparable:
change-aligned on top, omission-aligned below, one column per cell type. `mean_trace` is doing the
averaging in every panel, exactly as it did in Part 3.

</div>

```{code-cell} ipython3
fig, axes = plt.subplots(2, len(subclass_order), figsize=(20, 8),
                         sharey=True, sharex=True)

typed_rois = familiar['typed']
familiar_typed_columns = typed_rois['column_in_dff'].values

# One row per alignment: the mean time course, how to shade it, and its x label.
alignments = [
    {'aligned': familiar_change_aligned, 'shade': shade_stimulus,
     'xlabel': 'Time from change (s)', 'n_events': len(familiar_change_times)},
    {'aligned': familiar_omission_aligned, 'shade': shade_omission,
     'xlabel': 'Time from omission (s)', 'n_events': len(familiar_omission_times)},
]

for row, alignment in enumerate(alignments):
    for ax, name in zip(axes[row], subclass_order):
        columns = familiar_typed_columns[typed_rois['subclass'].values == name]
        mean, standard_error = mean_trace(alignment['aligned'], columns)

        ax.plot(window, mean, color=subclass_colors[name], linewidth=2,
                label=f"{alignment['n_events']} events")
        ax.fill_between(window, mean - standard_error, mean + standard_error,
                        color=subclass_colors[name], alpha=0.2)

        alignment['shade'](ax, familiar['stimulus'], window)
        ax.axhline(0, color='gray', linewidth=0.5)
        ax.set_xlabel(alignment['xlabel'])
        ax.legend(frameon=False, fontsize=11)

        if row == 0:
            ax.set_title(f'{name} (n={len(columns)})')

axes[0][0].set_ylabel(r'$\Delta$F/F change' + '\nchange-aligned')
axes[1][0].set_ylabel(r'$\Delta$F/F change' + '\nomission-aligned')
fig.suptitle(familiar['title'])
fig.tight_layout()
plt.show()
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

Two things to keep in mind when reading the bottom row. There are far fewer omissions than changes
in a session, so those traces are averaged over fewer events and are correspondingly noisier — the
event counts are in the legends. And an omission interrupts the flash train, so the stimulus-locked
ripple visible in the top row breaks at time 0 in the bottom row; that discontinuity is the omission
itself, not a response to it.

One session in one mouse is a demonstration of the method, not a result: the per-subclass sample
sizes here are far too small to conclude anything about a cell type.

</div>

+++

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h2>Where to go next</h2>

- **Split changes by outcome.** `trials` has `hit` and `miss` as boolean columns, so aligning to
  each separately asks whether the neural response differs when the mouse reports the change.
  Interpret differences beyond about a second after the change with care: by then the mouse has
  licked and consumed reward, so movement and reward are mixed in with vision.
- **Align to something else entirely.** `align_to_events` takes any list of times. Licks and rewards
  are in `session['nwb'].events['events']`, one row per instant, with an `event_type` column.
- **Look before the event.** Everything here uses the mean over the first second after the event.
  The pre-event window is not just baseline — anticipation of a flash shows up there.
- **Change the population.** `subset_neurons` keeps somas matched to an HCR cell. Relax either
  condition to re-run any plot on the full recorded population, and check that a result on
  coregistered cells also holds there.
- **Compare sessions.** These two sessions were analyzed independently — nothing here knows that a
  neuron in one is a neuron in the other. The next notebook,
  `Tutorial-VisualLearning-Cross-Session-Analysis.ipynb`, does the matching and compares the same
  neurons across days.

</div>
