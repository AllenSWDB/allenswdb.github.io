# Visual Learning Dataset Overview

The Visual Learning dataset was generated using in vivo
{term}`Two-photon calcium imaging` to measure the activity of
inhibitory neurons in the {term}`primary visual cortex` of mice while they learned a
go/no-go [visual change detection task](change_detection_task). The same population of neurons was
recorded every day across the entire training procedure, from the animal's
first exposure to the task through expert performance, novel stimulus
exposure, and extinction of the learned stimulus-reward association. After the
in vivo experiment was complete, the transcriptomic identity of the same
neurons was measured using post-hoc {term}`spatial transcriptomics` on the same
tissue.

![Linking neuron function to gene expression](/resources/vl-overview-schematic.png)

The purpose of this dataset is to link what a neuron does to who a neuron is. 
We address this challenge specifically for the case of cortical inhibitory neurons.  
Inhibitory neurons are not a single population — they comprise several
molecularly distinct {term}`subclass`es with different connectivity, different
intrinsic properties, and different roles in cortical computation: 
{term}`Pvalb inhibitory neurons`s, {term}`Sst inhibitory neurons`s,
{term}`Vip inhibitory neurons`s, {term}`Lamp5 inhibitory neurons`s. Measuring
the activity of these subclasses during learning has historically required
choosing one subclass in advance, labeling it genetically, and recording it in
isolation. Here, all inhibitory neurons are labeled at once, recorded together
in the same field of view, and assigned to a subclass afterward on the basis
of the genes they express. This makes it possible to ask how molecularly
defined inhibitory subclasses differ in what they encode, how they interact
with one another, and how those relationships change as an animal learns.

The dataset currently includes 147 imaging sessions from 6 mice, recorded across 8
imaging planes per session in primary visual cortex, along with measurements of behavior 
and task performance in every session. Gene expression data for 22 or 27 genes,
depending on the mouse, is provided for neurons that were co-registered to post-hoc spatial transcriptomics.

## Data descriptions

The [Visual Learning Ophys](VL-Ophys) page describes the methods for longitudinal imaging during learning.

The task is the change detection task shared across the Visual Behavior datasets and is described on the
[Visual Behavior Task](vb-behavior) page. The Visual Learning dataset utilizes the same training procedure, with a few key differences - the learning paradigm and session types are described in
[Visual Learning Task](/physiology/stimuli/visual-learning/VL-Behavior). 

The gene expression measurements are described in
[Visual Learning Transcriptomics](/cell-types/spatial-transcriptomics/VL-mFISH), and the procedure that links the across modalities is described in
[Linking Ophys and Transcriptomics](/physiology/ophys/visual-learning/VL-Integration).

## Tutorials

The pages below demonstrate how to load and interact with the data, and how to link across modalities.

[Session metadata](/physiology/ophys/visual-learning/visual_learning_metadata) comes first, because every analysis begins by choosing
sessions. It queries the AIND document database for the full metadata on each
mouse and each acquisition, builds the one-row-per-session table the other
notebooks read, and shows how to read the per-plane z-drift QC.

[The ophys and behavior NWB files](/physiology/ophys/visual-learning/Tutorial-VisualLearning-Ophys-Behavior-NWB) is a reference for a single ophys session file.
It opens one {term}`NWB` file and walks through every container in turn — the five
representations of neural activity, the running and lick data, the stimulus and
trial tables, and the session metadata — explaining what each holds, how the
per-plane clocks relate to one another, and how to put everything on a single
timeline. Its final section compares what each session type looks like in the
data.

[Inhibitory cell types and physiology](/physiology/ophys/visual-learning/Tutorial-VisualLearning-Physiology-and-CellTypes) demonstrates the linkage between 
ophys and mFISH. It attaches the gene expression data and inhibitory subclass labels
to the recorded neurons, covering the three ID systems
involved, the join between the coregistration tables and the expression
data, and comparisons of activity across inhibitory subclasses in familiar,
novel, and cross-session analyses.

