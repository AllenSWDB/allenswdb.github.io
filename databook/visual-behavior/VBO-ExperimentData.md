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

# Visual Behavior Ophys Experiment Data

Below we we will learn how to load optical physiology and behavior data for one imaging plane from a Visual Behavior Ophys session using the AllenSDK. It describes the type of data available and shows a few simple ways of plotting calcium fluorescence traces along with the animal's behavior and stimulus presentation times.

We need to import libraries for plotting and manipulating data:

```{code-cell} ipython3

import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

%matplotlib notebook
%matplotlib inline
```

```{code-cell} ipython3
# Import allenSDK and check the version, which should be >2.10.2
import allensdk
allensdk.__version__
```

## Load the cache and get metadata tables

```{code-cell} ipython3
# import the behavior ophys project cache class from SDK to be able to load the data
from allensdk.brain_observatory.behavior.behavior_project_cache import VisualBehaviorOphysProjectCache
```

```{code-cell} ipython3
# Set the path to the dataset
cache_dir = '/root/capsule/data/'
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
# get metadata tables
behavior_session_table = cache.get_behavior_session_table()
ophys_session_table = cache.get_ophys_session_table()
ophys_experiment_table = cache.get_ophys_experiment_table()

#print number of items in each table for all imaging and behavioral sessions
print('Number of behavior sessions = {}'.format(len(behavior_session_table)))
print('Number of ophys sessions = {}'.format(len(ophys_session_table)))
print('Number of ophys experiments = {}'.format(len(ophys_experiment_table)))
```

The term <b>ophys experiment</b> is used to describe one imaging plane during one <b>ophys session</b>. Each ophys session can contain one or more ophys experiments (imaging planes) depending on which microscope was used.

For datasets acquired using a single-plane imaging microscope (`equipment_name` = `CAMP#.#`), there will be only 1 `ophys_experiment_id` per `ophys_session_id`. For sessions acquired with the multi-plane Mesoscope (`equipment_name` = `MESO.#`), there can be up to 8 ophys experiments (i.e. imaging planes) associated with that session.

The `ophys_session_table` contains metadata for each imaging session and is organized by the `ophys_session_id`.

The `ophys_experiment_table` contains metadata for each imaging plane in each session and is organized by the `ophys_experiment_id`. This table includes all the metadata provided by the `ophys_session_table`, as well as information specific to the imaging plane, such as the `imaging_depth` and `targeted_structure`.

A single imaging plane (aka ophys experiment) is linked across sessions using the `ophys_container_id`. An <b>ophys container</b> can contain a variable number of `ophys_experiment_ids` depending on which `session_types` were acquired for that imaging plane, and which passed quality control checks.

The `behavior_session_table` contains metadata related to the full training history of each mouse and is organized by the `behavior_session_id`. Some <b>behavior sessions</b> took place under the 2-photon microscope (`session_type` beginning with `OPHYS_`) and will have an associated `ophys_session_id` if the ophys data passed quality control and is available for analysis.

Some ophys sessions may not pass quality control, but the behavior data is still provided in the `behavior_session_table`. These sessions will have a `session_type` beginning with `OPHYS_` but will not have an associated `ophys_session_id`.

In this notebook, we will use the `ophys_experiment_table` to select experiments of interest and look at them in a greater detail.

### Filter the `ophys_experiment_table` to identify experiments of interest

```{code-cell} ipython3
# let's print a sample of 5 rows to see what's in the table
ophys_experiment_table.sample(5)
```

You can get `ophys_experiment_id`s corresponding to specific experimental conditions by filtering the table using the columns. Here, we can select experiments from mice from the Sst-IRES-Cre {term}`Driver Line`, also called a {term}'Cre line', as well as filter by `session_number` to identify experiments from the first session with the novel images, which always has a `session_type` starting with `OPHYS_4`, and can be identified using the abbreviated `session_number` column which is agnostic to which specific image set was used). You can use the `prior_exposures_to_image_set` column to ensure that the session was truly the first day with the novel image set, and not a retake of the same `session_type`.


```{code-cell} ipython3
# get all Sst experiments for ophys session 4
selected_experiment_table = ophys_experiment_table[(ophys_experiment_table.cre_line=='Sst-IRES-Cre')&
                        (ophys_experiment_table.session_number==4) &
                        (ophys_experiment_table.prior_exposures_to_image_set==0)]
print('Number of experiments: {}'.format(len(selected_experiment_table)))
```

Remember that any given experiment (defined by its `ophys_experiment_id`) contains data from only one imaging plane, in one session. There can be multiple experiments (imaging planes) recorded in the same imaging session if the multi-plane 2-photon microscope was used, but there can never be multiple sessions for a given `ophys_experiment_id`.

Here, we can check how many unique imaging sessions are associated with experiments selected above.

```{code-cell} ipython3
print('Number of unique sessions: {}'.format(len(selected_experiment_table['ophys_session_id'].unique())))
```

## Load data for one experiment

Let's pick an experiment from the table and plot example ophys and behavioral data.

```{code-cell} ipython3
# select first experiment from the table to look at in more detail.
ophys_experiment_id = selected_experiment_table.index[0]

# load the data for this ophys experiment from the cache
ophys_experiment = cache.get_behavior_ophys_experiment(ophys_experiment_id)
```

The `get_behavior_ophys_experiment()` method returns a python object containing all data and metadata for the provided `ophys_experiment_id`.

What are the attributes of the `ophys_experiment` object?

```{code-cell} ipython3
# Get all attributes & methods
attributes = ophys_experiment.list_data_attributes_and_methods()
# Let's focus on attribtues for now, remove the methods, which start with "get"
[attribute for attribute in attributes if 'get' not in attribute]
```

Note that any attribute can be followed by a `?` in a Jupyter Notebook to see the docstring. For example, running the cell below will make a frame appear at the bottom of your browser with the docstring for the `metadata` attribute.

```{code-cell} ipython3
ophys_experiment.metadata?
```

## Experiment metadata

Get the metadata for this experiment using the `metadata` attribute of the OphysExperiment class.

```{code-cell} ipython3
ophys_experiment.metadata
```
Here you can see that this experiment was in Sst Cre line, in a female mouse at 233 days old, recorded using mesoscope, at an imaging depth of 150 microns, in primary visual cortex (VISp). This experiment is also from OPHYS 1 session using image set A.

age_in_days
: (int) age of mouse in days

behavior_session_id
: (int)	unique identifier for a behavior session

behavior_session_uuid
: (uuid)  unique identifier for a behavior session

cre_line
: (string) cre driver line for a transgenic mouse

date_of_acquisition
: (date time object) date and time of experiment acquisition, yyyy-mm-dd hh:mm:ss.

driver_line
: (list of string) all driver lines for transgenic mouse

emission_lambda:
 (float) wavelength (in nanometers) the 2 photon microscope is tuned to based on transgenic reporter line

equipment_name
: (string) identifier for equipment data was collected on

excitation_lambda
: (float 64) wavelength (in nanometers) of the two photon laser

experiment_container_id
: (int) unique identifier for a container

field_of_view_height
: (int) field of view height in pixels

field_of_view_width
: (int) field of view width in pixels

full_genotype
: (string) full genotype of transgenic mouse

imaging_depth
: (int) depth in microns from the cortical surface, where the data was collected

imaging_plane_group
: (none or int) a grouping number assigned to paired planes (experiments) that were simultaneously recorded, applies to mesoscope sessions only

imaging_plane_group_count
: (int) total number of imaging plane groups for a mesoscope session

mouse_id
: (int)	unique identifier for a mouse

ophys_experiment_id
: (int) unique identifier for an ophys experiment, corresponding to one imaging plane in one recording session

ophys_frame_rate
: (float 64) rate (in Hz) that the two photon microscope collected frames for an individual imaging plane / field of view

ophys_session_id
: (int) unique identifier for a ophys session

reporter_line
: (string) reporter line for transgenic mouse

session_type
: (string) visual stimulus type displayed during behavior session

sex
: (string)	sex of the mouse

stimulus_frame_rate
: (float) frame rate (Hz) at which the visual stimulus is displayed

targeted_structure
: (string) brain area targeted for the imaging plane in this experiment

## Max projection image

Plot the maximum intensity projection image for this imaging plane.

```{code-cell} ipython3
plt.imshow(ophys_experiment.max_projection, cmap='gray')
```

The `max_projection` is a 2D image of the maximum intensity value for each pixel across the entire 2-photon movie recorded during an imaging session. Plotting the max projection can give you a sense of how many neurons were visible during imaging and how clear and stable the imaging session was.

## Average projection

Plot the average projection image for this imaging plane.

```{code-cell} ipython3
plt.imshow(ophys_experiment.average_projection, cmap='gray')
```

The `average_projection` is a2D image of the microscope field of view, averaged across the session.

## Cell specimen table

Examine the `cell_specimen_table` which contains metadata about each segmented neuron.

```{code-cell} ipython3
ophys_experiment.cell_specimen_table.sample(3)
```

cell_specimen_id [index]
: (int) unified id of segmented cell across experiments (assigned after cell matching)

cell_roi_id
: (int) experiment specific id of segmented roi (assigned before cell matching)

roi_mask
: (array of bool) an image array that displays the location of the roi mask in the field of view

valid_roi
: (bool) indicates if cell classification found the segmented ROI to be a cell or not (True = cell, False = not cell). Only valid cells are provided  in the released dataset.

width
: (int) width of ROI in pixels

height
: (int) height of ROI/cell in pixels

x
: (float) x position of ROI in field of view in pixels (top left corner)

y
: (float) y position of ROI in field of view in pixels (top left corner)

mask_image_plane
: (int) which image plane an ROI resides on. Overlapping ROIs are stored on different mask image planes

max_corretion_down
: (float) max motion correction in down direction in pixels

max_correction_left
: (float) max motion correction in left direction in pixels

max_correction_right
: (float) max motion correction in right direction in pixels

max_correction_up
: (float) max motion correction in up direction in pixels

What do the ROI masks look like?

```{code-cell} ipython3
# plot one ROI mask
plt.imshow(ophys_experiment.cell_specimen_table.iloc[1]['roi_mask'])
```

## Segmentation mask image

A 2D image of all segmented ROIs can be viewed using the `segmentation_mask_image` attribute.

segmentation_mask_image

```{code-cell} ipython3
plt.imshow(ophys_experiment.segmentation_mask_image)
```

## Cell activity traces

There are several versions of cell activity traces, corresponding to different stages of the data processing pipeline.

<b>cell activity traces recorded on the single-plane Scientifica microscopes are sampled at 30Hz, while cell activity recorded on the multi-plane Mesoscope are recorded at 11Hz</b>

After ROIs are segmented, the average fluorescence value within the ROI is computed for each frame of the 2-photon movie, resulting in a trace of raw fluorescence over time, in arbitrary units. A fluorescence trace for the region surrounding the ROI, containing neuropil and other cell bodies, is computed and subtracted from the raw fluorescence of the cell to remove contamination from surrounding pixels. If two ROIs are overlapping with each other, they are demixed to ensure that the fluorescence signal is attributed to the correct ROI.

The neuropil corrected, demixed traces, called `corrected_fluorescence_traces` are then baseline subtracted and normalized to produce `dff_traces` which provide a fractional change in fluorescence over time relative to the ROI's baseline fluorescence. These are the cell activity traces that are typically used for analysis.

Finally, an event detection algorithm is run on the `dff_traces` to determine the time and magnitude of calcium `events` and reduce potential confounds arising from features of the calcium indicator. More specifically, the binding kinetics of the calcium indicator GCaMP6 result in a fast rise in fluorescence following spiking activity, but a much slower decay time. This slow decay of the calcium signal can cause problems some types of analysis because repeated bursts of action potentials can cause the calcium signal to summate, resulting in a magnitude that is no longer proportional to the cell's activity. The deconvolved `events` remove contamination due to this slow decay, and are useful in cases where timing precision is particularly important.

The dataframes provided for `dff_traces`, `events`, `corrected_fluorescence_traces`, `demixed_traces`, and `neuropil_traces` all share the same index, the `cell_specimen_id` and one column, the `cell_roi_id`.

cell_specimen_id [index]
: (int) unified ID of segmented cell across experiments (assigned after cell matching)

cell_roi_id
: (int) experiment specific ID of segmented cell (assigned before cell matching)

The unique columns of the two most important types of traces, `dff_traces` and `events` are described below.

### dF/F traces

Examine `dff_traces` for the first 10 cells this experiment.

```{code-cell} ipython3
ophys_experiment.dff_traces.head(10)
```

dff
: (list of float) fractional fluorescence values relative to baseline (arbitrary units). Each value corresponds to one frame of the 2-photon movie.

If you don't want dff in a pandas dataframe format, you can convert `dff_traces` to an array, using the `np.vstack` function.

```{code-cell} ipython3
dff_array = np.vstack(ophys_experiment.dff_traces.dff.values)
print('This array contrains dff traces from {} neurons and it is {} samples long.'.format(dff_array.shape[0], dff_array.shape[1]))
```

### Events

`events` are computed for each cell as described in [Giovannucci et al. 2019](https://pubmed.ncbi.nlm.nih.gov/30652683/). The magnitude of events approximates the firing rate of neurons with the resolusion of about 200 ms. The biggest advantage of using events over dff traces is they exclude prolonged calcium transients that may conteminate neural responses to subsequent stimuli. You can also use `filtered_events` which are events convolved with a filter created using `stats.halfnorm` method to generate a more continuous trace of activity.

Examine `events` for the first 10 cells this experiment.

```{code-cell} ipython3
 ophys_experiment.events.head(10)
```

Column definitions:

events
: (np.array of float) event trace where events correspond to the rise time of a calcium transient in the dF/F trace, with a magnitude roughly proportional the magnitude of the increase in dF/F. Each value corresponds to one frame of the 2-photon movie.

filtered_events
: (np.array of float) Events array with a 1d causal half-gaussian filter to smooth it for visualization. Uses a halfnorm distribution as weights to the filter

lambdas
: (float64) regularization value selected to make the minimum event size be close to N * noise_std. Computed from Poisson distribution of events in the trace (can be thought of as a center of mass of the distribution, larger lambda == higher "firing rate")

noise_stds
: (float64) estimated noise standard deviation for the events trace


## Ophys timestamps

The timestamps are the same for `dff_traces` and `events`, measured in seconds

```{code-cell} ipython3
ophys_experiment.ophys_timestamps
```

Each frame of the 2-photon movie is assigned a timestamp, thus the length of `ophys_timestamps` should be equal to the length of `dff_traces` and `events`.

```{code-cell} ipython3
print('length of timestamps: '+ str(len(ophys_experiment.ophys_timestamps)))
print('length of dff_traces: '+ str(len(ophys_experiment.dff_traces.iloc[0]['dff'])))
print('length of events: '+ str(len(ophys_experiment.events.iloc[0]['events'])))
```

Plot `dff_traces` and `events` for one cell

```{code-cell} ipython3
# get list of cell_specimen_ids using the index of cell_specimen_table
cell_specimen_ids = ophys_experiment.cell_specimen_table.index.values
cell_specimen_id = cell_specimen_ids[5]
```

```{code-cell} ipython3
# plot dff and events traces overlaid from the cell selected above
fig, ax = plt.subplots(1,1, figsize = (10,2))
ax.plot(ophys_experiment.ophys_timestamps, ophys_experiment.dff_traces.loc[cell_specimen_id, 'dff'], label='dff')
ax.plot(ophys_experiment.ophys_timestamps, ophys_experiment.events.loc[cell_specimen_id, 'events'], label='events')
ax.set_xlabel('time (seconds)')
ax.set_ylabel('trace magnitude')
ax.set_title('cell_specimen_id = '+str(cell_specimen_id))
ax.legend()
```

We can see that as expected, events trace is much cleaner than dff and it generally follows big Ca transients really well. We can also see that this cell was not very active during our experiment. Each experiment has a 5 minute movie at the end, which often drives neural activity really well. We can see a notable increase in cell's activity at the end of this experiment.

## Stimulus presentations

The `stimulus_presentations` table contains one entry for each stimulus that was presented during the session, along with important metadata including stimulus `start_time` and `end_time`, as well as `image_name`, and whether the stimulus was an image change (`is_change` = True) or an image omission (`omitted` = True).

Get stimulus information for this experiment and assign it to a table called `stimulus_table`

```{code-cell} ipython3
stimulus_table = ophys_experiment.stimulus_presentations.copy()
stimulus_table.head(10)
```

How many stimuli were omitted?

```{code-cell} ipython3
print('This experiment had {} stimuli.'.format(len(stimulus_table)))
print('Out of all stimuli presented, {} were omitted.'.format(len(stimulus_table[stimulus_table['image_name']=='omitted'])))
```

dataframe columns:

stimulus_presentations_id [index]
: (int) identifier for a stimulus presentation (presentation of an image)

start_time
: (float) image presentation start time in seconds

end_time
: (float) image presentation end time in seconds

image_name
: *str* Indicates which natural scene image stimulus was shown for this stimulus presentation.

image_index
: (int) image index (0-7) for a given session, corresponding to each image name

is_change
: *bool* Indicates whether the image identity changed for this stimulus presentation

omitted
: (bool) True if no image was shown for this stimulus presentation

trials_id
: (int) Id to match to the table Index of the trials table.

flashes_since_change
: *float* Indicates how many flashes of the same image have occurred since the last stimulus change. NaN for blocks 1-4.

start_frame
: (int) image presentation start frame

end_frame
: (float) image presentation end frame

duration
: (float) duration of an image presentation (flash) in seconds (stop_time - start_time). NaN if omitted


## Stimulus templates

The `stimulus_templates` attribute is a dataframe containing one row per stimulus shown during the change detection task. The index is the `image_name`. The columns contain numpy arrays of the stimuli that were shown during the session.

The `unwarped` images represent the stimuli as they were seen by the mouse after correcting for distance from the mouse eye to the screen. The `warped` images show the exact image that was displayed on the stimulus monitor after spherical warping was applied to account for distance from the mouse's eye.

```{code-cell} ipython3
ophys_experiment.stimulus_templates
```

```{code-cell} ipython3
stimulus_templates = ophys_experiment.stimulus_templates.copy()
stimuli = stimulus_templates.index.values
plt.imshow(stimulus_templates.loc[stimuli[0]]['unwarped'], cmap='gray')
```

## Stimulus timestamps

All behavioral measurements (`running_speed`, `licks`, & `rewards`) are made at the frequency of visual stimulus display (60Hz) and share frame times with the `stimulus_presentations`. You can use the frame index from any of the other behavior tables to determine the corresponding timestamp.

```{code-cell} ipython3
ophys_experiment.stimulus_timestamps
```

## Lick times

The `licks` attribute is a dataframe with one entry for every detected lick onset time, assigned the time of the corresponding visual stimulus frame.

```{code-cell} ipython3
ophys_experiment.licks.sample(5)
```

## Rewards

The `rewards` attribute is a dataframe containing one entry for every reward that was delivered, assigned the time of the corresponding visual stimulus frame. `auto_rewarded` is True if the reward was delivered without requiring a preceding lick. The first 5 change trials of each session are `auto_rewarded` = True.

```{code-cell} ipython3
ophys_experiment.rewards.sample(5)
```

## Running speed

Mice are free to run on a circular disc during task performance. The `running_speed` table contains one entry for each read of the analog input line monitoring the encoder voltage, measured at 60 Hz. `running_speed` shares timestamps with the stimulus, provided in the `stimulus_timestamps` attribute.

```{code-cell} ipython3
ophys_experiment.running_speed.head()
```

Plot the mouse's `running_speed` for this experiment.

```{code-cell} ipython3
fig, ax = plt.subplots(1,1, figsize = (10,2))
ax.plot(ophys_experiment.stimulus_timestamps, ophys_experiment.running_speed['speed'], color='gray', linestyle='--')
ax.set_xlabel('time (seconds)')
ax.set_ylabel('running speed (cm/s)')
ax.set_title('ophys_experiment_id :'+str(ophys_experiment_id))
```

## Eye tracking

The `eye_tracking` table containing ellipse fit parameters for the eye, pupil and corneal reflection (cr). Fits are derived from tracking points from a DeepLabCut model applied to video frames of the mouse’s right eye (collected at 60hz). The `pupil_area` is the total area, in pixels, of the ellipse fit.

The corneal reflection (cr) fit can be used to estimate the axis of the camera. Taking the difference between the corneal reflection position and the pupil position can therefore disambiguate translations of the entire eye (in which case both the cr and pupil will shift together) from rotations of the eye (in which case the pupil position will move relative to the corneal reflection).

Examine the `eye_tracking` table

```{code-cell} ipython3
ophys_experiment.eye_tracking.head()
```

dataframe columns:

frame (index)
: (int) frame of eye tracking video.

timestamps
: (float) experiment timestamp for frame in seconds

cr_area
: (float) area of corneal reflection ellipse in pixels squared

eye_area
: (float) area of eye ellipse in pixels squared

pupil_area
: (float) area of pupil ellipse in pixels squared

likely_blink
: (bool) True if frame has outlier ellipse fits, which is often caused by blinking / squinting of the eye.

eye_area_raw
: (float) pupil area with no outliers/likely blinks removed.

eye_center_x
: (float) center of eye ellipse on x axis in pixels

eye_center_y
: (float) center of eye ellipse on y axis in pixels

eye_height
: (float) eye height (minor axis of the eye ellipse) in pixels

eye_width
: (float) eye width (major axis of the eye ellipse) in pixels

eye_phi
: (float) eye rotation angle in radians

pupil_area_raw
: (float) pupil area with no outliers/likely blinks removed.

pupil_center_x
: (float) center of pupil ellipse on x axis in pixels

pupil_center_y
: (float) center of pupil ellipse on y axis in pixels

pupil_height
: (float) pupil height (minor axis of the pupil ellipse) in pixels

pupil_width
: (float) pupil width (major axis of the pupil ellipse) in pixels

pupil_phi
: (float) pupil rotation angle in radians

cr_area_raw
: (float) corneal reflection area with no outliers/likely blinks removed.

cr_center_x
: (float) center of corneal reflection on x axis in pixels

cr_center_y
: (float) center of corneal reflection on y axis in pixels

cr_height
: (float) corneal reflection height (minor axis of the CR ellipse) in pixels

cr_width
: (float) corneal reflection width (major axis of the CR ellipse) in pixels

cr_phi
: (float) corneal reflection rotation angle in radians

Plot the pupil_area for this experiment.

```{code-cell} ipython3
fig, ax = plt.subplots(1,1, figsize = (20,5))
ax.plot(ophys_experiment.eye_tracking.timestamps, ophys_experiment.eye_tracking.pupil_area, color='gray')
ax.set_xlabel('time (seconds)')
ax.set_ylabel('pupil area (pixels^2)')
ax.set_title('ophys_experiment_id :'+str(ophys_experiment_id))
```

## Task parameters

The `task_parameters` attribute contains information about the struture of the behavior task for that specific session.

```{code-cell} ipython3
ophys_experiment.task_parameters
```

Here we can see that the `stimulus_duration_sec` is 0.25 seconds and the `blank_duration_sec` is 0.5 seconds. This determines the inter-stimulus interval.

dataframe columns:

auto_reward_volume
: (float) Volume of auto rewards in ml.

blank_duration_sec
: (list of floats) Duration in seconds of inter stimulus interval. Inter-stimulus interval chosen as a uniform random value between the range defined by the two values. Values are ignored if `stimulus_duration_sec` is null.

response_window_sec
: (list of floats) Range of period following an image change, in seconds, where mouse response influences trial outcome. First value represents response window start. Second value represents response window end. Values represent time before display lag is accounted for and applied.

n_stimulus_frames
: (int) Total number of visual stimulus frames presented during a behavior session.

task
: (string) Type of behavioral task ('change_detection' for this dataset)

session_type
: (string) Visual stimulus type run during behavior session.

omitted_flash_fraction
: (float) Probability that a stimulus image presentations is omitted. Change stimuli, and the stimulus immediately preceding the change, are never omitted.

stimulus_distribution
: (string) Distribution for drawing change times. Either 'exponential' or 'geometric'.

stimulus_duration_sec
: (float) Duration in seconds of each stimulus image presentation

reward_volume
: (float) Volume of earned water reward in ml.

stimulus
: (string) Stimulus type ('gratings' or 'images').


## Trials

While the `stimulus_presentations` table has one entry for each individual stimulus that was presented, the `trials` table contains one entry for each behavioral trial, which consists of a series of stimulus presentations and is defined by the `change_time`.

On a given trial, a `change_time` is selected from a geometric distribution between 4 and 12 flashes after the time of the last change or the last lick.

On `go` trials, the image identity will change at the selected `change_time`. If the mouse licks within the response window (see `response_window_sec` entry of the `task_parameters attribute), that is considered a hit and a reward will be delivered. If the mouse fails to lick after the change, the trial is considered a miss.

On `catch` trials, a `change_time` is drawn, but the image identity does not change. If the mouse licks within the reward window, this is a false alarm and no reward is delivered. Correctly witholding a lick is called a correct reject.

This definition of a `catch` trial is a conservative one, and only consideres the non-change stimulus presentations that are drawn from the same distribution as the change times. A less restrictive definition could consider every non-change stimulus presentation as a catch trial, and the false alarm rate can be computed this way as well.

If the mouse licks prior to the scheduled `change_time`, the trial is `aborted` and starts over again, using the same `change_time` for up to 5 trials in a row. This is to discourage mice from licking frequently, as they have to wait until the change time to get a reward.


```{code-cell} ipython3
# look at 5 random trials
ophys_experiment.trials.sample(5)
```

dataframe columns:

start_time
: (float) Experiment time when this trial began in seconds.

stop_time
: (float) Experiment time when this trial ended.

lick_times
: (float array) A list indicating when the behavioral control software recognized a lick. Note that this is not identical to the lick times from the licks dataframe, which record when the licks were registered by the lick sensor. The licks dataframe should generally be used for analysis of the licking behavior rather than these times.

reward_time
: (float) Indicates when the reward command was triggered for hit trials. NaN for other trial types.

reward_volume
: (float) Indicates the volume of water dispensed as reward for this trial.

is_change
: (bool) Indicates whether an image change occurred for this trial.

change_time
: (float) The time when the change in image identity occurs. This change time is used to determine the response window during which a lick will trigger a reward.

change_frame
: (int) Indicates the stimulus frame index when the change (on go trials) or sham change (on catch trials) occurred. This column can be used to link the trials table with the stimulus presentations table, as shown below.

go
: (bool) Indicates whether this trial was a 'go' trial. To qualify as a go trial, an image change must occur and the trial cannot be autorewarded.

catch
: (bool) Indicates whether this trial was a 'catch' trial. To qualify as a catch trial, a 'sham' change must occur during which the image identity does not change. These sham changes are drawn to match the timing distribution of real changes and can be used to calculate the false alarm rate.

hit
: (bool) Indicates whether this trial was a 'hit' trial. To qualify as a hit, the trial must be a go trial during which the stimulus changed and the mouse licked within the reward window (150-750 ms after the change time).

false_alarm
: (bool) Indicates whether this trial was a 'false alarm' trial. To qualify as a false alarm, the trial must be a catch trial during which a sham change occurred and the mouse licked during the reward window.

miss
: (bool) To qualify as a miss trial, the trial must be a go trial during which the stimulus changed but the mouse did not lick within the response window.

correct_reject
: (bool) To qualify as a correct reject trial, the trial must be a catch trial during which a sham change occurred and the mouse withheld licking.

aborted
: (bool) A trial is aborted when the mouse licks before the scheduled change or sham change.

auto_rewarded
: (bool) During autorewarded trials, the reward is automatically triggered after the change regardless of whether the mouse licked within the response window. These always come at the beginning of the session to help engage the mouse in behavior.

initial_image_name
: (float) Indicates which image was shown before the change (or sham change) for this trial

change_image_name
: (string) Indicates which image was scheduled to be the change image for this trial. Note that if the trial is aborted, a new trial will begin before this change occurs.

trial_length
: (float) Duration of the trial in seconds.

response_time
: (float) Indicates the time when the first lick was registered by the task control software for trials that were not aborted (go or catch). NaN for aborted trials. For a more accurate measure of response time, the licks dataframe should be used.



## Performance metrics

One useful method of the `ophys_experiment` object is the `get_performance_metrics` method, which returns some summary metrics on the session.

```{code-cell} ipython3
# get behavior performance metrics for one session
ophys_experiment.get_performance_metrics()
```

You can also access performing metrics computed on a rolling basis across trials using the `get_rolling_performance_df` method. The rolling performance metrics share timestamps with the `change_time`s of the `trials` table.

```{code-cell} ipython3
ophys_experiment.get_rolling_performance_df()
```

Plot the reward rate over time during the session.

```{code-cell} ipython3
performance_df = ophys_experiment.get_rolling_performance_df()
plt.plot(ophys_experiment.trials.change_time.values, performance_df.reward_rate.values)
```


# Plot example cell activity with stimuli and behavior

We can select a cell from the experiment and plot it's `dff_traces` and `events` traces along with other behavioral and stimulus data, including `running_speed`, `pupil_area`, as well as stimulus timing using the `stimulus_presentations` table.

Below we will put together plotting functions that utilize data from the `ophys_experiment` object to plot ophys traces and behavioral data from the experiment.

First, get stimulus information.

```{code-cell} ipython3
# create a list of all unique stimuli presented in this experiment
unique_stimuli = [stimulus for stimulus in ophys_experiment.stimulus_presentations['image_name'].unique()]

# create a colormap with each unique image having its own color
colormap = {image_name: sns.color_palette()[image_number] for image_number, image_name in enumerate(np.sort(unique_stimuli))}
colormap['omitted'] = (1,1,1) # set omitted stimulus to white color

# add the colors for each image to the stimulus presentations table in the dataset
stimulus_presentations = ophys_experiment.stimulus_presentations
stimulus_presentations['color'] = ophys_experiment.stimulus_presentations['image_name'].map(lambda image_name: colormap[image_name])
```

Here are some plotting functions for convenience.

```{code-cell} ipython3
# function to plot dff traces
def plot_dff_trace(ax, cell_specimen_id, initial_time, final_time):
    '''
        ax: axis on which to plot
        cell_specimen_id: id of the cell to plot
        intial_time: initial time to plot from
        final_time: final time to plot to
    '''
    #create a dataframe using dff trace from one seleted cell
    data = {'dff': ophys_experiment.dff_traces.loc[cell_specimen_id]['dff'],
        'timestamps': ophys_experiment.ophys_timestamps}
    df = pd.DataFrame(data)
    dff_trace_sample = df[(df.timestamps >= initial_time) & (df.timestamps <= final_time)]
    ax.plot(dff_trace_sample['timestamps'], dff_trace_sample['dff']/dff_trace_sample['dff'].max())

# function to plot events traces
def plot_events_trace(ax, cell_specimen_id, initial_time, final_time):
    # create a dataframe using events trace from one seleted cell
    data = {'events': ophys_experiment.events.loc[cell_specimen_id].events,
        'timestamps': ophys_experiment.ophys_timestamps}
    df = pd.DataFrame(data)
    events_trace_sample = df[(df.timestamps >= initial_time) & (df.timestamps <= final_time)]
    ax.plot(events_trace_sample['timestamps'], events_trace_sample['events']/events_trace_sample['events'].max())

# function to plot running speed
def plot_running(ax, initial_time, final_time):
    running_sample = ophys_experiment.running_speed.copy()
    running_sample = running_sample[(running_sample.timestamps >= initial_time) & (running_sample.timestamps <= final_time)]
    ax.plot(running_sample['timestamps'], running_sample['speed']/running_sample['speed'].max(),
            '--', color = 'gray', linewidth = 1)

# function to plot pupil diameter
def plot_pupil(ax, initial_time, final_time):
    pupil_sample = ophys_experiment.eye_tracking.copy()
    pupil_sample = pupil_sample[(pupil_sample.timestamps >= initial_time) &
                                (pupil_sample.timestamps <= final_time)]
    ax.plot(pupil_sample['timestamps'], pupil_sample['pupil_width']/pupil_sample['pupil_width'].max(),
            color = 'gray', linewidth = 1)

# function to plot licks
def plot_licks(ax, initial_time, final_time):
    licking_sample = ophys_experiment.licks.copy()
    licking_sample = licking_sample[(licking_sample.timestamps >= initial_time) &
                                    (licking_sample.timestamps <= final_time)]
    ax.plot(licking_sample['timestamps'], np.zeros_like(licking_sample['timestamps']),
            marker = 'o', markersize = 3, color = 'black', linestyle = 'none')

# function to plot rewards
def plot_rewards(ax, initial_time, final_time):
    rewards_sample = ophys_experiment.rewards.copy()
    rewards_sample = rewards_sample[(rewards_sample.timestamps >= initial_time) &
                                    (rewards_sample.timestamps <= final_time)]
    ax.plot(rewards_sample['timestamps'], np.zeros_like(rewards_sample['timestamps']),
            marker = 'd', color = 'blue', linestyle = 'none', markersize = 12, alpha = 0.5)

# function to plot stimuli
def plot_stimuli(ax, initial_time, final_time):
    stimulus_presentations_sample = stimulus_presentations.copy()
    stimulus_presentations_sample = stimulus_presentations_sample[(stimulus_presentations_sample.end_time >= initial_time) & (stimulus_presentations_sample.start_time <= final_time)]
    for idx, stimulus in stimulus_presentations_sample.iterrows():
        ax.axvspan(stimulus['start_time'], stimulus['end_time'], color=stimulus['color'], alpha=0.25)
```

## Create the plot for one cell

```{code-cell} ipython3

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

From looking at the activity of this neuron, we can see that it was very active during our experiment but its activity does not appear to be reliably locked to image presentations. It does seem to vaguely follow animal's running speed, thus it might be modulated by running.


## Create the same plot for a Vip cell from a different experiment

We can get a different, Vip experiment from `session_type` = `OPHYS_1` (equivalent to `session_number` = 1) and plot it to compare response traces. This gives us a similar plot from a different inhibitory neuron to compare their neural dynamics.

```{code-cell} ipython3
# Select a Vip experiment with familiar images (session_number = 1, 2, or 3)
selected_experiment_table = ophys_experiment_table[(ophys_experiment_table.cre_line=='Vip-IRES-Cre')&
                        (ophys_experiment_table.session_number==1)]

# load the experiment data from the cache
ophys_experiment = cache.get_behavior_ophys_experiment(selected_experiment_table.index.values[1])
# get the cell IDs
cell_specimen_ids = ophys_experiment.cell_specimen_table.index.values # a list of all cell ids
```

```{code-cell} ipython3
# create a list of all unique stimuli presented in this experiment
unique_stimuli = [stimulus for stimulus in ophys_experiment.stimulus_presentations['image_name'].unique()]

# create a colormap with each unique image having its own color
colormap = {image_name: sns.color_palette()[image_number] for image_number, image_name in enumerate(np.sort(unique_stimuli))}
colormap['omitted'] = (1,1,1)

# add the colors for each image to the stimulus presentations table in the dataset
ophys_experiment.stimulus_presentations['color'] = ophys_experiment.stimulus_presentations['image_name'].map(lambda image_name: colormap[image_name])
```

```{code-cell} ipython3
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
We can see that the dynamics of a Vip neuron are also not driven by the visual stimuli. Aligning neural activity to different behavioral or experimental events might reveal what this neuron is driven by.
