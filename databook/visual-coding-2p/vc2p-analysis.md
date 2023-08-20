---
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.11.5
kernelspec:
  display_name: Python 3
  language: python
  name: allensdk
---
```{code-cell} ipython3
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
%matplotlib inline
```
# Analysis files and cell specimens table

## Analysis file
There are analysis files that accompany each session that contain derived data that might be useful to build upon. However, this should be used with some caution described below. 

You can access the analysis object through the BrainObservatoryCache

```{code-cell} ipython3
from allensdk.core.brain_observatory_cache import BrainObservatoryCache
manifest_file = '../../../data/allen-brain-observatory/visual-coding-2p/manifest.json'
boc = BrainObservatoryCache(manifest_file=manifest_file)
experiment_container_id = 511510736
session_id = boc.get_ophys_experiments(experiment_container_ids=[experiment_container_id], stimuli=['natural_scenes'])[0]['id']
data_set = boc.get_ophys_experiment_data(ophys_experiment_id=session_id)
```

For each stimulus class there is an analysis function. We demonstrate with Natural Scenes below:

```{code-cell} ipython3
from allensdk.brain_observatory.natural_scenes import NaturalScenes
ns = NaturalScenes(data_set)
```

For each stimulus, there are two dataframes called `sweep_response` and `mean_sweep_response` that quantify the individual trial responses of each neuron. The sweep_response dataframe contains the DF/F for each neuron for each trial. The index of the dataframe matches the stimulus table for the stimulus, and the columns are the cell indexes (as strings).

For this dataframe, DF/F was computed using the mean fluorescence in the 1 second prior to the start of the trial as the Fo. The sweep response contains this DF/F for each neuron spaning from 1 second before the start of the trial to 1 second after the end of the trial. In addition to the responses of each neuron, there is one additional column that captures the running speed of the mouse during the same time span of each trial. This column is titled 'dx'.

The mean_sweep_response (with the same index and columns as sweep_response) calculates the mean value of the DF/F in the sweep response dataframe during each trial for each neuron. The column titled 'dx' averages the running speed in the same way.

```{code-cell} ipython3
plt.plot(ns.sweep_response['0'].loc[0])
plt.axvline(x=30, ls='--', color='k')
plt.xlabel("Frames")
plt.ylabel("DF/F (%)")
plt.title("Response of cell index 0 to the fist trial")
print("Mean response of cell index 0 to the first trial:", ns.mean_sweep_response['0'].loc[0])
```

In addition to these dataframes there is a numpy array titled `response` that captures the mean response to each stimulus condition. For example, for the drifting grating stimulus, this array has the shape of (8,6,3,number_cells+1). The first dimension is the stimulus direction, the second dimension is the temporal frequency plus the blank sweep. The third dimension is [mean response, standard deviation of the response, number of trials of the condition that are significant]. And the last dimension is all the neurons plus the running speed in the last element. So the mean response of, say, cell index 17, to the blank sweep is located at response[0,0,0,17]. For natural scenes this has a shape of (119,3,number_cells+1).

Within this analysis object, there are useful functions to calculate signal and noise correlations called `get_signal_correlation` and `get_noise_correlation`. These return arrays of the signal and noise correlations of all the neurons in a session for this specific stimulus. The shape of the array is (number_cells, number_cells).

```{code-cell} ipython3
sc = ns.get_signal_correlation()
plt.imshow(sc[0])
plt.xlabel("Cell index")
plt.ylabel("Cell index")
plt.title("Signal correlation")
```

## Cell specimen table
In addition the the analysis tables, there are response metrics that have been computed for each neuron using the responses that are stored in the analysis files. These metrics describe the visual activity and response properties of the neurons and can be useful in identifying relevant neurons for analysis. Each metric name has a suffix that is the abbreviation of the stimulus it was computed from (e.g. dg=drifting gratings, lsn=locally sparse noise). These metrics and how they were computed are described extensively in this [whitepaper](https://help.brain-map.org/download/attachments/10616846/VisualCoding_VisualStimuli.pdf?version=3&modificationDate=1497305590322&api=v2).

```{code-cell} ipython3
cell_specimen_table = pd.DataFrame(boc.get_cell_specimens())
print(cell_specimen_table.keys())
cell_specimen_table.head()
```

## Caveat
The anaylsis file and the metrics in the cell specimen table were computed from the DF/F as described above. While this is not incorrect, per se, there are some caveats to this. Metrics such as DSI which are defined as (pref-null)/(pref+null) are expected to be contrained to +/- 1. However, we can have trials with negative DF/F, especially using it as we do here, in which case these metrics will not be contrained in this way. This can make it difficult to interpret the resulting values. 

These analysis objects and metrics are not invalid, but be sure to use and interpret them appropriately.
