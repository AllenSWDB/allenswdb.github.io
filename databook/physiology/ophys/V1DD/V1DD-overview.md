# V1 Deep Dive

Relating neural activity and connectivity is a key question in neuroscience. In this dataset, we examine the primary visual cortex ({term}`V1`) in great detail, densely imaging the neural activity of neurons within a ~1 cubic mm, followed by EM reconstruction.

A pan-excitatory {term}`Cre line` was used to drive the expression of genetically encoded {term}`GCaMP`6s. In order to image the full cubic mm, it was divided into 5 columns (400 um X 400 um) with 5 stacked volumes. The columns were arranged 2X2 with an additional central column in the middle

![v1dd_columns](/resources/v1dd_columns.png)

Each session imaged a single volume in a single column. Each volume consisted of 6 planes separated by 16 um. As the microscope (the DeepScope) had a frame rate of 37 frames per second, this resulted in an imaging rate of 6 Hz per plane.

![v1dd_volumes](/resources/v1dd_volumes.png)

Each of the five columns had five stacked volumes, spanning ~50 um to 514 um. The center column was imaged even deeper using 3-photon imaging. This increases the signal to noise ratio for deep imaging of dense lines. [See 2P3P comparison](2P3P-fig)
