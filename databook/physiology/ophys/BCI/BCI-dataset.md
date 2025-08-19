### Overview 

This tutorial will go over how to load the BCI data and access its contents.

#### Import required packages 

The BCI data is packaged in NWB format with a Zarr backend. To access the data, use `NWBZarrIO` from `hdmf-zarr`. `nwb2widget` creates an interactive GUI with the NWB file, which is useful for exploring the file contents and looking at basic plots.


```python
from hdmf_zarr import NWBZarrIO
from nwbwidgets import nwb2widget
```

#### Load the data

Let's load the data for one recording session using `NWBZarrIO`. 


```python
# Set filename 
nwb_path = '/data/brain-computer-interface/single-plane-ophys_731015_2025-01-10_18-06-31_processed_2025-08-03_20-39-09/single-plane-ophys_731015_2025-01-10_18-06-31_behavior_nwb' 

# Assign file to an NWBZarrIO object 
io = NWBZarrIO(nwb_path, 'r')
# Read the file 
nwbfile = io.read()
```

`nwb2widget` is useful for exploring the NWB file structure and contents. The widget can also generate basic plots, like the neural activity timeseries traces.  


```python
nwb2widget(nwbfile) 
```

#### Image Segmentation Table 
    
During processing, a segmentation algorithm (e.g. Suite2p or Cellpose) is applied to the raw fluorescence data to extract ROIs for detected neurons. The extracted ROIs are accessible in the form of image masks, a HxW sparse array with non-zero values where the ROI is masked out in the imaging plane. The detected ROIs are run through a soma/dendrite classifier to confirm if the ROI masks fit certain features of a soma or dendrite. The image masks and outputs of the soma/dendrite classifier are stored in the `image_segmentation` table in the `processing` container.
    
| Column    | Description |
| -------- | ------- |
| is_soma  | ==1 if ROI classified as soma, ==0 if not  |
| soma_probability | if >0.5 classified as soma  |
| is_dendrite |  ==1 if ROI classified as dendrite, ==0 if not   |
| dendrite_probability   |  if >0.5 classified as dendrite  |
| image_mask  | HxW sparse array defining image masks|

If you want to work with neural activity from somas, use only ROIs that pass the is_soma classification. 

```python
image_segmentation = nwbfile.processing["processed"].data_interfaces["image_segmentation"].plane_segmentations["roi_table"].to_dataframe()
```

#### Cell activity traces 

After the ROIs are extracted, the change in fluorescence over a baseline (df/F) is calculated for each ROI. The df/F is accessible as shown below.

The shape of dff is nframes x nrois. 


```python
dff = nwbfile.processing["processed"].data_interfaces["dff"].roi_response_series["dff"].data

print('dff shape (nframes, nrois):',np.shape(dff))

frame_rate = nwbfile.imaging_planes["processed"].imaging_rate
print('Frame Rate:', frame_rate)
```

    dff shape (nframes, nrois): (220344, 1214)
    Frame Rate: 58.2634


#### Experiment Structure 
    
The dff array covers the entire experimental period, which has 5 stimulus epochs*. 

    1. Photostimulation of single neurons 
    2. Spontaneous activity 
    3. BCI behavior task 
    4. Spontaneous activity 
    5. Photostimulation of single neurons 
    
*The epoch order and structure is variable across sessions. Sometimes the spontaneous epoch occurs before photostimulation and sometimes there are repeats of the same epoch type. Check the epoch table before working with the session data. 

#### Epoch Table 
    
The epoch table contains the start and stop times/frames for each stimulus epoch. You can use the epoch table with the dff array to pull and compare neural activity across different stimulus epochs. 

| Column    | Description |
| -------- | ------- |
| stimulus_name  | descriptive name of the epoch  |
| start_frame | epoch start(frames)   |
| stop_frame | epoch end (frames)     |
| start_time    | epoch start (sec)  |
| stop_time   | epoch end (sec)  |


```python
epoch_table = nwbfile.intervals["epochs"].to_dataframe()
```

#### Photostimulation Table  

During the "photostim" epochs, single neurons were optogenetically activated using 2p photostimulation to probe the functional connectivity in the network. 

The PhotostimTrials table (stimulus>PhotostimTrials) contains information about the photostimulation trials. 

| Column    | Description |
| -------- | ------- |
| start_time  | stimulus start (s)  |
| stop_time | stimulus end (s)   |
| start_frame | stimulus start (frame)     |
| stop_frame    | stimulus end (frame)  |
| tiff_file   | data source file name  |
| stimulus_name    | stimulus name   |
| laser_x    | x coordinate of stimulated neuron (pixels)   |
| laser_y    | y coordinate of stimulated neuron (pixels)  |
| power    | stimulus intensity (mW)  |
| duration    | trial duration (s)  |
| stimulus_function    | stimulus template   |
| group_index    | number identifier for stimulated neuron(s)   |
| closest_roi    | index in dff that corresponds to the photostimulated neuron   |


```python
photostim = nwbfile.stimulus["PhotostimTrials"].to_dataframe()
```

#### BCI Behavior Table 
    
During the "BCI" epochs, the mouse engaged in an optical brain-computer-interface task in which the activity of a single neuron in the imaging plane was used to control the movement of a reward lickport towards its face. 

Information about each BCI behavior trial can be found in the intervals > trials table. 

| Column    | Description |
| -------- | ------- |
| start_time  | trial start (sec)  |
| stop_time | trial end (sec)   |
| go_cue |  time of go cue relative to start time (sec)   |
| hit   |  boolean of whether trial was hit   |
| lick_l  | lick times (sec)   |
| reward_time   | reward delivery time (sec)   |
| threshold_crossing_times    | time when reward port crossed position threshold (sec)   |
| zaber_steps_times   | position of reward port  |
| tiff_file    | data source file  |
| start_frame    | trial start (frame)  |
| stop_frame    | trial end (frame)  |
| conditioned_neuron_x    | coordinate for conditioned neuron (pixels)  |
| conditioned_neuron_y    | coordinate for conditioned neuron (pixels)  |
| closest_roi    | index in dff that corresponds to the photostimulated neuron  |



```python
bci = nwbfile.stimulus["Trials"].to_dataframe()
```
