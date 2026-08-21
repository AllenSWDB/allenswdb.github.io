# CAVE Annotation Tables

CAVE Annotation tables are associated with specific datastacks, There are some commonalities, but the table names can differ. See the overview of relevant tables below, and visit the dataset specific pages for more details and access examples.

```{important}
Before using any programmatic access to the data, [you first need to set up your CAVEclient token](em-content:cave-setup).
```


## MICrONS


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

## V1DD

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