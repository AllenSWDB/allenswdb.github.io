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
```{code-cell} ipython3
import pynwb
import numpy as np
import matplotlib.pyplot as plt
%matplotlib inline
```


# Getting data from a session

We're going to examine the data available for a single session. We load this using pynwb. This loads all of the data available for this session.

```{code-cell} ipython3
nwb_path = r'/data/222426_2016-02-04_10-25-24_nwb_2026-08-19_17-50-08/222426_2016-02-04_10-25-24_nwb_2026-08-19_17-50-08.nwb.zarr'

nwbfile = pynwb.read_nwb(nwb_path)
```

```{code-cell} ipython3
nwbfile
```

 Let's explore:

(maximum_projection)=
## Maximum projection
This is the projection of the full motion corrected movie. It shows all of the cells imaged during the session.

```{code-cell} ipython3
max_projection = nwbfile.processing['ophys'].data_interfaces['SummaryImages'].images['maximum_intensity_projection'][:]
```

```{code-cell} ipython3
fig = plt.figure(figsize=(6,6))
plt.imshow(max_projection, cmap='gray')
plt.axis('off')
```

(roi_mask)=
## ROI Masks
{term}`ROI`s are all of the segmented masks for cell bodies identified in this session. These are stored in the `PlaneSegmentation` table using a sparse array. 

```{code-cell} ipython3
seg = nwbfile.processing["ophys"]["ImageSegmentation"]["PlaneSegmentation"].to_dataframe()
seg.head()
```

Let's look at how this is represented. Each mask is a list of (x,y,weight) for only the pixels where the ROI mask is located.

```{code-cell} ipython3
seg['pixel_mask'][517473350]
```

Plot the masks for all the ROIs.

```{code-cell} ipython3
rois = np.zeros((512,512))
for index,row in seg.iterrows():
    for x, y, weight in row.pixel_mask:
        rois[int(x), int(y)] = weight

plt.imshow(rois)
```

Knowing the location of a neuron is valuable if you want to examine the spatial relationships between neurons. For instance, you can calculate the center of an ROI (take the mean of the x and y pixel locations) and use that to measure the distance between two neurons.

## Fluorescence and DF/F traces
The NWB file contains a number of traces reflecting the processing that is done to the extracted fluorescence before we analyze it. The fluorescence traces are the mean fluorescence of all the pixels contained within a ROI mask. In addition to the raw fluorescence, there are also neuropil corrected traces, demixed traces, and DF/F traces. 

The signal we are most interested in is the {term}`DFF` - the change in fluorescence normalized by the baseline fluorescence. The baseline fluorescence was computed as the median fluorescence in a 180s window centered on each time point. The result is the dff trace:

```{code-cell} ipython3
dff_series = nwbfile.processing["ophys"]["DfOverF"]["DfOverF"]
dff = dff_series.data[:].T  # Transpose to get (n_cells, n_timepoints)
ts = dff_series.timestamps[:]

fig = plt.figure(figsize=(8,3))
plt.plot(ts, dff[122,:], color='gray')
plt.xlabel("Time (s)")
plt.xlim(1900,2200)
plt.ylabel("DFF")
```

(extracted_events)=
## Extracted events
In addition to these traces, we also provide {term}`event`s extracted from the DF/F traces using the L0 method developed by Sean Jewell and Daniella Witten. 

```{code-cell} ipython3
# Get DfOverF events in a RoiResponseSeries
dff_events_series = nwbfile.processing["ophys"]["DfOverF"]["DfOverFEvents"]
dff_events = dff_events_series.data[:].T  # Transpose to get (n_cells, n_timepoints)
ts = dff_events_series.timestamps[:]

fig = plt.figure(figsize=(8,3))
plt.plot(ts, dff[122,:], color='gray')
plt.plot(ts, 2*dff_events[122,:]+5, color='black')
plt.xlabel("Time (s)")
plt.xlim(1900,2200)
plt.ylabel("DFF")
```

## Stimulus epochs
Several stimuli are shown during each imaging session, interleaved with each other. The stimulus epoch table provides information of these interleaved stimulus epochs, revealing when each {term}`epoch` starts and ends. .

```{code-cell} ipython3
stim_epoch = nwbfile.intervals['epochs'].to_dataframe()
stim_epoch
```

| Column    | Description |
| -------- | ------- |
| start_time | The time at the start of the epoch |
| stop_time | The time at the end of the epoch |
| stimulus_type | The name of the stimulus for the epoch |


Let's plot the DFF traces of a number of cells and overlay stimulus epochs.  

```{code-cell} ipython3
fig = plt.figure(figsize=(14,8))

#here we plot the first 50 neurons in the session
for i in range(50):
    plt.plot(ts, dff[i,:]+(i*2), color='gray')

#here we shade the plot when each stimulus is presented
colors = ['blue','orange','green','red']
for c, stim_name in enumerate(stim_epoch.stimulus_type.unique()):
    stim = stim_epoch[stim_epoch.stimulus_type==stim_name]
    for j in range(len(stim)):
        plt.axvspan(xmin=stim.start_time.iloc[j], xmax=stim.stop_time.iloc[j], color=colors[c], alpha=0.1)

```

(running_speed)=
## Running speed
The running speed of the animal on the rotating disk during the entire session. 

```{code-cell} ipython3
running_speed_series = nwbfile.processing["behavior"]["BehavioralTimeSeries"]['running_speed']
dxcm = running_speed_series.data[:]
running_ts = running_speed_series.timestamps[:]
```

Plot the running speed. 

```{code-cell} ipython3
plt.plot(running_ts, dxcm)
plt.ylabel("Running speed (cm/s)", fontsize=18)
plt.xlabel("Time (s)", fontsize=18)
```

Add the running speed to the neural activity and stimulus epoch figure we made above

```{code-cell} ipython3
fig = plt.figure(figsize=(14,8))

#here we plot the first 50 neurons in the session
for i in range(50):
    plt.plot(ts, dff[i,:]+(i*2), color='gray')

#here we shade the plot when each stimulus is presented
colors = ['blue','orange','green','red']
for c, stim_name in enumerate(stim_epoch.stimulus_type.unique()):
    stim = stim_epoch[stim_epoch.stimulus_type==stim_name]
    for j in range(len(stim)):
        plt.axvspan(xmin=stim.start_time.iloc[j], xmax=stim.stop_time.iloc[j], color=colors[c], alpha=0.1)

#here we add the running speed (scaled and offset)
plt.plot(running_ts, (0.2*dxcm)-20)
```

## Stimulus Table and Template
Each stimulus that is shown has a <b>stimulus table</b> that details what each trial is and when it is presented. Additionally, the <b>natural scenes</b>, <b>natural movies</b>, and <b>locally sparse noise</b> stimuli have a <b>stimulus template</b> that shows the exact image that is presented to the mouse. We detail how to access and use these items in [Visual stimuli](vc2p-stimuli.md).

(cell_ids_indices)=
## Cell ids and indices
Each neuron in the dataset has a unique id. These IDs are stored in the PlaneSegmentation table we looked at before. As neurons are often matched across sessions, that neuron will have the same cell id in all said sessions. This is explored in [Cross session data](vc2p-cross-session-data.md).

```{code-cell} ipython3
# Cell IDs are stored in the PlaneSegmentation table
plane_seg = nwbfile.processing["ophys"]["ImageSegmentation"]["PlaneSegmentation"]
cell_ids = plane_seg.id[:]
cell_ids
```

Within each individual session, a cell id is associated with an index. This index maps into the dff or event arrays.  Pick one cell id from the list above and find the index for that neuron. 

```{code-cell} ipython3
target_cell_id = cell_ids[0]  # Use first cell as example
cell_index = np.where(cell_ids == target_cell_id)[0]
print(f"Cell ID {target_cell_id} is at index {cell_index}")
```

