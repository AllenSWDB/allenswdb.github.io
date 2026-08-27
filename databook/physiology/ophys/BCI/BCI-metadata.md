---
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.15.0
kernelspec:
  display_name: Python 3 (ipykernel)
  language: python
  name: query
---

# BCI Dataset

This page describes how to access metadata for the Brain Computer Interface (BCI) dataset using the Allen Institute's metadata API. The dataset contains two-photon calcium imaging sessions from primary motor cortex while mice perform a BCI task.

```{code-cell} ipython3
import pandas as pd
from datetime import datetime, date
import os
```

```{code-cell} ipython3
from aind_data_access_api.document_db import MetadataDbClient

API_GATEWAY_HOST = "api.allenneuraldynamics.org"
DATABASE = 'metadata_index'
COLLECTION = 'data_assets'

docdb_api_client = MetadataDbClient(
   host=API_GATEWAY_HOST,
   database=DATABASE,
   collection=COLLECTION,
)
print(docdb_api_client._base_url)
```

```{code-cell} ipython3
aggregate = [
  {
    "$match": {
      "session.session_type": "BCI single neuron stim",
      "data_description.data_level": "derived",
      "processing.processing_pipeline.data_processes.start_date_time": {"$gte": "2025-08-03"}
    }
  },
  {
    "$project": {
      "name": 1,
      "subject_id": "$data_description.subject_id",
      "genotype": "$subject.genotype",
      "virus": "$procedures.subject_procedures.procedures.injection_materials.name",
      "date_of_birth": "$subject.date_of_birth",
      "sex": "$subject.sex",
      "session_type": "$session.session_type",
      "session_start_time": "$session.session_start_time",
      "session_end_time": "$session.session_end_time",
      "stimulus_epochs": "$session.stimulus_epochs.stimulus_name",
      "project_name": "$data_description.project_name",
      "modality": "$data_description.modality.name",
      "targeted_structure": "$session.data_streams.stack_parameters.targeted_structure",
      "session_number": {
        "$filter": {
          "input": "$session.stimulus_epochs",
          "as": "epoch",
          "cond": {"$eq": ["$$epoch.stimulus_name", "single neuron BCI conditioning"]}
        }
      },
      "ophys_fov": {
        "$map": {
          "input": "$session.data_streams",
          "as": "stream",
          "in": {
            "$map": {
              "input": "$$stream.ophys_fovs",
              "as": "fov",
              "in": "$$fov.notes"
            }
          }
        }
      },
      "magnification": "$session.data_streams.stack_parameters.magnification",
    }
  },
  {
    "$project": {
      "name": 1,
      "subject_id": 1,
      "genotype": 1,
      "virus": 1,
      "date_of_birth": 1,
      "sex": 1,
      "session_type": 1,
      "session_start_time": 1,
      "session_end_time": 1,
      "stimulus_epochs": 1,
      "project_name": 1,
      "modality": 1,
      "targeted_structure": 1,
      "session_number": {"$arrayElemAt": ["$session_number.session_number", 0]},
      "ophys_fov": 1,
      "magnification": 1
    }
  },
  {"$unwind": {"path": "$ophys_fov", "preserveNullAndEmptyArrays": False}},
  {"$unwind": {"path": "$ophys_fov", "preserveNullAndEmptyArrays": False}},
  {"$unwind": {"path": "$virus", "preserveNullAndEmptyArrays": False}},
  {"$unwind": {"path": "$virus", "preserveNullAndEmptyArrays": False}},
  {"$unwind": {"path": "$virus", "preserveNullAndEmptyArrays": False}},
  {"$unwind": {"path": "$modality", "preserveNullAndEmptyArrays": False}},
  {"$unwind": {"path": "$targeted_structure", "preserveNullAndEmptyArrays": False}},
  {"$unwind": {"path": "$magnification", "preserveNullAndEmptyArrays": False}},
]

records = docdb_api_client.aggregate_docdb_records(pipeline=aggregate)
```

We can turn these records into a dataframe and reorganize some things:

```{code-cell} ipython3
df = pd.DataFrame(records)
df = df.drop_duplicates(subset="name")

df['session_date'] = df.apply(lambda x: datetime.fromisoformat(x['session_start_time']).date(), axis=1)
df['session_start_time'] = df.apply(lambda x: datetime.fromisoformat(x['session_start_time']).time(), axis=1)
df['session_end_time'] = df.apply(lambda x: datetime.fromisoformat(x['session_end_time']).time(), axis=1)
df['date_of_birth'] = df.apply(lambda x: datetime.strptime(x['date_of_birth'], '%Y-%m-%d').date(), axis=1)
df['age'] = df.apply(lambda x: (x['session_date'] - x['date_of_birth']).days, axis=1)

order = ['project_name', 'session_type', '_id', 'name', 'subject_id', 'genotype', 'virus',
         'date_of_birth', 'age', 'sex', 'modality', 'session_date', 'session_start_time',
         'session_end_time', 'targeted_structure', 'ophys_fov', 'session_number']
df = df[order]
```

We'll filter df for only the data assets shared for SWDB. 

```{code-cell} ipython3

v2_assets = ['single-plane-ophys_731015_2025-01-10_18-06-31_processed_2025-08-03_20-39-09',
 'single-plane-ophys_731015_2025-01-24_20-00-44_processed_2025-08-04_06-27-07',
 'single-plane-ophys_731015_2025-01-28_18-56-35_processed_2025-08-03_21-58-28',
 'single-plane-ophys_731015_2025-01-31_20-37-19_processed_2025-08-06_05-37-58',
 'single-plane-ophys_740369_2025-01-09_17-18-37_processed_2025-08-06_03-49-53',
 'single-plane-ophys_740369_2025-01-13_17-31-04_processed_2025-08-04_17-59-13',
 'single-plane-ophys_740369_2025-01-24_21-18-11_processed_2025-08-04_06-39-23',
 'single-plane-ophys_740369_2025-01-30_18-44-54_processed_2025-08-04_13-31-14',
 'single-plane-ophys_740369_2025-02-03_19-18-31_processed_2025-08-03_23-27-56',
 'single-plane-ophys_754303_2025-01-22_18-22-38_processed_2025-08-06_18-52-36',
 'single-plane-ophys_754303_2025-01-23_19-48-32_processed_2025-08-08_15-29-29',
 'single-plane-ophys_754303_2025-01-27_20-01-31_processed_2025-08-07_06-00-10',
 'single-plane-ophys_754303_2025-01-29_16-07-41_processed_2025-08-04_04-39-41',
 'single-plane-ophys_754303_2025-01-31_15-13-50_processed_2025-08-05_20-00-52',
 'single-plane-ophys_766719_2025-01-22_16-45-18_processed_2025-08-06_17-55-43',
 'single-plane-ophys_766719_2025-01-23_18-24-57_processed_2025-08-04_05-56-15',
 'single-plane-ophys_766719_2025-01-27_18-25-39_processed_2025-08-07_04-04-45',
 'single-plane-ophys_767715_2025-01-31_18-15-21_processed_2025-08-06_07-02-58',
 'single-plane-ophys_767715_2025-02-03_17-30-05_processed_2025-08-03_23-22-19',
 'single-plane-ophys_767715_2025-02-06_18-59-24_processed_2025-08-06_19-25-46',
 'single-plane-ophys_767715_2025-02-10_16-04-20_processed_2025-08-05_12-52-18',
 'single-plane-ophys_767715_2025-02-17_17-41-50_processed_2025-08-05_01-05-20']

filtered_df = df[df['name'].isin(v2_assets)]
filtered_df = filtered_df.sort_values(by=['subject_id']).reset_index(drop=True)
filtered_df
```

The total number of sessions:

```{code-cell} ipython3
print(len(filtered_df))
```

What are the unique subjects:

```{code-cell} ipython3
print(filtered_df['subject_id'].unique())
```

What are the unique genotypes:

```{code-cell} ipython3
print(filtered_df['genotype'].unique())
```

How many sessions per subject:

```{code-cell} ipython3
filtered_df.groupby('subject_id')['name'].count()
```
