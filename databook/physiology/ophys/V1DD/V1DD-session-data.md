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

# Accessing V1DD data

We use PyNWB to access these data, similar to many of our other datasets. Let's explore the elements that are available here

```{code-cell} ipython3
from hdmf_zarr import NWBZarrIO
import pandas as pd
import matplotlib.pyplot as plt
%matplotlib inline
```

```{code-cell} ipython3 
nwbfile_path = PATH HERE

io = NWBZarrIO(nwbfile_path_zarr, "r")
nwbfile_read = io.read()
```



```{code-cell} ipython3 

```
