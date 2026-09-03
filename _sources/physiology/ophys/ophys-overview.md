# Ophys

This section contains information about the calcium imaging datasets. For these datasets,
neural activity was recorded using {term}`Two-photon calcium imaging`. Transgenic tools were
used to target the expression of a fluorescent calcium indicator, {term}`GCaMP`, to a
specific population of neurons. 

## Visual Coding

The [Visual Coding 2-photon](visual-coding/vc2p-background) dataset is a survey of in vivo physiological activity
in the awake mouse visual cortex. We collected data across six different visual cortical
areas, including {term}`V1` and five {term}`HVA`s, using 14 {term}`Transgenic line`s, and
across the cortical layers. During imaging, mice were awake, head-fixed under the microscope
and positioned on a running disk that enabled them to run at will (see [here](../../background/experimental-setup.md)). The mice passively viewed an assortment of [visual stimuli](visual-coding/vc2p-stimuli) presented on a monitor. 

## V1 Deep Dive

The [V1 Deep Dive](V1DD/V1DD-overview) dataset recorded data within a 800um X 800 um X 1mm volume within {term}`V1`. The experiment was similar to the Visual Coding dataset in that awake mice were imaged on a running disk, while viewing a set of passive [visual stimuli](V1DD/V1DD-stimuli) presented on a monitor. But we used a tiling method across many sessions to densely sample the entire volume. Calcium imaging data was collected from four mice, one of which was later imaged using Electron Microscopy for reconstruction.

## Visual Behavior

The [Visual Behavior Ophys](visual-behavior/VB-Ophys) dataset measured the activity of genetically identified neurons in the visual cortex of mice performing a go/no-go visual [Change Detection Task](change_detection_task). The same population of neurons was recorded over multiple days with varying sensory and behavioral contexts, including familiar and novel stimuli, and passive exposure sessions. This dataset can be used to evaluate the influence of experience, expectation, and task engagement on neural coding and dynamics in excitatory and inhibitory cell populations. 

## Visual Learning

The [Visual Learning](visual-learning/VL-Ophys) dataset used the same [Change Detection Task](change_detection_task) as Visual Behavior, but imaged the same neurons every day across the entire training procedure, from a mouse's first exposure to the task through expert performance, novel stimuli, and extinction of the learned stimulus-reward association. All inhibitory neurons were labeled together rather than one {term}`subclass` at a time, and the {term}`subclass` of each neuron was established after the in vivo experiment by measuring gene expression in the same tissue (see [Visual Learning Transcriptomics](/cell-types/spatial-transcriptomics/VL-mFISH)). This dataset can be used to ask how molecularly defined inhibitory subclasses differ in what they encode, how they interact, and how those differences emerge as an animal learns.

## Brain Computer Interface

The [Brain Computer Interface](BCI/BCI-overview) dataset recorded layer 2/3 neurons in primary motor cortex while mice learned to control a motorized reward port with the activity of a single neuron. Each trial begins with the port out of reach, and the activity of that "conditioned neuron" drives it toward the mouse, so increasing the neuron's activity earns water sooner; mice typically learn to do so within about 30 trials. Unlike the other datasets here, the relationship between neural activity and behavioral outcome is defined by the experimenter rather than inferred, which makes it explicit which activity pattern is being rewarded. Targeted single-cell 2-photon photostimulation was performed before and after the task, giving a map of functional connectivity across the same population on either side of learning. This dataset can be used to ask which neurons change during learning and how the connections between them change with it.
