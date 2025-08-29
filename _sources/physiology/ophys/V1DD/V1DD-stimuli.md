---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.15.0
kernelspec:
  display_name: Python 3 (ipykernel)
  language: python
  name: ctlut
---

# Visual stimuli

The stimulus set for the V1DD data was modified from the Visual Coding stimulus in order to quickly characterize key features of the visual activity of cortical neurons. Each session (for a given mouse) used the same stimulus. (Two mice use a slightly modified version of the stimulus, see below)

Some key differences between V1DD and Visual Coding stimuli are (1) the windowed drifting gratings, (2) flashed stimuli (natural scenes and locally sparse noise) were flashed at 3Hz to accomodate the slower imaging rate, and (3) the natural scenes were used in two ways (see below).

## Full-field drifting gratings
The [full-field drifting gratings](drifting-gratings) stimulus consists of a sinusoidal grating that is presented on the monitor that moves orthogonal to the orientation of the grating, moving in one of 12 directions (called <b>orientation</b> here) and at one of 2 <b>spatial frequencies</b> (0.04 and 0.08 cpd). The directions are specified in units of degrees and spatial frequency in cycles per degree (cpd). The grating has a temporal frequency of 1 Hz and a contrast of 80%.
Each trial is presented for 2 seconds with 1 second of mean luminance gray in between trials. Each condition was presented 8 times, in randomized order.

## Windowed drifting gratings
The [windowed drifting gratings](difting-gratings-windowed) stimulus has the same parameters sa the full-field drifting gratings, but is restricted to a 30° diameter window position to align with the population receptive field of the imaged neurons. Each condition was presented 8 times, in randomized order.

## Locally sparse noise
The [locally sparse noise](locally-sparse-noise) stimulus consists of white and black spots on a mean luminance gray background. Each spot was 9.3° per side, and had an exclusion zone of 5 pixels surrounding it. Each frame was presented at 3 Hz.

## Natural scenes
There were two [natural scenes](natural-scenes) stimuli used in these experiments. One consisted of the full 118 images from the Visual Coding stimulus, presented 8 times total, in a randomized order with two different fixed seeds. (e.g. the random order was the same for four presentations, and then a different random order for the other four presentations). The other stimulus consisted of only 12 images from that image set, presented in a frozen sequence, and repeated 40 times. For both stimuli the images were presented at 3 Hz.

## Natural movies

The [natural movies](natural-movies) were presented in different ways for different mice. For two mice (IDS TO COME), natural_movie_three (the 2 minute clip) was presented 8 times. For the other two mice (IDS TO COME), natural_movie_one (the 30 second clip) was presented 30 times. 

# Spontaneous activity

There were 5 minutes of [spontaneous activity](spontaneous-activity) during each session where the monitor was held at the mean luminance gray. 
