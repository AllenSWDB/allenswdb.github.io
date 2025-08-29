# V1DD Key Tables

The `v1dd_public` data release includes a number of annotation tables that help label the dataset.

You can see a list of data tables in the version 1196 materialization on the [Data Annotation Framework page](https://api.em.brain.allentech.org/materialize/views/datastack/v1dd_public/version/1196), and browse the tables with [Table Viewer Dash App](https://api.em.brain.allentech.org/dash/datastack/v1dd_public/apps/table_view/?datastack=%22v1dd_public%22)

Unless otherwise specified (i.e. via `desired_resolution`), all positions are in units of 9x9x45 nm/voxel resolution.

## Common Fields

Several fields (or column names) are common to many tables.
These fall into two main classes: the spatial point columns that are how we assign annotations to cells via points in the 3d space and book-keeping columns, that are used internally to track the state of the data.

### Spatial Point Columns

Most tables have one or more **Bound Spatial Points**, which is a location in the 3d space that tells the annotation to remain associated with the root id at that location.
Bound spatial points have will have one prefix, usually `pt` (i.e. "point") and three associated columns with different suffixes: `_position`, `_supervoxel_id`, and `_root_id`.

For a given prefix `{pt}`, the three columns are as follows:

* The `{pt}_position` indicates the location of the point in 3d space.
* The `{pt}_supervoxel_id` indicates a unique identifier in the segmentation, and is mostly internal bookkeeping.
* The `{pt}_root_id` indicates the root id of the annotation at that location.

### Book-keeping Columns

Several columns are common to many or all tables, and mostly used as internal book-keeping.
Rather than describe these for every table, they will just be mentioned briefly here:

```{list-table}
:header-rows: 1

* - Column
  - Description
* - `id`
  - A unique ID specific to the annotation within that table.
* - `created`
  - The date that the annotation was created.
* - `valid`
  - Internal bookkeeping column, should always be `t` for data you can download.
* - `target_id` (optional)
  - Some tables reference other tables, particularly the nucleus table. If present, this column will be the same as `id`.
* - `created_ref` / `valid_ref` / `id_ref` (optional)
  - For reference tables, the data shows both the created/valid/id of the reference annotation and the target annotation. The values with the `_ref` suffix are those of the reference table (usually something like proofreading state or cell type) and the values without a suffix are those of the target table (usually a nucleus). 
```


## Synapse Table

Table name: `synapses_v1dd`

The only synapse table is `synapses_pni_v2`. This is by far the largest table in the dataset with 600 million entries, one for each synapse.
It contains the following columns (in addition to the bookkeeping columns):

```{list-table}
:header-rows: 1

* - Column
  - Description
* - `pre_pt_position` / `pre_pt_supervoxel_id` / `pre_pt_root_id`
  - The bound spatial point data for the presynaptic side of the synapse.
* - `post_pt_position` / `post_pt_supervoxel_id` / `post_pt_root_id`
  - The bound spatial point data for the postsynaptic side of the synapse.
* - `size`
  - The size of the synapse in voxels. This correlates well, but not perfectly, with the surface area of synapse.
* - `ctr_pt_position`
  - A position in the center of the detected synaptic junction. Of all points in the synapse table, this is usually the closest point to the surface (and thus mesh) of both neurons. Because it is at the edge of cells, it is not associated with a root id.
```

NOTE: this table is in a resolution of 9.7x9.7x45 nm resolution.

```python
# Synapse query: outputs
client.materialize.synapse_query(pre_ids=example_root_id, desired_resolution=[1,1,1])

# Synapse query: inputs
client.materialize.synapse_query(post_ids=example_root_id, desired_resolution=[1,1,1])
```


The table `synapse_target_predictions_ssa` is a reference table on `synapses_v1dd` and adds the following column for a subset of all synapses. 

```{list-table}
:header-rows: 1

* - Column
  - Description
* - `tag`
  - postsynaptic compartment predictions, one of: soma, spine, shaft
```

Example data access
```python
# Standard query
client.materialize.query_table('synapse_target_predictions_ssa', limit=10)

# Content-aware query
client.materialize.tables.synapse_target_predictions_ssa(post_pt_root_id=example_root_id).query()
```

## Nucleus Tables
The 'nucleus centroid' of a cell is unlikely to change with proofreading, and so is a useful static identifier for a given cell. The results of automatic nucleus segmentation and neuron-detection are avialable in the following tables. These tables are often the 'reference' table for other annotations.

### Nucleus Detection Table

Table name: `nucleus_detection_v0`

Nucleus detection has been used to define unique cells in the dataset.
Distinct from the neuronal segmentation, a convolutional neural network was trained to segment nuclei.
Each nucleus detection was given a unique ID, and the centroid of the nucleus was recorded as well as its volume.
Many other tables in the dataset are reference tables on `nucleus_detection_v0`, meaning they are linked by the same annotation id. 
The id of the segmented nucelus, a 6-digit integer, is static across data versions and for this reason is the preferred method to identify the same 'cell' across time. 

The key columns of `nucleus_detection_v0` are:

```{list-table} 
:header-rows: 1
:name: "Nucleus Table"
* - Column
  - Description
* - `id`
  - 6-digit number of the segmentation for that nucleus; 'nucleus ID'.
* - `pt_position` \ `pt_supervoxel_id` \ `pt_root_id`
  - Bound spatial point columns associated with the centroid of the nucleus.
```

Note that the `id` column is the nucleus ID, also called the 'soma ID' or the 'cell ID'.

```python
# Standard query
client.materialize.query_table('nucleus_detection_v0')

# Content-aware query
client.materialize.tables.nucleus_detection_v0(id=example_nucleus_id).query()
```

## Cell Type Tables

There are several tables that contain information about the cell type of neurons in the dataset, with each table representing a different method of doing the classificaiton.
Because each method requires a different kind of information, not all cells are present in all tables.
Each of the cell types tables has the same format and in all cases the `id` column references the nucleus id of the cell in question.

### Multifeature broad cell type
Table name: `cell_type_multifeature_v1

The general approach here is to cell type neurons through:

1. Dendritic features
2. Somatic features
3. Spine and target compartment features

Feature extraction is found in other places, this work is focused solely on processing these features. Moreover, it builds on a rich collection of existing cell typing, particularly at the level of excitatory/inhibitory classification.

**Note**: Only cells whose cell bodies are at least 50 microns from the borders of the dataset were used. This is not a strict limitation, but the intent was to get a large population of cells that did not have strong boundary-dominated truncation as a first pass. Many of the features would be robust to more truncation, but that is another project.

For technical details see: https://github.com/AllenInstitute/v1dd_multifeature_cell_typing/tree/main

```{list-table}
:header-rows: 1
:name: "Multifeature cell type table"

* - Column
  - Description
* - `id`
  - Soma ID for the cell.
* - `pt_position` \ `pt_supervoxel_id` \ `pt_root_id`
  - Bound spatial point columns associated with the centroid of the cell nucleus.
* - `classification-system`
  - `excitatory` or `inhibitory`.
* - `cell_type`
  - One of several cell types, detailed below

```

Cell subtypes defined from using soma, nucleus, dendrite, and spine features. 
* Excitatory neurons are labeled by projection category (IT, ET, NP, CT, and SP for subplate). 
* Inhibitory neurons follow labels based on targeting such as ITC (inhibitory targeting), STC (sparsely targeting), PTC (perisomatic targeting), and DTC (dendrite targeting), but might align more with molecular class than exact targeting for a given neuron, particularly among ITC/VIP cells.

For details about cell subtypes, reference [this nomenclature page](https://github.com/AllenInstitute/v1dd_multifeature_cell_typing/blob/main/notes_on_typing.md) or the following shorthand.

````{dropdown} Broad cell types
```{list-table} 
:header-rows: 1
:name: "Multifeature cell type definition"
* - Cell Type
  - Subclass
  - Description
* - `L2IT`
  - Excitatory
  - Layer 2 **i**ntra**t**elencephalic cells 
* - `L3IT`
  - Excitatory
  - Layer 3 **i**ntra**t**elencephalic cells 
* - `L4IT` 
  - Excitatory 
  - Layer 4 **i**ntra**t**elencephalic cells 
* - `L5IT` 
  - Excitatory 
  - Layer 5 **i**ntra**t**elencephalic cells 
* - `L5ET` 
  - Excitatory 
  - Layer 5 **e**xtra**t**elencephalic cells 
* - `L5NP`
  - Excitatory
  - Layer 5 near-projecting cells
* - `L6IT`
  - Excitatory
  - Layer 6 **i**ntra**t**elencephalic cells
* - `L6CT`
  - Excitatory
  - Layer 6 **c**ortico**t**halamic cells
* - `L6SP`
  - Excitatory
  - Layer 6 **s**ub**p**late cells
* - `PTC`
  - Inhibitory
  - Perisomatic targeting cells, a cluster of inhibitory neurons that target the soma and proximal dendrites of excitatory neurons. Approximately corresponds to {term}`basket cell`s.
* - `DTC`
  - Inhibitory
  - Dendrite targeting cells, a cluster of inhibitory neurons that target the distal dendrites of excitatory neurons. Most SST cells would be DTCS.
* - `STC`
  - Inhibitory
  - Sparsely targeting cells, a cluster of inhibitory neurons that don't concentrate multiple synapses onto the same target neurons. Many neurogliaform cells and layer 1 interneurons fall into this category.  
* - `ITC`
  - Inhibitory
  - Inhibitory targeting cells, a cluster of inhibitory neurons that preferentially target other inhibitory neurons. Most {term}`VIP cell`s would be ITCs.

```
````


### Multifeature fine cell type
Table name: `cell_type_multifeature_v1_fine`

A similar process to `cell_type_multifeature_v1` above, but with more fine splitting between subgroups. **Note:** this is under active development, reference [this nomenclature page](https://github.com/AllenInstitute/v1dd_multifeature_cell_typing/blob/main/notes_on_typing.md) for more.

### Neuron-soma table

table name: `neurons_soma_model`

A subset of nucleus detections predicted be neurons from a model trained on soma and nucleus features. Objects with two cell bodies merged together will likely not be included here, as the classifier was trained on isolated soma only. The table is effectively a filter on `nucleus_detection_v0` and has no additional information

```{list-table} 
:header-rows: 1
:name: Nucleus Soma Table
* - Column
  - Description
* - `id`
  - 6-digit number of the segmentation for that nucleus; 'nucleus ID'.
* - `pt_position` \ `pt_supervoxel_id` \ `pt_root_id`
  - Bound spatial point columns associated with the centroid of the nucleus.
```

Is returned only for the detected neuron objects. Nucleus detections not in this table may be non-neurons, multi-merged neurons, or heavily truncated neurons on the edge of the EM volume.

## Proofreading Table

Table name: `proofreading_status_and_strategy`

The table `proofreading_status_and_strategy` describes the status of cells that have undergone manual proofreading.

Because of the inherent difference in the difficulty and time required for different kinds of proofreading, we describe the status of axons and dendrites separately.

Each compartment `status` may be either:

- `FALSE`: indicates no comprehensive proofreading has been performed, or is not applicable.  
- `TRUE`: indicates that false merges have been comprehensively removed, and the compartment is at least ‘clean’. Consult the `strategy` column if completeness of the compartment is relevant to your research.

An axon or dendrite labeled as `status=TRUE` can be trusted to be correct, but may not be complete. The degree of completion can be read from the `strategy` column. For more information,  please see [Proofreading and Data Quality](em:proofreading-data-quality).

The key columns are

```{list-table} 
:header-rows: 1
:name: Proofreading Status Table

* - Column
  - Description
* - `id`
  - ID within the proofreading table (not cell id).
* - `pt_position` \ `pt_supervoxel_id` \ `pt_root_id`
  - Bound spatial point columns associated with the centroid of the cell nucleus being proofread.
* - `valid_id`
  - The root id of the neuron when it the proofreading assessment was made. NOTE: if this does not match the `pt_root_id` then the cell has undergone further changes. This is usually and improvement in proofreading, but proceed with caution.
* - `status_dendrite`
  - Boolean, `True` if the dendrite is at least 'clean', or `False` if not proofread
* - `status_axon`
  - Boolean, `True` if the axon is at least 'clean', or `False` if not proofread
* - `strategy_dendrite`
  - The strategy empolyed when proofreading the dendrite. See strategy table below for details
* - `strategy_axon`
  - The strategy employed when proofreading the axon. See strategy table below for details
```


The specific strategies are as follows:

````{dropdown}  Proofreading Strategies
```{list-table} 
:header-rows: 1
:name: Proofreading Strategies

* - Strategy
  - Description
* - `none`
  - No cleaning, and no extension. Indicates an entry in `proofreading_status` that is `FALSE` for that compartment
* - `dendrite_clean`
  - The dendrite had incorrectly-merged axon and dendritic segments comprehensively removed, meaning the input synapses are accurate. The dendrite may be incorrectly truncated by segmentation error. Not all dendrite tips have been checked for extension. No comprehensive attempt was made to re-attach spine heads.
* - `dendrite_extended`
  - The dendrite had incorrectly-merged axon and dendritic segments comprehensively removed, meaning the input synapses are accurate. Every tip was identified, manually inspected, and extended if possible. No comprehensive attempt was made to re-attach spine heads.
* - `axon_interareal`
  - The axon was extended with a preference for branches that projected to other brain areas. Some axon branches were fully extended, but local connections may be incomplete. Output synapses represent a sampling of potential partners.
* - `axon_partially_extended`
  - The axon was extended outward from the soma, following each branch to its termination. Output synapses represent a sampling of potential partners.
* - `axon_fully_extended`
  - Axon was extended outward from the soma, following each branch to its termination. After initial extension, every endpoint was identified, manually inspected, and extended again if possible. Output synapses represent a largely complete sampling of partners.

```
````

Example data access

```python
# Standard query
client.materialize.query_table('proofreading_status_and_strategy')

# Content-aware query
client.materialize.tables.proofreading_status_and_strategy(status_axon='t').query()
```

### Thalamic proofreading
Table name: `thalamic_proofreading`

Table of manually identified thalamic axons selected for proofreading. Treat this as a 'cell type' table for thalamic axons, but check the `proofreading_status_and_strategy` for the current status of the axon.


```{list-table}
:header-rows: 1

* - Column
  - Description
* - `pt_position` 
  - The bound spatial point data associated with the axon
* - `pt_root_id`
  - The root id look up for the thalamic axons
* - `tag`
  - The type of synapse, all are `putative_thalamic_axon`

```


## Functional Coregistration Tables

Table name: `functional_coregistration_manual_2`

To relate the structural data to functional data, cell bodies must be coregistered between the functional imaging and EM volumes. This table provides the lookup to match to the functional sessions, with detail on the `column` and `volume` which define the session, `plane` and `roi` which uniquely identify the associated functional cells

Note, multiple ROI can be registered to the same neuron in EM, as planes were close enough together to intersect a cell multiple times, and the central column (#5) overlaps spatially with 1-4

This is for the **Golden Mouse** 409828 only. 

The column descriptions are:

```{list-table} 
:header-rows: 1
:name: Manual coregistration

* - Column
  - Description
* - `pt_position` \ `pt_supervoxel_id` \ `pt_root_id`
  - Bound spatial point columns associated with the centroid of the cell nucleus.
* - `column`
  - which of the 5 sets of volumes which are stacked across layers of cortex, within the same location on the cortical surface  (1-5)
* - `volume`
  - which of the 5 depth organized scan sessions within a column the data came from, lower numbers are located closer the the cortical surface. (1-5)
* - `plane`
  - which of the scan planes within the multi-plane volume this was taken from (smaller planes are closer to the cortical surface) (0-5)
* - `roi`
  - The ROI index within the plane. Only unique within one combination of `plane`, `volume`, and `column`.
* - `residual`
  - The residual distance between the functional and the assigned structural points after transformation, in microns. (0 for manual table)
  Smaller values indicate a closer match.
* - `score`
  - A separation score, measuring the difference between the residual distance to the assigned neuron and the distance to the nearest non-assigned neuron, in microns.
  This can be negative if the non-assigned neuron is closer than the assigned neuron.
  Larger values indicate fewer nearby neurons that could be confused with the assigned neuron.(0 for manual table)
```

This is NOT a reference table on `nucleus_detection_v0`. You will have to match the root ids between other CAVE tables. 

Data access example:

```python
# Standard query
client.materialize.query_table('functional_coregistration_manual_2')

# Content-aware query
client.materialize.tables.functional_coregistration_manual_2(id=example_nucleus_id).query()
```


## Summary of tables

```{list-table}
:header-rows: 1
:name: a table for your tables (V1DD)

* - Table Name
  - Number of Annotations
  - Description 
* - `synapses_v1dd` 
  - 639,326,124
  - The locations of synapses and the segment ids of the pre and post-synaptic automated synapse detection
* - `synapse_target_predictions_ssa`
  - 165,533,529
  - Spine/shaft/soma predictions on synapses
* - `nucleus_detection_v0`
  - 207,455
  - The locations of nuclei detected via a fully automated method
* - `nucleus_alternative_lookup`
  - 207,455
  - A view that looks up `nucleus_aternative_points` and merges to `nucleus_deteciton_v0`
* - `neurons_soma_model`
  - 88,030
  - A subset of nucleus detections predicted be neurons from a model trained on soma and nucleus features.
* - `functional_coregistration_manual_2`
  - 571
  - A table indicating the association between individual units in the functional imaging data and nuclei in the structural data, derived from human powered matching. 
* - `proofreading_status_and_strategy`
  - 3335
  - A table indicating which neurons have been proofread on their axons or dendrites
* - `cell_type_multifeature_v1`
  - 48,077
  - Reference annotations indicating the output of a model predicting cell types across the dataset with broad cell types
* - `cell_type_multifeature_v1_fine`
  - 47,965
  - Cell types with fine categorization (perhaps too fine!) from using soma, nucleus, dendrite, and spine features. Excitatory neurons are labeled by projection category (IT, ET, NP, CT, and SP for subplate). Inhibitory neurons follow labels based on targeting such as ITC (inhibitory targeting), STC (sparsely targeting), PTC (perisomatic targeting), and DTC (dendrite targeting),
* - `thalamic_proofreading`
  - 99
  - Table of putative thalamocortical axons selected for proofreading. Get proofreading status from `proofreading_status_and_strategy`

```