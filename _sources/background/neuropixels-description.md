## Neuropixels Probes

# TO DO: NEEDS FIGURES

Neuropixels are silicon probes which continuously detect voltage fluctuations in the surrounding neural tissue on 374 or 384 channels (depending on the model). Each channel is split into two separate data streams, or *bands*, on the probes. The *spike band* is digitized at 30 kHz with a 500 Hz high-pass filter, and contains information about action potentials fired by neurons directly adjacent to the probe. The *LFP band* is digitized at 2.5 kHz, and records the low-frequency (<1000 Hz) fluctuations that result from synchronized neural activity over a wider area. The shanks are generally 10 mm long shank with a 70 µm width.

Neuropixels 1.0 features 960 recording sites and 384 channels which can be configured for recording. In NP 1.0, the recording sites are squares with an edge length of 12 µm, arranged in four columns aligned in a staggered "checkerboard" pattern. They are positioned with approximately 20 µm center-to-center vertical spacings across a vertical span of approximately 3.8 mm. The geometry allows NP 1.0 data to cover a relatively large patch of the brain with high temporal resolution.

Neuropixels 2.0, by contrast, contains 1,280 recording sites per shank, 384 of which may be active at any given time. The recording sites are squares with an edge length of 12 µm. The geometry of the recording sites is denser as compared to that of NP 1.0, with a center-to-center vertical spacing of approximately 15 µm between sites. The recording sites are positioned in two vertically aligned columns which are 32 µm apart. The geometry improves the spatial resolution of the device as compared with NP 1.0.

## Neuropixels Opto

The Neuropixels Opto probe is based on the Neuropixels 1.0 probe, but includes added optical stimulation capabilities, making it an excellent tool for optogenetic experiments. Like the NP 1.0, the NP Opto has 384 recording channels and 960 electrodes, and allow simultaneous dual-band recording in the spike band and LFP band. Unlike the NP 1.0, the NP opto also contains integrated photonic waveguides, allowing for light stimulation at 28 *emission sites* down the bottom 1400 um of the shank (14 red sites and 14 blue sites, spaced 100 um apart).

:::{figure} ../resources/NP-opto-configuration.png
:name: np-opto
:align: center
:width: 800

Schematic of the NP Opto channel and site arrangement, courtesy of IMEC.
:::

The NP Opto is hugely advantageous over more traditional laser stimulation methods, especially for techniques like optotagging. Making sure the electrode locations align with the area illuminated by the laser is a common problem when stimulating with implanted fibers or surface laser stimulation, but the NP Opto solves this issue, as the light emission sites are situated directly on the probe.

## Neuropixels Ultra

The Neuropixels Ultra is also based on the Neuropixels 1.0 probe. Neuropixels Ultra differs from Neuropixels 1.0 and 2.0 in the density of the recording sites and therefore the resolution of the imaging produced. In NP 1.0 and 2.0, the spacing of the recording sites were on the order of 10 $\mu$m, reducing their ability to resolve images at smaller energy scales. Additionally, probe drift of a few micrometers could result in significant signal loss if the drift resulted in a previously sampled unit entering a 'blind spot'.

NP Ultra, in contrast, has significantly decreased electrode size and grid spacing and therefore significantly increased the density of the recording sites. In NP Ultra, the probe sites are squares with lengths of 5 µm spaced 1 µm apart, allowing the probe to resolve much smaller spatial regions. However, since the number of channels is unchanged, NP Ultra also has a reduced overall length of the region from which data can be recorded. That is, NP Ultra gathers data from a smaller region of the brain, but in higher detail, than NP 1.0 or NP 2.0. The higher resolution allows researchers to examine individual units with much higher detail, as well as to see signals with very short lifetimes.

(neuropixels-data-processing)=
## Processing of Neuropixels extracellular electrophysiology

:::{figure} https://allensdk.readthedocs.io/en/latest/_static/neuropixels_data_processing.png
:name: np-data-processing-schematic-ref
:align: center
:width: 800

Neuropixels data processing
:::

To go from the raw spike-band data to NWB files, we perform the following processing steps:

1. Median-subtraction to remove common-mode noise from the continuous traces
2. High-pass filtering (>150 Hz) and whitening across blocks of 32 channels
3. Spike sorting with [Kilosort2](https://github.com/MouseLand/Kilosort), to
   detect spikes and assign them to individual units
4. Computing the mean waveform for each unit
5. Removing units with artifactual waveforms
6. Computing quality metrics for every unit
7. Computing stimulus-specific tuning metrics

For the LFP band, we:

1. Downsample the signals in space and time (every 4th channel and every 2nd sample)
2. High-pass filter at 0.1 Hz to remove the DC offset from each channel
3. Re-reference to channels outside of the brain to remove common-mode noise

The packaged NWB files contain:

* Spike times, spike amplitudes, mean waveforms, and quality metrics for every unit
* Information about the visual stimulus
* Time series of the mouse’s running speed, pupil diameter, and pupil position
* LFP traces for channels in the brain
* Experiment metadata

All code for data processing and packaging is available in the
[ecephys_spike_sorting](https://github.com/alleninstitute/ecephys_spike_sorting)
and the ecephys section of the AllenSDK.