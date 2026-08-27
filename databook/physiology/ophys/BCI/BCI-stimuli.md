# BCI Stimuli

Each experimental session consisted of 3 epoch types: spontaneous, photostimulation, and BCI. The spontaneous and photostimulation epochs were repeated 2 times - once before and once after the BCI task to allow for comparison of neural activity and functional connectivity before and after learning. 

## Spontaneous Activity

In the spontaneous epochs (spont and spont_post), mice were recorded without any instructed behavior. No visual stimuli or mean luminance screen was presented (unlike other datasets such as the Visual Coding, Visual Behavior, or V1 Deep Dive datasets). 

The pre-BCI spontaneous epoch served two purposes during the experiment: 
1. **Conditioned neuron (CN) selection** - one neuron was identified based on high activity modulation and weak pre-trial tuning
2.  **BCI calibration** - the spontaneous fluorescence of the CN sets the lower (F_L = median) and upper (F_U = maximum) thresholds used to control the lickport during the BCI task.

The post-BCI spontaneous epoch provides a matched baseline to measure changes in neural activity following learning. 

## Photostimulation

Holographic two-photon photostimulation was used to optogenetically activate individual neurons in each trial. In this variant of the task, 1 neuron was stimulated per trial, 50-100 neurons were stimulated in total in the FOV, each neuron was stimulated ~20 trials in randomized order. The same stimulation order from the pre-BCI photostimulation epoch was repeated for the post-BCI photostimulation epoch for direct comparison. 

**Note** The laser stimulation creates a light artifact that activates GCaMP. Neural activity responses during the stimulation period should be excluded from analysis. 

## BCI Task

In the BCI task, mice controlled the movement of a motorized lickport using the real-time fluorescence of the conditioned neuron (CN). The raw fluorescence of the CN is converted to a voltage (0-3.3V) that drives the step frequency of the lickport motor. The mapping is linear between two thresholds calibrated from the spontaneous epoch: 

**F_L** (lower threshold): median CN fluorescence during spontaneous activity 
**F_U** (upper threshold): maximum CN fluorescence during spontaneous activity 

Activity below F_L produces no movement. Activity above F_U drives the lickport at maximum speed. 

**Trial structure:** 
1. Lickport starts 7mm away from the mouse's mouth
2. An auditory cue signals trial start
3. The mouse has 10s to move the lickport to the reward position (6mm of travel) by increasing CN activity
4. If successful (hit), water reward is delivered
5. Next trial starts after CN activity drops below F_L for ≥ 200 ms followed by a 2s delay
6. On failure (miss): lickport retracts and a new trial begins 

![BCI_schematic](/resources/BCI_schematic.png)
