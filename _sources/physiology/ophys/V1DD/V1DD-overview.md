# V1 Deep Dive

Relating neural activity and connectivity is a key question in neuroscience. In this dataset, we examine the primary visual cortex ({term}`V1`) in great detail, densely imaging the neural activity of neurons within a ~1 cubic mm, followed by EM reconstruction.

A pan-excitatory {term}`Cre line` was used to drive the expression of genetically encoded {term}`GCaMP`6s. In order to image the full cubic mm, it was divided into 5 columns (400 um X 400 um) with 5 stacked volumes per column. The columns were arranged 2X2 with an additional central column in the middle overlapping a quarter of each of the other columns.

![v1dd_columns](/resources/v1dd_columns.png)

Each session imaged a single volume in a single column. Each volume consisted of 6 planes separated by 16 um. As the microscope (the DeepScope) had a frame rate of 37 frames per second, this resulted in an imaging rate of 6 Hz per plane.

![v1dd_volumes](/resources/v1dd_volumes.png)

Each of the five columns had five stacked volumes, in total spanning from ~50 um to 514 um. The center column was extended deeper to the white matter by using single-plane 3-photon imaging. 3P increases the signal to noise ratio for deep imaging of dense lines. [See 2P3P comparison](2P3P-fig)

![v1dd_columns_volumes](/resources/v1dd_columns_volumes.png)

Calcium imaging of this ~1 cubic mm was performed on four mice. One mouse (id=409828) was then chosen for electron microscopy and reconstruction.

## Questions to explore
These data are poised to focus on questions of visual encoding and population coding. Of particular focus is questions regarding surround suppression, where having a stimulus that extends beyond a neurons classical receptive field can suppress its response. Comparing the responses to the windowed and full field gratings can reveal such surround suppression - which can potentially be related to differences in connectivity patterns. Surround suppression has also been found to be stronger in superficial layers (e.g. layer 2/3) compared to deeper layers (e.g. layer 5), which can be explored in this dataset.

Other visual stimuli are also valuable for exploring the arrangement of spatial receptive fields or the correlations of neurons within a volume in response to natural movies or spontaneous activity. The behavior variables, including running speed/duration, and pupil area/position, are also of interest.
