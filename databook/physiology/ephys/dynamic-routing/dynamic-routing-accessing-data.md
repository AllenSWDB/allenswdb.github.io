---
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.19.5
kernelspec:
  display_name: Python 3 (ipykernel)
  language: python
  name: ctlut
---

# Accessing Dynamic Routing data

This tutorial walks through the basic contents of a Dynamic Routing session NWB file: the units table, session epochs, trial and performance tables, and the behavioral data (running speed, eye tracking, and keypoint tracking).

Dynamic Routing sessions are stored as NWB files, so the main dependency is PyNWB. Pandas and NumPy are useful for working with the tables and arrays stored in the file. 

```{code-cell} ipython3
import pynwb
import pandas as pd
import numpy as np
```

## Loading a session

Each session is stored as a single NWB file. Pointing `pynwb.read_nwb` at the file returns an `NWBFile` object which we can use to explore the file contents. 

```{code-cell} ipython3
nwb_path = "/data/ecephys_759434_2025-02-04_12-27-22_nwb_2026-08-04_15-01-21/759434_2025-02-04.nwb.zarr"
nwbfile = pynwb.read_nwb(nwb_path)
nwbfile
```

## Units

The "units" from an electrophysiological recording are the outputs of a clustering algorithm (in this case, Kilosort), which assigns each spike detected in the voltage traces to a unique neuron. The units table has one row per unit and contains spike times, waveforms, quality-control metrics, and anatomical location for every sorted unit in the session.

```{code-cell} ipython3
units = nwbfile.units[:]
units
```

You can inspect the available columns to see what per-unit information is stored.

*Note that the NWB file contains detailed descriptions of each column in the units table (and every other table). Expose the column container to view this information. 

```{code-cell} ipython3
units.columns
```

### Spike times

The `spike_times` column contains one array per unit with the times (in seconds, aligned to the session clock) of every detected spike for that unit. This is the main entry point for building rasters, PSTHs, and firing-rate summaries.

```{code-cell} ipython3
spike_times = units.spike_times 
spike_times
```

### Filtering by quality and brain structure

Two columns are useful for narrowing down units for further analysis: 

- `default_qc`: boolean indicating whether the unit passed default quality-control metrics.
- `structure`: the CCF-annotated brain structure the unit is located in.

```{code-cell} ipython3
# Combine and count the structure and default_qc columns to identify the number of good units in each brain structure. 

units.groupby("structure")["default_qc"].agg(passing="sum", total="count").sort_values("passing", ascending=False)
```

## Session epochs

Each session is divided into a few high-level epochs (eg. receptive field mapping, spontaneous, dynamic routing task). These are stored in the `epochs` intervals table and provide the time boundaries for each epoch. 

```{code-cell} ipython3
epochs = nwbfile.intervals["epochs"].to_dataframe()
epochs.head()
```

## Trials

The Dynamic Routing task behavior is organized around trials. The trials table contains one row per trial with the trial timing and task variables such as stimulus identity, block context, whether a reward was delivered, and the animal's response. Use it to select trials of interest and align neural data to task events.

```{code-cell} ipython3
trials = nwbfile.trials.to_dataframe()
trials.head()
```

The trials table has many columns; inspect them to see the full set of task annotations available for this session.

```{code-cell} ipython3
trials.columns
```

### Performance

The `performance` intervals table summarizes behavioral performance at the block level (rather than per trial), which is useful when comparing behavior across the alternating auditory- and visual-rewarded contexts.

```{code-cell} ipython3
performance = nwbfile.intervals["performance"].to_dataframe()
performance.head()
```

```{code-cell} ipython3
performance.columns
```

## Behavior data

Along with the task-level tables, each session includes continuous behavioral measurements collected while the mouse performs the task. These live in the behavior module of the  `nwbfile.processing.behavior` container.

```{code-cell} ipython3
nwbfile.processing['behavior']
```

### Running speed

The mouse is head-fixed on a running wheel and is free to run throughout the session. An encoder on the wheel provides a continuous running-speed time series.

```{code-cell} ipython3
running = nwbfile.processing['behavior']['running_speed'].data[:]
running_timestamps = nwbfile.processing['behavior']['running_speed'].timestamps[:]
```

### Eye tracking

Eye tracking uses information about the eye, the pupil, and a corneal reflection (CR) of an IR LED to estimate the position and area of the pupil over the course of the session. Because there is one row per video frame, the table can be large; slicing it to a few rows is a quick way to see the available columns.

```{code-cell} ipython3
eye_tracking = nwbfile.processing['behavior']['eye_tracking'][0:10] # large table, so just getting the first 10 rows 
eye_tracking
```

```{code-cell} ipython3
eye_tracking.columns
```

### Behavior keypoint tracking

Keypoint tracking uses [Lightning Pose](https://github.com/danbider/lightning-pose) on video from a front and a side camera to track anatomical landmarks (ear, nose, whisker pad, etc.) over the session. Each camera produces its own table with one row per video frame.

```{code-cell} ipython3
front_camera = nwbfile.processing['behavior']['lp_front_camera'][0:10] # taking a small slice of the table to display 
front_camera.head() 
```

```{code-cell} ipython3
front_camera.columns
```

```{code-cell} ipython3
side_camera = nwbfile.processing['behavior']['lp_side_camera'][0:10] 
side_camera.head() 
```

```{code-cell} ipython3
side_camera.columns
```
