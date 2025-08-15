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
To quickly walk through the data, use:

```{code-cell} ipython3
from nwbwidgets import nwb2widget 

nwb2widget(nwbfile_zarr)
```

### Loading unit data

Data for all Kilosort-processed units can be loaded via:

```{code-cell} ipython3
units_table = nwbfile_zarr.units[:]
```

Units in this dataset have undergone additional postprocessing QC from Kilosort 2.5 and automated curation. Unlike other datasets, curated data can be accessed via the analysis attribute of the nwb file.

```{code-cell} ipython3
analysis_table = nwbfile_zarr.analysis['analysis_table'].to_dataframe()
```

Analysis table properties include both extracted unit spike-time and waveform infomation (amplitude, duration, number or bursts, etc.) but also the timing of spikes during stimulus epochs (e.g. 'Spontaneous_0_spikes' are spikes that occurred during the first spontaneous activity epoch).

The analysis table and unit table data can be aligned by the unique 'ks_units_id' column in both tables. For example, to get the spike times of an optotagged unit in the units table:

```{code-cell} ipython3
opto_unit = analysis_table[analysis_table['optotagged']==1].iloc[0]
probe = opto_unit['probe'] #get the probe the unit was recorded on as ks_unit_id is probe-specific
ks_id = opto_unit['ks_unit_id']

spike_times = unit_table['spike_times'][(unit_table['ks_unit_id']==ks_id)&(unit_table['device_name']==f'Probe{probe}')]
```

### Analysis table columns glossary
| Column name | Definition |
|----------|----------|
| ks_unit_id    | The cluster identifier given to a unit during spike sorting. Can be found in both the analysis and units tables.      |
| probe    | The label of the probe on which the unit was recorded     |
| probe_type    | the probe type (e.g. 'Passive' or 'Switchable')     |
| Spontaneous_i_spikes    | Spike times (in seconds) for the spontaneous activity epoch of a given index, i (e.g. 0, 1, etc)     |
| Spontaneous_i_spikes    | Spike times (in seconds) for the spontaneous activity epoch of a given index, i (e.g. 0, 1, etc). NaN if this epoch did not occur in the recording.     |
| RFMapping_i_spikes    | Spike times (in seconds) for the receptive field mapping epoch of a given index, i (e.g. 0, 1, etc). NaN if this epoch did not occur in the recording.     |
| mean_waveform     |       |
| Spontaneous_i_waveform    | The 384-channel average waveform (in microvolts) of spike that occurred in the spontaneous activity epoch of a given index, i (e.g. 0, 1, etc). NaN if this epoch did not occur in the recording.     |
| RFMapping_i_waveform    | The 384-channel average waveform (in $\mu$V) of spike that occurred in the receptive field mapping epoch of a given index, i (e.g. 0, 1, etc). NaN if this epoch did not occur in the recording.     |
| amplitude    | The spike amplitude (trough to peak, in $\mu$V) recording on the channel with the largest spike amplitude in the average spike waveform.     |
| duration    | The spike duration (trough to peak, in ms) of the average spike waveform.     |
| peak_trough_ratio    | The absolute value of the ratio of the amplitudes found at the spike trough and post-trough peak voltage in the average spike waveform.     |
| pre_peak_trough_ratio    | he absolute value of the ratio of the amplitudes found at the spike trough and pre-trough peak voltage in the average spike waveform.     |
| repolarization_slope    | The slope of the voltage from the trough to the peak.     |
| recovery_slope    | The slope of the voltage from the peak back to baseline (typically 0 $\mu$V).     |
| avg_ISI    | The average interspike interval (in seconds) taken across all spike, excluding those during the optotagging epochs.     |
| baseline_FR    | the average firing rate of spikes taken in the 200 ms window before each optotagging stimulus (used for optotagged neuron identification).     |
| evoked_FR    | the average firing rate of spikes taken in the optotagging stimulus window duration (used for optotagged neuron identification).     |
| footprint    | The average radius (in $\mu$m) of the spike waveform across the surface the probe before attenuating into noise.    |
| layer    | The cortical layer a given unit was found in.     |
| region    | The cortical area a given unit was found in.     |
| optotagged    | Whether a unit was found to reliably be excited by a photostimulus. 0 for not optotagged, 1 for optotagged.     |
| Cell type    | The putative cell type for a give unit. Can be "Sim1", "Tlx3", 'RS', 'FSl', or 'FSs'.     |
| spread    | The vertical spread (in $\mu$m) of a spike waveform along the column of electrodes containing peak amplitude channel.     |
| bAP_extent    | The distance traveled (in $\mu$m) of a detected back-propagating action potential in the average spike waveform.     |
| bAP_attenuation    | The proportion of the maximum amplitude spike that a bAP attenuates by before falling below noise (~10 $\mu$V).     |
| bAP_idx    | The product of the bAP extent and one minus the bAP attenuation.     |
| burst_idx    | The ratio of the number of detected burst events to the total number of spikes.   |
| num_bursts    | The total number of detected burst events.     |
| burst_dur    | The average duration of a burst (in ms)     |
| burst_proportion    | The proportion of spikes allocated to burst events.     |

## Experimental epochs
You may wish to know the time points at which different parts of the experimental session took place. For instance, you may wish to know when the pre- and post-injection spontaneous activity epochs took place, you can call the epoch table as:

```{code-cell} ipython3
# get the different epochs and their beginning and end times
epochs = nwbfile_zarr.stimulus['epochs'].to_dataframe()
```

## Stimulus data
The visual stimulus used during these experiments were Gabor patches presented at various orientations and locations on the screen during receptive field mapping epochs. To find trial-specific information for visual stimuli:

```{code-cell} ipython3
# load the stimulus table
stimulus_table = nwbfile_zarr.stimulus['visualstim'].to_dataframe()
```

Optotagging laser stimuli parameters, timing, and additional data can be accessed by:

```{code-cell} ipython3
# load the photostim table
stimulus_table = nwbfile_zarr.stimulus['photostim'].to_dataframe()
```