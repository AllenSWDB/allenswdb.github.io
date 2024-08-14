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

# Accessing cell type lookup table data

+++

## Overview

This notebook will go over how to load the cell type lookup table data and access its contents. Unlike other Allen Institute data sets, this data was very recently collected and is not publicly available, so you will access it by attaching the "cell_type_lookup_table_nwb" data asset and interacting with it through your capsule.

+++

## Import required packages
Since the data is packaged as nwb files, you'll need to import hdmf_zarr to interact with the data. The metadata for each experiment is stored as .json files, so you'll want to import json as well.

...and os is just nice for formatting file paths!

```{code-cell} ipython3
from hdmf_zarr import NWBZarrIO
import json
import os
```

## Loading the data

Let's try loading one session's worth of data to see how to work with it.

```{code-cell} ipython3
# an 'arbitrarily' selected session
session = '661398_2023-04-03_15-47-29'
session_directory = f'/data/SWDB 2024 CTLUT data/ecephys_{session}_nwb'

nwb_file = os.path.join(session_directory, f'ecephys_{session}_experiment1_recording1.nwb.zarr')
io = NWBZarrIO(nwb_file, "r")
nwbfile_read = io.read()
```

If you'd like to explore the contents of the nwb file in a widget with a graphical user interface, you can install nwb2widget in your environment, then run:

```{hint}
from nwbwidgets import nwb2widget
nwb2widget(nwbfile_read)
```

+++

Before further working with this data, let's take a look at the metadata so we know what to expect.

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

So this animal was Adora2a-Cre (meaning it expresses Cre in D2 cells) and it was injected with two viruses: an enhancer delivering CoChR to D1 cells, and a Cre-dependent virus delivering ChRmine. From this, we can conclude that this mouse should express CoChR in D1 cells and ChRmine in D2 cells. Therefore, any cells responding to blue laser pulses are D1 calls, and cells responding to red laser pulses are D2 cells!

+++

## Loading unit data
The "units" from an electrophysiological recording are the outputs of a clustering algorithm (in our case, kilosort 2.5), which aims to assign each spike detected in the voltage traces to a unique neuron. We can load the data from all units detected in this session.

```{code-cell} ipython3
units = nwbfile_read.units[:]
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
epochs = nwbfile_read.intervals['epochs'].to_dataframe()
```

## Stimulus data

If you wanted to verify the laser responses of tagged units, you may wish to load information about the laser stimulation. This is saved as a trials table indicating the times of each laser stimulation and information about the stimulation that took place.

```{code-cell} ipython3
# load the stimulus table
stimulus_table = nwbfile_read.intervals['trials'].to_dataframe()
```

You can also load the stimulus templates: the voltage traces sent to the laser during stimulation, giving you a read of the laser's power over time. The names of the template match the ones in the trials table.

```{code-cell} ipython3
stimulus_template = nwbfile_read.stimulus_template
```

## LFP data

You can load the LFP (local field potential) data collected for each experiment. There are 384 channels of this data, for every electrode on the Neuropixels probe, as it was collected concurrently with the spiking data.

```{code-cell} ipython3
# load LFP data (for probe A, change the string for probe B)
lfp_data = nwbfile_read.processing['ecephys']['LFP']['ElectricalSeriesProbeA-LFP']
lfp = lfp_data.data
start_time = lfp_data.starting_time
acquisition_rate = lfp_data.rate
```

## Running data

Finally, you can also find the animal's running speed throughout the session.

```{code-cell} ipython3
running = nwbfile_read.processing['behavior']['BehavioralTimeSeries']['linear velocity']
running_speed = running.data
running_timestamps = running.timestamps
```

```{code-cell} ipython3

```
