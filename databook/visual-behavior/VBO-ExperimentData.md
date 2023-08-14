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

+++ {"papermill": {"duration": 0.016963, "end_time": "2023-07-31T19:17:21.208856", "exception": false, "start_time": "2023-07-31T19:17:21.191893", "status": "completed"}}

# Visual Behavior Ophys Experiment Data

+++ {"papermill": {"duration": 0.014852, "end_time": "2023-07-31T19:17:21.240990", "exception": false, "start_time": "2023-07-31T19:17:21.226138", "status": "completed"}}

This notebook shows how to load optical physiology and behavior data for one imaging plane from one Visual Behavior Ophys session using the AllenSDK. It describes the type of data available and shows a few simple ways of plotting calcium fluorescence traces along with the animal's behavior and stimulus presentation times. 

Before you run this notebook, please install the allenSDK into your environment

+++ {"papermill": {"duration": 0.020825, "end_time": "2023-07-31T19:17:30.294008", "exception": false, "start_time": "2023-07-31T19:17:30.273183", "status": "completed"}}

### Import required libraries

+++ {"papermill": {"duration": 0.017178, "end_time": "2023-07-31T19:17:30.329177", "exception": false, "start_time": "2023-07-31T19:17:30.311999", "status": "completed"}}

We need to import libraries for plotting and manipulating data

```{code-cell} ipython3
---
papermill:
  duration: 1.08652
  end_time: '2023-07-31T19:17:31.432677'
  exception: false
  start_time: '2023-07-31T19:17:30.346157'
  status: completed
---
import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

%matplotlib notebook
%matplotlib inline
```

```{code-cell} ipython3
---
papermill:
  duration: 0.044697
  end_time: '2023-07-31T19:17:31.563323'
  exception: false
  start_time: '2023-07-31T19:17:31.518626'
  status: completed
---
# Import allenSDK and check the version, which should be >2.10.2
import allensdk
allensdk.__version__
```

```{code-cell} ipython3
---
papermill:
  duration: 5.781553
  end_time: '2023-07-31T19:17:37.362925'
  exception: false
  start_time: '2023-07-31T19:17:31.581372'
  status: completed
---
# import the behavior ophys project cache class from SDK to be able to load the data
from allensdk.brain_observatory.behavior.behavior_project_cache import VisualBehaviorOphysProjectCache
```

+++ {"papermill": {"duration": 0.019271, "end_time": "2023-07-31T19:17:37.400707", "exception": false, "start_time": "2023-07-31T19:17:37.381436", "status": "completed"}}

## Load the cache and get metadata tables

```{code-cell} ipython3
---
papermill:
  duration: 0.052759
  end_time: '2023-07-31T19:17:37.505024'
  exception: false
  start_time: '2023-07-31T19:17:37.452265'
  status: completed
tags: [parameters]
---
# Set the path to the dataset
cache_dir = '/root/capsule/data/visual-behavior-ophys/'
```

```{code-cell} ipython3
# If you are working with data in the cloud in Code Ocean, 
# or if you have already downloaded the full dataset to your local machine, 
# you can instantiate a local cache
cache = VisualBehaviorOphysProjectCache.from_local_cache(cache_dir=cache_dir, use_static_cache=True)

# If you are working with the data locally for the first time, you need to instantiate the cache from S3:
# cache = VisualBehaviorOphysProjectCache.from_s3_cache(cache_dir=cache_dir)
          
```

```{code-cell} ipython3
---
papermill:
  duration: 2.430735
  end_time: '2023-07-31T19:17:40.023206'
  exception: false
  start_time: '2023-07-31T19:17:37.592471'
  status: completed
---
# get metadata tables
behavior_session_table = cache.get_behavior_session_table()  
ophys_session_table = cache.get_ophys_session_table()   
ophys_experiment_table = cache.get_ophys_experiment_table()                         

#print number of items in each table for all imaging and behavioral sessions
print('Number of behavior sessions = {}'.format(len(behavior_session_table)))
print('Number of ophys sessions = {}'.format(len(ophys_session_table)))
print('Number of ophys experiments = {}'.format(len(ophys_experiment_table)))
```

+++ {"papermill": {"duration": 0.019037, "end_time": "2023-07-31T19:17:40.064045", "exception": false, "start_time": "2023-07-31T19:17:40.045008", "status": "completed"}}

The term <b>ophys experiment</b> is used to describe one imaging plane during one <b>ophys session</b>. Each ophys session can contain one or more ophys experiments (imaging planes) depending on which microscope was used.

For datasets acquired using a single-plane imaging microscope (`equipment_name` = `CAMP#.#`), there will be only 1 `ophys_experiment_id` per `ophys_session_id`. For sessions acquired with the multi-plane Mesoscope (`equipment_name` = `MESO.#`), there can be up to 8 ophys experiments (i.e. imaging planes) associated with that session. 

The <b>ophys_session_table</b> contains metadata for each imaging session and is organized by the `ophys_session_id`. 

The <b>ophys_experiment_table</b> contains metadata for each imaging plane in each session and is organized by the `ophys_experiment_id`. This table includes all the metadata provided by the `ophys_session_table`, as well as information specific to the imaging plane, such as the `imaging_depth` and `targeted_structure`.

A single imaging plane (aka ophys experiment) is linked across sessions using the `ophys_container_id`. An <b>ophys container</b> can contain a variable number of `ophys_experiment_ids` depending on which `session_types` were acquired and which passed quality control checks. 

The <b>behavior_session_table</b> contains metadata related to the full training history of each mouse and is organized by the `behavior_session_id`. Some <b>behavior sessions</b> took place under the 2-photon microscope (`session_type` beginning with `OPHYS_`) and will have an associated `ophys_session_id` if the ophys data passed quality control and is available for analysis. Some ophys sessions may not pass quality control, but the behavior data is still provided in the `behavior_session_table`.

+++ {"papermill": {"duration": 0.018553, "end_time": "2023-07-31T19:17:40.105101", "exception": false, "start_time": "2023-07-31T19:17:40.086548", "status": "completed"}}

In this notebook, we will use the `ophys_experiment_table` to select experiments of interest and look at them in a greater detail.

```{code-cell} ipython3
---
papermill:
  duration: 0.095663
  end_time: '2023-07-31T19:17:40.221181'
  exception: false
  start_time: '2023-07-31T19:17:40.125518'
  status: completed
---
# let's print a sample of 5 rows to see what's in the table
ophys_experiment_table.sample(5)
```

+++ {"papermill": {"duration": 0.019416, "end_time": "2023-07-31T19:17:40.261681", "exception": false, "start_time": "2023-07-31T19:17:40.242265", "status": "completed"}}

You can get any experiment ids from the experiment table by subsetting the table using various conditions (aka columns) in the table. Here, we can select experiments from Sst mice only, novel Ophys session 4, with 0 prior exposures to the stimulus (meaning the session was not a relake). 

```{code-cell} ipython3
---
papermill:
  duration: 0.054541
  end_time: '2023-07-31T19:17:40.336001'
  exception: false
  start_time: '2023-07-31T19:17:40.281460'
  status: completed
---
# get all Sst experiments for ophys session 4
selected_experiment_table = ophys_experiment_table[(ophys_experiment_table.cre_line=='Sst-IRES-Cre')&
                        (ophys_experiment_table.session_number==4) &
                        (ophys_experiment_table.prior_exposures_to_image_set==0)]
print('Number of experiments: {}'.format(len(selected_experiment_table)))
```

+++ {"papermill": {"duration": 0.019441, "end_time": "2023-07-31T19:17:40.375397", "exception": false, "start_time": "2023-07-31T19:17:40.355956", "status": "completed"}}

Remember that any given experiment contains data from only one imaging plane. Some of these experiments come from the same imaging session. Here, we can check how many unique imaging sessions are associated with experiments selected above.

```{code-cell} ipython3
---
papermill:
  duration: 0.053414
  end_time: '2023-07-31T19:17:40.447336'
  exception: false
  start_time: '2023-07-31T19:17:40.393922'
  status: completed
---
print('Number of unique sessions: {}'.format(len(selected_experiment_table['ophys_session_id'].unique())))
```

+++ {"papermill": {"duration": 0.021281, "end_time": "2023-07-31T19:17:40.488522", "exception": false, "start_time": "2023-07-31T19:17:40.467241", "status": "completed"}}

## Load an experiment

+++ {"papermill": {"duration": 0.021064, "end_time": "2023-07-31T19:17:40.529828", "exception": false, "start_time": "2023-07-31T19:17:40.508764", "status": "completed"}}

Let's pick a random experiment from the table and plot example ophys and behavioral data.

```{code-cell} ipython3
---
papermill:
  duration: 15.994575
  end_time: '2023-07-31T19:17:56.548301'
  exception: false
  start_time: '2023-07-31T19:17:40.553726'
  status: completed
---
# select first experiment from the table to look at in more detail. 
# Note that python enumeration starts at 0.
ophys_experiment_id = selected_experiment_table.index[0]

# load the data for this ophys experiment from the cache
ophys_experiment = cache.get_behavior_ophys_experiment(ophys_experiment_id)
```

+++ {"papermill": {"duration": 0.023766, "end_time": "2023-07-31T19:17:56.596974", "exception": false, "start_time": "2023-07-31T19:17:56.573208", "status": "completed"}}

#### show metadata for this experiment

```{code-cell} ipython3
---
papermill:
  duration: 0.059981
  end_time: '2023-07-31T19:17:56.681515'
  exception: false
  start_time: '2023-07-31T19:17:56.621534'
  status: completed
---
ophys_experiment.metadata
```

+++ {"papermill": {"duration": 0.02449, "end_time": "2023-07-31T19:17:56.731377", "exception": false, "start_time": "2023-07-31T19:17:56.706887", "status": "completed"}}

You can get additional information about this experiment from the metadata field of the dataset class. Here, you can see that this experiment was in Sst Cre line, in a female mouse at 233 days old, recorded using mesoscope (this is one of four imaging planes), at imaging depth of 150 microns, in primary visual cortex (VISp). This experiment is also from OPHYS 1 session using image set A.  

+++ {"papermill": {"duration": 0.025384, "end_time": "2023-07-31T19:17:56.780613", "exception": false, "start_time": "2023-07-31T19:17:56.755229", "status": "completed"}}

#### plot max projection from this experiment

```{code-cell} ipython3
---
papermill:
  duration: 0.272642
  end_time: '2023-07-31T19:17:57.076963'
  exception: false
  start_time: '2023-07-31T19:17:56.804321'
  status: completed
---
plt.imshow(ophys_experiment.max_projection, cmap='gray')
```

+++ {"papermill": {"duration": 0.027027, "end_time": "2023-07-31T19:17:57.131949", "exception": false, "start_time": "2023-07-31T19:17:57.104922", "status": "completed"}}

Max projection plots an average image from the movie recorded during an imaging session. Plotting max projection can give you a sense of how many neurons were visible during imaging and how clear and stable the imaging session was. 

+++ {"papermill": {"duration": 0.036156, "end_time": "2023-07-31T19:17:57.194907", "exception": false, "start_time": "2023-07-31T19:17:57.158751", "status": "completed"}}

#### load cell specimen table with cells' imaging metrics

```{code-cell} ipython3
---
papermill:
  duration: 0.401752
  end_time: '2023-07-31T19:17:57.624680'
  exception: false
  start_time: '2023-07-31T19:17:57.222928'
  status: completed
---
ophys_experiment.cell_specimen_table.sample(3)
```

+++ {"papermill": {"duration": 0.029492, "end_time": "2023-07-31T19:17:57.681524", "exception": false, "start_time": "2023-07-31T19:17:57.652032", "status": "completed"}}

```cell_specimen_table``` includes information about ```x``` and ```y``` coordinates of the cell in the imaging plane as well as how much correction was applied during motion correction process. 

```cell_roi_id``` is a unique id assigned to each ROI during segmentation.

```cell_specimen_id``` is a unique id assigned to each cell after cell matching, which means that if we were able to identify and match the same cell across multiple sessions, it can be identified by its unique cell specimen id.

```roi_mask``` is a boolean array that can be used to visualize where any given cell is in the imaging field. 

```{code-cell} ipython3
---
papermill:
  duration: 0.222352
  end_time: '2023-07-31T19:17:57.930079'
  exception: false
  start_time: '2023-07-31T19:17:57.707727'
  status: completed
---
plt.imshow(ophys_experiment.cell_specimen_table.iloc[1]['roi_mask'])
```

+++ {"papermill": {"duration": 0.027947, "end_time": "2023-07-31T19:17:57.986477", "exception": false, "start_time": "2023-07-31T19:17:57.958530", "status": "completed"}}

#### show dff traces for the first 10 cells this experiment 

```{code-cell} ipython3
---
papermill:
  duration: 0.082713
  end_time: '2023-07-31T19:17:58.097041'
  exception: false
  start_time: '2023-07-31T19:17:58.014328'
  status: completed
---
ophys_experiment.dff_traces.head(10)
```

+++ {"papermill": {"duration": 0.028817, "end_time": "2023-07-31T19:17:58.159225", "exception": false, "start_time": "2023-07-31T19:17:58.130408", "status": "completed"}}

```dff_traces``` dataframe contains traces for all neurons in this experiment, unaligned to any events in the task.

You can select rows by their enumerated number using ```.iloc[]``` method:

```{code-cell} ipython3
---
papermill:
  duration: 0.068181
  end_time: '2023-07-31T19:17:58.255456'
  exception: false
  start_time: '2023-07-31T19:17:58.187275'
  status: completed
---
ophys_experiment.dff_traces.iloc[4]
```

+++ {"papermill": {"duration": 0.027507, "end_time": "2023-07-31T19:17:58.311487", "exception": false, "start_time": "2023-07-31T19:17:58.283980", "status": "completed"}}

Alternatively, you can use ```cell_specimen_id``` as index to select cells with ```.loc[]``` method:

```{code-cell} ipython3
---
papermill:
  duration: 0.066881
  end_time: '2023-07-31T19:17:58.406326'
  exception: false
  start_time: '2023-07-31T19:17:58.339445'
  status: completed
---
ophys_experiment.dff_traces.loc[1086608577]
```

+++ {"papermill": {"duration": 0.079548, "end_time": "2023-07-31T19:17:58.514354", "exception": false, "start_time": "2023-07-31T19:17:58.434806", "status": "completed"}}

If you don't want dff in a pandas dataframe format, you can load dff traces as an array, using ```np.vstack``` function to format the data into cell by time array and ```.values``` to only grab values in dff column:

```{code-cell} ipython3
---
papermill:
  duration: 0.082277
  end_time: '2023-07-31T19:17:58.625627'
  exception: false
  start_time: '2023-07-31T19:17:58.543350'
  status: completed
---
dff_array = np.vstack(ophys_experiment.dff_traces.dff.values)
print('This array contrains dff traces from {} neurons and it is {} samples long.'.format(dff_array.shape[0], dff_array.shape[1]))
```

+++ {"papermill": {"duration": 0.028812, "end_time": "2023-07-31T19:17:58.683230", "exception": false, "start_time": "2023-07-31T19:17:58.654418", "status": "completed"}}

#### show events traces for the first 10 cells in this experiment

```{code-cell} ipython3
---
papermill:
  duration: 0.096818
  end_time: '2023-07-31T19:17:58.808225'
  exception: false
  start_time: '2023-07-31T19:17:58.711407'
  status: completed
---
 ophys_experiment.events.head(10)
```

+++ {"papermill": {"duration": 0.028505, "end_time": "2023-07-31T19:17:58.865738", "exception": false, "start_time": "2023-07-31T19:17:58.837233", "status": "completed"}}

```events``` table is similar to ```dff_traces``` but the output provides traces of extrapolated events. Events are computed on unmixed dff traces for each cell as described in [Giovannucci et al. 2019](https://pubmed.ncbi.nlm.nih.gov/30652683/). The magnitude of events approximates the firing rate of neurons with the resolusion of about 200 ms. The biggest advantage of using events over dff traces is they exclude prolonged Ca transients that may conteminate neural responses to subsequent stimuli. You can also use ```filtered_events``` which are events convolved with a filter created using ```stats.halfnorm``` method. 

```lambda``` is computed from Poisson distribution of events in the trace (think of it as a center of mass of the distribution, larger lambda == higher "firing rate").

```noise_std``` is a measure of variability in the events trace.

+++ {"papermill": {"duration": 0.028394, "end_time": "2023-07-31T19:17:58.923410", "exception": false, "start_time": "2023-07-31T19:17:58.895016", "status": "completed"}}

#### load ophys timestamps

The timestamps are the same for ```dff_traces``` and ```events```, in seconds

```{code-cell} ipython3
---
papermill:
  duration: 0.061968
  end_time: '2023-07-31T19:17:59.013618'
  exception: false
  start_time: '2023-07-31T19:17:58.951650'
  status: completed
---
ophys_experiment.ophys_timestamps
```

+++ {"papermill": {"duration": 0.029059, "end_time": "2023-07-31T19:17:59.071871", "exception": false, "start_time": "2023-07-31T19:17:59.042812", "status": "completed"}}

## Pick a cell and plot the traces

We can select a random cell from the experiment and plot its dff and events traces along with other behavioral and stimulus data.

```{code-cell} ipython3
---
papermill:
  duration: 0.06497
  end_time: '2023-07-31T19:17:59.165288'
  exception: false
  start_time: '2023-07-31T19:17:59.100318'
  status: completed
---
cell_specimen_ids = ophys_experiment.cell_specimen_table.index.values # a list of all cell ids
cell_specimen_id = cell_specimen_ids[5] # let's pick 6th cell
print('Cell specimen id = {}'.format(cell_specimen_id)) # print id
```

```{code-cell} ipython3
---
papermill:
  duration: 0.501785
  end_time: '2023-07-31T19:17:59.699584'
  exception: false
  start_time: '2023-07-31T19:17:59.197799'
  status: completed
---
# plot dff and events traces overlaid from the cell selected above
fig, ax = plt.subplots(1,1, figsize = (10,2))
ax.plot(ophys_experiment.ophys_timestamps, ophys_experiment.dff_traces.loc[cell_specimen_id, 'dff'], label='dff')
ax.plot(ophys_experiment.ophys_timestamps, ophys_experiment.events.loc[cell_specimen_id, 'events'], label='events')
ax.set_xlabel('time (seconds)')
ax.set_ylabel('trace magnitude')
ax.set_title('Cell specimen id = {}'.format(cell_specimen_id))
ax.legend()
```

+++ {"papermill": {"duration": 0.032889, "end_time": "2023-07-31T19:17:59.765091", "exception": false, "start_time": "2023-07-31T19:17:59.732202", "status": "completed"}}

We can see that as expected, events trace is much cleaner than dff and it generally follows big Ca transients really well. We can also see that this cell was not very active during our experiment. Each experiment has a 5 minute movie at the end, which often drives neural activity really well. We can see a notable increase in cell's activity at the end of this experiment as well.

+++ {"papermill": {"duration": 0.030818, "end_time": "2023-07-31T19:17:59.830414", "exception": false, "start_time": "2023-07-31T19:17:59.799596", "status": "completed"}}

#### plot mouse running speed from this experiment

```{code-cell} ipython3
---
papermill:
  duration: 0.37195
  end_time: '2023-07-31T19:18:00.232545'
  exception: false
  start_time: '2023-07-31T19:17:59.860595'
  status: completed
---

fig, ax = plt.subplots(1,1, figsize = (10,2))
ax.plot(ophys_experiment.stimulus_timestamps, ophys_experiment.running_speed['speed'], color='gray', linestyle='--')
ax.set_xlabel('time (seconds)')
ax.set_ylabel('running speed (cm/s)')
ax.set_title('Ophys experiment {}'.format(ophys_experiment_id))
```

+++ {"papermill": {"duration": 0.032105, "end_time": "2023-07-31T19:18:00.299158", "exception": false, "start_time": "2023-07-31T19:18:00.267053", "status": "completed"}}

#### plot pupil area for the same experiment

```{code-cell} ipython3
---
papermill:
  duration: 0.350607
  end_time: '2023-07-31T19:18:00.681939'
  exception: false
  start_time: '2023-07-31T19:18:00.331332'
  status: completed
---

fig, ax = plt.subplots(1,1, figsize = (20,5))
ax.plot(ophys_experiment.eye_tracking.timestamps, ophys_experiment.eye_tracking.pupil_area, color='gray')
ax.set_xlabel('time (seconds)')
ax.set_ylabel('pupil area (pixels^2)')
ax.set_title('Ophys experiment {}'.format(ophys_experiment_id), fontsize = 20)
```

+++ {"papermill": {"duration": 0.033788, "end_time": "2023-07-31T19:18:00.751091", "exception": false, "start_time": "2023-07-31T19:18:00.717303", "status": "completed"}}

You can find all attributes and methods that belong to dataset class using this helpful method:

```{code-cell} ipython3
---
papermill:
  duration: 0.07399
  end_time: '2023-07-31T19:18:00.859764'
  exception: false
  start_time: '2023-07-31T19:18:00.785774'
  status: completed
---
ophys_experiment.list_data_attributes_and_methods()
```

+++ {"papermill": {"duration": 0.034695, "end_time": "2023-07-31T19:18:00.929434", "exception": false, "start_time": "2023-07-31T19:18:00.894739", "status": "completed"}}

You can learn more about them by calling ```help``` on them: 

```{code-cell} ipython3
---
papermill:
  duration: 0.067597
  end_time: '2023-07-31T19:18:01.030314'
  exception: false
  start_time: '2023-07-31T19:18:00.962717'
  status: completed
---
help(ophys_experiment.get_segmentation_mask_image)
```

+++ {"papermill": {"duration": 0.0349, "end_time": "2023-07-31T19:18:01.101548", "exception": false, "start_time": "2023-07-31T19:18:01.066648", "status": "completed"}}

## Get information about visual stimuli presented on each trial

get stimulus information for this experiment and assign it to a table called ```stimulus_table```

```{code-cell} ipython3
---
papermill:
  duration: 0.08712
  end_time: '2023-07-31T19:18:01.223405'
  exception: false
  start_time: '2023-07-31T19:18:01.136285'
  status: completed
---
stimulus_table = ophys_experiment.stimulus_presentations
stimulus_table.head(10)
```

+++ {"papermill": {"duration": 0.035256, "end_time": "2023-07-31T19:18:01.293794", "exception": false, "start_time": "2023-07-31T19:18:01.258538", "status": "completed"}}

This table provides helpful information like image name, start, duration and stop of image presentation, and whether the image was omitted. 

```{code-cell} ipython3
---
papermill:
  duration: 0.069342
  end_time: '2023-07-31T19:18:01.397053'
  exception: false
  start_time: '2023-07-31T19:18:01.327711'
  status: completed
---
print('This experiment had {} stimuli.'.format(len(stimulus_table)))
print('Out of all stimuli presented, {} were omitted.'.format(len(stimulus_table[stimulus_table['image_name']=='omitted'])))
```

+++ {"papermill": {"duration": 0.03489, "end_time": "2023-07-31T19:18:01.466790", "exception": false, "start_time": "2023-07-31T19:18:01.431900", "status": "completed"}}

You can also use ```keys()``` method to see the names of the columns in any pandas dataframe table:

```{code-cell} ipython3
---
papermill:
  duration: 0.072048
  end_time: '2023-07-31T19:18:01.572867'
  exception: false
  start_time: '2023-07-31T19:18:01.500819'
  status: completed
---
stimulus_table.keys()
```

+++ {"papermill": {"duration": 0.036753, "end_time": "2023-07-31T19:18:01.644863", "exception": false, "start_time": "2023-07-31T19:18:01.608110", "status": "completed"}}

## Get task and behavioral data for each trial

get behavioral trial information and assign it to ```trials_table```

```{code-cell} ipython3
---
papermill:
  duration: 0.097215
  end_time: '2023-07-31T19:18:01.777677'
  exception: false
  start_time: '2023-07-31T19:18:01.680462'
  status: completed
---
trials_table = ophys_experiment.trials
trials_table.head(5)
```

```{code-cell} ipython3
---
papermill:
  duration: 0.07463
  end_time: '2023-07-31T19:18:01.888635'
  exception: false
  start_time: '2023-07-31T19:18:01.814005'
  status: completed
---
trials_table.keys()
```

+++ {"papermill": {"duration": 0.034335, "end_time": "2023-07-31T19:18:01.958833", "exception": false, "start_time": "2023-07-31T19:18:01.924498", "status": "completed"}}

This table has information about experiment trials. ```go``` trials are change trials when the animal was supposed to lick. If the animal licked, ```hit``` is set to True for that trial. If the animal was rewarded, ```reward_time``` will have time in seconds. If this was an auto rewarded trial (regardless of whether the animal got it right), ```auto_rewarded``` is set to True. The trials table also includes ```response_latency``` which can be used as reaction time of the animal during the experiment.

+++ {"papermill": {"duration": 0.03508, "end_time": "2023-07-31T19:18:02.029543", "exception": false, "start_time": "2023-07-31T19:18:01.994463", "status": "completed"}}

## Plot an example of one selected cell

+++ {"papermill": {"duration": 0.033827, "end_time": "2023-07-31T19:18:02.098498", "exception": false, "start_time": "2023-07-31T19:18:02.064671", "status": "completed"}}

Now, we will put together a plotting functions that utilizes data in the dataset class to plot ophys traces and behavioral data from an experiment. 

```{code-cell} ipython3
---
papermill:
  duration: 0.082051
  end_time: '2023-07-31T19:18:02.215790'
  exception: false
  start_time: '2023-07-31T19:18:02.133739'
  status: completed
---
# create a list of all unique stimuli presented in this experiment
unique_stimuli = [stimulus for stimulus in ophys_experiment.stimulus_presentations['image_name'].unique()]

# create a colormap with each unique image having its own color
colormap = {image_name: sns.color_palette()[image_number] for image_number, image_name in enumerate(np.sort(unique_stimuli))}
colormap['omitted'] = (1,1,1) # set omitted stimulus to white color

# add the colors for each image to the stimulus presentations table in the dataset
stimulus_presentations = ophys_experiment.stimulus_presentations
stimulus_presentations['color'] = ophys_experiment.stimulus_presentations['image_name'].map(lambda image_name: colormap[image_name])
```

```{code-cell} ipython3
---
papermill:
  duration: 0.09408
  end_time: '2023-07-31T19:18:02.345921'
  exception: false
  start_time: '2023-07-31T19:18:02.251841'
  status: completed
---
# function to plot dff traces
def plot_dff_trace(ax, cell_specimen_id, initial_time, final_time):
    '''
        ax: axis on which to plot
        cell_specimen_id: id of the cell to plot
        intial_time: initial time to plot from
        final_time: final time to plot to
    '''
    #create a dataframe using dff trace from one seleted cell
    data = {'dff': ophys_experiment.dff_traces.loc[cell_specimen_id].dff,
        'timestamps': ophys_experiment.ophys_timestamps}
    df = pd.DataFrame(data)
    dff_trace_sample = df.query('timestamps >= @initial_time and timestamps <= @final_time')
    ax.plot(
        dff_trace_sample['timestamps'],
        dff_trace_sample['dff']/dff_trace_sample['dff'].max()
    )
    
# function to plot events traces    
def plot_events_trace(ax, cell_specimen_id, initial_time, final_time):
    # create a dataframe using events trace from one seleted cell
    data = {'events': ophys_experiment.events.loc[cell_specimen_id].events,
        'timestamps': ophys_experiment.ophys_timestamps}
    df = pd.DataFrame(data)
    events_trace_sample = df.query('timestamps >= @initial_time and timestamps <= @final_time')
    ax.plot(
        events_trace_sample['timestamps'],
        events_trace_sample['events']/events_trace_sample['events'].max()
    )
# function to plot running speed   
def plot_running(ax, initial_time, final_time):
    running_sample = ophys_experiment.running_speed.query('timestamps >= @initial_time and timestamps <= @final_time')
    ax.plot(
        running_sample['timestamps'],
        running_sample['speed']/running_sample['speed'].max(),
        '--',
        color = 'gray',
        linewidth = 1
    )
# function to plot pupil diameter   
def plot_pupil(ax, initial_time, final_time):
    pupil_sample = ophys_experiment.eye_tracking.query('timestamps >= @initial_time and timestamps <= @final_time')
    ax.plot(
        pupil_sample['timestamps'],
        pupil_sample['pupil_width']/pupil_sample['pupil_width'].max(),
        color = 'gray',
        linewidth = 1
    )
# function to plot licks
def plot_licks(ax, initial_time, final_time):
    licking_sample = ophys_experiment.licks.query('timestamps >= @initial_time and timestamps <= @final_time')
    ax.plot(
        licking_sample['timestamps'],
        np.zeros_like(licking_sample['timestamps']),
        marker = 'o',
        markersize = 3,
        color = 'black',
        linestyle = 'none'
    )
# function to plot rewards    
def plot_rewards(ax, initial_time, final_time):
    rewards_sample = ophys_experiment.rewards.query('timestamps >= @initial_time and timestamps <= @final_time')
    ax.plot(
        rewards_sample['timestamps'],
        np.zeros_like(rewards_sample['timestamps']),
        marker = 'd',
        color = 'blue',
        linestyle = 'none',
        markersize = 12,
        alpha = 0.5
    )
    
def plot_stimuli(ax, initial_time, final_time):
    stimulus_presentations_sample = stimulus_presentations.query('end_time >= @initial_time and start_time <= @final_time')
    for idx, stimulus in stimulus_presentations_sample.iterrows():
        ax.axvspan(stimulus['start_time'], stimulus['end_time'], color=stimulus['color'], alpha=0.25)
```

```{code-cell} ipython3
---
papermill:
  duration: 0.875562
  end_time: '2023-07-31T19:18:03.257656'
  exception: false
  start_time: '2023-07-31T19:18:02.382094'
  status: completed
---
initial_time = 820 # start time in seconds
final_time = 860 # stop time in seconds
fig, ax = plt.subplots(2,1,figsize = (15,7))
plot_dff_trace(ax[0], cell_specimen_ids[3], initial_time, final_time)
plot_events_trace(ax[0], cell_specimen_ids[3], initial_time, final_time)
plot_stimuli(ax[0], initial_time, final_time)
ax[0].set_ylabel('normalized response magnitude')
ax[0].set_yticks([])
ax[0].legend(['dff trace', 'events trace'])

plot_running(ax[1], initial_time, final_time)
plot_pupil(ax[1], initial_time, final_time)
plot_licks(ax[1], initial_time, final_time)
plot_rewards(ax[1], initial_time, final_time)
plot_stimuli(ax[1], initial_time, final_time)

ax[1].set_yticks([])
ax[1].legend(['running speed', 'pupil','licks', 'rewards'])
```

+++ {"papermill": {"duration": 0.040116, "end_time": "2023-07-31T19:18:03.338712", "exception": false, "start_time": "2023-07-31T19:18:03.298596", "status": "completed"}}

From looking at the activity of this neuron, we can see that it was very active during our experiment but its activity does not appear to be reliably locked to image presentations. It does seem to vaguely follow animal's running speed, thus it might be modulated by running.

+++ {"papermill": {"duration": 0.039161, "end_time": "2023-07-31T19:18:03.415324", "exception": false, "start_time": "2023-07-31T19:18:03.376163", "status": "completed"}}

### Vip cell example

We can get a different, Vip experiment from *Ophys session 1* and plot it to compare response traces. This gives us a similar plot from a different inhibitory neuron to compare their neural dynamics.

```{code-cell} ipython3
---
papermill:
  duration: 21.391098
  end_time: '2023-07-31T19:18:24.845628'
  exception: false
  start_time: '2023-07-31T19:18:03.454530'
  status: completed
---
# Select a Vip experiment with familiar images (session_number = 1, 2, or 3)
selected_experiment_table = ophys_experiment_table[(ophys_experiment_table.cre_line=='Vip-IRES-Cre')&
                        (ophys_experiment_table.session_number==1)]

# load the experiment data from the cache
ophys_experiment = cache.get_behavior_ophys_experiment(selected_experiment_table.index.values[1])
# get the cell IDs
cell_specimen_ids = ophys_experiment.cell_specimen_table.index.values # a list of all cell ids
```

```{code-cell} ipython3
---
papermill:
  duration: 0.102536
  end_time: '2023-07-31T19:18:24.997267'
  exception: false
  start_time: '2023-07-31T19:18:24.894731'
  status: completed
---

# create a list of all unique stimuli presented in this experiment
unique_stimuli = [stimulus for stimulus in ophys_experiment.stimulus_presentations['image_name'].unique()]

# create a colormap with each unique image having its own color
colormap = {image_name: sns.color_palette()[image_number] for image_number, image_name in enumerate(np.sort(unique_stimuli))}
colormap['omitted'] = (1,1,1)

# add the colors for each image to the stimulus presentations table in the dataset
ophys_experiment.stimulus_presentations['color'] = ophys_experiment.stimulus_presentations['image_name'].map(lambda image_name: colormap[image_name])
```

```{code-cell} ipython3
---
papermill:
  duration: 0.846341
  end_time: '2023-07-31T19:18:25.889635'
  exception: false
  start_time: '2023-07-31T19:18:25.043294'
  status: completed
---
# we can plot the same information for a different cell in the dataset
initial_time = 580 # start time in seconds
final_time = 620 # stop time in seconds
fig, ax = plt.subplots(2,1,figsize = (15,7))

plot_dff_trace(ax[0], cell_specimen_ids[5], initial_time, final_time)
plot_events_trace(ax[0], cell_specimen_ids[5], initial_time, final_time)
plot_stimuli(ax[0], initial_time, final_time)
ax[0].set_ylabel('normalized response magnitude')
ax[0].set_yticks([])
ax[0].legend(['dff trace', 'events trace'])

plot_running(ax[1], initial_time, final_time)
plot_pupil(ax[1], initial_time, final_time)
plot_licks(ax[1], initial_time, final_time)
plot_rewards(ax[1], initial_time, final_time)
plot_stimuli(ax[1], initial_time, final_time)

ax[1].set_yticks([])
ax[1].legend(['running speed', 'pupil','licks', 'rewards'])
```

+++ {"papermill": {"duration": 0.049881, "end_time": "2023-07-31T19:18:25.988508", "exception": false, "start_time": "2023-07-31T19:18:25.938627", "status": "completed"}}

We can see that the dynamics of a Vip neuron are also not driven by the visual stimuli. Aligning neural activity to different behavioral or experimental events might reveal what this neuron is driven by.
