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

# Visual Coding Neuropixels Metadata

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
        "$regex": "Allen Brain Observatory - Visual Coding Neuropixels",
        "$options": "i"
      },
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
      "session_type": "$acquisition.acquisition_type",
    }
  },
]
    
records = docdb_api_client.aggregate_docdb_records(
    pipeline = aggregate,
)
```

Create a dataframe to explore using pandas:

```{code-cell} ipython3
df = pd.DataFrame(records)

df['session_date'] = df.apply(lambda x: datetime.fromisoformat(x['session_time']).date(), axis=1)
df['session_time'] = df.apply(lambda x: datetime.fromisoformat(x['session_time']).time(), axis=1)
df['date_of_birth'] = df.apply(lambda x: datetime.strptime(x['date_of_birth'], '%Y-%m-%d').date(), axis=1)
df['age'] = df.apply(lambda x: (x['session_date'] - x['date_of_birth']).days, axis=1)

order = ['project_name','_id','name','subject_id','genotype','date_of_birth','sex','modality',
         'session_type','session_date','age','session_time']
df = df[order]

df.head()
```

## Genotypes

{term}`Cre line`s were used to drive the expression of {term}`Channelrhodopsin` to units of a given transcriptomic type to be identified using {term}`optotagging`. We can see which cell types were targeted by looking at the unique genotypes:

```{code-cell} ipython3
genotypes = df.genotype.unique().tolist()
genotypes
```

```{note}
Not all units recorded from in a mouse of a given genotype will be Cre+. Only a subset will be optotagged.
```

See [Transgenic tools](background-transgenic-tools) to learn more about these Cre lines and reporters.

## Session types

```{code-cell} ipython3
session_types = df.session_type.unique().tolist()
session_types
```

## How many sessions are there with each genotype for each session type?

```{code-cell} ipython3
df2 = pd.DataFrame(columns=session_types, index=genotypes)
for gen in genotypes:
    for st in session_types:
        df2.loc[gen, st] = len(df[(df.session_type==st)&(df['genotype']==gen)])
df2
```
