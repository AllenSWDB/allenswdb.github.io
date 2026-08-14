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

# Accessing cell type lookup table data

+++

## Overview

This notebook will go over how to load the cell type lookup table data and access its contents. 

+++

## Import required packages
Since the data is packaged as nwb files, you'll need to import hdmf_zarr to interact with the data. The metadata for each experiment is stored as .json files, so you'll want to import json as well.

...and os is just nice for formatting file paths!

```{code-cell} ipython3
import pynwb
import json
import os
```

## Loading the data

Let's try loading one session's worth of data to see how to work with it.

```{code-cell} ipython3
nwb_path = '/data/ecephys_655571_2023-05-15_13-39-49_nwb/ecephys_655571_2023-05-15_13-39-49_experiment1_recording1.nwb'

nwbfile = pynwb.read_nwb(nwb_path)
```

Explore the contents on this file

```{code-cell} ipython3
nwbfile
```


## Loading unit data
The "units" from an electrophysiological recording are the outputs of a clustering algorithm (in our case, kilosort 2.5), which aims to assign each spike detected in the voltage traces to a unique neuron. We can load the data from all units detected in this session.

```{code-cell} ipython3
units = nwbfile.units[:]
```

There is a large amount of data stored about each unit, but here are some relevant ones:

```{code-cell} ipython3
# timestamps of every spike for every unit
spike_timestamps = units.spike_times

# spike waveform for every unit
spike_waveforms = units.waveform_mean

# whether or not each unit passed default qc metrics
spike_qc = units.default_qc

# the predicted cell type of each unit
cell_type_id = units.predicted_cell_type
```

The majority of the rest of the data stored for the units are the various qc metrics, which are detailed in {doc}`../visual-coding/vcnp-quality-metrics`, or laser response metrics, detailed in {doc}`./ctlut-identifying-tagged-units`.

+++

## Experimental epochs

You may wish to know the time points at which different parts of the experimental session took place. For instance, you may wish to know when laser presentations took place to verify the laser responses of tagged units, or find the epoch before laser presentations to analyze spontaneous cell responses.

```{code-cell} ipython3
# get the different epochs and their beginning and end times
epochs = nwbfile.intervals['epochs'].to_dataframe()
```

## Stimulus data

If you wanted to verify the laser responses of tagged units, you may wish to load information about the laser stimulation. This is saved as a trials table indicating the times of each laser stimulation and information about the stimulation that took place.

```{code-cell} ipython3
# load the stimulus table
stimulus_table = nwbfile.intervals['trials'].to_dataframe()
```

You can also load the stimulus templates: the voltage traces sent to the laser during stimulation, giving you a read of the laser's power over time. The names of the template match the ones in the trials table.

```{code-cell} ipython3
stimulus_template = nwbfile.stimulus_template
```

## LFP data

You can load the LFP (local field potential) data collected for each experiment. There are 384 channels of this data, for every electrode on the Neuropixels probe, as it was collected concurrently with the spiking data.

```{code-cell} ipython3
# load LFP data (for probe A, change the string for probe B)
lfp_data = nwbfile.processing['ecephys']['LFP']['ElectricalSeriesProbeA-LFP']
lfp = lfp_data.data
start_time = lfp_data.starting_time
acquisition_rate = lfp_data.rate
```

## Running data

Finally, you can also find the animal's running speed throughout the session.

```{code-cell} ipython3
running = nwbfile.processing['behavior']['BehavioralTimeSeries']['linear velocity']
running_speed = running.data
running_timestamps = running.timestamps
```

```{code-cell} ipython3

```
