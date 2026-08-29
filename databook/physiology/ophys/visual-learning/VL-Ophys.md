# Visual Learning Ophys 

<!-- ![Eight imaging planes spanning 44-314 um in the primary visual cortex in a pan-inhibitory mouse line expressing GCaMP8s](/vl-pan-inhibitory_8_planes_rows.mp4) -->

<video controls width="100%" src="/_static/videos/vl-pan-inhibitory_8_planes_rows.mp4"></video>

## 2-Photon calcium imaging during behavior

Neural activity was measured as calcium fluorescence in mice expressing the
genetically encoded calcium indicator j{term}`GCaMP`8s in inhibitory neurons, using the
{term}`transgenic line` `Slc32a1-IRES-Cre;Oi1(TIT2L-jGCaMP8s-WPRE-ICL-IRES-tTA2)`.
`Slc32a1` (VGAT) is expressed by all GABAergic neurons so all the main inhibitory 
subclasses are labeled and recorded simultaneously: Pvalb, Sst, Vip, and Lamp5 neurons. 
Excitatory neurons are not labeled and are not present in this dataset.

This is a different strategy from datasets that use a subclass-specific Cre
line such as `Vip-IRES-Cre` or `Sst-IRES-Cre`. In those datasets the mouse line
determines the cell type, and each mouse yields one cell type. Here the mouse
line determines only that a neuron is inhibitory, and its subclass is
established after the in vivo experiment by measuring gene expression in the
same tissue. The consequence is that subclasses can be compared within a single
field of view, in the same session, under identical behavioral conditions —
but also that not every recorded neuron ends up with a subclass label, since a
neuron must be successfully matched to the transcriptomics data to receive one.

Another important difference from prior datasets, such as Visual Behavior and Visual Coding Ophys, 
is the use of GCaMP8s which is more sensitive and has better temporal resolution than previously
 used versions such as GCaMP6 (https://www.janelia.org/jgcamp8-calcium-indicators). 

Sessions were acquired on a modified 2-photon Mesoscope, which records 8
imaging planes in a single session. All 8 planes are located in primary visual
cortex (VISp), spanning 40–370 µm below the cortical surface across mice,
corresponding roughly to layer 1 through upper layer 5. Each plane is sampled
at approximately 10 Hz.

Sampling this depth range in VISp means layer 1 is included, which matters for
inhibitory populations specifically: Lamp5 neurons, including
{term}`neurogliaform cell`s, are concentrated in layer 1 and are largely absent from datasets that begin imaging deeper in the cortex.

In addition to fluorescence timeseries, running speed, lick times, and reward
times were recorded throughout every session, allowing neural activity to be
related to locomotion, task engagement, choices, and errors.

![Simultaneous measurement of in vivo physiology and behavior](/resources/vl-behavior-pop-timeseries.png)

## Tracking the same neurons across learning

Each imaging plane is targeted repeatedly across days, so the same neurons can
be followed across the training procedure. Cells are matched across sessions
using ROICaT, an open-source tool for cross-session {term}`ROI` matching, and matched
cells receive an identifier that is stable across every session in which the
cell was detected.

![The same field of view across sessions](/resources/vl-cross-session-tracking.png)

Not every neuron is matched in every session. A cell that is silent on a given
day may not be segmented at all, segmentation can fail, and the imaging plane
can drift in depth over the course of a session. The population that can be
followed across the full sequence is therefore smaller than the population
segmented in any single session.

Each recording is subject to stringent quality control (QC); accordingly, some imaging planes are valid for analysis. 
The outcome of QC can be accessed in the metadata, which is described in [Tutorial Session Metadata](/physiology/ophys/visual-learning/visual_learning_metadata).

## Relationship to the transcriptomics data

After the in vivo experiments are complete, the brain is sectioned tangentially
and probed for the expression of 22 or 27 genes, depending on the mouse,
selected to distinguish inhibitory subclasses. You can learn more about the 
methods for spatial transcriptomics in the [Visual Learning Transcriptomics](/cell-types/spatial-transcriptomics/VL-mFISH) page.

The resulting gene expression measurements are matched back to the neurons recorded in vivo.
The registration procedure, the identifiers used to link the two datasets, and
the numbers of neurons available at each stage are described in
[Linking Ophys and Transcriptomics](/physiology/ophys/visual-learning/VL-Integration).

Neurons that are successfully matched receive a subclass label — Pvalb, Sst,
Vip, or Lamp5 — which can then be applied to their activity in any session in
which they were recorded. 

![Coregistered inhibitory neurons across imaging planes](/resources/vl-coregistered-planes.png)

The number of neurons carrying a subclass label is smaller than the number
segmented, since a neuron must be matched through several registration steps
before it can be labeled. Subclass representation is also uneven: Pvalb and Vip neurons are
recovered in larger numbers than Sst neurons, which is worth
considering when planning comparisons between subclasses.

With subclass labels attached, activity during any session type can be compared
across inhibitory subclasses.

![Activity of coregistered neurons sorted by subclass](/resources/vl-subclass-raster.png)

Neural activity can also be related to the continuous
gene expression patterns across all measured genes, rather than or in addition to
grouping neurons by the subclass marker genes.

