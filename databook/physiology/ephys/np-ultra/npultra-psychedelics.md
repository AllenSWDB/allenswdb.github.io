# The Neural Basis of Psychedelic Action

The Neuropixels Ultra & Psychedelics project uses ultra-high-density neuropixels electrophysiology to probe the effects of modulating serotonergic signaling on population-scale neural activity in the cortex using the psychedelic compount psilocybin. 

## Background

Psychedelic compounds such as psilocybin, lysergic acid diethylamide (LSD), psilocin, and dimethyltryptamine (DMT) are powerful agonists of the metabotropic serotonin 2A receptor ($5HT_{2A}R$) that can produce profound changes in sensory perception, cognition, and behavior. Previous work has shown that this receptor is particularly enriched in the apical dendrites of pyramidal neurons of the mammalian cortex {cite:p}`Jakab1998`. These neurons, specifically layer 5 pyramidal neurons (L5p), are unique for their long-range projections that often reach across corticies and into subcortical structures. L5p have complex dendritic arbors that critical for integrating cortical outputs from higher-order associative areas and bottom-up sensory inputs.

:::{figure} ../resources/NPUltra/Jakab_etal_1998_5HT2AR_localization.png
:name: 5HT2AR cellular localization
:align: center
:width: 800

Localization of the $5HT_{2A}R$ in the primate cortex. __A__, Dark-field photographs show the distribution of 5-HT2A receptor immunoreactivity in two representative sections of the prefron- tal cortex of an adult macaque monkey. __B__, Inset from __A__ showing $5HT_{2A}R$ labeling distribution in the cortical column. __C__ & __D__, insets from __B__. Arrows in __C__ indicate the strongest immunoreactivity in the apical dendrites of L5p neurons. From Jakab & Goldman-Rakic (1998)
:::

Current hypotheses of psychedelic effects on the nervous system suggest that the perceptual and cognitive effects of these drugs are related to alterations in pyramdial neuron dendritic excitability via $5HT_{2A}R$ activation {cite:p}`Kwan2022`. Though the exact acute and long-term effects of $5HT_{2A}R$ activation on network activity have yet to be fully elucidated, a growing concensus points toward psychedelic drugs altering dendritic integration and shifting the spike-time distribution of pyramdial neurons during the course of drug exposure while promoting long-term synaptic plasticity and potentiation (LTP). Determining the precise cell-type-specific effects on neuronal firing of psychedelic drug exposure represents and important next step for understand both the therapeutic mechanisms of these compounds as well as what they can tell us about serotonergic signaling in the cortex

:::{figure} ../resources/NPUltra/Kwan_etal_2022_NeuralBasis.png
:name: 5HT2A mechanism of action
:align: center
:width: 800

$5HT_{2A}R$ mechanism of action. __A__, Intracellular signal transduction pathways. Downstream of the 5-HT2A receptor, activation of heterotrimeric G proteins and subsequent intracellular signaling (Ca2+ release and diacylglycerol (DAG) production) synergistically activate additional downstream effects, which ultimately lead to altered neuronal firing; PIP2, phosphatidylinositol-4,5-bisphosphate; PLC-β, phospholipase C-β; ER, endoplasmic reticulum; IP3, inositol trisphosphate. __B__, *Left*, structure of the 5-HT2A receptor; right, model of the 5-HT2A receptor signaling complex in the membrane.
:::

## Dataset

The Neuropixels Ultra & Psychedelics dataset was collected to explore how different subtypes of L5p respond to psilocybin during passive spontaneous activity and with visual stimulation. The two subtypes of L5p identified and assessed in these experiments are defined by the transgenes Sim1-Cre;Ai32 and Tlx3-Cre;Ai167 and correspond to thick-tufted extratelencephalic (ET)-projecting and thin-tufted intratelencephalic (IT)-projecting neurons, respectively.

:::{figure} ../resources/NPUltra/TransgenicLines.png
:name: L5p-specific expression of Sim1-Cre;Ai32 and Tlx3-Cre;Ai167
:align: center
:width: 800

Cell-type specific transgeneic lines used in the NP Ultra & Psychedelics dataset. *Top row*, Representative sections with red insets showing the regions of the brain where images were taken. *Middle row, left*, Representative morphological reconstruction of a Sim1+ ET L5p neuron from the Allen Cell Types Database. *Middle*, Sim1-Cre;Ai32 expression of ChR2-EGFP in L5p ET neurons throughout the cortex. *Right*, Exemplar probe tract from a Neuropixels Ultra recording. *Bottom row*, Same as the middle row for Tlx3-Cre;Ai167 expressing ChrimsonR-tdTomato.
:::

L5p neurons were targeted across the brain and identified via optotagging through a whole-hemisphere cranial implant {cite:p}`Bennett2024`. Recordings were made exclusively in the cortex using four Neuropixels Ultra probes in the 192 x 2 site configuration and covered a range of higher-order, associative, and sensory cortical regions.

:::{figure} ../resources/NPUltra/Psychedelic_insertions.png
:name: NP Ultra insertion locations
:align: center
:width: 800

Insertion location of NP Ultra recordings. __A__, Whole-hemisphere craniotomy implant with insertion holes colored by the typical probes used for insertion at those locations. Probe labels (A, B, D, F) indicate the locations where most insertions were made for those probes during recording. __B__, Schematic showing the implant location and relative size compared to the mouse skull. __C__, Reconstructed probe tract location across all mice and recordings.
:::

Indivivdual mice were recorded over two days, one session per day. In the initial session (Day 1), mice were exposed to spontaneous (20 minutes), receptive field-mapping (20 minutes), and optotagging (5 minutes) epochs prior to saline (control) injection. Mice were then recorded over two more of these epoch blocks (~45 minutes each) before isoflurane anesthesia administration (1.5% maintainence) was conducted in the final minutes of the experiment with shorter blocks of spontaneous activity and receptive field mapping. The following day (Day 2) adhered to the same experiment structure, now with psilocybin administration (3 mg/kg) and without the final anesthesia epoch. All injections were given as intraperitoneal (IP) injections and isoflurane was given as a vapor with 4% induction.

:::{figure} ../resources/NPUltra/Psychedelics_ExperiimentalProtocol.png
:name: NP Ultra & Psychedelics experimental protocol
:align: center
:width: 800

Experimental protocol of Neuropixels Ultra & Psychedelics experiments. For each mouse, recordings were performed over two consecutive days with injections of saline or psilocybin on Day 1 and Day 2, respectively. 
:::

