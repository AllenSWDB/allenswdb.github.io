---
jupytext:
  formats: md:myst
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

# Visual Stimuli

Two possible stimulus sets were used in the Visual Coding - Neuropixels project, known as `Brain Observatory 1.1` or `Functional Connectivity`. The former is largely similar to the visual stimuli used in the Visual Coding 2-photon dataset, with some key adaptations (described below). Each mouse only saw one of these two stimulus sets. It addition to these visual stimuli, an [optotagging](../../../background/Optotagging.md) stimulus was also used in each of these sessions.

## Brain Observatory 1.1

These stimulus consisted of session A and session B from Visual Coding 2-photon merged together, with two additional stimuli: Gabor patches and flashes. 

Below is a description of each stimulus family and the corresponding intervals tables in the NWB file. 

First, import the necessary packages and load a single session file, unpacking only the intervals container.  

```{code-cell} ipython3
import pynwb
import pandas as pd
import numpy as np
import matplotlib as plt
``` 

```{code-cell} ipython3
nwb_path = "/data/387858_2018-07-12_13-56-26_nwb_2026-08-19_07-52-55/387858_2018-07-12_13-56-26_nwb_2026-08-19_07-52-55.nwb.zarr"
nwbfile = pynwb.read_nwb(nwb_path)
nwbfile.intervals
```

All tables share a common set of timing columns and add a stimulus-specific set of parameter columns.

### Common columns

| Column | Description |
| --- | --- |
| start_time | Start time of the stimulus (s) |
| stop_time | Stop time of the stimulus (s) |
| stimulus_name | Name of the stimulus family |
| stimulus_block | Index of the contiguous block of trials this presentation belongs to |
| stimulus_index | Global index of the presentation within the session |
| tags | User-defined tags |
| timeseries | References to associated timeseries |


### Drifting gratings
The drifting gratings stimulus consists of a sinusoidal grating that is presented on the monitor that moves orthogonal to the orientation of the grating, moving in one of 8 directions (called <b>orientation</b>) and at one of 5 <b>temporal frequencies</b>. The directions are specified in units of degrees and temporal frequency in Hz. The grating has a spatial frequency of 0.04 cycles per degree and a contrast of 80%. Each trial is presented for 2 seconds with 1 second of mean luminance gray in between trials.

| Column | Description |
| --- | --- |
| orientation | Grating drift direction (deg) |
| temporal_frequency | Drift rate (Hz) |
| spatial_frequency | Grating spatial frequency (cyc/deg) |
| contrast | Stimulus contrast |
| phase | Spatial phase of the grating |
| color | Stimulus color |
| mask | Shape of mask applied to stimulus |
| opacity | Stimulus opacity [0-1] |
| size | Size of stimulus |
| units | Units of `size` |

```{code-cell} ipython3
drifting_gratings = nwbfile.intervals["drifting_gratings_presentations"].to_dataframe()
drifting_gratings.head()
```

### Static gratings
The static gratings stimulus consists of a <b>stationary</b> sinusoidal grating that is flasshed on the monitor at one of 6 <b>orientations</b>, one of 5 <b>spatial frequencies</b>, and one of 4 <b>phases</b>. The grating has a contrast of 80%. Each trial is presented for 0.25 seconds and followed immediately by the next trial without any intertrial interval. There are blanksweeps, where the grating is replaced by the mean luminance gray, interleaved among the trials.

| Column | Description |
| --- | --- |
| orientation | Grating drift direction (deg) |
| temporal_frequency | Drift rate (Hz) |
| spatial_frequency | Grating spatial frequency (cyc/deg) |
| contrast | Stimulus contrast |
| phase | Spatial phase of the grating |
| color | Stimulus color |
| mask | Shape of mask applied to stimulus |
| opacity | Stimulus opacity [0-1] |
| size | Size of stimulus |
| units | Units of `size` |

```{code-cell} ipython3
static_gratings = nwbfile.intervals["static_gratings_presentations"].to_dataframe()
static_gratings.head()
```

```{admonition} What is the phase of the grating?
:class: tip
The phase refers to the relative position of the grating. Phase 0 and Phase 0.5 are 180° apart so that the peak of the grating of phase 0 lines up with the trough of phase 0.5.

![phase](/resources/phase_figure_2.png)
```

### Natural scenes
The natural scenes stimulus consists of a 118 black and white images that are flashed on the monitor. Each trial is presented for 0.25 seconds and followed immediately by the next trial without any intertrial interval. There are blanksweeps, where the images are replaced by the mean luminance gray, interleaved in among the trials.

| Column | Description |
| --- | --- |
| frame | Index of the natural-scene image presented on this trial |

```{code-cell} ipython3
natural_scenes = nwbfile.intervals["natural_scenes_presentations"].to_dataframe()
natural_scenes.head()
```

### Natural movies

Short natural movie clips presented multiple times. `natural_movie_one` and `natural_movie_three` are two different clips. Each row corresponds to one frame of the movie.

| Column | Description |
| --- | --- |
| frame | Frame index within the movie clip |

```{code-cell} ipython3
natural_movie_one = nwbfile.intervals["natural_movie_one_presentations"].to_dataframe()
natural_movie_one.head()
```

### Gabor patches

Small Gabor patches presented at a grid of positions on the monitor. Used to map each unit's spatial receptive field.

| Column | Description |
| --- | --- |
| x_position | Horizontal position of the Gabor on the monitor (deg) |
| y_position | Vertical position of the Gabor on the monitor (deg) |
| orientation | Gabor orientation (deg) |
| spatial_frequency | Gabor spatial frequency (cyc/deg) |
| temporal_frequency | Gabor temporal frequency (Hz) |
| contrast | Stimulus contrast |
| size | Gabor patch size (deg) |

```{code-cell} ipython3
gabors = nwbfile.intervals["gabors_presentations"].to_dataframe()
gabors.head()
```

### Flashes

Full-field ON/OFF luminance flashes. Used to characterize ON/OFF responses.

```{code-cell} ipython3
flashes = nwbfile.intervals["flashes_presentations"].to_dataframe()
flashes.head()
```

### Spontaneous activity

Blocks of gray-screen activity presented between stimulus families. Used as a reference for baseline firing.

```{code-cell} ipython3
spontaneous = nwbfile.intervals["spontaneous_presentations"].to_dataframe()
spontaneous.head()
``` 
### Invalid times

Intervals during which the recording is considered unreliable and should be excluded from analysis.

```{code-cell} ipython3
invalid_times = nwbfile.intervals["invalid_times"].to_dataframe()
invalid_times.head()
``` 

## Functional Connectivity

:::{figure} https://allensdk.readthedocs.io/en/latest/_static/neuropixels_stimulus_sets.png
:name: np-stimulus-sets-ref
:align: center
:width: 800

Neuropixels visual stimulus sets
:::

