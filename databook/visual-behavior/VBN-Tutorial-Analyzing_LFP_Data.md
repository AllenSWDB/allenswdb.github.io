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

+++ {"papermill": {"duration": 0.010018, "end_time": "2023-03-22T22:32:02.491357", "exception": false, "start_time": "2023-03-22T22:32:02.481339", "status": "completed"}}

# LFP Analysis

## Tutorial overview

This Jupyter notebook will demonstrate how to access and analyze LFP data from the Neuropixels Visual Behavior dataset. LFP, which stands for "local field potential," contains information about low-frequency (0.1-500 Hz) voltage fluctations around each recording site. It's complementary to the spiking activity, and can be analyzed on its own or in conjunction with spikes.

This tutorial will cover the following topics:

* <a href='#Learning-about-the-available-probes'>Selecting probes to analyze</a>
* <a href='#Loading-LFP-data'>Loading LFP data</a>
* <a href='#Aligning-LFP-data-to-a-stimulus'>Aligning data in time</a>
* <a href='#Aligning-LFP-data-to-units'>Aligning data in space</a>
* <a href='#Current-Source-Density'>Exploring pre-computed CSD plots</a>

This tutorial assumes you've already created a data cache, or are working with the files on AWS. If you haven't reached that step yet, we recommend going through the [data access tutorial](https://allensdk.readthedocs.io/en/latest/visual_behavior_neuropixels.html) first.

Functions related to analyzing spike data will be covered in other tutorials. For a full list of available tutorials, see the [SDK documentation](https://allensdk.readthedocs.io/en/latest/visual_behavior_neuropixels.html).

+++ {"papermill": {"duration": 0.007912, "end_time": "2023-03-22T22:32:02.507665", "exception": false, "start_time": "2023-03-22T22:32:02.499753", "status": "completed"}}

## Learning about the available probes

+++ {"papermill": {"duration": 0.007836, "end_time": "2023-03-22T22:32:02.523421", "exception": false, "start_time": "2023-03-22T22:32:02.515585", "status": "completed"}}

First let's import the `VisualBehaviorNeuropixelsProjectCache` and a few other helpful packages:

```{code-cell} ipython3
---
papermill:
  duration: 5.250638
  end_time: '2023-03-22T22:32:07.781933'
  exception: false
  start_time: '2023-03-22T22:32:02.531295'
  status: completed
---
from allensdk.brain_observatory.behavior.behavior_project_cache.\
    behavior_neuropixels_project_cache \
    import VisualBehaviorNeuropixelsProjectCache

import numpy as np
import pandas as pd
from matplotlib import pyplot as plt
```

```{code-cell} ipython3
---
papermill:
  duration: 0.015625
  end_time: '2023-03-22T22:32:07.806376'
  exception: false
  start_time: '2023-03-22T22:32:07.790751'
  status: completed
tags: [parameters]
---
cache_dir = "/data/"
```

+++ {"papermill": {"duration": 0.008189, "end_time": "2023-03-22T22:32:07.846017", "exception": false, "start_time": "2023-03-22T22:32:07.837828", "status": "completed"}}

Now let's instantiate a cache from the Amazon S3 bucket. The `cache_dir` should be a path specifying where to download data on your local system:

```{code-cell} ipython3
---
papermill:
  duration: 7.645944
  end_time: '2023-03-22T22:32:15.500109'
  exception: false
  start_time: '2023-03-22T22:32:07.854165'
  status: completed
---
cache = VisualBehaviorNeuropixelsProjectCache.from_local_cache(
            cache_dir=cache_dir, use_static_cache=True)
```

+++ {"papermill": {"duration": 0.011096, "end_time": "2023-03-22T22:32:15.522974", "exception": false, "start_time": "2023-03-22T22:32:15.511878", "status": "completed"}}

**Finding LFP data of interest**

We can look at the cache probes table to identify which probe insertions have valid LFP data

```{code-cell} ipython3
---
papermill:
  duration: 0.019282
  end_time: '2023-03-22T22:32:15.553048'
  exception: false
  start_time: '2023-03-22T22:32:15.533766'
  status: completed
---
probes = cache.get_probe_table()
valid_lfp = probes[probes['has_lfp_data']]

print('Fraction of insertions with valid LFP: ', len(valid_lfp)/len(probes))
```

+++ {"papermill": {"duration": 0.010652, "end_time": "2023-03-22T22:32:15.574338", "exception": false, "start_time": "2023-03-22T22:32:15.563686", "status": "completed"}}

Now let's find a probe insertion with good LFP data that passed through VISp.

```{code-cell} ipython3
---
papermill:
  duration: 0.031093
  end_time: '2023-03-22T22:32:15.616058'
  exception: false
  start_time: '2023-03-22T22:32:15.584965'
  status: completed
---
valid_lfp[valid_lfp['structure_acronyms'].str.contains("'VISp',")].head()
```

+++ {"papermill": {"duration": 0.010983, "end_time": "2023-03-22T22:32:15.638222", "exception": false, "start_time": "2023-03-22T22:32:15.627239", "status": "completed"}}

Below we'll select an insertion from this table (1064735073) and grab the session data for it. We can get the session ID from the probes table:

```{code-cell} ipython3
---
papermill:
  duration: 139.76212
  end_time: '2023-03-22T22:34:35.411245'
  exception: false
  start_time: '2023-03-22T22:32:15.649125'
  status: completed
---
session_id = probes.loc[1064735073]['ecephys_session_id']
session = cache.get_ecephys_session(
            ecephys_session_id=session_id)
```

+++ {"papermill": {"duration": 0.058795, "end_time": "2023-03-22T22:34:35.714157", "exception": false, "start_time": "2023-03-22T22:34:35.655362", "status": "completed"}}

## Loading LFP data

+++ {"papermill": {"duration": 0.054056, "end_time": "2023-03-22T22:34:35.822896", "exception": false, "start_time": "2023-03-22T22:34:35.768840", "status": "completed"}}

Once we've gotten the session data, we can use `get_lfp` to grab the LFP data for our selected probe insertion. If you haven't tried to access this data previously, you'll have to wait while the LFP NWB file downloads. Even if you already have the data stored locally, it may still take a minute to load, since the LFP data is quite large (this example file is 4.5 GB).

Once the data is loaded, we can take a closer look at the lfp object:

```{code-cell} ipython3
---
papermill:
  duration: 198.885276
  end_time: '2023-03-22T22:37:54.764111'
  exception: false
  start_time: '2023-03-22T22:34:35.878835'
  status: completed
---
lfp = session.get_lfp(1064735073)
```

```{code-cell} ipython3
---
papermill:
  duration: 0.49547
  end_time: '2023-03-22T22:37:55.595638'
  exception: false
  start_time: '2023-03-22T22:37:55.100168'
  status: completed
---
lfp
```

+++ {"papermill": {"duration": 0.10825, "end_time": "2023-03-22T22:37:56.666632", "exception": false, "start_time": "2023-03-22T22:37:56.558382", "status": "completed"}}

The LFP data is stored as an [xarray.DataArray](http://xarray.pydata.org/en/stable/) object, with coordinates of `time` and `channel`. The xarray library simplifies the process of working with N-dimensional data arrays, by keeping track of the meaning of each axis. If this is your first time encountering xarrays, we strongly recommend reading through the [documentation](http://xarray.pydata.org/en/stable/quick-overview.html) before going further. Getting used to xarrays can be frustrating, especially when they don't behave like numpy arrays. But they are designed to prevent common mistakes when analyzing multidimensional arrays, so they are well worth learning more about. Plus, the syntax is modeled on that of the [pandas](https://pandas.pydata.org/) library, so if you're familiar with that you already have a head start.

The print-out above already tells us a lot about what the `lfp` object contains. It stores an array with around 12 million points along the `time` axis and 96 points along the `channel` axis. The `time` axis ranges from 5 to around 9600 seconds, while the `channel` axis ranges from 1066253838 to 1066254232 (these are the unique IDs for each channel).

Let's use the `DataArray.sel()` method to select a slice through this array between 100 and 101 seconds:

```{code-cell} ipython3
---
papermill:
  duration: 0.194966
  end_time: '2023-03-22T22:37:56.968932'
  exception: false
  start_time: '2023-03-22T22:37:56.773966'
  status: completed
---
lfp_slice = lfp.sel(time=slice(100,101))

lfp_slice
```

+++ {"papermill": {"duration": 0.108297, "end_time": "2023-03-22T22:37:57.190031", "exception": false, "start_time": "2023-03-22T22:37:57.081734", "status": "completed"}}

We see that this new DataArray is smaller than before; it contains the same number of channels, but only 1250 samples, due to the LFP sample rate of ~1250 Hz.

Let's plot the data for one of the channels:

```{code-cell} ipython3
---
papermill:
  duration: 4.752633
  end_time: '2023-03-22T22:38:02.051894'
  exception: false
  start_time: '2023-03-22T22:37:57.299261'
  status: completed
---
plt.figure(figsize=(10,2))
_ = plt.plot(lfp_slice.time, lfp_slice.sel(channel=lfp_slice.channel[10]))
plt.xlabel('Time (s)')
plt.ylabel('LFP (V)')
```

+++ {"papermill": {"duration": 0.109299, "end_time": "2023-03-22T22:38:02.277887", "exception": false, "start_time": "2023-03-22T22:38:02.168588", "status": "completed"}}

Alternatively, we can visualize this slice  of data using matplotlib's `imshow` method:

```{code-cell} ipython3
---
papermill:
  duration: 0.535802
  end_time: '2023-03-22T22:38:02.922084'
  exception: false
  start_time: '2023-03-22T22:38:02.386282'
  status: completed
---
plt.figure(figsize=(8,8))
im = plt.imshow(lfp_slice.T,aspect='auto',origin='lower',vmin=-1e-3, vmax=1e-3)
_ = plt.colorbar(im, fraction=0.036, pad=0.04)
_ = plt.xlabel('Sample number')
_ = plt.ylabel('Channel index')
```

+++ {"papermill": {"duration": 0.115092, "end_time": "2023-03-22T22:38:03.166725", "exception": false, "start_time": "2023-03-22T22:38:03.051633", "status": "completed"}}

Note that we've transposed the original array to place the time dimension along the x-axis. We've also configured the plot so that the origin of the array is in the lower-left, so that that channels closer to the probe tip are lower in the image.

A few things to note about this plot:

* The units of the LFP are volts, so the color scale ranges from -1 to +1 mV
* Even though there are 384 channels on the Neuropixels probe, there are only 96 channels in this plot. That's because only every 4th channel is included in the NWB file (resulting in 40 micron vertical spacing). In addition, the reference channels and channels far outside the brain have been removed.
* The top of the plot is relatively flat. This corresponds to channels that are outside the brain. The LFP channels are originally referenced to the tip reference site on the Neuropixels probe. Before NWB packaging, the LFP data is digitally referenced to the channels outside the brain.

+++ {"papermill": {"duration": 0.112905, "end_time": "2023-03-22T22:38:03.392776", "exception": false, "start_time": "2023-03-22T22:38:03.279871", "status": "completed"}}

## Aligning LFP data to a stimulus

+++ {"papermill": {"duration": 0.113684, "end_time": "2023-03-22T22:38:03.667009", "exception": false, "start_time": "2023-03-22T22:38:03.553325", "status": "completed"}}

In the above example, we selected LFP data based on an arbitrary time span (100 to 101 seconds). For many analyses, however, you'll want to align the data to the onset of a particular type of stimulus.

First, we need to select some stimulus presentations to use. Below, we'll use the full field flashes presented in stimulus block 4 of the Visual Behavior Neuropixels experiments. To learn more about the stimuli used in these experiments, check out the [documentation](http://portal.brain-map.org/explore/circuits/visual-behavior-neuropixels)

```{code-cell} ipython3
---
papermill:
  duration: 1.186313
  end_time: '2023-03-22T22:38:04.965702'
  exception: false
  start_time: '2023-03-22T22:38:03.779389'
  status: completed
---
stim_presentations = session.stimulus_presentations
flashes = stim_presentations[stim_presentations['stimulus_name'].str.contains('flash')]
presentation_times = flashes.start_time.values
presentation_ids = flashes.index.values
```

+++ {"papermill": {"duration": 0.112405, "end_time": "2023-03-22T22:38:05.193754", "exception": false, "start_time": "2023-03-22T22:38:05.081349", "status": "completed"}}

First, let's make a convenience function that helps us align the LFP to times of interest. Because we're using xarrays, the alignment operation is fast, and doesn't require any for loops! There's a lot going on here, so we recommend referring to the pandas and xarray documentation if anything is confusing:

```{code-cell} ipython3
---
papermill:
  duration: 0.127022
  end_time: '2023-03-22T22:38:05.433095'
  exception: false
  start_time: '2023-03-22T22:38:05.306073'
  status: completed
---
def align_lfp(lfp, trial_window, alignment_times, trial_ids = None):
    '''
    Aligns the LFP data array to experiment times of interest
    INPUTS:
        lfp: data array containing LFP data for one probe insertion
        trial_window: vector specifying the time points to excise around each alignment time
        alignment_times: experiment times around which to excise data
        trial_ids: indices in the session stim table specifying which stimuli to use for alignment.
                    None if aligning to non-stimulus times
    
    OUTPUT:
        aligned data array with dimensions channels x trials x time
    '''
    
    time_selection = np.concatenate([trial_window + t for t in alignment_times])
    
    if trial_ids is None:
        trial_ids = np.arange(len(alignment_times))
        
    inds = pd.MultiIndex.from_product((trial_ids, trial_window), 
                                      names=('presentation_id', 'time_from_presentation_onset'))

    ds = lfp.sel(time = time_selection, method='nearest').to_dataset(name = 'aligned_lfp')
    ds = ds.assign(time=inds).unstack('time')

    return ds['aligned_lfp']
```

```{code-cell} ipython3
---
papermill:
  duration: 0.47431
  end_time: '2023-03-22T22:38:06.024442'
  exception: false
  start_time: '2023-03-22T22:38:05.550132'
  status: completed
---
aligned_lfp = align_lfp(lfp, np.arange(-0.5, 0.5, 1/500), presentation_times, presentation_ids)
```

+++ {"papermill": {"duration": 0.112855, "end_time": "2023-03-22T22:38:06.252820", "exception": false, "start_time": "2023-03-22T22:38:06.139965", "status": "completed"}}

`aligned_lfp` is a DataArray with dimensions of channels x trials x time. It's been downsampled to 500 Hz by changing the time step in the `trial_window` argument of the `align_lfp` function.

Note that we can get the channels IDs for each channel in this DataArray. Let's use the session channels table to map these to the probe and mark the surface of the brain.

```{code-cell} ipython3
---
papermill:
  duration: 0.292972
  end_time: '2023-03-22T22:38:06.659027'
  exception: false
  start_time: '2023-03-22T22:38:06.366055'
  status: completed
---
chans = session.get_channels()
lfp_chan_depths = [chans.loc[c]['probe_vertical_position'] for c in lfp.channel.values]

chans_in_brain = chans[(chans['probe_id']==1064735073)&(~chans['structure_acronym'].str.contains('root'))]
first_channel_in_brain_position = chans_in_brain['probe_vertical_position'].max()
```

```{code-cell} ipython3
---
papermill:
  duration: 0.998369
  end_time: '2023-03-22T22:38:07.772438'
  exception: false
  start_time: '2023-03-22T22:38:06.774069'
  status: completed
---
fig, ax = plt.subplots()
fig.suptitle('Flash aligned mean LFP')
im = ax.pcolor(aligned_lfp.time_from_presentation_onset.values, lfp_chan_depths, aligned_lfp.mean(dim='presentation_id').data)
_ = plt.colorbar(im, fraction=0.036, pad=0.04)
_ = plt.xlabel('Time from flash onset (s)')
_ = plt.ylabel('Channel Position from Tip (um)')

ax.axvline(0, c='w', ls='dotted')
ax.axvline(0.25, c='w', ls='dotted')
ax.axhline(first_channel_in_brain_position, c='w')
ax.text(-0.4, first_channel_in_brain_position+50, 'brain surface', c='w')
```

+++ {"papermill": {"duration": 0.158095, "end_time": "2023-03-22T22:38:08.055603", "exception": false, "start_time": "2023-03-22T22:38:07.897508", "status": "completed"}}

Here we see the effect of a 250 ms flash stimulus on the LFP. There are two large responses in cortex (the first ~700 um below the brain surface), one corresponding to the stimulus onset (around 50 ms), and one corresponding to the stimulus offset (around sample 300 ms).

You can use the code sample above to align the LFP to any type of event (e.g. spike times, running onset, optogenetic stimuli) just by changing the `trial_window` and `time_selection` variables.

+++ {"papermill": {"duration": 0.116805, "end_time": "2023-03-22T22:38:08.287647", "exception": false, "start_time": "2023-03-22T22:38:08.170842", "status": "completed"}}

## Aligning LFP data to units

+++ {"papermill": {"duration": 0.115959, "end_time": "2023-03-22T22:38:08.520768", "exception": false, "start_time": "2023-03-22T22:38:08.404809", "status": "completed"}}

The previous section demonstrated how to align the LFP in time. What if we want to extract the LFP at a particular location in space, corresponding to the location of a unit we're analyzing?

Let's start by finding a well-isolated unit whose peak channel is included in our LFP data. 

Once we've selected a unit of interest, we can align the LFP data to its spike times:

```{code-cell} ipython3
---
papermill:
  duration: 0.387982
  end_time: '2023-03-22T22:38:09.025356'
  exception: false
  start_time: '2023-03-22T22:38:08.637374'
  status: completed
---
sess_units  = session.get_units()

#Grab units whose peak channels are in the LFP data, have relatively low isi violations and high amplitude spikes
units_on_lfp_chans = sess_units[(sess_units.peak_channel_id.isin(lfp.channel.values)) &
                                (sess_units.isi_violations < 0.5) &
                                (sess_units.amplitude > 200)]

#Merge this curated unit table with the channel table to get CCF locations for these units
units_on_lfp_chans = units_on_lfp_chans.merge(chans, left_on='peak_channel_id', right_index=True)

#Select a unit in V1
v1_units = units_on_lfp_chans[units_on_lfp_chans.structure_acronym.str.contains('VISp')]
unit_id = v1_units.index.values[5]

#Get the peak channel ID for this unit (the channel on which it had the greatest spike amplitude)
peak_chan_id = units_on_lfp_chans.loc[unit_id]['peak_channel_id']
peak_probe_position = units_on_lfp_chans.loc[unit_id]['probe_vertical_position']
```

+++ {"papermill": {"duration": 0.114116, "end_time": "2023-03-22T22:38:09.256322", "exception": false, "start_time": "2023-03-22T22:38:09.142206", "status": "completed"}}

Using `unit_id` and `peak_chan_id`, we can select the spikes and LFP within an arbitrary time interval. Note that we can use `method='nearest'` when selecting the LFP data channel if our peak channel isn't in the LFP DataArray. Here this is unnecessary since we've filtered for units with peak channels in the LFP data.

```{code-cell} ipython3
---
papermill:
  duration: 0.134512
  end_time: '2023-03-22T22:38:09.505122'
  exception: false
  start_time: '2023-03-22T22:38:09.370610'
  status: completed
---
start_time = 500
end_time = 510

spike_times = session.spike_times[unit_id]

times_in_range = spike_times[(spike_times > start_time) & (spike_times < end_time)]

lfp_data = lfp.sel(time = slice(start_time, end_time))
lfp_data = lfp_data.sel(channel = peak_chan_id, method='nearest')
```

+++ {"papermill": {"duration": 0.114509, "end_time": "2023-03-22T22:38:09.736223", "exception": false, "start_time": "2023-03-22T22:38:09.621714", "status": "completed"}}

Let's also find the stimulus presentations in this window

```{code-cell} ipython3
---
papermill:
  duration: 0.126575
  end_time: '2023-03-22T22:38:10.022019'
  exception: false
  start_time: '2023-03-22T22:38:09.895444'
  status: completed
---
stims_in_window = stim_presentations[(stim_presentations.start_time>start_time)&(stim_presentations.start_time<end_time) &
                                    (stim_presentations.omitted==False)]
stim_times_in_window = stims_in_window.start_time.values
```

+++ {"papermill": {"duration": 0.114439, "end_time": "2023-03-22T22:38:10.252840", "exception": false, "start_time": "2023-03-22T22:38:10.138401", "status": "completed"}}

Finally, we can plot the spike times and stim times along with the LFP for this interval:

```{code-cell} ipython3
---
papermill:
  duration: 0.303532
  end_time: '2023-03-22T22:38:10.687074'
  exception: false
  start_time: '2023-03-22T22:38:10.383542'
  status: completed
---
_ = plt.plot(lfp_data.time, lfp_data)
_ = plt.plot(times_in_range, np.ones(times_in_range.shape)*3e-4, '.r')
_ = plt.xlabel('Time (s)')
_ = plt.ylabel('LFP (V)')

_ = plt.plot(stim_times_in_window, np.ones(stim_times_in_window.size)*4e-4, 'vg')

plt.legend(['LFP', 'spikes', 'stim times'])
    
```

+++ {"papermill": {"duration": 0.114593, "end_time": "2023-03-22T22:38:10.920624", "exception": false, "start_time": "2023-03-22T22:38:10.806031", "status": "completed"}}

This plot shows clear troughs in the LFP associated with every stimulus presentation. We also see that the spiking for our selected unit is highly entrained to the stimulus presentations.

+++ {"papermill": {"duration": 0.114756, "end_time": "2023-03-22T22:38:11.150126", "exception": false, "start_time": "2023-03-22T22:38:11.035370", "status": "completed"}}

Now let's calculate a spike triggered average of the LFP using a subset of spikes for our unit of interest and the `align_lfp` function we defined above:

```{code-cell} ipython3
---
papermill:
  duration: 17.557204
  end_time: '2023-03-22T22:38:28.821906'
  exception: false
  start_time: '2023-03-22T22:38:11.264702'
  status: completed
---
rng = np.random.default_rng(seed=42) #set seed for deterministic results
spikes_to_use = rng.choice(spike_times, min((spike_times.size, 1000)), replace=False)
spike_triggered_lfp = align_lfp(lfp, np.arange(-0.1, 0.1, 1/1250), spikes_to_use)
```

+++ {"papermill": {"duration": 0.117114, "end_time": "2023-03-22T22:38:29.058274", "exception": false, "start_time": "2023-03-22T22:38:28.941160", "status": "completed"}}

Let's plot this spike-triggered LFP for a region of the probe centered on this unit's peak channel:

```{code-cell} ipython3
---
papermill:
  duration: 0.6528
  end_time: '2023-03-22T22:38:29.828610'
  exception: false
  start_time: '2023-03-22T22:38:29.175810'
  status: completed
---
fig, ax = plt.subplots()
im = ax.pcolor(spike_triggered_lfp.time_from_presentation_onset.values, lfp_chan_depths, 
               spike_triggered_lfp.mean(dim='presentation_id').data, shading='auto')

ax.plot(-0.01, peak_probe_position, '>w')
ax.text(-0.015, peak_probe_position, 'peak channel', c='w', va='center', ha='right')
ax.set_ylim([peak_probe_position-300, peak_probe_position+300])
ax.set_xlabel('Time from spike (s)')
ax.set_ylabel('Channel depth')
```

+++ {"papermill": {"duration": 0.120167, "end_time": "2023-03-22T22:38:30.112996", "exception": false, "start_time": "2023-03-22T22:38:29.992829", "status": "completed"}}

Aligning the LFP to spikes from our example unit reveals a low resolution spike waveform (note the thin dark stripe at the center of the plot). As an added exercise, you can compare this plot to the high resolution waveform for this unit stored in the session `mean_waveforms` dictionary. This plot also gives us some information about the network state that was conducive to spiking for this unit. Note the blue LFP depression in the middle of the plot, indicating that this unit tended to spike during periods of relative network excitability. How might this look for other cortical units? What if we limited our analysis to spikes during a particular stimulus or spontaneous activity?

+++ {"papermill": {"duration": 0.115949, "end_time": "2023-03-22T22:38:30.346087", "exception": false, "start_time": "2023-03-22T22:38:30.230138", "status": "completed"}}

## Current Source Density

+++ {"papermill": {"duration": 0.115577, "end_time": "2023-03-22T22:38:30.577045", "exception": false, "start_time": "2023-03-22T22:38:30.461468", "status": "completed"}}

LFP data is commonly used to generate current source density (CSD) plots, which show the location of current sources and sinks along the probe axis. CSD analysis benefits from high spatial resolution, since it involves taking the second spatial derivative of the data. Because of Neuropixels dense site spacing, these probes are optimal for computing the CSD. However, the LFP data available through the AllenSDK has been spatially downsampled prior to NWB packaging.

To provide access to a high-resolution CSD plot, we've pre-computed the CSD in response to a flash stimulus for all probes with LFP.

```{code-cell} ipython3
---
papermill:
  duration: 2.723947
  end_time: '2023-03-22T22:38:33.416871'
  exception: false
  start_time: '2023-03-22T22:38:30.692924'
  status: completed
---
csd = session.get_current_source_density(1064735073)
csd
```

+++ {"papermill": {"duration": 0.118603, "end_time": "2023-03-22T22:38:33.657444", "exception": false, "start_time": "2023-03-22T22:38:33.538841", "status": "completed"}}

The `CSD` object is a DataArray with dimensions of channels x time. Note that the channels are actually "virtual channels," based on interpolated signals along the central axis of the probe, with 10 micron inter-site spacing.

```{code-cell} ipython3
---
papermill:
  duration: 3.24724
  end_time: '2023-03-22T22:38:37.021909'
  exception: false
  start_time: '2023-03-22T22:38:33.774669'
  status: completed
---
from scipy.ndimage.filters import gaussian_filter

_ = plt.figure(figsize=(10,10))

filtered_csd = gaussian_filter(csd.data, sigma=(5,1))

fig, ax = plt.subplots(figsize=(6, 6))

_ = ax.pcolor(csd["time"], csd["vertical_position"], filtered_csd, vmin=-3e4, vmax=3e4)

_ = ax.set_xlabel("time relative to stimulus onset (s)")
_ = ax.set_ylabel("vertical position (um)")


chans_in_v1 = chans[(chans['probe_id']==1064735073)&(chans['structure_acronym'].str.contains('VISp'))]
last_cortex_channel_position = chans_in_v1['probe_vertical_position'].min()

ax.axhline(first_channel_in_brain_position, c='w')
ax.text(-0.075, first_channel_in_brain_position+50, 'brain surface', c='w')
ax.axhline(last_cortex_channel_position, c='w')
ax.text(-0.075, last_cortex_channel_position+50, 'end of cortex', c='w')
```

+++ {"papermill": {"duration": 0.118511, "end_time": "2023-03-22T22:38:37.274320", "exception": false, "start_time": "2023-03-22T22:38:37.155809", "status": "completed"}}

The CSV for this probe insertion reveals that visual activation is nicely confined to visual cortex (between the white lines). The trajectory for this probe likely missed other visually-responsive areas. Let's check to see which other areas were recorded:

```{code-cell} ipython3
---
papermill:
  duration: 0.178439
  end_time: '2023-03-22T22:38:37.571426'
  exception: false
  start_time: '2023-03-22T22:38:37.392987'
  status: completed
---
probes.loc[1064735073]['structure_acronyms']
```
