# Visual Learning Transcriptomics

The Visual Learning dataset measures the activity of inhibitory neurons in
primary visual cortex while mice learn a go/no-go visual change detection
task, and then measures the gene expression of those same neurons in the same
tissue after the in vivo experiment is complete. This page describes the gene
expression measurements: how the tissue was processed, which genes were
measured, and what the resulting cell by gene table contains.

:::{figure} /resources/vl-overview-schematic.png
---
align: center
---
Linking neuron function to gene expression
:::

## Why measure gene expression in the imaged tissue

Inhibitory neurons are not a single population. They comprise several
molecularly distinct subclasses with different connectivity, different
intrinsic properties, and different roles in cortical computation. The
conventional way to study one of them is to choose it in advance, label it
genetically with a Cre driver line, and record it in isolation — which gives
one subclass at a time, in separate animals.

This experiment inverts that approach. All inhibitory neurons are labeled at
once with a pan-inhibitory GCaMP8s reporter, recorded together in the same
field of view across the entire training procedure, and assigned to a subclass
afterward on the basis of the genes they express. Because identity comes from
measured expression rather than from the driver line, several subclasses are
recorded simultaneously in the same animal, which is what makes questions
about interactions between subclasses accessible.

Recovering that identity requires measuring gene expression in the same
neurons that were imaged. That is what the spatial transcriptomics data
described here provides.

## Tissue processing

After the final in vivo session, the brain is removed and sectioned
**tangentially** — parallel to the cortical surface rather than across it.
Tangential sectioning is what makes the rest of the experiment possible: the
imaging planes are stacked in depth within a single field of view, so a
tangential section 350–400 µm thick contains all eight of them in one piece of
tissue. A coronal section would cut across the imaged volume and distribute
those planes across many separate sections.

:::{figure} /resources/vl-tangential-sectioning.png
---
align: center
---
The imaged volume is recovered in a single tangential section
:::

Sections are then cleared and expanded, which makes the thick tissue optically
accessible and physically separates transcripts that would otherwise be too
close together to resolve as individual puncta.

One mouse is an exception. The section from mouse 782149 is roughly 200 µm
rather than 350–400 µm, and covers only layers 1 through 3. Gene expression is
available for the superficial part of that animal's imaged volume and not for
the deeper planes.

## Hybridization chain reaction and multi-round imaging

Gene expression is measured by **hybridization chain reaction** (HCR), a
signal amplification method in which probes bound to a target mRNA nucleate
the assembly of fluorescent hairpin polymers. Each individual transcript
becomes a bright, diffraction-limited punctum, so expression is counted
directly as a number of molecules rather than inferred from bulk intensity.

:::{figure} /resources/vl-hcr-puncta-highmag.png
---
align: center
---
Individual mRNA transcripts imaged as fluorescent puncta
:::

The tissue is imaged on a Zeiss Lightsheet 7. Five genes are probed per round,
one in each of five spectral channels — 488, 514, 561, 594 and 638 nm. After a
round is imaged, the probes are stripped and the tissue is reprobed for the
next set of genes, so the same cells are imaged repeatedly across five or six
rounds and the rounds are registered back to one another afterward.

:::{figure} /resources/vl-hcr-rounds.png
---
align: center
---
One tangential section imaged across three rounds
:::

The assignment of genes to channels is deliberate rather than arbitrary.
Adjacent spectral channels bleed into one another, and that crosstalk is
corrected computationally downstream. Genes that are expected to be
co-expressed in the same cells are therefore assigned to channels that are not
adjacent: if two co-expressed genes sat in neighboring channels, genuine
co-expression and spectral crosstalk would produce the same signal and could
not be told apart.

## The gene panel

The panel targets the four canonical inhibitory subclasses and the subtypes
within them. It is not identical across mice — three animals were probed over
five rounds and three over six:

| Mice | Rounds | Genes |
|---|---|---|
| 782149, 788406, 790322 | 5 | 22 |
| 800792, 800995, 804363 | 6 | 27 |

All six mice share a 22-gene core: `GFP`, `Gad2`, `Slc17a7`, `Pvalb`, `Sst`,
`Vip`, `Lamp5`, `Npy`, `Ndnf`, `Cck`, `Crh`, `Calb1`, `Calb2`, `Tac1`, `Tac2`,
`Reln`, `Pdyn`, `Penk`, `Pthlh`, `Hpse`, `Mme`, and `Chat`. The three six-round
animals add `Sncg`, `Cnr1`, `Adra1a`, `Adra1b`, and `Htr3a`.

The panel has three kinds of gene in it. `GFP` reports the GCaMP transgene,
which marks the cells that carried the calcium indicator in vivo. `Gad2` and
`Slc17a7` are the canonical inhibitory and excitatory markers, and identify
which broad class a cell belongs to. Everything else is either a subclass
marker — `Pvalb`, `Sst`, `Vip`, `Lamp5` — or a gene that distinguishes
subtypes within a subclass: `Ndnf` for neurogliaform cells, `Cck` for basket
cells, `Calb2` for Sst Martinotti and Vip bipolar cells, and so on.

:::{figure} /resources/vl-met-morphologies.png
---
align: center
---
Representative inhibitory morphologies in cortical depth space
:::

Which round and channel a gene was imaged in is recorded alongside the
expression data, and the column names carry it directly: `R5-561-Cck` is `Cck`,
imaged in round 5 in the 561 nm channel.

## From images to a cell by gene table

The processing chain begins with the raw lightsheet acquisitions and ends with
a count of transcripts per gene per cell. Tiles from each round are stitched
into a single volume, cells are segmented, individual puncta are detected and
localized, spectral crosstalk between channels is corrected, the rounds are
registered to one another so that a cell in round 1 can be identified in round
6, and the puncta assigned to each cell are counted.

## The cell by gene table

The result is a table with one row per segmented cell and one column per gene.
Values are counts of detected transcripts. For each mouse the table covers the
entire section — roughly 76,000 cells in the case of mouse 800995 — and
includes excitatory and non-neuronal cells alongside the inhibitory ones. Only
a small fraction of these cells were also imaged in vivo.

The table is distributed as an AnnData object, one per mouse. It carries the
expression data twice. The raw integer transcript counts are held in `X`. A
normalized version is held in `layers['normalized']`, produced in two stages:
each cell is first divided by its own mean gene count, which puts a brightly
detected cell and a dimly detected one on the same footing, and each gene is
then divided by its 95th percentile across cells and clipped to 1, which makes
a rare gene and an abundant one comparable. Detection depth varies over two
orders of magnitude across cells, so the normalized matrix is what the cell
type labels below were computed on. Both are provided so that a reader who
wants counts does not have to invert a normalization, and a reader who wants
to reproduce the labels does not have to guess one.

:::{figure} /resources/vl-cellxgene-790322.png
---
align: center
---
Cells by genes for one mouse, five rounds and 22 genes
:::

The figure above shows the inhibitory cells of mouse 790322, raw counts on the
left and the normalized matrix on the right, with rows grouped by cluster. The
same view for mouse 800995 shows the six-round panel, with the five additional
genes at the right of the gene axis:

:::{figure} /resources/vl-cellxgene-800995.png
---
align: center
---
Cells by genes for a six-round mouse, 27 genes
:::

## Cell class, subclass, and cluster

Cells carry three levels of label, computed three different ways.

**Class** — `excitatory`, `inhibitory`, or `unassigned` — comes from a
threshold on raw marker counts. A cell needs at least 100 transcripts of a
class marker to be called. Any of `Gad2`, `Pvalb`, `Vip`, `Sst`, or `Npy`
clearing that bar makes a cell inhibitory; `Gad2` on its own under-calls,
because it is only moderately expressed in some interneuron types. `Slc17a7`
clearing the bar with no inhibitory marker makes a cell excitatory. Cells that
clear both `Gad2` and `Slc17a7` are left `unassigned` rather than forced into
one class, as are cells that clear nothing at all.

`Lamp5` is a subclass marker but deliberately not one of the genes that can
admit a cell to the inhibitory class. It is detected in roughly 45% of all
cells in this tissue, so gating on it would admit most of the excitatory
population.

**Cluster** comes from k-means run on the normalized matrix, separately within
each class — 20 clusters among the inhibitory cells and 12 among the
excitatory. Each cluster is named for the genes most enriched in it relative
to the other clusters, giving names like `Pvalb-2 (Mme/Calb1/Cck)`. Clustering
is computed fresh for each mouse from that mouse's own data, so cluster
identity is not comparable across animals: `Sst-3` in one mouse is not `Sst-3`
in another.

**Subclass** — `Pvalb`, `Sst`, `Vip`, or `Lamp5` — is assigned per cluster
rather than per cell. Each inhibitory cluster takes whichever of the four
canonical subclass markers has the highest mean normalized expression within
it, so the label always agrees with what the heatmap shows. A cluster in which
no marker stands out receives no subclass rather than a guess. Every cell in a
cluster inherits its cluster's subclass.

The check that these labels mean what they should is that each subclass is
brightest in its own marker gene, `Gad2` is high across all four, and
`Slc17a7` is near zero throughout.

Subclass is the level of resolution intended for most analyses. The cluster
labels are present in the data for anyone who wants finer structure, with the
caveat above that they are per-mouse. Neural activity can also be related to
graded expression across all 22 or 27 genes directly, rather than to discrete
groupings — the full expression profile of every cell is available, and
nothing requires that cell identity enter an analysis as a categorical
variable.

## The unassigned population

The class threshold is deliberately conservative, and a substantial number of
cells end up `unassigned` as a result. Two situations produce that label.
Cells expressing both `Gad2` and `Slc17a7` above threshold are usually merged
segmentations or residual contamination, and calling them either way would
propagate that error. Cells below threshold on every class marker have no
positive evidence in either direction — but because the threshold is a fixed
count applied to raw data, and detection depth varies over two orders of
magnitude between cells, a dimly detected cell can fall below it regardless of
what it actually is.

Many of these cells are usable. A less conservative classification is planned
for a future release of this dataset. In the meantime the classification can be
redone from the table itself: the raw counts, the normalized matrix, and the
per-cell marker counts that the threshold was applied to are all present, so
the gate is both auditable and replaceable. A tutorial notebook for the gene
expression data will demonstrate this.

## The neurons that were also imaged

Most of the cells described on this page were never imaged in vivo. The gene
expression measurement covers a whole tangential section; the imaging covers
eight planes within it, and a neuron must survive several registration steps
to be matched between the two. The subset carrying both a gene expression
profile and a record of activity during behavior is correspondingly smaller,
and is not a random sample of either dataset.

The procedure that links the two measurements, the identifiers involved, and
the number of neurons available at each stage are described in
[Linking Ophys and Transcriptomics](/anatomy/spatial-transcriptomics/VL-Integration).
