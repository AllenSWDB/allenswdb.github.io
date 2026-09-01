---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.19.5
kernelspec:
  display_name: base
  language: python
  name: anndata
---

<h1 align="center">Visual Learning: inhibitory cell types and physiology across learning</h1>

+++

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h2>The experiment</h2>

The Visual Learning dataset asks how **inhibitory cell-type-specific coding and interactions change as
an animal learns**. The same neurons are imaged longitudinally across the whole of learning, and their
cell types are recovered afterwards from gene expression.

The usual way to study a specific inhibitory cell type is a transgenic driver line — `Vip-IRES-Cre`
labels Vip cells, and you record those. That gives you one cell type at a time, in separate animals.
This experiment inverts it: label **all** inhibitory neurons, record them together, and work out which
type each one was *after the fact* using post-hoc spatial transcriptomics. Because type comes from
measured expression rather than from the driver line, multiple cell types are recorded
**simultaneously in the same animal** — which is what makes questions about *interactions between*
types accessible.

<h3>In vivo: imaging through learning</h3>

Mice express GCaMP8s in inhibitory neurons (`Slc32a1-IRES-Cre;Oi1` — Slc32a1 is also known as VGAT).
Two-photon imaging covers **8 planes in V1 (VISp)**, at depths from roughly 50 to 350 µm — about layer
1 through upper layer 5. Imaging runs through **every stage of the training curriculum**, from the
first naive session to expert performance, and the same cells are tracked from session to session.

This is the key difference from the previously released **Visual Behavior Ophys** dataset, which used
the same training curriculum but only imaged well-trained mice. Here, learning itself is in the
neural data.

After training, mice also run **passive viewing** sessions — drifting gratings and natural movies, no
task and no reward — which support mapping receptive-field properties for the same neurons.

<h3>Post hoc: gene expression in the same cells</h3>

A 350-400 µm section from the same brain is **cleared and expanded**, then probed for mRNA transcripts
using **hybridization chain reaction (HCR)**, imaged with light-sheet microscopy. Five genes are
mapped per round over several rounds, for **18-24 genes per mouse**. Values are *spot counts* —
individual transcripts detected as fluorescent puncta.

The panel targets known subtypes within the four main inhibitory subclasses — **Pvalb, Sst, Vip,
Lamp5** — with markers such as `Ndnf` (neurogliaform), `Cck` (basket), `Calb2` (Sst Martinotti and Vip
bipolar), plus `Crh`, `Reln`, `Npy`, `Chat` and others.

<h3>Linking the two</h3>

Registration is a chain, not a single step: ROIs are matched **across sessions** within each imaging
plane (with ROICaT), that unified set of masks is mapped into a high-resolution **2P structural volume**
containing all 8 planes, and that volume is aligned to the light-sheet volume from the same brain. The
process is semi-automated and ends in manual QC.

Two consequences follow directly, and they shape every analysis below:

- The structural volume spans 400 µm while only 8 planes carry functional data, so **many structural
  cells have no functional counterpart**.
- **Not every neuron in an imaging plane maps to an HCR cell**, and not every neuron is matched in
  every session — activity differences, segmentation errors and drift all cost matches.

The neurons that do make it through are the opportunity: inhibitory circuit interactions with genetic
identity attached, and a handle on how functional diversity relates to genetic diversity.

<h3>A caution on cell type labels</h3>

The subclass labels used here are useful but **not ground truth**. Cell typing from a few dozen genes
is hard — published taxonomies are built from single-cell sequencing of hundreds to thousands of genes,
a different modality with different SNR — and taxonomies keep evolving. Treat the labels as one
reasonable classification among several, and consider using the graded expression patterns directly
when a result hinges on them.

<h3>What this notebook does</h3>

It shows how to load ophys data for a given session type, and how to attach inhibitory subclass labels
to the neurons in it using the tables that link the two modalities. Getting there takes two kinds of
alignment, and most of the notebook is about doing them correctly:

- **Across modalities** — matching an imaged neuron to its transcriptomic cell type (Part 3)
- **Across sessions** — matching a neuron imaged on one day to the same neuron on another day (Part 7)

Everything is done by **reading the NWB file directly** — no loader library, no wrapper class. The
point is that you can see every step: which container a piece of data lives in, what shape it comes
back as, and which identifier links it to the next piece.

Once the labels are attached, we make the same four plots for each session type:

| Plot | What it shows |
| --- | --- |
| Max projections by depth | where the neurons are, coloured by cell type |
| dF/F heatmaps | all activity in the session, then sorted by cell type |

We will do this first for a **gratings** session, then you can generalize and extend to other sessions types. 

</div>

+++

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h2>The data</h2>

Code Ocean mounts each attached data asset read-only under `/data`, in a folder named
after the asset. This tutorial needs three assets, plus the metadata table:

| Asset | What it provides |
| --- | --- |
| `Visual-Learning-SWDB` | one NWB per imaging session: activity, behavior, ROI masks |
| `Visual-Learning-Cell-Gene-Tables` | per-mouse cell x gene **AnnData**, carrying the cell-type labels |
| `Visual-Learning-Coreg-Tables` | the ID table linking imaged ROIs to HCR cells |
| `/data/metadata/visual_learning_session_metadata.csv` | one row per session: mouse, date, session type |

The division of labour between the two HCR-side assets is worth being explicit about, because it is
the part people get wrong:

- The **coregistration asset** answers *"which HCR cell is this imaged ROI?"*. It is a table of
  **identifiers only** — no expression, no cell types.
- The **cell x gene AnnData** answers *"what type is that HCR cell, and what genes does it express?"*.
  It knows nothing about imaging.

Neither is useful alone. The coreg table's `hcr_id` is the key that opens the AnnData.

If a folder is missing, the asset is not attached — attach it in the capsule's Data panel.

</div>

+++

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h2>Setup</h2>

</div>

```{code-cell} ipython3
import ast
import gc
import os
import glob

import numpy as np
import pandas as pd
import anndata as ad
import pynwb
import matplotlib.pyplot as plt
from matplotlib.colors import to_rgba

# Show wide tables without pandas truncating the middle columns.
pd.set_option('display.width', 200)
pd.set_option('display.max_columns', 30)

# Every attached data asset appears as its own directory under /data.
data_dir = '/data'

plt.rcParams.update({
    'font.size': 14, 'axes.titlesize': 16, 'axes.labelsize': 15,
    'xtick.labelsize': 13, 'ytick.labelsize': 13, 'legend.fontsize': 13,
    'figure.titlesize': 18, 'figure.dpi': 100,
})

sorted(os.listdir(data_dir))
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h2>Part 1: Find sessions using the session metadata table</h2>

Before opening any data file, look at the **session metadata table**. It has one row per session
across the whole dataset — which mouse, which day, which training or imaging stage — so it is the
fastest way to find the sessions worth analyzing. Filenames alone will not tell you what stage a
session was.

</div>

```{code-cell} ipython3
# One row per imaging session, across every mouse in the dataset.
session_metadata = pd.read_csv(
    os.path.join(data_dir, 'metadata', 'visual_learning_session_metadata.csv'))

print('sessions:', session_metadata.shape)
print('mice:    ', sorted(session_metadata['subject_id'].unique()))
print()
print('columns:', session_metadata.columns.tolist())
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

This table is built from the **aind-data-schema v2** metadata, so a few column names differ from
what you may have seen in older notebooks. The ones we use:

| Column | Meaning |
| --- | --- |
| `subject_id` | which mouse |
| `session_id` | the acquisition name, which is how the NWB file is named |
| `name` | the full processed-asset name: `<session_id>_processed_<stamp>` |
| `session_number` | order the sessions were acquired in, per mouse |
| `session_date` | acquisition date — this becomes part of the ROI identifiers later on |
| `session_type` | the training or imaging stage (see the next section) |
| `stage` | just the stage prefix of `session_type`, e.g. `OPHYS_4` — handy for grouping |
| `image_set` | which set of natural images (A or B), if any |
| `n_planes`, `plane_names`, `imaging_depths` | the imaging planes and their depths in microns |
| `planes_failing_zdrift` | how many of this session's planes failed the z-drift QC check |

Three v2 details worth knowing before you index into it:

- **`acquisition_type` is the v2 name for `session_type`**, and both columns are present here
  holding identical values. Use either; this notebook uses `session_type`.
- **`plane_names`, `imaging_depths` and `targeted_structures` are lists stored as strings** —
  `"['VISp_0', 'VISp_1', ...]"` — because a CSV cell holds one value. Parse them with
  `ast.literal_eval` before using them, or you will be indexing into a string character by
  character.
- **`imaging_depths` is in the same order as `plane_names`, not sorted.** `VISp_0` is not
  necessarily the most superficial plane, so `zip` the two lists rather than assuming.

Pick one mouse and list its sessions in acquisition order. This is that animal's whole experimental
history, top to bottom.

</div>

```{code-cell} ipython3
# EDIT: any mouse in the table above. 800995 has all three session types this notebook uses.
mouse = 800995

mouse_sessions = (session_metadata[session_metadata['subject_id'] == mouse]
                  .sort_values('session_number'))

mouse_sessions[['session_number', 'session_date', 'session_type', 'stage', 'image_set',
                'age_days', 'n_planes', 'planes_failing_zdrift', 'session_id']]
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h3>What the session types mean</h3>

**Every session in this dataset has two-photon imaging.** This is the single most important thing to
understand about `session_type`, and the naming makes it slightly confusing.

This dataset uses the same behavioral training curriculum as **Visual Behavior Ophys** (https://allenswdb.github.io/physiology/stimuli/visual-behavior/VB-Behavior.html), and inherited
its `session_type` names. In that dataset mice were trained in a behavior facility and only *then*
placed under the microscope, so `TRAINING_` versus `OPHYS_` really did mean behavior-only versus
imaging. **Here it does not.** Mice are imaged throughout the entire learning process, from the first
naive session onward.

`TRAINING_` still means training — the mouse is genuinely still learning the task. What the prefix
does *not* mean is "no physiology": there is ophys during those sessions too. The boundary between the
two prefixes is **behavioral**: by the time a mouse reaches `OPHYS_`, it has hit criterion performance
on the natural-image version of the task.

You can confirm the imaging part from the metadata table itself: every row, `TRAINING_` and `OPHYS_`
and `STAGE_` alike, has `n_planes == 8`.

| prefix | What it means | Task? | Ophys? |
| --- | --- | --- | --- |
| `TRAINING_` | Still learning: naive through to criterion | yes | yes |
| `OPHYS_` | At criterion on natural images; now manipulations — familiar, novel, extinction | yes | yes |
| `STAGE_` | Passive viewing, no task and no reward | no | yes |

The rest of the name is a number giving position in the sequence, the image set (`images_A` or
`images_B`), and any session-specific suffix.

**The task.** Images flash continuously and the mouse licks to report when the image identity changes.
On a *go* trial the image changes — licking within 750 ms is a **hit** and earns water, not licking is
a **miss**. On a *catch* trial no change occurs, so licking is a **false alarm**. Licking before the
scheduled change aborts the trial.

<h4>Learning the task (`TRAINING_`, still training)</h4>

| `session_type` | What happens |
| --- | --- |
| `TRAINING_0_gratings_autorewards_15min` | First session. Gratings change orientation and reward comes **automatically** — builds the change-reward association. |
| `TRAINING_1_gratings` | Same gratings, but reward now requires a lick. |
| `TRAINING_2_gratings_flashed` | Gratings are **flashed** rather than held on screen, adding a short-term memory demand. |
| `TRAINING_3_images_A_10uL_reward` | Switch to **8 natural images** (set A). |
| `TRAINING_4_images_A_training` | Continued natural-image training. |
| `TRAINING_5_images_A_*` | Final stage, at criterion. `handoff_ready` = met criterion; `handoff_lapsed` = dropped below it; `epilogue` = extra passive block appended. |

<h4>At criterion and beyond (`OPHYS_`, `STAGE_`)</h4>

| `session_type` | What happens |
| --- | --- |
| `OPHYS_1_images_A` | The task with the **familiar** images the mouse trained on, now at criterion. |
| `OPHYS_4_images_B` | **First exposure to novel images** (set B). The novelty condition. |
| `OPHYS_6_images_B` | **Extinction.** The spout is present and the mouse can lick it, but **no rewards are delivered** — the mouse has to *unlearn* the stimulus-reward association. This is specific to this dataset; in Visual Behavior Ophys, `OPHYS_6` is simply set B once it has become familiar. In this dataset it is both set B after a few days of exposure AND an extinction session|
| `STAGE_0` | Passive, no task and no reward: **natural movies**. |
| `STAGE_1` | Passive, no task and no reward: **drifting gratings** varying in contrast and temporal frequency. |

Two details that matter for analysis, both visible in the tables:

- **Omitted flashes.** In `OPHYS_` sessions **5% of non-change flashes are omitted**, breaking the
  stimulus rhythm; the `omitted` column of `stimulus_presentations` flags them. `TRAINING_` sessions
  have none, so an "expected" flash time means something different in the two cases.
- **Gray screen.** `OPHYS_` sessions have a deliberate **5-minute gray-screen period** at the start
  and end, for measuring spontaneous activity. Other stages also begin with some gray screen simply
  because the task takes time to start up, but that is variable — seconds to minutes — not a fixed
  block. Either way it is labelled `spontaneous` in the `intervals` table, so read the duration from
  there rather than assuming. Later sessions also append a `natural_movie_one` block.

Full details on the task and curriculum are in the
[SWDB databook](https://allenswdb.github.io/physiology/stimuli/visual-behavior/VB-Behavior.html).

</div>

+++

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h3>Choose three sessions to compare</h3>

Rather than hardcoding dates, **select sessions by querying the table** — the same code then works
for any mouse. We take the *first* session of each type, because for the novel session "first" is
exactly what makes it novel.

The three we want:

- `TRAINING_1_gratings` — gratings have an orientation, so we can measure orientation tuning
- `OPHYS_1_images_A` — familiar natural images, imaged
- `OPHYS_4_images_B` — first exposure to novel images, imaged

One extra requirement, and it is easy to get caught by: **not every session has coregistration
data.** That pipeline runs per session and some sessions fail it, so a session can be in the
metadata table, have a perfectly good NWB, and still have no cell types attached. Since cell types
are the whole point here, we load the list of coregistered sessions now and require it — the
coregistration table itself is explained properly in Part 3.

</div>

```{code-cell} ipython3
# Which sessions of this mouse have coregistration data? session_key is '<mouse>_<date>'.
#
# The coregistration asset holds one folder per mouse, each with that mouse's table.
# Glob only one level inside THAT mount -- a recursive search of all of /data would walk
# every chunk file of every NWB store, which takes minutes.
coreg_asset_dir = os.path.join(data_dir, 'Visual-Learning-Coreg-Tables')
coreg_path = glob.glob(
    os.path.join(coreg_asset_dir, '*', f'{mouse}_coreg_id_mapping_table.csv'))[0]

# Read just the one column we need to answer the question.
session_keys = pd.read_csv(coreg_path, usecols=['session_key'])['session_key']

# A session_key is '<mouse>_<date>', so the date is the piece after the last underscore.
coregistered_dates = set(session_keys.str.split('_').str[-1])

has_coreg = mouse_sessions['session_date'].isin(coregistered_dates)
dates_without_coreg = mouse_sessions.loc[~has_coreg, 'session_date'].tolist()

print(f'{has_coreg.sum()} of {len(mouse_sessions)} sessions have coregistration data')
print('without:', dates_without_coreg)
```

The rest of the notebook follows three sessions of this mouse: the earliest gratings session,
the first session with the familiar image set, and the first session with the novel set. All
three must be coregistered, otherwise there are no cell types to attach to the activity.

```{code-cell} ipython3
# Only coregistered sessions are usable here, so filter once and choose from that subset.
coregistered_sessions = mouse_sessions[has_coreg]


def first_session_of_type(sessions, session_type):
    """Earliest session of this type among the sessions passed in.

    sessions : rows of the metadata table, already sorted by date.
    """
    matching = sessions[sessions['session_type'] == session_type]
    if matching.empty:
        raise ValueError('no coregistered session of type ' + session_type)
    return matching.iloc[0]


# Each of these is a single row of the metadata table: a pandas Series.
gratings_session = first_session_of_type(coregistered_sessions, 'TRAINING_1_gratings')
familiar_session = first_session_of_type(coregistered_sessions, 'OPHYS_1_images_A')
novel_session = first_session_of_type(coregistered_sessions, 'OPHYS_4_images_B')
```

What is in each of the three? The planes and their imaging depths come from the metadata row
itself, so we never have to guess how many planes a session has.

```{code-cell} ipython3
# Several metadata columns hold Python lists that were written to the csv as TEXT, so they
# come back as strings like "['VISp_0', 'VISp_1']". ast.literal_eval turns such a string
# back into a real list. Every use of ast.literal_eval below is for that reason.
for session in [gratings_session, familiar_session, novel_session]:
    planes = ast.literal_eval(session['plane_names'])
    depths = ast.literal_eval(session['imaging_depths'])

    # imaging_depths follows plane order, not depth order, so pair them up positionally.
    # The result maps plane name -> imaging depth in microns.
    depth_of_plane = dict(zip(planes, depths))

    session_number = session['session_number']
    session_date = session['session_date']
    session_type = session['session_type']

    print(f'session {session_number:>2}  {session_date}  {session_type}')
    print('   planes:', depth_of_plane)
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

Before going further, plot the sequence. One marker per session against its date, coloured by the
stimulus the mouse saw — this is the mouse's whole history in one panel, and it shows things a table
does not: how long the mouse took to reach criterion, where the gaps are, and where the three sessions
we picked sit relative to everything else.

Every one of these sessions has imaging. The colour is the stimulus, so the panel is a picture of
**one mouse's trajectory through the curriculum, imaged the whole way**.

</div>

```{code-cell} ipython3
# The plot below puts one marker per session on a calendar-date axis, coloured by the
# stimulus the mouse saw. Every one of these sessions has ophys; the colour is WHAT THE
# MOUSE SAW, and the progression left to right is the training curriculum.
session_dates = pd.to_datetime(mouse_sessions['session_date'])


# Stimulus category is not a column in the metadata -- derive it from session_type.
# Grouping this way keeps sessions that show the same thing the same colour, whatever
# their session_type prefix happens to be.
def stimulus_category(session_type):
    if session_type == 'OPHYS_1_images_A':
        return 'familiar images'
    if session_type == 'OPHYS_4_images_B':
        return 'novel images'
    if session_type == 'OPHYS_6_images_B':
        return 'novel extinction'
    if session_type == 'STAGE_0':
        return 'natural movies'
    if session_type == 'STAGE_1':
        return 'drifting gratings'
    if 'gratings_flashed' in session_type:
        return 'flashed gratings'
    if 'gratings' in session_type:
        return 'static gratings'
    # Everything left over -- TRAINING_3/4/5 and natural images set A -- is flashed images.
    return 'flashed images'


session_categories = mouse_sessions['session_type'].map(stimulus_category)
print(session_categories.value_counts().to_string())
```

One colour per stimulus category, listed in the order the mouse meets them so the legend
reads like the curriculum itself.

```{code-cell} ipython3
stimulus_colors = {'static gratings':   '#54B166',
                   'flashed gratings':  '#BCE4B6',
                   'flashed images':    '#F2503C',
                   'familiar images':   '#FCAF94',
                   'novel images':      '#559ECB',
                   'novel extinction':  '#BCD6ED',
                   'drifting gratings': '#767171',
                   'natural movies':    '#B0ABAA'}
```

Now the picture of the mouse's learning history. Gaps on the x axis are real gaps between
sessions, and the three labelled points are the sessions this notebook analyzes.

```{code-cell} ipython3
fig, ax = plt.subplots(figsize=(13, 4))

# One scatter call per category, so each gets its own legend entry.
for category, color in stimulus_colors.items():
    in_category = (session_categories == category).values
    if not in_category.any():
        continue
    ax.scatter(session_dates[in_category], mouse_sessions.loc[in_category, 'session_number'],
               s=130, color=color, edgecolor='0.3', linewidth=0.6, label=category, zorder=3)

# Mark the three sessions this notebook analyzes, so their place in the sequence is clear.
for session, label in [(gratings_session, 'gratings'),
                       (familiar_session, 'familiar'),
                       (novel_session, 'novel')]:
    session_date = pd.to_datetime(session['session_date'])
    ax.annotate(label, xy=(session_date, session['session_number']),
                xytext=(0, 18), textcoords='offset points',
                ha='center', fontsize=12, fontweight='bold',
                arrowprops=dict(arrowstyle='-', lw=1))

n_sessions = len(mouse_sessions)
min_planes = mouse_sessions['n_planes'].min()

ax.set_xlabel('date')
ax.set_ylabel('session number')
ax.set_title(f'Mouse {mouse}: {n_sessions} sessions, all with ophys '
             f'({min_planes} planes each)')
ax.legend(frameon=False, loc='upper left', fontsize=11, ncol=2)
ax.margins(0.06)
fig.autofmt_xdate()
fig.tight_layout()
plt.show()
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h2>Part 2: What is in a session, and what conditions it gives you</h2>

Everything for one session — neural activity, behavior, stimulus, ROI masks — is in a single NWB
file. Opening one is a couple of lines; the useful question is **what the file tells you happened
during the experiment**, and therefore what you can compare.

So as we go through the file, we are building an inventory of experimental conditions:

| What we pull out | The conditions it gives you |
| --- | --- |
| 8 imaging planes | depth — superficial vs deep, layer 1 through upper layer 5 |
| dF/F per neuron | the activity being explained |
| `stimulus_presentations` | which image or orientation was on screen, and which flashes were changes or omissions |
| `trials` | trial outcome — hit, miss, false alarm — and reward delivery |
| `events` | licks, rewards and changes as instants, for aligning |
| `intervals` | session blocks: gray screen, task, movie |

Each of those is a way of splitting the neurons' activity into groups you can contrast. The rest of
the notebook does exactly that, with cell type as one more grouping.

</div>

```{code-cell} ipython3
# Each session's NWB store lives in a folder named by the metadata table's `name`
# column, inside the dataset mount.
dataset_dir = os.path.join(data_dir, 'Visual-Learning-SWDB')
session_dir = os.path.join(dataset_dir, gratings_session['name'])

# One store per session directory. Match on 'nwb' to catch both forms it can take --
# a .nwb file or a .nwb.zarr directory -- and exclude the .json provenance sidecars
# that ship alongside it. pynwb.read_nwb opens either form.
nwb_files = [path for path in os.listdir(session_dir)
             if 'nwb' in path and not path.endswith('.json')]
assert len(nwb_files) == 1, f'expected one NWB store, found {len(nwb_files)}'

gratings_nwb = pynwb.read_nwb(os.path.join(session_dir, nwb_files[0]))

# Confirm what animal and preparation this is before analyzing anything from it.
session_type = gratings_session['session_type']
session_date = gratings_session['session_date']

print('genotype   :', gratings_nwb.subject.genotype)
print('session    :', session_type, 'on', session_date)
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

The file's top-level containers are the inventory. What matters for this dataset is which one holds
what:

| container | in this file |
| --- | --- |
| `processing` | the 8 imaging planes (one group each), plus `running` |
| `intervals` | `trials`, `stimulus_presentations`, and a flat `intervals` index — things with a duration |
| `events` | licks, rewards and image changes — things that happen at an instant |
| `acquisition` | raw running-wheel voltages |
| `stimulus` | empty here |

</div>

```{code-cell} ipython3
print('processing :', list(gratings_nwb.processing.keys()))
print('intervals  :', list(gratings_nwb.intervals.keys()))
print('events     :', list(gratings_nwb.events.keys()))
print('acquisition:', list(gratings_nwb.acquisition.keys()))
print('stimulus   :', list(gratings_nwb.stimulus.keys()))
```

```{code-cell} ipython3
# Each imaging plane holds several versions of the activity, plus the segmentation.
print('inside one plane group:', list(gratings_nwb.processing['VISp_2'].data_interfaces.keys()))

# The ROI table sits under image_segmentation and has one row per segmented ROI.
gratings_example_roi_table = (gratings_nwb.processing['VISp_2']['image_segmentation']
                              .plane_segmentations['roi_table'].to_dataframe())

print('ROI table:', gratings_example_roi_table.shape)
print('columns  :', gratings_example_roi_table.columns.tolist())
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h3>One plane's activity</h3>

`dff_timeseries` is the signal to use for most analyses. **&Delta;F/F** is fluorescence change
relative to each neuron's own baseline, which makes a bright neuron and a dim one comparable — both
read out as a *fractional* change. (`event_timeseries`, deconvolved events, is also in each plane
group if you want sparser estimates of spiking.)

Two dataset-specific things to know, both of which matter later:

- The activity array is `(frames, ROIs)`, and **each plane has its own timestamps** — the mesoscope
  visits planes in sequence rather than imaging them at once.
- **Depth comes from the metadata table**, via the `imaging_depths` column paired with `plane_names`.
  The NWB has the same number buried in a free-text `location` string (`'Structure: VISp Depth: 160'`);
  we print it below for comparison, but a parsed column beats parsing a string.

Depth is the first experimental condition available here: these 8 planes span roughly layer 1 to
upper layer 5.

</div>

```{code-cell} ipython3
plane = 'VISp_2'

# The dF/F trace for every ROI in this one plane.
dff_series = gratings_nwb.processing[plane]['dff_timeseries']['dff_timeseries']
plane_dff = dff_series.data[:]                    # (frames, ROIs) -- [:] actually reads it
plane_timestamps = dff_series.timestamps[:]       # seconds, on the same clock as behavior

# Depth per plane, from the v2 metadata columns. imaging_depths is in plane_names order,
# so pairing them positionally gives plane name -> depth in microns.
gratings_plane_names = ast.literal_eval(gratings_session['plane_names'])
gratings_imaging_depths = ast.literal_eval(gratings_session['imaging_depths'])
gratings_depth_of_plane = dict(zip(gratings_plane_names, gratings_imaging_depths))

# The same information as free text on the NWB's ImagingPlane, for comparison.
imaging_plane = (gratings_nwb.processing[plane]['image_segmentation']
                 .plane_segmentations['roi_table'].imaging_plane)

frame_rate = 1 / np.median(np.diff(plane_timestamps))
duration_min = plane_timestamps[-1] / 60

print(f'{plane}: dff {plane_dff.shape} (frames, ROIs) '
      f'at {gratings_depth_of_plane[plane]} um')
print(f'  NWB location string: {imaging_plane.location!r}')
print(f'  frame rate         : {frame_rate:.2f} Hz')
print(f'  session duration   : {duration_min:.1f} min')
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

Before any processing, look at the signal itself. This is one neuron's &Delta;F/F for the whole
session -- a mostly flat baseline with occasional large transients, which is what a calcium trace
looks like. Everything later in the notebook is built out of traces like this one, so it is worth
seeing one before it disappears into a heatmap.

The dashed lines mark where the session's coarse blocks start, so the trace can be read against the
structure of the experiment.

</div>

```{code-cell} ipython3
# The first look at the actual signal: one neuron's dF/F across the whole session.

# Which neuron to show? Not the one with the biggest standard deviation -- that picks a
# cell whose signal is dominated by slow drift over the session, so the transients we
# actually want to see are squashed flat. Instead ask for a neuron with big, clean
# events on a steady baseline, using two numbers per ROI:
#
#   noise  -- the typical frame-to-frame wobble, measured robustly so a few large
#             transients do not inflate it
#   wander -- how much the trace moves around on a MINUTE timescale (slow drift)
#
# Keep the ROIs whose slow wander is small compared with their own noise, then take the
# one with the tallest events relative to its noise.
median_per_roi = np.median(plane_dff, axis=0)
noise_per_roi = np.median(np.abs(plane_dff - median_per_roi), axis=0) * 1.4826

# Average the trace in one-minute bins; how much those bin values move is the drift.
frames_per_minute = int(60 / np.median(np.diff(plane_timestamps)))
n_whole_minutes = plane_dff.shape[0] // frames_per_minute
minute_bins = plane_dff[:n_whole_minutes * frames_per_minute]
minute_bins = minute_bins.reshape(n_whole_minutes, frames_per_minute, -1).mean(axis=1)
wander_per_roi = minute_bins.std(axis=0)

event_height = np.percentile(plane_dff, 99, axis=0) - median_per_roi

# Score only the steady ROIs; -inf parks the drifty ones at the bottom of the argmax.
is_steady = wander_per_roi < 0.5 * noise_per_roi
score = np.where(is_steady, event_height / noise_per_roi, -np.inf)
example_column = int(np.argmax(score))

print(f'{is_steady.sum()} of {len(is_steady)} ROIs have a steady baseline; '
      f'showing ROI {example_column}')

fig, ax = plt.subplots(figsize=(14, 3.5))
ax.plot(plane_timestamps / 60, plane_dff[:, example_column], linewidth=0.5, color='black')

# The session's coarse blocks are rows of the flat `intervals` table tagged
# interval_type == 'epoch'. We only need their start times here; that table gets a
# proper introduction in the next section.
session_intervals = gratings_nwb.intervals['intervals'].to_dataframe()
epoch_rows = session_intervals[session_intervals['interval_type'] == 'epoch']

for epoch_start in epoch_rows['start_time']:
    ax.axvline(epoch_start / 60, color='tab:blue', linestyle='--', linewidth=1)

ax.set_xlabel('Time from session start (min)')
ax.set_ylabel(r'$\Delta$F/F')
# Name the ROI the way the rest of the notebook does -- roi_id is unambiguous, whereas a
# bare column number means one thing within a plane and another in the stacked matrix.
example_roi_id = f'{plane}_{example_column:04d}'

ax.set_title(f'{example_roi_id}: whole session '
             f'(dashed lines: starts of the session epochs)')
fig.tight_layout()
plt.show()
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h3>All 8 planes together, and naming every ROI</h3>

We want one activity matrix for the session &mdash; `(frames, neurons)` with all 8 planes side by side
&mdash; plus a table with one row per column of that matrix.

The important decision is in that table. Each plane's ROI table is tied to its activity array by
**row order alone** (the `id` column is all zeros here). Rather than carry that fragile positional
relationship around, we turn position into a **name**, once, in the format the coregistration table
uses:

| Column | Built from | Example |
| --- | --- | --- |
| `roi_id` | plane name + row index, zero-padded | `VISp_0_0010` |
| `unique_roi_id` | `<mouse>_<date>_` + `roi_id` | `800995_2025-08-21_VISp_0_0010` |

From here on every join is **on a string key**, not an array offset — which is what makes it safe to
subset in any order, since each row carries its own identity.

We also add two integer columns, and it is worth being clear about the difference because they are
easy to confuse:

| Column | Points into |
| --- | --- |
| `column_in_dff` | the session's activity matrix `<session>_dff_all` |
| `plane_roi_index` | that plane's own NWB ROI table, needed for the masks in Part 4 |

There is exactly **one** activity matrix per session and **one** column index into it. `column_in_dff`
is assigned here and never reassigned, so it means the same thing in this table and in every subset of
it we make later.

<h4>The 8 planes do not share a time base</h4>

The planes are imaged in **pairs**: the two planes of a pair share timestamps exactly, and the pairs
are staggered. How large the stagger is depends on how the scope was configured, so **measure it for
your session** rather than computing it from the frame rate — the cell below does, by subtracting one
plane's timestamps from another's. It comes out at tens of milliseconds, an appreciable fraction of a
frame interval and not a rounding error.

**The rule that follows: whenever you convert a time into a frame index, use the timestamps of the
plane that neuron belongs to.** This is why `align_to_changes` in Part 4 loops over planes instead of
indexing the whole matrix at once — the concatenated array is fine to store, but you slice it per
plane. We do not interpolate onto a common clock, which would invent values that were never measured.
(A whole-session heatmap is the one place the offset is safely ignorable.)

</div>

```{code-cell} ipython3
# The imaging planes, from the metadata table rather than assumed to be VISp_0..VISp_7.
# Note the session prefix: each session gets its own list, because they can differ.
gratings_plane_names = ast.literal_eval(gratings_session['plane_names'])

# session_key is how the coregistration table names a session: <mouse>_<date>. We build
# it here because the ROI id strings below have to match that naming exactly.
session_date = gratings_session['session_date']
gratings_session_key = f'{mouse}_{session_date}'

print('planes:', gratings_plane_names)
print('session_key:', gratings_session_key)
```

Read each plane in turn. Three things come out of every plane: its dF/F matrix, its own
timestamp vector, and its ROI table. We collect them in lists and combine them afterwards.

```{code-cell} ipython3
dff_per_plane = []
roi_tables_per_plane = []
gratings_timestamps = {}          # one timestamp array per plane, not one shared vector

for plane in gratings_plane_names:
    dff_series = gratings_nwb.processing[plane]['dff_timeseries']['dff_timeseries']
    plane_dff = np.asarray(dff_series.data[:])
    gratings_timestamps[plane] = np.asarray(dff_series.timestamps[:])

    plane_segmentation = (gratings_nwb.processing[plane]['image_segmentation']
                          .plane_segmentations['roi_table'])
    roi_table = plane_segmentation.to_dataframe()

    # THE positional assumption, asserted once and then never relied on again:
    # row i of the ROI table is column i of this plane's dF/F matrix.
    assert len(roi_table) == plane_dff.shape[1], (
        f'{plane}: ROI table has {len(roi_table)} rows but dff has '
        f'{plane_dff.shape[1]} columns -- cannot assign ROI ids')

    dff_per_plane.append(plane_dff)
    roi_tables_per_plane.append(roi_table)

print('planes read:', len(dff_per_plane))
```

Now turn each plane's ROI table into rows we can join on later. The coregistration table
names ROIs by position within a plane, so we build the same id strings here: that string
is the only thing that links an activity column to a cell type.

```{code-cell} ipython3
roi_rows_per_plane = []

for plane, roi_table in zip(gratings_plane_names, roi_tables_per_plane):
    # Position within the plane, which is what the id strings encode.
    roi_index = np.arange(len(roi_table))

    roi_id = [f'{plane}_{i:04d}' for i in roi_index]
    unique_roi_id = [f'{gratings_session_key}_{name}' for name in roi_id]

    roi_rows_per_plane.append(pd.DataFrame({
        'plane': plane,
        'imaging_depth_um': gratings_depth_of_plane[plane],
        'roi_id': roi_id,
        'unique_roi_id': unique_roi_id,
        'plane_roi_index': roi_index,
        'is_soma': roi_table['is_soma'].values.astype(bool),
    }))

print('ROI tables built:', len(roi_rows_per_plane))
```

Concatenate the planes into one activity matrix for the session, with one table row per
column of that matrix. `column_in_dff` is the bookkeeping that keeps the two aligned.

```{code-cell} ipython3
# Concatenate along the neuron axis: (frames, all ROIs in the session).
# NOTE: this stacks planes that were sampled at slightly DIFFERENT times. That is fine
# for storage, but it means row f of this array is not one instant -- see below.
gratings_dff_all = np.concatenate(dff_per_plane, axis=1)

gratings_roi_table = pd.concat(roi_rows_per_plane, ignore_index=True)
gratings_roi_table['column_in_dff'] = np.arange(len(gratings_roi_table))

assert gratings_roi_table['unique_roi_id'].is_unique, 'unique_roi_id is not unique'

n_soma = gratings_roi_table['is_soma'].sum()
n_roi = len(gratings_roi_table)

print('dff (frames, ROIs):', gratings_dff_all.shape)
print(f'soma ROIs: {n_soma} of {n_roi}')

gratings_roi_table.head(3)
```

The eight planes do **not** share a clock. The mesoscope visits them in sequence, so frame
`f` of one plane was acquired slightly before frame `f` of another. This matters as soon as
you align activity to an event, so measure the offsets rather than assuming them: subtract
one plane's timestamp array from another's, elementwise.

```{code-cell} ipython3
reference_plane = gratings_plane_names[0]
reference_timestamps = gratings_timestamps[reference_plane]

frame_interval = np.median(np.diff(reference_timestamps))
frame_rate = 1 / frame_interval

print(f'frame interval: {frame_interval * 1000:.2f} ms ({frame_rate:.2f} Hz)')
print(f'offset from {reference_plane}, over all {len(reference_timestamps)} frames:')

for plane in gratings_plane_names:
    # Elementwise: frame f of this plane vs frame f of the reference plane.
    offset_ms = (gratings_timestamps[plane] - reference_timestamps) * 1000
    median_offset = np.median(offset_ms)
    print(f'  {plane}: median {median_offset:7.2f} ms '
          f'(range {offset_ms.min():7.2f} to {offset_ms.max():7.2f})')
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h3>The behavior tables: intervals vs events</h3>

All the behavior lives in tables that are **on the same clock as the imaging timestamps**, which is
what makes alignment possible at all. They come in two flavours, and the distinction is simply
whether the thing being described has a duration:

- **`intervals`** tables have `start_time` and `stop_time` — a trial, a flash, an epoch.
- **`events`** tables have a single `timestamp` — a lick, a reward delivery, an image change.

The same occurrence can appear in both: an image change is the boundary of a stimulus presentation
(interval) *and* an instant (event). Use whichever matches what you are aligning to.

<h4>Which tables to use</h4>

**`intervals` and `events` are the core tables.** Between them they hold all the behavior and
stimulus information in the session, and everything else is derived from them.

`stimulus_presentations` and `trials` are those derived tables. They add columns *computed* from
`intervals` and `events` — trial outcome flags, `change_time`, `response_latency`, `is_change` — which
can be genuinely useful. They exist because they are **deliberately designed to mirror the tables in
the Visual Behavior Ophys dataset**: if you want to analyze both datasets together, or reuse code
written against VBO, these are the tables that will make that work.

**If you are new to this dataset, start with `intervals` and `events`.** Two reasons. They are more
intuitive — one flat table of things-with-duration and one of things-that-happen. And they follow the
[**HED (Hierarchical Event Descriptor)**](https://www.hed-resources.org/) schema, which annotates
every row with standardized tags describing what it *is*, rather than leaving you to infer meaning
from a column name.

That annotation is in the `HED` column, and it is populated on every row:

```
Experimental-trial, Non-target, Incorrect-action, Label/false_alarm_trial
Sensory-event, Visual-presentation, (Image, Label/im061), Target
Time-block, Pause, Label/spontaneous
```

Because the vocabulary is a published standard rather than a local convention, those tags are both
human-readable and machine-readable — you can select "all target stimulus events" across datasets
that share the schema without knowing each one's column names. `stimulus_presentations` and `trials`
carry `HED` too, but the flat `intervals` table has the richest vocabulary (29 distinct tag strings in
this session, against 17 and 6), because it is the only one that covers epochs, response windows,
trials and flashes in the same place. The `events` table encodes its equivalent differently: its
categorical columns come with `meanings_tables` giving the value definitions.

<h4>The four tables in `intervals`</h4>

| table | one row per | use it for |
| --- | --- | --- |
| `intervals` | *any* interval | the flat index of everything: epochs, trials, response windows, flashes |
| `trials` | behavioral trial | trial outcome, `change_time`, reward — the widest table, 27 columns |
| `stimulus_presentations` | stimulus flash | what was on screen when, and which flash was a change |
| `natural_movie_one_presentations` | movie frame | the appended natural-movie block, when a session has one |

The flat `intervals` table is the quickest way to see the overall structure of a session. Every
interval is there, distinguished by an `interval_type` column, with foreign keys (`trials_id`,
`stimulus_presentations_id`) pointing back into the specific tables — including the `epoch` rows that
mark the gray-screen and task blocks, which are not in the other tables at all.

</div>

```{code-cell} ipython3
gratings_trials = gratings_nwb.intervals['trials'].to_dataframe()
gratings_stimulus = gratings_nwb.intervals['stimulus_presentations'].to_dataframe()
gratings_all_intervals = gratings_nwb.intervals['intervals'].to_dataframe()
gratings_events = gratings_nwb.events['events'].to_dataframe()

for name, table in [('trials', gratings_trials),
                    ('stimulus_presentations', gratings_stimulus),
                    ('intervals', gratings_all_intervals),
                    ('events', gratings_events)]:
    print(f'{name:24s} {table.shape[0]:>5} rows x {table.shape[1]:>2} columns')
```

```{code-cell} ipython3
# The flat intervals table is the fastest way to see a session's structure:
# every interval, tagged by what kind it is.
print(gratings_all_intervals['interval_type'].value_counts().to_string())
print()

# The epoch rows are the session's coarse blocks -- only in this table.
gratings_all_intervals[gratings_all_intervals['interval_type'] == 'epoch']
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h4>`trials` — one row per behavioral trial</h4>

The widest table. Every trial gets an outcome, and the outcome columns are **booleans, one per
category**, rather than a single label — so you select a condition by masking on the flag you want.

| column | what it is |
| --- | --- |
| `start_time`, `stop_time` | trial bounds, seconds on the session clock |
| `go` / `catch` | the image *did* change / a change time was drawn but the image did not change |
| `hit` / `miss` | on a go trial: licked in the response window / did not |
| `false_alarm` / `correct_reject` | on a catch trial: licked anyway / correctly withheld |
| `aborted` | licked before the scheduled change — usually the **most common** outcome |
| `auto_rewarded` | reward given without requiring a lick (early trials) |
| `warm_up` | the easier trials at the start of a session |
| `change_time`, `change_frame` | **when the image changed** — the anchor for everything in Part 4 |
| `initial_image_name`, `change_image_name` | what was on screen before and after the change |
| `initial_orientation`, `change_orientation` | the same for grating sessions, in degrees |
| `response_time`, `response_latency` | when the mouse licked, and how long after the change |
| `reward_time`, `reward_volume` | when reward was delivered, and how much (mL) |
| `change_window_*`, `response_window_*` | the windows the task used to score the trial |
| `epoch_name` | which session block this trial belongs to |

Note how the outcome counts break down below: aborted trials dominate, which is normal — the mouse
licks impulsively and the trial restarts. Filter to `go` or `catch` before computing performance.

</div>

```{code-cell} ipython3
# Outcome counts. These are boolean columns, so summing gives the trial count per category.
outcome_columns = ['go', 'catch', 'auto_rewarded', 'aborted',
                   'hit', 'miss', 'false_alarm', 'correct_reject', 'warm_up']
print(gratings_trials[outcome_columns].sum().to_string())

# A few go trials, showing the columns Part 4 uses.
gratings_trials.loc[gratings_trials['go'],
                    ['start_time', 'change_time', 'change_image_name', 'change_orientation',
                     'hit', 'response_latency', 'reward_time', 'reward_volume']].head()
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h4>`stimulus_presentations` — one row per flash</h4>

What was on screen, and when. This is the table to use when you want to know the stimulus rather than
the mouse's behavior.

| column | what it is |
| --- | --- |
| `start_time`, `stop_time` | when this flash was on screen |
| `image_name` | which image, or the grating identity (`gratings_90`, …) |
| `orientation` | grating orientation in degrees; `NaN` for natural images |
| `is_change` | **True if the identity changed at this flash** — the same instants as `trials.change_time` |
| `omitted` | True for a deliberately skipped flash (only in `OPHYS_*` sessions) |
| `lick_latency` | time to the next lick, if any |
| `trials_id` | which trial this flash belongs to — the join key back to `trials` |
| `epoch_name` | which session block |

`is_change` and `omitted` are the two columns most analyses turn on. Note that `omitted` is all
`False` in a `TRAINING_` session — flash omissions were only introduced in the post-criterion
`OPHYS_` sessions. (Both kinds of session have imaging; the difference is in the stimulus design,
not the recording.)

</div>

```{code-cell} ipython3
print('flashes            :', len(gratings_stimulus))
print('  changes (is_change):', int(gratings_stimulus['is_change'].sum()))
print('  omitted            :', int(gratings_stimulus['omitted'].sum()))
print('  stimuli present    :', sorted(gratings_stimulus['image_name'].unique()))

gratings_stimulus[['start_time', 'stop_time', 'image_name', 'orientation',
                   'is_change', 'omitted', 'trials_id']].head()
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

The claim that behavior and imaging share one clock is easy to assert and easy to check. Here is the
same example neuron's trace with the image-change times drawn on top, once for the whole session and
once over a 60 s stretch where the individual events are separable. The trace comes from the imaging
data and the red lines come from the stimulus table, so if the clocks did not agree the lines would
land nowhere in particular.

</div>

```{code-cell} ipython3
def plot_trace_with_changes(ax, times, trace, change_times, start, stop):
    """One neuron's trace between start and stop, with change times as red lines."""
    in_view = (times >= start) & (times <= stop)
    ax.plot(times[in_view], trace[in_view], linewidth=0.6, color='black')

    for change_time in change_times[(change_times >= start) & (change_times <= stop)]:
        ax.axvline(change_time, color='tab:red', linewidth=0.8, alpha=0.7)

    ax.set_xlim(start, stop)
    ax.set_ylabel(r'$\Delta$F/F')


# Work from the full activity matrix plus a column index out of the ROI table, rather
# than from the single-plane arrays -- the loop above reused those variable names.
example_plane = 'VISp_2'
plane_columns = gratings_roi_table.loc[gratings_roi_table['plane'] == example_plane,
                                       'column_in_dff'].values

# Same steady-baseline rule as the earlier trace plot, so this is the same neuron.
plane_traces = gratings_dff_all[:, plane_columns]
plane_times = gratings_timestamps[example_plane]

median_per_roi = np.median(plane_traces, axis=0)
noise_per_roi = np.median(np.abs(plane_traces - median_per_roi), axis=0) * 1.4826

frames_per_minute = int(60 / np.median(np.diff(plane_times)))
n_whole_minutes = plane_traces.shape[0] // frames_per_minute
minute_bins = plane_traces[:n_whole_minutes * frames_per_minute]
minute_bins = minute_bins.reshape(n_whole_minutes, frames_per_minute, -1).mean(axis=1)
wander_per_roi = minute_bins.std(axis=0)

event_height = np.percentile(plane_traces, 99, axis=0) - median_per_roi
is_steady = wander_per_roi < 0.5 * noise_per_roi
score = np.where(is_steady, event_height / noise_per_roi, -np.inf)

example_column = plane_columns[int(np.argmax(score))]

# Same ROI as the earlier plot. Take its roi_id from the table rather than rebuilding the
# string, so the two plots provably name the same neuron.
example_roi_id = gratings_roi_table.loc[
    gratings_roi_table['column_in_dff'] == example_column, 'roi_id'].iloc[0]
example_trace = gratings_dff_all[:, example_column]
example_times = gratings_timestamps[example_plane]

# The change times, read from the stimulus table rather than the imaging data.
change_times = gratings_stimulus.loc[gratings_stimulus['is_change'], 'start_time'].values
zoom_centre = change_times[len(change_times) // 2]

fig, axes = plt.subplots(2, 1, figsize=(14, 6))
plot_trace_with_changes(axes[0], example_times, example_trace, change_times,
                        example_times[0], example_times[-1])
plot_trace_with_changes(axes[1], example_times, example_trace, change_times,
                        zoom_centre - 20, zoom_centre + 40)

axes[0].set_title(f'{example_roi_id}: whole session, '
                  f'red lines = image changes')
axes[1].set_title('the same trace over 60 s')
axes[1].set_xlabel('Time from session start (s)')
fig.tight_layout()
plt.show()
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h4>`events` — one row per instant</h4>

Everything that happens at a moment rather than over a window. One table holds all of it, with
`event_type` saying which kind, and the remaining columns describing it along **independent
dimensions** — so a lick is characterized by its classification *and* its position in a bout, rather
than by one combined label.

| column | what it is |
| --- | --- |
| `timestamp` | when it happened, session clock |
| `event_type` | `lick`, `reward`, or `image_change` |
| `lick_classification` | for licks: `hit`, `false_alarm`, `abort`, `consumption`, `spontaneous`, `early`, `late` |
| `lick_bouts` | `bout_start` or `within_bout` — licks come in bursts, and often you only want the first |
| `reward_type` | `earned` (mouse licked for it) or `auto_reward` |
| `reward_volume` | mL delivered |
| `image_name`, `orientation` | what was on screen for change events |
| `trials_id`, `stimulus_presentations_id` | join keys back into the interval tables (`-1` = not applicable) |
| `frame` | the stimulus frame index |

Two things this table gives you that `trials` does not: **every individual lick** (a trial records
only the first response), and licks that fall outside any trial. `lick_bouts` is the practical one —
filtering to `bout_start` turns 3,000 licks into ~1,100 distinct lick events.

</div>

```{code-cell} ipython3
print('event types:')
print(gratings_events['event_type'].value_counts().to_string())
print()
print('lick classifications:')
print(gratings_events['lick_classification'].value_counts().to_string())
print()

# Licks come in bouts; bout_start is usually what you want as "a lick happened here".
lick_events = gratings_events[gratings_events['event_type'] == 'lick']
n_bout_starts = (lick_events['lick_bouts'] == 'bout_start').sum()
print(f'{len(lick_events)} licks, of which {n_bout_starts} start a bout')

gratings_events[['timestamp', 'event_type', 'lick_classification', 'lick_bouts',
                 'reward_type', 'trials_id']].head()
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h2>Part 3: Align ophys to transcriptomics</h2>

This is the first of the two alignments, and the reason the dataset exists. Everything we plot
afterwards depends on getting it right.

The link is made by a **coregistration table**, produced by matching the imaged neurons to cells in
the post-hoc HCR volume.

</div>

+++

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h3>The three ID systems</h3>

This is the part that trips people up. The imaging and the transcriptomics are two separate
measurements of the same tissue, and connecting them takes an intermediate step.

The physical chain is:

```
imaging plane  -->  structural stack  -->  HCR volume
  (one FOV,           (one z-stack of        (thin sections,
   one session)        the same volume)       gene expression)
```

Each imaging plane is registered into a **structural stack** — a high-resolution z-stack of the
same volume — and the structural stack is registered to the **HCR volume**. Going straight from a
2-photon plane to a tissue section is not tractable; the stack is the common reference frame that
makes both registrations possible. The stack is a step in the *pipeline*, not something you index
into here directly, but it is not bookkeeping to ignore either: the stack cell is the entity that
unifies the two modalities, and the column that names it is **`resolved_cz_stack_id`** (see below
for why the resolved one and not `cz_stack_id`).

The three identifiers you actually use:

| ID | Scope | What it identifies |
| --- | --- | --- |
| `unique_roi_id` | **one session, one plane** | one ROI mask, as segmented in this plane on this day |
| `unique_roicat_id` | **all sessions of one mouse** | a neuron, tracked across days |
| `hcr_id` | the mouse's HCR volume | the transcriptomic cell |

Why two IDs on the imaging side? Because a neuron imaged on Monday and again on Tuesday is the
*same cell* but a *different row* in each day's data. `unique_roi_id` is the row; `unique_roicat_id`
is the cell.

The coregistration table carries all three on the same row, which is what makes the link possible:

```
unique_roi_id  -->  unique_roicat_id  -->  hcr_id  -->  subclass
 (ROI mask, one       (the neuron,        (HCR cell)   (cell type)
  plane, one day)      across days)
   \_______ coreg id mapping table _______/   \__ HCR AnnData __/
```

Each end has a job: `unique_roi_id` finds the activity data, `unique_roicat_id` tracks a neuron
across sessions (Part 7), and `hcr_id` looks up the cell type.

</div>

```{code-cell} ipython3
# coreg_path was located in Part 1; read the whole table now. One table per mouse,
# covering every session of that mouse the pipeline succeeded on.
print('reading', os.path.relpath(coreg_path, data_dir))

coreg_table = pd.read_csv(coreg_path, index_col=0)

n_sessions_in_table = coreg_table['session_key'].nunique()
n_neurons_in_table = coreg_table['unique_roicat_id'].nunique()

print(coreg_table.shape, '|', n_sessions_in_table, 'sessions',
      '|', n_neurons_in_table, 'distinct neurons')
print('columns:', coreg_table.columns.tolist())
```

How many sessions is each neuron detected in? There is one row per (neuron, session), so
count distinct session keys per neuron rather than trusting a flag column.

```{code-cell} ipython3
sessions_per_neuron = coreg_table.groupby('unique_roicat_id')['session_key'].nunique()

median_sessions = sessions_per_neuron.median()
max_sessions = sessions_per_neuron.max()
n_single_session = (sessions_per_neuron == 1).sum()
n_neurons = len(sessions_per_neuron)

print(f'sessions per neuron: median {median_sessions:.0f}, max {max_sessions}')
print(f'seen in only one session: {n_single_session} of {n_neurons}')
```

The table carries both the raw z-stack match and the resolved one. `changed` marks the rows
where resolution moved the match, which is the step worth seeing at work.

```{code-cell} ipython3
n_changed = coreg_table['changed'].sum()
percent_changed = 100 * coreg_table['changed'].mean()

print(f'rows where resolution changed the raw match: {n_changed} of {len(coreg_table)} '
      f'({percent_changed:.1f}%)')

# Both stack columns are shown so you can compare them directly.
coreg_table[['session_key', 'unique_roi_id', 'unique_roicat_id', 'plane_id',
             'cz_stack_id', 'resolved_cz_stack_id', 'changed', 'hcr_id']].head(5)
```

```{code-cell} ipython3
# Why resolved_cz_stack_id and not cz_stack_id? Check the consistency of each column
# WITHIN each neuron: every ROI sharing a unique_roicat_id is the same physical cell, so
# they must all point at the same z-stack cell.
for column in ['cz_stack_id', 'resolved_cz_stack_id']:
    has_match = coreg_table[coreg_table[column] > 0]
    ids_per_neuron = has_match.groupby('unique_roicat_id')[column].nunique()

    n_inconsistent = (ids_per_neuron > 1).sum()
    print(f'{column:24s} neurons mapping to >1 stack cell: '
          f'{n_inconsistent:>4} of {len(ids_per_neuron)}')

# And the consequence for anything downstream: does the column contain every typed cell?
typed = coreg_table[coreg_table['hcr_id'] > 0]
print()
for column in ['cz_stack_id', 'resolved_cz_stack_id']:
    n_missing_stack_id = (typed[column] <= 0).sum()
    print(f'{column:24s} rows with an hcr_id but no stack id: '
          f'{n_missing_stack_id:>5} of {len(typed)}')
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h3>What is in the coregistration table</h3>

One row per **coregistered ROI per session**. Note this is a *subset* of each session's segmented
ROIs — the pipeline only carries forward ROIs it tracked — and rows are present whether or not the
match to a transcriptomic cell succeeded.

| Column | Scope | Meaning |
| --- | --- | --- |
| `session_key` | — | `<mouse>_<date>`, which session this row belongs to |
| `unique_roi_id` | one session | one ROI mask on one day |
| `unique_roicat_id` | one mouse | the **neuron**, tracked across sessions by ROICaT |
| `plane_id` | one session | which imaging plane, `VISp_0`-`VISp_7` |
| `hcr_id` | HCR volume | the transcriptomic cell — **the key into the AnnData** |
| `resolved_cz_stack_id` | structural stack | the z-stack cell that links the two modalities — **use this one** |
| `cz_stack_id` | structural stack | the raw per-session match, before ambiguities are resolved |
| `matched` | one mouse | flags neurons tracked across more than one session |
| `max_iou`, `changed`, `undecided` | — | bookkeeping from the stack-matching step |

Four things worth knowing before you join:

- **Unmatched entries are `-1`, not empty.** Convert them to `NaN` first, or every failed ROI joins
  to whatever cell happens to sit at id `-1`.
- **Not every session is in this table.** Some sessions fail the pipeline, so a session with a
  perfectly good NWB may have zero coregistration rows. The cell above counts them.
- **Use `resolved_cz_stack_id`, not `cz_stack_id`.** The raw column matches each ROI to a stack cell
  by spatial overlap independently in each session, which leaves ambiguities — the same neuron
  matched to different stack cells on different days. Resolution uses `unique_roicat_id` to settle
  them: all ROIs of one neuron must map to one stack cell. After resolution no neuron maps to more
  than one stack cell, and **every row with an `hcr_id` has a valid `resolved_cz_stack_id`** — which
  is not true of the raw column, so filtering on it discards real matches.
- **`matched` is about tracking, not cell types.** It marks neurons seen in more than one session,
  which is what Part 7 needs. It is *not* a quality filter on the transcriptomic match — 519 neurons
  with `matched == False` carry a valid `hcr_id`.

<h4>Watch the scope of every id</h4>

`unique_roicat_id` is unique **within a mouse only** — 1,722 of these ids occur in more than one
animal. So group by **`(subject_id, unique_roicat_id)`**, never by `unique_roicat_id` alone. Getting
this wrong raises no error; it just returns a wrong answer (2,453 neurons instead of 7,882).

Same care for the others: `unique_roi_id` is scoped to one session, and `plane_id` is **not** depth
order — `VISp_0` is not the most superficial plane. Sort by `imaging_depths` when you mean depth.

</div>

+++

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h3>The two ID scopes, and why both exist</h3>

This is the distinction to hold onto, because every join in the rest of the notebook depends on it.

- **`unique_roi_id` is one ROI mask, in one imaging plane, in one session.** It names a
  *segmentation result*: this blob of pixels, in this plane, on this day. Segmentation is run
  independently on each session, so a session has exactly one `unique_roi_id` per ROI it found, and
  the same neuron gets a *different* `unique_roi_id` in every session it appears in.
- **`unique_roicat_id` is one neuron, across all sessions of that mouse.** ROICaT matches ROI masks
  across sessions by their shape and position, and assigns each resulting neuron a single identifier
  that is stable across every session of that mouse. It is the unique identifier for a neuron — and
  a neuron detected in only one session still gets one, so having a `unique_roicat_id` does not by
  itself mean the cell was tracked across days.

So the relationship is **many `unique_roi_id` to one `unique_roicat_id`**, and how many varies per
neuron. A neuron detected on 12 of 20 days has 12 rows sharing one `unique_roicat_id`. This is why
Part 7 can track a neuron across days at all, and why the number of sessions a neuron appears in is
itself a data-quality variable.

Note also that `roi_id` is **not comparable between sessions**: `VISp_0_0010` on Monday and
`VISp_0_0010` on Tuesday are unrelated segmentations that happened to land at the same row index.
Only `unique_roicat_id` crosses sessions.

</div>

```{code-cell} ipython3
# How many sessions does each neuron appear in? One bar per count.
sessions_per_neuron = coreg_table.groupby('unique_roicat_id')['session_key'].nunique()
neurons_per_count = sessions_per_neuron.value_counts().sort_index()

# Numbers for the title, pulled out first so the f-string stays readable.
n_neurons = len(sessions_per_neuron)
n_seen_once = (sessions_per_neuron == 1).sum()
median_sessions = sessions_per_neuron.median()

fig, ax = plt.subplots(figsize=(9, 4.5))
ax.bar(neurons_per_count.index, neurons_per_count.values, color='#4C72B0')

# Label the two ends -- the singletons and the best-tracked neurons -- since those are
# the numbers you would actually quote.
for n_sessions in [neurons_per_count.index.min(), neurons_per_count.index.max()]:
    n_at_this_count = neurons_per_count[n_sessions]
    ax.annotate(str(n_at_this_count), xy=(n_sessions, n_at_this_count),
                xytext=(0, 5), textcoords='offset points', ha='center', fontsize=12)

# Integer counts, so force integer ticks rather than letting matplotlib pick halves.
ax.set_xticks(range(0, neurons_per_count.index.max() + 1, 2))
ax.set_xlabel('number of sessions the neuron was detected in')
ax.set_ylabel('number of neurons')
ax.set_title(f'{n_neurons} neurons tracked in mouse {mouse}; '
             f'{n_seen_once} seen once, median {median_sessions:.0f} sessions')
ax.margins(y=0.12)
fig.tight_layout()
plt.show()
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h3>The cell types come from the HCR AnnData</h3>

The cell-type labels live in the HCR cell-gene-tables asset, as an **AnnData** object
(`<mouse>_cellxgene_annotated.h5ad`) rather than a CSV. AnnData is the standard container for
single-cell data and it keeps expression and annotations together, which is why we prefer it here:

| Part | Shape | Contents |
| --- | --- | --- |
| `adata.X` | cells x genes | expression, raw spot counts per cell |
| `adata.layers['normalized']` | cells x genes | the same, normalized |
| `adata.obs` | cells x annotations | `class`, `subclass`, `cluster`, QC columns |
| `adata.var` | genes x annotations | `round`, `channel`, `gene` |

Crucially **`adata.obs_names` is the `cell_id`, and `cell_id` is the same identifier as the coreg
table's `hcr_id`.** That single fact is the whole join.

Note that `var_names` are *probe* names like `R5-514-Pvalb` — round, channel, gene — because a gene
is measured in a particular round and channel. The plain gene symbol is in `adata.var['gene']`.

</div>

```{code-cell} ipython3
# The combined asset holds one folder per mouse, and the folder name carries a date stamp
# we do not want to hardcode. Glob ONE level down -- not recursively, since this asset is
# tens of GB of image data.
hcr_matches = glob.glob(
    os.path.join(data_dir, 'Visual-Learning-Cell-Gene-Tables', '*',
                 f'{mouse}_cellxgene_annotated.h5ad'))

print(f'{len(hcr_matches)} match(es):', [os.path.relpath(p, data_dir) for p in hcr_matches])

adata = ad.read_h5ad(hcr_matches[0])

print(adata)
print('\nobs_names (= cell_id = hcr_id):', adata.obs_names[:5].tolist())
```

```{code-cell} ipython3
# The three annotation columns we care about, coarse to fine.
adata.obs[['class', 'subclass', 'cluster']].value_counts().tail(12)
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

Two conventions in `obs` to be aware of before joining:

- `subclass` is `'none'` for every cell that is not one of the four inhibitory subclasses this gene
  panel resolves — excitatory cells and unassigned cells alike. `'none'` is a **string, not a
  missing value**, so `dropna()` will not remove it. We convert it to `NaN` on the way in.
- `class` (`excitatory` / `inhibitory` / `unassigned`) is the coarser label, and it is the honest
  place to look at how many coregistered cells got a confident call at all.

We also have to fix a type mismatch: `hcr_id` is an integer in the coreg table and a string index
in the AnnData. Joins on mismatched types silently produce nothing.

</div>

```{code-cell} ipython3
cell_types = adata.obs[['class', 'subclass', 'cluster']].copy()
cell_types.columns = ['cell_class', 'subclass', 'cluster_name']

# 'none' / 'unassigned' are placeholder strings, not labels -- make them real missing values.
cell_types['subclass'] = cell_types['subclass'].astype(str).replace('none', np.nan)
cell_types['cluster_name'] = cell_types['cluster_name'].astype(str).replace('unassigned', np.nan)

# Match the coreg table's integer hcr_id so the merge below actually finds anything.
cell_types.index = cell_types.index.astype(np.int64)
cell_types.index.name = 'hcr_id'

print(len(cell_types), 'HCR cells with annotations')

print(len(cell_types[cell_types.cell_class!='unassigned']), 'HCR cells with an assigned cell class')
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h3>Joining, then subsetting — in that order</h3>

Now put the two together. Because we gave every ROI a `unique_roi_id` in the coreg table's own
format back in Part 2, the ophys-to-transcriptomics link is a **string merge**, with no array
arithmetic anywhere:

```
roi_table.unique_roi_id  ==  coreg_table.unique_roi_id     (both '800995_2025-08-21_VISp_0_0010')
                             coreg_table.hcr_id  ==  adata.obs_names
```

We annotate first and subset second, deliberately. Annotating leaves the ROI table the same length
as the activity matrix, so nothing can fall out of step while we are still deciding what to keep.

The joined table gets a new name, `gratings_roi_table_with_types`, instead of being written back over
`gratings_roi_table`. Overwriting is tempting and it is how most notebooks do it, but it means one
variable name refers to a table without cell types above one line and a table with them below it.
Two names, two clearly different things.

</div>

```{code-cell} ipython3
# Just this session's rows of the coregistration table.
gratings_coreg = coreg_table[coreg_table['session_key'] == gratings_session_key].copy()

# Unmatched entries are -1, not empty. Turn them into NaN BEFORE the join, or every
# failed ROI joins to whatever cell happens to sit at id -1.
for column in ['hcr_id', 'resolved_cz_stack_id']:
    gratings_coreg[column] = gratings_coreg[column].where(gratings_coreg[column] > 0)

print(len(gratings_coreg), 'coregistration rows for this session')
```

Attach the cell types. `hcr_id` is the key into the HCR cell-type table, so this join is
what turns a coregistered ROI into a typed neuron.

```{code-cell} ipython3
# validate= makes pandas raise if the key is not unique on the right, which is the check
# you want here: each HCR cell has exactly one label.
gratings_coreg = gratings_coreg.merge(cell_types, left_on='hcr_id', right_index=True,
                                      how='left', validate='many_to_one')

# hcr_id is the key into the AnnData, unique_roicat_id is the key across sessions,
# resolved_cz_stack_id names the z-stack cell (the RESOLVED column, never the raw one),
# and matched flags cells tracked across sessions.
coreg_columns = ['unique_roi_id', 'unique_roicat_id', 'hcr_id', 'resolved_cz_stack_id',
                 'matched', 'cell_class', 'cluster_name', 'subclass']
```

Now join that onto the session's ROI table. Nothing is dropped, so the table still lines up
row-for-column with the activity matrix; ROIs with no coregistration simply get NaN.

```{code-cell} ipython3
# Merge on the ID string, NOT on (plane, position).
gratings_roi_table_with_types = gratings_roi_table.merge(gratings_coreg[coreg_columns],
                                              on='unique_roi_id', how='left',
                                              validate='one_to_one')

# The funnel, one stage per line: how many ROIs survive each step of the coregistration.
n_coregistered = gratings_roi_table_with_types['unique_roicat_id'].notna().sum()
n_in_zstack = gratings_roi_table_with_types['resolved_cz_stack_id'].notna().sum()
n_hcr = gratings_roi_table_with_types['hcr_id'].notna().sum()
n_subclass = gratings_roi_table_with_types['subclass'].notna().sum()
n_tracked = gratings_roi_table_with_types['matched'].fillna(False).sum()

print(f'{len(gratings_roi_table_with_types)} segmented ROIs')
print(f'  {n_coregistered:>5} in the coregistration table')
print(f'  {n_in_zstack:>5} matched to a z-stack cell (resolved)')
print(f'  {n_hcr:>5} matched to an HCR cell')
print(f'  {n_subclass:>5} with an inhibitory subclass label')
print(f'  {n_tracked:>5} tracked across sessions (matched == True)')
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

Those five numbers are the whole coregistration funnel, so plot them. Each bar is the ROIs surviving
one more requirement, for this session only. Look at where the largest drop is: most segmented ROIs
never reach the z-stack at all, which is the step that sets the size of everything downstream.

</div>

```{code-cell} ipython3
# The funnel printed above, as one picture. Counting rows of the ROI table at each
# stage, for this session.
funnel_stages = [
    ('segmented ROIs', len(gratings_roi_table)),
    ('in coreg table', gratings_roi_table_with_types['unique_roicat_id'].notna().sum()),
    ('matched into z-stack', gratings_roi_table_with_types['resolved_cz_stack_id'].notna().sum()),
    ('has an hcr_id', gratings_roi_table_with_types['hcr_id'].notna().sum()),
    ('has a subclass', gratings_roi_table_with_types['subclass'].notna().sum()),
]

stage_labels = [label for label, count in funnel_stages]
stage_counts = [int(count) for label, count in funnel_stages]
bar_positions = np.arange(len(stage_labels))

fig, ax = plt.subplots(figsize=(9, 4))
ax.barh(bar_positions, stage_counts, color='#4C72B0')

# Count and fraction of segmented ROIs at the end of each bar -- the fraction is the
# number you would actually quote.
for position, count in zip(bar_positions, stage_counts):
    ax.text(count + stage_counts[0] * 0.01, position,
            f'{count}  ({count / stage_counts[0]:.0%})', va='center', fontsize=12)

ax.set_yticks(bar_positions)
ax.set_yticklabels(stage_labels)
ax.invert_yaxis()                       # first stage at the top, so it reads downward
ax.set_xlim(0, stage_counts[0] * 1.25)
ax.set_xlabel('ROIs in this session')
ax.set_title('From segmented ROI to cell type, one session')
fig.tight_layout()
plt.show()
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h3>What that looks like across the whole dataset</h3>

One session is a small sample. Measured over **124 sessions from all six mice**, counting *neurons*
(`unique_roicat_id`) rather than per-session segmentations:

| Stage | Neurons |
| --- | --- |
| in the coregistration table | 7,882 |
| in the structural z-stack (`resolved_cz_stack_id`) | 3,885 |
| has an `hcr_id` | 2,827 |

**Quote the success rate against the z-stack.** An imaged neuron reaches its transcriptome *through*
a stack cell, so the stack is the population that could have been matched at all: **2,827 of 3,885 —
73%.** (Against all 7,882 coregistered neurons the same number reads as 36%, but that folds in a
second question — which imaged neurons reached the stack.)

Per mouse the rate is 74-87%, with one exception: **782149 is at 38%**. Its HCR section was ~200 µm
rather than the usual 350-400 µm, so it covers only layers 1-3 — and nothing below ~160 µm has a
transcriptomic match. That is the
sectioning, not a registration failure — do not read its deep planes as evidence that deep cells fail
to coregister.

Two biases to carry forward. Coregistration **selects for somas** without being asked to (97% of
tracked neurons are somas, rising to 99% of HCR-matched ones) — the stack match is a spatial-overlap
test against cell bodies, so a dendrite has little to overlap with. And **typed neurons are not a
random sample**: they favour somas, neurons that tracked reliably, and — because the gene panel
resolves inhibitory types — the sparse inhibitory population.

</div>

+++

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h3>Subsetting to the neurons we will analyze</h3>

Now we choose the neurons to analyze. Two filters, both applied by **selecting rows of the ROI
table**:

1. `is_soma` — keep cell bodies, drop dendrites and segmentation artefacts
2. has an `hcr_id` — keep coregistered ROIs, since a cell type is the point of the notebook

Note what we do **not** do: we do not slice the activity matrix. `gratings_dff_all` stays as it is,
with one column per segmented ROI, for the whole notebook. The subset is a shorter *table*, whose
`column_in_dff` values still point into that same full matrix. So the number in `column_in_dff` means
the same thing everywhere, and there is never a question of which matrix a column number belongs to.

Every plot below therefore follows the same pattern: take the rows you want from a table, and use
their `column_in_dff` to pull those columns out of the full matrix.

</div>

```{code-cell} ipython3
# Which ROIs will we analyze? Somas that were matched to an HCR cell.
keep_roi = gratings_roi_table_with_types['is_soma'] & gratings_roi_table_with_types['hcr_id'].notna()

# A subset is just a ROW FILTER on the table. We do NOT slice the activity matrix and we
# do NOT renumber anything: every row keeps the `column_in_dff` it already had, so that
# number means the same thing here as it did in the full table. To get a neuron's trace,
# read the column it names out of the full matrix.
gratings_rois = gratings_roi_table_with_types[keep_roi].copy()

print(f'{len(gratings_roi_table_with_types)} segmented ROIs -> {len(gratings_rois)} analyzed '
      f'(soma AND coregistered to an HCR cell)')
print('the activity matrix is unchanged:', gratings_dff_all.shape, '(frames, all segmented ROIs)')
print()
print(gratings_rois['cell_class'].value_counts(dropna=False).to_string())
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

Read those numbers in order, because each drop loses something different:

1. **Segmented -> soma + coregistered.** Most recorded ROIs never get an HCR match at all.
2. **Coregistered -> classified.** Of those that do, some come back `unassigned` — the
   transcriptomic call itself failed.
3. **Classified -> inhibitory subclass.** The gene panel is built to resolve *inhibitory* types.
   Excitatory cells are coregistered and classified, but have no subclass label here.

So the population in every plot below is a **thrice-filtered** subset. That is not a flaw to hide;
it is the sampling structure you have to reason about when interpreting any result.

</div>

+++

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h3>Neurons with a subclass label</h3>

Three of the four plots group neurons by inhibitory subclass, so build that ordered subset once,
here, and give the four subclasses a fixed order and colour scheme (the standard Allen
inhibitory-subclass colours).

</div>

```{code-cell} ipython3
# The inhibitory subclasses this HCR gene panel resolves, in standard order.
subclass_order = ['Pvalb', 'Sst', 'Vip', 'Lamp5']
subclass_colors = {'Pvalb': '#D93137', 'Sst': '#FF9900',
                   'Vip': '#A45FBF', 'Lamp5': '#DA808C'}

# Neurons with a subclass label, sorted so same-subclass neurons are adjacent rows in
# a heatmap. Categorical with an explicit order is what makes the sort respect our order
# rather than sorting alphabetically.
gratings_typed = gratings_rois.dropna(subset=['subclass']).copy()
gratings_typed['subclass'] = pd.Categorical(gratings_typed['subclass'],
                                            subclass_order, ordered=True)
gratings_typed = gratings_typed.sort_values(['subclass', 'cluster_name'])

print(f'{len(gratings_typed)} of {len(gratings_rois)} analyzed neurons have a subclass label')
```

Where in cortical depth do the subclasses sit? The median depth per subclass makes the
superficial/deep split easy to see; the full counts per depth follow.

```{code-cell} ipython3
# One step at a time: group, then summarise, then look at it.
depth_by_subclass = gratings_typed.groupby('subclass', observed=True)['imaging_depth_um']
depth_summary = depth_by_subclass.agg(['size', 'median'])

print('median imaging depth (um) per subclass in this session:')
print(depth_summary.to_string())
```

```{code-cell} ipython3
# Counts per (depth, subclass), then unstack so subclasses become columns.
depth_subclass_counts = gratings_typed.groupby(['imaging_depth_um', 'subclass'],
                                               observed=True).size()
depth_subclass_counts.unstack(fill_value=0)
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h4>Reference: which table is which</h4>

Five objects here are "an ROI table". They differ in how many rows they have, never in what
`column_in_dff` means -- it is always a column of `gratings_dff_all`, the full activity matrix.

| Object | One row is |
| --- | --- |
| `gratings_example_roi_table` | one segmented ROI in **one plane**, raw from the NWB (Part 2) |
| `gratings_roi_table` | one segmented ROI in the session, all 8 planes, with `column_in_dff` |
| `gratings_roi_table_with_types` | the same rows, plus coregistration and cell-type columns |
| `gratings_rois` | one soma coregistered to an HCR cell (the analysis population) |
| `gratings_typed` | one of those with an inhibitory subclass, sorted for plotting |

The other integer column, `plane_roi_index`, is the row of that plane's own NWB ROI table, needed for
the masks. The familiar and novel sessions use these same names with their own prefix.

</div>

+++

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h4>The subclasses sit at different depths in the tissue</h4>

The inhibitory subclasses are not spread uniformly through the volume — **Lamp5 and Vip sit
superficially, Sst and Pvalb deeper.** Median depth of the typed neurons across the dataset:

| Lamp5 | Vip | Sst | Pvalb |
| --- | --- | --- | --- |
| 110 µm | 124 µm | 228 µm | 239 µm |

The effect on composition is large: above 90 µm the typed population is ~86% Lamp5 + Vip, while
below 210 µm it is ~60-70% Pvalb.

Note these are **imaging depths in microns, not layer assignments.** This dataset carries no layer
label, and depth alone does not give you one — layer boundaries vary between animals and a plane's
depth is a nominal setting. So this is about relative position in the tissue, not about which layer a
cell is in.

**Why it matters:** if you compare Vip against Pvalb you are largely comparing superficial against
deep, and depth carries its own correlates. Restrict to a range where both are represented, or
include depth in the model — do not call a difference cell-type-specific when it could be a depth
difference.

(Coverage also thins with depth — roughly 69% of ROIs above 150 µm get an `hcr_id` against 56% below
270 µm — because imaging SNR degrades with depth and a cross-modal match needs a good segmentation in
both modalities. That is a gradual thinning, not a cutoff.)

</div>

+++

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h3>The expression behind the labels</h3>

Because the labels came from an AnnData, the expression that produced them is right there. It is
worth one look: the marker genes should separate the subclasses, and if they do not, the labels are
not to be trusted.

We pull the coregistered cells out of the AnnData by `hcr_id` and average the normalized expression
of each subclass's canonical marker, then show it as a heatmap.

Two of the six genes are **controls rather than subclass markers**: `Gad2` is expressed by
inhibitory neurons generally, and `Slc17a7` by excitatory ones. So the check is that each subclass
is brightest in its own gene *among the four markers* — `Gad2` being high everywhere (highest of all
for Lamp5) is the panel working as intended, and near-zero `Slc17a7` confirms these are inhibitory
cells. The `none` row is cells the classifier left unassigned; it looks like a mixture, which is
what you would expect.

</div>

```{code-cell} ipython3
marker_genes = ['Pvalb', 'Sst', 'Vip', 'Lamp5']   # one canonical marker per subclass
control_genes = ['Gad2', 'Slc17a7']               # pan-inhibitory, and excitatory
plotted_genes = marker_genes + control_genes

# var_names are probe names like 'R5-514-Pvalb'; the plain symbol is in var['gene'].
# This dict maps gene symbol -> probe name, so we can select columns by symbol.
probe_of_gene = {}
for probe, gene in zip(adata.var_names, adata.var['gene']):
    probe_of_gene[gene] = probe

plotted_probes = [probe_of_gene[gene] for gene in plotted_genes]
```

Pull out just the cells that were also imaged in this session, and build a plain table of
their expression for the six genes we want to look at.

```{code-cell} ipython3
# obs_names are strings, hcr_id is a float column after the NaN conversion -- go via int.
recorded_hcr_ids = gratings_rois['hcr_id'].dropna().astype(np.int64).astype(str)
recorded_cells = adata[adata.obs_names.isin(recorded_hcr_ids)]

expression_values = recorded_cells[:, plotted_probes].layers['normalized']

marker_expression = pd.DataFrame(expression_values,
                                 index=recorded_cells.obs_names,
                                 columns=plotted_genes)
marker_expression['subclass'] = recorded_cells.obs['subclass'].astype(str).values

print(marker_expression.shape, 'cells x genes (plus the subclass column)')
```

Average within each subclass, keeping the rows in our standard order with the unlabelled
cells last.

```{code-cell} ipython3
expression_by_subclass = marker_expression.groupby('subclass')[plotted_genes]
mean_expression = expression_by_subclass.mean()

# reindex forces the row order rather than leaving it alphabetical; 'none' is the
# label the HCR pipeline gives cells it could not assign.
row_order = subclass_order + ['none']
mean_expression = mean_expression.reindex(row_order)

print(mean_expression.round(2).to_string())
```

The heatmap. Each subclass should be brightest in its own marker gene, which is the check
that the cell-type labels mean what we think they mean.

```{code-cell} ipython3
fig, ax = plt.subplots(figsize=(8.5, 4.5))
image = ax.imshow(mean_expression.values, cmap='magma', aspect='auto', vmin=0)

ax.set_xticks(range(len(plotted_genes)))
ax.set_xticklabels(plotted_genes, style='italic')
ax.set_yticks(range(len(mean_expression)))
ax.set_yticklabels(mean_expression.index)

# Divider between the subclass markers and the two control genes.
ax.axvline(len(marker_genes) - 0.5, color='w', lw=3)
ax.text((len(marker_genes) - 1) / 2, -0.75, 'subclass markers', ha='center', fontsize=12)
ax.text(len(marker_genes) + 0.5, -0.75, 'controls', ha='center', fontsize=12)

# Few enough cells to print every value. Dark cells get white text and bright cells get
# black text, so the numbers stay readable either way.
midpoint = np.nanmax(mean_expression.values) / 2

for row in range(mean_expression.shape[0]):
    for col in range(mean_expression.shape[1]):
        value = mean_expression.values[row, col]
        if value < midpoint:
            text_color = 'white'
        else:
            text_color = 'black'
        ax.text(col, row, f'{value:.2f}', ha='center', va='center', fontsize=11,
                color=text_color)

fig.colorbar(image, ax=ax, label='mean normalized expression')
ax.set_title('Within the subclass markers, each subclass is brightest in its own gene',
             pad=34)
fig.tight_layout()
plt.show()
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

Read this table **down the columns**: each subclass has the highest value in its own marker gene,
which is what makes the labels credible. `Gad2` (pan-inhibitory) is high in all four, and `Slc17a7`
(excitatory) is near zero everywhere — so no excitatory cells have leaked in.

The `none` row is the coregistered cells with no subclass call. Its `Slc17a7` is also low and its
`Gad2` is substantial, so these are mostly inhibitory cells the clustering could not confidently
place, not excitatory cells. That is consistent with the `cell_class` counts above, where the
unlabelled coregistered cells were `unassigned` rather than `excitatory`. Coregistration is biased
toward the sparse inhibitory population, because those are the cells this panel labels.

</div>

+++

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h2>Part 4: Plot ophys data grouped by inhibitory subclass</h2>

Now that every neuron has both an activity trace and a cell type, we can group the physiology by
subclass. Four plots, each a small function so we can run the same set on any session. Each takes
the pieces of data explicitly — the activity matrix, the ROI table, the timestamps — rather than a
session object.

Every one of them follows the same two-step pattern, and it is worth naming it before you read them:
**pick rows of a table, then use those rows' `column_in_dff` to pull columns out of the full activity
matrix.** There is one activity matrix per session and one column index into it, so a function never
has to ask which subset it was handed.

<h3>Plot 1: max projections by depth, ROIs coloured by cell type</h3>

Two pieces of the NWB we have not used yet, both under `nwb.processing[plane]`:

| where | what it is |
| --- | --- |
| `['images']['max_projection']` | the brightest value each pixel reached, so active cells stand out |
| `image_segmentation` → `roi_table['image_mask']` | one boolean image per ROI, shape (ROIs, height, width) |

The masks come straight from the NWB, so they are in the **full segmented order**. That is what
`plane_roi_index` is for: it records which row of the mask array each ROI came from. This is a
different number from `column_in_dff` — one indexes a plane's masks, the other indexes the session's
activity matrix. ROIs outside our analysis population are drawn as grey outlines, so you can see the
analyzed neurons as a fraction of what was segmented.

<h4>A note on memory</h4>

This notebook holds **three sessions at once**, which is enough to run a modest capsule out of
memory. Two habits keep it in check, and both appear in the code below:

- **Draw masks as one image per panel, not one artist per ROI.** A `contour` call per ROI is the
  obvious way to outline several hundred masks, but each call leaves a matplotlib artist behind, and
  `plt.close()` does not fully release them. Painting all the ROIs into a single RGBA overlay and
  calling `imshow` once per panel costs about a third as much for an identical picture. That is what
  `mask_outline` below is for — it computes boundary pixels directly so an outline is just more
  pixels in the overlay.
- **`del` a large array once it is dead, then `gc.collect()`.** The `*_aligned` arrays
  `(changes, window, neurons)` are finished with as soon as we average them, and held for all three
  sessions they are several hundred megabytes doing nothing. The `*_dff_all` matrices are a different
  case: they are the activity data itself and stay live to the end of the notebook, which is the price
  of never having a second, renumbered copy of them.

One thing that does **not** help, in case you try it: the NWB object has no `close()`, and deleting
it frees nothing measurable. The data is read lazily and what you have already pulled into numpy
arrays is yours to manage — the cost is in the arrays and the figures, not in an open file handle.

</div>

```{code-cell} ipython3
def mask_outline(mask):
    """Boundary pixels of a boolean ROI mask: in the mask, but touching something outside.

    Used instead of ax.contour, which creates one artist per ROI -- several hundred of
    those per figure is what makes the max-projection panel expensive in memory.
    """
    interior = mask.copy()
    interior[:-1] &= mask[1:]
    interior[1:] &= mask[:-1]
    interior[:, :-1] &= mask[:, 1:]
    interior[:, 1:] &= mask[:, :-1]
    return mask & ~interior
```

Next, the overlay itself. Every ROI in a plane is painted into a single RGBA image: typed
neurons filled in their subclass colour, untyped ones outlined in grey. One `imshow` of that
overlay replaces several hundred contour artists.

`subclass_of_roi` maps (plane, position-within-plane) to a subclass name, and covers only the
typed neurons -- an ROI missing from it is one we have no cell type for.

```{code-cell} ipython3
def build_roi_overlay(roi_masks, plane, subclass_of_roi, subclass_colors):
    """One RGBA image with every ROI of this plane painted into it.

    Returns (overlay, n_typed): the image, and how many ROIs got a subclass colour.
    """
    overlay = np.zeros(roi_masks.shape[1:] + (4,))       # (h, w, RGBA), fully transparent
    n_typed = 0

    for roi_index in range(roi_masks.shape[0]):
        mask = roi_masks[roi_index]

        if (plane, roi_index) in subclass_of_roi.index:
            # Typed: fill the whole footprint in the subclass colour.
            subclass = subclass_of_roi[(plane, roi_index)]
            overlay[mask] = to_rgba(subclass_colors[subclass], 0.7)
            n_typed += 1
        else:
            # Untyped: outline only, so the fills stay readable.
            overlay[mask_outline(mask)] = to_rgba('lightgray', 0.9)

    return overlay, n_typed
```

And the figure. Arguments, in data terms:

| argument | what it is |
| --- | --- |
| `nwb` | the open session, read for the max projection and the masks |
| `roi_table` | every segmented ROI after the coregistration join, used for the per-panel counts |
| `typed_rois` | the subset with an inhibitory subclass -- these are the ones that get coloured |
| `depth_of_plane` | {plane name: depth in microns}, from the session metadata row |
| `subclass_order`, `subclass_colors` | which subclasses to show in the legend, and in what colour |

```{code-cell} ipython3
def plot_max_projections(nwb, roi_table, typed_rois, depth_of_plane,
                         subclass_order, subclass_colors, title):
    """Max projection per plane, ordered by depth, with ROI masks drawn on top."""
    # (plane, plane_roi_index) -> subclass, for the typed neurons only.
    subclass_of_roi = typed_rois.set_index(['plane', 'plane_roi_index'])['subclass']

    # Per-plane count of ROIs that reached the z-stack, so each panel title can show
    # where ROIs are lost: segmented -> matched into the z-stack -> given a cell type.
    zstack_by_plane = roi_table.groupby('plane')['resolved_cz_stack_id']
    in_zstack_per_plane = zstack_by_plane.apply(lambda column: column.notna().sum())

    # Order the panels from the brain surface downward, since imaging_depths follows
    # plane order rather than depth order.
    planes_by_depth = sorted(depth_of_plane, key=lambda plane: depth_of_plane[plane])

    fig, axes = plt.subplots(2, 4, figsize=(16, 9.5))

    for ax, plane in zip(axes.flat, planes_by_depth):
        segmentation = (nwb.processing[plane]['image_segmentation']
                        .plane_segmentations['roi_table'])

        # Read this plane's summary image and masks, and release them at the end of the
        # loop body -- all 8 planes of masks at once is about half a gigabyte.
        max_projection = np.asarray(nwb.processing[plane]['images']['max_projection'].data[:])
        roi_masks = np.asarray(segmentation['image_mask'].data[:]) > 0.5   # (ROIs, h, w)

        # Percentile clipping: a few very bright pixels would otherwise wash the image out.
        low, high = np.percentile(max_projection, [1, 99.5])
        ax.imshow(max_projection, cmap='gray', vmin=low, vmax=high)

        overlay, n_typed = build_roi_overlay(roi_masks, plane, subclass_of_roi,
                                             subclass_colors)
        ax.imshow(overlay)

        # The funnel for this plane. Most ROIs are lost in the last step, which is cell
        # typing rather than registration.
        n_segmented = roi_masks.shape[0]
        n_in_zstack = in_zstack_per_plane.get(plane, 0)
        depth_label = f'{plane}, {depth_of_plane[plane]} ' + r'$\mu$m'
        count_label = f'{n_segmented} segmented, {n_in_zstack} in z-stack, {n_typed} typed'

        ax.set_title(depth_label + '\n' + count_label, fontsize=13)
        ax.axis('off')

        del max_projection, roi_masks, overlay

    # One square swatch per subclass, built by hand because the colours come from an
    # imshow overlay rather than from labelled artists.
    legend_handles = []
    for name in subclass_order:
        legend_handles.append(plt.Line2D([], [], marker='s', linestyle='', markersize=12,
                                         color=subclass_colors[name], label=name))
    fig.legend(handles=legend_handles, loc='lower center', ncol=4, frameon=False)

    fig.suptitle(title, y=0.99)
    fig.tight_layout(rect=[0, 0.04, 1, 0.97], h_pad=3)
    plt.show()
```

Run it on the gratings session. The title carries mouse, date and session type, so the same
string can label every figure in this section.

```{code-cell} ipython3
subject_id = gratings_session['subject_id']
session_date = gratings_session['session_date']
session_type = gratings_session['session_type']
gratings_title = f'mouse {subject_id}  --  {session_date}  --  {session_type}'

plot_max_projections(gratings_nwb, gratings_roi_table_with_types, gratings_typed,
                     gratings_depth_of_plane, subclass_order, subclass_colors, gratings_title)
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h3>A helper for the subclass groupings</h3>

Three of the four plots show neurons grouped by subclass, and each one needs to mark where the
groups start and end. Write that once.

The groups are marked two ways: a **colour strip** down the left edge, and a white divider line
between adjacent blocks. The strip is drawn in its own narrow axes so it does not eat into the
heatmap.

</div>

```{code-cell} ipython3
def add_subclass_bar(ax, typed_rois, subclass_order, subclass_colors, label=True):
    """Draw a subclass colour strip just left of a heatmap whose y axis is neurons.

    ax              : the heatmap axes, with one row per neuron
    typed_rois      : the neurons in the heatmap, in the SAME row order as the heatmap
    subclass_order  : which subclasses to draw, top to bottom
    subclass_colors : {subclass name: colour}

    subclass_order and subclass_colors are arguments, not notebook-level variables, so
    the strip always matches the ordering the caller actually sorted the rows by.
    """
    block_sizes = typed_rois['subclass'].value_counts()[subclass_order].values
    block_ends = np.cumsum(block_sizes)
    block_starts = block_ends - block_sizes
    block_centres = block_ends - block_sizes / 2

    # A narrow inset axes glued to the left edge of ax. We set its limits to match rather
    # than using sharey, because sharing would make clearing ax's ticks clear the bar's too.
    bar = ax.inset_axes([-0.045, 0, 0.03, 1])
    bar.set_ylim(len(typed_rois), 0)          # inverted, to match imshow's row order
    bar.set_xlim(0, 1)
    bar.set_xticks([])

    for name, start, size in zip(subclass_order, block_starts, block_sizes):
        bar.axhspan(start, start + size, color=subclass_colors[name], linewidth=0)

    if label:
        bar.set_yticks(block_centres)
        bar.set_yticklabels(subclass_order)
        for tick, name in zip(bar.get_yticklabels(), subclass_order):
            tick.set_color(subclass_colors[name])
            tick.set_fontweight('bold')
        bar.tick_params(length=0, pad=4)
    else:
        bar.set_yticks([])

    for side in bar.spines.values():
        side.set_visible(False)

    # Dividers between adjacent blocks, drawn on the heatmap itself.
    for edge in block_ends[:-1]:
        ax.axhline(edge, color='white', linewidth=2)

    ax.set_yticks([])
    return bar
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h3>Plot 2: dF/F heatmaps</h3>

One trace per neuron becomes unreadable past a handful of neurons, so use a **heatmap**: each row is
one neuron, x is time, colour is &Delta;F/F.

Both panels pull their columns out of the full activity matrix, and that is the whole reason the
function needs a table as well as a matrix: `analyzed_rois['column_in_dff']` selects the analysis
population, `typed_rois['column_in_dff']` selects the typed neurons in subclass order. The matrix is
`(frames, neurons)` and a heatmap wants `(neurons, frames)`, hence the `.T`.

The second panel is a subset of the first, which is the point — it shows how much of the population
carries a cell-type label.

</div>

```{code-cell} ipython3
def plot_dff_heatmaps(dff, analyzed_columns, typed_columns, typed_rois,
                      timestamps, plane_names, n_segmented,
                      subclass_order, subclass_colors, title):
    """Two heatmaps of the whole session: all analyzed neurons, then typed neurons.

    dff              : (frames, ROIs) activity matrix for this session
    analyzed_columns : columns of `dff` for the analyzed neurons (top panel)
    typed_columns    : columns of `dff` for the typed neurons, one per row of typed_rois
                       and in the SAME order, so the colour strip lines up
    typed_rois       : the typed neurons' table rows, sorted by subclass
    timestamps       : {plane name: timestamp array} for this session
    plane_names      : the planes of THIS session -- passed in, because it changes from
                       session to session and a stale list would put the wrong seconds
                       on the x axis
    n_segmented      : how many ROIs were segmented, for the panel title
    """
    # Any one plane's clock is close enough for the x extent: the planes are offset from
    # each other by a few milliseconds, and this axis spans an hour.
    time = timestamps[plane_names[0]]

    analyzed_dff = dff[:, analyzed_columns]

    # Colour limit from the data rather than a hardcoded dF/F value: dF/F is one-sided,
    # so scale to the 98th percentile. A handful of large transients would otherwise set
    # the scale and leave everything else near-black.
    dff_limit = np.percentile(analyzed_dff, 98)

    fig, axes = plt.subplots(2, 1, figsize=(14, 10))

    # The matrix is (frames, neurons) and a heatmap wants (neurons, frames), hence .T.
    # extent puts real seconds on the x axis; the y extent counts neurons downward.
    axes[0].imshow(analyzed_dff.T, aspect='auto', cmap='magma', vmin=0, vmax=dff_limit,
                   extent=[time[0], time[-1], analyzed_dff.shape[1], 0])
    axes[0].set_ylabel('Neuron')
    axes[0].set_title(f'{analyzed_dff.shape[1]} soma ROIs coregistered to an HCR cell '
                      f'(of {n_segmented} segmented)')

    # Same picture, restricted to the typed neurons and in subclass-sorted order.
    typed_dff = dff[:, typed_columns]
    axes[1].imshow(typed_dff.T, aspect='auto', cmap='magma',
                   vmin=0, vmax=dff_limit, extent=[time[0], time[-1], len(typed_rois), 0])
    add_subclass_bar(axes[1], typed_rois, subclass_order, subclass_colors)
    axes[1].set_xlabel('Time (s)')
    axes[1].set_title(f'{len(typed_rois)} with an inhibitory subclass label')

    fig.suptitle(title)
    fig.tight_layout(rect=[0.055, 0, 1, 1])
    plt.show()


# This session's plane names, in plane order. gratings_depth_of_plane was built from
# this session's own metadata row, so its keys are exactly this session's planes -- we
# pass them explicitly instead of relying on a notebook-level variable that the later
# sections overwrite.
```

Run it on the gratings session. The top panel is every analyzed neuron; the bottom one is
the typed subset, with the colour strip showing where each subclass block starts and ends.

```{code-cell} ipython3
plot_dff_heatmaps(gratings_dff_all,
                  analyzed_columns=gratings_rois['column_in_dff'].values,
                  typed_columns=gratings_typed['column_in_dff'].values,
                  typed_rois=gratings_typed,
                  timestamps=gratings_timestamps,
                  plane_names=gratings_plane_names,
                  n_segmented=len(gratings_roi_table),
                  subclass_order=subclass_order,
                  subclass_colors=subclass_colors,
                  title=gratings_title)
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h2>Where to go next</h2>

The pieces are now in place to ask the questions this dataset was built for.

- **Follow neurons through the whole curriculum.** The `unique_roicat_id` intersection generalizes to
  any number of sessions. Intersect across all of them to get the neurons tracked from naive to
  expert, and watch their responses change. Decide `is_soma` once per neuron rather than per session
  before you do.
- **The novelty effect.** Compare `OPHYS_1_images_A` (familiar), `OPHYS_4_images_B`
  (novel), and `OPHYS_6_images_B` (extinction: set B, no rewards). The three-way comparison separates
  novelty from image set from reward.
- **Extinction as its own question.** In `OPHYS_6_images_B` the mouse keeps licking at first and
  gets nothing, so the stimulus-reward association is being unlearned across the session. Splitting
  that session into early and late blocks, or tracking the lick rate alongside the neural response,
  is a learning question you can ask within a single session.
- **Use expression as a continuous variable.** Everything above treated cell type as a discrete
  label, but `adata.layers['normalized']` gives graded expression per cell. Correlating a functional
  metric against a single gene avoids committing to a clustering at all.
- **Use the finer clusters.** `adata.obs['cluster']` has ~30 clusters where `subclass` has four.
  There are fewer coregistered neurons per cluster, so this needs pooling across mice.
- **Omitted flashes.** Align to `omitted == True` in the stimulus table instead of to changes.
- **Hits versus misses.** Split `change_time` by trial outcome. Interpret differences beyond about a
  second after the change with care: by then the mouse has licked and consumed reward, so movement
  and reward are mixed in with vision.
- **Other mice.** `session_metadata['subject_id'].unique()` lists them. Each has its own
  coregistration table in the same asset and its own HCR AnnData.

Three cautions carried over from earlier parts. First, coregistered neurons are not a random sample
of segmented ROIs — they are biased toward somas and toward neurons that tracked reliably, and the
inhibitory subclasses sit at systematically different depths (Lamp5 and Vip superficial, Sst and
Pvalb deep), so a subclass difference is partly a depth difference. Compare like with like. Second, all joins go through `unique_roi_id` and
`unique_roicat_id`; the moment you find yourself indexing one session's array with another session's
positions, stop. Third, a selectivity index built as a ratio saturates when one of the two responses
is negative; check the sign before trusting the value.

</div>
