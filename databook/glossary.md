# Glossary

:::{glossary}
Action potential
  A characteristic signal that appears in excitable cell membranes, which takes the
  form of an electric potential difference waveform that propagates down the length
  of the cell membrane. In neurons, these indicate neuron activation. See {term}`Spike`.

Basket cell
  A type of inhibitory neuron whose synaptic output targets the cell body and
  proximal dendrites of excitatory neurons. Many basket cells express the
  molecular marker parvalbumin (Pvalb), but not all basket cells are Pvalb+: some
  express molecules such as cholecystokinin (CCK). Pvalb basket cells are typically
  fast spiking compared to other neurons and are thought to be important for
  gain control of network activity and setting the temporal precision of network
  activity.

Bipolar cell
  A subset of {term}`VIP neuron`s with a bipolar dendritic arbor.

BCI
Brain Computer Interface
  A method of controlling a computer signal through the activity of a neuron. This can be extended to other types of devices (e.g. joysticks or robotic arms). This is also often referred to as "Brain Machine Interface"

Capsule
  A containerized computational unit on Code Ocean that bundles code, data, and software environments.

CCF
Common Coordinate Framework
  The [CCF](background/CCF.md) is a a standard 3D reference space for the mouse brain that enables spatial integration of data across modalities.

Chandelier cell
Axo-axonic cell
  A parvalbumin-expressing interneuron whose axon terminals form vertical
  "cartridges" along the axon initial segment of excitatory neurons, giving them direct control over
  action potential output. Chandelier cell bodies are concentrated near the layer 1/2
  border and in layer 5. In the Allen whole mouse brain taxonomy chandelier
  cells are a {term}`subclass` of their own, separate from other
  {term}`parvalbumin-positive interneuron`s.

ChR2
Channelrhodopsin
  A light-gated ion channel used in the field of optogenetics to control neuronal activity with light. 

Cell type taxonomy
  A hierarchical grouping of cell types defined by gene expression. The Allen
  Institute whole mouse brain taxonomy nests four levels — {term}`class`,
  {term}`subclass`, {term}`supertype`, and {term}`cluster` — comprising 34
  classes, 338 subclasses, 1,201 supertypes and 5,322 clusters. Cell type taxonomies are continuously evolving as new datasets are generated and depend strongly on the clustering methods used. 

Class
  The broadest level of a {term}`cell type taxonomy`. Among cortical neurons, the primary classes are excitatory and inhibitory neurons.

Cluster
  The finest level of a {term}`cell type taxonomy`, below {term}`supertype`.
  The word is also used generically for any grouping produced by a clustering
  algorithm, which may have nothing to do with a taxonomy level — it is worth
  checking which sense is meant.

Container
  *There is no consistent use of this term*
  Most often this refers to the set of recording sessions for a single ophys imaging plane, but can also refer to the set of sessions for an animal.

Cre line
  The Cre-lox system is a site-specific recombinase technology. Cre-recombinase
  is a tyrosine site-specific recombinase that catalyzes the recombination of
  DNA between specific sites known as <b>loxP</b> sequences. As used in these
  experiments, Cre is used with loxP {term}`Reporter line` in order to drive
  recombinase of the loxP sites and drive the expression of the reporter. As Cre
  is often expressed within a specific gene, this allows the reporter expression
  to be restricted to particular subset of cells. For specific lines used, see
  the section on [transgenic tools](background/transgenic-tools.md).

Dataset
  *There is no consistent use of this term*

DFF
Delta F over F
  The change in fluorescence normalized by the baseline fluorescence. This is how optical physiology data is often represented following image processing. This accounts for inherent differences in fluorescent indicator expression and optical paths on different instruments (though not necessarily completely). Further processing can extract {term}`event`s from the DFF trace.

Driver line
  A general term for transgenic mouse lines that are engineered to label a
  specific cell type or cell population by expressing a specific gene under
  the control of the promoter for the cell type or cell population of interest.
  A {term}`Cre line` is a common type of Driver line that allows specific
  genes to be expressed when crossed with a {term}`reporter line`.
  The driver line determines what cell population is targeted, and the
  reporter line determines what will be expressed in that specific cell population
  (for example, GFP, GCaMP, or Channelrhodopsin).

Ephys
  Shorthand for electrophysiology.

Epoch
  A period of time, usually on a longer time scale. Used here in reference to periods of a behavior or stimulus codition that span many trials and minutes. Sometimes akin to a "block" but not always.

Event
  Two use cases: One is in reference to events extracted from {term}`DFF` traces that are proportional to firing rate but not confidently single spikes. More generally, events are discrete occurrences, and can be used to refer to discrete occurrences in experiments (e.g. licks, rewards, etc).

Experiment
  *There is no consistent use of this term*
  It can refer to a stimulus protocol, an entire data collection campaign, or a single session. It is highly ambiguous.

Fast spiking neuron
FSN
FSI
    Fast spiking neurons are so called because of their "narrow," fast action
    potentials, specifically as seen in intracellular recordings of a cell in
    response to a prolonged step of current. Additionally, with sufficient
    current injection fast spiking neurons exhibit fast spike rates, and do
    not show frequency adaptation, or slowing of spike rates, over time. In
    unlabeled extracellular recordings, units with narrow action potentials are
    also referred to as fast spiking neurons. This feature is sometimes used
    to putatively label neurons with narrow spikes as particular cell types,
    such as {term}`PV neuron`s, among others.

Fluorophore
  A type of molecule which absorb light and re-emit it at a longer wavelength 
  in a process called fluorescence. As a result, fluorophores fluoresce only 
  while exposed to a light source.

GABA
  Gamma-aminobutyric acid (GABA) is the main inhibitory neurotransmitter in the
  mammalian brain. In cortex, most GABAergic neurons are local interneurons.

Genetically-encoded calcium indicator
GECI
  A protein expressed by a cell that will change its fluorescence upon binding
  to a Ca{sup}`2+` ion. Used to visualize neural activity with fluorescence
  microscopy.

GCaMP
  A family of {term}`GECI`. GCaMP was generated by a fusion of the calcium
  binding domain of the calmodulin protein with green fluorescent protein (GFP).
  In these data we use primarily GCaMP6f as well as some GCaMP6s, fast and slow
  variants respectively. These two variants differ in their sensitivity as well
  as their kinetics — primarily with regards to their decay. For more see
  {cite:t}`chen2013`.

GFP
  Green fluorescent protein. Discovered at FHL.

Higher visual area
HVA
  A **higher visual area** is a term for cortical visual areas that receive
  input from the primary visual cortex, thus considered to be "higher" in the
  visual hierarchy. In primates, higher visual areas include V2, V3, V4, V5, MT,
  etc. In the mouse, higher visual areas include: VISl, VIsal, VISpm, VISam,
  VISrl among others. For more, see {cite:t}`glickfeld_higher-order_2017`.

Hyperparameter
  A free parameter that controls behaviors in machine learning algorithms. These
  are distinct from parameters which control behaviors of the models developed by
  the algorithms; hyperparameters affect how the algorithm finds the models in
  the first place.

Interneuron
  Also known as a local interneuron; neurons with local axons that synapse
  exclusively with nearby neurons. In the cortex the term is often used to refer to inhibitory neurons.

Interspike interval
ISI
  The interspike interval is the the time between two sequential action potentials (spikes) of a neuron. The ISI is used in the quality control of spike-sorting for ephys experiments, assuring that spikes assigned to a unit don't fall within the refactory period of the neuron (a few milliseconds), indicating that there is contaimination between units.. ISI is also used to characterize firing patterns of neurons. 

Intrinsic signal imaging
ISI
  Intrinsic signal imaging, also called ISI, is a method to measure changes in
  blood flow associated with neural activity using reflectance of red light on
  the brain's surface, measured using a standard CCD camera. The amount of red
  light reflected by the brain tissue increases when oxygenated hemoglobin
  perfuses the local region. The timecourse of the ISI signal is slow, and the
  magnitude of the reflectance changes are small. As a result, the use of periodic
  stimuli can aid in signal detection. A common use of ISI is to map
  {term}`retinotopy` across the brain surface by moving a slowly drifting bar across
  the visual field then measuring the signal in each pixel at the frequency of the
  periodic drifting bar. ISI has also been used to identify orientation maps in
  species with organized orientation maps like cats and primates, as well as to
  map the location of the whisker barrels in somatosensory cortex of the mouse.
  For additional papers using ISI to map the organization of the mouse visual
  cortex see {cite:t}`kalatsky2003` and {cite:t}`garrett2014`.

Lamp5 neuron
  Inhibitory interneurons expressing the marker gene Lysosome-Associated Membrane Protein 5, typically residing in layer 1 of the cortex. The Lamp5 subclass contains multiple subtypes including {term}`Neurogliaform cells` which communciate through volume transmission.  

Local field potential
LFP
  Transient electrical potential generated in nervous tissue by the summed
  activity of cells in that tissue. This is typically measured in a lower
  temporal-frequency band of less than 250 Hz.

Marker gene 
  A gene that is expressed selectively in a specific population of cells, typically used to gain genetic access to cell types of interest for expression of genetically encoded indicators or other reporters, or to label cell types post-hoc through histology or transcriptomics. While the function of a marker gene can be relevant, the selectivity of expression is typically the primary reason for its use in systems neuroscience experiments. 

Martinotti cell
  A Martinotti cell is a particular subtype of {term}`SST neuron` that targets the apical
  dendrites of pyramidal cells in layer 1. Martinotti cells are found in layer
  2/3 and layer 5.

Minnie column
  A colloquial name for the 100 micron by 100 micron square column of cortex
  targeted for the census across layers. This column is a particularly well
  proofread collection of cells.

Minnie dataset
  A colloquial name for the millimeter-scale MICrONs electron microscopy dataset.

NWB
Neurodata Without Borders
  A standardized file format for physiology and behavior data. All of our physiology and behavior data is stored in NWB files. The Visual Coding and Visual Behavior data are in NWB files with a hdf backend, while the newer data (V1DD, BCI, Dynamic Foraging, NP Ultra & Psychedelics) have a Zarr backend - which is optimized for cloud access. More info can be found [here](https://nwb.org/)

Neurogliaform cell
  A type of interneuron that makes a diffuse axonal arbor and is thought to release {term}`GABA` through both synaptic release and volume transmission, non-selectively inhibiting neurons nearby.

Neuropixels
  A family of devices for obtaining high channel count single unit extracellular
  recordings created through a collaborative open science project funded by
  Howard Hughes Medical Institute, Gatsby Charitable Trust, the Wellcome Trust,
  and the Allen Institute. These devices utilize modern integrated circuit
  design to miniaturize aspects of electrophysiology, enabling recordings of
  hundred of single units from a single probe with minimal brain damage.
  {cite:t}`jun2017` describes these probes; a summary can also be found [here](background/neuropixels-description).

Ophys
  Shorthand for optical physiology, often in reference to {term}`Two-photon calcium imaging`, but can also include other methods such as fiber photometry.

Optogenetics
  A method for controlling the activity of neurons by expressing light activated
  ion channels (using a {term}`reporter line` ) in a specific subpopulation of
  cells (using a {term}`driver line`) to enable temporally precise control of
  neural spiking. Spiking can be suppressed or enhanced using different types of
  reporters. See {cite:t}`peron2011` for a review on optogenetics as a method.

Optotagging
  A technique that uses {term}`optogenetics` in order to identify neurons that belong to
  a specific subpopulation. See: [Optotagging](background/Optotagging).

PV neuron
Parvalbumin-positive interneuron
    Inhibitory interneurons expressing the calcium binding protein parvalbumin (PV). PV are typically {term}`Fast spiking neuron`s and have strong inhibitory effects on neighboring cells, specifically targeting the somatic compartment of excitatory neurons. The PV subclass also includes {term}`Chandelier cell`s, which target the axon initial segment of excitatory neurons.

V1
VISp
Primary visual cortex
  The largest visual area in cortex that receives inputs from the Lateral
  geniculate nucleus of thalamus. Often referred to as <b>V1</b> or <b>VISp</b>.

Pyramidal cell
  A type of excitatory neuron with a characteristic cell body shape and apical
  dendrite. In visual cortex, pyramidal cells are by far the most common type of
  excitatory neuron.

Receptive field
  In a sensory context, the receptive field of a neuron is the region of the stimulus domain in which sensory stimulus needs to lie in order to evoke a response.  For visual cortical cells, for example, the receptive field is the region of visual space in which stimuli can evoke neural responses.  In a computational context, this notion is often generalized multiple dimensions (e.g. space, time, frequency, etc.) and thus equates to the necessary stimulus features that drive neural response (e.g. a localized grating of a specific orientation and frequency).  

RS neuron
Regular Spiking neuron
  Neurons that, when injected with a long step of current in the context of
  intracellular recordings, show spike frequency adaptation where the rate of
  spiking decreases over time. These neurons also have longer (or wider) action
  potentials, and lower spike rates even when injected with large currents due
  to hyperpolarization after each action potential. These are the most common
  type of neurons in the mammalian cortex, and are often associated excitatory
  neurons. In extracellular recordings, neurons with longer action potentials
  are also sometimes referred to as regular spiking neurons, a feature which is
  used to associate these units with specific cell types, such as excitatory
  pyramidal neurons among others.

Repo
Repository
  A digital "project folder" on GitHub to store code and documentation. Importantly, the repo tracks every edit, addition, or deletion made over time to create version control.

Reporter
 An exogenous coding region joined to a promoter sequence or element in an
 expression vector that is introduced into cells to provide the means for
 measuring the promoter activity
 [source](https://www.promega.com/resources/guides/cell-biology/bioluminescent-reporters/#:~:text=What%20is%20a%20Reporter%20Gene,for%20measuring%20the%20promoter%20activity.).

Reporter line
  A <b>reporter line</b> is a transgenic mouse line that is engineered to
  express a specific protein that enables monitoring or manipulation of neural
  activity (such as GFP, GCaMP, or Channelrhodopsin) under the control of cre or
  FLP recombinase, or a tetracycline transactivator system. The gene engineered
  into the reporter line will not be expressed unless the protein that controls
  reporter gene expression (such as cre or FLP) is present, such as by breeding
  a mouse from the reporter line with a mouse from a specific {term}`Driver
  line` that expresses the control protein. Injecting a virus that delivers cre
  or FLP in a cell type specific manner can also trigger the expression of the
  reporter gene.

Retinotopy
Retinotopic map
  <b>retinotopy</b> refers to the mapping of visual space on to neural space.
  Most visual areas of the brain contain an orderly map of visual space such that
  neighboring regions in space are represented by neighboring regions in the brain.
  Retinotopic maps are typically measured in terms of altitude (aka vertical retinotopy),
  referring to the axis from upper to lower visual field, and and azimuth
  (aka horizontal retinotopy), referring to the axis from left to right in space.

ROI
  A <b>region of interest</b> is a general term that describes a subregion of an image.
  When used in reference to two photon calcium imaging, an ROI is the mask containing pixels thought to belong to a single neuron.

Saccade
  A rapid and ballistic eye movement that shifts the visual field between two fixation points. Mice are not foveal animals, and their eye movements are different from foveal animals (such as humans).

Session
  A physiological and/or behavioral recording that happens at one time.

Skeleton
  A linear tree-like structure that defines the shape of a neuron. 

SNCG neuron
  A {term}`subclass` of inhibitory interneuron expressing gamma-synuclein
  (SNCG), found across layers 2-6. Most SNCG cells are CCK-expressing
  {term}`basket cell`s that also express the cannabinoid receptor CB1, which
  makes their output sensitive to endocannabinoid signaling. Earlier taxonomies
  placed these cells with VIP and Lamp5 cells in a single Htr3a group.

SST neuron
Somatostatin-positive interneuron
  A type of inhibitory interneuron expressing the molecular marker somatostatin (SST, or
  sometimes SOM). SST neurons typically target the distal dendrites of excitatory
  neurons, and have important roles in regulating the activity of excitatory
  neurons. SST neurons also inhibit {term}`VIP neuron`s, and some SST subtypes also target {term}`PV neurons`. 

Spatial frequency
  How often sinusoidal components of as signal or structure repeat per unit of distance.
  When used in reference to drifting gratings, spatial frequency means the distance between the
  bars of the grating. Typically measured as cycles per degree.

Spatial transcriptomics
  A family of methods that measure gene expression while preserving the position
  of each cell within the tissue. Rather than dissociating the tissue, individual
  mRNA molecules are labeled in situ and imaged, so expression can be attributed
  to a particular cell at a particular location. This makes it possible to
  determine the molecular identity of cells that were also measured by another
  modality, such as {term}`Two-photon calcium imaging`, in the same tissue.

Spontaneous activity
  A period of an experiment where there is no external stimulus. In visual experiments this usually has the stimulus monitor fixed at mean luminance (e.g. so the light level doesn't change from that during the visual stimulation periods). In other experiments, that is not true.

Subclass
  A level of a {term}`cell type taxonomy`, below {term}`class` and above
  {term}`supertype`. The canonical cortical inhibitory subclasses are Pvalb,
  SST, VIP and Lamp5, each named for a marker gene. See
  {term}`PV neuron`, {term}`SST neuron` and
  {term}`VIP neuron`, and {term}`Lamp5 neuron`.

Supertype
  A level of a {term}`cell type taxonomy`, between {term}`subclass` and
  {term}`cluster`.

Targeted structure
  The brain region where data was collected from.

Temporal frequency
  How many complete periods the signal goes through for a given unit of time.
  Typically measured in Hertz.

Transgenic line
  A mouse line whose genome has been altered by the introduction of one or more
  foreign DNA sequences. For these contexts, this typical involves using
  {term}`Cre line`s to drive the expression of a {term}`Reporter line` within a
  specific subset of cells.

Two-photon calcium imaging
  A term for techniques which measure neural activity of neurons by measuring a
  fluorescent calcium indicator. These indicators are usually a protein
  expressed in a cell, such as {term}`GCaMP`, often using a specific combination
  of {term}`driver line` and {term}`reporter line`s to express GCaMP in a
  specific subset of neurons. Fluorescent dyes can also be used to perform
  calcium imaging. At rest a neuron has low levels of calcium, and when the
  neuron spikes calcium flows into the neuron and raises the level of calcium,
  which binds to the calcium indicator and increases the emitted fluorescence in
  a specific wavelength. See {cite:t}`svoboda2006` for a review of two-photon
  calcium imaging.

Unit
  A putative neuron in extracellular electrophysiology, with varying degrees of
  confidence assigned to it. In extracellular electrophysiology, neurons are
  referred to as *units*, because we cannot guarantee that all the spikes
  assigned to one unit actually originate from a single cell. Unlike in
  two-photon imaging, where you can visualize each neuron throughout the entire
  experiment, with electrophysiology we can only “see” a neuron when it fires a
  spike. If a neuron moves relative to the probe, or if it’s far away from the
  probe, some of its spikes may get mixed together with those from other
  neurons. Because of this inherent ambiguity, quality metrics allow you to find
  the right units for your analysis. Even highly contaminated units can contain
  potentially valuable information about brain states, but certain types of
  analysis require more stringent quality thresholds to ensure that all of the
  included units are well isolated from their neighbors.

VIP neuron
Vasoactive-intestinal peptide-expressing interneuron
  A type of inhibitory interneuron expressing the molecular marker vasoactive-intestinal protein. VIP neurons typically target {term}`SST neurons`s rather than excitatory neurons. This role as a "disinhibitory specialist" is thought to be important for context-dependent modulation of cortical activity. Many VIP neurons have a characteristic bipolar axon that points along the axis of the cortical column and are thus often called {term}`bipolar cell`s. 

Waveform
Spike
  In a system neuroscience setting, this often refers to the voltage over time
  measured with an electrode when an individual neuron produces an action
  potential.
:::
