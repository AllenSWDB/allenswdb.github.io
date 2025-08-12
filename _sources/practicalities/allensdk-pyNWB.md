# Allen SDK and pyNWB

The Mindscope Legacy phsyiology datasets all have tools in the Allen SDK (Software Development Kit) to access and work with the data. This includes [Visual Coding 2-photon](visual-coding/vc2p-background) dataset, [Visual Coding – Neuropixels](visual-coding/vcnp), [Visual Behavior Ophys](visual-behavior/VB-Ophys), and [Visual Behavior – Neuropixels](visual-behavior/VB-Neuropixels). These tools are tailored to these datasets, and are described in detail in this Data Book.

The newer physiology datasets are not access using the Allen SDK, but rather using [pyNWB](https://pynwb.readthedocs.io/en/latest/index.html), a python toolkit for reading and writing NWB files. This is a more generic tool that can be used for any NWB files. 

While the AllenSDK has specific tools for each dataset, there is a general structure at play. Each dataset has a <b>manifest</b> that defines the contents of the dataset. Instantiating the cache for that dataset gives users access to metadata that helps them to find which sessions they want to use, and further allows them to access to contents of individual sessions.

PyNWB enables direct access to a specific NWB file that the user has identified. So how do you find which file you want to use? We have documented each asset with rich metadata that lives in our DocDB (Document Database). Queries on this DocDB allow users to find assets that meet specific criteria for their analysis. To facilitate this further, we've used the DocDB to create DataFrames that summarize the key features of the sessions for each dataset, that you will find in the capsules we use in our tutorials.

:::{figure} ../resources/sdk_pynwb_structure.png
---
align: center
---
:::

Patterns for Data Access:

:::{figure} ../resources/sdk_pynwb.png
---
align: center
---
:::