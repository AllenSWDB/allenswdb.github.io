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

# Metadata

Neuroscience has become data-centric, where data itself is a valuable commodity that can be used and re-used in different contexts to test different questions. Our goal is to make it possible for data to be understood and used by different scientists, who may have been uninvolved in the collection of the data. To achieve this, data must be annotated with rich metadata that contextualizes and communicates the conditions in which the data was acquired and processed, and enables other scientists to understand and use the data for their own questions. Such metadata ensures that experiments are transparent, rigorous, and FAIR - and as such maximizes the potential knowledge derived from the data. Metadata is also crucial for making data discoverable and re-usable, allowing scientists to aggregate multi-modal datasets across independent experiments to compare results and enable new kinds of discoveries.

All data assets from Neural Dynamics are documented with metadata files using the aind-data-schema. More rigorous documentation for this schema can be found [here](https://aind-data-schema.readthedocs.io/en/latest/).

:::{figure} ../resources/schema.png
---
width: 800
name: head-bar-clamp
---
The parent Metadata object and the eight core files are shown, with their fields and types. In the [interactive documentation](https://aind-data-schema.readthedocs.io/en/latest/) the fields storing objects can be further expanded to explore.
:::
 
The schema consists of seven major classes:

### Data description
This provides administrative details that documents the project, investigators, funding sources, license, etc. that the data asset belongs to. 

### Subject
This class describes the subject that was used for this asset. It includes the species, date of birth, sex, and genotype. For mice bred at the Allen Institue we also track breeding background.

### Procedures
This class describes procedures that were performed on the animal or tissue prior to data acquisition. This can include surgeries such as craniotomies, injections, headposts, or implant as well as tissue processing steps for in vitro data. Many important reagents are tracked here , including what virus were injected (along with where was it was injected). What antibodies were applied to the tissue during immunolabeling prior to light sheet imaging, etc. 

### Instrument
This class describes the instrument used to collect the data.  This documents the devices of the instrument that were used to collect data, including things such as lasers, objectives, cameras, and stimulus devices. 

### Acquisition
This class describes the actual data acquisition that created the given data asset. This describes how the data was collected, how the instrument devices were configured (where probes were positiond, which channels were imaged), as well as what stimulus or behavior was used.

### Processing
This class describes any processing that has been done after data acquisition - e.g. spike sorting or image registration. It documents the code used for the step and key parameters.

### Quality Control
Some assets also have a quality control class that contains both automated and manual evaluations of data and processing quality. This is the only part of the metadata that can be updated as scientists add new annotations on the quality of the data assets at different stages of processing.

### Model
This class is used for outputs of machine learning models, and is not applicable to the data assets in SWDB.


## How might you use this?
Each data asset has metadata (json) files that contain these classes. These are both human and machine readable, so you can explore them directly. However, there is a LOT of information in there and often we can identify import key fields for a particular project. Using MongoDB, one can query the database of all our data, to create a view of the metadata for specific projects and assets. 

We have created metadata views for you of the assets from different projects to uplevel some of the key properties. This might include information on subjects (age, sex, genotype), viruses (name, injection location), targeted structures, stimulus/behavior paradigms, etc. This were made using MongoDB queries on our metadata database, and the code for these queries are also included in our capsules, and throughout this databook.

The metadata can also be explored using a LLM or using the [MCP](https://github.com/AllenNeuralDynamics/aind-data-mcp) we've developed for interacting with the database. 

## Queries
You can use MongoDB to query the database via the `aind_data_access_api`.

```{code-cell} ipython3
import pandas as pd 
import numpy as np
from datetime import datetime, date
```

This connects you to the specific database:

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
Next write an aggregation pipeline and define the fields to return. The MCP is very helpful for creating the aggregation code.

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
Once you have the records, you can look at them directly or create a dataframe. Often there is some information reorg that is useful

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

