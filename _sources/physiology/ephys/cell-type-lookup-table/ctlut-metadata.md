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

# Cell Type Lookup Table Metadata 


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
   database=DATABASE,
   collection=COLLECTION,
)
print(docdb_api_client._base_url)
```

```{code-cell} ipython3
aggregate = [
  {
    "$match": {
      "data_description.project_name": {"$in": ["Cell Type Lookup Table", "Cell Type LUT"]}, 
      "name": {"$regex": "nwb"},
      "location": {"$regex": "aind-open-data"}, 
      "data_description": {"$ne": None}
    }
  },
  {
    "$project": {
      "name": 1, 
      "subject_id": "$data_description.subject_id",
      "genotype": "$subject.subject_details.genotype", 
      "date_of_birth": "$subject.subject_details.date_of_birth", 
      "sex": "$subject.subject_details.sex",  
      "session_start_time": "$acquisition.acquisition_start_time",
      "session_end_time": "$acquisition.acquisition_end_time", 
      "stimulus_epochs": "$acquisition.stimulus_epochs.stimulus_name", 
      "project_name": "$data_description.project_name", 
      "modality": "$data_description.modalities.name", 
      "virus_names": "$procedures.subject_procedures.procedures.injection_materials.name",
    }
  },
]
    
records = docdb_api_client.aggregate_docdb_records(
    pipeline=aggregate,
)

``` 

Return these records into a dataframe and do some cleanup (exclude a particular session)

```{code-cell} ipython3
to_exclude = ['ecephys_655565_2023-03-31_14-47-36_nwb_2025-07-16_16-52-27'] 
df = pd.DataFrame(records) 
filtered_df = df[~df.name.isin(to_exclude)].sort_values(by='name')
# flatten virus names 
filtered_df.virus_names = filtered_df.virus_names.apply(lambda x: [item for sublist in x for item in sublist] if isinstance(x, list) else x)
filtered_df
```

```{code-cell} ipython3
print(len(filtered_df))
```

```{code-cell} ipython3
print(filtered_df.genotype.unique().tolist())
```

