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
import pynwb
import pandas as pd
import matplotlib.pyplot as plt
%matplotlib inline
```

```{code-cell} ipython3 
nwb_path = r'/data/409828_2018-11-27_12-29-05_filtered_2026-04-09_05-50-36/409828_2018-11-27_12-29-05.nwb.zarr'


nwbfile = pynwb.read_nwb(nwb_path)
```

As always, exploring the content of the nwb file directly will help you find the key pieces of the asset.

```{code-cell} ipython3 
nwbfile
```

The physiology and behavior data is found in the `processing` container of the NWB file. There are six planes imaged simultaneously in each session, and the data for each is in the `plane-x` folder (where x is the plane index).

## Max Projection
The max projection is in the `images` folder for each plane.

```{code-cell} ipython3
# e.g. for plane-0
max_projection = nwbfile.processing['plane-0'].data_interfaces['images'].images['max_projection_denoised_plane-0']
plt.imshow(max_projection, cmap='Grays_r')
```

## Image Segmentation Table

During processing, a segmentation algorithm was applied to the raw fluorescence data to extract ROIs for detected neurons. The extracted ROIs are accessible in the form of image masks, a sparse array with non-zero values where the ROI is masked out in the imaging plane. The detected ROIs are run through a soma/dendrite classifier to confirm if the ROI masks fit certain features of a soma or dendrite. The data in these NWB files have been filtered to only the ROIs that are thought to be soma. This information is stored in the `image_segmentation` table for each plane in the `processing` container.

```{code-cell} ipthon3
image_segmentation = nwbfile.processing['plane-0'].data_interfaces['image_segmentation'].plane_segmentations['roi_table'].to_dataframe()
image_segmentation.head()
```

| Column    | Description |
| -------- | ------- |
| column | the column this session is in |
| volume | the volume this session is in |
| plane | the plane index for this plane |
| roi | the roi ID of the ROI. This is not a universal ID but unique to this column, volume and plane. This is the key for matching functional and structural data. |
| pika_roi_id | an ID generated during processing. Ignore this. |
| pika_roi_confidence | a segmentation confidence metrics generated during processing. Ignore this. |
| is_soma | boolean identifying rois that are soma. |
| pixel_mask | Sparse representation of the mask for this roi. A list of tuples with (x,y,value) for all pixels where value=1 |

```{note} 
The column, volume, plane, roi are used together to link activity traces with EM data.
```

## Cell Activity Traces

Each plane contains several arrays for the neural activity including "raw", "neuropil_fluorescence", "neuropil_corrected", "demixed", "dff", and "events". These represent sequential steps of data processing. The dff is recommended for most analyses. 

```{code-cell} ipython3
dff = nwbfile.processing['plane-0'].data_interfaces['dff'].data[:]
timestamps = nwbfile.processing['plane-0'].data_interfaces['dff'].timestamps[:]
```

The dff array has shape # timestamps, # cells.

```{code-cell} ipython3
plt.plot(ts, dff[:,0])
plt.xlabel("Time (s)")
plt.ylabel("DFF (%)")
```

You can confirm the imaging rate of each plane:

```{code-cell} ipython3
frame_rate = nwbfile.imaging_planes["plane-0"].imaging_rate
print("Frame rate: ", frame_rate)
```

## Running Speed

The running speed is in the "behavior" folder within the `processing` container. This is a timeseries object.

```{code-cell} ipython3
run = nwbfile.processing['behavior'].data_interfaces['running_speed'].data[:]
ts = nwbfile.processing['behavior'].data_interfaces['running_speed'].timestamps[:]

plt.plot(ts, run)
plt.xlabel("Time (s))
plt.ylabel("Speed (cm/s)")
```

## Eye Tracking

Eye tracking data is similarly found in the "behavior" folder. While this is also time-based data, it is stored in a dataframe. Eye tracking uses information of the eye, the pupil, and a corneal reflection (cr) of an IR led to compute the area and of the pupil and its position.

```{code-cell} ipython3
eye = nwbfile.processing['behavior'].data_interfaces['eye_tracking'].to_dataframe()
eye.head()
```

| Column    | Description |
| -------- | ------- |
| timestamps | timestamps for all other series |
| cr_area | area of the corneal reflection |
| eye_area | area of the eye |
| pupil_area | area of the pupil |
| likely blink | boolean indicating with it is likely to be a blink |
| cr_center_x | center of the corneal reflection x position |
| cr_center_y | center of the corneal reflection y position |
| cr_width | width of the corneal reflection |
| cr_height | height of the corneal reflection |
| cr_phi |  |
| eye_center_x | center of the eye x position |
| eye_center_y | center of the eye y position | 
| eye_width | width of the eye |
| eye_height | width of the eye |
| eye_phi |  |
| pupil_center_x | center of the pupil x position |
| pupil_center_y | center of the pupil y position |
| pupil_width | width of the pupil |
| pupil_height | height of the pupil |
| pupil_phi |  | 


```{code-cell} ipython
plt.plot(eye.timestamps, eye.pupil_area)
plt.xlim(400,800)
plt.xlabel("Time (s)")
plt.ylabel("Pupil area (pixel^2)")
```

## Stimulus Epoch Table

The epoch table contains the start and stop times/frames for each stimulus epoch. This is in the `intervals` container of the NWB file. You can use the epoch table with the dff array to pull and compare neural activity across different stimulus epochs. 

```{code-cell} ipython3
epoch_table = nwbfile.intervals['epochs'].to_dataframe()
epoch_table.head()
```

| Column    | Description |
| -------- | ------- |
| stim_name  | stimulus name for the epoch  |
| start_time    | epoch start (sec)  |
| stop_time   | epoch end (sec)  |
| duration  | epoch duration (sec)  |


You can get a list of the unique stimuli in this session. You can learn more about these [here](V1DD-stimuli.md).

```{code-cell} ipython3
epoch_table['stim_name'].unique()
```

## Stimulus Table

There is a single stimulus table for all of the stimuli in the sesison for this dataset, which is also found in the `intervals` container. Because all of the stimuli are represented in the same table, there are many columns that only apply to specific stimuli.

```{code-cell} ipython3
stim_table = nwbfile.intervals['stimulus_table'].to_dataframe()
stim_table.head()
```

| Column    | Description | Stimulus |
| -------- | ------- | -------- |
| stim_name | stimulus name | all |
| start_time | trial start time (sec) | all |
| stop_time | trial stop time (sec) | all |
| temporal_frequency | grating temporal frequency for trial (Hz) | drifting gratings windowed and full |
| spatial_frequency | grating spatial frequency for trial (cpd) | drifting gratings windowed and full |
| center_azimuth | azimuth center of window (deg) | drifting gratings windowed |
| center_elevation | elevation center of window (deg) | drifting gratings windowed |
| direction | grating direction (deg) | drifitng gratings windowed and full |
| frame | frame of the stimulus movie | natural movies and locally sparse noise |
| image_order | order of image presentation | natural images and natural images 12 |
| image_index | index of the natural image presented | natural images and natural images 12 |
| stimulus_condition_id | ID for each unique trial type | all |


## Stimulus Templates

The stimulus images that were presented are stored in the `stimulus` container. These are for the natural images, natural movies, and locally sparse noise. The drifting gratings stimuli were generated programmatically and have no template. Each image or movie frame is stored in its respective "images" folder using its index or frame (from the stimulus table) as a string.

```{code-cell} ipython3 
index = 20
image = nwbfile.stimulus['natural_images'].images[str(index)]
plt.imshow(image, cmap='Grays_r')

```

```{code-cell} ipython3 
frame = 1004
image = nwbfile.stimulus['natural_movie'].images['1004']
plt.imshow(image, cmap='Grays_r')
```
