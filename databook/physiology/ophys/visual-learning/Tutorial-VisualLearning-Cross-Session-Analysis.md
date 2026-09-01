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

<h1 align="center">Visual Learning: comparing the same neurons across sessions</h1>

+++

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h2>What this notebook does</h2>

The whole point of this dataset is that **the same neurons are imaged day after day**, through the
entire training curriculum. Nothing in the first two notebooks used that: each session was loaded,
typed and analyzed on its own, and a neuron in one session had no relationship to a neuron in
another.

This notebook makes that link. It takes two sessions, finds the neurons present in both, and asks
how their responses differ between the two days.

<h3>The two sessions</h3>

| | `OPHYS_4_images_B` — **novel** | `OPHYS_6_images_B` — **extinction** |
| --- | --- | --- |
| Images | set B | set B, the same eight |
| Task | change detection | change detection |
| Reward for a correct lick | yes | **no** |
| Two days apart | | |

This pair is chosen deliberately. Both sessions use the *same* image set on the *same* flash
schedule, so the stimulus is held constant and the only thing that changes is the **reward
contingency**: in `OPHYS_6` licking no longer produces water, and the association the mouse spent
weeks acquiring is extinguished. A difference between these two sessions cannot be blamed on the
images being different — which is exactly the confound that a familiar-versus-novel comparison
carries, since image sets A and B are disjoint.

<h3>Before you start</h3>

This is the third notebook in the series and it reuses both of the earlier ones:

- `Tutorial-VisualLearning-Physiology-and-CellTypes.ipynb` — the session metadata table, the NWB
  layout, and the ID chain that attaches a transcriptomic cell type to an imaged ROI. Condensed
  here into `load_session`.
- `Tutorial-VisualLearning-Event-Aligned-Activity.ipynb` — the change and omission alignment. Its
  three helper functions are reproduced below without re-deriving them.

</div>

+++

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h2>The data</h2>

Code Ocean mounts each attached data asset read-only under `/data`, in a folder named after the
asset. This notebook needs the same three assets as the first one, plus the metadata table:

| Asset | What it provides |
| --- | --- |
| `Visual-Learning-SWDB` | one NWB per imaging session: activity, behavior, ROI masks |
| `Visual-Learning-Cell-Gene-Tables` | per-mouse cell x gene **AnnData**, carrying the cell-type labels |
| `Visual-Learning-Coreg-Tables` | the ID table linking imaged ROIs to HCR cells |
| `/data/metadata/visual_learning_session_metadata.csv` | one row per session: mouse, date, session type |

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

# Show wide tables without pandas truncating the middle columns.
pd.set_option('display.width', 200)
pd.set_option('display.max_columns', 30)

# Every attached data asset appears as its own directory under /data.
data_dir = '/data'
dataset_dir = os.path.join(data_dir, 'Visual-Learning-SWDB')

plt.rcParams.update({
    'font.size': 14, 'axes.titlesize': 16, 'axes.labelsize': 15,
    'xtick.labelsize': 13, 'ytick.labelsize': 13, 'legend.fontsize': 13,
    'figure.titlesize': 18, 'figure.dpi': 100,
})
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h2>Part 1: Loading the two sessions</h2>

The same four steps as the previous notebook: find the mouse's coregistered sessions, pick the two
we want, read the cell types, load each session.

</div>

```{code-cell} ipython3
# One row per imaging session, across every mouse in the dataset.
session_metadata = pd.read_csv(
    os.path.join(data_dir, 'metadata', 'visual_learning_session_metadata.csv'))

# EDIT: any mouse in the table. 800995 has every session type these notebooks use.
mouse = 800995

mouse_sessions = (session_metadata[session_metadata['subject_id'] == mouse]
                  .sort_values('session_number'))

# Which sessions of this mouse have coregistration data? The coregistration asset holds
# one folder per mouse, each with that mouse's table. Glob only one level inside THAT
# mount -- a recursive search of all of /data would walk every chunk file of every NWB.
coreg_path = glob.glob(os.path.join(data_dir, 'Visual-Learning-Coreg-Tables', '*',
                                    f'{mouse}_coreg_id_mapping_table.csv'))[0]

# A session_key is '<mouse>_<date>', so the date is the piece after the last underscore.
session_keys = pd.read_csv(coreg_path, usecols=['session_key'])['session_key']
coregistered_dates = set(session_keys.str.split('_').str[-1])

coregistered_sessions = mouse_sessions[mouse_sessions['session_date'].isin(coregistered_dates)]

print(f'{len(coregistered_sessions)} of {len(mouse_sessions)} sessions are coregistered')
coregistered_sessions[['session_number', 'session_date', 'session_type', 'n_planes']]
```

Both sessions must be **coregistered**, otherwise there are no neuron identities to match on and no cell types to group by. We pick the first coregistered session of each type.

```{code-cell} ipython3
def first_session_of_type(sessions, session_type):
    """Earliest session of this type among the sessions passed in.

    sessions : rows of the metadata table, already sorted by date.
    """
    matching = sessions[sessions['session_type'] == session_type]
    if matching.empty:
        raise ValueError('no coregistered session of type ' + session_type)
    return matching.iloc[0]


novel_session = first_session_of_type(coregistered_sessions, 'OPHYS_4_images_B')
extinction_session = first_session_of_type(coregistered_sessions, 'OPHYS_6_images_B')

for session in [novel_session, extinction_session]:
    print(f"{session['session_type']:<20} {session['session_date']}  "
          f"session number {session['session_number']}")

days_apart = (pd.to_datetime(extinction_session['session_date'])
              - pd.to_datetime(novel_session['session_date'])).days
print(f'\n{days_apart} days apart')
```

```{code-cell} ipython3
# The coregistration table: one row per (ROI, session) for this mouse. It carries
# identifiers only -- which HCR cell an imaged ROI is, and which neuron it belongs to.
coreg_table = pd.read_csv(coreg_path, index_col=0)

# The cell-type labels: one row per HCR cell, in an AnnData. The folder name carries a
# date stamp we do not want to hardcode, so glob one level down.
hcr_path = glob.glob(os.path.join(data_dir, 'Visual-Learning-Cell-Gene-Tables', '*',
                                  f'{mouse}_cellxgene_annotated.h5ad'))[0]
adata = ad.read_h5ad(hcr_path)

cell_types = adata.obs[['class', 'subclass', 'cluster']].copy()
cell_types.columns = ['cell_class', 'subclass', 'cluster_name']

# 'none' / 'unassigned' are placeholder strings, not labels -- make them real missing values.
cell_types['subclass'] = cell_types['subclass'].astype(str).replace('none', np.nan)
cell_types['cluster_name'] = cell_types['cluster_name'].astype(str).replace('unassigned', np.nan)

# Match the coreg table's integer hcr_id so the merge inside load_session finds anything.
cell_types.index = cell_types.index.astype(np.int64)
cell_types.index.name = 'hcr_id'

print(coreg_table.shape, 'coregistration rows |', len(cell_types), 'annotated HCR cells')

# The inhibitory subclasses this HCR gene panel resolves, in standard order.
subclass_order = ['Pvalb', 'Sst', 'Vip', 'Lamp5']
subclass_colors = {'Pvalb': '#D93137', 'Sst': '#FF9900',
                   'Vip': '#A45FBF', 'Lamp5': '#DA808C'}

# The coregistration columns worth carrying onto the ROI table: hcr_id is the key into
# the AnnData, unique_roicat_id is the key across sessions, resolved_cz_stack_id names
# the z-stack cell (the RESOLVED column, never the raw one), and matched flags cells
# tracked across sessions.
coreg_columns = ['unique_roi_id', 'unique_roicat_id', 'hcr_id', 'resolved_cz_stack_id',
                 'matched', 'cell_class', 'cluster_name', 'subclass']
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h3>One function to load a session</h3>

The first notebook walked through loading a session one step at a time: open the NWB, read the 8
imaging planes, name every ROI in the coregistration table's format, join the coregistration table
and the cell types onto that ROI table, and subset to the neurons worth analyzing. Nothing about
those steps changes from session to session, so here they are packaged into a single function.

Four short functions — open the file, read the planes, attach the cell types, subset — and a
wrapper that calls them in order. Read them once, then use the wrapper without thinking about it.

It returns a **dictionary**, because a session is a bundle of things that have to stay together:

| key | what it is |
| --- | --- |
| `dff` | `(frames, all segmented ROIs)` activity matrix for the whole session |
| `timestamps` | `{plane name: frame times}` — one clock per plane, never a shared one |
| `plane_names`, `depth_of_plane` | this session's planes, and how deep each one sat |
| `roi_table` | one row per segmented ROI, after the coregistration and cell-type joins |
| `rois` | the subset we analyze: somas matched to an HCR cell |
| `typed` | the subset with an inhibitory subclass label, sorted by subclass |
| `trials`, `stimulus` | the behavior and stimulus tables, on the imaging clock |
| `nwb`, `row`, `key`, `title` | the open file, its metadata row, its `session_key`, a figure title |

The one invariant to hold onto: **`column_in_dff` is the only neuron numbering**. Every table in
that dictionary carries it, it always means a column of `dff`, and `rois` and `typed` are row
filters that never renumber anything.

</div>

```{code-cell} ipython3
def open_session(session_row):
    """Open the NWB store for one session.

    Returns (nwb, session_key, depth_of_plane). session_key is how the coregistration
    table names a session, '<mouse>_<date>'; depth_of_plane maps each imaging plane to
    its depth in microns, and its keys are this session's plane names.
    """
    session_key = f"{session_row['subject_id']}_{session_row['session_date']}"

    # Planes and depths for THIS session, from its own metadata row. Both columns are
    # Python lists stored as text, and imaging_depths is in plane_names order.
    plane_names = ast.literal_eval(session_row['plane_names'])
    imaging_depths = ast.literal_eval(session_row['imaging_depths'])
    depth_of_plane = dict(zip(plane_names, imaging_depths))

    # One NWB store per session directory. Match on 'nwb' to catch both forms it can
    # take -- a .nwb file or a .nwb.zarr directory -- and skip the .json sidecars.
    session_dir = os.path.join(dataset_dir, session_row['name'])
    nwb_files = [path for path in os.listdir(session_dir)
                 if 'nwb' in path and not path.endswith('.json')]
    assert len(nwb_files) == 1, f'expected one NWB store, found {len(nwb_files)}'

    return pynwb.read_nwb(os.path.join(session_dir, nwb_files[0])), session_key, depth_of_plane
```

```{code-cell} ipython3
def read_planes(nwb, session_key, depth_of_plane):
    """Read all 8 imaging planes into one activity matrix and one ROI table.

    Returns (dff_all, timestamps, roi_table):

    - dff_all    : (frames, all segmented ROIs) -- the planes concatenated side by side
    - timestamps : {plane name: frame times} -- one clock per plane, NEVER a shared one
    - roi_table  : one row per column of dff_all, carrying that column number
    """
    dff_per_plane = []
    roi_rows_per_plane = []
    timestamps = {}

    for plane in depth_of_plane:
        dff_series = nwb.processing[plane]['dff_timeseries']['dff_timeseries']
        plane_dff = np.asarray(dff_series.data[:])
        timestamps[plane] = np.asarray(dff_series.timestamps[:])

        roi_table = (nwb.processing[plane]['image_segmentation']
                     .plane_segmentations['roi_table'].to_dataframe())

        # THE positional assumption, asserted once and then never relied on again:
        # row i of the ROI table is column i of this plane's dF/F matrix.
        assert len(roi_table) == plane_dff.shape[1], f'{plane}: ROI table and dff disagree'

        # Turn each ROI's position in its plane into the id strings the coregistration
        # table uses, so every join from here on is on a name, not an array offset.
        roi_index = np.arange(len(roi_table))
        roi_rows_per_plane.append(pd.DataFrame({
            'plane': plane,
            'imaging_depth_um': depth_of_plane[plane],
            'roi_id': [f'{plane}_{i:04d}' for i in roi_index],
            'unique_roi_id': [f'{session_key}_{plane}_{i:04d}' for i in roi_index],
            'plane_roi_index': roi_index,
            'is_soma': roi_table['is_soma'].values.astype(bool),
        }))
        dff_per_plane.append(plane_dff)

    # One activity matrix for the session, and one table row per column of it.
    # NOTE: this stacks planes sampled at slightly DIFFERENT times, so a row of this
    # matrix is not one instant. That is what the per-plane timestamps are for.
    dff_all = np.concatenate(dff_per_plane, axis=1)

    roi_table = pd.concat(roi_rows_per_plane, ignore_index=True)
    roi_table['column_in_dff'] = np.arange(len(roi_table))
    assert roi_table['unique_roi_id'].is_unique, 'unique_roi_id is not unique'

    return dff_all, timestamps, roi_table
```

```{code-cell} ipython3
def attach_cell_types(roi_table, coreg_table, cell_types, session_key):
    """Join the coregistration IDs and the HCR cell types onto a session's ROI table.

    Nothing is dropped: the result has the same rows in the same order as roi_table, so
    it still lines up with the activity matrix. ROIs with no coregistration get NaN.
    """
    # This session's coregistration rows. Unmatched entries are -1, not empty: convert
    # them BEFORE the join, or every failed ROI joins to whatever sits at id -1.
    coreg = coreg_table[coreg_table['session_key'] == session_key].copy()
    for column in ['hcr_id', 'resolved_cz_stack_id']:
        coreg[column] = coreg[column].where(coreg[column] > 0)

    # hcr_id is the key into the cell-type table; then the ID string joins onto the ROIs.
    # The validate= arguments fail loudly if a join is not the cardinality we think.
    coreg = coreg.merge(cell_types, left_on='hcr_id', right_index=True,
                        how='left', validate='many_to_one')

    return roi_table.merge(coreg[coreg_columns], on='unique_roi_id',
                           how='left', validate='one_to_one')
```

```{code-cell} ipython3
def subset_neurons(roi_table, subclass_order):
    """The two subsets every plot uses: analyzed neurons, and typed neurons.

    Subsetting is a ROW FILTER on the table. The activity matrix is left alone and no
    row is renumbered, so column_in_dff means the same thing before and after.

    - rois  : somas that were matched to an HCR cell -- what we analyze
    - typed : those of them with an inhibitory subclass label, sorted by subclass so
              same-subclass neurons are adjacent rows in a heatmap
    """
    rois = roi_table[roi_table['is_soma'] & roi_table['hcr_id'].notna()].copy()

    typed = rois.dropna(subset=['subclass']).copy()
    typed['subclass'] = pd.Categorical(typed['subclass'], subclass_order, ordered=True)
    typed = typed.sort_values(['subclass', 'cluster_name'])

    return rois, typed
```

```{code-cell} ipython3
def load_session(session_row, coreg_table, cell_types, subclass_order):
    """The four steps above, in order, bundled into one dictionary."""
    nwb, session_key, depth_of_plane = open_session(session_row)
    dff_all, timestamps, roi_table = read_planes(nwb, session_key, depth_of_plane)
    roi_table = attach_cell_types(roi_table, coreg_table, cell_types, session_key)
    rois, typed = subset_neurons(roi_table, subclass_order)

    return {
        'row': session_row,
        'key': session_key,
        'nwb': nwb,
        'plane_names': list(depth_of_plane),
        'depth_of_plane': depth_of_plane,
        'dff': dff_all,
        'timestamps': timestamps,
        'roi_table': roi_table,
        'rois': rois,
        'typed': typed,
        'trials': nwb.intervals['trials'].to_dataframe(),
        'stimulus': nwb.intervals['stimulus_presentations'].to_dataframe(),
        'title': (f"mouse {session_row['subject_id']}  --  {session_row['session_date']}"
                  f"  --  {session_row['session_type']}"),
    }


def describe(session):
    """One line per thing load_session returned, so the shapes are visible."""
    print(session['title'])
    print('  dff (frames, all segmented ROIs):', session['dff'].shape)
    print('  segmented ROIs                  :', len(session['roi_table']))
    print('  analyzed (soma + HCR match)     :', len(session['rois']))
    print('  with a subclass label           :', len(session['typed']))
    print('  trials                          :', len(session['trials']))
    print('  stimulus presentations          :', len(session['stimulus']))
```

Load both. This reads two whole sessions of activity, so it takes a minute or two.

```{code-cell} ipython3
novel = load_session(novel_session, coreg_table, cell_types, subclass_order)
extinction = load_session(extinction_session, coreg_table, cell_types, subclass_order)

describe(novel)
print()
describe(extinction)
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

Look at the two sessions side by side before going further. The neuron counts are close but not
equal, and the **column numbers are unrelated** — segmentation ran independently on each day. The
only column the two tables share a vocabulary for is `unique_roicat_id`, which is what Part 4
matches on.

</div>

```{code-cell} ipython3
identity_columns = ['plane', 'column_in_dff', 'unique_roicat_id', 'hcr_id', 'subclass']

print('the first three analyzed neurons of each session:')
pd.concat([novel['rois'][identity_columns].head(3).assign(session='novel'),
           extinction['rois'][identity_columns].head(3).assign(session='extinction')])
```

The coregistration table is what carries a neuron across days. One neuron, one row per session it was found in — here is a single `unique_roicat_id` in that table.

```{code-cell} ipython3
# A neuron the pipeline tracked through many sessions, to show the table's shape.
sessions_per_neuron = coreg_table.groupby('unique_roicat_id')['session_key'].nunique()
well_tracked_neuron = sessions_per_neuron.idxmax()

one_neuron = coreg_table[coreg_table['unique_roicat_id'] == well_tracked_neuron]

print(f'{well_tracked_neuron} appears in {len(one_neuron)} sessions, always as the same HCR cell')
one_neuron[['session_key', 'unique_roicat_id', 'unique_roi_id', 'hcr_id']].head(6)
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h2>Part 2: The behavior first</h2>

Before looking at a single neuron, look at what the mouse did. The manipulation in `OPHYS_6` is
behavioral, and if it did not take hold in this session there is nothing to explain.

The signature of extinction is a collapse in responding, and the two things to look at are the
**hit rate** over the session and the **lick rate** over the session. Plot both for each session and
compare them, rather than assuming what the manipulation did.

</div>

```{code-cell} ipython3
def hit_rate_over_session(session, block_size=25):
    """Fraction of go trials that were hits, in consecutive blocks of go trials."""
    go_trials = session['trials'][session['trials']['go']].sort_values('start_time')

    # Splitting the hit column in order gives consecutive blocks through the session.
    hits = go_trials['hit'].values.astype(float)
    n_blocks = max(1, len(hits) // block_size)

    return np.array([block.mean() for block in np.array_split(hits, n_blocks)])


# What goes in: one row per trial, with boolean outcome columns.
print(novel['trials'][['start_time', 'go', 'hit', 'miss', 'aborted']].head(4).to_string())
print()

# What comes out: one number per block of 25 go trials.
for name, session in [('novel', novel), ('extinction', extinction)]:
    hit_rate = hit_rate_over_session(session)
    print(f'{name:<11} {len(hit_rate)} blocks:', np.round(hit_rate, 2))
```

Licking is in the events table, one row per lick. Licks come in bouts of many contacts, so counting **bout starts** is what makes this a count of "the mouse responded" rather than a count of tongue contacts.

```{code-cell} ipython3
def licks_per_minute(session, bin_minutes=5):
    """Lick bouts per minute, in bins across the session."""
    events = session['nwb'].events['events'].to_dataframe()

    # event_type says what happened; lick_bouts groups consecutive licks into bouts.
    is_bout_start = (events['event_type'] == 'lick') & (events['lick_bouts'] == 'bout_start')
    bout_starts = events.loc[is_bout_start, 'timestamp'].values

    session_end = session['trials']['stop_time'].max()
    edges = np.arange(0, session_end + bin_minutes * 60, bin_minutes * 60)
    counts, _ = np.histogram(bout_starts, bins=edges)

    return edges[:-1] / 60, counts / bin_minutes


# What goes in: individual lick events, most of them inside a bout.
novel_events = novel['nwb'].events['events'].to_dataframe()
print(novel_events.loc[novel_events['event_type'] == 'lick',
                       ['timestamp', 'lick_bouts', 'lick_classification']].head(4).to_string())
print()
print('lick events by bout position:')
print(novel_events.loc[novel_events['event_type'] == 'lick', 'lick_bouts']
      .value_counts().to_string())
print()

# What comes out: one rate per 5-minute bin.
for name, session in [('novel', novel), ('extinction', extinction)]:
    minutes, lick_rate = licks_per_minute(session)
    print(f'{name:<11} first six bins (bouts/min):', np.round(lick_rate[:6], 1))
```

Both of those, plotted across the session.

```{code-cell} ipython3
session_colors = {'novel (OPHYS_4)': '#559ECB', 'extinction (OPHYS_6)': '#C44E52'}

fig, axes = plt.subplots(1, 2, figsize=(14, 4.5))

for session, label in [(novel, 'novel (OPHYS_4)'), (extinction, 'extinction (OPHYS_6)')]:
    color = session_colors[label]

    hit_rate = hit_rate_over_session(session)
    axes[0].plot(np.arange(len(hit_rate)) + 1, hit_rate, marker='o',
                 color=color, linewidth=2, label=label)

    minutes, lick_rate = licks_per_minute(session)
    axes[1].plot(minutes, lick_rate, color=color, linewidth=2, label=label)

axes[0].set_xlabel('Block of 25 go trials')
axes[0].set_ylabel('Hit rate')
axes[0].set_ylim(0, 1)
axes[0].set_title('Responding to image changes')

axes[1].set_xlabel('Time from session start (min)')
axes[1].set_ylabel('Lick bouts per minute')
axes[1].set_title('Licking')

for ax in axes:
    ax.legend(frameon=False, fontsize=12)
fig.tight_layout()
plt.show()

# The same thing as numbers: the whole session, and just its first block of go trials.
for session, label in [(novel, 'novel'), (extinction, 'extinction')]:
    trials = session['trials']
    hit_rate = hit_rate_over_session(session)
    print(f"{label:<11} {int(trials['hit'].sum()):>4} hits / {int(trials['go'].sum()):>4} go "
          f"trials  ({trials.loc[trials['go'], 'hit'].mean():>4.0%} overall, "
          f"{hit_rate[0]:.0%} in the first block)")
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

The two sessions could hardly look more different, but read the shapes rather than just the gap
between them.

The **novel** session is the normal arc of a rewarded session: the mouse hits nearly every change
for the first eighty or so go trials, then responding falls away over the second half as it drinks
its fill and disengages. That decline is satiation, and it is present in every rewarded session.

The **extinction** session never has a high phase to decline from. Responding sits at a few percent
from the very first block — in this mouse the first twenty go trials in a row are misses — and stays
there for the rest of a session that runs half again as many trials. Licking is a few bouts per
minute throughout, against ten to fifteen in the novel session.

So in this mouse the association is already extinguished by the time the first `OPHYS_6` session
gets going, rather than visibly decaying within it. Low performance here is the phenomenon the
session type exists to capture, not a data quality problem: the mouse is water restricted and the
apparatus is unchanged, and it stops working because the contingency is gone.

Worth carrying forward into the neural comparison: the mouse is not just unrewarded in the second
session, it is also **doing much less** — fewer licks, less reward consumption, probably less
arousal. That is a real difference between the two days and not something the neuron matching can
remove.

<b>A note on rewards in <code>OPHYS_6</code>.</b> The events table of an extinction session lists a
small number of `reward` events. **No water was actually delivered.** The behavior control software
logs a reward whenever it triggers the solenoid, and during `OPHYS_6` sessions the water valve is
turned off — so the log records the trigger, not a delivery. This will be corrected in the metadata
and the NWB files in the next data release. Until then, treat any reward recorded in an `OPHYS_6`
session as not delivered.

</div>

+++

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h2>Part 3: The alignment helpers</h2>

These are the three functions built in the previous notebook, unchanged: convert a time to the
nearest imaging frame, drop the events without a full window inside every plane's recording, and cut
baseline-subtracted windows around the rest. They are reproduced here so this notebook runs on its
own; see the previous one for why each does what it does.

</div>

```{code-cell} ipython3
def nearest_frame(timestamps, wanted_times):
    """Index of the imaging frame closest in time to each wanted time.

    timestamps   : this plane's frame times, in seconds, increasing
    wanted_times : the times we want frames for, in seconds

    Why "closest" and not "the first frame at or after": np.searchsorted returns the
    first frame at or AFTER the wanted time, so on average every sample comes from half
    a frame later than intended. At ~10 Hz that is ~50 ms of systematic shift -- enough
    to make a response look like it begins slightly BEFORE the event. So we look at the
    frame on either side of each wanted time and keep whichever is nearer.
    """
    # Step 1: the first frame at or after each wanted time.
    frame_after = np.searchsorted(timestamps, wanted_times)

    # Step 2: keep the index in range, so wanted times outside the recording clamp to
    # the first or last frame instead of indexing off the end of the array.
    frame_after = np.clip(frame_after, 1, len(timestamps) - 1)

    # Step 3: the frame just before it. These two bracket the wanted time.
    frame_before = frame_after - 1

    # Step 4: how far each candidate is from the time we asked for.
    gap_after = np.abs(timestamps[frame_after] - wanted_times)
    gap_before = np.abs(timestamps[frame_before] - wanted_times)

    # Step 5: take the nearer of the two, elementwise.
    return np.where(gap_after < gap_before, frame_after, frame_before)
```

```{code-cell} ipython3
def usable_event_times(event_times, session, window):
    """The event times that fall far enough inside EVERY plane's recording.

    event_times : the times we would like to align to, in seconds
    session     : a session dictionary from load_session
    window      : the peri-event window, in seconds relative to the event

    Because each plane starts and stops at a slightly different time, an event has to be
    usable in every plane: hence the LATEST start and the EARLIEST stop across planes.
    """
    timestamps = session['timestamps']

    latest_start = max(timestamps[plane][0] for plane in session['plane_names'])
    earliest_stop = min(timestamps[plane][-1] for plane in session['plane_names'])

    # window[0] is negative (time before the event) and window[-1] is positive, so an
    # event is usable if it sits at least |window[0]| after the latest start and at
    # least window[-1] before the earliest stop.
    event_times = np.asarray(event_times)
    starts_late_enough = event_times > latest_start - window[0]
    ends_early_enough = event_times < earliest_stop - window[-1]

    return event_times[starts_late_enough & ends_early_enough]
```

```{code-cell} ipython3
def align_to_events(session, event_times, window):
    """Baseline-subtracted activity around each event.

    session     : a session dictionary from load_session
    event_times : the usable event times, in seconds
    window      : offsets from the event, in seconds (e.g. -2 to +4 in 0.1 s steps)

    Returns (n_events, n_window_samples, ALL segmented ROIs). The neuron axis is the
    same width as session['dff'], so `column_in_dff` indexes this result exactly as it
    indexes the raw traces -- there is only ever ONE column numbering. Columns for ROIs
    we are not analyzing stay zero and are never read.
    """
    dff_all = session['dff']
    neuron_columns = session['rois']['column_in_dff'].values
    neuron_planes = session['rois']['plane'].values

    aligned = np.zeros((len(event_times), len(window), dff_all.shape[1]))

    # One plane at a time: a plane's frame times are its own, so an event time maps to
    # a different frame index in each plane.
    for plane in session['plane_names']:
        # Which of our neurons are in this plane, and which columns are they?
        columns_here = neuron_columns[neuron_planes == plane]
        if len(columns_here) == 0:
            continue

        # This plane's neurons, pulled out of the big matrix once rather than inside the
        # loop below: (frames, neurons in this plane). And this plane's own clock.
        plane_dff = dff_all[:, columns_here]
        plane_timestamps = session['timestamps'][plane]

        # One event at a time. For each event we ask "which frames are the window
        # samples?" and copy those rows out of the activity matrix.
        for event_index, event_time in enumerate(event_times):
            frames = nearest_frame(plane_timestamps, event_time + window)

            # (window samples, neurons in this plane) for this one event.
            cut = plane_dff[frames]

            # Subtract THIS window's own pre-event baseline, so a neuron that happens to
            # be more active later in the session does not show up as a response.
            baseline = cut[window < 0].mean(axis=0)

            aligned[event_index][:, columns_here] = cut - baseline

    return aligned
```

```{code-cell} ipython3
def event_response(session, event_times, window):
    """The two summaries of the aligned array that every plot below uses.

    Returns (mean_time_course, response_per_event):

    - mean_time_course   : (window, neurons) -- averaged over EVENTS
    - response_per_event : (events, neurons) -- averaged over the first second AFTER
                           the event, i.e. one number per event per neuron

    Both keep the full neuron axis, so the same column_in_dff selects a neuron in the
    raw traces, in the mean time course, and in the per-event responses.
    """
    aligned = align_to_events(session, event_times, window)

    mean_time_course = aligned.mean(axis=0)

    in_response_window = (window >= 0) & (window <= 1)
    response_per_event = aligned[:, in_response_window, :].mean(axis=1)

    print(f'{len(event_times)} events  |  aligned {aligned.shape} '
          '(events, window, all ROIs)')
    print('  mean_time_course   (window, neurons):', mean_time_course.shape)
    print('  response_per_event (events, neurons):', response_per_event.shape)

    # Both summaries are derived, so the full array -- the largest object here -- can go.
    del aligned
    gc.collect()

    return mean_time_course, response_per_event
```

Where the two kinds of event time come from, before aligning anything: changes are a column of the trials table, omissions are rows of the stimulus table.

```{code-cell} ipython3
# The peri-event window used everywhere here: -2 s to +4 s at 100 ms.
window = np.arange(-2, 4, 0.1)

event_times = {}
for name, session in [('novel', novel), ('extinction', extinction)]:
    stimulus = session['stimulus']
    event_times[name] = {
        'change': session['trials']['change_time'].dropna().values,
        'omission': stimulus.loc[stimulus['omitted'], 'start_time'].values,
    }

# How many of each, and how many survive the edge check for this window.
counts = []
for name in event_times:
    for event_type, times in event_times[name].items():
        usable = usable_event_times(times, novel if name == 'novel' else extinction, window)
        counts.append({'session': name, 'event': event_type,
                       'in the table': len(times), 'usable': len(usable),
                       'first (s)': round(times.min(), 1), 'last (s)': round(times.max(), 1)})

pd.DataFrame(counts)
```

Now align. Four calls in a loop, each returning the mean time course and the per-event responses.

```{code-cell} ipython3


change_aligned = {}
response_per_change = {}
omission_aligned = {}
n_events = {}

for name, session in [('novel', novel), ('extinction', extinction)]:
    print(name, 'changes:')
    change_times = usable_event_times(event_times[name]['change'], session, window)
    change_aligned[name], response_per_change[name] = event_response(
        session, change_times, window)

    print(name, 'omissions:')
    omission_times = usable_event_times(event_times[name]['omission'], session, window)
    omission_aligned[name], _ = event_response(session, omission_times, window)

    n_events[name] = {'change': len(change_times), 'omission': len(omission_times)}
    print()
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

Four arrays, and the thing to notice is the **last axis**: 561 for the novel session, 605 for the
extinction session. Each aligned array is as wide as its own session's activity matrix, so a column
number from one session is meaningless in the other. Everything below goes through
`unique_roicat_id` for exactly that reason.

</div>

```{code-cell} ipython3
for name, session in [('novel', novel), ('extinction', extinction)]:
    print(f"{name:<11} dff {session['dff'].shape}"
          f"  change_aligned {change_aligned[name].shape}"
          f"  omission_aligned {omission_aligned[name].shape}")
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h2>Part 4: Matching neurons across sessions</h2>

This is what `unique_roicat_id` is for. Recall the two ID scopes from the first notebook:

- `unique_roi_id` names **one ROI mask, in one plane, in one session**
- `unique_roicat_id` names **the neuron**, and is stable across all sessions of this mouse

Note that this matching does not involve the HCR data at all: the cross-session tracking is done by
ROICaT on the imaging data alone. The cell type comes along for the ride, because the same
coregistration row carries both identifiers.

Both sessions were already subset to soma + coregistered ROIs, so every row of `rois` has a
`unique_roicat_id`. Take the neurons present in both by intersecting the two sets.

We intersect the ids rather than trusting the `matched` column, because intersecting answers the
question we actually have — *is this neuron in **these two** sessions?* — whereas `matched` says only
that the pipeline tracked it across some sessions.

One caveat: because the soma filter is applied **per session**, a neuron classified as a soma on one
day but not the other drops out of this intersection. For a single pair of sessions that is a small
effect, but across many sessions it compounds — which is when deciding `is_soma` once per neuron
starts to matter.

</div>

```{code-cell} ipython3
neurons_in_novel = set(novel['rois']['unique_roicat_id'].dropna())
neurons_in_extinction = set(extinction['rois']['unique_roicat_id'].dropna())

matched_neuron_ids = sorted(neurons_in_novel & neurons_in_extinction)

print(len(neurons_in_novel), 'coregistered neurons in the novel session')
print(len(neurons_in_extinction), 'coregistered neurons in the extinction session')
print(len(matched_neuron_ids), 'in both')
```

What a match actually is: the same `unique_roicat_id`, one row in each session, with different ROI names and different column numbers.

```{code-cell} ipython3
one_matched_id = matched_neuron_ids[0]

pd.concat([
    novel['rois'].loc[novel['rois']['unique_roicat_id'] == one_matched_id].assign(session='novel'),
    extinction['rois'].loc[extinction['rois']['unique_roicat_id'] == one_matched_id]
        .assign(session='extinction'),
])[['session', 'unique_roicat_id', 'roi_id', 'column_in_dff', 'plane', 'hcr_id', 'subclass']]
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

Three counts describing a set overlap are easier to judge as a picture. One bar, split into the
neurons found only in the novel session, those found in both, and those found only in the extinction
session. The middle segment is every neuron the rest of this notebook can use.

</div>

```{code-cell} ipython3
novel_only = len(neurons_in_novel - neurons_in_extinction)
in_both = len(matched_neuron_ids)
extinction_only = len(neurons_in_extinction - neurons_in_novel)

fig, ax = plt.subplots(figsize=(11, 2.4))

# Stack the three segments left to right by keeping a running left edge.
segment_start = 0
for count, label, color in [(novel_only, 'novel only', '#4C72B0'),
                            (in_both, 'in both', '#55A868'),
                            (extinction_only, 'extinction only', '#C44E52')]:
    ax.barh(0, count, left=segment_start, color=color, edgecolor='white')
    ax.text(segment_start + count / 2, 0, f'{label}\n{count}',
            ha='center', va='center', color='white', fontsize=12)
    segment_start = segment_start + count

ax.set_yticks([])
ax.set_xlim(0, segment_start)
ax.set_xlabel('Coregistered neurons')
ax.set_title('Neurons in the novel session, the extinction session, and both')
fig.tight_layout()
plt.show()
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

Now build the lookup: for each matched neuron, which **column of that session's activity matrix**
does it occupy? Those are the `column_in_dff` values both ROI tables have carried since they were
built, and they index `novel['dff']` and `extinction['dff']` respectively — as well as everything
derived from them, since the aligned arrays kept the same neuron axis.

Setting `unique_roicat_id` as the index and then selecting `matched_neuron_ids` guarantees both
tables come out in the *same order*, so row *i* of one is the same neuron as row *i* of the other.
Getting this wrong is the easiest way to produce a completely meaningless result that looks fine.

</div>

```{code-cell} ipython3
novel_matched = novel['rois'].set_index('unique_roicat_id').loc[matched_neuron_ids]
extinction_matched = extinction['rois'].set_index('unique_roicat_id').loc[matched_neuron_ids]

# The two tables now describe the same neurons in the same order. Check it, don't assume.
print('same length:', len(novel_matched) == len(extinction_matched))
print('same order  :', (novel_matched.index == extinction_matched.index).all())
print()
print('first four matched neurons, in each session:')
print(pd.DataFrame({'novel_column': novel_matched['column_in_dff'].values[:4],
                    'extinction_column': extinction_matched['column_in_dff'].values[:4],
                    'novel_roi_id': novel_matched['roi_id'].values[:4],
                    'extinction_roi_id': extinction_matched['roi_id'].values[:4]},
                   index=matched_neuron_ids[:4]).to_string())
```

Those two column arrays are the whole point: one per session, lined up row for row. Put them in one table with the cell type alongside.

```{code-cell} ipython3
# One row per matched neuron. The two column numbers come from each session's own ROI
# table, so novel_column indexes novel['dff'] and extinction_column indexes
# extinction['dff']. They are different numbers for the same neuron -- see the check below.
matched_neurons = pd.DataFrame({
    'unique_roicat_id': matched_neuron_ids,
    'novel_column': novel_matched['column_in_dff'].values,
    'extinction_column': extinction_matched['column_in_dff'].values,
    'novel_plane': novel_matched['plane'].values,
    'extinction_plane': extinction_matched['plane'].values,
    'hcr_id': novel_matched['hcr_id'].values,
    'subclass': novel_matched['subclass'].values,
})

# The same physical neuron must map to the same HCR cell in both sessions -- check, don't assume.
same_hcr_id = (novel_matched['hcr_id'].values == extinction_matched['hcr_id'].values)
print(f'{same_hcr_id.sum()} of {len(matched_neurons)} matched neurons agree on hcr_id')

print(matched_neurons['subclass'].value_counts(dropna=False).to_string())
matched_neurons.head()
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h3>Two checks worth running</h3>

The `hcr_id` agreement above should be 100%: `unique_roicat_id` and `hcr_id` are both properties of
the *neuron*, not of the session, so two rows describing the same neuron must carry the same HCR
cell. Any disagreement means the coregistration is inconsistent between the two sessions, and those
neurons should be dropped.

Two more. First, a matched neuron should be in the **same imaging plane** in both sessions — the
mesoscope targets the same depths each day, so a neuron jumping planes would mean the match is
wrong. Second, matched neurons should almost never share a **column index**.

</div>

```{code-cell} ipython3
same_plane = matched_neurons['novel_plane'] == matched_neurons['extinction_plane']
same_column = matched_neurons['novel_column'] == matched_neurons['extinction_column']

print(f'{same_plane.sum()} of {len(matched_neurons)} matched neurons are in the same plane')
print(f'{same_column.sum()} of {len(matched_neurons)} matched neurons have the same column index')
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

Almost none of them share a column index, and that is exactly why `unique_roicat_id` exists.
Segmentation runs independently on each session, so it finds a slightly different set of ROI masks
in a different order every day. Column 17 in the novel session is **not** the same neuron as column
17 in the extinction session.

If you ever compare two sessions by row position, this is the number that tells you the result is
meaningless.

</div>

+++

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h2>Part 5: Does a neuron respond consistently across days?</h2>

Before asking how extinction changed anything, check that a neuron's response is a stable property
of that neuron at all. `response_per_change` gives one number per neuron per change — the mean
response in the first second after it — so average over changes and correlate across the matched
pairs.

The shuffled control is what makes this interpretable: if the pairing were arbitrary, the
correlation should collapse to nothing.

</div>

```{code-cell} ipython3
# Two averaging steps, done separately so the shapes are visible.
novel_mean = response_per_change['novel'].mean(axis=0)            # (all ROIs,)
extinction_mean = response_per_change['extinction'].mean(axis=0)  # (all ROIs,)

print('response_per_change  (changes, all ROIs):', response_per_change['novel'].shape)
print('  mean over changes  (all ROIs,)        :', novel_mean.shape)

# Then pick out the matched neurons, using each session's own column numbers.
novel_response = novel_mean[matched_neurons['novel_column'].values]
extinction_response = extinction_mean[matched_neurons['extinction_column'].values]

print('  the matched subset (matched neurons,) :', novel_response.shape)
print()

print('the first five matched neurons:')
print(pd.DataFrame({'novel': novel_response[:5].round(4),
                    'extinction': extinction_response[:5].round(4),
                    'subclass': matched_neurons['subclass'].values[:5]},
                   index=matched_neurons['unique_roicat_id'][:5]).to_string())
```

One number per neuron per session is all the scatter below needs. Correlate them, then shuffle one side to see what the same plot looks like when the pairing is wrong.

```{code-cell} ipython3
r_matched = np.corrcoef(novel_response, extinction_response)[0, 1]

# What would we get if the pairing were wrong? Shuffle one side.
shuffled = np.random.default_rng(0).permutation(extinction_response)
r_shuffled = np.corrcoef(novel_response, shuffled)[0, 1]

print(f'{len(novel_response)} matched neurons')
print(f'correctly paired: r = {r_matched:.2f}')
print(f'shuffled pairing: r = {r_shuffled:.2f}')
```

```{code-cell} ipython3
fig, ax = plt.subplots(figsize=(6.5, 6.5))

# Untyped neurons in grey behind, so the typed ones are readable on top.
is_untyped = matched_neurons['subclass'].isna().values
ax.scatter(novel_response[is_untyped], extinction_response[is_untyped],
           color='lightgray', s=18, label=f'no cell type (n={is_untyped.sum()})')

for name in subclass_order:
    is_subclass = (matched_neurons['subclass'] == name).values
    ax.scatter(novel_response[is_subclass], extinction_response[is_subclass],
               color=subclass_colors[name], s=45, label=f'{name} (n={is_subclass.sum()})')

# Square axes covering ALL the data, with a small margin. Derive the limits rather than
# hardcoding them: a fixed range silently clips whichever neurons fall outside it, and a
# clipped scatter looks exactly like a complete one.
low = min(novel_response.min(), extinction_response.min())
high = max(novel_response.max(), extinction_response.max())
margin = 0.05 * (high - low)
axis_limits = [low - margin, high + margin]

# Unity line: points above it responded more during extinction, below more when novel.
ax.plot(axis_limits, axis_limits, color='gray', linestyle='--', linewidth=1)

ax.set_xlim(axis_limits)
ax.set_ylim(axis_limits)
ax.set_aspect('equal')
ax.set_xlabel('Novel images (OPHYS_4)')
ax.set_ylabel('Extinction (OPHYS_6)')
ax.set_title(f'Change response of {len(matched_neurons)} matched neurons\nr = {r_matched:.2f}')
ax.legend(frameon=False, fontsize=11)
plt.show()
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

A high correlation with a near-zero shuffled control tells us two things:

1. The matching is real. Random pairings give nothing.
2. How strongly a neuron responds to a change is a **stable property of that neuron**, holding up
   across a two-day gap and the removal of the reward.

The unity line is where the comparison starts: a systematic shift of the cloud to one side of it
would be a population-level effect of extinction, and the next section asks whether such a shift
differs by cell type.

</div>

+++

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h2>Part 6: Novel versus extinction, by cell type</h2>

Now the two sessions on the same axes, using **only the matched neurons**, so any difference cannot
be caused by a different set of cells being measured. Solid is the novel session, dashed is
extinction, one column per cell type.

Both alignments are shown, on shared axes: change-aligned on top, omission-aligned below. The
shading needs to change with the alignment — on an omission-aligned axis the flash at time 0 is the
one that never happened, so `shade_omission` leaves it blank and the dashed line marks where the
missing flash would have been.

</div>

```{code-cell} ipython3
def stimulus_spans(stimulus_presentations, window):
    """Where to shade: a list of (start, stop, is_aligned_event) in seconds.

    Read off the stimulus table itself rather than hardcoded, so the same function works
    for gratings held on screen for seconds and for images flashed several times a second.
    """
    # How long one presentation lasts, and how often a new one starts. Medians, because
    # a few presentations at the very start or end of a session can be irregular.
    durations = stimulus_presentations['stop_time'] - stimulus_presentations['start_time']
    duration = np.median(durations)
    interval = np.median(np.diff(stimulus_presentations['start_time']))

    # Is there room for a second presentation inside the plotted window? If not, the
    # stimulus is held on screen and only the aligned event itself is shaded.
    if interval > window[-1] - window[0]:
        return [(0, duration, True)]

    # Flashed stimulus: a regular train of onsets across the window. Build the train,
    # then slide it so that one onset sits exactly at time 0, which is the event.
    onsets = np.arange(window[0], window[-1], interval)
    onsets = onsets - onsets[np.argmin(np.abs(onsets))]

    # The flash at time 0 is the event we aligned to; the rest are its neighbours.
    return [(onset, onset + duration, abs(onset) < 0.01) for onset in onsets]
```

What it returns for these sessions: a whole train of flashes, because an image is on screen for 250 ms every 750 ms.

```{code-cell} ipython3
spans = stimulus_spans(novel['stimulus'], window)

print(f'{len(spans)} spans to shade across the window. The first four:')
for start, stop, is_event in spans[:4]:
    print(f'   {start:+.2f} to {stop:+.2f} s   aligned event: {is_event}')
```

The two drawing halves. On a change-aligned axis the flash at time 0 is the change, so it is shaded blue; on an omission-aligned axis that flash never happened, so it is left blank.

```{code-cell} ipython3
def shade_stimulus(ax, stimulus_presentations, window):
    """Shade the flashes on a change-aligned axis: the change blue, the repeats grey."""
    for start, stop, is_change in stimulus_spans(stimulus_presentations, window):
        shade_color = '#4C8FCC' if is_change else '#D9D9D9'
        ax.axvspan(start, stop, color=shade_color, alpha=0.30, linewidth=0)

    ax.axvline(0, color='#2C5F8A', linestyle='--', linewidth=1)


def shade_omission(ax, stimulus_presentations, window):
    """Shade the flashes on an omission-aligned axis, leaving time 0 blank.

    stimulus_spans marks the presentation at time 0 as the aligned-to event. Here that
    flash was omitted, so we skip its span instead of shading it.
    """
    for start, stop, is_aligned_event in stimulus_spans(stimulus_presentations, window):
        if is_aligned_event:
            continue
        ax.axvspan(start, stop, color='#D9D9D9', alpha=0.30, linewidth=0)

    ax.axvline(0, color='#2C5F8A', linestyle='--', linewidth=1)
```

The averaging in every panel below is these two lines, so pull them out where they can be seen — and check what they give for one cell type before plotting sixteen panels of them.

```{code-cell} ipython3
def mean_trace(aligned, columns):
    """Mean across a set of neurons, and the standard error of that mean.

    aligned : (window samples, neurons) -- e.g. a change_aligned array
    columns : which columns to average over

    Returns two (window samples,) arrays.
    """
    traces = aligned[:, columns]
    return traces.mean(axis=1), traces.std(axis=1) / np.sqrt(len(columns))


# Vip neurons, change-aligned, in each session.
is_vip = (matched_neurons['subclass'] == 'Vip').values
print(f'{is_vip.sum()} matched Vip neurons')

for name, column_name in [('novel', 'novel_column'), ('extinction', 'extinction_column')]:
    columns = matched_neurons[column_name][is_vip]
    mean, standard_error = mean_trace(change_aligned[name], columns)
    print(f'  {name:<11} peak {mean.max():+.4f} dF/F at {window[np.argmax(mean)]:+.1f} s')
```

All four cell types, both alignments, both sessions.

```{code-cell} ipython3
fig, axes = plt.subplots(2, len(subclass_order), figsize=(20, 8),
                         sharey=True, sharex=True)

# One row per alignment: the aligned arrays to plot, how to shade, and the x label.
alignments = [
    {'aligned': change_aligned, 'shade': shade_stimulus, 'event': 'change'},
    {'aligned': omission_aligned, 'shade': shade_omission, 'event': 'omission'},
]

for row, alignment in enumerate(alignments):
    for ax, name in zip(axes[row], subclass_order):
        is_subclass = (matched_neurons['subclass'] == name).values

        # The same neurons in both rows and both sessions -- only the alignment differs.
        novel_columns = matched_neurons['novel_column'][is_subclass]
        extinction_columns = matched_neurons['extinction_column'][is_subclass]

        novel_trace, novel_error = mean_trace(alignment['aligned']['novel'], novel_columns)
        extinction_trace, extinction_error = mean_trace(
            alignment['aligned']['extinction'], extinction_columns)

        n_novel = n_events['novel'][alignment['event']]
        n_extinction = n_events['extinction'][alignment['event']]

        ax.plot(window, novel_trace, color=subclass_colors[name], linewidth=2,
                label=f'novel, {n_novel} events')
        ax.fill_between(window, novel_trace - novel_error, novel_trace + novel_error,
                        color=subclass_colors[name], alpha=0.15)
        ax.plot(window, extinction_trace, color=subclass_colors[name], linestyle='--',
                linewidth=2, label=f'extinction, {n_extinction} events')
        ax.fill_between(window, extinction_trace - extinction_error,
                        extinction_trace + extinction_error,
                        color=subclass_colors[name], alpha=0.15)

        alignment['shade'](ax, novel['stimulus'], window)
        ax.axhline(0, color='gray', linewidth=0.5)
        ax.set_xlabel(f"Time from {alignment['event']} (s)")

        # Same two lines in every panel of a row, so one legend per row is enough.
        if ax is axes[row][0]:
            ax.legend(frameon=False, fontsize=11)

        if row == 0:
            ax.set_title(f'{name} (n={is_subclass.sum()})')

axes[0][0].set_ylabel(r'$\Delta$F/F change' + '\nchange-aligned')
axes[1][0].set_ylabel(r'$\Delta$F/F change' + '\nomission-aligned')
fig.suptitle('Matched neurons: novel (solid) vs extinction (dashed)')
fig.tight_layout()
plt.show()
```

The same comparison as numbers: the mean change response per cell type in each session.

```{code-cell} ipython3
matched_summary = pd.DataFrame({'novel': novel_response,
                                'extinction': extinction_response,
                                'subclass': matched_neurons['subclass'].values})

# One step at a time: group by cell type, then summarise the two response columns.
responses_by_subclass = matched_summary.groupby('subclass', observed=True)
response_summary = responses_by_subclass[['novel', 'extinction']].agg(['count', 'mean'])

response_summary.round(4)
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

Read this table with the sample sizes in mind. Some subclasses have only a handful of matched
neurons in one pair of sessions, which is not enough to conclude anything about that cell type. The
way to make such a comparison convincing is to repeat it over many session pairs and many mice,
which is what the full dataset supports.

There is also a confound worth naming, because it is intrinsic to this comparison rather than a flaw
in the analysis: the mouse **behaves differently** in the two sessions. It licks far less during
extinction, so any difference in the traces after about a second could be the absence of licking and
reward consumption rather than a change in visual processing. Differences in the first few hundred
milliseconds are the safer ones to interpret, and the omission row is useful here precisely because
there is nothing to lick for at an omission in either session.

</div>

+++

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h2>Part 7: One neuron, two sessions, one transcriptome</h2>

The plot that shows what all this ID-matching bought us: the same physical neuron, recorded on two
days under two different reward contingencies, with its cell type and its measured gene expression —
three separate measurements resolved to one cell.

</div>

```{code-cell} ipython3
# Pick the most strongly responding typed neuron, so the traces are legible.
has_subclass = matched_neurons['subclass'].notna().values

typed_positions = np.where(has_subclass)[0]
example_index = typed_positions[int(np.argmax(novel_response[has_subclass]))]
example_neuron = matched_neurons.iloc[example_index]

print(example_neuron['unique_roicat_id'], '|', example_neuron['subclass'],
      '| hcr_id', int(example_neuron['hcr_id']))
print('novel     : plane', example_neuron['novel_plane'],
      'column', example_neuron['novel_column'])
print('extinction: plane', example_neuron['extinction_plane'],
      'column', example_neuron['extinction_column'])
```

Its transcriptomic side: the genes this cell expressed most strongly, read straight out of the AnnData by `hcr_id`.

```{code-cell} ipython3
# One row of the AnnData: this cell's normalized expression for every probe.
example_cell = adata[str(int(example_neuron['hcr_id']))]
expression_values = np.asarray(example_cell.layers['normalized']).ravel()

example_expression = pd.Series(expression_values, index=adata.var['gene'].values)

print('the gene panel for this mouse:', len(example_expression), 'probes')
print()
print('top genes:')
print(example_expression.sort_values(ascending=False).head(6).round(2).to_string())
```

The same numbers as a picture: the whole panel for this one cell, with its subclass marker gene highlighted.

```{code-cell} ipython3
sorted_expression = example_expression.sort_values(ascending=False)

fig, ax = plt.subplots(figsize=(13, 4))
bar_colors = ['#D93137' if gene == example_neuron['subclass'] else '#9DA5B4'
              for gene in sorted_expression.index]
ax.bar(np.arange(len(sorted_expression)), sorted_expression.values, color=bar_colors)

ax.set_xticks(np.arange(len(sorted_expression)))
ax.set_xticklabels(sorted_expression.index, rotation=90, style='italic')
ax.set_ylabel('normalized expression')
ax.set_title(f"hcr_id {int(example_neuron['hcr_id'])}: labelled "
             f"{example_neuron['subclass']} (its marker gene in red)")
fig.tight_layout()
plt.show()
```

Left panel: the whole session, on that session's own clock for this neuron's plane. Right panel: the same neuron's change-aligned mean, one line per session.

```{code-cell} ipython3
# One entry per session: everything the two panels need for that session's trace.
sessions_to_plot = [
    {'session': novel, 'aligned': change_aligned['novel'],
     'column': example_neuron['novel_column'],
     'label': f"novel (B) -- {novel_session['session_date']}", 'linestyle': '-'},
    {'session': extinction, 'aligned': change_aligned['extinction'],
     'column': example_neuron['extinction_column'],
     'label': f"extinction (B) -- {extinction_session['session_date']}", 'linestyle': '--'},
]

fig, axes = plt.subplots(1, 2, figsize=(14, 4.5))

for entry in sessions_to_plot:
    session = entry['session']
    column = entry['column']

    # This neuron's own plane, so we use the right clock for the whole-session trace.
    plane = session['roi_table']['plane'][column]
    time = session['timestamps'][plane]

    axes[0].plot(time / 60, session['dff'][:, column], linewidth=0.4, label=entry['label'])
    axes[1].plot(window, entry['aligned'][:, column], color='black',
                 linestyle=entry['linestyle'], linewidth=2, label=entry['label'])

axes[0].set_xlabel('Time from session start (min)')
axes[0].set_ylabel(r'$\Delta$F/F')
axes[0].set_title('Whole session')
axes[0].legend(frameon=False, fontsize=11)

shade_stimulus(axes[1], novel['stimulus'], window)
axes[1].set_xlabel('Time from change (s)')
axes[1].set_title('Change-aligned')
axes[1].legend(frameon=False, fontsize=11)

fig.suptitle(f"One {example_neuron['subclass']} neuron "
             f"(hcr_id {int(example_neuron['hcr_id'])}), two sessions")
fig.tight_layout()
plt.show()
```

<div style="border-left: 3px solid #000; padding: 1px; padding-left: 10px; background: #F0FAFF; ">

<h2>Where to go next</h2>

- **Follow neurons through the whole curriculum.** The `unique_roicat_id` intersection generalizes to
  any number of sessions. Intersect across all of them to get the neurons tracked from naive to
  expert, and watch their responses change. Decide `is_soma` once per neuron rather than per session
  before you do.
- **Separate novelty from reward.** Add `OPHYS_1_images_A` to make it a three-way comparison:
  familiar-and-rewarded, novel-and-rewarded, novel-and-unrewarded. Set A and set B are disjoint, so
  only the second pair holds the images constant — which is why this notebook uses it.
- **Find the session where extinction actually happens.** This mouse arrives at its first `OPHYS_6`
  session already not responding, so the unlearning is not visible inside it. Run the Part 2
  behavior panel across mice and across both `OPHYS_6` sessions to find one that starts high and
  decays — then splitting that session into early and late blocks of trials and aligning each
  separately asks the learning question without any cross-session matching at all.
- **Control for the behavior.** The mouse licks in one session and not the other. Restricting both
  sessions to `miss` trials, where the mouse did not lick in either, removes most of that confound.
- **Match on more than the response magnitude.** Everything here compared one number per neuron.
  Tuning curves, reliability, and the omission response are all per-neuron quantities that can be
  correlated across sessions the same way.
- **Other mice.** `session_metadata['subject_id'].unique()` lists them; each has its own
  coregistration table and its own HCR AnnData. Pooling matched neurons across mice is what turns
  any of these demonstrations into a result.

Two cautions carried over from the earlier notebooks. Coregistered neurons are not a random sample
of segmented ROIs — they are biased toward somas and toward neurons that tracked reliably, and the
inhibitory subclasses sit at systematically different depths, so a subclass difference is partly a
depth difference. And every join here goes through `unique_roi_id` and `unique_roicat_id`; the
moment you find yourself indexing one session's array with another session's positions, stop.

</div>
