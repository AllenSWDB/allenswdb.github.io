# Intrinsic Signal Imaging

When a brain region is activated, it receives an influx of oxygenated arterial blood known as the hemodynamic response. Intrinsic signal imaging (ISI) leverages the fact that deoxygenated hemoglobin absorbs light at long wavelengths (>600 nm) more efficiently than oxygenated hemoglobin. Thus, by shining red light on the cortical surface and measuring small (~1%) changes in reflectance with a CCD camera, we can identify active regions without the need for exogneous fluorophores. This makes ISI imaging a powerful and relatively simple method for mapping cortical activity, albeit with relatively coarse spatial (~200 um) and temporal (1-2 seconds) resolution.

The Allen Institute pipelines routinely use ISI to map the retinotopic organization of visual cortex. Briefly, mice are lightly anesthetized and placed in the ISI rig. The right visual field is stimulated with bars composed of an alternating checkerboard pattern and drifting in the four cardinal directions (up, down, left, right). The resulting ISI data can be used to compute altitude and azimuth maps which reveal how the stimulus monitor is spatially represented on the cortical surface. Because each visual area contains an independent map of visual space, these altitude and azimuth maps can then be segmented to infer the boundaries of individual visual cortical areas as shown below. Operators use these functional maps to center their imaging field-of-view or Neuropixels probe insertions on particular visual areas of interest, taking further care to record from the portion of each area that responds to stimuli in the center of the stimulus monitor.

:::{figure}  ../resources/background_isi_imaging_example.png
:name: isi-ref
:align: center
:width: 800

Images and averaged maps generated post-acquisition. All selected trials are averaged to produce azimuth (A) and altitude (B) maps, and a map of visual field sign with segmented area boundaries overlaid on a vasculature image (C). From the altitude and azimuth maps and segmented area boundaries, a map of visual eccentricity (D), a map of eccentricity from the V1 centroid (E), and a target map (F) are computed. List of acronyms: Primary Visual Area (VISp), Posterolateral visual area (VISpl), Laterointermediate area (VISli), Lateral visual area (VISl), Anteromedial visual area (VISal), Laterolateral anterior visual area (VISlla), Rostrolateral visual area (VISrl), Anteromedial visual area (VISam), Posteromedial visual area (VISpm), Medial visual area (VISm), Mediomedial anterior visual area (VISmma), Mediomedial posterior visual area (VISmmp). Scale bar in degrees for A, B, D & E.
:::

