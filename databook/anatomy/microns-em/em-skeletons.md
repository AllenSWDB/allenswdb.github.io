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

Often in working with neurons, you want to measure things along a linear dimension of a neuron. Length of axon, for example. Or number of branches. However, the EM segmentation is a complex 3d shape that makes this non-trivial.
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

+++

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

+++

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

+++

## Example Data Access

+++

### Load precomputed skeleton (v1078)

+++

A [precomputed skeleton](https://github.com/google/neuroglancer/blob/master/src/datasource/precomputed/skeletons.md) is a simplified representation of a neuron where its shape is captured by a tree-like structure that passes through the center of the neuron. More specificy, a precomputed skeleton stores a neuron as a graph with vertices and edges in addition to a collection of vertex-attached attributes that capture morphological and anatomical information about the neuron.

The most recent MICrONS skeletons are those from data release version 1078, which includes skeletonization of all neurons with [proofread axons](em:proofreading-data-quality). The precomputed format is flexible and scalable, and also can be rendered in [Neuroglancer](https://spelunker.cave-explorer.org/#!middleauth+https://global.daf-apis.com/nglstate/api/v1/4754960374824960). 

```{note}
SWDB 2024 relies on this format when working with the EM and exaSPIM skeletons. The EM skeletons will be available as part of the course's resources, but also in the public repository below.
```

```{code-cell} python
# cloudpath to the precomputed EM files
cv_skel_path = "precomputed://gs://allen_neuroglancer_ccf/em_minnie65_v1078"
```

```{code-cell} python
import cloudvolume
import numpy as np

# Initialize cloud volume
cv_obj = cloudvolume.CloudVolume(cv_skel_path, use_https = True) 

# Example skeleton (as of v1078)
skeleton_id = 864691135591041291

# load precomputed neuron skeleton
cv_sk = cv_obj.skeleton.get(skeleton_id)
```

```{code-cell} python
print("This is a precomputed skeleton of an EM neuron...\n")
print(cv_sk)
```

We will use MeshParty's `skeleton` object to help plot and analyze the precomputed skeletons. To do this, convert the vertices, edges, and radius of the precomputed format with the `skeleton` module.

```{code-cell} python
from meshparty import skeleton

sk = skeleton.Skeleton(cv_sk.vertices, 
                       cv_sk.edges, 
                       vertex_properties={'radius': cv_sk.radius,
                                          'compartment': cv_sk.compartment},  
                       root = len(cv_sk.edges), # set root as final entry
                       remove_zero_length_edges = False)
```

#### Plot Skeleton in 2D
The package [Skeleton-plot](https://github.com/AllenInstitute/skeleton_plot) provides some handy utilities for plotting meshwork skeletons, including:

* specifying the 2D orientation
* annotating somas
* labeling compartments by color

```{code-cell} python
import skeleton_plot as skelplot
import matplotlib.pyplot as plt
%matplotlib inline

f, ax = plt.subplots(figsize=(7, 10))
skelplot.plot_tools.plot_skel(
    sk,
    title="Neuron with radius and compartments",
    line_width=1,
    plot_soma=True,
    soma_size = 150,
    pull_radius=True,
    invert_y=True,
    pull_compartment_colors=True,
    x="x",
    y="y",
    skel_color_map = { 1: "olive", 2: "black", 3: "firebrick",4: "salmon", },
    ax=ax,
)

ax.spines['right'].set_visible(False) 
ax.spines['left'].set_visible(False) 
ax.spines['top'].set_visible(False) 
ax.spines['bottom'].set_visible(False)
ax.axis('off')
```

#### Vertices and Neighborhoods

```{code-cell} python
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

```{code-cell} python
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

```{code-cell} python
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

```{code-cell} python
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

```{code-cell} python
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

### Load meshwork h5 file (v661)

The skeletons of the meshes are calculated at specific timepoints. The most recent collection of all neurons in the dataset was at materialization version 661 (June, 2023). 

Both the h5. meshwork neuron object and the .swc skeletons are available in the [BossDB repository](https://bossdb.org/project/microns-minnie)

```{code-cell} python
# path to the skeleton and meshwork .h5 files
mesh_path = "s3://bossdb-open-data/iarpa_microns/minnie/minnie65/skeletons/v661/meshworks/"
```

```{code-cell} python
import skeleton_plot.skel_io as skel_io

# Example skeleton (as of v661)
nucleus_id = 230650
segment_id = 864691134940133219

# load a pregenerated neuron skeleton
nrn = skel_io.load_mw(mesh_path, f"{segment_id}_{nucleus_id}.h5")
```

## Annotations

`nrn.anno` has a set of annotation tables containing some additional information for analysis.
Each annotation table has both a Pandas DataFrame object storing data and additional information that allow the rows of the DataFrame to be mapped to mesh and skeleton vertices.
For the neurons that have been pre-computed, there is a consistent set of annotation tables:

* `post_syn`: Postsynaptic sites (inputs) for the cell
* `pre_syn`: Presynaptic sites (outputs) for the cell
* `is_axon`: List of vertices that have been labeled as part of the axon
* `lvl2_ids`: Gives the PCG level 2 id for each mesh vertex, largely for book-keeping reasons.
* `segment_properties`: For each vertex, information about the approximate radius, surface area, volume, and length of the segment it is on.
* `vol_prop`: For every vertex, information about the volume and surface area of the level 2 id it is associated with.

To access one of the DataFrames, use the name of the table as an attribute of the `anno` object and then get the `.df` property. For example, to get the postsynaptic sites, we can do:

```{code-cell} python
nrn.anno.post_syn.df.head(3)
```

However, in addition to these rows, you can also easily get the mesh vertex index or skeleton vertex index that a row corresponds to with `nrn.anno.post_syn.mesh_index` or `nrn.anno.post_syn.skel_index` respectively.
This seems small, but it allows you to integrate skeleton-like measurements with annotations trivially.

For example, to get the distance from the cell body for each postsynaptic site, we can do:

```{code-cell} python
nrn.distance_to_root(nrn.anno.post_syn.mesh_index)
```

```{important}
Note that the `nrn.distance_to_root`, like all basic meshwork object functions, expects a mesh vertex index rather than a skeleton vertex index.
```

A common pattern is to copy a synapse dataframe and then add columns to it.
For example, to add the distance to root to the postsynaptic sites, we can do:

```{code-cell} python
syn_df = nrn.anno.pre_syn.df.copy()
syn_df['dist_to_root'] = nrn.distance_to_root(nrn.anno.pre_syn.mesh_index)
```

### Filtering Annotations by Skeleton Arbor

Each annotation table has a 'filter_query' method that takes a boolean mesh mask and returns only those rows of the dataframe associated with those particular locations on the mesh. Let's use what we learned above in two examples: first, getting all input synapses within 50 microns of the root and second, getting all input synapses on one particular branch off of the soma.

```{code-cell} python
dtr = nrn.distance_to_root() / 1_000   # Convert from nanometers to microns
nrn.anno.post_syn.filter_query( dtr < 50).df
```

We can also use one set of annotations as an input to filter query from another set of annotations. For example, due to errors in segmentation or mistakes in synapse detection, there can be synaptic outputs on the dendrite. However, if we have an `is_axon` annotation that simply contains a collection of vertices that correspond to the cell's axon. We can use this annotation to create a mask and filter out all of the synapses that are not on the axon.

```{code-cell} python
axon_mask = nrn.anno.is_axon.mesh_mask
nrn.anno.pre_syn.filter_query(~axon_mask).df # The "~" is a logical not operation that flips True and False
```

As a sanity check, we can use `nglui` to see if these synapses we have labeled as being on the axon are all where we expect.

```{code-block} python
from caveclient import CAVEclient
from nglui.statebuilder.helpers import make_synapse_neuroglancer_link

client = CAVEclient('minnie65_public')
client.materialize.version = 661 # version at which skeletons were calculated

make_synapse_neuroglancer_link(
    nrn.anno.pre_syn.filter_query(axon_mask).df,
    client,
    return_as="html"
)

```

[Neuroglancer link](https://neuroglancer.neuvue.io/?json_url=https://global.daf-apis.com/nglstate/api/v1/6278131234111488)

(Click one of the synapse annotations to load the neuron mesh).

Another common example might be to pick one of the child nodes of the soma and get all of the synapses on that branch. We can do this by using the `nrn.skeleton.get_child_nodes` function to get the skeleton vertex indices of the child nodes and then use that to filter the synapses.

```{code-block} python
branch_index = 0 # Let's just use the first child vertex of the root node, which is at the soma by default.
branch_inds = nrn.downstream_of(nrn.child_index(nrn.root)[branch_index])
branch_mask = branch_inds.to_mesh_mask

make_synapse_neuroglancer_link(
    nrn.anno.post_syn.filter_query(branch_mask).df,
    client,
    return_as="html"
)

```

[Neuroglancer link](https://neuroglancer.neuvue.io/?json_url=https://global.daf-apis.com/nglstate/api/v1/4584197575409664)

+++

### Load swc skeleton (v661)

+++

The skeletons of the meshes are calculated at specific timepoints. The most recent collection of all neurons in the dataset was at materialization version 661 (June, 2023). 

Both the h5. meshwork neuron object and the .swc skeletons are available in the [BossDB repository](https://bossdb.org/project/microns-minnie)

+++

```{code-block} python
# path to the skeleton .swc files
skel_path = "s3://bossdb-open-data/iarpa_microns/minnie/minnie65/skeletons/v661/skeletons/"

import skeleton_plot.skel_io as skel_io

# Example skeleton (as of v661)
nucleus_id = 230650
segment_id = 864691134940133219

# load the .swc skeleton
sk = skel_io.read_skeleton(skel_path, f"{segment_id}_{nucleus_id}.swc")

```

+++

To get a more accurate understanding of the neuron's morphology, you can pull in information about the radius and compartment labels into your visualization.

Here the axon is colored black, basal dendrites 'firebrick' red, apical dendrites 'salmon' orange, and the soma a green 'olive'.

Compartment label conventions (from from standardized swc files [www.neuromorpho.org](www.neuromorpho.org) )

* 0 - undefined
* 1 - soma
* 2 - axon
* 3 - (basal) dendrite
* 4 - apical dendrite
* 5+ - custom

```{code-block} python
f, ax = plt.subplots(figsize=(7, 10))
skelplot.plot_tools.plot_skel(
    sk,
    title=nucleus_id,
    line_width=1,
    plot_soma=True,
    invert_y=True,
    pull_compartment_colors=True,
    x="z",
    y="y",
    skel_color_map = { 3: "firebrick",4: "salmon",2: "black",1: "olive" },
)

ax.spines['right'].set_visible(False) 
ax.spines['left'].set_visible(False) 
ax.spines['top'].set_visible(False) 
ax.spines['bottom'].set_visible(False)
```
