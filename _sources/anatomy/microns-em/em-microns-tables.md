# MICrONS Key Tables

The `minnie65_public` data release includes a number of annotation tables that help label the dataset.

You can see a list of data tables in the version 1507 materialization on the [Data Annotation Framework page](https://minnie.microns-daf.com/materialize/views/datastack/minnie65_public/version/1507), and browse the tables with [Table Viewer Dash App](https://minnie.microns-daf.com/dash/datastack/minnie65_public/apps/table_viewer/?datastack=%22minnie65_public%22)

Unless otherwise specified (i.e. via `desired_resolution`), all positions are in units of 4,4,40 nm/voxel resolution.

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

Table name: `synapses_pni_v2`

The only synapse table is `synapses_pni_v2`. This is by far the largest table in the dataset with 337 million entries, one for each synapse.
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

```python
# Synapse query: outputs
client.materialize.synapse_query(pre_ids=example_root_id)

# Synapse query: inputs
client.materialize.synapse_query(post_ids=example_root_id)
```


The table `synapse_target_predictions_ssa` is a reference table on `synapses_pni_2` and adds the following column for a subset of all synapses. 

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
:name: Nucleus Table
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

### Nucleus brain area assignment

Table name: `nucleus_functional_area_assignment`

Given the nucleus detection table `nucleus_detection_v0` and the transformation of 2-photon _in vivo_ imaging to the EM structural space (see functional-coregistration-tables below), each cell in the volume has been assigned to one of four visual cortical areas.

The inferred functional brain area based on the position of the nucleus in the EM volume. Area boundaries estimated from the area-membership assignments of the 2P recorded cells, after transformation to EM space.

The table `nucleus_functional_area_assignment` is a reference table on `nucleus_detection_v0` and adds the following columns:

```{list-table} 
:header-rows: 1
:name: Functional area assignment
* - Column
  - Description
* - `target_id`
  - Soma ID for the cell
* - `pt_position`  `pt_supervoxel_id`  `pt_root_id`
  - Bound spatial point columns associated with the centroid of the nucleus
* - `tag`
  - the brain area label (one of V1, AL, RL, LM)
* - `value`
  - the distance to the area boundary (in um), calculated as the mean-distance of the 10 nearest neighbors in a non-matching brain area. A larger value is further from the area boundaries, and can be interpretted as higher confidence in area assignment.
```

Tip: This is a reference table on `nucleus_detection_v0`, and can be indexed by the same nucleus `id`.

(em:cell-type-tables)=
## Cell Type Tables

There are several tables that contain information about the cell type of neurons in the dataset, with each table representing a different method of doing the classificaiton.
Because each method requires a different kind of information, not all cells are present in all tables.
Each of the cell types tables has the same format and in all cases the `id` column references the nucleus id of the cell in question.

### Manual Cell Types (V1 Column)

Table name: `allen_v1_column_types_slanted_ref` and `aibs_column_nonneuronal_ref`

A subset of nucleus detections in a 100 um column (n=2204) in VISp were manually classified by anatomists at the Allen Institute into categories of cell subclasses, first distinguishing cells into classes of non-neuronal, excitatory and inhibitory. 

The key column
```{list-table} 
:header-rows: 1
:name: AIBS Manual Cell Types, V1 Column
* - Column
  - Description
* - `id`
  - Soma ID for the cell.
* - `pt_position` \ `pt_supervoxel_id` \ `pt_root_id`
  - Bound spatial point columns associated with the centroid of the nucleus.
* - `classification-system`
  - One of `aibs_coarse_excitatory` or `aibs_coarse_inhibitory` for detected neurons, or `aibs_coarse_nonneuronal` for non-neurons (glia/pericytes).
* - `cell_type`
  - One of several cell types, detailed below
```


````{dropdown} Manual Cell Types (neurons)
```{list-table} 
:header-rows: 1
:name: Manual Cell Types (neurons)
* - Cell Type
  - Subclass
  - Description
* - `23P`
  - Excitatory
  - Layer 2/3 cells
* - `4P` 
  - Excitatory 
  - Layer 4 cells 
* - `5P-IT` 
  - Excitatory 
  - Layer 5 **i**ntra**t**elencephalic cells 
* - `5P-ET` 
  - Excitatory 
  - Layer 5 **e**xtra**t**elencephalic cells 
* - `5P-NP`
  - Excitatory
  - Layer 5 near-projecting cells
* - `6P-IT`
  - Excitatory
  - Layer 6 **i**ntra**t**elencephalic cells
* - `6P-CT`
  - Excitatory
  - Layer 6 **c**ortico**t**halamic cells
* - `BC`
  - Inhibitory
  - {term}`basket cell`
* - `BPC`
  - Inhibitory
  - {term}`Bipolar cell`. In practice, this was used for all cells thought to be {term}`VIP cell`, not only those with a bipolar dendrite.
* - `MC`
  - Inhibitory
  - Martinotti cells. In practice, this label was used for all inhibitory neurons that appeared to be {term}`Somatostatin cell`, not only those with a {term}`Martinotti cell` morphology.
* - `Unsure` 
  - Inhibitory
  - Unsure. *In practice, this label also is used for all likely-inhibitory neurons that did not match other types*
```
````

````{dropdown} Manual Cell Types (non-neurons)
```{list-table} 
:header-rows: 1
:name: Manual Cell Types (non-neurons)
* - Cell Type
  - Subclass
  - Description
* - `OPC`
  - Non-neuronal
  - Oligodendrocyte precursor cells
* - `astrocyte`
  - Non-neuronal
  - Astrocytes
* - `microglia`
  - Non-neuronal
  - Microglia
* - `pericyte`
  - Non-neuronal
  - Pericytes
* - `oligo`
  - Non-neuronal
  - Oligodendrocytes
```
````

Tip: This is a reference table on `nucleus_detection_v0`, and can be indexed by the same nucleus `id`.
### Predictions from soma/nucleus features

Table name: `aibs_metamodel_celltypes_v661`

This table contains the results of a hierarchical classifier trained on features of the cell body and nucleus of cells. This was applied to most cells in the dataset that had complete cell bodies (e.g. not cut off by the edge of the data). For more details, see [Elabbady et al. 2025](https://www.nature.com/articles/s41586-024-07765-7). In general, this does a good job, but sometimes confuses layer 5 inhibitory neurons as being excitatory: 

The key columns are:


```{list-table}
:header-rows: 1
:name: AIBS Soma Nuc Metamodel Table
* - Column
  - Description
* - `id`
  - Soma ID for the cell.
* - `pt_position` \ `pt_supervoxel_id` \ `pt_root_id`
  - Bound spatial point columns associated with the centroid of the cell nucleus.
* - `classification-system`
  - One of `excitatory_neuron` or `inhibitory_neuron` for detected neurons, or `nonneuron` for non-neurons (glia/pericytes).
* - `cell_type`
  - One of several cell types, detailed below  
```

````{dropdown} Soma-Nuc Metamodel Cell types
```{list-table} 
:header-rows: 1
:name: "AIBS Soma Nuc Metamodel: Cell Type definitions"
* - Cell Type
  - Subclass
  - Description
* - `23P`
  - Excitatory
  - Layer 2/3 cells
* - `4P` 
  - Excitatory 
  - Layer 4 cells 
* - `5P-IT` 
  - Excitatory 
  - Layer 5 **i**ntra**t**elencephalic cells 
* - `5P-ET` 
  - Excitatory 
  - Layer 5 **e**xtra**t**elencephalic cells 
* - `5P-NP`
  - Excitatory
  - Layer 5 near-projecting cells
* - `6P-IT`
  - Excitatory
  - Layer 6 **i**ntra**t**elencephalic cells
* - `6P-CT`
  - Excitatory
  - Layer 6 **c**ortico**t**halamic cells
* - `BC`
  - Inhibitory
  - {term}`basket cell`
* - `BPC`
  - Inhibitory
  - {term}`Bipolar cell`. In practice, this was used for all cells thought to be {term}`VIP cell`, not only those with a bipolar dendrite.
* - `MC`
  - Inhibitory
  - Martinotti cells. In practice, this label was used for all inhibitory neurons that appeared to be {term}`Somatostatin cell`, not only those with a {term}`Martinotti cell` morphology.
* - `NGC` 
  - Inhibitory 
  - Neurogliaform cell. *In practice, this label also is used for all inhibitory neurons in layer 1, many of which may not be neurogliaform cells although they might be in the same molecular family*
* - `OPC`
  - Non-neuronal
  - Oligodendrocyte precursor cells
* - `astrocyte`
  - Non-neuronal
  - Astrocytes
* - `microglia`
  - Non-neuronal
  - Microglia
* - `pericyte`
  - Non-neuronal
  - Pericytes
* - `oligo`
  - Non-neuronal
  - Oligodendrocytes

```

````

Previous versions of this table include: `aibs_soma_nuc_metamodel_preds_v117` (run on a subset of data, the V1 column) and `aibs_soma_nuc_exc_mtype_preds_v117` (using training data labeled by another classifier: see `mtypes` below). 

Tip: This is a reference table on `nucleus_detection_v0`, and can be indexed by the same nucleus `id`.

### Coarse prediction from spine detection
Table name: `baylor_log_reg_cell_type_coarse_v1`

This table contains the results of a logistic regression classifier trained on properties of neuronal dendrites. This was applied to many cells in the dataset, but required more data than soma and nucleus features alone and thus more cells did not complete the pipeline. It has very good performance on excitatory vs inhibitory neurons because it focuses on dendritic spines, a characteristic property of excitatory neurons. It is a good table to double check E/I classifications if in doubt.

The key columns are:

```{list-table}
:header-rows: 1
:name: Baylor Dend Feature Table
* - Column
  - Description
* - `id`
  - Soma ID for the cell.
* - `pt_position` \ `pt_supervoxel_id` \ `pt_root_id`
  - Bound spatial point columns associated with the centroid of the cell nucleus.
* - `classification-system`
  - `baylor_log_reg_cell_type_coarse` for all entries.
* - `cell_type`
  - `excitatory` or `inhibitory`
```


Tip: This is a reference table on `nucleus_detection_v0`, and can be indexed by the same nucleus `id`.

### Fine prediction from dendritic features

Table name: `aibs_metamodel_mtypes_v661_v2`

This table contains all detected neurons across the dataset, 

Excitatory neurons and inhibitory neurons were distinguished with the `soma_nucleus` model above, and subclasses were assigned based on a data-driven clustering of the neuronal features. Inhibitory neurons were classified based on how they distributed they synaptic outputs onto target cells, while exictatory neurons were classified based on a collection of dendritic feature. 

For more details, see the section on the {term}`minnie column` or read [Schneider-Mizell et al. 2025](https://www.nature.com/articles/s41586-024-07780-8). Note that all cell-type labels in this table come from a clustering specific to this paper, and while they are intended to align with the broader literature they are not a direct mapping or a well-established convention. 

For a more conventional set of labels on the same set of cells, look at the manual table `allen_v1_column_types_slanted_ref`. Cell types in that table align with those in the `aibs_metamodel_celltypes_v661` classifier above.

The key columns are:

```{list-table}
:header-rows: 1
:name: Column M-type Table

* - Column
  - Description
* - `id`
  - Soma ID for the cell.
* - `pt_position` \ `pt_supervoxel_id` \ `pt_root_id`
  - Bound spatial point columns associated with the centroid of the cell nucleus.
* - `classification-system`
  - `excitatory` or `inhibitory`.
* - `cell_type`
  - One of several cel, detailed below

```

````{dropdown} Morphology Cell types (mtypes)

```{list-table} 
:header-rows: 1
:name: "M-type: Cell Type definition"

* - Cell Type
  - Subclass
  - Description
* - `L2a` 
  - Excitatory 
  - A cluster of layer 2 (upper layer 2/3) excitatory neurons 
* - `L2b`
  - Excitatory
  - A cluster of layer 2 (upper layer 2/3) excitatory neurons 
* - `L3a`
  - Excitatory
  - A cluster of excitatory neurons transitioning between upper and lower layer 2/3.
* - `L3b`
  - Excitatory
  - A cluster of layer 3 (upper layer 2/3) excitatory neurons.
* - `L3c`
  - Excitatory
  - A cluster of layer 3 (upper layer 2/3) excitatory neurons.
* - `L4a`
  - Excitatory
  - The largest cluster of layer 4 excitatory neurons.
* - `L4b`
  - Excitatory
  - Another cluster of layer 4 excitatory neurons.
* - `L4c`
  - Excitatory
  - A cluster of layer 4 excitatory neurons along the border with layer 5.
* - `L5a`
  - Excitatory
  - A cluster of layer 5 IT neurons at the top of layer 5.
* - `L5b`
  - Excitatory
  - A cluster of layer 5 IT neurons throughout layer 5.
* - `L5ET`
  - Excitatory
  - The cluster of layer 5 ET neurons.
* - `L5NP`
  - Excitatory
  - The cluster of layer 5 NP neurons.
* - `L6a`
  - Excitatory
  - A cluster of layer 6 IT neurons at the top of layer 6.
* - `L6b`
  - Excitatory
  - A cluster of layer 6 IT neurons throughout layer 6. Note that this is different than the label "Layer 6b" which refers to a narrow band at the border between layer 6 and white matter.
* - `L6c`
  - Excitatory
  - A cluster of tall layer 6 cells (unsure if IT or CT).
* - `L6CT`
  - Excitatory
  - A cluster of tall layer 6 cells matching manual CT labels.
* - `L6wm`
  - Excitatory
  - A cluster of layer 6 cells along the border with white matter.
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


(em:proofreading-tables)=
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
Table name: `vortex_thalamic_proofreading_status`

Table of manually identified thalamic axons selected for proofreading. Treat this as a 'cell type' table for thalamic axons, but check the `proofreading_status_and_strategy` for  more detailed proofreading status of the axon.


```{list-table}
:header-rows: 1

* - Column
  - Description
* - `pt_position` 
  - The bound spatial point data associated with the axon
* - `pt_root_id`
  - The root id look up for the thalamic axons
* - `status`
  - The proofreading status of the axon, one of `non`, `clean`, `extended`. Compare also to the status in `proofreading_status_and_strategy`

```



(em:functional-coreg)=
## Functional Coregistration Tables

To relate the structural data to functional data, cell bodies must be coregistered between the functional imaging and EM volumes.

The results of this coregistration are stored in two tables with the same columns:

* `coregistration_manual_v4` : The results of manually verified coregistration. This table is well-verified, but contains fewer `ROI`s (N=15,352 root ids, 19,181 ROIs).
- `coregistration_auto_phase3_fwd_apl_vess_combined_v2` : The results of automated functional matching between the EM and 2-p functional data. This table is not manually verified, but contains more `ROI`s (N=35,466 root ids, N=83,046 ROIs).

Please see the [Functional Data](em:functional-data) section for more information about using this data.

The column descriptions are:

```{list-table} 
:header-rows: 1

* - Column
  - Description
* - `id`
  - Soma ID for the cell.
* - `pt_position` \ `pt_supervoxel_id` \ `pt_root_id`
  - Bound spatial point columns associated with the centroid of the cell nucleus being proofread.
* - `session`
  - The session index from functional imaging.
* - `scan_idx`
  - The scan index from functional imaging.
* - `unit_id`
  - The ROI index from functional imaging. Only unique within scan and session.
* - `field`
  - The field index from functional imaging.
* - `residual`
  - The residual distance between the functional and the assigned structural points after transformation, in microns.
  Smaller values indicate a closer match.
* - `score`
  - A separation score, measuring the difference between the residual distance to the assigned neuron and the distance to the nearest non-assigned neuron, in microns.
  This can be negative if the non-assigned neuron is closer than the assigned neuron.
  Larger values indicate fewer nearby neurons that could be confused with the assigned neuron.
```

This is NOT a reference table on `nucleus_detection_v0`. You will have to match the root ids between other CAVE tables. 

Data access example:

```python
# Standard query
client.materialize.query_table('coregistration_manual_v4')

# Content-aware query
client.materialize.tables.coregistration_manual_v4(id=example_nucleus_id).query()
```

### Functional properties

Table name: `digital_twin_properties_bcm_coreg_v4`

A summary of the functional properties for each of the coregistered neurons using the coregistration information from: `coregistration_manual_v4`. For details, see ([Wang et al. 2025](https://tutorial.microns-explorer.org/annotation-tables.html#ref-wang_foundation_2025)) and ([Ding et al. 2025](https://tutorial.microns-explorer.org/annotation-tables.html#ref-ding_functional_2025)).

The results of this coregistration are stored in three tables with the same columns:

* `digital_twin_properties_bcm_coreg_v4` which is mapped to `coregistration_manual_v4` This table is well-verified, but contains fewer `ROI`s (N=15,352 root ids, 19,181 ROIs).
- `digital_twin_properties_bcm_coreg_auto_phase3_fwd_v2` and `digital_twin_properties_bcm_coreg_apl_vess_fwd` which is mapped to the corresponding automatic coregistration methods. These tables are not manually verified, but contains more `ROI`s

The key columns are:

```{list-table} 
:header-rows: 1
:name: Derived Functional properties

* - Column
  - Description
* - `cc_abs`
  - Test set performance of the digital twin model unit, higher is better
* - `cc_max`
  - Neuron variability score used to normalize digital twin model unit performance
* - `cc_norm`
  - Normalized model unit performance, higher is better
* - `OSI`
  - orientation selectivity index
* - `DSI`
  - direction selectivity index
* - `gOSI`
  - global orientation selectivity index
* - `gDSI`
  - global direction selectivity index
* - `pref_ori`
  - Preferred orientation in degrees (0 - 180), vertical bar moving right is 0 and orientation increases counter-clockwise
* - `pref_dir`
  - Preferred direction in degrees (0 - 360), vertical bar moving right is 0 and orientation increases counter-clockwise
* - `readout_loc_x`
  - X coordinate of the readout location, an approximation of receptive field center in stimulus space; (-1, -1) bottom-left, (1, 1) top-right
* - `readout_loc_y`
  - Y coordinate of the readout location, an approximation of receptive field center in stimulus space; (-1, -1) bottom-left, (1, 1) top-right
```

## Summary of tables

```{list-table}
:header-rows: 1
:name: a table for your tables (MICrONS)

* - Table Name
  - Number of Annotations
  - Description 
* - `synapses_pni_2` 
  - 337,312,429 
  - The locations of synapses and the segment ids of the pre and post-synaptic automated synapse detection
* - `synapse_target_predictions_ssa`
  - 204,331,842
  - Spine/shaft/soma predictions on synapses
* - `nucleus_detection_v0`
  - 144,120
  - The locations of nuclei detected via a fully automated method
* - `nucleus_alternative_points`
  - 8,388
  - A reference annotation table marking alternative segment_id lookup locations for a subset of nuclei in nucleus_detection_v0 that is more accurate than the centroid location listed there
* - `coregistration_manual_v4`
  - 19,181
  - A table indicating the association between individual units in the functional imaging data and nuclei in the structural data, derived from human powered matching. Includes residual and separation scores to help assess confidence
* - `coregistration_auto_phase3_fwd_apl_vess_combined_v2`
  - 83,046
  - A table indicating the association between individual units in the functional imaging data and nuclei in the structural data, derived from the automated procedure. Includes residuals and separation scores to help assess confidence
* - `proofreading_status_and_strategy`
  - 2182
  - A table indicating which neurons have been proofread on their axons or dendrites
* - `aibs_column_nonneuronal_ref`
  - 542
  - Cell type reference annotations from a human expert of non-neuronal cells located amongst the Minnie V1 Column
* - `allen_v1_column_types_slanted_ref`
  - 1,357
  - Neuron cell type reference annotations from human experts of neuronal cells located amongst the Minnie V1 Column
* - `aibs_metamodel_mtypes_v661_v2`
  - 72,158
  - Reference annotations indicating the output of a model predicting cell types across the dataset based on the labels from allen_column_mtypes_v1.1
* - `aibs_metamodel_celltypes_v661`
  - 94,014
  - Reference annotations indicating the output of a model predicting cell classes based on the labels from allen_v1_column_types_slanted_ref and aibs_column_nonneuronal_ref
* - `baylor_log_reg_cell_type_coarse_v1`
  - 55,063
  - Reference annotations indicated the output of a logistic regression model predicting whether the nucleus is part of an excitatory or inhibitory cell
* - `baylor_gnn_cell_type_fine_model_v2`
  - 49,051
  - Reference annotations indicated the output of a graph neural network model predicting the cell type based on the human labels in allen_v1_column_types_slanted_ref
* - `vortex_astrocyte_proofreading_status`
  - 126
  - This table reports the status of a manually selected subset of astrocytes within the VISP column. Astrocyte seelection and proofreading performed as part of VORTEX.
* - `vortex_thalamic_proofreading_status`
  - 60
  - This table reports the status of a manually selected subset of putative thalamocortical axons
* - `vortex_peptidergic_proofreading_status`
  - 20
  - This table reports the status of a manually selected subset of long-range putative neuromodulatory axons. Distinguished by boutons with large secretory vesicles

```