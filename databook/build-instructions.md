#Instructions for Updating to the Newest Build

The databook build repository can be found [here](https://github.com/AllenSWDB/databook-build). A premade capsule titled "2024 Databook Build Capsule" is already in Code Ocean and should be viewable.

Once the capsule is copied (and your GitHub credentials are loaded into your main Code Ocean account), there are two ways to build the databook. The first is by using the Reproducible Run function; this should do a full build and then push the changes to the Wiki. The process is lengthy, as it rebuilds every page individually and runs all code.

The second way is by opening the terminal and then executing the build script, either manually line-by-line or by the run script in the `/root/capsule/code/` directory. This has a speed advantage over the reproducible run - as long as you keep the terminal session open (paused is also okay), Code Ocean will remember what it's already built. The first build will be the same speed as the Reproducible Run, but any future builds in the same terminal session will be significantly faster; depending on what changes have been made, the build time is usually on the order of tens of seconds.

The commands needed to build are as follows:

```
cd /opt/databook/
git fetch && git reset --hard origin/main
jb build -n --keep-going --path-output /root/capsule/results/ /opt/databook/databook/
ghp-import -onfp /root/capsule/results/_build/html/
```

The other main advantage of building in the terminal is that error messages are printed immediately to the console, allowing for quick troubleshooting.

##Data

Any data used in the databook should be attached to the /root/capsule/data/ directory through the usual methods. Whenever data being accessed is changed or added in the Wiki articles, the build capsule needs to have its data updated as well.

If cloning the capsule from the build repository directly rather than using the premade capsule, all data needs to be manually added. Currently (as of 13 September 24), the data assets used are the following:

```
Allen Brain Observatory - Visual Coding
Allen Brain Observatory - Visual Behavior Ophys
Allen Brain Observatory - Visual Behavior Neuropixels
PAC_cell_type_lookup_table_nwb
exaSPIM_609281_2022-11-03_13-49-18_reconstructions
SWDB 2024 CTLUT data
brainglobe_atlasassets_2024-08-01
```

##Adding New Jupyter Notebooks

New Jupyter notebooks written in `.ipynb` can be directly converted to the MyST Markdown type needed for Jupyter Book using the OS's terminal (e.g. on the computer where the `.ipynb` file is). The relevant command is:

`jupytext /path/to/notebook/notebook-name.ipynb --to myst`

##Environments

Unfortunately, there are currently compatibility issues with the `hdmf-zarr` package and the `allensdk` package, which are both used for different pages. In the `/root/capsule/environment/` directory, there are three environments currently set up. `allensdk.txt` is the basic environment that is used for most of the pages and contains the `allensdk` package; `ctlut.txt` contains the `hdmf-zarr` package and is used for the pages that use `.nwb` files, most notably the Cell-Type Lookup Table; `ccf.txt` contains the `brainglobe-atlasapi` package and is used for some of the anatomy pages.

Whenever converting an `.ipynb` file to MyST, the generated `.md` file will by default **use the wrong environment**. After converting, the environment must be manually changed by opening the `.md` file. At the top, there will be some metadata:

```
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
  name: python3
---
```

The `name:` field under the `kernelspec` should be changed to one of the environments in the capsule (without the file type). 

To add new environments, the `Dockerfile` and `postInstall` script need to be manually edited. The steps are as follows: 

1. Place another `environment.txt` in the same directory as the others. 
2. Open the `Dockerfile`. There is a section near the end with lines like `COPY allensdk.txt /tmp/`. Add another one of them below: `COPY new_environment.txt`
3. Open the `postInstall`. There are sections in parentheses commented with the virtual environments they are for. Add a new one of these for every new environment added.

