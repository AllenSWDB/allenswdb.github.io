# Visual Learning Ophys Dataset Overview

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
Inhibitory neurons are not a single population — they comprise several
molecularly distinct {term}`subclass`es with different connectivity, different
intrinsic properties, and different roles in cortical computation. Measuring
the activity of these subclasses during learning has historically required
choosing one subclass in advance, labeling it genetically, and recording it in
isolation. Here, all inhibitory neurons are labeled at once, recorded together
in the same field of view, and assigned to a subclass afterward on the basis
of the genes they express. This makes it possible to ask how molecularly
defined inhibitory subclasses differ in what they encode, how they interact
with one another, and how those relationships change as an animal learns.

The dataset includes 147 imaging sessions from 6 mice, recorded across 8
imaging planes per session in primary visual cortex, along with the full
behavioral record for every session. Gene expression data for 22 or 27 genes,
depending on the mouse, is provided for coregistered neurons.

This page describes the imaging. The task is the change detection task shared
across the Visual Behavior datasets and is described on the
[Visual Behavior Task](vb-behavior) page; how Visual Learning differs from it,
along with the training progression and the session types, is described in
[Visual Learning Task](/physiology/stimuli/visual-learning/VL-Behavior). The
gene expression measurements are described in
[Visual Learning Transcriptomics](/cell-types/spatial-transcriptomics/VL-mFISH), and the procedure that links the two is described in
[Linking Ophys and Transcriptomics](/cell-types/spatial-transcriptomics/VL-Integration).

## 2-Photon Calcium Imaging

Neural activity was measured as calcium fluorescence in mice expressing the
genetically encoded calcium indicator jGCaMP8s in inhibitory neurons, using the
{term}`transgenic line` `Slc32a1-IRES-Cre;Oi1(TIT2L-jGCaMP8s-WPRE-ICL-IRES-tTA2)`.
`Slc32a1` (VGAT) is expressed by all GABAergic neurons, so the label is
pan-inhibitory: Pvalb, Sst, Vip, and Lamp5 neurons (see the glossary
definitions for {term}`parvalbumin-positive interneuron`,
{term}`somatostatin cell` and {term}`VIP cell`) all express the indicator,
and all are recorded simultaneously in the same field of view. Excitatory
neurons are not labeled and are not present in this dataset.

This is a different strategy from datasets that use a subclass-specific Cre
line such as `Vip-IRES-Cre` or `Sst-IRES-Cre`. In those datasets the mouse line
determines the cell type, and each mouse yields one cell type. Here the mouse
line determines only that a neuron is inhibitory, and its subclass is
established after the in vivo experiment by measuring gene expression in the
same tissue. The consequence is that subclasses can be compared within a single
field of view, in the same session, under identical behavioral conditions —
but also that not every recorded neuron ends up with a subclass label, since a
neuron must be successfully matched to the transcriptomics data to receive one.

Sessions were acquired on a modified 2-photon Mesoscope, which records 8
imaging planes in a single session. All 8 planes are located in primary visual
cortex (VISp), spanning 40–370 µm below the cortical surface across mice,
corresponding roughly to layer 1 through upper layer 5. Each plane is sampled
at approximately 10 Hz.

![Eight imaging planes in VISp](/resources/vl-imaging-planes.png)

Sampling this depth range in VISp means layer 1 is included, which matters for
inhibitory populations specifically: Lamp5 neurons, including
{term}`neurogliaform cell`s, are concentrated in layer 1 and are largely absent from datasets that
begin imaging deeper in the cortex.

In addition to fluorescence timeseries, running speed, lick times, and reward
times were recorded throughout every session, allowing neural activity to be
related to locomotion, task engagement, choices, and errors.

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

![ROICaT cell matching across sessions](/resources/FOV_clusters.gif)

In the animation above, each color marks a ROICaT cluster — the set of ROIs, in
different sessions, that were assigned to the same cell. The number in the
corner is the session index, so stepping through it shows both the cells that
are recovered day after day and the ones that drop out and return.

Registration across days is aided by the fingerprint movie presented at the end
of every task session from `TRAINING_5` onward. It is identical in every
session that contains it and drives strong activity across the population,
which supports segmentation and registration and provides a fixed reference
stimulus for comparing responses in the same neurons over the course of
learning.

## Experimental Design

The defining feature of this dataset is that imaging begins on the first day
of training and continues every day thereafter. Mice are head-fixed under the
microscope for every session of the training procedure, so the dataset contains
a continuous neural record of the animal going from naive to expert, and then
of the learned association being broken.

![Timeline of the experiment](/resources/vl-experimental-timeline.png)

A mouse moves through the experiment on roughly a 20 week timeline. The first
weeks are surgery, recovery, retinotopic mapping, water restriction, and
habituation. The six weeks of longitudinal imaging that follow are the sessions
in this dataset, and they are immediately followed by in vivo structural stacks
that anchor the imaged volume. Everything after that — perfusion, sectioning,
photobleaching, and five rounds of HCR — produces the transcriptomics data.

![Session sequence and stimulus categories](/resources/vl-session-sequence.png)

Mice first learn the task with static gratings (`TRAINING_0` through
`TRAINING_2`), then with natural images (`TRAINING_3` through `TRAINING_5`),
advancing between stages on a performance criterion. The number of sessions
spent at each stage therefore varies between mice, and the number of imaging
sessions per mouse varies with it.

Once performance is stable, mice proceed through three additional session
types, each acquired on two consecutive days so that first and second exposure
to a condition can be distinguished: `OPHYS_1` with the familiar image set A,
`OPHYS_4` with the novel image set B, and `OPHYS_6` in which rewards are no
longer delivered and the learned association is extinguished. Task sessions
are followed by passive stimulus sessions with no reward or behavioral
requirement — `STAGE_0` presenting natural movies and `STAGE_1` presenting
drifting gratings — which characterize how each tracked neuron responds to
classical visual stimuli independent of task demands.

Because the same neurons are followed across this entire sequence, activity in
any of these conditions can be compared within a cell rather than across
separately recorded populations. The full description of each stage, the
performance criteria, and the behavioral consequences of extinction are on the
[Visual Learning Task](/physiology/stimuli/visual-learning/VL-Behavior) page.

## Session Types

The `session_type` field identifies the training or imaging stage of each
session. Behavioral training sessions begin with `TRAINING_`, task sessions
under the microscope begin with `OPHYS_`, and passive stimulus sessions begin
with `STAGE_`. The image set in use is included in the name where applicable.

| `session_type` | Stimulus | Reward | Omissions |
|---|---|---|---|
| `TRAINING_0_gratings_autorewards_15min` | static gratings | automatic | no |
| `TRAINING_1_gratings` | static gratings | earned | no |
| `TRAINING_2_gratings_flashed` | flashed gratings | earned | no |
| `TRAINING_3_images_A_10uL_reward` | flashed images, set A | earned, 10 µL | no |
| `TRAINING_4_images_A_training` | flashed images, set A | earned, 7 µL | no |
| `TRAINING_5_images_A_epilogue` | flashed images, set A | earned | no |
| `TRAINING_5_images_A_handoff_ready` | flashed images, set A | earned | no |
| `TRAINING_5_images_A_handoff_lapsed` | flashed images, set A | earned | no |
| `OPHYS_1_images_A` | familiar images, set A | earned | yes |
| `OPHYS_4_images_B` | novel images, set B | earned | yes |
| `OPHYS_6_images_B` | images, set B | none delivered | yes |
| `STAGE_0` | natural movies | none | n/a |
| `STAGE_1` | drifting gratings | none | n/a |

Note that the `OPHYS_` prefix does not distinguish which sessions have imaging
data — every session type listed above does. The naming scheme is a holdover
from the Visual Behavior dataset, in which only well trained mice were imaged.

The imaging configuration is the same across session types: 8 planes in VISp
sampled at approximately 10 Hz. What varies between sessions is which planes
and depths were successfully acquired. The session metadata table is the
primary source of what is available for analysis. It has one row per session
and includes the mouse, session type, acquisition order, image set, and the
imaging planes and depths used in that session. Loading it and filtering it down
to a set of sessions is the starting point of both tutorials below.

## Relationship to the transcriptomics data

After the in vivo experiments are complete, the brain is sectioned tangentially
and probed for the expression of 22 or 27 genes, depending on the mouse,
selected to distinguish inhibitory subclasses. The resulting gene expression measurements are matched back to the
neurons recorded in vivo.

![Gene expression measured in the imaged tissue](/resources/vl-hcr-puncta.png)

Neurons that are successfully matched receive a subclass label — Pvalb, Sst,
Vip, or Lamp5 — which can then be applied to their activity in any session in
which they were recorded. Neural activity can also be related to the continuous
gene expression patterns across all measured genes, rather than or in addition to
grouping neurons by the subclass marker genes.

![Coregistered inhibitory neurons across imaging planes](/resources/vl-coregistered-planes.png)

The number of neurons carrying a subclass label is smaller than the number
segmented, since a neuron must be matched through several registration steps
before it can be labeled. Subclass representation is also uneven: Pvalb and Vip neurons are
recovered in larger numbers than Sst neurons, which is worth
considering when planning comparisons between subclasses.

![Activity of coregistered neurons sorted by subclass](/resources/vl-subclass-raster.png)

With subclass labels attached, activity during any session type can be compared
across inhibitory subclasses.

![Novelty modulation across inhibitory subclasses](/resources/vl-novelty-subclass.png)

The registration procedure, the identifiers used to link the two datasets, and
the numbers of neurons available at each stage are described in
[Linking Ophys and Transcriptomics](/cell-types/spatial-transcriptomics/VL-Integration).

## Tutorials

Three notebooks work through the dataset in the order you are likely to need it.

[The ophys and behavior NWB files](/physiology/ophys/visual-learning/Tutorial-VisualLearning-Ophys-Behavior-NWB) is a reference for a single session file.
It opens one {term}`NWB` file and walks through every container in turn — the five
representations of neural activity, the running and lick data, the stimulus and
trial tables, and the session metadata — explaining what each holds, how the
per-plane clocks relate to one another, and how to put everything on a single
timeline. Its final section compares what each session type looks like in the
data.

[Inhibitory cell types and physiology](/physiology/ophys/visual-learning/Tutorial-VisualLearning-CellTypes-and-Physiology) starts from those files and attaches
transcriptomic cell types to the recorded neurons. It covers the three ID
systems that link the two datasets, the join between the coregistration tables
and the HCR expression data, and comparisons of activity across inhibitory
subclasses in familiar, novel, and cross-session analyses.

[Session metadata](/physiology/ophys/visual-learning/visual_learning_metadata) goes
underneath both of them, to the AIND document database that the session metadata
table is built from. It shows how to query docDB for the full metadata on each
mouse and each data acquisition, how to keep only the current processing
generation of a session, and how to read the per-plane z-drift QC. Use it when
you need a field that the session metadata table does not carry.
