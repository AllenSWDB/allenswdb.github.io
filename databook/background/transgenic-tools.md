(background-transgenic-tools)=
# Transgenic tools

There are a large number of transgenic tools available that enable scientists to
visualize, record, and manipulate cells in the mouse. We will briefly describe
the general transgenic approaches that we use here, but this is not an
exhaustive explanation of this full space.

## Cre/lox recombination approaches
The Cre/lox recombination system is a conditional approach that allows genes to
be removed or expressed within specific tissues or cell types. Cre is a
site-specific recombinase that drives the recombination of DNA specifically at
lox-P sites. Engineering loxP on either side of a gene of interest in a cell
that expresses Cre will result in that gene being removed from that cell. This
technique can be used to induce the expression of a gene of interest by having a
loxP-STOP-loxP sequence in front of the gene of interest. Without Cre, this gene
will not be expressed due to the STOP sequence. But when Cre is present, the
STOP sequence is removed, and the gene will be expressed. This is how we have
used {term}`Cre line`s in these experiments to drive the expression of chosen reporters.

:::{figure} ../resources/cre-lox-fig-4.png
:name: cre-lox-ref
:align: center
:width: 800

Excising a STOP sequence with Cre induces expression of the gene of interest.
Image taken from
[The Jackson Laboratory](https://www.jax.org/news-and-insights/jax-blog/2011/September/cre-lox-breeding). :::

Genes of interest can be inserted into the mouse with the use of viruses, or the
creation of transgenic mouse lines that have the gene inserted into their
genome. A common technique for using transgenic mice is to create separate
*{term}`driver line`s* and *{term}`reporter line`s*, then crossing them together in order to get
the desired gene into the desired brain region/cell type/etc. This is much more
efficient than making making a separate line for every possible gene to be
directly expressed in every possible cell type: driver and reporter lines allow
us to "mix and match" and create the exact combination we need for a given
experiment.

:::{figure} ../resources/cre-lox-fig-5.png
:name: cre-lox-ref2
:align: center
:width: 800

Crossing a driver line with a reporter line results in offspring expressing the
reporter in a subset of cells defined by the driver line. Image taken from
[The Jackson Laboratory](https://www.jax.org/news-and-insights/jax-blog/2011/September/cre-lox-breeding).
:::

## Driver lines used here

A driver line is a transgenic mouse line in which mice have had the gene for Cre
or another recombinase (such as tTA) inserted into their genome, commonly under the control of
a specific promoter. Promoters are often expressed pretty broadly across the
brain, but can also be extremely specific. Here are the driver lines and their
expression patterns for lines used in our data sets. Note that in the absence of
a reporter, Cre on its own does not greatly affect the mouse's physiology.

<b>Adora2a-Cre</b>
: In striatum, drives expression in medium spiny neurons (MSNs) expressing the
  D2 dopamine receptor. These are MSNs part of the indirect pathway.

<b>Camk2a-tTA</b>
: The is a broadly expressed promoter that uses the tetracycline-controlled transactivator
protein (tTA) to drive the expression of reporters under the TRE or tetO element. In many of
our applications, we combine both Cre and tTA to drive the expression of our reporters.

<b>Cart-IRES2-Cre</b>
: Targets Cocaine- and amphetamine-regulated transcript gene expressing neurons. This gene encodes a preproprotein that is proteolytically processed to generate multiple biologically active peptides. These peptides play a role in appetite, energy balance, maintenance of body weight, reward and addiction, and the stress response. This line was chosen to label neurons in the medial habenula and the paraventricular nucleus of the thalamus.

<b>Chat-IRES-Cre-neo</b>
: Drives expression in cholinergic neurons.

<b>Cux2-CreERT2</b>
: In cortex, drives expression in excitatory neurons in layer 2/3 and 4.

<b>Dbh-Cre-KI</b>
: Labels a small population of ~1200 neurons in the Pons (per hemisphere) that release
  norepinephrine to targets brainwide (except striatum)

<b>Drd1a-Cre</b>
: In striatum, drives expression in medium spiny neurons (MSNs) expressing the
  D1 dopamine receptor. These are MSNs part of the direct pathway.

<b>Emx1-IRES-Cre</b>
: In cortex, a pan-excitatory driver - drives expression in excitatory neurons
  across all layers. Imaged here in layer 2/3, 4, and 5.
  Emx1-IRES-Cre;Camk2a-tTA;Ai93 and Emx1-IRES-Cre;Camk2a-tTA;Ai94 mice were
  found to exhibit inter-ictal events suggesting that the dense expression of
  GCaMP6 throughout development could be disrupting normal physiological
  activity. {cite:p}`emx`

<b>Fezf2-CreER</b>
: In cortex, drives expression in corticofugal excitatory neurons in layer 5.

<b>Gal-Cre_KI187</b>
: Targets neurons that express the neuropeptide Galanin, chosen to label neurons in midline and
  interlaminar nuclei in the thalamus. Also targets cells in the hypothalamus, pons and medulla.

<b>Nr5a1-Cre</b>
: In cortex, drives expression in excitatory neurons in layer 6.

<b>Ntsr1-Cre_GN220</b>
: In cortex, drives expression in a sub-population of excitatory neurons in layer 4.

<b>Pvalb-IRES-Cre</b>
: Drives expression in Parvalbumin inhibitory interneurons.

<b>Rbp4-IRES2-Cre</b>
: In cortex, drives expression in excitatory neurons in layer 5.

<b>Rorb-IRES2-Cre</b>
: In cortex, drives expression in a sub-population of excitatory neurons in layer 4.

<b>Scnn1a-Tg3-Cre</b>
: In cortex, drives expression in a sub-population of excitatory neurons in
  layer 4. Only found in primary sensory areas (e.g. VISp)

<b>Slc17a6-IRES-Cre</b>
: Labels excitatory neurons with broad expression across most thalamic nuclei, hypothalamus
  midbrain, and brainstem but with weak expression in cortex.

<b>Slc17a7-IRES2-Cre</b>
: In cortex, a pan-excitatory driver - drives expression in excitatory neurons
  across all layers. Imaged here in layer 2/3, 4, and 5.

<b>Sst-IRES-Cre</b>
: Drives expression in Somatostatin inhibitory interneurons.

<b>Tlx3-Cre_PL56</b>
: In cortex, drives expression in cortico-cortical projecting excitatory neurons in layer 5.

<b>Vip-IRES-Cre</b>
: Drives expression in Vasoactive Intestinal Peptide inhibitory interneurons.

## Reporter lines used here

A reporter line is a transgenic mouse line in which mice have had the gene for a
*reporter* inserted into their genome, with a lox-STOP-lox preceding it so that
expression does not occur in the absence of Cre. Common reporters are
fluorescent proteins (like GFP), opsins (like ChR2), or calcium indicators (like
GCaMP). Here are the reporter lines used in our data sets:

<b>Ai93</b>
: TITL-GCaMP6f-D. Cre/Tet dependent fluorescent GCaMP6f indicator expressing
  GCaMP6 <i>fast</i>. This is often used alongside Camk2a-tTA to enhance the
  expression in excitatory neurons.

<b>Ai94</b>
: TITL-GCaMP6s;Rosa26-ZtTA. Cre/Tet dependent fluorescent GCaMP6s indicator
  expressing GCaMP6 <i>slow</i>. This is often used alongside Camk2a-tTA to
  enhance the expression in excitatory neurons.

<b>Ai148</b>
: TIT2L-GC6f-ICL-tTA2_D. Cre/Tet dependent fluorescent GCaMP6f indicator
  expressing GCaMP6 <i>fast</i>. This is a second generation reporter that uses
  a new TIGRE2 construct that contains more tTA to drive higher expression.

<b>Ai162</b>
: TIT2L-GC6s-ICL-tTA2_D. Cre/Tet dependent fluorescent GCaMP6s indicator
  expressing GCaMP6 <i>slow</i>. This is a second generation reporter that uses
  a new TIGRE2 construct that contains more tTA to drives higher expression.

<b>Ai166</b>
: TIT2L-MORF-ICL-tTA2. A Cre dependent reporter that drives sparse labeling with
GFP. The MORF introduces a stochastic translational switch, only labeling 1-5% of
Cre+ neurons.

<b>Ai32</b>
: Rosa-CAG-LSL-ChR2(H134R)-EYFP-WPRE. Cre dependent expression of
  channelrhodopsin-2 (with a gain of function H134R substitution) fused to
  enhanced yellow fluorescent protein (EYFP) for visualization. Cells expressing
  ChR2(H134R) are rapidly depolarized by illumination with blue light (450-490
  nm).

## Viruses used here

Another technique for delivering transgenes to a mouse is to use viruses,
typically adeno-associated viruses (AAVs). The gene of interest is inserted into
the AAV genome, so that when a mouse if injected the the virus, the inserted
gene is delivered to infected cells. Viruses are commonly used together with
driver or reporter lines, though the recently developed enhancer viruses allow
delivery of transgenes to specific cell populations even in wild-type mice. Here
are the viruses used in our data sets:

### Traditional AAVs

These AAVs can be paired with driver or reporter lines to drive expression of
the gene of interest. In our specific data sets, we injected viruses containing
*floxed* (flanked by loxp) genes into mouse driver lines, ensuring that
expression only takes place if the gene infects a cell that is already
expressing Cre.

<b>AAV2-Syn-Flex-ChrimsonR-tdTomato</b>
: Cre dependent expression of ChrimsonR, fused with tdTomato for visualization.

<b>pAAV-Ef1a-DIO-ChRmine-mScarlet-WPRE</b>
: Cre dependent expression of ChRmine, fused with mScarlet for visualization.

<b>AAV5-hSyn-DIO-somBiPOLES-mCerulean</b>
: Cre dependent expression of BiPOLES, fused with mCerulean for visualization.

<b>AAV-PHP-eB_Syn-Flex-2xTRE-tTA</b>
: Cre dependent tTA promoter. Often this is used to regulate the gain of expression
of Cre/Tet dependent reporters - e.g. to get sparse but strong labeling.

<b>AAV-PHP-eB-7xTRE-3x-GFP</b>
: A Cre/Tet dependent reporter that expresses {term}`GFP`.

<b>AAV-PHP-eB-7xTRE-TdTomato</b>
: A Cre/Tet dependent reporter that expresses TdTomato, a red fluorescent protein.

### Enhancer AAVs

These AAVs deliver genes together with an *enhancer* sequence. These enhancers
have been selected based on their abundance in specific cell types: as such, the
gene will only expressed if the virus infects a cell that makes use of this
specific enhancer. This allows us to deliver genes directly to a specific cell
type without needing to use a driver line.

<b>D1 enhancer - CoChR</b>
: rAAV-3xcore2_eHGT_779m-minBG-CoChR-EGFP-WPRE3-BGHpA. Drives expression of
  CoChR in direct pathway MSNs, fused with GFP for visualization.

<b>D2 enhancer - CoChR</b>
: rAAV-3xcore2_eHGT_445h-minBG-CoChR-EGFP-WPRE3-BGHpA or
  rAAV-3xcore2_eHGT_452h-minBG-CoChR-EGFP-WPRE3-BGHpA. Drives expression of
  CoChR in indirect pathway MSNs, fused with GFP for visualization.

## Do transgenic tools impact physiology or behavior?

Using transgenic tools to record or manipulate activity rests on an assumption that the expression of these tools does not greatly impact the underlying physiology or behavior that is being studied. Is this a fair assumption? Largely yes, but not 100%.

The exogenous expression of proteins have been shown to have neurotoxic effects. One notable example is the occurrence of aberrant electrical events in (primarily) Emx1-IRES-Cre;Camk2a-tTA;Ai93 mice that resemble interictal events. These are large, concerted electrical events that spread across most of cortex. As putative interictal events, these might be associated with epileptiform seizures, though they themselves are not seizures. Indeed, no other aberrant behavior or activity was reported in these mice. And while the mechanism of why these mice exhibit these events is unclear, it is likely related to very broad exogenous expression of tTA and GCaMP6f starting very early in development. {cite:p}`emx`

We further examined whether transgenic expression of GCaMP6 effect physiology this was by performing Neuropixels recordings from mice expressing GCaMP6f under the control of several of the driver lines used in the Visual Coding 2P dataset. The question here is whether the exogenous expression of these proteins (Cre, tTA, and GCaMP6f) in particular neurons would alter the underlying physiology of the population.  We compared recordings from Vip-IRES-Cre;Ai148, Sst-IRES-Cre;Ai148, Cux2-CreERT2;Camk2a-tTA;Ai93, and Slc17a7-IRES2-Cre;Camk2a-tTA;Ai93 with those from wild-type mice. Comparing unit yield, firing rate, burst fractions, responsiveness, and lifetime sparseness, we did not find significant differences between these populations. {cite:p}`siegle2021`

:::{figure} ../resources/gcamp_neuropixels.png
:name: gcamp_neuropixels
:align: center
:width: 800

Comparing responses across GCaMP-expressing mouse lines. (A) GCaMP expression patterns for the four lines used for ephys experiments. (B) Unit yield (following QC filtering) for five
areas and five genotypes. Error bars represent standard deviation across experiments; each dot represents a data point from one experiment. (C) Distribution of firing rates for neurons from each mouse line, aggregated across experiments. (D) Distribution of burst fraction (fraction of all spikes that participate in bursts) for neurons from each mouse line, aggregated across experiments. Dots represent the median of each distribution, shown in relation to a reference value of 0.3. (E) Fraction of neurons deemed responsive to drifting gratings, grouped by genotype. (F) Distribution of lifetime sparseness in response to a drifting grating stimulus, grouped by genotype. In panels (C–F), colored numbers indicate the Jensen–Shannon distance
between the wild-type distribution and the distributions of the four GCaMP-expressing mouse lines. {cite:p}`siegle2021`
:::

However, we do observe some differences in behavior across the different transgenic lines. Most notably, we find that the locomotor behavior and eye movements of mice vary across different transgenic lines. {cite:p}`de_vries_lecoq_buice` Comparing the mean running speed across mice from different transgenic lines, we find significant differences. This largely reflects differences in the amount to time the mice spend running - rather than the mice all running the same amount but at different speeds. Likewise, we see differences in the number of saccades made by mice across transgenic lines. The latter appear to potentially be related to the reporter line more than the driver lines, though this has not been confirmed.

:::{figure} ../resources/run_saccade_cre.png
:name: run_saccade_cre
:align: center
:width: 800

(Top) Distribution of mean running speeds per imaging session for the Visual Coding 2P dataset, per transgenic line. Each dot is a single session. (Bottom) Distribution of number of saccades made per imaging session for the Visual Coding 2P dataset, per transgenic line. Each dot is a single session.
:::

 
