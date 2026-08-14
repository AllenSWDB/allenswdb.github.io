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

# V1DD Dataset

```{code-cell} ipython3
import pandas as pd 
import numpy as np
from datetime import datetime, date
```

```{code-cell} ipython3
from aind_data_access_api.document_db import MetadataDbClient

API_GATEWAY_HOST = "api.allenneuraldynamics.org"
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
aggregate = [
  {
    "$match": {
      "data_description.project_name": {
        "$regex": "V1 Deep Dive",
        "$options": "i"
      },
      "name": {
        "$regex": "filtered",
        "$options": "i"
      },
      "location": {
        "$regex": "aind-open-data",
        "$options": "i"
      }
    }
  },
  {
    "$project": {
      "name": 1, 
      "subject_id": "$data_description.subject_id",
      "genotype": "$subject.subject_details.genotype", 
      "date_of_birth": "$subject.subject_details.date_of_birth", 
      "sex": "$subject.subject_details.sex", 
      "session_time": "$acquisition.acquisition_start_time",
      "project_name": "$data_description.project_name", 
      "modality": "$data_description.modalities.name",
      "column": { "$arrayElemAt": ["$data_description.tags", 0] },
      "volume": { "$arrayElemAt": ["$data_description.tags", 1] }
    }
  },
]
    
records = docdb_api_client.aggregate_docdb_records(
    pipeline = aggregate,
)
```
We can turn these records into a dataframe and reorganize some things:

```{code-cell} ipython3
df = pd.DataFrame(records)

df['session_date'] = df.apply(lambda x: datetime.fromisoformat(x['session_time']).date(), axis=1)
df['session_time'] = df.apply(lambda x: datetime.fromisoformat(x['session_time']).time(), axis=1)
df['date_of_birth'] = df.apply(lambda x: datetime.strptime(x['date_of_birth'], '%Y-%m-%d').date(), axis=1)
df['age'] = df.apply(lambda x: (x['session_date'] - x['date_of_birth']).days, axis=1)

df['column'] = df.apply(lambda x: int(x['column'].split(' ')[-1]), axis=1)
df['volume'] = df.apply(lambda x: int(x['volume'].split(' ')[-1]), axis=1)

df['golden_mouse'] = False
df.loc[df.subject_id=='409828', 'golden_mouse'] = True

order = ['project_name','_id','name','subject_id','golden_mouse','genotype','date_of_birth','sex','modality',
         'session_date','age','session_time','column','volume']
df = df[order]

df.head()
```

```{code-cell} ipython3
print(len(df))
```