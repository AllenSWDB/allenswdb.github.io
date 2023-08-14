---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.14.7
kernelspec:
  display_name: allensdk
  language: python
  name: allensdk
---

+++ {"papermill": {"duration": 0.014883, "end_time": "2023-07-31T19:16:30.535251", "exception": false, "start_time": "2023-07-31T19:16:30.520368", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

# Accessing Visual Behavior Ophys Data

+++ {"papermill": {"duration": 0.013027, "end_time": "2023-07-31T19:16:30.562863", "exception": false, "start_time": "2023-07-31T19:16:30.549836", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

## Tutorial overview

This Jupyter notebook covers the various methods for accessing the Allen Institute Visual Behavior Ophys dataset. We will go over how to request data, where it's stored, and what the various files contain. If you're having trouble downloading the data, or you just want to know more about what's going on under the hood, this is a good place to start.

This data release will not have a web interface for browsing through the released data, as with the [two-photon imaging Visual Coding dataset](http://observatory.brain-map.org/visualcoding). Instead, the data must be retrieved through the AllenSDK (Python 3.6+) or via requests sent to the **Amazon Web Services (AWS)** **Simple Storage Service (S3)** bucket (name: [visual-behavior-ophys-data](https://s3.console.aws.amazon.com/s3/buckets/visual-behavior-ophys-data)) for this project.

Functions related to data analysis as well as descriptions of metadata table columns will be covered in other tutorials. For a full list of available tutorials for this project, see the [SDK documentation](https://allensdk.readthedocs.io/en/latest/visual_behavior_optical_physiology.html).

+++ {"papermill": {"duration": 0.012407, "end_time": "2023-07-31T19:16:30.588082", "exception": false, "start_time": "2023-07-31T19:16:30.575675", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

## Options for data access

The `VisualBehaviorOphysProjectCache` object in the AllenSDK is the easiest way to interact with the released data. This object abstracts away the details of on-disk file storage, and delivers the data to you as ready-to-analyze Python objects. The cache will automatically keep track of which files are stored locally, and will download additional files on an as-needed basis. Usually you won't need to worry about the organization of these files, but this tutorial will cover those details in case you want to analyze them without using the AllenSDK (e.g., in Matlab). This tutorial begins with an introduction to this approach.

Another option is to directly download the data using an S3 URL. This should be used if the other options are broken or are not available to you. Instructions for this can be found <a href='#Direct-download-of-data-from-S3'>at the end of this tutorial</a>.

+++ {"papermill": {"duration": 0.013373, "end_time": "2023-07-31T19:16:30.613623", "exception": false, "start_time": "2023-07-31T19:16:30.600250", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

## Using the AllenSDK to retrieve data

Most users will want to access data via the AllenSDK. This requires nothing more than a Python interpreter and some free disk space to store the data locally.

How much data is there? If you want to download the complete dataset (3021 Behavior Sessions, 551 Behavior Ophys Sessions containing 1165 Behavior Ophys Experiments), you'll need 1000.8 GB of space, split across the following files:

1. CSV files containing information about behavior sessions, behavior ophys sessions, and behavior ophys experiments (1.3 MB)
2. NWB files containing data for behavior sessions (437.6 GB total, min file size = 0.049 GB, max file size = 0.194 GB)
3. NWB files containing data for behavior ophys experiments (563.2 GB total, min file size = 0.231 GB, max file size = 2.96 GB)

Before downloading the data, you must decide on a cache directory where you would like downloaded data to be stored. This directory is where the `VisualBehaviorOphysProjectCache` object will look first when you request a metadata table or a data file.

When you initialize a local cache for the first time, it will create the manifest file at the path that you specify. This file lives one directory up from the rest of the data, so make sure you put it somewhere that has enough space available.

When you need to access the data in subsequent analysis sessions, you should point the `VisualBehaviorOphysProjectCache` object to an existing cache directory; otherwise, it will try to re-download the data in a new location.

To get started with this approach, first take care of the necessary imports:

We will first install allensdk into your environment by running the appropriate commands below.

+++ {"papermill": {"duration": 0.013398, "end_time": "2023-07-31T19:16:30.640718", "exception": false, "start_time": "2023-07-31T19:16:30.627320", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

## Instal AllenSDK into your local environment

+++ {"papermill": {"duration": 0.01254, "end_time": "2023-07-31T19:16:30.665970", "exception": false, "start_time": "2023-07-31T19:16:30.653430", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

You can install AllenSDK with:

```{code-cell} ipython3
---
papermill:
  duration: 3.522067
  end_time: '2023-07-31T19:16:34.200626'
  exception: false
  start_time: '2023-07-31T19:16:30.678559'
  status: completed
pycharm:
  name: '#%%

    '
---
!pip install allensdk
```

+++ {"papermill": {"duration": 0.013453, "end_time": "2023-07-31T19:16:34.228983", "exception": false, "start_time": "2023-07-31T19:16:34.215530", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

## Install AllenSDK into your notebook environment

+++ {"papermill": {"duration": 0.014134, "end_time": "2023-07-31T19:16:34.257206", "exception": false, "start_time": "2023-07-31T19:16:34.243072", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

You can install AllenSDK into your notebook environment by executing the cell below.

If using Google Colab, click on the RESTART RUNTIME button that appears at the end of the output when this cell is complete,. Note that running this cell will produce a long list of outputs and some error messages. Clicking RESTART RUNTIME at the end will resolve these issues.
You can minimize the cell after you are done to hide the output.

```python
---
papermill:
  duration: 7.723749
  end_time: '2023-07-31T19:16:41.995680'
  exception: false
  start_time: '2023-07-31T19:16:34.271931'
  status: completed
pycharm:
  name: '#%%

    '
---
!pip install --upgrade pip
!pip install allensdk
```

+++ {"papermill": {"duration": 0.014847, "end_time": "2023-07-31T19:16:42.026631", "exception": false, "start_time": "2023-07-31T19:16:42.011784", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

## Import required packages

```{code-cell} ipython3
---
papermill:
  duration: 6.800926
  end_time: '2023-07-31T19:16:48.842964'
  exception: false
  start_time: '2023-07-31T19:16:42.042038'
  status: completed
pycharm:
  name: '#%%

    '
---
from pathlib import Path
import matplotlib.pyplot as plt

import allensdk
from allensdk.brain_observatory.behavior.behavior_project_cache import VisualBehaviorOphysProjectCache

# Confirming your allensdk version
print(f"Your allensdk version is: {allensdk.__version__}")
```

```{code-cell} ipython3
---
papermill:
  duration: 0.023615
  end_time: '2023-07-31T19:16:48.882714'
  exception: false
  start_time: '2023-07-31T19:16:48.859099'
  status: completed
pycharm:
  name: '#%%

    '
tags: [parameters]
---
# Update this to a valid directory in your filesystem
# Remember to choose a location that has plenty of free space available.
output_dir = "/root/capsule/data/visual-behavior-ophys/"
DOWNLOAD_COMPLETE_DATASET = True
```

```{code-cell} ipython3
---
papermill:
  duration: 2.995327
  end_time: '2023-07-31T19:16:51.932109'
  exception: false
  start_time: '2023-07-31T19:16:48.936782'
  status: completed
pycharm:
  name: '#%%

    '
---
output_dir = Path(output_dir)

cache = VisualBehaviorOphysProjectCache.from_s3_cache(cache_dir=output_dir)
```

+++ {"papermill": {"duration": 0.018841, "end_time": "2023-07-31T19:16:51.968559", "exception": false, "start_time": "2023-07-31T19:16:51.949718", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

Instantiating the cache will have it to download 3 project metadata files:

1. `behavior_session_table.csv` (879 kB)
2. `ophys_session_table.csv` (165.1 kB)
3. `ophys_experiment_table.csv` (335.6 kB)

Each one contains a table of information related to its file name. If you're using the AllenSDK, you won't have to worry about how these files are formatted. Instead, you'll load the relevant data using specific accessor method: `get_behavior_session_table()`, `get_ophys_session_table()`, and `get_ophys_experiment_table()`. These functions return a pandas DataFrame containing a row for each item and a column for each metric.

If you are analyzing data without using the AllenSDK, you can load the data using your CSV file reader of choice. However, please be aware the columns in the original file do not necessarily match what's returned by the AllenSDK, which may combine information from multiple files to produce the final DataFrame.

+++ {"papermill": {"duration": 0.016941, "end_time": "2023-07-31T19:16:52.002427", "exception": false, "start_time": "2023-07-31T19:16:51.985486", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

### Managing versions of the dataset

Over time, updates may be made to the released dataset. These updates will result in new versions of the dataset being available in the S3 bucket. The versions of the dataset are managed through distinct data manifests stored on S3.

+++ {"papermill": {"duration": 0.017592, "end_time": "2023-07-31T19:16:52.037143", "exception": false, "start_time": "2023-07-31T19:16:52.019551", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

#### Discovering manifests

To see all of the manifest files available for this dataset online, run

```{code-cell} ipython3
---
papermill:
  duration: 0.028622
  end_time: '2023-07-31T19:16:52.082329'
  exception: false
  start_time: '2023-07-31T19:16:52.053707'
  status: completed
pycharm:
  name: '#%%

    '
---
cache.list_manifest_file_names()
```

+++ {"papermill": {"duration": 0.016987, "end_time": "2023-07-31T19:16:52.116398", "exception": false, "start_time": "2023-07-31T19:16:52.099411", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

To see the most up-to-date available manifest, run

```{code-cell} ipython3
---
papermill:
  duration: 0.026742
  end_time: '2023-07-31T19:16:52.159733'
  exception: false
  start_time: '2023-07-31T19:16:52.132991'
  status: completed
pycharm:
  name: '#%%

    '
---
cache.latest_manifest_file()
```

+++ {"papermill": {"duration": 0.017194, "end_time": "2023-07-31T19:16:52.194575", "exception": false, "start_time": "2023-07-31T19:16:52.177381", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

To see the name of the most up-to-date manifest that you have already downloaded to your system run (note: this just means that the manifest file has been downloaded; it does not necessarily mean that any data has been downloaded)

```{code-cell} ipython3
---
papermill:
  duration: 0.027915
  end_time: '2023-07-31T19:16:52.239050'
  exception: false
  start_time: '2023-07-31T19:16:52.211135'
  status: completed
pycharm:
  name: '#%%

    '
---
cache.latest_downloaded_manifest_file()
```

+++ {"papermill": {"duration": 0.018079, "end_time": "2023-07-31T19:16:52.274440", "exception": false, "start_time": "2023-07-31T19:16:52.256361", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

You can list all of the manifest files currently downloaded to your system with

```{code-cell} ipython3
---
papermill:
  duration: 0.027137
  end_time: '2023-07-31T19:16:52.319751'
  exception: false
  start_time: '2023-07-31T19:16:52.292614'
  status: completed
pycharm:
  name: '#%%

    '
---
cache.list_all_downloaded_manifests()
```

+++ {"papermill": {"duration": 0.01753, "end_time": "2023-07-31T19:16:52.354391", "exception": false, "start_time": "2023-07-31T19:16:52.336861", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

#### Loading manifests/dataset versions

The `VisualBehaviorOphysProjectCache` determines which version of the dataset to use by loading one of these manifests. By default, the `VisualBehaviorProjectCache` loads either

- the most up-to-date available data manifest, if you are instaniating it on an empty `cache_dir`

- the data manifest you were last using, if you are instantiating it on a pre-existing `cache_dir` (in this case, the `VisualBehaviorOphysProjectCache` will emit a warning if a more up-to-data data manifest exists online letting you know that you can, if you choose, move to the more up-to-date data manifest)

To see the manifest that you currently have loaded, run

```{code-cell} ipython3
---
papermill:
  duration: 0.029152
  end_time: '2023-07-31T19:16:52.400832'
  exception: false
  start_time: '2023-07-31T19:16:52.371680'
  status: completed
pycharm:
  name: '#%%

    '
---
cache.current_manifest()
```

+++ {"papermill": {"duration": 0.017248, "end_time": "2023-07-31T19:16:52.436190", "exception": false, "start_time": "2023-07-31T19:16:52.418942", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

To load a particular data manifest by hand, run (note: because we are intentionally loading an out-of-date manifest, this will emit an error alerting us to the existence of the most up-to-date manifest). We then reload the latest manifest.

```{code-cell} ipython3
---
papermill:
  duration: 0.827444
  end_time: '2023-07-31T19:16:53.280450'
  exception: false
  start_time: '2023-07-31T19:16:52.453006'
  status: completed
pycharm:
  name: '#%%

    '
---
from allensdk.brain_observatory.behavior.behavior_project_cache.utils import \
    BehaviorCloudCacheVersionException

try:
    cache.load_manifest('visual-behavior-ophys_project_manifest_v0.1.0.json')
except BehaviorCloudCacheVersionException as e:
    print(e)
    cache.load_manifest(cache.latest_manifest_file())
```

```{code-cell} ipython3
---
papermill:
  duration: 0.027584
  end_time: '2023-07-31T19:16:53.325492'
  exception: false
  start_time: '2023-07-31T19:16:53.297908'
  status: completed
pycharm:
  name: '#%%

    '
---
cache.current_manifest()
```

+++ {"papermill": {"duration": 0.018601, "end_time": "2023-07-31T19:16:53.362237", "exception": false, "start_time": "2023-07-31T19:16:53.343636", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

As the earlier warning informed us, we can see the difference between an two versions of the dataset by running

```{code-cell} ipython3
---
papermill:
  duration: 0.570713
  end_time: '2023-07-31T19:16:53.951421'
  exception: false
  start_time: '2023-07-31T19:16:53.380708'
  status: completed
pycharm:
  name: '#%%

    '
---
msg = cache.compare_manifests('visual-behavior-ophys_project_manifest_v0.1.0.json',
                              'visual-behavior-ophys_project_manifest_v0.2.0.json')
print(msg)
```

+++ {"papermill": {"duration": 0.017288, "end_time": "2023-07-31T19:16:53.987665", "exception": false, "start_time": "2023-07-31T19:16:53.970377", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

In the case we just examined, only the metadata files have changed.

The `VisualBehaviorOphysProjectCache` is smart enough to know that, if a file has not changed between version `A` and version `B` of the dataset, and you have already downloaded the file while version `A` of the manifest was loaded, when you move to version `B`, it does not need to download the data again. It will simply construct a symlink where version `B` of the data should exist on your system, pointing to version `A` of the file.

Because only metadata files changed between `v0.1.0` and `v0.2.0` of the dataset, we could move freely between the two versions without having to worry about downloading a bunch of new data files. This may not be the case for future dataset updates, so you should keep that in mind before moving from an older to a newer version out of hand.

+++ {"papermill": {"duration": 0.018319, "end_time": "2023-07-31T19:16:54.023416", "exception": false, "start_time": "2023-07-31T19:16:54.005097", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

### Using the AllenSDK to access Visual Behavior Ophys metadata

Let's take a closer look at what's in the `behavior_session_table.csv` file:

```{code-cell} ipython3
---
papermill:
  duration: 0.05474
  end_time: '2023-07-31T19:16:54.096066'
  exception: false
  start_time: '2023-07-31T19:16:54.041326'
  status: completed
pycharm:
  name: '#%%

    '
---
behavior_sessions = cache.get_behavior_session_table()

print(f"Total number of behavior sessions: {len(behavior_sessions)}")

behavior_sessions.head()
```

+++ {"papermill": {"duration": 0.018408, "end_time": "2023-07-31T19:16:54.133815", "exception": false, "start_time": "2023-07-31T19:16:54.115407", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

The `behavior_session_table` DataFrame provides a high-level overview for behavior sessions in the Visual Behavior dataset. The index column (behavior_session_id) is a unique ID, which serves as a key for access behavior data for each session. To get additional information about this data table (and other tables) please visit [this example notebook](files/visual_behavior_ophys_dataset_manifest.html).

Sharp eyed readers may be wondering why the number of behavior session (3572) in this table does not match up with the number of NWB files with behavior session data (3021). This is because the `behavior_session_table` includes entries for behavior sessions that also had optical physiology recordings.

Let's take a look at only the sessions that also included optical physiology data (i.e. the `ophys_session_table.csv`):

```{code-cell} ipython3
---
papermill:
  duration: 0.053435
  end_time: '2023-07-31T19:16:54.206693'
  exception: false
  start_time: '2023-07-31T19:16:54.153258'
  status: completed
pycharm:
  name: '#%%

    '
---
behavior_ophys_sessions = cache.get_ophys_session_table()

print(f"Total number of behavior + ophys sessions: {len(behavior_ophys_sessions)}")

behavior_ophys_sessions.head()
```

+++ {"papermill": {"duration": 0.019404, "end_time": "2023-07-31T19:16:54.247009", "exception": false, "start_time": "2023-07-31T19:16:54.227605", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

Here we can see that 3572 - 551 is indeed 3021. The `ophys_session_table` contains information about behavior sessions with optical physiology recordings. Depending on the microscope (`equipment_name`) used, one or multiple ophys_experiments (i.e. imaging planes) may be collected during a behavior ophys session.

In order to keep individual data file sizes reasonable, we are releasing data files organized around ophys_experiments (i.e. imaging planes) instead of at the ophys_session level. The `ophys_session_table` is thus useful for determining which `ophys_experiments` were collected together.

Let's finally take a look at the `ophys_experiment_table.csv`:

```{code-cell} ipython3
---
papermill:
  duration: 0.052954
  end_time: '2023-07-31T19:16:54.319553'
  exception: false
  start_time: '2023-07-31T19:16:54.266599'
  status: completed
pycharm:
  name: '#%%

    '
---
behavior_ophys_experiments = cache.get_ophys_experiment_table()

print(f"Total number of behavior ophys experiments: {len(behavior_ophys_experiments)}")

behavior_ophys_experiments.head()
```

+++ {"papermill": {"duration": 0.020747, "end_time": "2023-07-31T19:16:54.360037", "exception": false, "start_time": "2023-07-31T19:16:54.339290", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

### Using the AllenSDK to access Visual Behavior and Visual Behavior Ophys data

After looking through the metadata for the data release, let's say you want to access information about a specific behavior session (behaviors_session_id=870987812)

To get data for a specific behavior session in the table:

```{code-cell} ipython3
---
papermill:
  duration: 5.854692
  end_time: '2023-07-31T19:17:00.234892'
  exception: false
  start_time: '2023-07-31T19:16:54.380200'
  status: completed
pycharm:
  name: '#%%

    '
---
behavior_session = cache.get_behavior_session(behavior_session_id=870987812)
```

```{code-cell} ipython3
---
papermill:
  duration: 0.032655
  end_time: '2023-07-31T19:17:00.291074'
  exception: false
  start_time: '2023-07-31T19:17:00.258419'
  status: completed
pycharm:
  name: '#%%

    '
---
# List methods of the session that can be used to get data
print(behavior_session.list_data_attributes_and_methods())
```

+++ {"papermill": {"duration": 0.020615, "end_time": "2023-07-31T19:17:00.331803", "exception": false, "start_time": "2023-07-31T19:17:00.311188", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

Let's try viewing one of the visual stimuli presented to the mouse during the behavior session we downloaded:

```{code-cell} ipython3
---
papermill:
  duration: 0.902969
  end_time: '2023-07-31T19:17:01.255227'
  exception: false
  start_time: '2023-07-31T19:17:00.352258'
  status: completed
pycharm:
  name: '#%%

    '
---
# Listing the different stimuli templates
behavior_session.stimulus_templates
```

```{code-cell} ipython3
---
papermill:
  duration: 0.439345
  end_time: '2023-07-31T19:17:01.723896'
  exception: false
  start_time: '2023-07-31T19:17:01.284551'
  status: completed
pycharm:
  name: '#%%

    '
---
# Visualizing a particular stimulus
plt.imshow(behavior_session.stimulus_templates['warped']['gratings_90.0'], cmap='gray')
```

+++ {"papermill": {"duration": 0.019059, "end_time": "2023-07-31T19:17:01.763937", "exception": false, "start_time": "2023-07-31T19:17:01.744878", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

As you can see, the `behavior_session` object has a lot of attributes and methods that can be used to access underlying data in the NWB file. Most of these will be touched on in other tutorials for [this data release](https://allensdk.readthedocs.io/en/latest/visual_behavior_optical_physiology.html).

Now let's see how to get data for a particular ophys experiment (i.e. imaging plane):

```{code-cell} ipython3
---
papermill:
  duration: 15.367504
  end_time: '2023-07-31T19:17:17.152340'
  exception: false
  start_time: '2023-07-31T19:17:01.784836'
  status: completed
pycharm:
  name: '#%%

    '
---
ophys_experiment = cache.get_behavior_ophys_experiment(ophys_experiment_id=951980471)
```

```{code-cell} ipython3
---
papermill:
  duration: 0.036878
  end_time: '2023-07-31T19:17:17.216682'
  exception: false
  start_time: '2023-07-31T19:17:17.179804'
  status: completed
pycharm:
  name: '#%%

    '
---
# List methods of the ophys_experiment object that can be used to get data
print(ophys_experiment.list_data_attributes_and_methods())
```

+++ {"papermill": {"duration": 0.026328, "end_time": "2023-07-31T19:17:17.268322", "exception": false, "start_time": "2023-07-31T19:17:17.241994", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

Let's take a quick look at the max projection image for the optical physiology experiment (i.e. imaging plane) we just obtained:

```{code-cell} ipython3
---
papermill:
  duration: 0.249536
  end_time: '2023-07-31T19:17:17.544091'
  exception: false
  start_time: '2023-07-31T19:17:17.294555'
  status: completed
pycharm:
  name: '#%%

    '
---
plt.imshow(ophys_experiment.max_projection, cmap='gray')
```

+++ {"papermill": {"duration": 0.033582, "end_time": "2023-07-31T19:17:17.616149", "exception": false, "start_time": "2023-07-31T19:17:17.582567", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

The `ophys_experiment` object has even more attributes and methods used to access NWB data! As with the `behavior_session` these methods will be touched on in other tutorials for [this data release](https://allensdk.readthedocs.io/en/latest/visual_behavior_optical_physiology.html).

+++ {"papermill": {"duration": 0.02931, "end_time": "2023-07-31T19:17:17.674001", "exception": false, "start_time": "2023-07-31T19:17:17.644691", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

## Downloading the complete dataset with AllenSDK

Analyzing one session or experiment at a time is nice, but in some cases you'll want to be able to perform an analysis across the whole dataset. To fill your cache with all available data, you can use a for loop like the one below.

Comment out the below code. Before running this code, please make sure that you have enough space available in your cache directory. You'll need around 437.6 GB for the behavior session NWB files, and another 563.2  GB if you're also downloading all ophys experiment NWB files.

```{code-cell} ipython3
---
papermill:
  duration: 0.043205
  end_time: '2023-07-31T19:17:17.745573'
  exception: false
  start_time: '2023-07-31T19:17:17.702368'
  status: completed
pycharm:
  name: '#%%

    '
---
# Remove rows from the behavior sessions table which don't correspond to a behavior session NWB file
filtered_behavior_sessions = behavior_sessions.dropna(subset=["file_id"])

if DOWNLOAD_COMPLETE_DATASET:
    for behavior_session_id, _ in filtered_behavior_sessions.iterrows():
        _ = cache.get_behavior_session(behavior_session_id=behavior_session_id)

    for ophys_experiment_id, _ in behavior_ophys_experiments.iterrows():
        _ = cache.get_behavior_ophys_experiment(ophys_experiment_id=ophys_experiment_id)
```

+++ {"papermill": {"duration": 0.027356, "end_time": "2023-07-31T19:17:17.801722", "exception": false, "start_time": "2023-07-31T19:17:17.774366", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

## Direct download of data from S3

If you do not wish to obtain data via the AllenSDK `VisualBehaviorOphysProjectCache` class, this section describes how to directly determine an S3 download link for your file or files of interest.

The S3 bucket that stores all the data for this project's release is:
<a href='https://visual-behavior-ophys-data.s3-us-west-2.amazonaws.com/'>https://visual-behavior-ophys-data.s3-us-west-2.amazonaws.com/</a>

The structure of the S3 bucket looks like:

```
visual-behavior-ophys/
│
├── release_notes.txt
│
├── manifests/
│   ├── visual-behavior-ophys_project_manifest_v{a.b.c}.json
│   ├── visual-behavior-ophys_project_manifest_v{x.y.z}.json
│   ...
│
├── project_metadata/
│   ├── behavior_session_table.csv
│   ├── ophys_experiment_table.csv
│   └── ophys_session_table.csv
│
├── behavior_sessions/
│   ├── behavior_session_{abc}.nwb
│   ├── behavior_session_{xyz}.nwb
│   ...
│
└── behavior_ophys_experiments/
    ├── behavior_ophys_experiment_{abc}.nwb
    ├── behavior_ophys_experiment_{xyz}.nwb
    ...
```

So if for example, you wanted to download a specific `behavior_ophys_experiment` you could first download the `ophys_experiment_table.csv` with:

<a href='https://visual-behavior-ophys-data.s3-us-west-2.amazonaws.com/visual-behavior-ophys/project_metadata/ophys_experiment_table.csv'>https://visual-behavior-ophys-data.s3-us-west-2.amazonaws.com/visual-behavior-ophys/project_metadata/ophys_experiment_table.csv</a> (try clicking me!)

Then using the table, determine the `ophy_experiment_id` you are interested in. Let's say we want `ophys_experiment_id = 951980471`, then the appropriate download link would be:

<a href='https://visual-behavior-ophys-data.s3-us-west-2.amazonaws.com/visual-behavior-ophys/behavior_ophys_experiments/behavior_ophys_experiment_951980471.nwb'>https://visual-behavior-ophys-data.s3-us-west-2.amazonaws.com/visual-behavior-ophys/behavior_ophys_experiments/behavior_ophys_experiment_951980471.nwb</a>

Below are some simple sample functions that will help you efficiently determine download URL links:

```{code-cell} ipython3
---
papermill:
  duration: 0.037563
  end_time: '2023-07-31T19:17:17.867613'
  exception: false
  start_time: '2023-07-31T19:17:17.830050'
  status: completed
pycharm:
  name: '#%%

    '
---
from urllib.parse import urljoin

def get_manifest_url(manifest_version: str) -> str:
    hostname = "https://visual-behavior-ophys-data.s3-us-west-2.amazonaws.com/"
    object_key = f"visual-behavior-ophys/manifests/visual-behavior-ophys_project_manifest_v{manifest_version}.json"
    return urljoin(hostname, object_key)

# Example:
print(get_manifest_url("0.1.0"))
```

```{code-cell} ipython3
---
papermill:
  duration: 0.036991
  end_time: '2023-07-31T19:17:17.932856'
  exception: false
  start_time: '2023-07-31T19:17:17.895865'
  status: completed
pycharm:
  name: '#%%

    '
---
def get_metadata_url(metadata_table_name: str) -> str:
    hostname = "https://visual-behavior-ophys-data.s3-us-west-2.amazonaws.com/"
    object_key = f"visual-behavior-ophys/project_metadata/{metadata_table_name}.csv"
    return urljoin(hostname, object_key)

# Example:
print(get_metadata_url("behavior_session_table"))
```

```{code-cell} ipython3
---
papermill:
  duration: 0.038763
  end_time: '2023-07-31T19:17:18.000479'
  exception: false
  start_time: '2023-07-31T19:17:17.961716'
  status: completed
pycharm:
  name: '#%%

    '
---
def get_behavior_session_url(behavior_session_id: int) -> str:
    hostname = "https://visual-behavior-ophys-data.s3-us-west-2.amazonaws.com/"
    object_key = f"visual-behavior-ophys/behavior_sessions/behavior_session_{behavior_session_id}.nwb"
    return urljoin(hostname, object_key)

# Example:
print(get_behavior_session_url(870987812))
```

```{code-cell} ipython3
---
papermill:
  duration: 0.041368
  end_time: '2023-07-31T19:17:18.070664'
  exception: false
  start_time: '2023-07-31T19:17:18.029296'
  status: completed
pycharm:
  name: '#%%

    '
---
def get_behavior_ophys_experiment_url(ophys_experiment_id: int) -> str:
    hostname = "https://visual-behavior-ophys-data.s3-us-west-2.amazonaws.com/"
    object_key = f"visual-behavior-ophys/behavior_ophys_experiments/behavior_ophys_experiment_{ophys_experiment_id}.nwb"
    return urljoin(hostname, object_key)

# Example:
print(get_behavior_ophys_experiment_url(951980471))
```

+++ {"papermill": {"duration": 0.029011, "end_time": "2023-07-31T19:17:18.129846", "exception": false, "start_time": "2023-07-31T19:17:18.100835", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

## Downloading previous versions of released data from S3

AllenSDK makes uses of versioned manifest (JSON) files that live in the S3 bucket to keep track of EVERY version of a file for this data release. If a bug/error in the released data is discovered or new data is added to existing NWB files and the updated NWB file is uploaded in the future, a new manifest will be created pointing to the newest version of the file. The existing manifest will continue pointing at the original version allowing reproducibility of analysis results. You can think of each manifest as a snapshot of the state of the S3 bucket when the manifest was created.

This section describes how to download specific versions of a file in the S3 bucket.

### Listing and downloading a specific manifest version for the data release

If you have an AWS account (even a free tier account works) you can log in and access the bucket directly:

<a href='https://s3.console.aws.amazon.com/s3/buckets/visual-behavior-ophys-data?prefix=visual-behavior-ophys/manifests/'>https://s3.console.aws.amazon.com/s3/buckets/visual-behavior-ophys-data?prefix=visual-behavior-ophys/manifests/</a>

If you don't have or don't want to use an AWS account you can click the following list to get an XML document:

<a href='https://visual-behavior-ophys-data.s3-us-west-2.amazonaws.com/?list-type=2&prefix=visual-behavior-ophys/manifests/'>https://visual-behavior-ophys-data.s3-us-west-2.amazonaws.com/?list-type=2&prefix=visual-behavior-ophys/manifests/</a>

Which will look like:
```
<ListBucketResult>
  <Name>visual-behavior-ophys-data</Name>
  <Prefix>visual-behavior-ophys/manifests/</Prefix>
  <KeyCount>1</KeyCount>
  <MaxKeys>1000</MaxKeys>
  <IsTruncated>false</IsTruncated>
  <Contents>
    <Key>
    visual-behavior-ophys/manifests/visual-behavior-ophys_project_manifest_v0.1.0.json
    </Key>
    <LastModified>2021-03-22T14:36:31.000Z</LastModified>
    <ETag>"8d10d6dd87234d4e0a1d400908c5013d"</ETag>
    <Size>1730897</Size>
    <StorageClass>STANDARD</StorageClass>
  </Contents>
</ListBucketResult>
```
The XML document is the result of a query which lists all manifests that currently exist for the data release (denoted with `<Key>` `</Key>`). To obtain a specific manifest of interest you just take the `Key` for the manifest you're interested in and append it to the name of the S3 bucket. For example:

<a href='https://visual-behavior-ophys-data.s3-us-west-2.amazonaws.com/visual-behavior-ophys/manifests/visual-behavior-ophys_project_manifest_v0.1.0.json'>https://visual-behavior-ophys-data.s3-us-west-2.amazonaws.com/visual-behavior-ophys/manifests/visual-behavior-ophys_project_manifest_v0.1.0.json</a>


### Using a versioned manifest to download a specific data version

Once you've downloaded a manifest, you can use it to obtain download links for the specific version of data files that the manifest tracks. The example function below loads a downloaded manifest and generates download links for *all* the metadata and data files for the specified manifest:

```{code-cell} ipython3
---
papermill:
  duration: 0.219128
  end_time: '2023-07-31T19:17:18.389416'
  exception: false
  start_time: '2023-07-31T19:17:18.170288'
  status: completed
pycharm:
  name: '#%%

    '
---
from typing import List
from urllib.parse import urljoin
import json

# The location will differ based on where you downloaded the manifest.json!
my_manifest_location = output_dir / cache.latest_manifest_file()

def generate_all_download_urls_from_manifest(manifest_path: Path) -> List[str]:
    with manifest_path.open('r') as fp:
        manifest = json.load(fp)

    download_links = []

    # Get download links for specific version of metadata files
    for metadata_file_entry in manifest["metadata_files"].values():
        base_download_url = metadata_file_entry["url"]
        version_query = f"?versionId={metadata_file_entry['version_id']}"
        full_download_url = urljoin(base_download_url, version_query)
        download_links.append(full_download_url)

    # Get download links for specific version of data files
    for data_file_entry in manifest["data_files"].values():
        base_download_url = data_file_entry["url"]
        version_query = f"?versionId={data_file_entry['version_id']}"
        full_download_url = urljoin(base_download_url, version_query)
        download_links.append(full_download_url)

    return download_links

# Example:
# print('\n'.join(generate_all_download_urls_from_manifest(my_manifest_location)))
```

```{code-cell} ipython3
---
papermill:
  duration: 0.046015
  end_time: '2023-07-31T19:17:18.481809'
  exception: false
  start_time: '2023-07-31T19:17:18.435794'
  status: completed
pycharm:
  name: '#%%

    '
---

```
