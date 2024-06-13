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

# Behavior Session Data

This notebook shows how to access all behavior session data for one mouse and aggregate data across sessions to look at training history.

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

```{code-cell} ipython3
# import the behavior ophys project cache class from SDK to be able to load the data
from allensdk.brain_observatory.behavior.behavior_project_cache import VisualBehaviorOphysProjectCache
```

## Load the cache and get the behavior sessions table

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
          
behavior_session_table = cache.get_behavior_session_table()   
```

### View a sample of the behavior session table
The `behavior_session_table` is a Pandas DataFrame with one row for every behavior session and informative metadata columns. 

The `behavior_session_table` includes sessions performed on a two-photon imaging rig (`session_type` starting with `OPHYS_`) and training sessions performed in the behavior facility (`session_type` starting with `TRAINING_`).


```{code-cell} ipython3
# view 10 randomly selected rows of the table using pandas sample command
behavior_session_table.sample(10)
```

## Select a mouse for analysis
We'll choose one mouse id from the full list of unique mouse IDs in the dataset

```{code-cell} ipython3
mouse_id = behavior_session_table['mouse_id'].unique()[76]
mouse_id
```

### Query the full behavior sessions table for all sessions that this mouse performed

This will return a subset of the full `behavior_session_table` in which the mouse_id matches our `mouse_id` variable (mouse 445002). The table should be returned in order of date of acquisition, but we'll use the Pandas command `sort_values(by = 'date_of_acquisition')` just to be sure.  

What we then see is a table that has metadata for every session performed by this mouse, in sequential order. The `equipment_name` column tells us where the session was run on that day and the `session_type` column tells us the name of the session type. See the technical white paper for a detailed description of the progression of stages.

```{code-cell} ipython3
this_mouse_table = behavior_session_table.query('mouse_id == @mouse_id').sort_values(by = 'date_of_acquisition')
# note that the following is functionally equivalent if you find the syntax easier to read: 
# this_mouse_table = behavior_session_table[behavior_session_table['mouse_id'] == mouse_id]
this_mouse_table
```

For this mouse, we can see that it progressed through a series of training stages starting on 3/15/2019 in behavior training boxes `BEH.B-Box3` and `BEH.B-Box1`.

On 4/1/2019, it reached the `TRAINING_5_images_A_handoff_ready`, which meant that it was ready for transition to an imaging rig as soon as space became available. 

On 4/4/2019, it was transitioned to ophys rig `CAM2P.3`, where it then underwent three days of habituation without imaging. This is evidenced by the fact that the session type for 4/4/2019, 4/5/2019, and 4/8/2019 was `OPHYS_0_images_A_habituation` and there was no associated `ophys_session_id`.

The first day of imaging for this mouse was on 4/9/2019, with `session_type = OPHYS_1_images_A`.

Note that this mouse has two `OPHYS_5_images_B_passive` sessions, the first taken in order (immediately after `OPHYS_4_images_B`), and second taken at the end of the sequence. The first `OPHYS_5_images_B_passive` does not have an `ophys_session_id` associated with it. This is likely due to that first session failing to meet quality control standards and being excluded from the dataset. The second `OPHYS_5_images_B_passive` was likely a retake, taken after the first was identified as having been failed.  

In general, ophys behavior sessions that do not have associated ophys_session_ids are sessions for which the ophys data has been removed do to failure to meet quality control standards.

+++ {"papermill": {"duration": 0.0155, "end_time": "2023-01-25T19:43:07.784703", "exception": false, "start_time": "2023-01-25T19:43:07.769203", "status": "completed"}}

## Aggregate data across all behavior sessions for this mouse

Here we will iterate over all sessions for this mouse, build a `behavior_session_dict` which will have one behavior session object for every session that this mouse performed, with the key being the `behavior_session_id`

Note that this could take many minutes to complete. For each session in our new table, `this_mouse_table`, we are loading the behavior session NWB file from AWS, opening it as a BehaviorSession object using the AllenSDK, and adding that object as an entry to the dictionary. 

If your cache directory is set to a location on your local computer, the NWB file for each session will be downloaded and added to the cache. This can take some time. If you were to re-run this cell a second time, it would access your cached NWB files instead of downloading them from AWS, allowing it to run substantially faster.  

It is important to note that we will only be loading the behavior data here, even for sessions that had corresponding 2-photon imaging data. The `get_behavior_ophys_experiment` method would be used to get behavior *and* ophys data for ophys sessions. See the <b>OphysSessionData</b> notebook for details.

When the below cell completes, all behavior sessions for this mouse will be held in memory in the `behavior_session_dict` dictionary.  


```{code-cell} ipython3
behavior_session_ids = this_mouse_table.index.values
behavior_session_dict = {}
for behavior_session_id in behavior_session_ids:
    behavior_session_dict[behavior_session_id] = cache.get_behavior_session(behavior_session_id)
```

## Examine attributes of one `BehaviorSession` 

Below we will give a brief overview of what data is available for each `BehaviorSession`

Let's look at some of the attributes of the last "handoff ready session"

We can filter the full table to get the last `TRAINING_5_images_A_handoff_ready` session. This would have been the last training session before the animal was subsequently handed off to the ophys team, after which all sessions were performed on a two-photon miroscope.

Each `session_type` is distinguished by what stimulus was shown and what stage of training or imaging the mouse was in. 

<b> To learn more about the details of each `session_type`, see the VISUAL BEHAVIOR TASK OVERVIEW. </b>

```{code-cell} ipython3
# get the last "TRAINING_5_" session_type
behavior_session_id = this_mouse_table.query('session_type == "TRAINING_5_images_A_handoff_ready"').index[-1]
# note that the following is functionally equivalent if you find the syntax easier to read: 
# behavior_session_id = this_mouse_table[this_mouse_table['session_type'] == "TRAINING_5_images_A_handoff_ready"].index[-1]

# get the BehaviorSession object for this behavior session from the dictionary we created earlier
behavior_session = behavior_session_dict[behavior_session_id]
```

```{code-cell} ipython3
# list all attributes of the BehaviorSession object
behavior_session.list_data_attributes_and_methods()
```

Note that any attribute can be followed by a `?` in a Jupyter Notebook to see the docstring. For example, running the cell below will make a frame appear at the bottom of your browser with the docstring for the `running_speed` attribute.

```{code-cell} ipython3
behavior_session = behavior_session_dict[behavior_session_id]
behavior_session.running_speed?
```

### Metadata

The `metadata` attribute is a dictionary containing information about the `BehaviorSession` being examined, including information about the mouse, like the `full_genotype` and information about the session, such as the `session_type`

```{code-cell} ipython3
behavior_session.metadata
```

### Task parameters

The `task_parameters` attribute contains information about the struture of the behavior task for that specific session. 

Here we can see that the `stimulus_duration_sec` is 0.25 seconds and the `blank_duration_sec` is 0.5 seconds. This determines the inter-stimulus interval. 

```{code-cell} ipython3
behavior_session_dict[behavior_session_id].task_parameters
```
  
### Stimulus presentations

The `stimulus_presentations` table contains one entry for each stimulus that was presented during the session, along with important metadata including stimulus `start_time`, `image_name`, and whether the stimulus was an image change (`is_change` = True) or an image omission (`omitted` = True).

```{code-cell} ipython3
behavior_session.stimulus_presentations.head(5)
```

### Trials

While the `stimulus_presentations` table has one entry for each individual stimulus that was presented, the `trials` table contains one entry for each behavioral trial, which consists of a series of stimulus presentations and is defined by the `change_time`. 

On a given trial, a `change_time` is selected from a geometric distribution between 4 and 12 flashes after the time of the last change or the last lick. 

On `go` trials, the image identity will change at the selected `change_time`. If the mouse licks within the response window (see `response_window_sec` entry of the `task_parameters attribute), that is considered a hit and a reward will be delivered. If the mouse fails to lick after the change, the trial is considered a miss.

On `catch` trials, a `change_time` is drawn, but the image identity does not change. If the mouse licks within the reward window, this is a false alarm and no reward is delivered. Correctly witholding a lick is called a correct reject. 

This definition of a `catch` trial is a conservative one, and only consideres the non-change stimulus presentations that are drawn from the same distribution as the change times. A less restrictive definition could consider every non-change stimulus presentation as a catch trial, and the false alarm rate can be computed this way as well.

If the mouse licks prior to the scheduled `change_time`, the trial is `aborted` and starts over again, using the same `change_time` for up to 5 trials in a row. This is to discourage mice from licking frequently, as they have to wait until the change time to get a reward.


```{code-cell} ipython3
# look at 5 random trials
behavior_session.trials.sample(5)
```

We can examine one trial in some detail. Let's randomly select a hit trial. 

Some things to note:
* The trial started at 831.2635398912244 seconds (`start_time`) relative to the start of the session.
* The stimulus changed from 'im063' (`intial_image_name`) to 'im069' (`change_image_name`) at t = 834.287206646593 seconds (`change_time`) relative to the start of the session.
* The animal's first lick (`lick_times[0]`) and `response_time` was at t = 834.69975263 seconds relative to the start of the session.
* The `response_latency`, which is `response_time` - `change_time`, was 0.41254598174464263 seconds.
* A reward (`reward_time`) was delivered at 834.6997526283376 seconds relative to the start of the session. This was coincident with the first lick.

```{code-cell} ipython3
behavior_session.trials.query('hit').sample(random_state=0).to_dict('records')
```

The `trials` table includes the times of licks and rewards during each trial, but this information is also available in separate tables, described below.

### Lick times

The `licks` attribute is a dataframe with one entry for every detected lick onset time, assigned the time of the corresponding visual stimulus frame.

```{code-cell} ipython3
behavior_session.licks.sample(5)
```
### Rewards

The `rewards` attribute is a dataframe containing one entry for every reward that was delivered, assigned the time of the corresponding visual stimulus frame. `auto_rewarded` is True if the reward was delivered without requiring a preceding lick. The first 5 change trials of each session are `auto_rewarded` = True.

```{code-cell} ipython3
behavior_session.rewards.sample(5)
```
### Running speed

Mice are free to run on a circular disc during task performance. The `running_speed` table contains one entry for each read of the analog input line monitoring the encoder voltage, polled at ~60 Hz.

```{code-cell} ipython3
behavior_session.running_speed.head()
```

### Stimulus templates

The `stimulus_templates` attribute is a dataframe containing one row per stimulus shown during the change detection task. The index is the `image_name`. The columns contain numpy arrays of the stimuli that were shown during the session. 

The `unwarped` images represent the stimuli as they were seen by the mouse after correcting for distance from the mouse eye to the screen. The `warped` images show the exact image that was displayed on the stimulus monitor after spherical warping was applied to account for distance from the mouse's eye.  

```{code-cell} ipython3
behavior_session.stimulus_templates
```

```{code-cell} ipython3
stimulus_templates = behavior_session.stimulus_templates.copy()
stimuli = stimulus_templates.index.values
plt.imshow(stimulus_templates.loc[stimuli[0]]['unwarped'], cmap='gray')
```

### Stimulus timestamps

Finally, a very important piece of information - the timestamps for each frame of visual stimulus display. 

All behavioral measurements (`running_speed`, `licks`, & `rewards`) are made at the frequency of visual stimulus display (60Hz) and share frame times with the `stimulus_presentations`. You can use the frame index from any of the other behavior tables to determine the corresponding timestamp. 

```{code-cell} ipython3
behavior_session.stimulus_timestamps
```

## Plot behavior data for a portion of one session

First, add a column to the stimulus_presentations table that assigns a unique color to every stimulus

```{code-cell} ipython3
unique_stimuli = [stimulus for stimulus in behavior_session.stimulus_presentations['image_name'].unique()]
colormap = {image_name: sns.color_palette()[image_number] for image_number, image_name in enumerate(np.sort(unique_stimuli))}
behavior_session._stimuli._presentations.value['color'] = behavior_session.stimulus_presentations['image_name'].map(lambda image_name: colormap[image_name])
```

Now make some simple plotting functions to plot these datastreams

```{code-cell} ipython3
def plot_running(ax, behavior_session, initial_time, final_time):
    '''
    a simple function to plot running speed between two specified times on a specified axis
    inputs:
        ax: axis on which to plot
        behavior_session: a behavior session object
        intial_time: initial time to plot from
        final_time: final time to plot to
    '''
    running_sample = behavior_session.running_speed.copy()
    running_sample = running_sample[(running_sample.timestamps >= initial_time) & 
                                    (running_sample.timestamps <= final_time)] 
    ax.plot(running_sample['timestamps'],
            running_sample['speed'])

def plot_licks(ax, behavior_session, initial_time, final_time):
    '''
    a simple function to plot licks as dots between two specified times on a specified axis
    inputs:
        ax: axis on which to plot
        behavior_session: a behavior session object
        intial_time: initial time to plot from
        final_time: final time to plot to
    '''
    licking_sample = behavior_session.licks.copy()
    licking_sample = licking_sample[(licking_sample.timestamps >= initial_time) & 
                                    (licking_sample.timestamps <= final_time)]     
    ax.plot(licking_sample['timestamps'], np.zeros_like(licking_sample['timestamps']),
            marker = 'o', color = 'black', linestyle = 'none')
    
def plot_rewards(ax, behavior_session, initial_time, final_time):
    '''
    a simple function to plot rewards between two specified times as blue diamonds on a specified axis
    inputs:
        ax: axis on which to plot
        behavior_session: a behavior session object
        intial_time: initial time to plot from
        final_time: final time to plot to
    '''
    rewards_sample = behavior_session.rewards.copy()
    rewards_sample = rewards_sample[(rewards_sample.timestamps >= initial_time) & 
                                    (rewards_sample.timestamps <= final_time)]      
    ax.plot(rewards_sample['timestamps'], np.zeros_like(rewards_sample['timestamps']),
            marker = 'd', color = 'blue', linestyle = 'none', markersize = 12, alpha = 0.5)
    
def plot_stimuli(ax, behavior_session, intial_time, final_time):
    '''
    a simple function to plot stimuli as colored vertical spans on a s
    inputs:
        ax: axis on which to plot
        behavior_session: a behavior session object
        intial_time: initial time to plot from
        final_time: final time to plot to
    '''
    stimulus_presentations_sample = behavior_session.stimulus_presentations.copy()
    stimulus_presentations_sample = stimulus_presentations_sample[(stimulus_presentations_sample.end_time >= initial_time) & 
                                    (stimulus_presentations_sample.start_time <= final_time)]     
    for idx, stimulus in stimulus_presentations_sample.iterrows():
        ax.axvspan(stimulus['start_time'], stimulus['end_time'], color=stimulus['color'], alpha=0.25)
```

Select a time period during the session and generate the plot

```{code-cell} ipython3
initial_time = 775 # initial time for plot, in seconds
final_time = 800 # final time for plot, in seconds

plt.clf()
fig, ax = plt.subplots(figsize = (15,5))
plot_running(ax, behavior_session, initial_time, final_time)
plot_licks(ax, behavior_session, initial_time, final_time)
plot_rewards(ax, behavior_session, initial_time, final_time)
plot_stimuli(ax, behavior_session, initial_time, final_time)

ax.legend(['running speed', 'licks', 'rewards'])

ax.set_ylabel('running speed (cm/s)')
ax.set_xlabel('time in session (s)')
ax.set_xlim(initial_time, final_time)
ax.set_title('a short section of the session');
```

Above, we can see that stimuli were being delivered at a regular cadence (250 ms on, 500 ms off). There were changes to new stimuli at t = 778.6 and t = 793.7, as indicated by the change in the color of the bars. The mouse licked inside of the required response window following both stimulus changes and received a reward coincident with the first lick following the change. The subsequent licks are likely a result of the mouse consuming the water reward. There was also a brief bout of two licks, likely representing impulsivity, at t = 786.9.

## Evalute behavior performance across all sessions for this mouse

One useful method of the `BehaviorSession` object is the `get_performance_metrics` method, which returns some summary metrics on the session.

```{code-cell} ipython3
# get behavior performance metrics for one session
behavior_session_dict[behavior_session_id].get_performance_metrics()
```

You can also access performing metrics computed on a rolling basis across trials using the `get_rolling_performance_df` method

```{code-cell} ipython3
behavior_session.get_rolling_performance_df()
```

### Aggregate performance metrics across sessions 

We can build out a new table that has all performance data for every session by iterating over the entries of our `behavior_session_dict`

This might take a minute or so. The AllenSDK will be extracting the performance data from the NWB file for every session individually.

```{code-cell} ipython3
# Let's use list comprehension to collect the metrics for each session
behavior_metrics_list = [behavior_session_dict[behavior_session_id].get_performance_metrics() for behavior_session_id in behavior_session_ids]

# Now turn it into a dataframe and set the index to be the behavior_session_id
behavior_performance_table = pd.DataFrame(behavior_metrics_list).set_index(behavior_session_ids)
```

```{code-cell} ipython3
behavior_performance_table.head()
```

We can merge this table with the metadata table we built for this mouse because they have the same index (`behavior_session_id`)

```{code-cell} ipython3
this_mouse_table = this_mouse_table.merge(
    behavior_performance_table,
    left_index = True,
    right_index = True)
    
this_mouse_table.head()
```

### Plot the `max_dprime` value for every session

We can see that this particular mouse performed relatively consistently for every session as it progressed through training.

```{code-cell} ipython3
fig, ax = plt.subplots(figsize = (15,5))

ax.plot(np.arange(len(this_mouse_table)), this_mouse_table['max_dprime'], marker = 'o')
ax.set_xticks(range(len(this_mouse_table)))
ax.set_xticklabels(list(this_mouse_table['session_type'].values),rotation = 30, ha='right')

# make alternating black/gray vspans for visual clarity
colors = ['black', 'gray']
for ii in range(len(this_mouse_table)):
    ax.axvspan(ii - 0.5, ii + 0.5, color = colors[ii%2], alpha=0.25)

ax.set_xlim(-0.5, len(this_mouse_table) - 0.5)
ax.set_ylabel('dprime')
ax.set_xlabel('session type')
ax.set_title("Max of rolling d' for every session for mouse {}".format(mouse_id))
fig.tight_layout()
```

Note that the days with near zero dprime near the right side of the plot are all `passive` sessions where the lick spout was retracted and no rewards could be earned. 

## Exercises
 
* Can you color the points of the behavior performance metrics plot by some piece of metadata (one of the columns) in `this_mouse_table`?
* How does the `max_dprime` metric compare with other metrics in the `rolling_performance_df`?
* What does the performance look like for a different mouse? 
* How many sessions are there for each `session_type`?
* Do all mice learn at a similar rate?
