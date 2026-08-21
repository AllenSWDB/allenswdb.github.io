---
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.11.5
kernelspec:
  display_name: Python 3
  language: python
  name: allensdk
---

```{code-cell}
:tags: ["remove-cell"]
import os
import caveclient
try:
    os.makedirs('~/.cloudvolume/secrets')
except:
    pass
cglob = caveclient.CAVEclient(global_only=True)
cglob.auth.save_token(token=os.environ.get('API_SECRET'), overwrite=True)
del cglob
# 
```

(skeletons)=
# Skeletons 

```{important}
Before using any programmatic access to the data, [you first need to set up your CAVEclient token](em-content:cave-setup).
```

Often in working with neurons, you want to measure things along a linear dimension of a neuron. Length of axon, for example. Or number of branches. However, the EM segmentation is a complex 3d shape that makes this non-trivial.

```{figure} img/segmentation_mesh_skeleton_representation.png
---
align: center
---
Electron microscopy data can be represented and rendered in multiple formats, at different levels of abstraction from the original imagery
```

There are methods for reducing the shape of a segmented neuron down to a linear tree-like structure usually referred to as a **skeleton**. We have precalculated skeletons for a large number of cells in the MICrONS dataset, including the proofread cells with the most complete axons. 

There are several **formats** of EM skeleton that you may encounter in this workshop and tutorial material. See the subsections below for more about them. As a summary:

* swc skeleton : files end in .swc
* meshwork skeleton : objects saved in h5 file format
* precomputed skeleton : a binary file for each skeleton, within a directory with metadata 'info' files on how to render them

**All of these formats are composed of a set of vertices and edges which form the graph of the neuron's branching structure.** As well as information about the **compartment type** of the vertex, indicating if it is axon, dendrite, soma etc. And the **radius** of the branch, measured as half the cable thickness in micrometers. 

However, the different formats may have different metadata attached to each vertex. **Meshwork** skeleton objects may include annotations about the input and output synapses, and provide functions to operate on the graph of the skeleton. **Precomputed** format may include arbitrary **vertex properties** that summarize connectivity information (for EM neurons) and CCF brain area (for exaSPIM neurons; see the section on Single Cell Morphology for more)

```{note}
Any format of skeleton can be converted into a **Meshwork skeleton object** to make use of the graph functions. 
```

### Dataset specificity
The examples below are written with the MICrONS dataset. To access the V1DD dataset change the datastack from `minnie65_public` to `v1dd_public`


## What is a Precomputed skeleton?

These skeletons are stored in the cloud as a bytes-IO object, which can be viewed in __Neuroglancer__, or downloaded with __CAVEclient.skeleton__ module. These precomputed skeletons also contain annotations on the skeletons that have the synapses, which skeleton nodes are axon and which are dendrite, and which are likely the apical dendrite of excitatory neurons.


:::{figure} img/skeleton-cartoon.png
Cartoon illustration of "level 2" graph and skeletons.
:::


The precomputed format is flexible and scalable, applies for EM data and light microscopy data, and can be rendered in [Neuroglancer](https://spelunker.cave-explorer.org/#!middleauth+https://global.daf-apis.com/nglstate/api/v1/4754960374824960). 

For more on how skeletons are generated from the mesh objects see the section below, and for additional tools for generating, cacheing, and downloading meshes, [see the Skeleton Service documentation](https://caveconnectome.github.io/CAVEclient/tutorials/skeletonization/)



## CAVEclient to download skeletons
Retrieve a skeleton using `get_skeleton()`. The available output_formats (described below) are:

* `dict` containing vertices, edges, radius, compartment, and various metadata (default if unspecified)
* `swc` a Pandas Dataframe in the SWC format, with ordered vertices, edges, compartment labels, and radius.

Note: if the skeleton doesn't exist in the server cache, it may take 20-60 seconds to generate the skeleton before it is returned. This function will block during that time. Any subsequent retrieval of the same skeleton should go very quickly however.

```{code-cell} ipython3
from caveclient import CAVEclient
import numpy as np
import pandas as pd

client = CAVEclient("minnie65_public")

# Example: pyramidal cell in v1507
example_cell_id = 864691135572530981
```

```{code-cell} ipython3
# Download as 'SWC' fromat

sk_df = client.skeleton.get_skeleton(example_cell_id, output_format='swc')

sk_df.head()
```

Skeletons are "tree-like", where every vertex (except the root vertex) has a single parent that is closer to the root than it, and any number of child vertices. Because of this, for a skeleton there are well-defined directions "away from root" and "towards root" and few types of vertices have special names:

You can see these vertices and edges represented in the alternative `dict` skeleton output.

```{code-cell} ipython3
sk_dict = client.skeleton.get_skeleton(example_cell_id, output_format='dict')

sk_dict.keys()
```

Alternately, you can query a set of root_ids, for example all of the **proofread cells** in the dataset, and bulk download the skeletons

```{code-cell} ipython3
prf_root_ids = client.materialize.tables.proofreading_status_and_strategy(
    status_axon='t').query()['pt_root_id']
prf_root_ids.head(3)
```

### convert dictionary to meshwork skeleton
We use the python package __Meshparty__ to convert between mesh representations of neurons, and skeleton representations. 

Skeletons are "tree-like", where every vertex (except the root vertex) has a single parent that is closer to the root than it, and any number of child vertices. Because of this, for a skeleton there are well-defined directions "away from root" and "towards root" and few types of vertices have special names:

Converting the pregenerated skeleton `sk_dict` to a meshwork object `sk` converts the skeleton to a graph object, for convenient representation and analysis.

```{code-cell} ipython3
from meshparty.skeleton import Skeleton

sk = Skeleton.from_dict(sk_dict)
```

## Plot with skeleton_plot


Our convenience package __skeleton_plot__ renders the skeleton in aligned, 2D views.

```python
pip install skeleton_plot
```

Our convenience package __skeleton_plot__ renders the skeleton in aligned, 2D views, with the compartments labeled in different colors. Here, _dendrite_ is red, _axon_ is blue, and _soma_ (the root of the connected graph) is olive

```{code-cell} ipython3
from skeleton_plot.plot_tools import plot_skel

plot_skel(sk=sk,
          invert_y=True,
          pull_compartment_colors=True,
          plot_soma=True,
         )
```

Skeleton plot is is wrapped around matplotlib, and can be treated as any other subplot. There are arguments to adjust the compartment colors and 2D projection direction.

```{code-cell} ipython3
import matplotlib.pyplot as plt
%matplotlib inline

f, ax = plt.subplots(1,2, figsize=(7, 10))

# Coronal view
plot_skel(
    sk,
    title="Neuron with compartments \n XY View",
    line_width=1,
    plot_soma=True,
    soma_size = 150,
    invert_y=True,
    pull_compartment_colors=True,
    x="x",
    y="y",
    skel_color_map = { 1: "olive", 2: "black", 3: "firebrick",4: "salmon", },
    ax=ax[0],
)

# top down view
plot_skel(
    sk,
    title="Neuron with compartments \n XZ View",
    line_width=1,
    plot_soma=True,
    soma_size = 150,
    invert_y=True,
    pull_compartment_colors=True,
    x="x",
    y="z",
    skel_color_map = { 1: "olive", 2: "black", 3: "firebrick",4: "salmon", },
    ax=ax[1],
)

for aa in ax:
    aa.spines['right'].set_visible(False) 
    aa.spines['left'].set_visible(False) 
    aa.spines['top'].set_visible(False) 
    aa.spines['bottom'].set_visible(False)
    aa.axis('off')
```

## Working with Meshwork Objects
Skeletons are "tree-like", where every vertex (except the root vertex) has a single parent that is closer to the root than it, and any number of child vertices. Because of this, for a skeleton there are well-defined directions "away from root" and "towards root" and few types of vertices have special names:

* Branch point: vertices with two or more children, where a neuronal process splits.
* End point: vertices with no children, where a neuronal process ends.
* Root point: The one vertex with no parent node. By convention, we typically set the root vertex at the cell body, so these are equivalent to "away from soma" and "towards soma".
* Segment: A collection of vertices along an unbranched region, between one branch point and the next end point or branch point downstream.

### Skeleton Properties and Methods
To plot this skeleton in a more sophisticated way, you have to start thinking of it as a graph, and the meshwork object has a bunch of tools and properties to help you utilize the skeleton graph.

Let's list some of the most useful ones below You access each of these with nrn.skeleton.* Use the ? to read more details about each one

**Properties**

* `branch_points`: a list of skeleton vertices which are branches
* `root`: the skeleton vertex which is the soma
* `distance_to_root`: an array the length of vertices which tells you how far away from the root each vertex is
* `root_position`: the position of the root node in nanometers
* `end_points`: the tips of the neuron
* `cover_paths`: a list of arrays containing vertex indices that describe individual paths that in total cover the neuron without repeating a vertex. Each path starts at an end point and continues toward root, stopping once it gets to a vertex already listed in a previously defined path. Paths are ordered to start with the end points farthest from root first. Each skeleton vertex appears in exactly one cover path.
* `csgraph`: a scipy.sparse.csr.csr_matrix containing a graph representation of the skeleton. Useful to do more advanced graph operations and algorithms. https://docs.scipy.org/doc/scipy/reference/sparse.csgraph.html
* `kdtree`: a scipy.spatial.ckdtree.cKDTree containing the vertices of skeleton as a kdtree. Useful for quickly finding points that are nearby. https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.cKDTree.html

**Methods**

* `path_length(paths=None)`: the path length of the whole neuron if no arguments, or pass a list of paths to get the path length of that. A path is just a list of vertices which are connected by edges.
* `path_to_root(vertex_index)`: returns the path to the root from the passed vertex
* `path_between(source_index, target_index)`: the shortest path between the source vertex index and the target vertex index
* `child_nodes(vertex_indices)`: a list of arrays listing the children of the vertex indices passed in
* `parent_nodes(vertex_indices)`: an array listing the parent of the vertex indices passed in



#### Vertices and Neighborhoods

```{code-cell} ipython3
# Vertices
print(f"There are {len(sk.vertices)} vertices in this neuron", "\n")

# Branch points
print("Branch points are at the following vertices: \n",sk.branch_points, "\n")

# End points
print("End points are at the following vertices: \n",sk.end_points, "\n")

# Root - the point associated with the root node, which is the soma
print("Root is vertex: ", sk.root.item(), "\n")

# Select downstream nodes from one branch point
downstream_nodes = sk.downstream_nodes(sk.branch_points[3])
print("Nodes downstream of selected brach are: \n", downstream_nodes, "\n")
```

#### Paths and Segments

```{code-cell} ipython3
# Segments - path of nodes between two vertices i and j which are assumed to be a root, branch point, or endpoint.
print("The number of branch segments are: ",len(sk.segments), "\n")

# Path between - path_between() function finds the vertices on the path between two points on the skeleton graph.
nodes_between = sk.path_between(0,150) 
print("Path between the given nodes: ", nodes_between, "\n")

# Path-length - path_length() function calculates the physical distance along the path for a neuron
full_pathlength = sk.path_length() / 1000 # Convert to microns
print("Path-length of the entire neuron: ", full_pathlength, ' um', "\n")

# Path-length for arbitrary segment
example_segment = 11
segment_pathlength = sk.path_length(sk.segments[example_segment]) / 1000 # Convert to microns 
print("Path-length of one segment: ", segment_pathlength, ' um', "\n")
```

#### Masking
One of the most useful methods of the skeleton meshwork's is the ability to **mask** or select only parts of the skeleton to work with at a time. The function `apply_mask()` acts on the meshwork skeleton, and will apply in place if apply_mask(in_place=True).

***Warning:*** be aware when setting a mask in place--mask operations are additive. To reset the mask completely, use `reset_mask(in_place=True)`.

```{code-cell} ipython3
# Let's select a set of nodes from example segment 11
example_segment = 11
selected_nodes = sk.segments[example_segment]
print("Path of the selected nodes is: \n", selected_nodes, "\n")

# reset to make sure you have the full skeleton
sk.reset_mask(in_place=True)

# Apply a mask to these nodes
sk_masked = sk.apply_mask(selected_nodes)

# Check that this masked skeleton matches the pathlength calculated above
print("Path-length of masked segment: ", sk_masked.path_length() / 1000, ' um')
```

Critically, apply_mask() allows us to mask a neuron according to its compartment label: axon, dendrite, soma, etc.

**Compartment label conventions** (from standardized swc files [www.neuromorpho.org](www.neuromorpho.org) )

* 0 - undefined
* 1 - soma
* 2 - axon
* 3 - (basal) dendrite
* 4 - apical dendrite
* 5+ - custom

```{code-cell} ipython3
print("The unique compartment labels in this skeleton are:", np.unique(sk.vertex_properties['compartment']), "\n")

# Select the indices associated with the dendrites
dendrite_inds = (sk.vertex_properties['compartment']==3) | (sk.vertex_properties['compartment']==4)| (sk.vertex_properties['compartment']==1) #soma is included here to connect the dendrite graphs 

# create new skeleton that masks (selects) only the axon
sk_dendrite = sk.apply_mask(dendrite_inds)
print("Dendrite pathlength of all branches is : ", sk_dendrite.path_length() / 1000, ' um', "\n")

# Select the indices associated with the axon, find length
axon_inds = sk.vertex_properties['compartment']==2
sk_axon = sk.apply_mask(axon_inds)
print("Axon pathlength is : ", sk_axon.path_length() / 1000, ' um', "\n")
```

```{code-cell} ipython3
# Render all the segments in the dendrite graph

fig, ax = plt.subplots(figsize=(4,3), dpi=150)

for ss in range(len(sk_dendrite.segments)):
    seg = sk_dendrite.segments[ss]

    ax.plot(sk_dendrite.vertices[seg][:,0], 
            sk_dendrite.vertices[seg][:,1], linewidth=0.5)

# add soma marker
ax.plot(sk.vertices[sk.root][0], 
        sk.vertices[sk.root][1], 'oc', markersize=5)
    
ax.invert_yaxis()
ax.axis('off')
```

## How EM skeletons are generated

:::{figure} img/skeleton-cartoon.png
Cartoon illustration of "level 2" graph and skeletons.
:::

In order to understand how these skeletons have been made, you have to understand how large scale EM data is represented. Portions of 3d space are broken up into chunks, such as the grid in the image above. Neurons, such as the cartoon green cell above, span many chunks. Components of the segmentation that live within a single chunk are called level 2 ids, this is because in fact the chunks get iteratively combined into larger chunks, until the chunks span the whole volume. We call this the [PyChunkedGraph](https://github.com/CAVEconnectome/PyChunkedGraph) or PCG, after the library which we use to store and interact with this representation. Level 0 is the voxels, level 1 refers to the grouping of voxels within the chunk (also known as supervoxels) and level 2 are the groups of supervoxels within a chunk. A segmentation result can be thought of as a graph at any of these levels, where the voxels, supervoxels, or level 2 ids that are part of the same object are connected. In the above diagram, the PCG level 2 graph is represented as the light red lines.

Such graphs are useful in that they track all the parts of the neuron that are connected to one another, but they aren't skeletons, because the graph is not directed, and isn't a simple branching structure.

In order to turn them into a skeleton we have to run an algorithm, that finds a tree like structure that covers the graph and gets close to every node. This is called the TEASAR algorithm and you can read more about how to skeletonize graphs in the [MeshParty documentation](https://meshparty.readthedocs.io/en/latest/guide/skeletons.html#skeletonization).

The result of the algorithm, when applied to a level 2 graph, is a linear tree (like the dotted purple one shown above), where a subset of the level 2 chunks are vertices in that tree, but all the unused level 2 nodes "near" a vertex (red unfilled circles) on the graph are mapped to one of the skeleton vertices (black arrows). This means there are two sets of indices, mesh indices, and skeleton indices, which have a mapping between them (see diagram above).

The MeshParty library allows us to easily store these representations and helps us relate them to each other. A Meshwork object is a data structure that is designed to have three main components that are kept in sync with mesh and skeleton indices:

* mesh: the graph of PCG level2 ID nodes that are skeletonized, stored as a standard meshparty mesh. Note that this is not the high resolution mesh that you see in neuroglancer. [See EM Meshes for more](em:meshes)
* skeleton: a meshwork skeleton, derived from the simplification of the mesh
* anno : is a class that holds dataframes and adds some extra info to keep track of indexing.
