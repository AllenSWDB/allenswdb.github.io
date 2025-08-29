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
   contribution to the ongoing computations occurring in the brain. With
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