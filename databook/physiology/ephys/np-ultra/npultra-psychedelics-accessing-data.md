# Accessing NP Ultra & Psychedelics Data

## Loading Data

The Neuropixels Ultra & Psychedelics dataset is packaged in nwb format and can be accessed via NWBZarrIO. 

Load an example session:
```{code-cell} ipython3
from hdmf_zarr import NWBZarrIO
import json
import os
```
```{code-cell} ipython3 
from hdmf_zarr import NWBZarrIO 

nwbfile_path_zarr = '/data/np-ultra-psychedelics/ecephys_714527_2024-05-15_13-00-23_nwb_2025-08-03_21-11-22/ecephys_714527_2024-05-15_13-00-23_experiment1_recording1.nwb'

with NWBZarrIO(nwbfile_path_zarr, mode='r') as io:
    nwbfile_zarr = io.read()
```
Alternatively, more than one session can be loaded into memory and stored into a list by:

```{code-cell} ipython3 
import glob

data_mount = '/data/np-ultra-psychedelics/'
sessions = os.listdir(data_mount)

data = []

for session in sessions:
    nwbfile_path_zarr = glob.glob(os.path.join(data_mount,session,'**.nwb'))[0]

    with NWBZarrIO(nwbfile_path_zarr, mode='r') as io:
        nwbfile_zarr = io.read()

    data.append(nwbfile_zarr)
```

Be aware this method will consume more system resources but will allow faster access to the dataset.

