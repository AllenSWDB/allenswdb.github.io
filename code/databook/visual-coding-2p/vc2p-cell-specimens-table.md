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
  name: python3
---
```{code-cell} ipython3
import numpy as np
import matplotlib.pyplot as plt
%matplotlib inline
```
```{code-cell} ipython3
from allensdk.core.brain_observatory_cache import BrainObservatoryCache
manifest_file = '../../../data/allen-brain-observatory/visual-coding-2p/manifest.json'
boc = BrainObservatoryCache(manifest_file=manifest_file)
```

# Cell specimens table

There are a large number of metrics that have been computed for all the neurons recorded in this dataset. These can be access using `boc.get_cell_specimen_table()`. 


These metrics were computed using DF/F, and often using what we consider a "local" DF/F computation. For each trial of a stimulus, the Fo was calculated using the neuron's mean corrected fluorescence in the 1 second prior to the trial. As a result, 