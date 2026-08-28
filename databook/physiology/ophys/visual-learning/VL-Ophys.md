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

This page describes the methods for longitudinal imaging during learning. 
The task is the change detection task shared across the Visual Behavior datasets and is described on the
[Visual Behavior Task](vb-behavior) page; how Visual Learning differs from it,
along with the training progression and the session types, is described in
[Visual Learning Task](/physiology/stimuli/visual-learning/VL-Behavior). The
gene expression measurements are described in
[Visual Learning Transcriptomics](/cell-types/spatial-transcriptomics/VL-mFISH), and the procedure that links the two is described in
[Linking Ophys and Transcriptomics](/physiology/ophys/visual-learning/VL-Integration).

## 2-Photon Calcium Imaging

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

## Experimental Design

The task is a no/no-go visual change detection task. The full task structure and parameters — how change times are drawn, how trial outcomes are defined, and what happens when a mouse licks before a change — are described in detail on the [Visual Behavior Task](change_detection_task) page.

![change detection task](/resources/vl-task-schematic.png)

The defining feature of the Visual Learning dataset is that imaging begins on the first day
of training and continues every day thereafter. Mice are head-fixed under the
microscope for every session of the training procedure, so the dataset contains
a continuous neural record of the animal going from naive to expert, and then
of the learned association being broken.

Given the importance of the training procedure and session sequence to this dataset, the session types and their features and relevance for analysis are described here, in addition to the information that canbe found on the [Visual Behavior Task](vb-behavior) page.

![Session sequence and stimulus categories](/resources/vl-session-sequence.png)

The task is learned over a series of training stages that differ in the stimulus used and the temporal properties of the stimulus. This curriculum was designed to first introduce the basic task rule - detect changes to earn rewards - then introduce additional features including a working memory component, generalization across stimulus categories, generalization to novel stimuli, and extinction of learned associations. With a few exceptions, the training stages are identical to the Visual Behavior dataset, with the primary difference being that in vivo imaging occurs throughout the learning process in the Visual Learning dataset. In Visual Behavior, only well trained mice were imaged.

![Training progression for each mouse](/resources/vl-training-progression.png)

### Behavioral training

Training proceeds through a series of stages of increasing difficulty, and
mice advance when they meet a performance criterion of d-prime greater than 1
on 2 of 3 consecutive days.

Mice initially learn the task with full-field static gratings that change
orientation. The first session, `TRAINING_0`, lasts 15 minutes and delivers
water automatically after each change, with no requirement that the mouse
respond; this establishes the association between the stimulus change and
reward. During `TRAINING_1`, mice must lick following stimulus changes to earn
water rewards.

Once mice perform the task at criterion level, they transition to `TRAINING_2`
where a 500ms gray screen inter-stimulus interval is added to the task. 
This gray screen period makes the task more difficult by
adding a working memory component — the task of the mouse is to determine "is
what I am seeing now the same or different as what I saw 500 ms ago?".

Natural images replace gratings at `TRAINING_3`, using an 8-image set referred
to as image set A. This again increases the task difficulty and asks the mice
to distinguish images with naturalistic features rather than simplistic grating
stimuli. Reward volume is reduced from 10 µL to 7 µL at `TRAINING_4`, and the
task parameters reach their final form at `TRAINING_5`, where mice remain until
performance is stable.

The number of sessions spent at each stage varies between mice, since
advancement depends on individual performance.

### Familiar and novel images

Once mice are performing the task well with image set A, they proceed through
three additional session types. Each is acquired on two consecutive days, so
that the first and second exposure to a given condition can be distinguished.

These session types begin with `OPHYS`, however recall that all sessions in
this dataset have ophys data — this session labeling scheme is a holdover from
the Visual Behavior dataset from which the Visual Learning dataset is derived.
In Visual Behavior, only well trained mice were imaged. In Visual Learning,
imaging happens throughout training, but the session type names were retained.

**`OPHYS_1` — familiar images.** The mouse performs the task with image set A,
which it has seen throughout training and which is now highly familiar. Image
omissions are introduced at this point, and are present in all subsequent `OPHYS` 
sessions.

**`OPHYS_4` — novel images.** Image set A is replaced with image set B, a
second set of 8 natural images that the mouse has never encountered. The task
contingency is unchanged and rewards are still delivered; only the images are
new. The first `OPHYS_4` session is the mouse's first exposure to image set B;
by the second session the images have already been seen for an hour.

Note that the Visual Behavior dataset has a cohort of mice where familiar and novel images were inteleaved in the same session; this is not the case for Visual Learning. In each well-trained imaging session, the 8 natural image stimuli are either all familiar (i.e. observed during training), or all novel (only observed once mice are well trained).

### Image omissions

During the initial `TRAINING` stages with flashed stimuli, the stimulus cadence is highly regular - stimuli are presented for 250ms with a 500ms inter stimulus interval. During the `OPHYS` sessions in well-trained mice, image omissions are introduced, interrupting the expected temporal structure. In these sessions, 5% of non-change stimuli are randomly omitted, producing an extended gray screen period (1250ms instead of the typical 500ms). 

![Change-omission](/resources/vl-change-omission.png)

### Extinction

In `OPHYS_6`, rewards are no longer delivered. The mouse is water-restricted
as on any other day, the lick spout remains in its usual position, and the
images continue to change on the same schedule — but licking no longer produces
water. Nothing signals the change in advance; the mouse discovers it only by
responding and receiving nothing.

This makes `OPHYS_6` a learning experiment run in reverse. Over weeks of
training the animal acquired an association between a visual event and a
reward, and in these sessions that association is violated on every trial and
the learning is extinguished. Because the same neurons have been tracked
throughout acquisition, their activity can be followed as the association is
undone.

The behavioral signature is a collapse in responding. In a representative
extinction session, 305 of 330 go trials are misses. Licking to image changes,
which is robust in every rewarded session type, falls to near zero.

![Change-aligned lick rate by session type](/resources/vl-lick-rate.png)

Low performance in these sessions is the phenomenon of interest; the mouse is 
motivated and the apparatus is unchanged; mice stop responding because the reward 
association has been removed.

A note for those familiar with the Visual Behavior Ophys dataset: that dataset
also contains a session type called `OPHYS_6`, but it means something else
there. Visual Behavior also has interleaved passive sessions, in which the mouse
is given its daily water beforehand and the lick spout is retracted, so the
manipulation is motivational and the learned contingency is left intact. The
Visual Learning dataset contains no passive sessions of that kind.

### Passive stimulus sessions

After the task sessions are complete, mice view visual stimuli passively, with
no reward and no behavioral requirement. These sessions characterize how each
neuron responds to classical visual stimuli, independent of task demands. The stimuli used
 are shared with other Allen Institute datasets and are defined in the
[visual stimulus list](/physiology/stimuli/passive-visual-stimuli/visual-stimuli-list);
see [Stimuli and Behavioral Tasks](/physiology/stimuli/stimuli) for how they are
used elsewhere in the databook.

**`STAGE_0` — natural movies.** One session presenting
[natural movie](natural-movies) clips, repeated many times. These stimuli are feature rich and contain both temporal and spatial structure. Because of the large number of repeats of some of the movie clips, stability and repeatability of neural activity structure can be explored.  

**`STAGE_1` — drifting gratings.** Three sessions presenting
[drifting gratings](drifting-gratings) that vary in direction, temporal
frequency, and contrast. These paramaterized stimuli allow analyses of neural selectivity and tuning properties. Adaptation and state modulation can also be explored within and across the 3 repeated sessions. 

Because these sessions follow the task sessions in the same tracked neurons,
each neuron can be characterized both by what it encodes during behavior and
by how it responds to parametrically varying visual stimuli.

Note that mice have seen oriented gratings before reaching `STAGE_1`, since
`TRAINING_0` and `TRAINING_1` use full-field static gratings. Orientation is
therefore not novel at this point, though drift, {term}`temporal frequency`, and
{term}`spatial frequency` may be. The interval between the passive sessions and the preceding
task sessions varies across mice, from days to several weeks.


## Session Types Summary

The `session_type` field identifies the training or imaging stage of each
session. Behavioral training sessions begin with `TRAINING_`, sessions in well trained mice
 begin with `OPHYS_`, and passive stimulus sessions begin
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
sampled at approximately 10 Hz. Each session and imaging plane is subject to stringent 
quality control (QC) criteria; accordingly, not all data is valid for analysis. The outcome of QC can be accessed in the metadata, which is described in [Tutorial Session Metadata](/physiology/ophys/visual-learning/visual_learning_metadata.md).


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
[Linking Ophys and Transcriptomics](/physiology/ophys/visual-learning/VL-Integration).

## Tutorials

The pages below work through the dataset in the order you are likely to need it.

[Session metadata](/physiology/ophys/visual-learning/visual_learning_metadata) comes first, because every analysis begins by choosing
sessions. It queries the AIND document database for the full metadata on each
mouse and each acquisition, builds the one-row-per-session table the other
notebooks read, and shows how to read the per-plane z-drift QC.

[The ophys and behavior NWB files](/physiology/ophys/visual-learning/Tutorial-VisualLearning-Ophys-Behavior-NWB) is a reference for a single session file.
It opens one {term}`NWB` file and walks through every container in turn — the five
representations of neural activity, the running and lick data, the stimulus and
trial tables, and the session metadata — explaining what each holds, how the
per-plane clocks relate to one another, and how to put everything on a single
timeline. Its final section compares what each session type looks like in the
data.

[Linking Ophys and Transcriptomics](/physiology/ophys/visual-learning/VL-Integration) describes how a neuron recorded in vivo
is matched to the cell whose gene expression was measured after the experiment:
the registration steps involved, the identifiers that carry the match from one
dataset to the other, and how many neurons survive each stage. It is worth
reading before the next notebook, which depends on that linkage throughout.

[Inhibitory cell types and physiology](/physiology/ophys/visual-learning/Tutorial-VisualLearning-CellTypes-and-Physiology) puts the linkage to work. It attaches
transcriptomic cell types to the recorded neurons, covering the three ID systems
involved, the join between the coregistration tables and the HCR expression
data, and comparisons of activity across inhibitory subclasses in familiar,
novel, and cross-session analyses.
