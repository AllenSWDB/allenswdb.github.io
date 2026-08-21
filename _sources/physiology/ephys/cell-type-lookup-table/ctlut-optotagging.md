---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.15.0
kernelspec:
  display_name: Python 3 (ipykernel)
  language: python
  name: ctlut
---

# Optotagging

This dataset provides ground-truth responses from known striatal cell types, enabling us to compare their physiological properties. To match recorded units to specific cell types, we use a technique called "optotagging." 

For a deeper overview of the technique, check out the section on {doc}`/background/Optotagging`. Briefly, the technique leverages genetic tools to express light-gated ion channels (opsins) only in a target cell type. When laser light is locally delivered to brain during recording, cells expressing the opsin respond with spiking activity, confirming their identity. 

# Opsins

Opsins are light-gated ion channels that open upon exposure to specific wavelengths of light, allowing ions to cross the membrane. Depolarizing opsins (sodium channels) drive spiking while hyperpolarizing opsins (chloride channels) suppress spiking. 

The opsins used in this data set were:
* CoChR: a blue-light activated sodium channel
* ChrimsonR: a red-light activated sodium channel
* ChRmine: a red-light activated sodium channel
* BiPOLES: a red-light activated sodium channel paired with a blue-light activated chloride channel

Each mouse was transfected with two opsins: one blue-activated and one red-activated to target two different cell types. This allows us to tag two populations in a single animal distinguishable by laser color. 

```{note}
Opsin activation falls off sharply for longer wavelengths but gradually for shorter ones. Blue-activated opsins generally do not respond to red laser, but many red-activated opsins (ChRmine) respond strongly to blue laser. Keep this in mind when interpreting responses in animals expressing red-activated opsins. 
```

# Cre lines and Cre-dependent viruses

To restrict opsin expression to a specific cell type, we use Cre-lox recombination (see {doc}`/background/transgenic-tools`). Briefly, the gene for Cre recombinase is inserted into the mouse genome in such a way that it is only expressed in a specific cell type. Such mice are referred to as belonging to a specific driver line (e.g. expression of Cre is only driven in a given cell type). A Cre-dependent virus is then injected into the brain, delivering the DNA encoding the opsin we want to express. The DNA delivered by this virus is not in a usable configuration unless acted upon by Cre recombinase; as such, only cells expressing Cre will end up expressing the opsin.

The genotype for these experiments can be one of several:
* Drd1a-Cre: direct pathway striatal neurons (D1)
* Adora2a-Cre: indirect pathway striatal neurons (D2)
* Chat-IRES-Cre-neo: cholinergic neurons

# Enhancer viruses

Enhancer viruses target specific cell types directly, without requiring Cre but instead exploiting enhancer regions in the genome that are enriched in those cell types. 

If the virus name begins with Flex or DIO, it is a Cre-dependent virus. Consult the mouse's driver line to determine which cells were labeled with this opsin. Enhancer viruses will deliver their opsin directly to the cell type they target.

# Stimulus

Each session contains a laser stimulus epoch. We often try to tag two different cell types per mouse: one with a blue opsin, and one with a red opsin. Thus, we present both blue and red laser during the stimulus epoch.

The trial table contains information about each laser presentation that took place, and can be loaded with the following code:

```{hint}
nwbfile = pynwb.read_nwb(nwb_path)
stimulus_table = nwbfile.intervals['trials'].to_dataframe()
```

# Identifying tagged neurons

Because neurons are interconnected, a laser pulse activating one cell type might also affect neighboring cells through synaptic connections. To identify cells that are *directly* activated by the laser, we apply several criteria: 

* significant increase in firing rate during laser presentation
* short response latency (ruling out synaptic transmission)
* high trial-to-trial consistency
* low response jitter (one would expect a directly activated cell to have very little variability in when it gets activated)
