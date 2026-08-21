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

# Identifying tagged neurons

As described in the optotagging section, identifying cells in an electrophysiological recording relies on looking for responses that are precisely synced with the laser stimuli. This notebook will go over how to align responses of recorded units to the laser presentations, calculate some metrics to determine how responsive the unit is, and then perform the same over all units collected during a session in order to assign cell type labels.

## Import required packages

```{code-cell} ipython3
import pynwb
import os
import numpy as np
```

## Identifying tagged cells

Every experimental session may have a different set of neurons expressing light-sensitive opsins and thus able to be identified by their laser responses. In this data set, the identities of tagged neurons were pre-computed and added to the units table.

```{code-cell} ipython3
nwb_path = '/data/ecephys_655571_2023-05-15_13-39-49_nwb/ecephys_655571_2023-05-15_13-39-49_experiment1_recording1.nwb'

nwbfile = pynwb.read_nwb(nwb_path)
```

```{code-cell} ipython3
units = nwbfile.units[:]
np.unique(units.predicted_cell_type)
```

We can see that this session had tagged D1 and D2 cells, and every unit has a label attached marking it as one of these two types or as "untagged." But how did we arrive at these labels?

```{code-cell} ipython3
units.columns
```

Many of the columns in the units table are various metrics describing the laser responsiveness of the units to the two different colors of laser (red and blue). These metrics are:
* best_site: the NPopto emission site that elicited the largest response in the unit.
* mean_latency: the mean time from laser onset to the unit's response. The unit's response is computed as the time at which the unit's firing rate becomes two standard deviations higher than its baseline.
* mean_jitter: the standard deviation of the unit's mean response latency.
* mean_reliability: the proportion of trials during which the unit has spikes during the laser presentation period.
* num_sig_pulses_paired: the number of laser pulses (out of 5) that elicited a significant increase in spike rate, as computed using a paired test (Wilcoxon signed-rank test).
* channel_diff: the distance (in number of electrodes) between the best emission site and the peak electrode channel.

For this data set, units were considered to be tagged D1 or D2 units if they 1) had a significant response to all five laser pulses of the appropriate color\*, and 2) had a channel_diff of less than 25. Tagged neurons are expected to have very reliable, low-latency responses to laser pulses. In addition, we would expect the emission site that evokes the highest response to be close to the electrode closest to the neurons: if it isn't this makes us suspect the unit is a light artifact or contaminated!

For tagged cholinergic cells, an additional criterion of mean_latency less than 7 ms (0.007 s) was added. This is to avoid considering cells tagged if they were indirectly activated by other laser-activated neurons. Because D1 and D2 cells are GABAergic, this is less of a concern for them.

+++

*\*Note*: the laser pulses criterion is actually a little more complicated. For units tagged with a blue-responsive opsin (e.g. CoChR), we look for all five blue pulses eliciting significant responses and *no more* than one red pulse eliciting a significant response. For units tagged with a red-responsive opsin (e.g. Chrmine), we look for at least four red pulses eliciting significant responses. This is because red opsins often have strong activation even to short wavelengths, but blue opsins do not have responses to long wavelengths. Thus, we find true blue responses by specifying they can not also have a red response. Additionally, opsins like Chrmine have slower response dynamics, and often don't respond to the first pulse, but have reliable responses to the rest, so we relax that criterion.

+++

How do we know which cell type is tagged with which opsin? By looking at the metadata! The identity of any laser-responsive units can be inferred from the mouse's genotype and viruses injected, both of which can be found in the metadata. A list of the mouse lines and viruses used in this dataset can be found in the optotagging and metadata sections. 