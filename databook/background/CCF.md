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
  name: ccf
---

(common_coordinate_framework)=
# Common Coordinate Framework

The Allen Mouse Brain Common Coordinate Framework ({term}`CCF`) is a 3D reference space by creating an average brain at 10um voxel resolution from serial two-photon tomography images of 1,675 young adult C57Bl6/J mice. Using multimodal reference data, we parcellated the entire brain directly in 3D, labeling every voxel with a brain structure spanning 43 isocortical areas and their layers, 314 subcortical gray matter structures, 81 fiber tracts, and 8 ventricular structures. The CCF enables the integration of data across modalities that have been registered into the common space. {cite:p}`wangccf`

:::{figure} ../resources/ccf.png
---
align: center
---
:::

In the data here, the CCF is used in a few ways. One, is to specify the location of ephys units. This localization is done post-hoc, when the probe tract is imaged and registered to the CCF. This allows scientists to assign brain structure locations to the sorted units.
The second is for the single cell whole brain reconstruction data. During image processing, the brain is registered to the CCF, allowing each node of the skeleton to be mapped to a brain structure. This allows scientists to know where each soma is located, what structures its dendrites originate in, and where its axons project to. 

The brain structures are named according to the Allen Reference Atlas Ontology. This is a hierarchical ontology, in which structures are divided into more precise structures at different levels of the hierarchy. Each structure has a name, and unique id, and a list of parent structures that are above it in the hierarchy. 

We are using tools from BrainGlobe to help navigate this ontology {cite:p}`claudi`. 

```{code-cell} ipython3
from pprint import pprint
import brainglobe_atlasapi as atlasapi
from brainglobe_atlasapi import BrainGlobeAtlas
import os
data_dir = '/root/capsule/data/.brainglobe'
if not os.access(data_dir, os.R_OK):
  print('Access error: permissions')
atlasapi.config.write_config_value('brainglobe_dir', '/root/capsule/data/.brainglobe')
```

First we import the atlas we want to use. There are multiple resolutions available, but for exploring the ontology we can use any. Here we'll use the 25um version.

```{code-cell} ipython3
atlas = BrainGlobeAtlas('allen_mouse_25um')
```

We can quickly look at a dataframe of all the structures:

```{code-cell} ipython3
atlas.lookup_df
```

Each structure has an acronym, an id, and a name. 

Let's look at one in more detail - we'll look at VISp

```{code-cell} ipython3
pprint(atlas.structures["VISp"])
```

Here we see a little more information. There's the acronym, id, and name. There is information on the mesh for this structure. The "rgb_triplet" is the color used to plot this structure when using the CCF colors. And finally the `structure_id_path` is the list of parent structures. Let's see what these are, starting from the end:

```{code-cell} ipython3
pprint(atlas.structures[780])
pprint(atlas.structures[703])
pprint(atlas.structures[688])
```

This is a somewhat tedious way to move through the hierarchy. Here's a function that lists the acronyms of the list of parent (or ancestor) structures

```{code-cell} ipython3
atlas.get_structure_ancestors("VISp")
```

And to see the descendants:

```{code-cell} ipython3
atlas.get_structure_descendants("VISp")
```

Note: you can pass these functions either the structure acronym or the structure ID. 

This can be very valuable if you are look for any neurons that are located in a given structure (again, say VISp) regardless of layer, but they are labeled by the finest parcellation possible. This can give you the full list of structure IDs to include in your search. 

To see the entire structure of the tree you can use

```{code-cell} ipython3
:tags: [hide-output]
atlas.structures
```