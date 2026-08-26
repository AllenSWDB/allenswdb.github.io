# Visual Learning Task Overview

The Visual Learning dataset uses the same go/no-go visual change detection task
as the [Visual Behavior](/physiology/stimuli/visual-behavior/VB-Behavior)
datasets, but applies it to a different question. In Visual Behavior, mice were
trained to expert performance first and imaged afterward. In Visual Learning,
mice are head-fixed under the 2-photon microscope for every session of the
training procedure, so the behavioral record runs continuously from the
animal's first exposure to the task, through expert performance and novel
stimulus exposure, to extinction of the learned stimulus-reward association.

Two consequences of this design shape the rest of this page. First, the early
training stages are part of the dataset rather than a precursor to it, so the
stage-by-stage progression is itself an experimental variable. Second,
performance varies widely across the dataset by construction: the earliest
sessions come from a naive animal and the last come from an animal whose
learned association has been deliberately broken. Low performance in those
sessions is the phenomenon of interest rather than a data quality problem.

This page describes the task, the training progression, the stimuli, and the
session types. The imaging configuration, the tracking of the same neurons
across sessions, and the structure of the dataset are described in
[Visual Learning Ophys](/physiology/ophys/visual-learning/VL-Ophys).

## Change Detection Task

Mice are trained to perform a go/no-go visual change detection task. They
view a continuous stream of briefly presented visual stimuli and earn a water
reward by licking a spout when the identity of the stimulus changes.

![Visual change detection task](/resources/vl-task-schematic.png)

Each stimulus is presented for 250 ms, followed by 500 ms of gray screen,
producing a regular 750 ms cycle. On go trials the stimulus identity changes,
and the mouse must lick within a 750 ms response window to receive a water
reward. On catch trials no change occurs, and licking is scored as a false
alarm. Change times are drawn from a geometric distribution spanning roughly 4
to 12 flashes since the last change or the last lick, so the mouse cannot
predict when a change will occur. Licking before the scheduled change time
aborts the trial and restarts the interval, which discourages indiscriminate
licking.

In sessions where mice have reached performance criterion (`session_type`
beginning with `OPHYS`), 5% of non-change stimulus presentations are omitted. On
an omitted flash the image simply does not appear, extending the gray period
from 500 ms to 1250 ms. Because the stimulus stream is otherwise perfectly
regular, omissions create a violation of an established temporal expectation
without introducing any new visual input.

![Image changes and omissions](/resources/vl-change-omission.png)

## Session Sequence

The full sequence of session types is shown below. Every session in this
sequence, including the earliest training sessions, was acquired under the
2-photon microscope.

![Session sequence and stimulus categories](/resources/vl-session-sequence.png)

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
where a gray screen inter-stimulus interval is added to the task. Stimuli
appear for 250 ms followed by a 500 ms gray screen, then another 250 ms
stimulus, and so on. This gray screen period makes the task more difficult by
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

![Training progression for each mouse](/resources/vl-training-progression.png)

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
omissions are introduced at this point, and are present in all subsequent task
sessions.

**`OPHYS_4` — novel images.** Image set A is replaced with image set B, a
second set of 8 natural images that the mouse has never encountered. The task
contingency is unchanged and rewards are still delivered; only the images are
new. The first `OPHYS_4` session is the mouse's first exposure to image set B;
by the second session the images have already been seen for an hour.

Image set A, familiar by the time of `OPHYS_1`:

![image_set_A](/resources/image_set_A.png)

Image set B, novel at the first `OPHYS_4` session:

![image_set_B](/resources/image_set_B.png)

These are the same two image sets used in the
[Visual Behavior](/physiology/stimuli/visual-behavior/VB-Behavior) datasets.

**`OPHYS_6` — extinction.** Described in the next section.

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

Low performance in these sessions is the phenomenon of interest rather than a
data quality problem. The mouse is motivated and the apparatus is unchanged;
responding stops because the contingency has been removed.

A note for those familiar with the Visual Behavior Ophys dataset: that dataset
also contains a session type called `OPHYS_6`, but it means something else
there. Visual Behavior also has interleaved passive sessions, in which the mouse
is given its daily water beforehand and the lick spout is retracted, so the
manipulation is motivational and the learned contingency is left intact. The
Visual Learning dataset contains no passive sessions of that kind.

### Passive stimulus sessions

After the task sessions are complete, mice view visual stimuli passively, with
no reward and no behavioral requirement. These sessions characterize how each
neuron responds to classical visual stimuli, independent of task demands. Both
stimuli are standard across Allen Institute datasets and are defined in the
[visual stimulus list](/physiology/stimuli/passive-visual-stimuli/visual-stimuli-list);
see [Stimuli and Behavioral Tasks](/physiology/stimuli/stimuli) for how they are
used elsewhere in the databook.

**`STAGE_0` — natural movies.** One session presenting
[natural movie](natural-movies) clips, repeated many times.

**`STAGE_1` — drifting gratings.** Three sessions presenting
[drifting gratings](drifting-gratings) that vary in direction, temporal
frequency, and contrast. Three sessions are
acquired so that changes in the response to the same stimuli can be measured
across repeated exposure.

Because these sessions follow the task sessions in the same tracked neurons,
each neuron can be characterized both by what it encodes during behavior and
by how it responds to parametrically varying visual stimuli.

Note that mice have seen oriented gratings before reaching `STAGE_1`, since
`TRAINING_0` and `TRAINING_1` use full-field static gratings. Orientation is
therefore not novel at this point, though drift, temporal frequency, and spatial
frequency may be. The interval between the passive sessions and the preceding
task sessions varies across mice, from days to several weeks.

## Session Structure

Task sessions consist of an initial gray screen period to measure spontaneous
activity, the change detection task, a second gray screen period, and finally
10 repeats of a 30 second natural movie clip.

![Structure of a session](/resources/vl-session-structure.png)

This fingerprint movie is present from `TRAINING_5` onward and is identical in
every session that contains it. It drives strong activity across the
population, which aids cell segmentation and registration across sessions, and
because it is unchanged across days it provides a fixed reference stimulus for
comparing responses in the same neurons over the course of learning.

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

The three `TRAINING_5` variants are performance labels rather than different
kinds of session. They record whether the mouse was above criterion on that
day; the stimulus, task parameters, and data structure are identical across all
three.

Every session type listed above has accompanying 2-photon imaging data. The
imaging configuration used for each, and the session metadata table that
records the planes and depths acquired in a given session, are described in
[Visual Learning Ophys](/physiology/ophys/visual-learning/VL-Ophys).

For what these session types look like in the data itself — how the stimulus and
trial tables differ between the gratings stages, the natural-image stages, the
post-criterion sessions, and the passive sessions — see the final part of
[the ophys and behavior NWB tutorial](/physiology/ophys/visual-learning/Tutorial-VisualLearning-Ophys-Behavior-NWB), which steps through each family in
turn.
