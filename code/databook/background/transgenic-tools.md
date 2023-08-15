# Transgenic tools 

There are a large number of transgenic tools available that enable scientists to visualize, record, and manipulate cells in the mouse. We will briefly describe the general transgenic approaches that we use here, but this is not an exhaustive explanation of this full space.

## Cre/lox recombination approaches
The Cre/lox recombination system is a conditional approach that allows genes to be removed or expressed within specific tissues or cell types. Cre is a site-specific recombinase that drives the recombination of DNA specifically at lox-P sites. Engineering loxP on either side of a gene of interest in a cell that expresses Cre will result in that gene being removed from that cell. This technique can be used to induce the expression of a gene of interest by having a loxP-STOP-loxP sequence in front of the gene of interest. Without Cre, this gene will not be expressed due to the STOP sequence. But when Cre is present, the STOP sequence is removed, and the gene will be expressed. This is how we have used Cre lines in these experiments to drive the expression of chosen reporters.

Genes of interest can be inserted into the mouse with the use of viruses, or the creation of transgenic mouse lines that have the gene inserted into their genome. A common technique for using transgenic mice is to create separate *driver lines* and *reporter lines*, then crossing them together in order to get the desired gene into the desired brain region/cell type/etc. This is much more efficient than making making a separate line for every possible gene to be directly expressed in every possible cell type: driver and reporter lines allow us to "mix and match" and create the exact combination we need for a given experiment.

## Driver lines used here

A driver line is a transgenic mouse line in which mice have had the gene for Cre or another recombinase inserted into their genome, commonly under the control of a specific promoter. Promoters are often expressed pretty broadly across the brain, but can also be extremely specific. Here are the driver lines and their expression patterns for lines used in our data sets. Note that in the absense of a reporter, Cre on its own does not greatly affect the mouse's physiology. 

<b>Adora2a-Cre</b>
: In striatum, drives expression in medium spiny neurons (MSNs) expressing the D2 dopamine receptor. These are MSNs part of the indirect pathway.

<b>Camk2a-tTA</b>
:

<b>Chat-IRES-Cre-neo</b>
: Drives expression in cholinergic neurons.

<b>Cux2-CreERT2</b>
: In cortex, drives expression in excitatory neurons in layer 2/3 and 4.

<b>Drd1a-Cre</b>
: In striatum, drives expression in medium spiny neurons (MSNs) expressing the D1 dopamine receptor. These are MSNs part of the direct pathway.

<b>Emx1-IRES-Cre</b>
: In cortex, a pan-excitatory driver - drives expression in excitatory neurons across all layers. Imaged here in layer 2/3, 4, and 5. Emx1-IRES-Cre;Camk2a-tTA;Ai93 and Emx1-IRES-Cre;Camk2a-tTA;Ai94 mice were found to exhibit inter-ictal events suggesting that the dense expression of GCaMP6 throughout development could be disrupting normal physiological activity. {refererence}

<b>Fezf2-CreER</b>
: In cortex, drives expression in corticofugal excitatory neurons in layer 5.

<b>Nr5a1-Cre</b>
: In cortex, drives expression in excitatory nerons in layer 6.

<b>Ntsr1-Cre_GN220</b>
: In cortex, drives expression in a sub-population of excitatory neurons in layer 4.

<b>Pvalb-IRES-Cre</b>
: Drives expression in Parvalbumin inhibitory interneurons.

<b>Rbp4-IRES2-Cre</b>
: In cortex, drives expression in excitatory neurons in layer 5.

<b>Rorb-IRES2-Cre</b>
: In cortex, drives expression in a sub-population of excitatory neurons in layer 4.

<b>Scnn1a-Tg3-Cre</b>
: In cortex, drives expression in a sub-population of excitatory neurons in layer 4. Only found in primary sensory areas (e.g. VISp)

<b>Slc17a7-IRES2-Cre</b>
: In cortex, a pan-excitatory driver - drives expression in excitatory neurons across all layers. Imaged here in layer 2/3, 4, and 5. 

<b>Sst-IRES-Cre</b>
: Drives expression in Somatostatin inhibitory interneurons.

<b>Tlx3-Cre_PL56</b>
: In cortex, drives expression in cortico-cortical projecting excitatory neurons in layer 5.

<b>Vip-IRES-Cre</b>
: Drives expression in Vasoactive Intestinal Peptide inhibitory interneurons.

## Reporter lines used here

A reporter line is a transgenic mouse line in which mice have had the gene for a *reporter* inserted into their genome, with a lox-STOP-lox preceeding it so that expression does not occur in the absense of Cre. Common reporters are fluorescent proteins (like GFP), opsins (like ChR2), or calcium indicators (like GCaMP). Here are the reporter lines used in our data sets:

<b>Ai93</b>
: TITL-GCaMP6f-D. Cre/Tet dependent fluorescent GCaMP6f indicator expressing GCaMP6 <i>fast</i>. This has lower expression that the Ai148 described below and is often used alongside Camk2a-tTA to enhance the expression in excitatory neurons.

<b>Ai94</b>
: TITL-GCaMP6s;Rosa26-ZtTA. Cre/Tet dependent fluorescent GCaMP6s indicator expressing GCaMP6 <i>slow</i>. This has lower expression that the Ai162 described below and is often used alongside Camk2a-tTA to enhance the expression in excitatory neurons.

<b>Ai148</b>
: TIT2L-GC6f-ICL-tTA2_D. Cre/Tet dependent fluorescent GCaMP6f indicator expressing GCaMP6 <i>fast</i>. This is a second generation reporter that uses a new TIGRE2 construct that drives higher expression. 

<b>Ai162</b>
: TIT2L-GC6s-ICL-tTA2_D. Cre/Tet dependent fluorescent GCaMP6s indicator expressing GCaMP6 <i>slow</i>. This is a second generation reporter that uses a new TIGRE2 construct that drives higher expression. 

## Viruses used here

Another technique for delivering transgenes to a mouse is to use viruses, typically adeno-associated viruses (AAVs). The gene of interest is inserted into the AAV genome, so that when a mouse if injected the the virus, the inserted gene is delivered to infected cells. Viruses are commonly used together with driver or reporter lines, though the recently developed enhancer viruses allow delivery of transgenes to specific cell populations even in wild-type mice. Here are the viruses used in our data sets:

### Traditional AAVs

These AAVs can be paired with driver or reporter lines to drive expression of the gene of interest. In our specific data sets, we injected viruses containing *floxed* (flanked by loxp) genes into mouse driver lines, ensuring that expression only takes place if the gene infects a cell that is already expressing Cre.

<b>AAV2-Syn-Flex-ChrimsonR-tdTomato</b>
: Cre dependent expression of ChrimsonR, fused with tdTomato for visualisation.

<b>pAAV-Ef1a-DIO-ChRmine-mScarlet-WPRE</b>
: Cre dependent expression of ChRmine, fused with mScarlet for visualisation.

<b>AAV5-hSyn-DIO-somBiPOLES-mCerulean</b>
: Cre dependent expression of BiPOLES, fused with mCerulean for visualisation.

### Enhancer AAVs

These AAVs deliver genes together with an *enhancer* sequence. These enhancers have been selected based on their abundance in specific cell types: as such, the gene will only expressed if the virus infects a cell that makes use of this specific enhancer. This allows us to deliver genes directly to a specific cell type without needing to use a driver line.

<b>D1 enhancer - CoChR</b>
: rAAV-3xcore2_eHGT_779m-minBG-CoChR-EGFP-WPRE3-BGHpA. Drives expression of CoChR in direct pathway MSNs, fused with GFP for visualisation.

<b>D2 enhancer - CoChR</b>
: rAAV-3xcore2_eHGT_445h-minBG-CoChR-EGFP-WPRE3-BGHpA or rAAV-3xcore2_eHGT_452h-minBG-CoChR-EGFP-WPRE3-BGHpA. Drives expression of CoChR in indirect pathway MSNs, fused with GFP for visualisation.