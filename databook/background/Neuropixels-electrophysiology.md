# Extracellular electrophysiology

Understanding how the brain produces cognition, emotion, and behavior requires
that we measure the signals that neurons are sending to one another. One
powerful tool to do this is extracellular electrophysiology.

## The basic premise: listening to the concert from the outside

Extracellular electrophysiology is analogous to eavesdropping on the electrical
conversations of neurons from outside their cell membranes. Unlike its
counterpart, intracellular electrophysiology, which provides detailed insights
from within a single neuron, placing electrodes in the extracellular space allows
better experimental access to intact brains, and in some configurations allows us
to record the collective activity of multiple neurons in their natural ensemble.
The primary readouts of this technique are extracellular action potentials or
'spikes' and local field potentials (LFPs), each offering distinct insights into
neuronal dynamics.

## Spikes and LFPs: the dual storytellers

1. **{term}`spike`s**: These are the digital currency of the brain. Each spike
   signifies the action potential of a neuron, which propagates down that
   neuron's axon and causes neurotransmitters to be released onto downstream
   neurons. In vertebrates, the majority of synaptic release is triggered by
   all-or-none action potentials, and as a result recording the action
   potentials from a neuron to a first approximation describes that neuron's
   contribution to the ongoing computations occuring in the brain. With
   advancements in multi-electrode arrays and silicon probes, we can now
   concurrently monitor the spiking activity of hundreds, if not thousands, of
   neurons spanning many brain regions.

2. **{term}`local field potential`s (LFP)**: These oscillatory signals are
   slower and reflect the summed activity of many neurons, encapsulating both
   their synaptic potentials and the inputs they receive. The power and phase of
   LFPs across different frequency bands provide a measure of network synchrony,
   connectivity, and information flow, providing additional information to
   understand brain dynamics.

## Techniques and technologies: from glass pipettes to silicon probes

The tools which neuroscientists use to measure extracellular voltages has
evolved with the field. From glass pipettes to tetrodes, multi-electrode arrays,
and now silicon probes, the granularity and scale of recordings possible with
these techniques has markedly grown.

### The silicon revolution: silicon probes in electrophysiology

Silicon probes are microfabricated devices that pack many electrodes together at
very high spatial densities. For the reasons below, silicon probes have
dramatically improved our capacity to observe neural dynamics:

- **High-density recording**: The sheer density of electrodes on a silicon probe
  allows the measurement of an individual action potential with multiple
  electrodes, or channels. It also allows multiple regions of the brain to
  measured at the same time, as a single shank of silicon can have electrodes
  patterned along its length.

- **Enhanced spike sorting**: Observing individual action potentials on several
  electrodes inherently improves spike sorting—the process of attributing spikes
  to specific neurons. With traditional methods, overlapping spikes from
  neighboring neurons were challenging to disentangle. Silicon probes, due to
  their spatial configuration, offer higher-resolution data, aiding more
  accurate spike discrimination and sorting.

- **Minimally invasive**: Their microscale size ensures reduced tissue damage
  for the same number of electrodes, permitting longer recording sessions with
  maintained tissue integrity.

## Spike sorting: isolating discrete action potentials from continuous voltage recordings

While extracellular recordings allow us to eavesdrop on these neuronal
conversations, the signals we obtain are typically a mixture of multiple
neurons' activities intermingled with noise. Disentangling this mixture signal
to identify the action potentials of individual neurons is where the essential
technique of spike sorting comes into play.

### What is spike sorting?

Spike sorting is a computational process used to identify and categorize the
action potentials—or 'spikes'—of individual neurons from the continuous voltage
recordings obtained during extracellular electrophysiology experiments. Given
that multiple nearby neurons can contribute to the recorded signals, it's not
always straightforward to determine which spike belongs to which neuron. This
problem is an example of blind source separation, where the objective is to
identify the contribution of distinct sources with unknown properties to the
mixed signal. Spike sorting aims to clarify this ambiguity.

### The nitty-gritty of spike sorting

1. **Detection**: The first step involves identifying significant voltage
   deflections amidst background noise. Typically, this involves setting a
   threshold value, and any signal exceeding this threshold is considered a
   potential spike.

2. **Extraction**: Once spikes are detected, they are extracted—often as short
   snippets of the continuous voltage trace to be analyzed further.

3. **Feature Extraction**: To differentiate spikes from different neurons, the
   waveform of each spike is transformed into a set of features that describe
   its shape. Techniques like principal component analysis (PCA) are often
   employed to reduce the dimensionality of the data while retaining the most
   distinguishing characteristics of different spike waveforms.

4. **Clustering**: Based on the extracted features, spikes are grouped into
   clusters, with each cluster ideally representing spikes from a single neuron.
   Various algorithms, ranging from k-means clustering to more sophisticated
   probabilistic models, are used to achieve this segregation. Kilosort is an
   algorithm specifically tailored to perform spike sorting with data collected
   from silicon probes.

5. **Validation**: Post clustering, it's essential to validate the results,
   ensuring that each cluster indeed represents a distinct neuron and not an
   artifact or overlapping spikes from multiple neurons. This often involves
   examining the inter-spike intervals and the refractory period, as neurons
   typically have a brief period after firing during which they cannot fire
   again.

### Why spike sorting matters

Spike sorting is crucial for several reasons:

- **Neuronal Identity**: It allows neuroscientists to attribute recorded spikes
  to individual neurons, providing insights into the firing patterns and roles
  of specific cells in neural circuits.

- **Network Analysis**: By understanding which neuron emits which spike,
  researchers can map out interactions and connectivity patterns within neuronal
  networks.

In summary, spike sorting is an indispensable tool in modern neuroscience,
bridging the gap between raw, continuous voltage recordings and the discrete,
individualistic firing patterns of neurons.

(neuropixels-data-processing)=
## Processing of Neuropixels extracellular electrophysiology

:::{figure} https://allensdk.readthedocs.io/en/latest/_static/neuropixels_data_processing.png
:name: np-data-processing-schematic-ref
:align: center
:width: 800

Neuropixels data processing
:::

Neuropixels are silicon probes contain 374 or 384 channels that continuously
detect voltage fluctuations in the surrounding neural tissue. Each channel is
split into two separate data streams, or *bands*, on the probes. The *spike
band* is digitized at 30 kHz, and contains information about action potentials
fired by neurons directly adjacent to the probe. The *LFP band* is digitized at
2.5 kHz, and records the low-frequency (<1000 Hz) fluctuations that result from
synchronized neural activity over a wider area.

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

## Neuropixels Opto

The Neuropixels Opto probe is based on the Neuropixels 1.0 probe, but with added optical stimulation capabilities, making it an excellent tool for optogenetic experiments. Like the NP 1.0, the NP Opto has 384 recording channels and 960 electrodes, and allow simultaneous dual-band recording in the spike band and LFP band. Unlike the NP 1.0, the NP opto also contains integrated photonic waveguides, allowing for light stimulation at 28 *emission sites* down the bottom 1400 um of the shank (14 red sites and 14 blue sites, spaced 100 um apart).

:::{figure} ../resources/NP-opto-configuration.png
:name: np-opto
:align: center
:width: 800

Schematic of the NP Opto channel and site arrangement, courtesy of IMEC.
:::

The NP Opto is hugely advantageous over more traditional laser stimulation methods, especially for techniques like optotagging. Making sure the electrode locations align with the area illuminated by the laser is a common problem when stimulating with implanted fibers or surface laser stimulation, but the NP Opto solves this issue, as the light emission sites are situated directly on the probe.
