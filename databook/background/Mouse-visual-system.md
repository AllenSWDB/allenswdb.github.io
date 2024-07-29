(mouse-visual-system)=
# Mouse visual system

For several decades, much of the work studying visual physiology was carried out
in either primates or cats. This began with Hubel and Wiesel mapping receptive
fields of "simple" and "complex" cells in the primary visual cortex of the cat.
Recordings from neurons in other cortical areas in these animals have revealed
neurons that respond to simple shapes, color, and motion - both direction
selectivity as well as responses selective for more complex motion patterns.
Based both on these responses and on anatomical studies, current models contain
two parallel streams, called the "dorsal" and "ventral" streams. The dorsal stream is
considered colloquially to be the "where" pathway, with many areas sensitive to
motion, while the ventral stream is considered to be the "what" pathway, with
neurons showing increased selectivity and invariance in their responses to
objects and faces. Another way of framing these pathways is an "egocentric" and
an "allocentric" pathway.

## Cortical physiology

Starting in the early 2000s, researchers began studying visual physiology and
behavior in the mouse in earnest. Cris Niell used extracellular
electrophysiology to record receptive fields of neurons in the mouse
{term}`Primary visual cortex`, finding receptive fields that looked very similar
to those found in cat and primate {cite:p}`niell_rf`. Many neurons showed
orientation selectivity - selectively responding to gratings at a particular
orientation - or direction selectivity - responding selectivity to gratings
moving in a particular direction. Neurons also showed linear and non-linear
summation that were the hallmarks of simple and complex cells. The key
difference in these receptive fields is in their size; mice have much poorer
spatial resolution than primates and cats {cite:p}`huberman_niell`. The scale
bars below are 20 degrees for the mouse data but 1 degree for the monkey!

![rfs](/resources/NiellHubermann_RFs.png)

Using {term}`Two-photon calcium imaging` allowed large populations of neurons to
be recorded across the cortex, and another key early result was that mice (and
rodents broadly) lack the orientation columns found in primates and cats. While
the latter species have neurons that are tuned with similar orientations
organized in columns, the rodent visual cortex has a "salt and pepper"
organization, where the orientation selectivity of neighboring neurons are
randomly organized. {cite:p}`ohki`

Beyond {term}`V1` there are additional higher visual areas ({term}`HVA`s)
which receive input from V1 and are connected in a hierarchical manner. HVAs
each contain a distinct map of {term}`Retinotopy`, i.e. each visual
area contains a map of the visual space. The borders between higher visual 
areas can be identified based on reversals in the retinotopic map at area boundaries.

We use intrinsic signal imaging ({term}`ISI`) to create a {term}`retinotopic map`, utilizing
the difference in the absorption spectra between deoxygenated and
oxygenated hemoglobin. Measuring this activity while mice view a drifting stimulus,
we can create a map of altitude and azimuth across the cortical surface. This map
can then be used to identify cortical boundaries as detailed above. An example
can be seen in this figure:

:::{figure}  ../resources/background_isi_imaging_example.png
:name: mouse-visual-system:isi-ref
:align: center
:width: 800

Images and averaged maps generated post-acquisition. All selected trials are averaged to produce azimuth (A) and altitude (B) maps, and a map of visual field sign with segmented area boundaries overlaid on a vasculature image (C). From the altitude and azimuth maps and segmented area boundaries, a map of visual eccentricity (D), a map of eccentricity from the V1 centroid (E), and a target map (F) are computed. List of acronyms: Primary Visual Area (VISp), Posterolateral visual area (VISpl), Laterointermediate area (VISli), Lateral visual area (VISl), Anteromedial visual area (VISal), Laterolateral anterior visual area (VISlla), Rostrolateral visual area (VISrl), Anteromedial visual area (VISam), Posteromedial visual area (VISpm), Medial visual area (VISm), Mediomedial anterior visual area (VISmma), Mediomedial posterior visual area (VISmmp). Scale bar in degrees for A, B, D & E. {cite:p}`abonvc`
:::

An early question was whether neurons in different mouse {term}`HVA`s had distinct
visual responses to subserve distinct functions. One framing of this question is
whether there are streams akin to the dorsal and ventral streams in primate and
cat. Early studies using {term}`Two-photon calcium imaging` compared the
{term}`Spatial frequency` and {term}`Temporal frequency` tuning across several
HVAs, finding evidence of functional differences between some of the areas
{cite:p}`andermann,marshel`. These results, alongside connectivity data, are
suggestive that such a dorsal/ventral organization might be present - though
with much more interconnection and a lower hierarchical depth than found in
primates/cats. See {cite:t}`niell2011` for a primer on early studies of mouse
HVA functional properties.

![dorsal_ventral](/resources/Niell_visual_hierarchy.png)

By studying visual physiology in awake mice, it was discovered early on that the
locomotor activity of the mouse modulates the visual responses of some neurons
in the visual cortex, such that the visually evoked responses are larger when
the mouse is running than when it is stationary {cite:p}`niell_locomotor`. It's
good to remember, however, that there is great diversity in these responses, and
most estimates see only 10-15% of neurons are significantly modulated by
running. (see also {cite:p}`de_vries_lecoq_buice`). Not only are some neurons'
visual responses modulated by running activity, but some neurons exhibit running
speed tuning independent of their visual responses {cite:p}`saleem`. Beyond
running, other movements - including whisking, face movements and larger body
movements - have been found to account for a significant part of the variability
of activity throughout cortex, including the visual cortex. {cite:p}`musall`
{cite:p}`stringer`

Finally, in mouse, there is considerable behavioral influence on neural activity
even in the early visual areas where signatures of choice, experience, and
learning are present. {cite:p}`pakan`
