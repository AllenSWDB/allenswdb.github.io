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

# Compare Trial Types

The following example shows how to access behavioral and neural data for a given recording session and create plots for different trial types

Make sure that you have the AllenSDK installed in your environment

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

## Load the cache and get data for one experiment

```{code-cell} ipython3

# Set the path to the dataset
cache_dir = '/root/capsule/data/'
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

### Look at a sample of the experiment table

```{code-cell} ipython3
ophys_experiment_table.sample(5)
```

### Here are all of the unique session types

```{code-cell} ipython3

np.sort(ophys_experiment_table['session_type'].unique())
```

### Select an `OPHYS_1_images_A` experiment, load the experiment data

```{code-cell} ipython3

experiment_id = ophys_experiment_table.query('session_type == "OPHYS_1_images_A"').sample(random_state=10).index[0]
print('getting experiment data for experiment_id {}'.format(experiment_id))
ophys_experiment = cache.get_behavior_ophys_experiment(experiment_id)
```

## Look at task performance data

We can see that the d-prime metric, a measure of discrimination performance, peaked at 2.14 during this session, indicating mid-range performance.  
(d' = 0 means no discrimination performance, d' is infinite for perfect performance, but is limited to about 4.5 this dataset due to trial count limitations). 

```{code-cell} ipython3
ophys_experiment.get_performance_metrics()
```

We can build a trial dataframe that tells us about behavior events on every trial. This can be merged with a rolling performance dataframe, which calculates behavioral performance metrics over a rolling window of 100 trials (excluding aborted trials, or trials where the animal licks prematurely). 

```{code-cell} ipython3
trials_df = ophys_experiment.trials.merge(
    ophys_experiment.get_rolling_performance_df().fillna(method='ffill'), # performance data is NaN on aborted trials. Fill forward to populate.
    left_index = True,
    right_index = True
)
```

```{code-cell} ipython3
trials_df.head()
```

### Now we can plot performance over the full experiment duration

```{code-cell} ipython3

fig, ax = plt.subplots(2, 1, figsize = (15,5), sharex=True)

ax[0].plot(trials_df['start_time']/60., trials_df['hit_rate'], color='darkgreen')

ax[0].plot(trials_df['start_time']/60., trials_df['false_alarm_rate'], color='darkred')

ax[0].legend(['rolling hit rate', 'rolling false alarm rate'])

ax[1].plot(trials_df['start_time']/60., trials_df['rolling_dprime'], color='black')

ax[1].set_xlabel('trial start time (minutes)')
ax[0].set_ylabel('response rate')
ax[0].set_title('hit and false alarm rates')
ax[1].set_title("d'")

fig.tight_layout()
```

Some key observations:
* The hit rate remains high for the first ~46 minutes of the session
* The false alarm rate graduall declines during the first ~25 minutes of the session.
* d' peaks when the hit rate is still high, but the false alarm rate dips
* The hit rate and d' fall off dramatically after ~46 minutes. This is likely due to the animal becoming sated and losing motivation to perform


## Plot neural data, behavior, and stimulus information for a trial

### Stimulus presentations 

Lets look at the dataframe of stimulus presentations. This tells us the attributes of every stimulus that was shown in the session

```{code-cell} ipython3
stimulus_presentations = ophys_experiment.stimulus_presentations
stimulus_presentations.head()
```

Note that there is an image name called 'omitted'. This represents the time that a stimulus would have been shown, had it not been omitted from the regular stimulus cadence. They are included here for ease of analysis, but it's important to note that they are not actually stimuli. They are the lack of expected stimuli.

```{code-cell} ipython3
stimulus_presentations.query('image_name == "omitted"').head()
```

### Running speed

One entry for each read of the analog input line monitoring the encoder voltage, polled at ~60 Hz.

```{code-cell} ipython3
ophys_experiment.running_speed.head()
```

### Licks

One entry for every detected lick onset time, assigned the time of the corresponding visual stimulus frame.

```{code-cell} ipython3
ophys_experiment.licks.head()
```

### Eye tracking data

One entry containing ellipse fit parameters for the eye, pupil and corneal reflection for every frame of the eye tracking video stream.

```{code-cell} ipython3
ophys_experiment.eye_tracking.head()
```

### Neural data as deltaF/F

One row per cell, with each containing an array of deltaF/F values.

```{code-cell} ipython3
ophys_experiment.dff_traces.head()
```

#### We can convert the dff_traces to long-form (aka "tidy") as follows:

```{code-cell} ipython3
def get_cell_timeseries_dict(dataset, cell_specimen_id):
    '''
    for a given cell_specimen ID, this function creates a dictionary with the following keys
    * timestamps: ophys timestamps
    * cell_roi_id
    * cell_specimen_id
    * dff
    This is useful for generating a tidy dataframe, which can enable easier plotting of timeseries data

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
    [pd.DataFrame(get_cell_timeseries_dict(ophys_experiment, cell_specimen_id)) for cell_specimen_id in ophys_experiment.dff_traces.reset_index()['cell_specimen_id']]).reset_index(drop=True)

ophys_experiment.tidy_dff_traces.sample(5)
```

## Plot all the data streams for different trial types

We can look at a few trial types in some detail

### Define plotting functions

First define functions to plot the different data streams:

    each stimulus as a colored vertical bar
    running speed
    licks/rewards
    pupil area
    neural responses (dF/F)

```{code-cell} ipython3

def add_image_colors(stimulus_presentations):
    '''
    Add a column to stimulus_presentations called 'color' with a unique color for each image in the session
    '''
    # gather image names but exclude image_name=='omitted'
    unique_stimuli = [stimulus for stimulus in stimulus_presentations['image_name'].unique() if stimulus != 'omitted']
    # assign a color for each unique stimulus
    colormap = {image_name: sns.color_palette()[image_number] for image_number, image_name in enumerate(np.sort(unique_stimuli))}
    colormap['omitted'] = [1, 1, 1] # assign white to omitted
    # add color column to stimulus presentations
    stimulus_presentations['color'] = stimulus_presentations['image_name'].map(lambda image_name: colormap[image_name])
    return stimulus_presentations


def plot_stimuli(trial, ax):
    '''
    plot stimuli as colored bars on specified axis
    '''
    stimuli = ophys_experiment.stimulus_presentations.copy()
    stimuli = add_image_colors(stimuli)
    stimuli = stimuli[(stimuli.end_time >= trial['start_time'].values[0]) & 
                      (stimuli.start_time <= trial['stop_time'].values[0])]
    for idx, stimulus in stimuli.iterrows():
        ax.axvspan(stimulus['start_time'], stimulus['end_time'], color=stimulus['color'], alpha=0.5)
    return ax

        
def plot_running(trial, ax):
    '''
    plot running speed for trial on specified axes
    '''
    trial_running_speed = ophys_experiment.running_speed.copy()
    trial_running_speed = trial_running_speed[(trial_running_speed.timestamps >= trial['start_time'].values[0]) & 
                                              (trial_running_speed.timestamps <= trial['stop_time'].values[0])]
    ax.plot(trial_running_speed['timestamps'], trial_running_speed['speed'], color='black')
    ax.set_title('running speed')
    ax.set_ylabel('speed (cm/s)')
    return ax


def plot_licks(trial, ax):
    '''
    plot licks as black dots on specified axis
    '''
    trial_licks = ophys_experiment.licks.copy()
    trial_licks = trial_licks[(trial_licks.timestamps >= trial['start_time'].values[0]) & 
                              (trial_licks.timestamps <= trial['stop_time'].values[0])]
    ax.plot(trial_licks['timestamps'], np.zeros_like(trial_licks['timestamps']),
            marker = 'o', linestyle = 'none', color='black')
    return ax
    

def plot_rewards(trial, ax):
    '''
    plot rewards as blue diamonds on specified axis
    '''
    trial_rewards = ophys_experiment.rewards.copy()
    trial_rewards = trial_rewards[(trial_rewards.timestamps >= trial['start_time'].values[0]) & 
                                  (trial_rewards.timestamps <= trial['stop_time'].values[0])]
    ax.plot(trial_rewards['timestamps'], np.zeros_like(trial_rewards['timestamps']),
            marker = 'd', linestyle = 'none', color='blue', markersize = 10, alpha = 0.25)
    return ax
    

def plot_pupil(trial, ax):
    '''
    plot pupil area on specified axis
    '''
    trial_eye_tracking = ophys_experiment.eye_tracking.copy()
    trial_eye_tracking = trial_eye_tracking[(trial_eye_tracking.timestamps >= trial['start_time'].values[0]) &
                                            (trial_eye_tracking.timestamps <= trial['stop_time'].values[0])]
    ax.plot(trial_eye_tracking['timestamps'], trial_eye_tracking['pupil_area'], color='black')
    ax.set_title('pupil area')
    ax.set_ylabel('pupil area\n')
    return ax
    

def plot_dff(trial, ax):
    '''
    plot each cell's dff response for a given trial
    '''
    # get the tidy dataframe of dff traces we created earlier
    trial_dff_traces = ophys_experiment.tidy_dff_traces.copy()
    # filter to get this trial
    trial_dff_traces = trial_dff_traces[(trial_dff_traces.timestamps >= trial['start_time'].values[0]) & 
                                        (trial_dff_traces.timestamps <= trial['stop_time'].values[0])]
    # plot each cell
    for cell_specimen_id in ophys_experiment.tidy_dff_traces['cell_specimen_id'].unique():
        ax.plot(trial_dff_traces[trial_dff_traces.cell_specimen_id == cell_specimen_id]['timestamps'],
                trial_dff_traces[trial_dff_traces.cell_specimen_id == cell_specimen_id]['dff'])
        ax.set_title('deltaF/F responses')
        ax.set_ylabel('dF/F')
    return ax
    

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

### Here is a hit trial

```{code-cell} ipython3
stimulus_presentations.columns
```

```{code-cell} ipython3
trials = ophys_experiment.trials.copy()
trial = trials[trials.hit==True].sample()
fig, axes = make_trial_plot(trial)
```

Notes:
* The image identity changed just after t = 2361 seconds (note the color change in the vertical spans)
* The animal was running steadily prior to the image change, then slowed to a stop after the change
* The first lick occured about 500 ms after the change, and triggered an immediate reward
* The pupil area shows some missing data - these were points that were filtered out as outliers.
* There appears to be one neuron that was responding regularly to the stimulus prior to the change.

### Here is a miss trial

```{code-cell} ipython3
trial = ophys_experiment.trials.query('miss').sample()
fig, axes = make_trial_plot(trial)
```

Notes:
* The image identity changed just after t = 824 seconds (note the color change in the vertical spans)
* The animal was running relatively steadily during the entire trial and did not slow after the stimulus identity change
* There were no licks or rewards on this trial
* The pupil area shows some missing data - these were points that were filtered out as outliers.
* One neuron had a large response just prior to the change, but none appear to be stimulus locked on this trial


### Here is a false alarm trial

```{code-cell} ipython3
trial = ophys_experiment.trials.query('false_alarm').sample()
fig, axes = make_trial_plot(trial)
```

Notes:
* The image identity was consistent during the entire trial
* The animal slowed and licked partway through the trial
* There were no rewards on this trial
* The pupil area shows some missing data - these were points that were filtered out as outliers.
* There were not any neurons with obvious stimulus locked responses

### And finally, a correct rejection

```{code-cell} ipython3
trial = ophys_experiment.trials.query('correct_reject').sample()
fig, axes = make_trial_plot(trial)
```

Notes:
* The image identity was consistent during the entire trial
* The animal did not slow or lick during this trial
* There were no rewards on this trial

