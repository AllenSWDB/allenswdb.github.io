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
# Visual Coding Ophys Dataset

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

# Dataset

We will start exploring the parameters of the dataset to learn what data is available. We can query the database and create a dataframe of some of the key metadata fields:

```{code-cell} ipython3
aggregate = [
  {
    "$match": {
      "data_description.project_name": {
        "$regex": "Allen Brain Observatory - Visual Coding Ophys",
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
      "depth": "$acquisition.data_streams.configurations.images.planes.depth",
      "targeted_structure": "$acquisition.data_streams.configurations.images.planes.targeted_structure.acronym",
      "session_type": "$acquisition.acquisition_type",
      "container_id": { "$arrayElemAt": ["$data_description.tags", 2] },
    }
  },
]
    
records = docdb_api_client.aggregate_docdb_records(
    pipeline = aggregate,
)
```

```{code-cell} ipython3
df = pd.DataFrame(records)

df['session_date'] = df.apply(lambda x: datetime.fromisoformat(x['session_time']).date(), axis=1)
df['session_time'] = df.apply(lambda x: datetime.fromisoformat(x['session_time']).time(), axis=1)
df['date_of_birth'] = df.apply(lambda x: datetime.strptime(x['date_of_birth'], '%Y-%m-%d').date(), axis=1)
df['age'] = df.apply(lambda x: (x['session_date'] - x['date_of_birth']).days, axis=1)

df['depth'] = df.apply(lambda x: list(np.array(x['depth']).flatten())[0], axis=1)
df['targeted_structure'] = df.apply(lambda x: str(np.array(x['targeted_structure']).flatten()[0]), axis=1)

df['container_id'] = df.apply(lambda x: int(x['container_id'].split(' ')[-1]), axis=1)

order = ['project_name','_id','name','subject_id','genotype','date_of_birth','sex','modality',
         'session_type','session_date','age','session_time','depth', 'targeted_structure','container_id']
df = df[order]

df.head()
```

## Targeted structures
What brain regions were recorded across the dataset? Look at the unique {term}`targeted structure`s

```{code-cell} ipython3
df.targeted_structure.unique().tolist()
```

We see that data was collected in six different visual areas. {term}`VISp` is the
primary visual cortex, also known as V1. The others are higher visual areas ({term}`HVA`s) that
surround VISp. You can learn more about these areas and how we map them
{ref}`here <mouse-visual-system>`.

## Cre lines and reporters
We used {term}`Cre line`s to drive the expression of GCaMP6 in specific populations of neurons. We also use four different {term}`reporter line`s for GCaMP6. The identity of both the driver and the reporter are contained within the genotype of the mouse. The genotype also conveys whether a given subject is homozygous or heterozygous (i.e. whether the subject has one or two copies of any element). So far, we see no significant differences between homozygous and heterozygous mice, and we recommend analyzing them together. But as a result, a list of unique genotypes is over complete

We can find a list of all the cre lines used in this dataset as follows

```{code-cell} ipython3
cre_lines = []
for item in df.genotype.unique():
    cre_lines.append(item.split('/')[0])
cre_lines = np.unique(cre_lines)
cre_lines.tolist()
```

See [Transgenic tools](background-transgenic-tools) to learn more about these Cre lines and reporters.

```{note}
Reporter lines: All the experiments in this dataset use {term}`GCaMP`6. The large majority use GCaMP6f and only a few use GCaMP6s. However, you see four different reporters listed here. Why is this? Ai93 is the GCaMP6f reporter we used with the excitatory Cre lines. However, this reporter does not work well for inhibitory Cre lines. We used Ai148, another GCaMP6f reporter, with Vip-IRES-Cre and Sst-IRES-Cre. However, this didn't work with the Pvalb-IRES-Cre. We use Ai162, a GCaMP6s reporter with Pvalb. Additionally, to have a GCaMP6f vs GCaMP6s comparison, we collected a small number of experiments using Ai94 with the Slc17a7-IRES2-Cre. This is a GCaMP6s reporter that complements Ai93. Slc17a7-IRES2-Cre is the only Cre line that was recorded using multiple reporter types.
```

(imaging_depths)=
## Imaging depths
Each experiment was collected at a single imaging depth.

```{code-cell} ipython3
df.depth.unique().tolist()
```

These values are in µm below the surface of the cortex. This is a long list and some of the values don't differ by very much. How meaningful is it? We roughly consider depths less than 250 to be layer 2/3, 250-350 to be layer 4, 350-500 to be layer 5, and over 500 to be layer 6. Keep in mind, much of the imaging here was done with layer specific Cre lines, so for most purposes the best way to get layer specificity is to select appropriate Cre lines.

(experiment_containers_sessions)=
## Experiment containers & sessions
The experiment {term} `container` describes a set of 3 imaging {term}`session`s performed for the same field of view (ie. same targeted structure and imaging depth in the same mouse that targets the same set of neurons). Each experiment container has a unique ID number.

Let's look at all of the sessions in one experiment container

```{code-cell} ipython3
df[df.container_id==df.container_id[0]]
```

Notice that the subject_id, genotype, targeted structure, depth are all the same. What differs are the session_type, the session_date, and age.

Each session_type has a different set of visual stimuli.

As you see, each experiment container has three different session types. For the data published in June 2016 and October 2016, the last session is <b>three_session_C</b<> while the data published after this were collected using <b>three_session_C2</b>. The key difference between these sessions is a change in the [locally sparse noise](locally_sparse_noise) stimulus. This is described more [here](locally_sparse_noise).

![containers](/resources/VC2p-sessions.png)


## Exercise: How many sessions were collected in each cortical visual area for each Cre line?

```{code-cell} ipython3
# we made a list of cre_lines above
areas = df.targeted_structure.unique().tolist() #list of areas

df2 = pd.DataFrame(columns=areas, index=cre_lines)
for cre in cre_lines:
  for area in areas:
    df2.loc[cre, area] = len(df[(df.targeted_structure==area)&(df['genotype'].str.contains(cre))])
df2
```
