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

| Column | Description |
| --- | --- |
| activity_drift | Measure of drift in unit activity over the session |
| amplitude | Amplitude (µV) of the average spike waveform |
| amplitude_cutoff | Estimated fraction of spikes missing from this unit (default threshold = 0.1) |
| amplitude_cv_median | Median coefficient of variation of spike amplitudes |
| amplitude_cv_range | Range of coefficient of variation of spike amplitudes |
| amplitude_median | Median spike amplitude (µV) |
| ccf_ap | Anterior-posterior coordinate in Allen CCF atlas (µm) |
| ccf_dv | Dorsal-ventral coordinate in Allen CCF atlas (µm) |
| ccf_ml | Medial-lateral coordinate in Allen CCF atlas (µm) |
| cluster_id | Identifier for this unit assigned by the spike sorting algorithm (unique within each probe) |
| d_prime | Measure of how separable this unit's waveforms are from its neighbors' |
| decoder_label | Predicted cell type label from decoder |
| decoder_probability | Confidence of decoder cell type prediction [0-1] |
| default_qc | Whether the unit passes default quality control criteria |
| device_name | Name of the recording device |
| drift_mad | Median absolute deviation of unit drift |
| drift_ptp | Peak-to-peak amplitude of unit drift (µm) |
| drift_std | Standard deviation of unit drift |
| electrode_group_name | Name of the electrode group the unit was recorded from |
| exp_decay | Exponential decay of the autocorrelogram |
| firing_range | Range of firing rates across the session |
| firing_rate | Mean spike rate across the whole session (Hz) |
| half_width | Half-width of the mean spike waveform (s) |
| is_not_drift | Boolean indicating unit is not classified as a drift artifact |
| is_qc_pass | Boolean indicating unit passes quality control |
| isi_violations_count | Number of inter-spike interval violations (<1.5 ms) |
| isi_violations_ratio | Measure of unit contamination from refractory period violations (default threshold = 0.5) |
| isolation_distance | Distance to nearest cluster in Mahalanobis space; higher is better |
| l_ratio | Measure of how separable this unit's waveforms are from its neighbors'; lower is better |
| location | brain structure (acronym) |
| nn_hit_rate | Fraction of spikes with nearest neighbor from same cluster |
| nn_miss_rate | Measure of fraction of spikes missing from this unit |
| num_negative_peaks | Number of negative peaks in the mean spike waveform |
| num_positive_peaks | Number of positive peaks in the mean spike waveform |
| num_spikes | Total number of spikes detected for the unit |
| peak_channel | Channel index with the largest amplitude waveform |
| peak_electrode | Electrode index with the largest amplitude spike waveform |
| peak_to_valley | Time (s) between waveform peak and trough |
| peak_trough_ratio | Peak-to-trough ratio of the average spike waveform |
| presence_ratio | Fraction of the session over which this unit had spikes detected (default threshold = 0.9) |
| recovery_slope | Slope of the waveform between the trough and the peak (V/s) |
| repolarization_slope | Slope of the waveform back to 0 after the peak (V/s) |
| rp_contamination | Estimated contamination from refractory period violations |
| rp_violations | Number of refractory period violations |
| silhouette | Measure of unit contamination based on cluster separation |
| sliding_rp_violation | Sliding refractory period violation metric |
| snr | Ratio of waveform amplitude relative to background noise on the peak channel |
| spike_amplitudes | Array of individual spike amplitudes (µV) |
| spread | Distance the waveform extends above and below the peak channel (µm) |
| structure | Brain structure acronym where the unit was recorded |
| sync_spike_2 | Synchrony of unit spikes within 2 ms windows |
| sync_spike_4 | Synchrony of unit spikes within 4 ms windows |
| sync_spike_8 | Synchrony of unit spikes within 8 ms windows |
| unit_id | Unique UUID identifier for the unit |
| velocity_above | Speed of waveform propagation above the peak channel (V/s) |
| velocity_below | Speed of waveform propagation below the peak channel (V/s) |
| spike_times | Timestamps (s) of each detected spike for the unit |
| obs_intervals | Time intervals during which the unit was observed/recorded |
| electrode_group | The electrode group that each spike unit came from |

```{code-cell} ipython3
units = nwbfile.units[:]
units
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

| Column    | Description |
| -------- | ------- |
| start_time  | start time of epoch (s) |
| stop_time | stop time of epoch (s) |
| script_name |  the name of the TaskControl subclass that controlled stimulus presentation during the epoch   |
| notes   |  notes about the experiment or the data collected during the epoch  |
| interval_names  | names of other intervals tables that contain trial data from the epoch|
| tags  | user-defined tags|

```{code-cell} ipython3
epochs = nwbfile.intervals["epochs"].to_dataframe()
epochs.head()
```

## Trials

The Dynamic Routing task behavior is organized around trials. The trials table contains one row per trial with the trial timing and task variables such as stimulus identity, block context, whether a reward was delivered, and the animal's response. Use it to select trials of interest and align neural data to task events.

| Column | Description |
| --- | --- |
| start_time | Start time of epoch (s) |
| stop_time | Stop time of epoch (s) |
| quiescent_start_time | Start of pre-stimulus interval in which the subject does not lick; only the last quiescent interval (which was not violated) is included |
| quiescent_stop_time | End of pre-stimulus interval in which the subject does not lick; not equal to `stim_start_time`, which factors in processing and stimulus device latency |
| stim_start_time | Onset of visual or auditory stimulus |
| stim_stop_time | Offset of visual or auditory stimulus |
| response_window_start_time | Start of interval in which the subject should lick if a GO trial, otherwise should not lick |
| response_window_stop_time | End of interval in which the subject should lick if a GO trial, otherwise should not lick |
| task_control_response_time | Time of first lick in trial according to the task control script; nan if no response registered |
| response_time | Time of first lick within the response window; nan if no lick occurred |
| reward_time | Delivery time of water reward, for contingent and non-contingent rewards |
| post_response_window_start_time | Start of null interval in which the subject awaits a new trial |
| post_response_window_stop_time | End of null interval |
| stim_name | The stimulus presented; corresponds to a unique stimulus definition, randomized over trials |
| grating_phase | Phase of the visual grating in cycles; 0 or 0.5 for visual stimuli; nan for auditory stimuli |
| block_index | 0-indexed block number, increments with each block |
| rewarded_modality | Name of the rewarded modality in each block; not an exact correspondence with values in `stim_name` |
| trial_index | 0-indexed trial number |
| trial_index_in_block | 0-indexed trial number within the block |
| repeat_index | Number of times the trial has already been presented in immediately preceding trials; nan for catch trials |
| is_response | The subject licked one or more times during the response window |
| is_correct | The subject acted correctly in the response window; includes correct reject for catch trials |
| is_incorrect | The subject acted incorrectly in the response window; includes false alarm for catch trials |
| is_hit | The subject responded in a GO trial |
| is_false_alarm | The subject responded in a NOGO trial; excludes catch trials |
| is_correct_reject | The subject did not respond in a NOGO trial; excludes catch trials |
| is_miss | The subject did not respond in a GO trial |
| is_go | Condition in which the subject should respond; target stim presented in rewarded block |
| is_nogo | Condition in which the subject should not respond; excludes catch trials |
| is_rewarded | The subject received a reward; includes non-contingent rewards |
| is_noncontingent_reward | The subject received a reward that did not depend on its response |
| is_contingent_reward | The subject received a reward for a correct response |
| is_reward_scheduled | A non-contingent reward was scheduled to occur regardless of whether it was delivered |
| is_instruction | Stimulus specifically chosen to inform the subject of a change in rewarded modality |
| is_aud_stim | An auditory stimulus was presented; excludes catch trials |
| is_vis_stim | A visual stimulus was presented; excludes catch trials |
| is_catch | No stimulus was presented |
| is_target | A stimulus was presented that the subject should respond to only in a specific block |
| is_aud_target | An auditory stimulus the subject should respond to only in a specific block |
| is_vis_target | A visual stimulus the subject should respond to only in a specific block |
| is_nontarget | A stimulus the subject should never respond to |
| is_aud_nontarget | An auditory stimulus the subject should never respond to |
| is_vis_nontarget | A visual stimulus the subject should never respond to |
| is_vis_rewarded | Visual target stimuli are rewarded |
| is_aud_rewarded | Auditory target stimuli are rewarded |
| is_block_switch | The first trial with a stimulus after a change in rewarded modality |
| is_repeat | The trial is a repetition of the previous trial due to a miss |
| is_opto | Optogenetic inactivation was applied during the trial |
| is_task_control_correct | The task control script interpreted the subject's response correctly; where False, `is_hit` or `is_miss` may be incorrect |


```{code-cell} ipython3
trials = nwbfile.trials.to_dataframe()
trials.head()
```

### Performance

The `performance` intervals table summarizes behavioral performance at the block level (rather than per trial), which is useful when comparing behavior across the alternating auditory- and visual-rewarded contexts.

| Column | Description |
| --- | --- |
| start_time | Start time of epoch (s) |
| stop_time | Stop time of epoch (s) |
| block_index | Presentation position of the block in the task (0-indexed) |
| n_trials | The number of trials in the block |
| n_responses | The number of responses the subject made in trials in the block |
| n_hits | The number of correct responses the subject made in GO trials in the block (excluding trials with scheduled reward) |
| n_contingent_rewards | The number of rewards the subject received for correct responses in the block |
| hit_rate | The proportion of correct responses the subject made in GO trials in the block (excluding trials with scheduled reward) |
| false_alarm_rate | The proportion of incorrect responses the subject made in NOGO trials in the block |
| catch_response_rate | The proportion of responses the subject made in catch trials in the block |
| rewarded_modality | The modality of the target stimulus that was rewarded in the block: normally `vis` or `aud` |
| is_first_block_aud | Whether the rewarded modality of the first block in the task was auditory |
| cross_modality_dprime | dprime across modalities; hits=response rate to rewarded target stimulus, false alarms=response rate to non-rewarded target stimulus |
| signed_cross_modality_dprime | Same as `cross_modality_dprime` but with negative values for auditory blocks |
| vis_dprime | dprime within visual modality; hits=response rate to visual target stimulus, false alarms=response rate to visual non-target stimulus |
| aud_dprime | dprime within auditory modality; hits=response rate to auditory target stimulus, false alarms=response rate to auditory non-target stimulus |
| vis_target_response_rate | The proportion of responses the subject made to visual target stimulus trials in the block (excluding trials with scheduled reward) |
| vis_nontarget_response_rate | The proportion of responses the subject made to visual nontarget stimulus trials in the block (excluding trials with scheduled reward) |
| aud_target_response_rate | The proportion of responses the subject made to auditory target stimulus trials in the block (excluding trials with scheduled reward) |
| aud_nontarget_response_rate | The proportion of responses the subject made to auditory nontarget stimulus trials in the block (excluding trials with scheduled reward) |

```{code-cell} ipython3
performance = nwbfile.intervals["performance"].to_dataframe()
performance.head()
```

## Behavior data

Along with the task-level tables, each session includes continuous behavioral measurements of running speed, eye tracking, and behavior keypoint tracking collected while the mouse performs the task. These live in the behavior module of the  `nwbfile.processing.behavior` container.

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

| Column | Description |
| --- | --- |
| cr_center_x | Center of the corneal reflection x position |
| cr_center_y | Center of the corneal reflection y position |
| cr_width | Width of the corneal reflection |
| cr_height | Height of the corneal reflection |
| cr_phi | Rotation angle of the corneal reflection ellipse relative to horizontal-axis of video, in radians |
| cr_average_confidence |Mean confidence [0-1] for the up-to-12 points from DLC used to fit corneal reflection ellipse |
| cr_area | Area of the corneal reflection |
| cr_is_bad_frame | Flag indicating the corneal reflection fit is unreliable for this frame |
| eye_center_x | Center of the eye x position |
| eye_center_y | Center of the eye y position |
| eye_width | Width of the eye |
| eye_height | Height of the eye |
| eye_phi | Rotation angle of the eye ellipse relative to horizontal-axis of video, in radians |
| eye_average_confidence | Mean confidence [0-1] for the up-to-12 points from DLC used to fit eye ellipse |
| eye_area | Area of the eye |
| eye_is_bad_frame | Flag indicating the eye ellipse fit is unreliable for this frame |
| pupil_center_x | Center of the pupil x position |
| pupil_center_y | Center of the pupil y position |
| pupil_width | Width of the pupil |
| pupil_height | Height of the pupil |
| pupil_phi |Rotation angle of the pupil ellipse relative to horizontal-axis of video, in radians |
| pupil_average_confidence | Mean confidence [0-1] for the up-to-12 points from DLC used to fit pupil ellipse |
| pupil_area | Area of the pupil |
| pupil_is_bad_frame | Flag indicating the pupil ellipse fit is unreliable for this frame |
| timestamps | Timestamps for all other series | 



```{code-cell} ipython3
eye_tracking = nwbfile.processing['behavior']['eye_tracking'][0:10] # large table, so just getting the first 10 rows 
eye_tracking
```

### Behavior keypoint tracking

Keypoint tracking uses [Lightning Pose](https://github.com/danbider/lightning-pose) on video from a front and a side camera to track anatomical landmarks (ear, nose, whisker pad, etc.) over the session. Each camera produces its own table with one row per video frame.

| Column | Description |
| --- | --- |
| ear_base_l_x | Left ear base x coordinate (px) |
| ear_base_l_y | Left ear base y coordinate (px) |
| ear_base_l_likelihood | Left ear base model confidence [0-1] |
| ear_base_l_pca_error | Left ear base PCA error (px) |
| ear_base_l_temporal_norm | Left ear base temporal norm (px) |
| ear_tip_l_x | Left ear tip x coordinate (px) |
| ear_tip_l_y | Left ear tip y coordinate (px) |
| ear_tip_l_likelihood | Left ear tip model confidence [0-1] |
| ear_tip_l_pca_error | Left ear tip PCA error (px) |
| ear_tip_l_temporal_norm | Left ear tip temporal norm (px) |
| eye_bottom_l_x | Left eye bottom x coordinate (px) |
| eye_bottom_l_y | Left eye bottom y coordinate (px) |
| eye_bottom_l_likelihood | Left eye bottom model confidence [0-1] |
| eye_bottom_l_pca_error | Left eye bottom PCA error (px) |
| eye_bottom_l_temporal_norm | Left eye bottom temporal norm (px) |
| eye_top_l_x | Left eye top x coordinate (px) |
| eye_top_l_y | Left eye top y coordinate (px) |
| eye_top_l_likelihood | Left eye top model confidence [0-1] |
| eye_top_l_pca_error | Left eye top PCA error (px) |
| eye_top_l_temporal_norm | Left eye top temporal norm (px) |
| jaw_x | Jaw x coordinate (px) |
| jaw_y | Jaw y coordinate (px) |
| jaw_likelihood | Jaw model confidence [0-1] |
| jaw_pca_error | Jaw PCA error (px) |
| jaw_temporal_norm | Jaw temporal norm (px) |
| nose_tip_x | Nose tip x coordinate (px) |
| nose_tip_y | Nose tip y coordinate (px) |
| nose_tip_likelihood | Nose tip model confidence [0-1] |
| nose_tip_pca_error | Nose tip PCA error (px) |
| nose_tip_temporal_norm | Nose tip temporal norm (px) |
| nostril_l_x | Left nostril x coordinate (px) |
| nostril_l_y | Left nostril y coordinate (px) |
| nostril_l_likelihood | Left nostril model confidence [0-1] |
| nostril_l_pca_error | Left nostril PCA error (px) |
| nostril_l_temporal_norm | Left nostril temporal norm (px) |
| tongue_base_l_x | Left tongue base x coordinate (px) |
| tongue_base_l_y | Left tongue base y coordinate (px) |
| tongue_base_l_likelihood | Left tongue base model confidence [0-1] |
| tongue_base_l_pca_error | Left tongue base PCA error (px) |
| tongue_base_l_temporal_norm | Left tongue base temporal norm (px) |
| tongue_tip_x | Tongue tip x coordinate (px) |
| tongue_tip_y | Tongue tip y coordinate (px) |
| tongue_tip_likelihood | Tongue tip model confidence [0-1] |
| tongue_tip_pca_error | Tongue tip PCA error (px) |
| tongue_tip_temporal_norm | Tongue tip temporal norm (px) |
| whisker_pad_l_side_x | Left whisker pad side x coordinate (px) |
| whisker_pad_l_side_y | Left whisker pad side y coordinate (px) |
| whisker_pad_l_side_likelihood | Left whisker pad side model confidence [0-1] |
| whisker_pad_l_side_pca_error | Left whisker pad side PCA error (px) |
| whisker_pad_l_side_temporal_norm | Left whisker pad side temporal norm (px) |
| whisker_pad_l_top_x | Left whisker pad top x coordinate (px) |
| whisker_pad_l_top_y | Left whisker pad top y coordinate (px) |
| whisker_pad_l_top_likelihood | Left whisker pad top model confidence [0-1] |
| whisker_pad_l_top_pca_error | Left whisker pad top PCA error (px) |
| whisker_pad_l_top_temporal_norm | Left whisker pad top temporal norm (px) |
| timestamps | Frame exposure start time (s) |

```{code-cell} ipython3
front_camera = nwbfile.processing['behavior']['lp_front_camera'][0:10] # taking a small slice of the table to display 
front_camera
```

```{code-cell} ipython3
side_camera = nwbfile.processing['behavior']['lp_side_camera'][0:10] 
side_camera
```

