# Calcium imaging

{doc}`Neuropixels-electrophysiology` is just one of many methods that is used to
measure activity from individual neurons. Another class of methods involve
taking optical measurements of fluorescent compounds that change their
properties in response to action potentials. Some compounds change their
fluorescence as the membrane voltage changes, _voltage indicators_, and provide
access to the same signal that intracellular electrodes measure. However, the
field is still developing voltage indicators that have good optical properties,
and as a result are not yet routinely used to measure neural activity in awake
behaving animals. Action potentials trigger [voltage-gated calcium
channels](https://en.wikipedia.org/wiki/Voltage-gated_calcium_channel) (VGCCs)
to open and increase the intracellular concentration of calcium. Unlike voltage
indicators, there are many robust calcium indicators that provide good
sensitivity and SNR, and allow experimenters to observe action potentials using
fluorescence microscopy.

## Fluorescence: translating calcium into light

Central to calcium imaging is the concept of fluorescence. Calcium-sensitive
dyes and {term}`genetically-encoded calcium indicator`s (GECIs) are introduced
into neurons, which, upon binding to calcium, undergo changes in their
fluorescence properties. By recording these changes, we obtain a dynamic picture
of neural activity across populations of neurons, providing insights into how
neural ensembles encode, process, and transmit information.

## Advantages in the context of systems neuroscience

- **Granular View**: Calcium imaging enables a detailed view of neural
  populations, capturing the dynamics of hundreds to thousands of neurons
  simultaneously. Better yet, some microscopes can resolve individual synapses
  or other cellular compartments.
- **Cell-type Specificity**: Thanks to advances in molecular biology, we can
  direct GECIs to specific neuron types, granting us the power to dissect neural
  circuits with cell-type precision.
- **Temporal Insights**: While the temporal resolution of calcium imaging
  doesn't match that of direct electrical recordings, indicators have become
  faster over each generation. Even compartively "slow" indicators such as
  GCaMP6s are still fast enough to detect when a group of action potentials
  occur, even if it is difficult to discern individual action potentials.
- **Longitudinal recordings**: Because you can see the shape of individual
  cells, their arrangement with respect to eachother, and other tissue featuers
  like vasculature, experimenters can measure the activity of the same neurons
  over days. This can provide insight into how neural activity changes over the
  course of learning.

## Two-photon calcium imaging

Brains are three dimensional, so microscopy methods that can resolve
fluorescence in three dimensions improve our measurements of neurons in intact
brains. While wide-field microscopy can still be used on three-dimensional
structures, contrast and resolution are hampered by scattering and out-of-focus
fluorescence. Confocal imaging rejects out-of-focus light (i.e. provides optical
sectioning), but excites large amount of tissue that is not being imaged, and
also rejects photons emitted by the tissue being imaged but are scattered by the
tissue. In contrast, two-photon excitation microscopy, or two-photon microscopy
for short, uses two photons with longer wavelengths than the emitted light to
excite a fluorophore {cite:p}`denk1990`. With two-photon excitation, the
absorption is a nonlinear function of photon density, allowing microscopes to
only excite a single voxel of tissue at a time. This improves our ability to
image the activity of {term}`GECI` expressing neurons in intact tissue.
