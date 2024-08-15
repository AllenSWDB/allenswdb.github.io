# ExaSPIM Image Processing

Raw data is collected in pieces (tiles) as shown in the figure below. These pieces are corrected for image artifacts, aligned and fused to generate one single digital volume. 

:::{figure} img/exaspim_stitching.png
---
align: center
---
:::
Neurons in this volume are then traced manually using a software called Horta Cloud to generate whole neuron reconstructions.  

:::{figure} img/OneTracedNeuron.png
---
align: center
---
:::
Reconstruction of one Entire Neuron 

The image above shows the reconstruction of one neuron. However, typically about 30-100 neurons can often be reconstructed fully from such a dataset. Each brain has it’s own set of neurons that can be analysed with respect to each other in this form. 

In order to collectively analyse brains across several mice, we perform a process called registration which puts all the neurons from all the different brains into one common space – the Allen Common Coordinate Framework Atlas. This atlas not only gives us a nice space to analyse neurons but also a detailed annotation of where the different regions lie which can enable us to perform region based morphological analysis of the data.

 
