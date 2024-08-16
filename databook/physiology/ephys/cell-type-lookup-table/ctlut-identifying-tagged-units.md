---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.15.0
kernelspec:
  display_name: Python 3 (ipykernel)
  language: python
  name: ctlut
---

# Identifying tagged neurons

As described in the optotagging section, identifying cells in an electrophysiological recording relies on looking for responses that are precisely synced with the laser stimuli. This notebook will go over how to align responses of recorded units to the laser presentations, calculate some metrics to determine how responsive the unit is, and then perform the same over all units collected during a session in order to assign cell type labels.

## Import required packages
Since the data is packaged as nwb files, you'll need to import hdmf_zarr to interact with the data. The metadata for each experiment is stored as .json files, so you'll want to import json as well.

...and os is just nice for formatting file paths!

```{code-cell} ipython3
from hdmf_zarr import NWBZarrIO
import json
import os
import numpy as np
```

## Identifying tagged cells

Every experimental session may have a different set of neurons expressing light-sensitive opsins and thus able to be identified by their laser responses. In this data set, the identities of tagged neurons were pre-computed and added to the units table.

```{code-cell} ipython3
# an 'arbitrarily' selected session
session = '661398_2023-04-03_15-47-29'
session_directory = f'/data/SWDB 2024 CTLUT data/ecephys_{session}_nwb'

nwb_file = os.path.join(session_directory, f'ecephys_{session}_experiment1_recording1.nwb.zarr')
io = NWBZarrIO(nwb_file, "r")
nwbfile_read = io.read()
```

```{code-cell} ipython3
units = nwbfile_read.units[:]
np.unique(units.predicted_cell_type)
```

We can see that this session had tagged D1 and D2 cells, and every unit has a label attached marking it as one of these two types or as "untagged." But how did we arrive at these labels?

```{code-cell} ipython3
units.columns
```

Many of the columns in the units table are various metrics describing the laser responsiveness of the units to the two different colors of laser (red and blue). These metrics are:
* best_site: the NPopto emission site that elicited the largest response in the unit.
* mean_latency: the mean time from laser onset to the unit's response. The unit's response is computed as the time at which the unit's firing rate becomes two standard deviations higher than its baseline.
* mean_jitter: the standard deviation of the unit's mean response latency.
* mean_reliability: the proportion of trials during which the unit has spikes during the laser presentation period.
* num_sig_pulses_paired: the number of laser pulses (out of 5) that elicited a significant increase in spike rate, as computed using a paired test (Wilcoxon signed-rank test).
* channel_diff: the distance (in number of electrodes) between the best emission site and the peak electrode channel.

For this data set, units were considered to be tagged D1 or D2 units if they 1) had a significant response to all five laser pulses of the appropriate color\*, and 2) had a channel_diff of less than 25. Tagged neurons are expected to have very reliable, low-latency responses to laser pulses. In addition, we would expect the emission site that evokes the highest response to be close to the electrode closest to the neurons: if it isn't this makes us suspect the unit is a light artifact or contaminated!

For tagged cholinergic cells, an additional criterion of mean_latency less than 7 ms (0.007 s) was added. This is to avoid considering cells tagged if they were indirectly activated by other laser-activated neurons. Because D1 and D2 cells are GABAergic, this is less of a concern for them.

+++

*\*Note*: the laser pulses criterion is actually a little more complicated. For units tagged with a blue-responsive opsin (e.g. CoChR), we look for all five blue pulses eliciting significant responses and *no more* than one red pulse eliciting a significant response. For units tagged with a red-responsive opsin (e.g. Chrmine), we look for at least four red pulses eliciting significant responses. This is because red opsins often have strong activation even to short wavelengths, but blue opsins do not have responses to long wavelengths. Thus, we find true blue responses by specifying they can not also have a red response. Additionally, opsins like Chrmine have slower response dynamics, and often don't respond to the first pulse, but have reliable responses to the rest, so we relax that criterion.

+++

How do we know which cell type is tagged with which opsin? By looking at the metadata! The identity of any laser-responsive units can be inferred from the mouse's genotype and viruses injected, both of which can be found in the metadata. A list of the mouse lines used in this data set and what they tag can be found in the optotagging section.

```{code-cell} ipython3
# subject.json contains info about the mouse, procedures.json contains info about surgeries and such that were performed
subject_json = os.path.join(session_directory, 'subject.json')
procedures_json = os.path.join(session_directory, 'procedures.json')

# load both json files
with open(subject_json, 'r', ) as f:
    subject = json.load(f)
with open(procedures_json, 'r', ) as f:
    procedures = json.load(f)

print(subject['genotype'])

virus_names = []
try:
    for material in procedures['injections'][0]['injection_materials']:
        virus_names.append(material['name'])
except(KeyError):
    for material in procedures['subject_procedures'][2]['injection_materials']: # the procedures scraped from NSB are formatted differently
        virus_names.append(material['name'])

print(virus_names)
```

So this animal was Adora2a-Cre (meaning it expresses Cre in D2 cells) and it was injected with two viruses: an enhancer delivering CoChR to D1 cells, and a Cre-dependent virus delivering ChRmine. From this, we can conclude that this mouse should express CoChR in D1 cells and ChRmine in D2 cells. Therefore, any cells responding to (only) blue laser pulses are D1 cells, and cells responding to red laser pulses are D2 cells!

With this information, you can take a look at the other laser response metrics and try other criteria for assigning cell identities, if you don't trust the ones in the units table!

+++

## Visualizing cell responses

If you really, *really* don't trust the cell identities in the units table, you can directly analyze their responses to laser presentation!

How do we tell if a cell is laser-responsive? We should take a look at the spiking activity during laser presentations. To do this, let's align the spike timestamps to the laser trial timestamps.

```{code-cell} ipython3
units = nwbfile_read.units[:]
```

```{code-cell} ipython3
# load spike timestamp data for an 'arbitrarily' selected unit
unit_id = 259
spike_timestamps = units.spike_times.loc[unit_id]
```

```{code-cell} ipython3
# load the stimulus table
stimulus_table = nwbfile_read.intervals['trials'].to_dataframe()
stimulus_table.columns
```

```{code-cell} ipython3
# select the highest power trials where the light emission was on the same probe the unit is on
unit_device = units.device_name.loc[unit_id]
max_laser_power = max(stimulus_table['power']) # be careful with this in the future, different color lasers are sometimes presented at different powers!

filtered_stimulus_table = stimulus_table.query('emission_location == @unit_device and power == @max_laser_power')
filtered_stimulus_table
```

There's both red and blue laser pulses in this stimulus table. Let's try plotting the unit responses to both to see if either evokes a response. To do this, we'll create a "raster plot": a plot showing the spike times for each trial aligned to an event, in this case the laser onset. As such, we will need to convert the absolute spike times over the course of the whole experiment to relative spike times (relative to laser onset). We can do this with numpy's searchsorted function.

```{code-cell} ipython3
time_range = np.array([-0.1, 0.3]) # time range (in seconds) to plot around each laser onset event

blue_laser_stim_table = filtered_stimulus_table.query('type == "internal_blue"')
red_laser_stim_table = filtered_stimulus_table.query('type == "internal_red"')
blue_laser_onset_timestamps = blue_laser_stim_table.start_time.tolist()
red_laser_onset_timestamps = red_laser_stim_table.start_time.tolist()
```

```{code-cell} ipython3
# let's make a function that can convert absolute timestamps to relative timestamps, as this will come in handy a lot!

def event_locked_timestamps(spike_timestamps, event_timestamps, time_range):
    """
    Converts spike timestamps over course of entire session to time stamps relative to an event.

    :param spike_timestamps: 1d array of floats, times a spike occurred over course of session
    :param event_timestamps: 1d array of floats, times an event occurred over course of session
    :param time_range: time range relative to event onset over which to collect spike times for each trial
    :return: event_locked_spike_times: list of arrays (1 per trial), array contains spike times relative to event onset
    for that trial
    """
    Ntrials = len(event_timestamps)

    event_locked_spike_times = []
    for ind_trial in np.arange(Ntrials):
        time_range_this_trial = event_timestamps[ind_trial] + time_range
        spike_inds_this_trial = np.searchsorted(spike_timestamps, time_range_this_trial)
        spike_times_this_trial = spike_timestamps[spike_inds_this_trial[0]:spike_inds_this_trial[1]]
        event_locked_spike_times.append(spike_times_this_trial - event_timestamps[ind_trial])

    return np.array(event_locked_spike_times, dtype=object)

# another useful function to convert timestamps to counts per bin
def timestamps_to_spike_counts(spike_timestamps, bins):
    """
    Converts timestamps at which spikes occurred to spike counts per time bin.
    :param spike_timestamps: should be a list of lists (one list per trial)
    :param bins: time ranges over which to calculate number of spikes
    :return: spike_counts: numpy array, dimensions num trials x len(bins)-1, number of spikes that happened in each time
    bin for each trial
    """
    Ntrials = len(spike_timestamps)
    spike_counts = np.empty((Ntrials, len(bins) - 1))
    for trial in range(Ntrials):
        this_spike_counts, bin_edges = np.histogram(spike_timestamps[trial], bins)
        spike_counts[trial, :] = this_spike_counts

    return spike_counts
```

```{code-cell} ipython3
blue_laser_locked_spike_timestamps = event_locked_timestamps(spike_timestamps, blue_laser_onset_timestamps, time_range)
red_laser_locked_spike_timestamps = event_locked_timestamps(spike_timestamps, red_laser_onset_timestamps, time_range)
```

```{code-cell} ipython3
# make a raster plot of all trials!
import matplotlib.pyplot as plt
%matplotlib inline

plt.subplot(1,2,1)
Ntrials = len(blue_laser_locked_spike_timestamps)
for trial in range(Ntrials):
    this_raster = plt.plot(blue_laser_locked_spike_timestamps[trial], (trial + 1) * np.ones(len(blue_laser_locked_spike_timestamps[trial])), '.', color='k', rasterized=True, ms=3)
plt.ylabel('Trial')
plt.xlabel('Time from laser onset (s)')
plt.xlim(time_range)
plt.title('Blue stim')
plt.axvline(0, color='0.75')

plt.subplot(1,2,2)
Ntrials = len(red_laser_locked_spike_timestamps)
for trial in range(Ntrials):
    this_raster = plt.plot(red_laser_locked_spike_timestamps[trial], (trial + 1) * np.ones(len(red_laser_locked_spike_timestamps[trial])), '.', color='k', rasterized=True, ms=3)
plt.xlabel('Time from laser onset (s)')
plt.xlim(time_range)
plt.title('Red stim')
plt.axvline(0, color='0.75')
```

Looks like there might be a weak response to blue laser... but wait! The NPopto has 14 emission sites, and the trials from all of these are interleaved! Let's try grouping trials by emission site and see if we see anything.

```{code-cell} ipython3
emission_sites_blue = np.array(blue_laser_stim_table.site.tolist())
emission_sites_red = np.array(red_laser_stim_table.site.tolist())
```

```{code-cell} ipython3
emission_sites = [emission_sites_blue, emission_sites_red]
locked_timestamps = [blue_laser_locked_spike_timestamps, red_laser_locked_spike_timestamps]
titles = ['Blue stim', 'Red stim']
for ind, emission_site in enumerate(emission_sites):
    plt.subplot(1,2,ind+1)
    for site in np.unique(emission_site):
        trials_this_site = emission_site == site
        this_laser_locked_timestamps = locked_timestamps[ind][trials_this_site]
        Ntrials = len(this_laser_locked_timestamps)
        for trial in range(Ntrials):
            this_raster = plt.plot(this_laser_locked_timestamps[trial], site * (trial + 1) * np.ones(len(this_laser_locked_timestamps[trial])), '.', color='k', rasterized=True, ms=3)
    
    # set the y labels to be the different emission sites
    ax = plt.gca()
    y_ticks = 50*np.unique(emission_site)-25 #so each tick is in the middle of the 50 trial range
    ax.set_yticks(y_ticks)
    ax.set_yticklabels(np.unique(emission_site))

    if not ind:
        plt.ylabel('Emission site')
    plt.xlabel('Time from laser onset (s)')
    plt.xlim(time_range)
    plt.title(titles[ind])
    plt.axvline(0, color='0.75')
```

Definitely a strong response when blue laser is presented at emission site 1! But how do we quantify it? An obvious answer is to see if the increase in firing rate is statistically significant. Since the laser presentation has five pulses, we can also check how consistent the response is by testing if every pulse has a significant response.

There are 14 emission sites. How do we know which one to select for testing? We could test all 14, then correct for multiple comparisons. Alternatively, we could determine which one elicits the largest increase in firing rate, or the lowest latency response.

```{code-cell} ipython3
# applying the strategy of testing every emission site
from scipy import stats
from statsmodels.stats.multitest import multipletests

pulse_duration = np.unique(blue_laser_stim_table.duration)[0]
first_pulse_time_range = [0, pulse_duration]
baseline_time_range = [-pulse_duration, 0]

first_pulse_counts = timestamps_to_spike_counts(blue_laser_locked_spike_timestamps, first_pulse_time_range)
baseline_counts = timestamps_to_spike_counts(blue_laser_locked_spike_timestamps, baseline_time_range)

all_site_pvals = []
for site in np.unique(emission_site):
    trials_this_site = emission_sites_blue == site
    this_site_pulse_counts = first_pulse_counts[trials_this_site]
    this_site_baseline_counts = baseline_counts[trials_this_site]

    # paired test
    try:
        statistic, pVal = stats.wilcoxon(this_site_pulse_counts.flatten(),
                                this_site_baseline_counts.flatten(),
                                alternative='greater')
    except(ValueError):  # wilcoxon test doesn't like it when there's no difference between passed values
        statistic = 0
        pVal = 1

    all_site_pvals.append(pVal)

# corrected pvals
(responsive_sites, corrected_pVals, alphaSidak, alphaBonf) = multipletests(all_site_pvals, method='holm')

print(responsive_sites)

#print(first_pulse_counts)
#print(baseline_counts)
```

Looks like site 1 has a significant response, even after correcting for the 14 comparisons done!

```{code-cell} ipython3
# see how many pulses the unit responds to
num_pulses = np.unique(blue_laser_stim_table.num_pulses)[0]
inter_pulse_interval = np.unique(blue_laser_stim_table.inter_pulse_interval)[0]
pulse_offset = (pulse_duration + inter_pulse_interval)

trials_best_site = emission_sites_blue == 1
baseline_counts_best_site = baseline_counts[trials_best_site]

other_pulse_pvals = []

for ind_pulse in range(1,num_pulses):
    this_pulse_time_range = [first_pulse_time_range[0]+ind_pulse*pulse_offset, first_pulse_time_range[1]+ind_pulse*pulse_offset]
    this_pulse_counts = timestamps_to_spike_counts(blue_laser_locked_spike_timestamps, this_pulse_time_range)
    this_pulse_best_site_counts = this_pulse_counts[trials_best_site]

    # paired test
    try:
        statistic, pVal = stats.wilcoxon(this_pulse_best_site_counts.flatten(),
                                baseline_counts_best_site.flatten(),
                                alternative='greater')
    except(ValueError):  # wilcoxon test doesn't like it when there's no difference between passed values
        statistic = 0
        pVal = 1

    other_pulse_pvals.append(pVal)
```

```{code-cell} ipython3
(responsive_pulses, corrected_pVals, alphaSidak, alphaBonf) = multipletests(other_pulse_pvals, method='holm')
responsive_pulses
```

This unit has a significant response to all five blue laser pulses! That means this unit is likely a tagged D1 cell. (Though it would be good to check the responses to red laser as well: this mouse has D2 cells tagged with ChRmine, which has a broad activation spectrum and often responds to both blue and red laser, while CoChR responds to only blue. While we looked at the raster of the red response, you should double check for significant responses!).

There are often other tests applied to determine if a unit is tagged or not, most notably to check the latency of the response to make sure you're not getting indirect inactivation via synaptic transmission, but this is less of a concern here since medium spiny neurons in striatum are GABAergic.

You can now apply these tests to every unit in this session to determine which units are tagged and learn their identities!

```{code-cell} ipython3

```
