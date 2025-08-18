**Brain Computer Interface Dataset Overview** 

This dataset contains <i>in-vivo</i> 2P calcium imaging recordings from layer 2/3 neurons in mouse 
primary motor cortex (M1) during an optical brain–computer interface (BCI) learning task. 
In this paradigm, mice control the position of a motorized reward port with the activity of a single 
“conditioned neuron” (CN) in layer 2/3 of M1. Specifically, at the start of the trial, the reward port 
is far away from the mouse and out of reach. The activity of CN controls the speed of the reward port 
toward the mouse. If the mouse can move the reward port within reach in 10 seconds from the trial start, 
a drop of water is earned as a reward (hit). If the mouse fails to bring the reward port close within 
10 seconds, the reward port returns to the starting position (miss), and a new trial starts. 
Increasing the activity of the CN results in shorter and more rewarded trials. Mice typically learn 
to increase the activity of the CN within ~30 trials (~5 minutes), leading to higher reward rates. 
Activity changes following learning are remarkably sparse, with only a small fraction of neurons 
changing their activity as much as the CN. 

In addition to neural and behavioral measurements, targeted 2P single-cell photostimulation was
performed before and after the task to assess fucntional connectivity and its changes with learning. 

![BCI_schematic](/resources/BCI_schematic.png)

**Background** 

Learning a new task or skill relies on synaptic plasticity to rewire neural circuits. The circuits 
modified by plasticity form novel sensory-to-motor associations making the learned behaviors feel 
almost automatic. The goal of the BCI dataset is to identify the “learning rules” that govern this 
plasticity. Learning rules are algorithms that determine which synapses change, when they change
and by how much. Decades of work in brain slices and invertebrate preparations have identified 
rules governing plasticity in these simpler systems, but the relevance of these rules to in vivo
plasticity in mammalian cortex remain unknown.  

A detailed understanding of the rules governing plasticity during learning in mammalian circuits 
generally, and in cortical circuits in particular, is currently lacking. While it is well-established 
that cortical plasticity is critical for learning, understanding how the basic building blocks 
identified in brain slices operate within the dynamic, recurrent, and highly interconnected networks 
of the intact brain remains a major challenge. Addressing this gap requires approaches that can both
precisely define the neural activity patterns linked to a behavioral outcome and measure the resulting
changes in connectivity within the same local circuit during learning. 

To address this challenge we developed two complimentary optical approaches in mouse primary motor 
cortex (M1). First, we use optical connection-mapping techniques that combine cellular-resolution 
2P optogenetics with calcium imaging to measure the causal connectivity between each neuron in a 
recorded population, allowing us to track changes in connectivity over time. Second, we use 
optical brain–computer interface (BCI) learning tasks that explicitly define the relationship 
between the activity of imaged MC motor cortical neurons and behavioral outcomes, enabling precise 
control over which activity patterns are rewarded. Together, these approaches allow us to study 
the learning rules that govern plasticity in motor cortex during learning.  

**Technique** 

We used resonant-scanning 2P calcium imaging to record, and two-photon photostimulation to perturb, 
the activity of populations of neurons in layer 2/3 of primary motor cortex (M1). 
These experiments rely on neurons that co-express the calcium indicator GCaMP and the 
light-activated ion channel ChRmine. We used a variety of expression strategies in this dataset, 
including Cre-driver transgenic mouse lines and viral gene transfer, to target excitatory or 
inhibitory populations. 

Because GCaMP and ChRmine are optimally excited by different wavelengths (920 nm for GCaMP; 
~1080 nm for ChRmine), we used a dual-path microscope with separate light paths for imaging 
and photostimulation. Photostimulation targeted single neurons, one at a time, to measure 
their influence on the recorded population. In this dataset we imaged a single 800x400 microns
 large plane containing ~500 neurons, with GCaMP expression present in both excitatory and inhibitory neurons.

 **Experiment** 

Each experimental session consisted of five distinct epochs: pre-spontaneous, pre-photostimulation, 
BCI, post-spontaneous, and post-photostimulation. All epochs involved fluorescence recordings from 
the same set of neurons in head-fixed mice. 


In the spontaneous epochs, mice were recorded without any instructed behavior. 
During the pre-spontaneous epoch, we identified a single “conditioned neuron” (CN) 
that would later control the BCI task. The spontaneous activity of the CN was used to calibrate 
the mapping between CN activity and lickport speed in the BCI. 


In the photostimulation epochs, a single neuron was targeted per at 600 ms time intervals.  
Target order was randomized, cycling through 50–100 neurons in the field of view, with each neuron 
stimulated for approximately 20 times (trials). The pre-photostimulation epoch provided a
baseline connectivity map before learning, while the post-photostimulation epoch was used to assess 
changes in connectivity following the BCI task. 


In the BCI task, mice controlled the position of a motorized lickport using the activity of the CN. 
At the start of each trial, the lickport began in the “far” position, 7 mm from the mouse. 
Increases in CN fluorescence moved the lickport toward the mouse at a speed proportional to CN activity.
Mice had 10 seconds to bring the lickport into the “close” position to obtain a water reward. 
Failure to reach the close position within the time limit resulted in the lickport retracting 
to the far position. 

Following the BCI session, post-spontaneous and post-photostimulation epochs were performed
 to measure changes in both network activity and functional connectivity after learning. 

 **Questions to explore** 
* How much does the conditioned neuron increase its activity during the BCI task? 
* Do other neurons change their activity during BCI learning? 
* Using the photostimulation data: 
    * Does connection strength depend on pairwise distance? 
    * Does connection strength depend on pairwise correlation? 