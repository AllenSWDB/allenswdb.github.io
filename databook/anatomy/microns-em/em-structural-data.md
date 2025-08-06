# Dataset Basics

One of the more complicated things about using connectomics data is that it's both highly multimodal — there are images, tables, meshes, and more — and that it has been designed to be dynamic, as the segmentation changes with proofeading and carries changes to synaptic connectivity and more.
This section will cover what types of data exist and how to access them.

The types of data we will describe here are:

* **Imagery**: The 3d array depicting the ultrastructure, with grayscale values.  
* **Segmentation**: A 3d array where each voxel has the root id of the segmentation at that location (see next section).  
* **Meshes**: A representation of the 3d surface of a neuron.  
* **Skeletons** : A representation of the tree-like structure of a neuron.  
* **Tables**: Database tables that describe the various types of annotations, such as cell types, synapses, and more.  

In addition, there are three primary ways to access the data:

* **Neuroglancer** : Neuroglancer is a web-based viewer to explore the 3d data, and offers access to imagery, segmentations, meshes, and annotations.  
  Its graphical interface, ability to quickly explore data, and share links make it convenient for fast exploration.
* **Dash web apps**: Web apps that allow fast querying of tables and synaptic connectivity that can also be used to generate complex Neuroglancer links.  
  Not as flexible as python programmatic access, but it can be used to quickly explore certain features of the data and visualize in Neuroglancer.
* **Python** : A collection of tools based around the CAVEclient offer a programmatic interface to the data.  

## Dataset Information Hub

### MICrONS Dataset

Because the MICrONS dataset has been in public use for several years, there are external resources for accessing it including:

* [MICrONS Explorer data portal](https://www.microns-explorer.org/) which details all resources associated with the dataset and how to access them.
* [MICrONS Tutorials](https://tutorial.microns-explorer.org/) which includes data access tutorials, updated release manifests, and the data curation and improvement programs

Most relevant information for this course has been pulled from one of the two above websites. 

If you need to look up any particular values or links for the dataset — how to open a Neuroglancer link for it, what annotation tables exist, how to find Dash Apps —
the **public MICrONs datastack** has a [useful information page](https://global.daf-apis.com/info/datastack/minnie65_public). Go there if you need to look up basic details about the dataset.

Particularly useful links here are:

* the [Spelunker neuroglancer link](https://spelunker.cave-explorer.org/#!middleauth+https://global.daf-apis.com/nglstate/api/v1/5926445942571008)
* the [public Dash Apps](https://minnie.microns-daf.com/dash/datastack/minnie65_public)
* the [list of all materialization versions](https://minnie.microns-daf.com/materialize/views/datastack/minnie65_public)
* and the [annotation tables](https://minnie.microns-daf.com/materialize/views/datastack/minnie65_public/version/1507) associated with the most recent release version (v1507).

### V1DD Dataset

The V1DD dataset also has a [public dataset hub](https://global.em.brain.allentech.org/info/datastack/v1dd_public). Go there if you need to look up basic details about the dataset.

Particularly useful links here are:

* the [Spelunker neuroglancer link](https://spelunker.cave-explorer.org/#!middleauth+https://global.em.brain.allentech.org/nglstate/api/v1/4855608998100992)
* * the public Dash Apps
* the [list of all materialization versions](https://api.em.brain.allentech.org/materialize/views/datastack/v1dd_public)
* and the annotation tables associated with the most recent release version

## How to reference a neuron

The dynamic nature of the data means that there is more than one way to reference a neuron, and each way has a slightly different meaning.

The most frequent way to reference a specific neuron is its **root id**, a unique integer that identifies a specific segmentation, and can be used in numerous places. This is generally the `pt_root_id` entry in an annotation table.
However, as proofreading occurs, the segmentation of a cell can change, and each edit creates a new "version" of a given neuron that is given its own unique root id.
Root ids thus refer to not only a specific cell, but a specific version of that cell.

When downloading meshes, querying the database, or browsing in Neuroglancer, we use the **root id** `pt_root_id` of a cell.

However, when using data from different points in time, however, root ids can change and the data might not be consistent across two time points. One way to make this easier is to only use data from one moment in time.

This is the case for the public database that will be used in the course — all data from the public database is synched up to a single moment in time, but it does mean that the analysis cannot respond to any changes in segmentation.

In some cases, in some cases, you might see the root id called a "segment id" or an "object id," but they all refer to the same thing.

For segmentations with a cell body in the volume, we also have a **cell id** (or **soma id**), which is a unique integer that identifies each nucleus in the dataset.
The advantage of the soma id is that it remains constant across all versions of a cell, so it can be used to track a cell across time.
The disadvantage is that to look up the id at any given time or to load into Neuroglancer, you need to look up the root id.

Cell ids can be found in the `nucleus_detection_v0` table in the database, as well as many of the tables that reference cell types.
