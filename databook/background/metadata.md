# Metadata

New data assets from AIND (currently those in Cell Type Lookup Table and Single Cell Morphology) are documented with metadata files to document what the data is. These are contained in json files that are in the data asset. The metadata schema is defined (here)[https://github.com/AllenNeuralDynamics/aind-data-schema] and there is more lengthy documentation. Here we provide a high level overview.

The schema consists of six major classes:

## Data description
This is largely an administrative class that documents the project, investigators, funding sources, license, etc that the data asset belongs to. 

## Subject
This class describes the subject that was used for this asset - in our case the mouse. It includes the date of birth, sex, genotype. 

## Procedures
This class describes procedures that are done to the animal or tissue prior to data acquisition. This can include surgeries such as craniotomies and injections as well as tissue processing steps for in vitro data. You will find key information what virus was injected, where was it injected. What antibodies were applied to the tissue prior to light sheet imaging. 

## Rig or Instrument
These classes describe the instrument used to collect the data. For physiology and behavior data it is the `rig` class and for in vitro imaging it is the `instrument`. This documents the devices of the rig/instrument being used to collect data

## Session or Acquisition
These classes describe the actual data acquisition, describing how the data was collected, what parameters or settings were used for the rig devices, what stimulus or behavior was used, where electrodes were placed, what channels were imaged, etc. For physiology and beahvior we use `session` and for in vitro imaging we use `acquisition`.

## Processing
This class describes any processing that has been done to after data acquisition - e.g. spike sorting or image registration. It documents the code used for the step and key parameters.

## How might you use this?
These metadata are stored in a Mongo DocDB that enables querying to identify assets on key features. Given the small amount of this new data in our course this year, we won't belabor this tool at this time. But as we involve more new data, this will become valuable.

However, you might use the metadata for an asset to identify important features. For example, which cell types are being differentiated in each CTLUT asset? This is determined based on the combination of the trasngenic line and virus strategy being used, available in the `subject` and `procedures` files. Or are there morphologies for cells of different types? Again, the transgenic line for the exaSPIM data can help you identify these. 

