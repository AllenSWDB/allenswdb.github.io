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

# Accessing Visual Coding Neuropixels data

This tutorial walks through the basic contents of a Visual Coding Neuropixels session NWB file: the units table, stimulus presentation intervals, running speed, optotagging protocol, and LFP data. 

Visual Coding Neuropixels sessions are stored as NWB files, so the main dependency is PyNWB. Pandas and NumPy are useful for working with the tables and arrays stored in the file.

```{code-cell} ipython3
import pynwb
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
%matplotlib inline
```

## Loading a session

Each session is stored as a single NWB file. Pointing `pynwb.read_nwb` at the file returns an `NWBFile` object which we can use to explore the file contents.

```{code-cell} ipython3
nwb_path = "/data/387858_2018-07-12_13-56-26_nwb_2026-08-19_07-52-55/387858_2018-07-12_13-56-26_nwb_2026-08-19_07-52-55.nwb.zarr"
nwbfile = pynwb.read_nwb(nwb_path)
nwbfile
```

## Units

The "units" from an electrophysiological recording are the outputs of a clustering algorithm (in this case, Kilosort), which assigns each spike detected in the voltage traces to a unique neuron. The units table has one row per unit and contains spike times, waveforms, quality-control metrics, anatomical location, and a large set of precomputed visual-response metrics (one per stimulus family) for every sorted unit in the session.


| Column | Description |
| --- | --- |
| waveform_duration | Difference (in ms) of the time of the waveform peak and trough on the channel with maximum amplitude. |
| cluster_id | unique identifier for unit (from spike sorting) |
| peak_channel_id | Channel ID with the maximum amplitude waveform for this unit. |
| cumulative_drift | Cumulative change in spike depth during recording |
| amplitude_cutoff | Approximation of the unit false negative rate based on the spike amplitude distribution. Values closer to 0.5 indicate >50% of spikes may be missing. |
| snr | Signal-to-noise ratio. Ratio between the waveform amplitude and 2x the standard deviation of the residual waveforms. |
| recovery_slope | Slope of the recovery of 1D waveform (waveform on peak channel) to baseline after repolarization (coming down from peak). |
| isolation_distance | Take the center of the cluster in PC space and compute the Mahalanobis distance squared required to find the same number of "other" spikes as the total number of spikes for the unit. The better the cluster quality, the higher the isolation distance. |
| nn_miss_rate | Fraction of spikes from other units that have their nearest neighbors belonging to this unit. |
| silhouette_score | Standard metric of cluster quality computed by pairwise comparison between the PCs of the cluster and PCs of all other units with overlapping channels. Minimum silhouette score across all pairs (between -1 and 1, with 1 indicating perfect isolation). |
| velocity_above | Slope of spike propagation velocity traveling in dorsal direction from soma (note to avoid infinite values, this is actually the inverse of velocity: ms/mm). |
| quality | Label assigned based on waveform shape. Either "good" for physiological waveforms or "noise" for artifactual waveforms. |
| PT_ratio | Ratio of peak amplitude to trough amplitude for the 1D waveform (waveform on peak channel). |
| l_ratio | Sum of (1 - chi^2 CDF) for "other" spikes within the isolation distance sphere, divided by total "other" spikes. Lower values indicate better isolation. |
| velocity_below | Slope of spike propagation velocity traveling in ventral direction from soma (note to avoid infinite values, this is actually the inverse of velocity: ms/mm). |
| max_drift | Maximum range of the median peak channel within 51 s intervals throughout the session. Used to identify sessions with high probe motion. |
| isi_violations | Relative firing rate of contaminating spikes based on refractory period violations (<1.5 ms). Indicates whether unit contains spikes from multiple neurons. |
| firing_rate | Overall firing rate N/T, where N = number of spikes in the complete session and T = total time of the recording session in seconds. |
| amplitude | Difference (in microvolts) between the peak and trough of the waveform on a single channel. |
| spread | Spatial extent (in microns) of channels where the waveform amplitude exceeds 12% of the peak amplitude. |
| waveform_halfwidth |  |
| d_prime | Separability of the unit from all other units based on linear discriminant analysis in PC space. |
| presence_ratio | Fraction of 100 equal-sized time blocks that include 1 or more spikes from the unit. Units with low presence ratio likely drifted out of the recording, or could not be tracked by Kilosort2 for the duration of the experiment. |
| repolarization_slope | Maximum slope of the 1D waveform (waveform on peak channel) to baseline after trough. |
| nn_hit_rate | Fraction of the four nearest spikes in PC space that belong to this unit. |
| spike_times | times (s) of detected spiking events |
| spike_amplitudes | amplitude (s) of detected spiking events |
| waveform_mean | mean waveforms on peak channels (and over samples) |
| c50_dg | Contrast at half-maximum response (C50) from the contrast-response function during drifting gratings. |
| area_rf | Receptive-field area during receptive-field (gabor) mapping. |
| fano_dg | Fano factor (spike-count variance divided by mean) during drifting gratings. |
| fano_fl | Fano factor (spike-count variance divided by mean) during full-field flashes. |
| fano_ns | Fano factor (spike-count variance divided by mean) during natural scenes. |
| fano_rf | Fano factor (spike-count variance divided by mean) during receptive-field (gabor) mapping. |
| fano_sg | Fano factor (spike-count variance divided by mean) during static gratings. |
| f1_f0_dg | Ratio of the first harmonic to the mean (F1/F0) response during drifting gratings. |
| g_dsi_dg | Global direction-selectivity index during drifting gratings. |
| g_osi_dg | Global orientation-selectivity index during drifting gratings. |
| g_osi_sg | Global orientation-selectivity index during static gratings. |
| width_rf | Receptive-field width during receptive-field (gabor) mapping. |
| height_rf | Receptive-field height during receptive-field (gabor) mapping. |
| azimuth_rf | Receptive-field center azimuth during receptive-field (gabor) mapping. |
| mod_idx_dg | Modulation index during drifting gratings. |
| p_value_rf | Significance (p-value) of the receptive-field map during receptive-field (gabor) mapping. |
| pref_sf_sg | Preferred spatial frequency during static gratings. |
| pref_tf_dg | Preferred temporal frequency during drifting gratings. |
| run_mod_dg | Running modulation (response change between running and stationary) during drifting gratings. |
| run_mod_fl | Running modulation (response change between running and stationary) during full-field flashes. |
| run_mod_ns | Running modulation (response change between running and stationary) during natural scenes. |
| run_mod_rf | Running modulation (response change between running and stationary) during receptive-field (gabor) mapping. |
| run_mod_sg | Running modulation (response change between running and stationary) during static gratings. |
| pref_ori_dg | Preferred orientation during drifting gratings. |
| pref_ori_sg | Preferred orientation during static gratings. |
| run_pval_dg | Significance (p-value) of the running modulation during drifting gratings. |
| run_pval_fl | Significance (p-value) of the running modulation during full-field flashes. |
| run_pval_ns | Significance (p-value) of the running modulation during natural scenes. |
| run_pval_rf | Significance (p-value) of the running modulation during receptive-field (gabor) mapping. |
| run_pval_sg | Significance (p-value) of the running modulation during static gratings. |
| elevation_rf | Receptive-field center elevation during receptive-field (gabor) mapping. |
| on_screen_rf | Degree to which the receptive field falls on the stimulus screen during receptive-field (gabor) mapping. |
| pref_image_ns | Preferred image index during natural scenes. |
| pref_phase_sg | Preferred phase during static gratings. |
| firing_rate_dg | Mean firing rate during drifting gratings. |
| firing_rate_fl | Mean firing rate during full-field flashes. |
| firing_rate_ns | Mean firing rate during natural scenes. |
| firing_rate_rf | Mean firing rate during receptive-field (gabor) mapping. |
| firing_rate_sg | Mean firing rate during static gratings. |
| on_off_ratio_fl | On/off response ratio during full-field flashes. |
| time_to_peak_fl | Time to peak response during full-field flashes. |
| time_to_peak_ns | Time to peak response during natural scenes. |
| time_to_peak_rf | Time to peak response during receptive-field (gabor) mapping. |
| time_to_peak_sg | Time to peak response during static gratings. |
| pref_sf_multi_sg | Preferred spatial frequency during static gratings. Estimated from the combined multi-stimulus analysis. |
| pref_tf_multi_dg | Preferred temporal frequency during drifting gratings. Estimated from the combined multi-stimulus analysis. |
| sustained_idx_fl | Sustained-response index during full-field flashes. |
| pref_ori_multi_dg | Preferred orientation during drifting gratings. Estimated from the combined multi-stimulus analysis. |
| pref_ori_multi_sg | Preferred orientation during static gratings. Estimated from the combined multi-stimulus analysis. |
| pref_phase_multi_sg | Preferred phase during static gratings. Estimated from the combined multi-stimulus analysis. |
| image_selectivity_ns | Image selectivity during natural scenes. |
| pref_images_multi_ns | Preferred image index during natural scenes. Estimated from the combined multi-stimulus analysis. |
| lifetime_sparseness_dg | Lifetime sparseness during drifting gratings. |
| lifetime_sparseness_fl | Lifetime sparseness during full-field flashes. |
| lifetime_sparseness_ns | Lifetime sparseness during natural scenes. |
| lifetime_sparseness_rf | Lifetime sparseness during receptive-field (gabor) mapping. |
| lifetime_sparseness_sg | Lifetime sparseness during static gratings. |
| anterior_posterior_ccf_coordinate | Anterior-posterior position of this unit's peak channel in the Allen CCFv3 (microns); NaN if the channel is out of brain or unregistered. |
| dorsal_ventral_ccf_coordinate | Dorsal-ventral position of this unit's peak channel in the Allen CCFv3 (microns); NaN if the channel is out of brain or unregistered. |
| left_right_ccf_coordinate | Left-right position of this unit's peak channel in the Allen CCFv3 (microns); NaN if the channel is out of brain or unregistered. |
| ecephys_structure_id | Allen CCFv3 structure ID of the brain region containing this unit's peak channel (numeric counterpart of the 'ecephys_structure_acronym'); NaN if the channel is out of brain or unassigned. |
| ecephys_structure_acronym | Acronym of the Allen CCFv3 brain structure containing this unit's peak channel (the unit's recorded location); empty if the channel is out of brain or unassigned. |
| probe_horizontal_position | Horizontal (across-probe) position (microns) of this unit's peak channel. |
| probe_vertical_position | Distance (microns) from the probe tip to this unit's peak channel along the probe. |
| ecephys_probe_id | Identifier of the Neuropixels probe that recorded this unit (the probe of its peak channel). |

```{code-cell} ipython3
units = nwbfile.units[:]
units
```

### Spike times

The `spike_times` column contains one array per unit with the times (in seconds, aligned to the start of the session) of every detected spike for that unit. This is the main entry point for building rasters, PSTHs, and firing-rate summaries.

```{code-cell} ipython3
spike_times = units.spike_times
spike_times
```

### Filtering by quality and brain structure

Two columns are useful for narrowing down units for further analysis:

- `quality`: overall quality label assigned by spike sorting (typically `good` or `noise`).
- `ecephys_structure_acronym`: the CCF-annotated brain structure the unit is located in.

```{code-cell} ipython3
pd.crosstab(units.ecephys_structure_acronym, units.quality, margins=True).sort_values("good", ascending=False)
```

## Stimulus presentations

In place of a single stimulus trials table, Visual Coding Neuropixels sessions organize behavior around **stimulus presentation intervals**. Each stimulus family (drifting gratings, static gratings, natural scenes, natural movies, gabors for receptive-field mapping, full-field flashes, and spontaneous activity) has its own intervals table with one row per stimulus sweep. Use these tables to select trials of interest and align spike times to stimulus events.

```{code-cell} ipython3
list(nwbfile.intervals)
```

For detailed information about the stimuli and corresponding intervals tables, see the [stimulus page](https://allenswdb.github.io/physiology/ophys/visual-coding/vc2p-stimuli.html). 

## Running speed

The mouse is head-fixed on a running wheel and is free to run throughout the session. An encoder on the wheel provides a continuous running-speed time series stored in the `running` processing module.

```{code-cell} ipython3
nwbfile.processing["running"]
```

```{code-cell} ipython3
running_speed = nwbfile.processing["running"]["running_speed"].data[:]
running_timestamps = nwbfile.processing["running"]["running_speed"].timestamps[:]

plt.plot(running_timestamps, running_speed)
plt.ylabel('Speed (cm/s)')
plt.xlabel('Time (s)')
```

## Optotagging

In addition to the visual protocol, each session ends with an optotagging block: brief pulses of blue light are delivered to a Cre-dependent, ChR2-expressing population, and units are considered "tagged" if they respond at short latency. The `optotagging` processing module stores both the laser-pulse intervals and a timeseries description of the protocol.

### `optogenetic_stimulation` intervals

| Column | Description |
| --- | --- |
| start_time | start time of epoch (s) |
| condition | optogenetic stimulus condition |
| level | light level used for stimulation |
| stop_time | stop time of epoch (s) |
| stimulus_name | type of stimulus (e.g. pulse, ramp) |
| duration | length of stimulus (s) |
| tags | user-defined tags |
| timeseries | index into a Timeseries object |

```{code-cell} ipython3
opto = nwbfile.processing["optotagging"]["optogenetic_stimulation"].to_dataframe()
opto.head()
```

## LFP

For each probe, the acquisition group contains a downsampled local field potential (LFP) recording (`probe_<id>_lfp`). Each LFP is stored as a channel × time array with its own timestamps, and channels can be linked back to anatomy through the electrodes table.

```{code-cell} ipython3
lfp_keys = [k for k in nwbfile.acquisition if k.endswith("_lfp")]
lfp_keys
```

```{code-cell} ipython3
lfp = nwbfile.acquisition[lfp_keys[0]].electrical_series
lfp
```
