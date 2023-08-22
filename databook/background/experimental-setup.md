# Behavioral apparatus

Neurons in the visual system often have spatially selective receptive fields,
that is, they tend to responds to stimuli shown in a particular part of visual
space. In order to repeatably show stimuli to a mouse, the mice need to be
head-fixed. For all the datasets described here, this means that mice have had a
head bar that was surgically implanted prior to the experiment. For more details
about head bar see {cite:t}`groblewski2020`.

:::{figure} ../resources/Groblewski_head_fixed_mouse.jpg
---
width: 800
name: mouse-with-headbar
---
A mouse with the head bar. Image from {cite:t}`groblewski2020`.
:::

This head-bar can clamped into a recording setup and go back to nearly the same
location for each clamp cycle. The clamp used in these experiments does so with
< 10um precision. This level of precision is particularly important in
Ca{sup}`2+` imaging experiments, because it allows the experimenter to reliably
return to the same cells across multiple sessions. Further, in experiments that
include {term}`ISI`, it allows for targeting recordings to specified structures.

:::{figure} ../resources/Groblewski_head_bar_lock_in.jpg
---
width: 800
name: head-bar-clamp
---
System for clamping a head bar with high positional accuracy. Image from
{cite:t}`groblewski2020`.
:::

Head fixation allows two things.

First, this reliability allows the mouse to be reproducibly positioned on a rig.
For the datasets presented here, the mouse will be placed on a running wheel in
front of a screen. A set of cameras monitor the mouse's face, eye position, and
pupil size. For more information, see the
[Allen Brain Observtory white paper](http://help.brain-map.org/download/attachments/10616846/VisualCoding_Overview.pdf?version=5&modificationDate=1538066962631&api=v2).

:::{figure} ../resources/MouseOnRig.JPG
---
width: 800
name: mouse-on-rig
---
Mouse on behavioral apparatus. While the setup shown here is for the Visual
Coding 2-photon experiment, a similar one was used for all the datasets here.
:::

A screen is positioned in the center of gaze of the mouse's right eye, which
then presents stimuli at specific locations in the mouse's field of view.

:::{figure} ../resources/ScreenOnRig.JPG
---
width: 800
name: screen-on-rig
---

The second benefit of head fixation is that it holds the mouses head place to
facilitate neural recordings.
