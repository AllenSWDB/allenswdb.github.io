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
  name: python3
---

# Using Python to Access Neurodata Without Borders-type Files

This tutorial will demonstrate the structure of the data file in a Neurodata Without Borders type (NWB) file and showcase how to access various parts of the data. We will use a specific example using an ecephys file, but the process is general.

We begin with package imports which we'll need. `hdmf_zarr` handles the ZArray objects that appear in NWB files, while `nwbwidgets` will provide us with a useful tool down the line.

```{code-cell} ipython3
from hdmf_zarr import NWBZarrIO
from nwbwidgets import nwb2widget

%matplotlib inline
```

In order to do any analysis, of course, we'll also need the usual libraries:

```{code-cell} ipython3
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
```

## Accessing an NWB file

To manipulate the data in the file, we will first need to find the file we're interested in and then load it into Python. We assume here that we have already received the datafile somehow and we know what directory we've stored the file in, so we will simply path directly to the file (which is of file type .nwb.zarr).

```{code-cell} ipython3
mouse_id = '655565'

nwb_file = '/data/SWDB 2024 CTLUT data/ecephys_655565_2023-03-31_14-47-36_nwb/ecephys_655565_2023-03-31_14-47-36_experiment1_recording1.nwb.zarr'
```

So far, all we've done is find the path and store it as a string in Python. Now that we have the NWB file's path, we still need to load it into Python, which we can do using ```NWBZarrIO```.

```{code-cell} ipython3
with NWBZarrIO(nwb_file, "r") as io:
    nwbfile_read = io.read()
```

This stores all the information contained in the NWB file into a ```NWBFile``` object from the ```pynwb``` package, and now we're ready to start working with the data. The first thing we might be interested in is just seeing the contents of the NWB file, which we can do by using the ```nwb2widget``` tool. Below, a screenshot of the output is included to show what information it contains:

```{code-cell} ipython3
nwb2widget(nwbfile_read);
```

:::{figure} ../../resources/output_nwb_read.PNG
---
align: center
---
:::

The various types of data contained in the file when loaded into Python are simply attributes of the ```nwbfile_read``` object, which we access in the usual way ```nwbfile_read.*```. Depending on the table of interest, they might be stored as different types of objects, however; for example, several are stored as objects specific to the ```pynwb``` package.

Now we will access the data directly.

```{code-cell} ipython3
print(nwbfile_read)
```

## Accessing Units Data

Since this is an ecephys file, let's first access the *units*. This is a ```DataFrame``` object that contains information about all of the sorted {term}`unit`s in this experiment.

```{code-cell} ipython3
units = nwbfile_read.units[:]
print(type(units))
```

Let's examine what information is stored in the ```DataFrame```:

```{code-cell} ipython3
print(units.columns.values)
```

Here, we can see the full list of columns stored in our ```DataFrame```:

- `spike_times` - spike times (in seconds) for the entire session
- `electrodes` - electrode indices used for mean waveform
- `waveform_mean` - mean spike waveform across all electrodes
- `waveform_sd` - standard deviation of the spike waveform across all electrodes
- `unit_name` - universally unique identifier for this unit
- `default_qc` - `True` if this unit passes default quality control criteria, `False` otherwise
- `presence_ratio` - fraction of the session for which this unit was present (**default threshold = 0.8**)
- `num_spikes` - total number of spikes detected
- `snr` - signal-to-noise ratio of this unit's waveform (relative to the peak channel)
- `isi_violations_ratio` - metric that quantifies spike contamination (**default threshold = 0.5**)
- `firing_rate` - average firing rate of the unit throughout the session
- `isolation_distance` - distance to nearest cluster in Mahalanobis space (higher is better)
- `l_ratio` - related to isolation distance; quantifies the probability of cluster membership for each spike
- `device_name` - name of the probe that detected this unit
- `amplitude_cutoff` - estimated fraction of missed spikes (**default threshold = 0.1**)
- `peak_trough_ratio` - ratio of the max (peak) to the min (trough) amplitudes (based on 1D waveform)
- `repolarization_slope` - slope of return to baseline after trough (based on 1D waveform)
- `amplitude` - peak-to-trough distance (based on 1D waveform)
- `d_prime` - classification accuracy based on LDA (higher is better)
- `recovery_slope` - slope of return to baseline after peak (based on 1D waveform)
- `half_width` - width of the waveform at half the trough amplitude (based on 1D waveform)
- `ks_unit_id` - unit ID assigned by Kilosort

Note that the columns may vary from experiment to experiment, so it's a good idea to check what columns are stored in any NWB file that you open. For instance, this file contains the above standard columns that appear in most NWB files from the Allen Institute, but also many more columns detailing the unit's response to laser stimulation. These columns are further explained in the [cell type lookup table tutorials.](../ephys/cell-type-lookup-table/ctlut-identifying-tagged-units.md)

To access data from a specific unit, we look at the row corresponding to that unit:

```{code-cell} ipython3
print(units.loc[418])
```

To look at the spike times for a specific unit, we look at the corresponding attribute of that unit.

```{code-cell} ipython3
print(units.loc[418]['spike_times'])
```

We can also see how many spike times there are for a specific unit, which will tell us the number of spikes and allow us to access the time of a specific spike (in this case, accessing the time of the 189th spike):

```{code-cell} ipython3
print(len(units.loc[418]['spike_times']))
print(units.loc[418]['spike_times'][188])
```

A useful sanity check here might also to be to ensure that the number of spike times matches the actual number of spikes recorded in the units table:

```{code-cell} ipython3
print(units.loc[418]['num_spikes'])
print(units.loc[418]['num_spikes'] == len(units.loc[418]['spike_times']))
```

So we can see that every recorded spike also has its time recorded, as we would expect. As another example, it is also possible to access and plot the waveform for a specific unit. Accessing the waveform is done in the same manner as accessing the spike times; in this case, we are interested in looking at 'waveform_mean' (note that here, we access it in two different ways: as an attribute of the units table, and as an element of the `DataFrame`). This is stored as a basic Python array. We can take a look at its dimensions to make sense of what data is stored here:

```{code-cell} ipython3
print(np.array(units.loc[418]['waveform_mean']).shape)
```

Equipped with our knowledge of Neuropixels, we can see then that the dimensions are (time, channel). We can plot this to visualize each channel's recordings over time. Note that due to the way that plt.imshow functions, we will need to take the transpose of the array to plot time on the x-axis. Also note that `waveform_mean` centers the times around the time of the spike.

```{code-cell} ipython3
plt.imshow(units.loc[418]['waveform_mean'].T, origin='lower')
plt.ylabel("Electrode")
plt.xlabel("Time (us)")
plt.show()
```

From above, we can see that most of the channels recorded the same values over time; the channel's recording at any given time is indicated by the color of the plot at that time. Since most horizontal lines we can draw on this plot are monochromatic, we can conclude that the channel in question did not record any interesting variation in electric potential.

However, there is something interesting happening on channels 20 to 50!

We can plot the shape of the potential over time on those channels. Now, instead of a three-dimensional plot, we will have a two-dimensional plot of voltage over time, with each distinct line representing a different channel:

```{code-cell} ipython3
plt.plot(units.waveform_mean.loc[418][:,20:50])
plt.ylabel("uV")
plt.xlabel("Time (us)")
plt.show()
```

This has somthing interesting going on; we can clearly see the classic shape of an action potential, but it appears to be overlaid on some baseline sinusoidal oscillation in the voltage.

Moving on from the units table, let's examine more of the data contained in the NWB file.

+++

## Accessing Trials Data

The trials table includes information on the timing and experimental parameters for each trial conducted in the experiment. It can be accessed in the same way as the units table; again, this is a `DataFrame` object.

```{code-cell} ipython3
trials = nwbfile_read.trials[:]
print(trials.columns.values)
```

Notice that this is an example of an optotagging experiment from the Cell Type Look-Up Table (<ref>CTLUT</ref>) dataset, so the columns stored here are specific to that stimulus. Other NWB files for other experiments will have different column names pertaining to the stimulus or behavior used for that experiment. In this experiment, for example, we can see the length of the trials and the details on the lasers used as a stimulus.

Like with the units table, we can access a particular trial by asking for the row number (remember that these are indexed starting at 0):

```{code-cell} ipython3
print(trials.loc[1582])
```

## Stimulus Template Information

A stimulus template provides an exemplar for each stimulus condition, which we can access again as an attribute of the NWB file. This is also something that is tailored to the experimental design, so the form can vary. In this example, the template is a `Dictionary` object. The keys are:

```{code-cell} ipython3
stimulus_template = nwbfile_read.stimulus_template
print(stimulus_template.keys())
```

Notice that these keys match what we find in the stimulus_table under `stimulus_template_name`. For this experiment, the template provides the shape of the optotagging pulses delivered during the experiment.

Since the trial we pulled above uses the 'internal_red-train-0.1mW' stimulus template, let's just pull up the information for that particular stimulus template. Note that we could print the whole dictionary (this will be a very long output), but the information stored in each stimulus_template is the same.

```{code-cell} ipython3
print(stimulus_template['internal_red-train-0.1mW'])
```

Here, we can see all the information stored about the stimulus used. In particular, we can see that we have 7800 data points, stored in two different arrays: one in "data", and one in "timestamps". We can also see that the units of our dataset are in seconds and Volts (important so we don't make embarrassing orders of magnitude errors!).

Now let's plot the stimulus template.

```{code-cell} ipython3
plt.plot(stimulus_template['internal_red-train-0.1mW'].timestamps[:], stimulus_template['internal_red-train-0.1mW'].data[:])
plt.xlabel("Time (s)", fontsize=16)
plt.ylabel("Voltage (V)", fontsize=16)
plt.show()
```

Here, we can see that our stimulus is a square wave with a frequency of 20 Hz and an amplitude of just under 0.5 Volts.

+++

## Processing

There are some relevant pieces of data which are not quite as straightforward to access; some are nested under other attributes. For example, the running speed of the mouse over time is very relevant, but it is nested behind the `processing` attribute. To see the data structure, we can just use the `nwb2widget` tool that we showed above in the fifth cell and browse, but here we'll also show how to read the data manually since the `nwb2widget` tool can sometimes be slow if there's a large amount of information in a section. 

The `processing` attribute holds a variety of important pieces of data. `processing` is a `LabelledDict` type object like the stimulus templates were. In order to see what the keys are for this `LabelledDict`, we can just print it and see what attributes we can access:

```{code-cell} ipython3
print(nwbfile_read.processing)
```

As we can see for this example, the keys contained in `processing` for this mouse are 'behavior' and 'ecephys'. As with the previous sections, it is important to remember that the keys we have here are specific to this optotagging experiment! In general, what information is contained in processing will be experiment-dependent.

Now, let's access the 'behavior' key first to see what it contains:

```{code-cell} ipython3
print(nwbfile_read.processing['behavior'])
```

Notice here that in order to access a specific key, we simply ask for the name of the key.

Now, when we read this, we can see the 'behavior' part of the `processing` module for this particular experiment contains only one object, `data_interfaces`. Let's keep going and see what that contains:

```{code-cell} ipython3
print(nwbfile_read.processing['behavior'].data_interfaces)
```

Notice that to access the subsection of the dictionary key, we call it as an attribute of the key.

In this case the `behavior` object has one item: the running speed of the mouse during the experiment. This is called the “linear velocity”. In other experiments, we might find the pupil area and/or position here as well.

We can that the `linear velocity` object by reading through the nested sets printed in our last key. The `data_interfaces` object possesses a key named `BehavioralTimeSeries`, which has an attribute `time_series` inside it. In turn, the attribute `time_series` possesses the key named `linear velocity`.

So, the running speed is nested in several layers of `LabelledDict` type objects. In order to access it, we'll need to write down the whole "path" to it. Let's see what information the 'linear velocity' key contains.

(For the sake of simplicity, we'll store the linear velocity data in a different Python object, so that we don't have to type the full path to the linear velocity every time we wish to examine it.)

```{code-cell} ipython3
running_speed = nwbfile_read.processing['behavior'].data_interfaces['BehavioralTimeSeries'].time_series['linear velocity']
print(running_speed)
```

This tells us that the 'linear_velocity' (which here we've stored in `running_speed` for ease of access) contains several attributes: `comments`, `conversion`, `data`, `description`, `interval`, `offset`, `resolution`, `timestamps`, `timestamps_unit`, and `unit`. Of these, most are irrelevant for our purposes; the two that contain all the data are:

- `data` contains the actual velocity at each timestamp.
- `timestamps` contains the timestamp for each measurement. These are naturally paired.

We can see that there are 624,796 data points, and that our data is in units of velocity over time. We can access them directly if we want:

```{code-cell} ipython3
print(running_speed.timestamps[:])
print(running_speed.data[:])
```

And to access a specific data point, we would just use the index in place of the `:` that tells Python to read all elements of the array.

Now let's plot the data and time to get an idea of the mouse's velocity over the course of the experiment:

```{code-cell} ipython3
plt.plot(running_speed.timestamps[:], running_speed.data[:])
plt.xlabel("Time (s)", fontsize=16)
plt.ylabel("Velocity (m/s)", fontsize=16)
plt.show()
```

This isn't the most legible plot, but it's clear why it isn't; we have on the order of $10^5$ measurements, but our time scale is only $10^3$ s, which means we're taking around a hundred measurements per second. We can zoom in on a specific time interval to get a better idea of what's going on in that time interval. We could also apply standard data processing techniques to clean up the signal to improve legibility, but those techniques are beyond the scope of this particular tutorial.

```{code-cell} ipython3
plt.plot(running_speed.timestamps[3000:3500], running_speed.data[3000:3500])
plt.xlabel("Time (s)", fontsize=16)
plt.ylabel("Velocity (m/s)", fontsize=16)
plt.show()
```

Now let's back up. There was a second key named `ecephys` which was contained in the `processing` attribute of `nwbfile_read`. Let's access that and see what data is contained there:

```{code-cell} ipython3
print(nwbfile_read.processing['ecephys'])
```

The `ecephys` object contains one item: the local field potential ({term}`LFP`) data. LFPs are the signals in the low frequency range (below 500 Hz) that are generated by synchronized synaptic inputs of neuronal populations. This features are known to be correlated with brain and behavioral states. The LFP is computed for each probe independently, so when there are multiple probes, there should be an LFP object for each probe. 

In this particular experiment, the path to the LFP data goes through the attribute `data_interfaces`. Again, for ease of access, we'll store it in an object so that we don't have to type out the path every time:

```{code-cell} ipython3
lfp_interface = nwbfile_read.processing['ecephys'].data_interfaces['LFP']
print(lfp_interface)
```

Looking at the contents of the LFP data, we have two probes listed. As expected, each one of them contains LFP data. Let's take a look at one of them to start:

```{code-cell} ipython3
lfp_es = lfp_interface.electrical_series['ElectricalSeriesProbeA-LFP']
print(lfp_es)
```

Reading off the information about the data recorded by Probe A, we can see that we only have one set of data here. There, we have 15,661,294 data points for each of the 384 channels on the Neuropixels probe. None of this data is directly associated with a time coordinate. Instead, we're told the sampling rate of 2500 Hz and the starting time. Thus, if we want to plot this, we'll have to construct the timestamps manually by taking the starting time and then appending times at 1/2500 s intervals until we have 15,661,294 timestamps.

Fortunately, this is a task computers excel at:

```{code-cell} ipython3
lfp_num_samples = lfp_es.data.shape[0]
lfp_timestamps = lfp_es.starting_time + np.arange(lfp_num_samples) / lfp_es.rate
```

Next we can examine what's contained in the data. Here, we'll pick a specific interval instead of plotting for the entire experiment to enhance legibility. (As with the previous section, we would still need to do a significant amount of signal processing to analyze this data).

```{code-cell} ipython3
plt.imshow(lfp_es.data[50000:60000,0:350].T, origin='lower', aspect='auto')
plt.ylabel('Channel')
plt.xlabel('Sample')
```

Here, we are not plotting channels above 350, as they were outside of the brain and thus did not have meaningful data. In this time period, we can see some clear oscillatory activity in channels 200-350, which were likely in the cortex.

+++

Instead of looking at all 384 channels, we can also examine just a single channel, and we can plot it against time to see what the LFP looked like for that channel.

```{code-cell} ipython3
channel = 99
raw_data = lfp_es.data[:, channel]

print(raw_data.shape)

plt.plot(lfp_timestamps[50000:60000], raw_data[50000:60000])
plt.xlabel("Time (s)", fontsize=16)
plt.ylabel("LFP (uV)", fontsize=16)
plt.show()
```

Finally, we can also examine the information contained in the electrodes attribute of the probe we're investigating:

```{code-cell} ipython3
print(lfp_es.electrodes.shape)
```

Here, we can see that we have ten entries for every channel.

+++

The NWB file contains other data as well which can be explored using the methods we've detailed in this tutorial; we will not detail every piece of accessible information here, but hopefully it should be clear from these examples how one can navigate and extract data from an NWB file. Once finished, we should then close the NWB file.

```{code-cell} ipython3
io.close()
```

```{code-cell} ipython3

```
