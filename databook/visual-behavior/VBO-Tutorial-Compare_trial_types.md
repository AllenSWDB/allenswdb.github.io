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

+++ {"papermill": {"duration": 0.013328, "end_time": "2023-07-31T21:05:59.767188", "exception": false, "start_time": "2023-07-31T21:05:59.753860", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

# Compare Trial Types

The following example shows how to access behavioral and neural data for a given recording session and create plots for different trial types 

+++ {"papermill": {"duration": 0.012264, "end_time": "2023-07-31T21:05:59.798051", "exception": false, "start_time": "2023-07-31T21:05:59.785787", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

Make sure that you have the AllenSDK installed in your environment

+++ {"papermill": {"duration": 0.013679, "end_time": "2023-07-31T21:06:08.866916", "exception": false, "start_time": "2023-07-31T21:06:08.853237", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

## Imports

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

## Load the cache and get the ophys experiments metadata table

```{code-cell} ipython3
---
papermill:
  duration: 0.025611
  end_time: '2023-07-31T21:06:16.105417'
  exception: false
  start_time: '2023-07-31T21:06:16.079806'
  status: completed
pycharm:
  name: '#%%

    '
tags: [parameters]
---
# Set the path to the dataset
cache_dir = '/root/capsule/data/visual-behavior-ophys/'
```

```{code-cell} ipython3
# If you are working with data in the cloud in Code Ocean, 
# or if you have already downloaded the full dataset to your local machine, 
# you can instantiate a local cache
# cache = VisualBehaviorOphysProjectCache.from_local_cache(cache_dir=cache_dir, use_static_cache=True)

# If you are working with the data locally for the first time, you need to instantiate the cache from S3:
cache = VisualBehaviorOphysProjectCache.from_local_cache(cache_dir=cache_dir, use_static_cache=True)
#cache = VisualBehaviorOphysProjectCache.from_s3_cache(cache_dir=cache_dir)
          
```

```{code-cell} ipython3
ophys_experiment_table = cache.get_ophys_experiment_table()                          
```

+++ {"papermill": {"duration": 0.017392, "end_time": "2023-07-31T21:06:18.737757", "exception": false, "start_time": "2023-07-31T21:06:18.720365", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

## Look at a sample of the experiment table

```{code-cell} ipython3
---
papermill:
  duration: 0.057639
  end_time: '2023-07-31T21:06:18.812615'
  exception: false
  start_time: '2023-07-31T21:06:18.754976'
  status: completed
pycharm:
  name: '#%%

    '
---
ophys_experiment_table.sample(5)
```

+++ {"papermill": {"duration": 0.016525, "end_time": "2023-07-31T21:06:18.846242", "exception": false, "start_time": "2023-07-31T21:06:18.829717", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

### here are all of the unique session types

```{code-cell} ipython3
---
papermill:
  duration: 0.026327
  end_time: '2023-07-31T21:06:18.888549'
  exception: false
  start_time: '2023-07-31T21:06:18.862222'
  status: completed
pycharm:
  name: '#%%

    '
---
np.sort(ophys_experiment_table['session_type'].unique())
```

+++ {"papermill": {"duration": 0.015473, "end_time": "2023-07-31T21:06:18.919312", "exception": false, "start_time": "2023-07-31T21:06:18.903839", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

### Select an `OPHYS_1_images_A` experiment at random, load the experiment data

```{code-cell} ipython3
---
papermill:
  duration: 84.191695
  end_time: '2023-07-31T21:07:43.126607'
  exception: false
  start_time: '2023-07-31T21:06:18.934912'
  status: completed
pycharm:
  name: '#%%

    '
---
experiment_id = ophys_experiment_table.query('session_type == "OPHYS_1_images_A"').sample(random_state=10).index[0]
print('getting experiment data for experiment_id {}'.format(experiment_id))
ophys_experiment = cache.get_behavior_ophys_experiment(experiment_id)
```

+++ {"papermill": {"duration": 0.053749, "end_time": "2023-07-31T21:07:43.238254", "exception": false, "start_time": "2023-07-31T21:07:43.184505", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

## Look at the performance data
We can see that the d-prime metric, a measure of discrimination performance, peaked at 2.14 during this session, indicating mid-range performance.  
(d' = 0 means no discrimination performance, d' is infinite for perfect performance, but is limited to about 4.5 this dataset due to trial count limitations). 

```{code-cell} ipython3
---
papermill:
  duration: 1.286621
  end_time: '2023-07-31T21:07:44.578059'
  exception: false
  start_time: '2023-07-31T21:07:43.291438'
  status: completed
pycharm:
  name: '#%%

    '
---
ophys_experiment.get_performance_metrics()
```

+++ {"papermill": {"duration": 0.053394, "end_time": "2023-07-31T21:07:44.734234", "exception": false, "start_time": "2023-07-31T21:07:44.680840", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

### We can build a trial dataframe that tells us about behavior events on every trial. This can be merged with a rolling performance dataframe, which calculates behavioral performance metrics over a rolling window of 100 trials (excluding aborted trials, or trials where the animal licks prematurely). 

```{code-cell} ipython3
---
papermill:
  duration: 0.68059
  end_time: '2023-07-31T21:07:45.467481'
  exception: false
  start_time: '2023-07-31T21:07:44.786891'
  status: completed
pycharm:
  name: '#%%

    '
---
trials_df = ophys_experiment.trials.merge(
    ophys_experiment.get_rolling_performance_df().fillna(method='ffill'), # performance data is NaN on aborted trials. Fill forward to populate.
    left_index = True,
    right_index = True
)
```

```{code-cell} ipython3
---
papermill:
  duration: 0.095819
  end_time: '2023-07-31T21:07:45.620435'
  exception: false
  start_time: '2023-07-31T21:07:45.524616'
  status: completed
pycharm:
  name: '#%%

    '
---
trials_df.head()
```

+++ {"papermill": {"duration": 0.05513, "end_time": "2023-07-31T21:07:45.731487", "exception": false, "start_time": "2023-07-31T21:07:45.676357", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

### Now we can plot performance over the full experiment duration
Some key observations:
* The hit rate remains high for the first ~46 minutes of the session
* The false alarm rate graduall declines during the first ~25 minutes of the session.
* d' peaks when the hit rate is still high, but the false alarm rate dips
* The hit rate and d' fall off dramatically after ~46 minutes. This is likely due to the animal becoming sated and losing motivation to perform

```{code-cell} ipython3
---
papermill:
  duration: 0.23332
  end_time: '2023-07-31T21:07:46.031638'
  exception: false
  start_time: '2023-07-31T21:07:45.798318'
  status: completed
pycharm:
  name: '#%%

    '
---
fig, ax = plt.subplots(2, 1, figsize = (15,5), sharex=True)
ax[0].plot(
    trials_df['start_time']/60.,
    trials_df['hit_rate'],
    color='darkgreen'
)

ax[0].plot(
    trials_df['start_time']/60.,
    trials_df['false_alarm_rate'],
    color='darkred'
)

ax[0].legend(['rolling hit rate', 'rolling false alarm rate'])

ax[1].plot(
    trials_df['start_time']/60.,
    trials_df['rolling_dprime'],
    color='black'
)

ax[1].set_xlabel('trial start time (minutes)')
ax[0].set_ylabel('response rate')
ax[0].set_title('hit and false alarm rates')
ax[1].set_title("d'")

fig.tight_layout()
```

+++ {"papermill": {"duration": 0.057171, "end_time": "2023-07-31T21:07:46.149310", "exception": false, "start_time": "2023-07-31T21:07:46.092139", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

## We can also look at a dataframe of stimulus presentations. This tells us the attributes of every stimulus that was shown in the session

```{code-cell} ipython3
---
papermill:
  duration: 0.08142
  end_time: '2023-07-31T21:07:46.288413'
  exception: false
  start_time: '2023-07-31T21:07:46.206993'
  status: completed
pycharm:
  name: '#%%

    '
---
stimulus_presentations = ophys_experiment.stimulus_presentations
stimulus_presentations.head()
```

+++ {"papermill": {"duration": 0.062729, "end_time": "2023-07-31T21:07:46.410244", "exception": false, "start_time": "2023-07-31T21:07:46.347515", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

#### Also note that there is an image name called 'omitted'. This represents the time that a stimulus would have been shown, had it not been omitted from the regular stimulus cadence. They are included here for ease of analysis, but it's important to note that they are not actually stimuli. They are the lack of expected stimuli.

```{code-cell} ipython3
---
papermill:
  duration: 0.085767
  end_time: '2023-07-31T21:07:46.553008'
  exception: false
  start_time: '2023-07-31T21:07:46.467241'
  status: completed
pycharm:
  name: '#%%

    '
---
stimulus_presentations.query('image_name == "omitted"').head()
```

+++ {"papermill": {"duration": 0.058607, "end_time": "2023-07-31T21:07:46.669110", "exception": false, "start_time": "2023-07-31T21:07:46.610503", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

#### For plotting purposes below, let's add a column that specifies a unique color for every unique image

```{code-cell} ipython3
---
papermill:
  duration: 0.068746
  end_time: '2023-07-31T21:07:46.794842'
  exception: false
  start_time: '2023-07-31T21:07:46.726096'
  status: completed
pycharm:
  name: '#%%

    '
---
unique_stimuli = [stimulus for stimulus in stimulus_presentations['image_name'].unique() if stimulus != 'omitted']
colormap = {image_name: sns.color_palette()[image_number] for image_number, image_name in enumerate(np.sort(unique_stimuli))}
colormap['omitted'] = np.nan # assign gray to omitted
colormap
```

```{code-cell} ipython3
---
papermill:
  duration: 0.068356
  end_time: '2023-07-31T21:07:46.920086'
  exception: false
  start_time: '2023-07-31T21:07:46.851730'
  status: completed
pycharm:
  name: '#%%

    '
---
stimulus_presentations['color'] = stimulus_presentations['image_name'].map(lambda image_name: colormap[image_name])
```

+++ {"papermill": {"duration": 0.054719, "end_time": "2023-07-31T21:07:47.031798", "exception": false, "start_time": "2023-07-31T21:07:46.977079", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

### There are also dataframes containing running speed, licks, eye tracking, and neural data:

+++ {"papermill": {"duration": 0.05723, "end_time": "2023-07-31T21:07:47.146480", "exception": false, "start_time": "2023-07-31T21:07:47.089250", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

#### running speed
One entry for each read of the analog input line monitoring the encoder voltage, polled at ~60 Hz.

```{code-cell} ipython3
---
papermill:
  duration: 0.069273
  end_time: '2023-07-31T21:07:47.272167'
  exception: false
  start_time: '2023-07-31T21:07:47.202894'
  status: completed
pycharm:
  name: '#%%

    '
---
ophys_experiment.running_speed.head()
```

+++ {"papermill": {"duration": 0.054902, "end_time": "2023-07-31T21:07:47.384091", "exception": false, "start_time": "2023-07-31T21:07:47.329189", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

#### licks
One entry for every detected lick onset time, assigned the time of the corresponding visual stimulus frame.

```{code-cell} ipython3
---
papermill:
  duration: 0.069708
  end_time: '2023-07-31T21:07:47.509158'
  exception: false
  start_time: '2023-07-31T21:07:47.439450'
  status: completed
pycharm:
  name: '#%%

    '
---
ophys_experiment.licks.head()
```

+++ {"papermill": {"duration": 0.05608, "end_time": "2023-07-31T21:07:47.622350", "exception": false, "start_time": "2023-07-31T21:07:47.566270", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

#### eye tracking data
One entry containing ellipse fit parameters for the eye, pupil and corneal reflection for every frame of the eye tracking video stream.

```{code-cell} ipython3
---
papermill:
  duration: 0.09091
  end_time: '2023-07-31T21:07:47.768018'
  exception: false
  start_time: '2023-07-31T21:07:47.677108'
  status: completed
pycharm:
  name: '#%%

    '
---
ophys_experiment.eye_tracking.head()
```

+++ {"papermill": {"duration": 0.059444, "end_time": "2023-07-31T21:07:47.887317", "exception": false, "start_time": "2023-07-31T21:07:47.827873", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

#### and deltaF/F values
One row per cell, with each containing an array of deltaF/F values.

```{code-cell} ipython3
---
papermill:
  duration: 0.080119
  end_time: '2023-07-31T21:07:48.025938'
  exception: false
  start_time: '2023-07-31T21:07:47.945819'
  status: completed
pycharm:
  name: '#%%

    '
---
ophys_experiment.dff_traces.head()
```

+++ {"papermill": {"duration": 0.056999, "end_time": "2023-07-31T21:07:48.143288", "exception": false, "start_time": "2023-07-31T21:07:48.086289", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

#### we can convert the dff_traces to long-form (aka "tidy") as follows:

```{code-cell} ipython3
---
papermill:
  duration: 197.783742
  end_time: '2023-07-31T21:11:05.985253'
  exception: false
  start_time: '2023-07-31T21:07:48.201511'
  status: completed
pycharm:
  name: '#%%

    '
---
def get_cell_timeseries_dict(dataset, cell_specimen_id):
    '''
    for a given cell_specimen ID, this function creates a dictionary with the following keys
    * timestamps: ophys timestamps
    * cell_roi_id
    * cell_specimen_id
    * dff
    This is useful for generating a tidy dataframe
    arguments:
        session object
        cell_specimen_id
    returns
        dict
    '''
    cell_dict = {
        'timestamps': dataset.ophys_timestamps,
        'cell_roi_id': [dataset.dff_traces.loc[cell_specimen_id]['cell_roi_id']] * len(dataset.ophys_timestamps),
        'cell_specimen_id': [cell_specimen_id] * len(dataset.ophys_timestamps),
        'dff': dataset.dff_traces.loc[cell_specimen_id]['dff'],

    }
    return cell_dict

ophys_experiment.tidy_dff_traces = pd.concat(
    [pd.DataFrame(get_cell_timeseries_dict(ophys_experiment, cell_specimen_id)) for cell_specimen_id in ophys_experiment.dff_traces.reset_index()['cell_specimen_id']]
).reset_index(drop=True)

ophys_experiment.tidy_dff_traces.sample(5)
```

+++ {"papermill": {"duration": 0.070654, "end_time": "2023-07-31T21:11:06.121027", "exception": false, "start_time": "2023-07-31T21:11:06.050373", "status": "completed"}}

We can look at a few trials in some detail
First define a function to plot a number of data streams

    each stimulus as a colored vertical bar
    running speed
    licks/rewards
    pupil area
    neural responses (dF/F)

```{code-cell} ipython3
---
papermill:
  duration: 0.142185
  end_time: '2023-07-31T21:11:06.327971'
  exception: false
  start_time: '2023-07-31T21:11:06.185786'
  status: completed
---
def plot_stimuli(trial, ax):
    '''
    plot stimuli as colored bars on specified axis
    '''
    stimuli = stimulus_presentations.query('end_time >= {} and start_time <= {} and not omitted'.format(float(trial['start_time']), float(trial['stop_time'])))
    for idx, stimulus in stimuli.iterrows():
        ax.axvspan(stimulus['start_time'], stimulus['end_time'], color=stimulus['color'], alpha=0.5)

        
def plot_running(trial, ax):
    '''
    plot running speed for trial on specified axes
    '''
    trial_running_speed = ophys_experiment.running_speed.query('timestamps >= {} and timestamps <= {} '.format(float(trial['start_time']), float(trial['stop_time'])))
    ax.plot(
        trial_running_speed['timestamps'],
        trial_running_speed['speed'],
        color='black'
    )
    ax.set_title('running speed')
    ax.set_ylabel('speed (cm/s)')
    

def plot_licks(trial, ax):
    '''
    plot licks as black dots on specified axis
    '''
    trial_licks = ophys_experiment.licks.query('timestamps >= {} and timestamps <= {} '.format(float(trial['start_time']), float(trial['stop_time'])))
    ax.plot(
        trial_licks['timestamps'],
        np.zeros_like(trial_licks['timestamps']),
        marker = 'o',
        linestyle = 'none',
        color='black'
    )
    

def plot_rewards(trial, ax):
    '''
    plot rewards as blue diamonds on specified axis
    '''
    trial_rewards = ophys_experiment.rewards.query('timestamps >= {} and timestamps <= {} '.format(float(trial['start_time']), float(trial['stop_time'])))
    ax.plot(
        trial_rewards['timestamps'],
        np.zeros_like(trial_rewards['timestamps']),
        marker = 'd',
        linestyle = 'none',
        color='blue',
        markersize = 10,
        alpha = 0.25
    )
    
def plot_pupil(trial, ax):
    '''
    plot pupil area on specified axis
    '''
    trial_eye_tracking = ophys_experiment.eye_tracking.query('timestamps >= {} and timestamps <= {} '.format(float(trial['start_time']), float(trial['stop_time'])))
    ax.plot(
        trial_eye_tracking['timestamps'],
        trial_eye_tracking['pupil_area'],
        color='black'
    )
    ax.set_title('pupil area')
    ax.set_ylabel('pupil area\n')
    

def plot_dff(trial, ax):
    '''
    plot each cell's dff response for a given trial
    '''
    trial_dff_traces = ophys_experiment.tidy_dff_traces.query('timestamps >= {} and timestamps <= {} '.format(float(trial['start_time']), float(trial['stop_time'])))
    for cell_specimen_id in ophys_experiment.tidy_dff_traces['cell_specimen_id'].unique():
        ax.plot(
            trial_dff_traces.query('cell_specimen_id == @cell_specimen_id')['timestamps'],
            trial_dff_traces.query('cell_specimen_id == @cell_specimen_id')['dff']
        )
        ax.set_title('deltaF/F responses')
        ax.set_ylabel('dF/F')
    
def make_trial_plot(trial):
    '''
    combine all plots for a given trial
    '''
    fig, axes = plt.subplots(4, 1, figsize = (15, 8), sharex=True)

    for ax in axes:
        plot_stimuli(trial, ax)
            
    plot_running(trial, axes[0])

    plot_licks(trial, axes[1])
    plot_rewards(trial, axes[1])
    
    axes[1].set_title('licks and rewards')
    axes[1].set_yticks([])
    axes[1].legend(['licks','rewards'])

    plot_pupil(trial, axes[2])

    plot_dff(trial, axes[3])
    
    axes[3].set_xlabel('time in session (seconds)')
    fig.tight_layout()
    return fig, axes
```

+++ {"papermill": {"duration": 0.059442, "end_time": "2023-07-31T21:11:06.445861", "exception": false, "start_time": "2023-07-31T21:11:06.386419", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

### here is a hit trial
Notes:
* The image identity changed just after t = 2361 seconds (note the color change in the vertical spans)
* The animal was running steadily prior to the image change, then slowed to a stop after the change
* The first lick occured about 500 ms after the change, and triggered an immediate reward
* The pupil area shows some missing data - these were points that were filtered out as outliers.
* There appears to be one neuron that was responding regularly to the stimulus prior to the change. 

```{code-cell} ipython3
---
papermill:
  duration: 0.084624
  end_time: '2023-07-31T21:11:06.595716'
  exception: false
  start_time: '2023-07-31T21:11:06.511092'
  status: completed
---
stimulus_presentations.columns
```

```{code-cell} ipython3
---
papermill:
  duration: 4.700154
  end_time: '2023-07-31T21:11:11.357915'
  exception: false
  start_time: '2023-07-31T21:11:06.657761'
  status: completed
pycharm:
  name: '#%%

    '
---
trial = ophys_experiment.trials.query('hit').sample(random_state = 1)
fig, axes = make_trial_plot(trial)
```

+++ {"papermill": {"duration": 0.057701, "end_time": "2023-07-31T21:11:11.484797", "exception": false, "start_time": "2023-07-31T21:11:11.427096", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

### here is a miss trial
Notes:
* The image identity changed just after t = 824 seconds (note the color change in the vertical spans)
* The animal was running relatively steadily during the entire trial and did not slow after the stimulus identity change
* There were no licks or rewards on this trial
* The pupil area shows some missing data - these were points that were filtered out as outliers.
* One neuron had a large response just prior to the change, but none appear to be stimulus locked on this trial

```{code-cell} ipython3
---
papermill:
  duration: 5.249059
  end_time: '2023-07-31T21:11:16.794633'
  exception: false
  start_time: '2023-07-31T21:11:11.545574'
  status: completed
pycharm:
  name: '#%%

    '
---
trial = ophys_experiment.trials.query('miss').sample(random_state = 2)
fig, axes = make_trial_plot(trial)
```

+++ {"papermill": {"duration": 0.062643, "end_time": "2023-07-31T21:11:16.924376", "exception": false, "start_time": "2023-07-31T21:11:16.861733", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

### here is a false alarm trial
Notes:
* The image identity was consistent during the entire trial
* The animal slowed and licked partway through the trial
* There were no rewards on this trial
* The pupil area shows some missing data - these were points that were filtered out as outliers.
* There were not any neurons with obvious stimulus locked responses

```{code-cell} ipython3
---
papermill:
  duration: 3.631282
  end_time: '2023-07-31T21:11:20.618015'
  exception: false
  start_time: '2023-07-31T21:11:16.986733'
  status: completed
pycharm:
  name: '#%%

    '
---
trial = ophys_experiment.trials.query('false_alarm').sample(random_state = 2)
fig, axes = make_trial_plot(trial)
```

+++ {"papermill": {"duration": 0.058441, "end_time": "2023-07-31T21:11:20.746546", "exception": false, "start_time": "2023-07-31T21:11:20.688105", "status": "completed"}, "pycharm": {"name": "#%% md\n"}}

### And finally, a correct rejection
Notes:
* The image identity was consistent during the entire trial
* The animal did not slow or lick during this trial
* There were no rewards on this trial

```{code-cell} ipython3
---
papermill:
  duration: 3.987074
  end_time: '2023-07-31T21:11:24.790118'
  exception: false
  start_time: '2023-07-31T21:11:20.803044'
  status: completed
pycharm:
  name: '#%%

    '
---
trial = ophys_experiment.trials.query('correct_reject').sample(random_state = 10)
fig, axes = make_trial_plot(trial)
```
