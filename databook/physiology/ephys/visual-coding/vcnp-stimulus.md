---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.14.7
kernelspec:
  display_name: allensdk
  language: python
  name: allensdk
---

# Visual Stimuli

Two possible stimulus sets were used in the Visual Coding - Neuropixels project, known as `Brain Observatory 1.1` or `Functional Connectivity`. The former is largely similar to the visual stimuli used in the Visual Coding 2-photon dataset, with some key adaptations (described below). Each mouse only saw one of these two stimulus sets. It addition to these visual stimuli, an [optotagging](../../../background/Optotagging.md) stimulus was also used in each of these sessions.

## Brain Observatory 1.1

These stimulus consisted of session A and session B from Visual Coding 2-photon merged together, with two additional stimuli: Gabor patches and flashes. 

### Drifting gratings
The drifting gratings stimulus consists of a sinusoidal grating that is presented on the monitor that moves orthogonal to the orientation of the grating, moving in one of 8 directions (called <b>orientation</b>) and at one of 5 <b>temporal frequencies</b>. The directions are specified in units of degrees and temporal frequency in Hz. The grating has a spatial frequency of 0.04 cycles per degree and a contrast of 80%. Each trial is presented for 2 seconds with 1 second of mean luminance gray in between trials.

Let's look at the stimulus table for the drifting gratings stimulus

```{code-cell} ipython3

```

What are the orientation and temporal frequency values used in this stimulus?

```{code-cell} ipython3

```

How many blank sweep trials are there?

```{code-cell} ipython3

```

How many trials are there for any one stimulus condition?

```{code-cell} ipython3

```

What is the duration of a trial? 

```{code-cell} ipython3

```

What is the inter trial interval? Let's look at the first 100 trials:

```{code-cell} ipython3

```

### Static gratings
The static gratings stimulus consists of a <b>stationary</b> sinusoidal grating that is flasshed on the monitor at one of 6 <b>orientations</b>, one of 5 <b>spatial frequencies</b>, and one of 4 <b>phases</b>. The grating has a contrast of 80%. Each trial is presented for 0.25 seconds and followed immediately by the next trial without any intertrial interval. There are blanksweeps, where the grating is replaced by the mean luminance gray, interleaved among the trials.

Let's look at the stimulus table for the static gratings stimulus

```{code-cell} ipython3

```

What are the orientation, spatial frequency, and phase values used in this stimulus?

```{code-cell} ipython3

```

```{admonition} What is the phase of the grating?
:class: tip
The phase refers to the relative position of the grating. Phase 0 and Phase 0.5 are 180° apart so that the peak of the grating of phase 0 lines up with the trough of phase 0.5.

![phase](/resources/phase_figure_2.png)
```

How many blank sweep trials are there?

```{code-cell} ipython3

```

How many trials are there of any one stimulus codition?

```{code-cell} ipython3

```

What is the duration of a trial? 

```{code-cell} ipython3

```

What is the inter trial interval?

```{code-cell} ipython3

```


### Natural scenes
The natural scenes stimulus consists of a 118 black and white images that are flashed on the monitor. Each trial is presented for 0.25 seconds and followed immediately by the next trial without any intertrial interval. There are blanksweeps, where the images are replaced by the mean luminance gray, interleaved in among the trials.

Let's look at the stimulus table for the natural scenes stimulus

```{code-cell} ipython3

```

```{note} 
The blanksweeps in the natural scene stimulus table are identified by having a frame value of <b>-1</b>
```

How many blank sweep trials are there?

```{code-cell} ipython3

```

How many trials are there of any one image?

```{code-cell} ipython3

```

(ns_stimulus_template)=
### Stimulus template
The stimulus template is an array that contains the images that were presented to the mouse. This can be accessed using `get_stimulus_template()`.

```{code-cell} ipython3

```

### Natural movies

### Gabor patches

### Flashes


## Functional Connectivity




:::{figure} https://allensdk.readthedocs.io/en/latest/_static/neuropixels_stimulus_sets.png
:name: np-stimulus-sets-ref
:align: center
:width: 800

Neuropixels visual stimulus sets
:::

