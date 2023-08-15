# Optotagging

Modern neuroscientific research is showing more and more that neural circuits are composed of many subpopulations of neurons that differ in terms of morphology, connectivity, and gene expression, and thus play distinct functional roles. However, probing the responses of these distinct cell types is difficult during electrophysiological recordings as there is no easy way to separate spikes into distinct neural subpopulations. As a result, our current best method for studying these unique cell types using electrophysiology is a technique known as *optotagging*.

Briefly, optotagging is a technique where neurons belonging to a specific cell type are induced to express *opsins*, proteins which are sensitive to light and can affect the neuron's firing. Neurons belonging to this type can then be identified in recordings by their response to laser pulses. The following sections will explain more deeply how this technique is achieved.

## Opsins

To optotag specific cell populations, we need to genetically manipulate them in order to get them to respond to pulses of laser light. This is done by using genetic tools (see [LINK TO TRANSGENIC TOOLS]) to drive expression of opsins, which are light-gated ion channels. Opsins will change their conformation when exposed to specific wavelengths of light, opening a channel and allowing ions to cross the cell membrane, or in some cases driving an ion pump. This will change the voltage across the cell membrane, forcing the cell to spike (in the case of an excitatory opsin) or inhibit spiking (in the case of an inhibitory opsin).

![Example opsin](/images/channelrhodopsin.png)

The speed of the change in conformation will vary by opsin, but is generally very fast, leading to very short latency spiking in response to activation by laser.

## Laser stimulus

In order to drive spiking in cells expressing opsins, we need to shine a laser on them. In particular:
* the wavelength of the light must be well matched to the peak absorbtion of the opsin
* the light must have enough power to force conformational changes in enough of the opsin to cause the neuron to spike
* the path of the laser and the recording electrode must be well aligned, such that the neurons being picked up in a recording are also receiving laser light

In addition, the shape of the light stimulus should match the application. Optotagging commonly uses trains of short pulses to search for reliable, low-latency responses to laser. 10 ms long pulses of light presented at 20 Hz is a common stimulus profile used.

## Identifying tagged units

Laser presentation in a mouse expressing opsins in its neurons will certainly drive responses, but we need to be very careful in analysing this data to avoid false positives. Common pitfalls include:
* Electrical artifacts caused by laser onset may be confused for a responsive neuron
* Neurons may be indirectly activated via synaptic transmission from neurons that were directly activated by the opsin

The former can usually be avoided with good qc metrics on what constitutes a good unit, but the latter is a massive caveat of the optotagging approach and must be considered for every experiment, *especially* when tagging excitatory populations. The chances of incorrectly labeling indirectly activated neurons can be greatly reduced by correctly choosing the laser stimulus and analysis techniques. In addition to testing if the laser drives a significant change in firing rate, direct vs indirect responses can be distinguished by various combinations of the following techniques:
* check the response latency. Directly activated units have very short latency responses (<10 ms). Indirectly activated neurons have longer latency responses, as they must receive the signal from the pre-synaptic neuron.
* check the reliability of the response to multiple pulses presented in a short time span. Directly activated neurons should respond reliably to every pulse as the opsin directly changes the membrane voltage. Indirectly activated neurons will commonly decrease in response to subsequent pulses as they adapt to the stimulus.
* check the spread of the response latency. Directly activated neurons will have a much tighter distribution of times to first spike than indirectly activated neurons.
