---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.16.2
kernelspec:
  display_name: Python 3 (ipykernel)
  language: python
  name: python3
---

This tutorial will demonstrate the structure of the data file in an NWB (Neurodata Without Borders) file. In this particular example, we will be accessing information from an optotagging experiment, where the cells have light-gated ion channels that are activated by lasers. The data was taken using neuropixel opto (but details about all the devices used, as well as the experimental apparatus, are included in the NWB file).

We begin with package imports which we'll need:

```{code-cell} ipython3
import os
import glob
from hdmf_zarr import NWBZarrIO
from nwbwidgets import nwb2widget
import nwbinspector

from tqdm.auto import tqdm
import json
```

In order to do any analysis, of course, we'll also need the usual libraries:

```{code-cell} ipython3
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
```

## Accessing an NWB file

To manipulate the data in the file, we first need to load it into Python. We can do this using ```glob```, which will allow us to search the directory in which our data is located for particular strings. In this case, let's say we want to look for experiments involving a particular mouse.

```{code-cell} ipython3
mouse_id = '625098'

nwb_file = glob.glob(os.path.join('/data', '*' + mouse_id + '*', '*', '*.nwb.zarr'))[0]

print(nwb_file)
```

Above, we have used ```glob``` to look for all the files found in /data/ that include the mouse ID we're interested in and generates a Python list with each file's path as its entries. In this case, the data we have mounted only has one file pertaining to mouse 625098, so the list has only one object in it. However, if we had picked a different mouse ID, the list might have more than one entry, in which case we would need to select which file we wanted using a different index.

Now that we have the NWB file's path, we should read it into Python:

```{code-cell} ipython3
with NWBZarrIO(nwb_file, "r") as io:
    nwbfile_read = io.read()
```

At this point, we're ready to start working with the data. The first thing we might be interested in is just seeing the contents of the NWB file, which we can do by using the ```nwb2widget``` tool:

```{code-cell} ipython3
nwb2widget(nwbfile_read)
```

We can also access particular parts of the file. Of particular importance, for example, are the individual units (roughly corresponding to what we believe are individual neurons) in an experiment. We can access the units as a Pandas ```DataFrame``` object:

```{code-cell} ipython3
units = nwbfile_read.units[:]
```

Notice that the various tables contained in the file are simply attributes of the ```nwbfile_read``` object, which we access in the usual way ```nwbfile_read.*```.

In the units, we can examine what information we can gather from any particular unit of interest:

```{code-cell} ipython3
print(units.columns.values)
```

```{code-cell} ipython3
print(units.iloc[0])
```

We may also be interested in quality metrics for a given unit. We can access and plot them as follows:

```{code-cell} ipython3
print(units['isi_violations_ratio'])
```

```{code-cell} ipython3
%matplotlib inline

def plot_metric(metric, threshold=None, use_log=False):  
    m = units[metric].dropna()
    if use_log:
        m = np.log10(m+1e-5) # add small offset to avoid log(0)
    h,v = np.histogram(m, bins=30)
    plt.plot(v[:-1],h)
    if use_log:
        plt.xlabel("log "+metric, fontsize=16)
    else:
        plt.xlabel(metric, fontsize=16)
    if threshold:
        plt.axvline(x=threshold, ls='--', color='k')
        
qc_metrics = ['isi_violations_ratio','amplitude_cutoff','presence_ratio','firing_rate','amplitude','snr']
thresholds = [0.5, 0.1, 0.8, None, None, None]
use_log = [True, False, False, True, False, False]
plt.figure(figsize=(10,6))
for i, metric in enumerate(qc_metrics):
    plt.subplot(2,3,i+1)
    plot_metric(metric, thresholds[i], use_log[i])
    plt.tight_layout()
```

And check how many of the units pass default quality control metrics:

```{code-cell} ipython3
units_passing_qc = units[units.default_qc=='True']
print(len(units_passing_qc))
```

We might also be interested in seeing details on the subject for this experiment:

```{code-cell} ipython3
print(nwbfile_read.subject)
```

Or information on the trials done and what information we can look at in each trial, or look at a particular trial:

```{code-cell} ipython3
trials = nwbfile_read.trials[:]
print(trials.columns.values)
```

```{code-cell} ipython3
print(trials.stimulus_template_name.unique())
```

```{code-cell} ipython3
print(len(trials))
```

```{code-cell} ipython3
print(trials.iloc[1582])
```

We might be interested in looking for issues with the data or ways to improve efficiency when grabbing data (for example, if our time steps are constant, it might be better to simply specify a time range and a sampling rate). One way to look for this is by using ```NWBInspector``` to check for compliance with best practices. We can look grab any messages that ```NWBInspector``` has using the ```inspect_nwbfile_object``` command. 

```{code-cell} ipython3
from nwbinspector import inspect_nwbfile_object

messages = list(inspect_nwbfile_object(nwbfile_read))
```

```{code-cell} ipython3
print(len(messages))
```

This has given us 81 messages, but they're not all necessarily critical messages. Let's take a look at the information in a particular message:

```{code-cell} ipython3
print(messages[0])
```

As we can see, this isn't very readable. We can improve readability using a built-in tool in ```nwbinspector```, ```format_messages```:

```{code-cell} ipython3
from nwbinspector.inspector_tools import format_messages

print("\n".join(format_messages(messages, levels=["importance"])))
```

```{code-cell} ipython3

```
