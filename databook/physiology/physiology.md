# Physiology

These sections contain information about the physiology datasets presented during the workshop. The first section discusses the types of stimuli and behavior paradigms used in different datasets, as these are often shared across multiple datasets. Then datasets are organized by their primary recording modality: optical physiology (e.g. calcium imaging) or extracellular electrophysiology. For each dataset there is content about the context of the experiment, a view of the metadata, and some data access patterns. 

All physiology and behavior data is packaged in {term}`NWB` files, and we use pynwb to access the data. We provide a [brief overview](pynwb) of how to use pynwb to load data. Further information on this package can be found at the [readthedocs](https://pynwb.readthedocs.io/en/stable/).

The data is also documented with rigorous [metadata](metadata) that can be queried using MongoDB. We have provided queries for each dataset as a place to get started within each dataset section.
