# BCI Stimuli

Each experimental session consisted of five distinct epochs: pre-spontaneous, pre-photostimulation, 
BCI, post-spontaneous, and post-photostimulation. All epochs involved fluorescence recordings from 
the same set of neurons in head-fixed mice. 

![BCI_schematic](/resources/BCI_schematic.png)

## Spontaneous Activity

In the spontaneous epochs, mice were recorded without any instructed behavior. 
During the pre-spontaneous epoch, we identified a single “conditioned neuron” (CN) 
that would later control the BCI task. The spontaneous activity of the CN was used to calibrate 
the mapping between CN activity and lickport speed in the BCI. (Unlike the spontaneous activity used in Visual Coding, Visual Behavior or V1 Deep Dive datasets, there was no mean luminance presented during this epoch)

## Photostimulation

In the photostimulation epochs, a single neuron was targeted per at 600 ms time intervals.  
Target order was randomized, cycling through 50–100 neurons in the field of view, with each neuron 
stimulated for approximately 20 times (trials). The pre-photostimulation epoch provided a
baseline connectivity map before learning, while the post-photostimulation epoch was used to assess changes in connectivity following the BCI task. 

## BCI Task

In the BCI task, mice controlled the position of a motorized lickport using the activity of the CN. At the start of each trial, the lickport began in the “far” position, 7 mm from the mouse. 
Increases in CN fluorescence moved the lickport toward the mouse at a speed proportional to CN activity. Mice had 10 seconds to bring the lickport into the “close” position to obtain a water reward. 
Failure to reach the close position within the time limit resulted in the lickport retracting 
to the far position. 

Following the BCI task, additional spontaneous and photostimulation epochs were performed to measure changes in both network activity and functional connectivity after learning. 
