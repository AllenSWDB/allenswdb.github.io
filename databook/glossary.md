<!-- GENERATED FILE — DO NOT EDIT BY HAND.
     Produced by scripts/build-glossary-page.mjs in this repository, from
     https://github.com/AllenInstitute/allen-connectomics-glossary
     Source commit: 855c456f480bac600d71aa14bdfad1043cccd558
     Edit the definitions in that repository's data/ directory; this page is
     regenerated from it and any change made here will be overwritten. -->

# Glossary

249 terms across 19 categories, from the
[Allen Glossary](https://alleninstitute.github.io/allen-connectomics-glossary/). Search matches names, definitions, categories and dataset
names; the category legend doubles as a filter, so clicking one or more pills narrows the
list. Every term has a permalink you can paste into an email — click a term name to copy
the link to it.

:::::{raw} html
<style>
/* Allen Glossary — generated, do not edit here. Every rule is scoped to
   .acg-root so nothing leaks into the rest of the databook, and every class is
   prefixed acg- so the theme's own .card/.grid/.chip rules cannot reach in. */
.acg-root{
  --acg-sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --acg-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
  --card:#ffffff; --ink:#12161c; --muted:#55606d; --faint:#8b95a1;
  --line:#e0e5ea; --line-2:#cfd6de; --panel:#eef1f4;
  --accent:#0d7d88; --accent-ink:#0a5a63;
  --accent-soft:color-mix(in srgb, var(--accent) 10%, transparent);
  --scaffold:#7c8695; --neuron:#39424f; --dendrite:#3f6fa8; --axon:#b07a2b; --synapse:#c04a6e;
  --error:#c0392b; --ok:#2a8f57;
  --surface:var(--card); --surface-2:var(--panel);
  --border:var(--line); --border-strong:var(--line-2);
  --r:8px;
  --shadow:0 1px 2px rgba(20,24,29,.05), 0 6px 18px -12px rgba(20,24,29,.25);
  font-family:var(--acg-sans); color:var(--ink);
}
/* The databook theme stamps data-theme on <html>; honour it in both directions
   and fall back to the OS preference when it is left on auto. */
@media (prefers-color-scheme: dark){
  html:not([data-theme="light"]) .acg-root{
    --card:#141a21; --ink:#e7edf3; --muted:#97a1af; --faint:#67707e;
    --line:#232b35; --line-2:#303a46; --panel:#1a2129;
    --accent:#3cced9; --accent-ink:#86e4ec;
    --accent-soft:color-mix(in srgb, var(--accent) 14%, transparent);
    --scaffold:#8f99a8; --neuron:#c2cad6; --dendrite:#71a4dd; --axon:#d7a355; --synapse:#e2809c;
    --shadow:0 1px 2px rgba(0,0,0,.4), 0 8px 22px -14px rgba(0,0,0,.8);
  }
}
html[data-theme="dark"] .acg-root{
  --card:#141a21; --ink:#e7edf3; --muted:#97a1af; --faint:#67707e;
  --line:#232b35; --line-2:#303a46; --panel:#1a2129;
  --accent:#3cced9; --accent-ink:#86e4ec;
  --accent-soft:color-mix(in srgb, var(--accent) 14%, transparent);
  --scaffold:#8f99a8; --neuron:#c2cad6; --dendrite:#71a4dd; --axon:#d7a355; --synapse:#e2809c;
  --shadow:0 1px 2px rgba(0,0,0,.4), 0 8px 22px -14px rgba(0,0,0,.8);
}
html[data-theme="light"] .acg-root{
  --card:#ffffff; --ink:#12161c; --muted:#55606d; --faint:#8b95a1;
  --line:#e0e5ea; --line-2:#cfd6de; --panel:#eef1f4;
  --accent:#0d7d88; --accent-ink:#0a5a63;
  --scaffold:#7c8695; --neuron:#39424f; --dendrite:#3f6fa8; --axon:#b07a2b; --synapse:#c04a6e;
}

.acg-root *{box-sizing:border-box}
.acg-root [hidden]{display:none !important}
.acg-root .mono{font-family:var(--acg-mono)}

/* ── control bar ──────────────────────────────────────────────── */
.acg-bar{display:flex; align-items:center; gap:.6rem; flex-wrap:wrap; margin:0 0 .9rem}
.acg-search{flex:1 1 260px; display:flex; align-items:center; gap:.45rem; min-width:0;
  background:var(--card); border:1px solid var(--line-2); border-radius:99px; padding:.3rem .8rem}
.acg-search:focus-within{border-color:var(--accent); box-shadow:0 0 0 3px var(--accent-soft)}
.acg-search svg{width:15px; height:15px; flex:none; color:var(--faint)}
.acg-search input{flex:1; min-width:0; font:inherit; font-size:.85rem; color:var(--ink);
  background:none; border:0; outline:none; padding:0}
.acg-search input::-webkit-search-cancel-button{cursor:pointer}
.acg-count{font-family:var(--acg-mono); font-size:.68rem; color:var(--faint);
  white-space:nowrap; font-variant-numeric:tabular-nums}

/* ── legends ──────────────────────────────────────────────────── */
.acg-legends{display:flex; flex-direction:column; gap:.5rem; margin:0 0 1.1rem}
.acg-legend{font-size:.75rem; min-width:0}
.acg-legend > summary{cursor:pointer; color:var(--muted); font-family:var(--acg-mono);
  font-size:.63rem; letter-spacing:.1em; text-transform:uppercase; list-style:none}
.acg-legend > summary::-webkit-details-marker{display:none}
.acg-legend > summary::before{content:"\25B8 "; color:var(--faint)}
.acg-legend[open] > summary::before{content:"\25BE "}
.acg-legend .acg-hint{font-family:var(--acg-sans); text-transform:none; letter-spacing:0;
  font-size:.72rem; color:var(--faint)}
.acg-body{display:flex; flex-wrap:wrap; gap:.35rem; padding:.55rem 0 0 .9rem; align-items:center}
.acg-body.acg-anat{gap:.2rem .9rem}
.acg-body.acg-anat span{display:inline-flex; align-items:center; gap:.35rem;
  color:var(--muted); font-size:.72rem}
.acg-body.acg-anat i{width:9px; height:9px; border-radius:99px; flex:none}
.acg-caveat{margin:.55rem 0 0 .9rem; font-size:.72rem; line-height:1.45; color:var(--faint); max-width:70ch}

.acg-pillgroup{display:flex; flex-wrap:wrap; align-items:center; gap:.3rem; width:100%}
.acg-glabel{font-family:var(--acg-mono); font-size:.58rem; letter-spacing:.1em;
  text-transform:uppercase; color:var(--faint); width:6.2rem; flex:none}
@media (max-width:640px){ .acg-glabel{width:100%} }

/* the category legend doubles as the filter — clicking a pill narrows the grid */
.acg-pill{appearance:none; font:inherit; font-size:.72rem; cursor:pointer; color:var(--muted);
  background:var(--card); border:1px solid var(--line); border-radius:99px;
  padding:.16rem .6rem .16rem .45rem; display:inline-flex; align-items:center; gap:.35rem;
  line-height:1.35}
.acg-pill i{width:9px; height:9px; border-radius:2px; flex:none; background:var(--cc)}
.acg-pill:hover{border-color:var(--line-2); color:var(--ink)}
.acg-pill[aria-pressed="true"]{border-color:var(--cc); color:var(--ink);
  background:color-mix(in srgb, var(--cc) 12%, transparent); font-weight:600}
.acg-pill .acg-n{font-family:var(--acg-mono); font-size:.6rem; color:var(--faint);
  font-variant-numeric:tabular-nums}
.acg-pill.acg-zero{opacity:.4}
.acg-clear{appearance:none; font:inherit; font-size:.68rem; cursor:pointer; background:none;
  border:0; color:var(--accent-ink); text-decoration:underline; padding:.16rem .3rem}

/* ── the grid ─────────────────────────────────────────────────── */
/* A grid, not columns: entries read left to right along each row, the order
   people expect from an alphabetical list. */
.acg-grid{display:grid; grid-template-columns:repeat(auto-fill, minmax(250px, 1fr)); gap:12px}

.acg-card{display:flex; flex-direction:column; margin:0;
  background:var(--card); border:1px solid var(--line); border-left:3px solid var(--line-2);
  border-radius:var(--r); padding:.55rem .65rem .6rem; box-shadow:var(--shadow)}
.acg-card .acg-art{background:var(--panel); border:1px solid var(--line); border-radius:5px;
  padding:3px 4px; margin-bottom:.4rem}
.acg-card .acg-art svg{display:block; width:100%; height:auto; color:var(--neuron)}
.acg-card .acg-eb{margin-top:auto; font-family:var(--acg-mono); font-size:.56rem; font-weight:700;
  letter-spacing:.09em; margin-bottom:1px}
.acg-card .acg-h{margin:0; padding:0; border:0; font-size:.92rem; font-weight:700;
  line-height:1.2; letter-spacing:-.012em; color:var(--ink)}
.acg-card .acg-name{color:inherit; text-decoration:none}
.acg-card .acg-name::after{content:"#"; color:var(--faint); font-weight:400; margin-left:.3em;
  opacity:0; font-family:var(--acg-mono); font-size:.8em}
.acg-card:hover .acg-name::after,.acg-card .acg-name:focus-visible::after{opacity:1}
.acg-card:target{outline:2px solid var(--accent); outline-offset:3px}
.acg-card .acg-def{margin:.22rem 0 0; font-size:.79rem; color:var(--muted); line-height:1.38}
.acg-card .acg-def code{font-family:var(--acg-mono); font-size:.88em; background:var(--panel);
  color:var(--ink); padding:.05em .3em; border-radius:4px; word-break:break-word; border:0}
.acg-card .acg-meta{display:flex; flex-wrap:wrap; gap:.25rem; margin-top:.42rem}

.acg-chip{display:inline-flex; align-items:center; gap:.25rem; font-family:var(--acg-mono);
  font-size:.57rem; letter-spacing:.05em; text-transform:uppercase; line-height:1.6;
  border:1px solid var(--line-2); color:var(--muted); border-radius:99px; padding:.06rem .42rem}
.acg-chip.acg-ds{border-style:dashed}
.acg-chip.acg-warn{border-color:currentColor; color:var(--axon)}
.acg-chip.acg-ng{border-color:var(--accent); color:var(--accent-ink); text-decoration:none}
.acg-chip.acg-ng:hover{background:var(--accent-soft)}
.acg-chip.acg-aside{border-style:dotted; color:var(--faint)}
.acg-chip.acg-src{border-style:dotted; color:var(--faint); text-decoration:none}
.acg-chip.acg-src:hover{color:var(--accent-ink); border-color:var(--accent)}

.acg-root mark{background:var(--accent-soft); color:inherit; border-radius:2px; padding:0 .1em}
.acg-empty{text-align:center; color:var(--faint); padding:2.5rem 0; font-size:.85rem}
.acg-foot{margin-top:1.6rem; padding-top:.7rem; border-top:1px solid var(--line);
  font-size:.72rem; line-height:1.5; color:var(--faint)}
.acg-foot a{color:var(--accent-ink)}

/* The term index is a MyST {glossary} directive, so it renders outside
   .acg-root as the theme's own <dl>, inside a sphinx-design dropdown. Both are
   styled by stylesheets the deployed site already carries — jupyter-book ships
   sphinx-design's CSS on every page regardless of whether a page uses it, and
   the pinned toolchain guarantees the same bundle. Compacted here, since this
   <style> only loads on this page. */
dl.glossary{font-size:.82rem; columns:2; column-gap:2rem; margin-top:.6rem}
dl.glossary dt{font-weight:600; break-inside:avoid; margin-top:.5rem}
dl.glossary dd{margin:.1rem 0 0; padding:0; color:#55606d; break-inside:avoid}
html[data-theme="dark"] dl.glossary dd{color:#97a1af}
@media (max-width:800px){ dl.glossary{columns:1} }
</style>

<div class="acg-root" id="acg">

  <div class="acg-bar">
    <label class="acg-search">
      <svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="7" cy="7" r="4.6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M10.4 10.4 14 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
      <input class="acg-q" type="search" placeholder="Search terms and definitions&#8230;" aria-label="Search the glossary" autocomplete="off" spellcheck="false">
    </label>
    <span class="acg-count">249 terms</span>
  </div>

  <div class="acg-legends">
    <details class="acg-legend" open>
      <summary>Category <span class="acg-hint">&#8212; the colour on a card's edge. Click to filter.</span></summary>
      <div class="acg-body">
      <div class="acg-pillgroup">
        <span class="acg-glabel">Connectomics</span>
        <button type="button" class="acg-pill" data-cat="datasets" style="--cc:#0e7f8c" aria-pressed="false"><i></i>Datasets &amp; scope<span class="acg-n">8</span></button>
        <button type="button" class="acg-pill" data-cat="imaging" style="--cc:#8a6f4a" aria-pressed="false"><i></i>Imaging &amp; ultrastructure<span class="acg-n">7</span></button>
        <button type="button" class="acg-pill" data-cat="volume" style="--cc:#2f6fd0" aria-pressed="false"><i></i>Volume, voxels &amp; coordinates<span class="acg-n">8</span></button>
        <button type="button" class="acg-pill" data-cat="segmentation" style="--cc:#6d55e0" aria-pressed="false"><i></i>Segmentation &amp; reconstruction<span class="acg-n">8</span></button>
        <button type="button" class="acg-pill" data-cat="morphology" style="--cc:#2a8f57" aria-pressed="false"><i></i>Morphology — meshes &amp; skeletons<span class="acg-n">16</span></button>
        <button type="button" class="acg-pill" data-cat="proofreading" style="--cc:#b8791a" aria-pressed="false"><i></i>Proofreading &amp; data quality<span class="acg-n">10</span></button>
        <button type="button" class="acg-pill" data-cat="cave" style="--cc:#0f766e" aria-pressed="false"><i></i>CAVE — access &amp; versioning<span class="acg-n">10</span></button>
        <button type="button" class="acg-pill" data-cat="tables" style="--cc:#9333ea" aria-pressed="false"><i></i>Annotation tables, IDs &amp; queries<span class="acg-n">8</span></button>
        <button type="button" class="acg-pill" data-cat="connectivity" style="--cc:#d1462c" aria-pressed="false"><i></i>Connectivity &amp; synapses<span class="acg-n">6</span></button>
        <button type="button" class="acg-pill" data-cat="functional" style="--cc:#9a5b12" aria-pressed="false"><i></i>Functional data &amp; coregistration<span class="acg-n">14</span></button>
        <button type="button" class="acg-pill" data-cat="tools" style="--cc:#526278" aria-pressed="false"><i></i>Visualisation tools<span class="acg-n">9</span></button>
      </div>
      <div class="acg-pillgroup">
        <span class="acg-glabel">Physiology</span>
        <button type="button" class="acg-pill" data-cat="modalities" style="--cc:#c2410c" aria-pressed="false"><i></i>Recording modalities &amp; instruments<span class="acg-n">15</span></button>
        <button type="button" class="acg-pill" data-cat="signals" style="--cc:#0369a1" aria-pressed="false"><i></i>Signals &amp; preprocessing<span class="acg-n">15</span></button>
        <button type="button" class="acg-pill" data-cat="quality" style="--cc:#4338ca" aria-pressed="false"><i></i>Quality metrics<span class="acg-n">15</span></button>
        <button type="button" class="acg-pill" data-cat="genetics" style="--cc:#15803d" aria-pressed="false"><i></i>Genetic &amp; optical tools<span class="acg-n">14</span></button>
        <button type="button" class="acg-pill" data-cat="stimuli" style="--cc:#a16207" aria-pressed="false"><i></i>Stimuli &amp; behavioural tasks<span class="acg-n">24</span></button>
        <button type="button" class="acg-pill" data-cat="responses" style="--cc:#9f1239" aria-pressed="false"><i></i>Response properties &amp; analysis<span class="acg-n">14</span></button>
        <button type="button" class="acg-pill" data-cat="dataorg" style="--cc:#3f3f46" aria-pressed="false"><i></i>Datasets, sessions &amp; files<span class="acg-n">26</span></button>
      </div>
      <div class="acg-pillgroup">
        <span class="acg-glabel">Both</span>
        <button type="button" class="acg-pill" data-cat="celltypes" style="--cc:#c9357f" aria-pressed="false"><i></i>Cell types &amp; cortical anatomy<span class="acg-n">22</span></button>
      </div>
        <button type="button" class="acg-clear" hidden>show all</button>
      </div>
    </details>
    <details class="acg-legend">
      <summary>Illustration <span class="acg-hint">&#8212; colour inside a drawing means anatomy, never category</span></summary>
      <div class="acg-body acg-anat">
        <span><i style="background:var(--scaffold)"></i>structure / volume</span>
        <span><i style="background:var(--dendrite)"></i>dendrite</span>
        <span><i style="background:var(--axon)"></i>axon</span>
        <span><i style="background:var(--synapse)"></i>synapse</span>
      </div>
      <p class="acg-caveat">The illustrations are generated rather than hand-drawn. They are being
      checked by the people who know the data, but errors cannot be ruled out at this stage &#8212;
      read them as sketches of the idea, and trust the definition over the picture.
      148 of 249 terms have one.</p>
    </details>
  </div>

  <div class="acg-grid">
    <article class="acg-card" id="term-3d-reconstruction" data-cat="segmentation" data-hay="3d reconstruction turning em imagery into 3d neuron objects (dense segmentation → meshes). segmentation &amp; reconstruction ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="rec3d"><title id="rec3d">3D reconstruction pipeline</title><rect x="16" y="58" width="76" height="74" fill="var(--scaffold)" fill-opacity=".12" stroke="currentColor" stroke-opacity=".55" stroke-width="2"/><path d="M24,74 H84 M24,88 H84 M24,102 H84 M24,116 H84" stroke="currentColor" stroke-opacity=".28" stroke-width="2" stroke-linecap="round"/><text x="54" y="150" text-anchor="middle" font-size="11" fill="var(--muted)">EM tile</text><path d="M98,95 H113" stroke="currentColor" stroke-opacity=".6" stroke-width="2" stroke-linecap="round"/><path d="M109,89 l7,6 -7,6" fill="none" stroke="currentColor" stroke-opacity=".6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polygon points="122,58 160,58 160,95 122,95" fill="var(--neuron)" fill-opacity=".6"/><polygon points="160,58 198,58 198,95 160,95" fill="var(--dendrite)" fill-opacity=".6"/><polygon points="122,95 160,95 160,132 122,132" fill="var(--axon)" fill-opacity=".6"/><polygon points="160,95 198,95 198,132 160,132" fill="var(--synapse)" fill-opacity=".6"/><path d="M160,58 V132 M122,95 H198" stroke="var(--surface)" stroke-width="1.5"/><rect x="122" y="58" width="76" height="74" fill="none" stroke="currentColor" stroke-opacity=".55" stroke-width="2"/><text x="160" y="150" text-anchor="middle" font-size="11" fill="var(--muted)">segmented</text><path d="M204,95 H219" stroke="currentColor" stroke-opacity=".6" stroke-width="2" stroke-linecap="round"/><path d="M215,89 l7,6 -7,6" fill="none" stroke="currentColor" stroke-opacity=".6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="228" y="58" width="76" height="74" fill="none" stroke="currentColor" stroke-opacity=".55" stroke-width="2"/><circle cx="266" cy="96" r="8" fill="var(--neuron)" fill-opacity=".3" stroke="var(--neuron)" stroke-width="2.2"/><path d="M266,88 C262,74 258,70 250,64 M266,88 C271,74 277,72 285,66 M266,104 C266,118 269,122 274,128 M259,93 C248,90 242,90 236,86" fill="none" stroke="var(--neuron)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><text x="266" y="150" text-anchor="middle" font-size="11" fill="var(--muted)">3D mesh</text></svg></div>
    <div class="acg-eb" style="color:#6d55e0">SEGMENT</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-3d-reconstruction" title="Link to this term">3D reconstruction</a></h3>
    <p class="acg-def">Turning EM imagery into 3D neuron objects (dense segmentation → meshes).</p>
    </article>
    <article class="acg-card" id="term-action-potential" data-cat="celltypes" data-hay="action potential a characteristic signal in excitable cell membranes: a potential-difference waveform that propagates along the membrane. in neurons it indicates activation. the trace is a hodgkin-huxley simulation: a brief current pulse opens sodium channels, which depolarise the membrane and then inactivate, while potassium conductance rises more slowly and repolarises it past rest. cell types &amp; cortical anatomy ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="ap-t"><title id="ap-t">Action potential — Hodgkin-Huxley simulation</title><g stroke="currentColor" stroke-opacity=".28" stroke-width="1" stroke-dasharray="3 3"><path d="M34,49.0 H306"/><path d="M34,88.0 H306"/></g><text x="31" y="52.0" text-anchor="end" font-size="7.5" class="mono" fill="var(--faint)">0</text><text x="31" y="91.0" text-anchor="end" font-size="7.5" class="mono" fill="var(--faint)">-65</text><text x="31" y="28.0" text-anchor="end" font-size="7.5" class="mono" fill="var(--faint)">+40</text><text x="12" y="60" font-size="8" fill="var(--muted)" transform="rotate(-90 12 60)" text-anchor="middle">mV</text><path d="M72.9,100 v6 h19.4 v-6" fill="none" stroke="var(--accent)" stroke-width="1.6"/><text x="82.6" y="116" text-anchor="middle" font-size="7.5" fill="var(--accent-ink)">stimulus</text><path d="M34.0,88.0 L72.9,88.0 L85.8,78.5 L89.5,73.5 L91.9,66.7 L93.9,56.2 L97.1,29.3 L98.1,25.7 L99.5,24.5 L102.6,26.6 L106.9,31.8 L135.2,73.8 L144.2,90.7 L148.2,94.1 L155.7,94.7 L196.6,94.0 L305.9,90.5" fill="none" stroke="var(--neuron)" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/><circle cx="99.5" cy="24.5" r="2.4" fill="var(--neuron)"/><text x="104.5" y="25.5" font-size="8" fill="var(--muted)">peak +41 mV</text><text x="159.4" y="103.7" font-size="8" fill="var(--muted)">undershoot</text><g stroke-width="1.8" fill="none"><path d="M34.0,170.0 L82.2,169.9 L91.0,168.6 L93.0,166.8 L94.4,163.2 L98.7,137.4 L100.0,133.5 L101.5,132.1 L103.7,133.6 L113.3,146.9 L121.2,155.2 L131.5,162.8 L140.5,168.4 L144.1,169.7 L305.9,170.0" stroke="var(--accent)" stroke-opacity=".85"/><path d="M34.0,169.6 L94.5,169.1 L99.6,167.4 L117.1,158.2 L123.7,156.4 L130.6,155.8 L139.5,156.7 L167.5,163.5 L194.8,166.7 L237.1,168.7 L305.9,169.5" stroke="currentColor" stroke-opacity=".45"/></g><text x="306" y="129" text-anchor="end" font-size="7.5" class="mono" fill="var(--muted)">gK</text><text x="286" y="129" text-anchor="end" font-size="7.5" class="mono" fill="var(--accent-ink)">gNa</text><text x="12" y="152" font-size="8" fill="var(--muted)" transform="rotate(-90 12 152)" text-anchor="middle">mS/cm²</text><path d="M34,170 H306" stroke="currentColor" stroke-opacity=".3" stroke-width="1"/><g font-size="7.5" fill="var(--faint)" class="mono" text-anchor="middle"><text x="34.0" y="181">0</text><text x="131.1" y="181">5</text><text x="228.3" y="181">10</text><text x="308" y="181">ms</text></g><text x="160" y="194" text-anchor="middle" font-size="8" fill="var(--muted)">Na+ opens and closes; K+ follows and repolarises</text></svg></div>
    <div class="acg-eb" style="color:#c9357f">CELLTYPE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-action-potential" title="Link to this term">Action potential</a></h3>
    <p class="acg-def">A characteristic signal in excitable cell membranes: a potential-difference waveform that propagates along the membrane. In neurons it indicates activation. The trace is a Hodgkin-Huxley simulation: a brief current pulse opens sodium channels, which depolarise the membrane and then inactivate, while potassium conductance rises more slowly and repolarises it past rest.</p>
    </article>
    <article class="acg-card" id="term-aind-metadata" data-cat="dataorg" data-hay="aind metadata schema six json classes describing a newer data asset: data description, subject, procedures, rig or instrument, session or acquisition, and processing. where you look up which virus was injected, or what a capsule actually ran. datasets, sessions &amp; files ">
    <div class="acg-eb" style="color:#3f3f46">DATA</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-aind-metadata" title="Link to this term">AIND metadata schema</a></h3>
    <p class="acg-def">Six JSON classes describing a newer data asset: data description, subject, procedures, rig or instrument, session or acquisition, and processing. Where you look up which virus was injected, or what a capsule actually ran.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="background/metadata.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-allensdk" data-cat="dataorg" data-hay="allensdk the python package for the brain observatory physiology datasets, wrapping downloads and metadata behind a cache object. being retired in favour of reading nwb files directly, so new work should not start here. datasets, sessions &amp; files ">
    <div class="acg-eb" style="color:#3f3f46">DATA</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-allensdk" title="Link to this term">AllenSDK</a></h3>
    <p class="acg-def">The Python package for the Brain Observatory physiology datasets, wrapping downloads and metadata behind a cache object. Being retired in favour of reading NWB files directly, so new work should not start here.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="https://allensdk.readthedocs.io/" target="_blank" rel="noopener">AllenSDK docs &#8599;</a></div>
    </article>
    <article class="acg-card" id="term-amplitude-cutoff" data-cat="quality" data-hay="amplitude_cutoff estimated fraction of the unit's spikes that fell below the detection threshold and were never recorded — a false-negative rate. default threshold 0.1. quality metrics ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="amc-t"><title id="amc-t">amplitude_cutoff: spikes lost below the detection threshold</title><path d="M115,150v-20h7v20zM124,150v-28h7v28zM133,150v-38h7v38zM142,150v-49h7v49zM151,150v-59h7v59zM160,150v-69h7v69zM169,150v-77h7v77zM178,150v-82h7v82zM187,150v-84h7v84zM196,150v-82h7v82zM205,150v-76h7v76zM214,150v-67h7v67zM223,150v-57h7v57zM232,150v-46h7v46zM241,150v-36h7v36zM250,150v-26h7v26zM259,150v-19h7v19zM268,150v-12h7v12zM277,150v-8h7v8z" fill="currentColor" fill-opacity=".32"/><path d="M88,150v-6h7v6zM97,150v-9h7v9zM106,150v-14h7v14z" fill="var(--accent)" fill-opacity=".22"/><path d="M80,147L92,143L104,138L116,129L128,118L140,104L152,89L164,77L176,68L188,66L200,71L212,81L224,94L236,109L248,122L260,132L272,140L284,144" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="1.8" stroke-dasharray="4 4" stroke-linecap="round"/><path d="M74,150 H292" stroke="currentColor" stroke-opacity=".45" stroke-width="1.6"/><path d="M108,44 V158" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round"/><text x="108" y="36" text-anchor="middle" font-size="10" fill="var(--accent-ink)" font-weight="600">detection threshold</text><text x="86" y="176" font-size="10" fill="var(--muted)">missed spikes</text><text x="292" y="176" text-anchor="end" font-size="10" fill="var(--muted)">spike amplitude</text><text x="64" y="100" text-anchor="end" font-size="9.5" class="mono" fill="var(--faint)">count</text></svg></div>
    <div class="acg-eb" style="color:#4338ca">QUALITY</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-amplitude-cutoff" title="Link to this term">amplitude_cutoff</a></h3>
    <p class="acg-def">Estimated fraction of the unit's spikes that fell below the detection threshold and were never recorded — a false-negative rate. Default threshold 0.1.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="physiology/ephys/visual-coding/vcnp-quality-metrics.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-annotation" data-cat="tables" data-hay="annotation labeled data (points/tables) bound to locations or cells in the volume. annotation tables, ids &amp; queries ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="anno-t">
<title id="anno-t">Annotation</title>
<polygon points="30,78 84,78 84,138 30,138" fill="var(--scaffold)" fill-opacity=".12" stroke="currentColor" stroke-opacity=".55" stroke-width="1.5"/>
<polygon points="30,78 84,78 100,66 46,66" fill="var(--scaffold)" fill-opacity=".22" stroke="currentColor" stroke-opacity=".55" stroke-width="1.5"/>
<polygon points="84,78 100,66 100,126 84,138" fill="var(--scaffold)" fill-opacity=".06" stroke="currentColor" stroke-opacity=".55" stroke-width="1.5"/>
<line x1="57" y1="108" x2="57" y2="84" stroke="var(--synapse)" stroke-width="2" stroke-linecap="round"/>
<circle cx="57" cy="108" r="6" fill="var(--synapse)"/>
<circle cx="57" cy="84" r="3.6" fill="none" stroke="var(--synapse)" stroke-width="2"/>
<text x="57" y="156" text-anchor="middle" font-size="10" fill="var(--muted)">tagged point</text>
<path d="M104,102 C130,102 150,102 170,102" fill="none" stroke="currentColor" stroke-opacity=".7" stroke-width="2" stroke-linecap="round"/>
<path d="M165,97 l7,5 -7,5" fill="none" stroke="currentColor" stroke-opacity=".7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="178" y="72" width="118" height="62" rx="5" fill="var(--surface-2)" stroke="var(--border)" stroke-width="1.5"/>
<rect x="178" y="91" width="118" height="21" fill="var(--accent)" fill-opacity=".18"/>
<line x1="178" y1="91" x2="296" y2="91" stroke="var(--border)" stroke-width="1.4"/>
<line x1="178" y1="112" x2="296" y2="112" stroke="var(--border)" stroke-opacity=".6" stroke-width="1"/>
<text x="186" y="85" font-size="9.5" class="mono" fill="var(--muted)">id   pt_position</text>
<text x="186" y="105" font-size="9.5" class="mono" fill="var(--accent-ink)" font-weight="600">7   (x,y,z)</text>
<text x="186" y="126" font-size="9.5" class="mono" fill="var(--faint)">8   (x,y,z)</text>
<text x="237" y="156" text-anchor="middle" font-size="10" fill="var(--muted)">table row</text>
</svg></div>
    <div class="acg-eb" style="color:#9333ea">TABLES</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-annotation" title="Link to this term">Annotation</a></h3>
    <p class="acg-def">Labeled data (points/tables) bound to locations or cells in the volume.</p>
    </article>
    <article class="acg-card" id="term-baiting" data-cat="stimuli" data-hay="baiting / coupled vs uncoupled baiting: a reward an unchosen side would have given is held and delivered on the next choice of that side. coupled or uncoupled describes whether the two sides' probabilities change together or independently. stimuli &amp; behavioural tasks ">
    <div class="acg-eb" style="color:#a16207">STIMULUS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-baiting" title="Link to this term">Baiting / coupled vs uncoupled</a></h3>
    <p class="acg-def">Baiting: a reward an unchosen side would have given is held and delivered on the next choice of that side. Coupled or uncoupled describes whether the two sides' probabilities change together or independently.</p>
    </article>
    <article class="acg-card" id="term-basket-cell" data-cat="celltypes" data-hay="basket cell (bc) inhibitory neuron whose synaptic output targets the cell body and proximal dendrites of excitatory neurons. many basket cells express parvalbumin (pv), but not all — some express cholecystokinin (cck). pv basket cells are typically fast spiking, and are thought to be important for gain control and for the temporal precision of network activity. cell types &amp; cortical anatomy ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="d-basket-cell"><title id="d-basket-cell">Basket cell</title><defs><clipPath id="d-basket-cell-c" clipPathUnits="userSpaceOnUse"><rect x="12" y="26" width="76" height="118"/></clipPath></defs><g transform="translate(160,100) scale(1.55) translate(-50,-88)"><g clip-path="url(#d-basket-cell-c)"><g stroke="var(--dendrite)" stroke-width="2" fill="none" stroke-linecap="round">
<path d="M50,73 V54 M50,73 l-9,-12 M50,73 l9,-12"/>
<path d="M126,121 V132 M126,121 l-8,9 M126,121 l8,9"/>
<path d="M202,85 V54 M202,54 l-5,-6 M202,54 l5,-6 M202,95 V128 M202,128 l-5,6 M202,128 l5,6"/>
</g>
<g stroke="var(--axon)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path d="M50,83 V95 M50,95 C44,98 40,104 42,112 M50,95 C56,98 60,104 58,112"/>
<path d="M126,111 V54 M112,54 H140 M116,54 v-6 M126,54 v-6 M136,54 v-6"/>
<path d="M278,88 l0,-16 M278,88 l14,-8 M278,88 l16,0 M278,88 l14,8 M278,88 l0,16 M278,88 l-14,8 M278,88 l-16,0 M278,88 l-14,-8"/>
</g>
<g fill="none" stroke="currentColor" stroke-opacity=".4" stroke-width="1.6"><circle cx="42" cy="110" r="5"/><circle cx="58" cy="110" r="5"/></g>
<g fill="var(--neuron)"><circle cx="50" cy="78" r="5"/><circle cx="126" cy="116" r="5"/><circle cx="202" cy="90" r="5"/><circle cx="278" cy="88" r="5"/></g></g></g></svg></div>
    <div class="acg-eb" style="color:#c9357f">CELLTYPE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-basket-cell" title="Link to this term">Basket cell (BC)</a></h3>
    <p class="acg-def">Inhibitory neuron whose synaptic output targets the cell body and proximal dendrites of excitatory neurons. Many basket cells express parvalbumin (PV), but not all — some express cholecystokinin (CCK). PV basket cells are typically fast spiking, and are thought to be important for gain control and for the temporal precision of network activity.</p>
    </article>
    <article class="acg-card" id="term-bci-task" data-cat="stimuli" data-hay="bci task / conditioned neuron a lickport moves toward the mouse at a speed set by the fluorescence of one chosen neuron. reaching the near position within 10 s earns water. mice usually learn to drive that neuron within about 30 trials. stimuli &amp; behavioural tasks ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="bci-t"><title id="bci-t">BCI task driven by one conditioned neuron</title> <circle cx="42" cy="56" r="12" fill="var(--neuron)" fill-opacity=".25" stroke="var(--neuron)" stroke-width="2.4"/> <path d="M42,44 C38,32 34,26 30,18 M42,44 C46,32 50,28 56,20" fill="none" stroke="var(--dendrite)" stroke-width="2" stroke-linecap="round"/> <path d="M74,56 C94,56 98,30 108,32 C120,34 124,54 138,56" fill="none" stroke="var(--neuron)" stroke-width="2.2" stroke-linecap="round"/> <path d="M148,56 H176 M168,51 L176,56 L168,61" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> <path d="M186,142 H304" stroke="currentColor" stroke-opacity=".3" stroke-width="1.6" stroke-linecap="round"/> <rect x="264" y="108" width="14" height="30" rx="3" fill="var(--surface-2)" stroke="var(--accent)" stroke-width="2.2"/> <path d="M262,123 H234 M242,118 L234,123 L242,128" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> <path d="M194,108 C204,100 218,102 222,112 C224,122 212,128 203,125 C194,122 189,115 194,108 Z" fill="none" stroke="currentColor" stroke-opacity=".55" stroke-width="1.8"/> <g text-anchor="middle" font-size="9.5" fill="var(--muted)"> <text x="42" y="88">conditioned</text><text x="42" y="100">neuron</text><text x="206" y="160">mouse</text><text x="271" y="160">lickport</text></g> <g text-anchor="middle" font-size="9" fill="var(--faint)"> <text x="106" y="84" class="mono">ΔF/F</text><text x="246" y="96">near within 10 s</text><text x="160" y="184">learned in ~30 trials</text></g> <text x="162" y="44" text-anchor="middle" font-size="9.5" fill="var(--accent-ink)">speed</text> </svg></div>
    <div class="acg-eb" style="color:#a16207">STIMULUS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-bci-task" title="Link to this term">BCI task / conditioned neuron</a></h3>
    <p class="acg-def">A lickport moves toward the mouse at a speed set by the fluorescence of one chosen neuron. Reaching the near position within 10 s earns water. Mice usually learn to drive that neuron within about 30 trials.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="physiology/ophys/BCI/BCI-overview.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-behavior-session" data-cat="dataorg" data-hay="behavior session one behavioural recording, whether it happened under the microscope or in the training facility. its session_type names the training stage, which is how the full training history is reconstructed. datasets, sessions &amp; files ">
    <div class="acg-eb" style="color:#3f3f46">DATA</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-behavior-session" title="Link to this term">Behavior session</a></h3>
    <p class="acg-def">One behavioural recording, whether it happened under the microscope or in the training facility. Its <code>session_type</code> names the training stage, which is how the full training history is reconstructed.</p>
    </article>
    <article class="acg-card" id="term-bipolar-cell" data-cat="celltypes" data-hay="bipolar cell (bpc) a subset of vip cell with a bipolar dendritic arbor — two primary dendrites leaving opposite poles of the soma. distinct from the retinal cell of the same name. cell types &amp; cortical anatomy ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="d-bipolar-cell"><title id="d-bipolar-cell">Bipolar cell</title><defs><clipPath id="d-bipolar-cell-c" clipPathUnits="userSpaceOnUse"><rect x="164" y="26" width="76" height="118"/></clipPath></defs><g transform="translate(160,100) scale(1.55) translate(-202,-88)"><g clip-path="url(#d-bipolar-cell-c)"><g stroke="var(--dendrite)" stroke-width="2" fill="none" stroke-linecap="round">
<path d="M50,73 V54 M50,73 l-9,-12 M50,73 l9,-12"/>
<path d="M126,121 V132 M126,121 l-8,9 M126,121 l8,9"/>
<path d="M202,85 V54 M202,54 l-5,-6 M202,54 l5,-6 M202,95 V128 M202,128 l-5,6 M202,128 l5,6"/>
</g>
<g stroke="var(--axon)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path d="M50,83 V95 M50,95 C44,98 40,104 42,112 M50,95 C56,98 60,104 58,112"/>
<path d="M126,111 V54 M112,54 H140 M116,54 v-6 M126,54 v-6 M136,54 v-6"/>
<path d="M278,88 l0,-16 M278,88 l14,-8 M278,88 l16,0 M278,88 l14,8 M278,88 l0,16 M278,88 l-14,8 M278,88 l-16,0 M278,88 l-14,-8"/>
</g>
<g fill="none" stroke="currentColor" stroke-opacity=".4" stroke-width="1.6"><circle cx="42" cy="110" r="5"/><circle cx="58" cy="110" r="5"/></g>
<g fill="var(--neuron)"><circle cx="50" cy="78" r="5"/><circle cx="126" cy="116" r="5"/><circle cx="202" cy="90" r="5"/><circle cx="278" cy="88" r="5"/></g></g></g></svg></div>
    <div class="acg-eb" style="color:#c9357f">CELLTYPE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-bipolar-cell" title="Link to this term">Bipolar cell (BPC)</a></h3>
    <p class="acg-def">A subset of VIP cell with a bipolar dendritic arbor — two primary dendrites leaving opposite poles of the soma. Distinct from the retinal cell of the same name.</p>
    <div class="acg-meta"><span class="acg-chip acg-warn" title="This word means different things in different places">&#9888; ambiguous</span></div>
    </article>
    <article class="acg-card" id="term-blank-sweep" data-cat="stimuli" data-hay="blank sweep a trial in which the stimulus is replaced by mean-luminance grey, interleaved among real trials so each stimulus has its own baseline. stimuli &amp; behavioural tasks ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="bsw-t"><title id="bsw-t">Blank sweep: mean-luminance trials interleaved with stimuli</title><text x="160" y="34" text-anchor="middle" font-size="10.5" fill="var(--muted)">trial sequence</text><g fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".45" stroke-width="1.8"><rect x="20" y="62" width="46" height="46" rx="5"/><rect x="78" y="62" width="46" height="46" rx="5"/><rect x="194" y="62" width="46" height="46" rx="5"/></g><path d="M24,66h9v38h-9zM41,66h9v38h-9zM53,66h9v38h-9zM82,66h9v38h-9zM99,66h9v38h-9zM111,66h9v38h-9zM198,66h9v38h-9zM215,66h9v38h-9zM227,66h9v38h-9z" fill="currentColor" fill-opacity=".32"/><g fill="var(--accent)" fill-opacity=".1" stroke="var(--accent)" stroke-width="2.4" stroke-dasharray="5 4"><rect x="136" y="62" width="46" height="46" rx="5"/><rect x="252" y="62" width="46" height="46" rx="5"/></g><g text-anchor="middle" font-size="10" fill="var(--accent-ink)" font-weight="600"><text x="159" y="92">blank</text><text x="275" y="92">blank</text></g><path d="M20,126H300" stroke="currentColor" stroke-opacity=".35" stroke-width="1.6"/><text x="300" y="144" text-anchor="end" font-size="9.5" fill="var(--faint)">time</text><text x="160" y="172" text-anchor="middle" font-size="10" fill="var(--accent-ink)" font-weight="600">each stimulus gets its own baseline</text><text x="160" y="188" text-anchor="middle" font-size="9.5" fill="var(--faint)">interleaved, not blocked</text></svg></div>
    <div class="acg-eb" style="color:#a16207">STIMULUS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-blank-sweep" title="Link to this term">Blank sweep</a></h3>
    <p class="acg-def">A trial in which the stimulus is replaced by mean-luminance grey, interleaved among real trials so each stimulus has its own baseline.</p>
    </article>
    <article class="acg-card" id="term-bound-spatial-point" data-cat="tables" data-hay="bound spatial point binds an annotation to the cell at a location via the triad pt_position → pt_supervoxel_id → pt_root_id. annotation tables, ids &amp; queries ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="bsp-t">
<title id="bsp-t">Bound Spatial Point</title>
<circle cx="44" cy="100" r="9" fill="var(--accent)" fill-opacity=".18" stroke="var(--accent-ink)" stroke-width="2"/>
<line x1="44" y1="86" x2="44" y2="114" stroke="var(--accent-ink)" stroke-width="1.3" stroke-opacity=".7"/>
<line x1="30" y1="100" x2="58" y2="100" stroke="var(--accent-ink)" stroke-width="1.3" stroke-opacity=".7"/>
<circle cx="44" cy="100" r="2.6" fill="var(--accent-ink)"/>
<text x="44" y="132" text-anchor="middle" font-size="10" fill="var(--muted)">point</text>
<path d="M56,96 C100,80 118,57 148,57" fill="none" stroke="currentColor" stroke-opacity=".5" stroke-width="2" stroke-linecap="round"/>
<path d="M58,100 L148,100" fill="none" stroke="currentColor" stroke-opacity=".5" stroke-width="2" stroke-linecap="round"/>
<path d="M56,104 C100,120 118,143 148,143" fill="none" stroke="currentColor" stroke-opacity=".5" stroke-width="2" stroke-linecap="round"/>
<rect x="150" y="42" width="146" height="30" rx="5" fill="var(--surface-2)" stroke="var(--border)" stroke-width="1.5"/>
<rect x="150" y="42" width="5" height="30" rx="2" fill="var(--accent)"/>
<text x="164" y="61" font-size="11" class="mono" fill="var(--muted)">pt_position</text>
<rect x="150" y="85" width="146" height="30" rx="5" fill="var(--surface-2)" stroke="var(--border)" stroke-width="1.5"/>
<rect x="150" y="85" width="5" height="30" rx="2" fill="var(--scaffold)"/>
<text x="164" y="104" font-size="11" class="mono" fill="var(--muted)">pt_supervoxel_id</text>
<rect x="150" y="128" width="146" height="30" rx="5" fill="var(--surface-2)" stroke="var(--border)" stroke-width="1.5"/>
<rect x="150" y="128" width="5" height="30" rx="2" fill="var(--neuron)"/>
<text x="164" y="147" font-size="11" class="mono" fill="var(--neuron)">pt_root_id</text>
</svg></div>
    <div class="acg-eb" style="color:#9333ea">TABLES</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-bound-spatial-point" title="Link to this term">Bound Spatial Point</a></h3>
    <p class="acg-def">Binds an annotation to the cell at a location via the triad <code>pt_position</code> → <code>pt_supervoxel_id</code> → <code>pt_root_id</code>.</p>
    </article>
    <article class="acg-card" id="term-branch-end-root-point" data-cat="morphology" data-hay="branch / end / root point named skeleton vertex types; the root is conventionally placed at the soma. morphology — meshes &amp; skeletons ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="m-brep"><title id="m-brep">Branch, end and root points on a skeleton</title><path d="M55,158 L82,120 M82,120 L64,88 L48,58 M64,88 L78,54 M82,120 L116,96 L104,60 M116,96 L140,66" fill="none" stroke="var(--neuron)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="55" cy="158" r="11" fill="var(--neuron)" fill-opacity=".16" stroke="var(--neuron)" stroke-width="2"/><rect x="50" y="153" width="10" height="10" rx="1.5" fill="var(--neuron)" stroke="var(--surface)" stroke-width="1.5"/><g stroke="var(--surface)" stroke-width="1.5"><circle cx="82" cy="120" r="5" fill="var(--accent-ink)"/><circle cx="64" cy="88" r="5" fill="var(--accent-ink)"/><circle cx="116" cy="96" r="5" fill="var(--accent-ink)"/></g><g fill="none" stroke="currentColor" stroke-opacity=".8" stroke-width="2" stroke-linejoin="round"><path d="M48,53 L53,62 L43,62 Z"/><path d="M78,49 L83,58 L73,58 Z"/><path d="M104,55 L109,64 L99,64 Z"/><path d="M140,61 L145,70 L135,70 Z"/></g><text x="240" y="42" text-anchor="middle" font-size="9.5" class="mono" fill="var(--faint)">point type</text><rect x="207" y="54" width="10" height="10" rx="1.5" fill="var(--neuron)"/><text x="224" y="63" font-size="10" fill="var(--muted)">root (soma)</text><circle cx="212" cy="82" r="5" fill="var(--accent-ink)"/><text x="224" y="86" font-size="10" fill="var(--muted)">branch</text><path d="M212,100 L217,109 L207,109 Z" fill="none" stroke="currentColor" stroke-opacity=".8" stroke-width="2" stroke-linejoin="round"/><text x="224" y="108" font-size="10" fill="var(--muted)">end</text></svg></div>
    <div class="acg-eb" style="color:#2a8f57">MORPH</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-branch-end-root-point" title="Link to this term">Branch / End / Root point</a></h3>
    <p class="acg-def">Named skeleton vertex types; the root is conventionally placed at the soma.</p>
    </article>
    <article class="acg-card" id="term-catch-trial" data-cat="stimuli" data-hay="catch trial / sham change a change time is drawn but the image does not change. this conservative definition counts only presentations drawn from the change-time distribution; aborted trials are arguably catches too. stimuli &amp; behavioural tasks ">
    <div class="acg-eb" style="color:#a16207">STIMULUS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-catch-trial" title="Link to this term">Catch trial / sham change</a></h3>
    <p class="acg-def">A change time is drawn but the image does not change. This conservative definition counts only presentations drawn from the change-time distribution; aborted trials are arguably catches too.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="physiology/stimuli/visual-behavior/VB-Behavior.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-cave" data-cat="cave" data-hay="cave connectome annotation versioning engine — the suite managing large dynamic connectomics data. cave — access &amp; versioning ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="cave-hub"><title id="cave-hub">CAVE architecture hub</title>
<rect x="16" y="30" width="96" height="32" rx="6" fill="var(--scaffold)" fill-opacity=".16" stroke="currentColor" stroke-opacity=".6" stroke-width="2"/>
<text x="64" y="50" text-anchor="middle" font-size="10" fill="var(--muted)">imagery</text>
<rect x="16" y="84" width="96" height="32" rx="6" fill="var(--neuron)" fill-opacity=".16" stroke="currentColor" stroke-opacity=".6" stroke-width="2"/>
<text x="64" y="104" text-anchor="middle" font-size="10" fill="var(--muted)">segmentation</text>
<rect x="16" y="138" width="96" height="32" rx="6" fill="var(--synapse)" fill-opacity=".16" stroke="currentColor" stroke-opacity=".6" stroke-width="2"/>
<text x="64" y="158" text-anchor="middle" font-size="10" fill="var(--muted)">annotation DB</text>
<path d="M112,46 C150,52 168,84 199,92" fill="none" stroke="currentColor" stroke-opacity=".55" stroke-width="2" stroke-linecap="round"/>
<path d="M112,100 L199,100" fill="none" stroke="currentColor" stroke-opacity=".55" stroke-width="2" stroke-linecap="round"/>
<path d="M112,154 C150,148 168,116 199,108" fill="none" stroke="currentColor" stroke-opacity=".55" stroke-width="2" stroke-linecap="round"/>
<polygon points="200,92 190,87 191,95" fill="currentColor" fill-opacity=".55"/>
<polygon points="200,100 190,95 190,105" fill="currentColor" fill-opacity=".55"/>
<polygon points="200,108 190,103 191,111" fill="currentColor" fill-opacity=".55"/>
<rect x="200" y="74" width="100" height="52" rx="10" fill="var(--surface-2)" stroke="var(--accent-ink)" stroke-width="2.6"/>
<text x="250" y="104" text-anchor="middle" font-size="13" class="mono" fill="var(--accent-ink)" font-weight="600">CAVEclient</text>
</svg></div>
    <div class="acg-eb" style="color:#0f766e">CAVE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-cave" title="Link to this term">CAVE</a></h3>
    <p class="acg-def">Connectome Annotation Versioning Engine — the suite managing large dynamic connectomics data.</p>
    </article>
    <article class="acg-card" id="term-caveclient" data-cat="cave" data-hay="caveclient the main python client for programmatic access to cave services. servers: microns global.daf-apis.com, v1dd global.em.brain.allentech.org. cave — access &amp; versioning ">
    <div class="acg-eb" style="color:#0f766e">CAVE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-caveclient" title="Link to this term">CAVEclient</a></h3>
    <p class="acg-def">The main Python client for programmatic access to CAVE services. Servers: MICrONS <code>global.daf-apis.com</code>, V1DD <code>global.em.brain.allentech.org</code>.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="https://caveconnectome.github.io/CAVEclient/" target="_blank" rel="noopener">CAVEclient docs &#8599;</a></div>
    </article>
    <article class="acg-card" id="term-cc-abs-cc-max-cc-norm" data-cat="functional" data-hay="cc_abs / cc_max / cc_norm digital-twin model-performance columns. functional data &amp; coregistration ">
    <div class="acg-eb" style="color:#9a5b12">FUNCTION</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-cc-abs-cc-max-cc-norm" title="Link to this term">cc_abs / cc_max / cc_norm</a></h3>
    <p class="acg-def">Digital-twin model-performance columns.</p>
    </article>
    <article class="acg-card" id="term-cell-type" data-cat="celltypes" data-hay="cell type classification of a cell (e.g. 23p, bc) via several tables/methods, keyed on nucleus id. cell types &amp; cortical anatomy ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="ct-t"><title id="ct-t">Cell type dendrogram</title>
<text x="160" y="30" text-anchor="middle" font-size="11" fill="var(--muted)">all cells</text>
<path d="M160,36 V52 M60,52 H260 M60,52 V68 M160,52 V68 M260,52 V68" fill="none" stroke="currentColor" stroke-opacity=".5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<text x="60" y="84" text-anchor="middle" font-size="10.5" font-weight="600" fill="var(--neuron)">Excitatory</text>
<text x="160" y="84" text-anchor="middle" font-size="10.5" font-weight="600" fill="var(--dendrite)">Inhibitory</text>
<text x="260" y="84" text-anchor="middle" font-size="10.5" font-weight="600" fill="var(--scaffold)">Non-neuron</text>
<path d="M60,90 V110 M30,110 H90 M30,110 V122 M60,110 V122 M90,110 V122" fill="none" stroke="var(--neuron)" stroke-opacity=".85" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M160,90 V110 M135,110 H185 M135,110 V122 M160,110 V122 M185,110 V122" fill="none" stroke="var(--dendrite)" stroke-opacity=".85" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M260,90 V110 M230,110 H290 M230,110 V122 M260,110 V122 M290,110 V122" fill="none" stroke="var(--scaffold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<g font-size="9.5" text-anchor="middle" class="mono" fill="var(--muted)">
<text x="30" y="136">IT</text><text x="60" y="136">ET</text><text x="90" y="136">CT</text>
<text x="135" y="136">Pv</text><text x="160" y="136">Sst</text><text x="185" y="136">Vip</text>
<text x="230" y="136">Ast</text><text x="260" y="136">Oli</text><text x="290" y="136">Mic</text>
</g>
</svg></div>
    <div class="acg-eb" style="color:#c9357f">CELLTYPE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-cell-type" title="Link to this term">Cell type</a></h3>
    <p class="acg-def">Classification of a cell (e.g. 23P, BC) via several tables/methods, keyed on nucleus id.</p>
    </article>
    <article class="acg-card" id="term-cell-id-soma-id" data-cat="tables" data-hay="cell_id / soma_id the 6-digit nucleus id (from nucleus_detection_v0), static across versions; tracks a cell over time. annotation tables, ids &amp; queries ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="cid-t">
<title id="cid-t">cell_id / soma_id</title>
<rect x="46" y="26" width="228" height="30" rx="15" fill="var(--neuron)" fill-opacity=".16" stroke="var(--neuron)" stroke-width="2"/>
<circle cx="70" cy="41" r="7" fill="var(--neuron)"/>
<text x="86" y="45" font-size="11" class="mono" fill="var(--neuron)">nucleus_id 302  (fixed)</text>
<line x1="74" y1="56" x2="74" y2="96" stroke="currentColor" stroke-opacity=".4" stroke-width="1.5" stroke-dasharray="3 3"/>
<line x1="160" y1="56" x2="160" y2="96" stroke="currentColor" stroke-opacity=".4" stroke-width="1.5" stroke-dasharray="3 3"/>
<line x1="246" y1="56" x2="246" y2="96" stroke="currentColor" stroke-opacity=".4" stroke-width="1.5" stroke-dasharray="3 3"/>
<rect x="44" y="98" width="60" height="28" rx="6" fill="var(--surface-2)" stroke="var(--accent)" stroke-width="2"/>
<text x="74" y="116" text-anchor="middle" font-size="10" class="mono" fill="var(--accent-ink)">…041</text>
<rect x="130" y="98" width="60" height="28" rx="6" fill="var(--surface-2)" stroke="var(--accent)" stroke-width="2"/>
<text x="160" y="116" text-anchor="middle" font-size="10" class="mono" fill="var(--accent-ink)">…582</text>
<rect x="216" y="98" width="60" height="28" rx="6" fill="var(--surface-2)" stroke="var(--accent)" stroke-width="2"/>
<text x="246" y="116" text-anchor="middle" font-size="10" class="mono" fill="var(--accent-ink)">…907</text>
<path d="M106,112 l18,0 M118,107 l7,5 -7,5" fill="none" stroke="currentColor" stroke-opacity=".7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M192,112 l18,0 M204,107 l7,5 -7,5" fill="none" stroke="currentColor" stroke-opacity=".7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<line x1="44" y1="150" x2="286" y2="150" stroke="currentColor" stroke-opacity=".6" stroke-width="2" stroke-linecap="round"/>
<path d="M280,145 l7,5 -7,5" fill="none" stroke="currentColor" stroke-opacity=".6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="74" cy="150" r="2.6" fill="currentColor"/><text x="74" y="166" text-anchor="middle" font-size="9" fill="var(--muted)">v1</text>
<circle cx="160" cy="150" r="2.6" fill="currentColor"/><text x="160" y="166" text-anchor="middle" font-size="9" fill="var(--muted)">v2</text>
<circle cx="246" cy="150" r="2.6" fill="currentColor"/><text x="246" y="166" text-anchor="middle" font-size="9" fill="var(--muted)">v3</text>
<text x="165" y="186" text-anchor="middle" font-size="10" fill="var(--faint)">root_id changes across versions</text>
</svg></div>
    <div class="acg-eb" style="color:#9333ea">TABLES</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-cell-id-soma-id" title="Link to this term">cell_id / soma_id</a></h3>
    <p class="acg-def">The 6-digit nucleus id (from <code>nucleus_detection_v0</code>), static across versions; tracks a cell over time.</p>
    </article>
    <article class="acg-card" id="term-cell-specimen-vs-roi-id" data-cat="dataorg" data-hay="cell_specimen_id vs cell_roi_id cell_roi_id identifies a segmented roi within one experiment, before matching. cell_specimen_id identifies the cell after matching across sessions, and is therefore shared across a container. joining on the wrong one silently loses the across-day link. datasets, sessions &amp; files ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="csri-t"><title id="csri-t">cell_roi_id per session versus cell_specimen_id across a container</title> <g fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".4" stroke-width="1.8"> <rect x="16" y="26" width="82" height="62" rx="6"/> <rect x="119" y="26" width="82" height="62" rx="6"/> <rect x="222" y="26" width="82" height="62" rx="6"/></g> <g fill="var(--neuron)" fill-opacity=".3" stroke="var(--neuron)" stroke-width="2"> <ellipse cx="57" cy="56" rx="14" ry="11"/><ellipse cx="160" cy="56" rx="13" ry="12"/><ellipse cx="263" cy="56" rx="15" ry="10"/></g> <text x="57" y="20" text-anchor="middle" font-size="9.5" fill="var(--muted)">day 1</text> <text x="160" y="20" text-anchor="middle" font-size="9.5" fill="var(--muted)">day 2</text> <text x="263" y="20" text-anchor="middle" font-size="9.5" fill="var(--muted)">day 3</text> <g text-anchor="middle" font-size="9" class="mono" fill="var(--faint)"> <text x="57" y="104">roi 812</text><text x="160" y="104">roi 447</text><text x="263" y="104">roi 1903</text></g> <path d="M57,112 V126 H160 M263,112 V126 H160 M160,112 V140" fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round"/> <rect x="98" y="140" width="124" height="26" rx="13" fill="var(--accent)" fill-opacity=".18" stroke="var(--accent)" stroke-width="2.2"/> <text x="160" y="158" text-anchor="middle" font-size="10" class="mono" fill="var(--accent-ink)" font-weight="600">cell_specimen_id</text> <text x="160" y="186" text-anchor="middle" font-size="9" fill="var(--faint)">matched across the container</text> <text x="160" y="122" text-anchor="middle" font-size="9" class="mono" fill="var(--muted)">cell_roi_id — one experiment each</text> </svg></div>
    <div class="acg-eb" style="color:#3f3f46">DATA</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-cell-specimen-vs-roi-id" title="Link to this term">cell_specimen_id vs cell_roi_id</a></h3>
    <p class="acg-def"><code>cell_roi_id</code> identifies a segmented ROI within one experiment, before matching. <code>cell_specimen_id</code> identifies the cell after matching across sessions, and is therefore shared across a container. Joining on the wrong one silently loses the across-day link.</p>
    <div class="acg-meta"><span class="acg-chip acg-warn" title="This word means different things in different places">&#9888; ambiguous</span></div>
    </article>
    <article class="acg-card" id="term-change-detection" data-cat="stimuli" data-hay="change detection task a go/no-go task: images are presented in a continuous stream and the mouse earns water by licking when the image identity changes. the 500 ms grey gap between images adds a working-memory component. stimuli &amp; behavioural tasks ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="cdt-t"><title id="cdt-t">Change detection: lick when the image identity changes</title><rect x="24" y="56" width="40" height="40" rx="4" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".4" stroke-width="1.6"/><path d="M30,90 L58,62 M40,90 L58,68 M30,84 L48,62" stroke="currentColor" stroke-opacity=".45" stroke-width="2" stroke-linecap="round"/><rect x="84" y="56" width="40" height="40" rx="4" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".4" stroke-width="1.6"/><path d="M90,90 L118,62 M100,90 L118,68 M90,84 L108,62" stroke="currentColor" stroke-opacity=".45" stroke-width="2" stroke-linecap="round"/><rect x="144" y="56" width="40" height="40" rx="4" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".4" stroke-width="1.6"/><path d="M150,90 L178,62 M160,90 L178,68 M150,84 L168,62" stroke="currentColor" stroke-opacity=".45" stroke-width="2" stroke-linecap="round"/><rect x="204" y="56" width="40" height="40" rx="4" fill="var(--surface-2)" stroke="var(--accent)" stroke-opacity="1" stroke-width="2.4"/><path d="M216,62 V90 M224,62 V90 M232,62 V90" stroke="currentColor" stroke-opacity=".45" stroke-width="2" stroke-linecap="round"/><rect x="264" y="56" width="40" height="40" rx="4" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".4" stroke-width="1.6"/><path d="M276,62 V90 M284,62 V90 M292,62 V90" stroke="currentColor" stroke-opacity=".45" stroke-width="2" stroke-linecap="round"/><text x="134" y="46" text-anchor="middle" font-size="9" class="mono" fill="var(--faint)">500 ms</text><path d="M224,104 V120" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"/><polygon points="224,128 220,118 228,118" fill="var(--accent)"/><text x="224" y="146" text-anchor="middle" font-size="10.5" fill="var(--accent-ink)" font-weight="600">lick</text><text x="224" y="160" text-anchor="middle" font-size="9.5" fill="var(--muted)">water</text><text x="104" y="146" text-anchor="middle" font-size="9.5" fill="var(--faint)">no lick</text><text x="160" y="188" text-anchor="middle" font-size="9.5" fill="var(--muted)">go / no-go, gap held in memory</text></svg></div>
    <div class="acg-eb" style="color:#a16207">STIMULUS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-change-detection" title="Link to this term">Change detection task</a></h3>
    <p class="acg-def">A go/no-go task: images are presented in a continuous stream and the mouse earns water by licking when the image identity changes. The 500 ms grey gap between images adds a working-memory component.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="physiology/stimuli/visual-behavior/VB-Behavior.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-channelrhodopsin" data-cat="genetics" data-hay="channelrhodopsin (chr2) a light-gated ion channel used in optogenetics to control neuronal activity with light. genetic &amp; optical tools ">
    <div class="acg-eb" style="color:#15803d">GENETIC</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-channelrhodopsin" title="Link to this term">Channelrhodopsin (ChR2)</a></h3>
    <p class="acg-def">A light-gated ion channel used in optogenetics to control neuronal activity with light.</p>
    </article>
    <article class="acg-card" id="term-channels-table" data-cat="dataorg" data-hay="channels table one row per recording site, at general/extracellular_ephys/electrodes, with its position on the shank and in the ccf. a unit points into this table through its electrodes column; that is how a spike acquires a place in the brain. datasets, sessions &amp; files ">
    <div class="acg-eb" style="color:#3f3f46">DATA</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-channels-table" title="Link to this term">Channels table</a></h3>
    <p class="acg-def">One row per recording site, at <code>general/extracellular_ephys/electrodes</code>, with its position on the shank and in the CCF. A unit points into this table through its <code>electrodes</code> column; that is how a spike acquires a place in the brain.</p>
    </article>
    <article class="acg-card" id="term-chrmine" data-cat="genetics" data-hay="chrmine a red-shifted opsin, excited near 1080 nm. because gcamp is excited near 920 nm the two can be driven independently, which is what makes simultaneous imaging and single-cell photostimulation possible. genetic &amp; optical tools ">
    <div class="acg-eb" style="color:#15803d">GENETIC</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-chrmine" title="Link to this term">ChRmine</a></h3>
    <p class="acg-def">A red-shifted opsin, excited near 1080 nm. Because GCaMP is excited near 920 nm the two can be driven independently, which is what makes simultaneous imaging and single-cell photostimulation possible.</p>
    </article>
    <article class="acg-card" id="term-classification-system-column" data-cat="celltypes" data-hay="classification_system column the e / i / non-neuron grouping column in cell-type tables. cell types &amp; cortical anatomy ">
    <div class="acg-eb" style="color:#c9357f">CELLTYPE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-classification-system-column" title="Link to this term">classification_system column</a></h3>
    <p class="acg-def">The E / I / non-neuron grouping column in cell-type tables.</p>
    </article>
    <article class="acg-card" id="term-clean" data-cat="proofreading" data-hay="clean arbor proofread to remove all merge errors (synapses correct, but may be incomplete). proofreading &amp; data quality ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="pc"><title id="pc">Clean — proofreading status ladder</title>
<circle cx="72" cy="108" r="10" fill="var(--neuron)" fill-opacity=".2" stroke="var(--neuron)" stroke-width="2.4"/>
<g fill="none" stroke="var(--neuron)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
<path d="M72,98 C66,82 62,70 58,54"/>
<path d="M72,98 C74,80 77,66 79,50"/>
<path d="M72,98 C82,84 90,74 98,60"/>
<path d="M79,66 C85,62 91,60 98,56"/>
<path d="M66,74 C60,70 55,68 49,66"/>
<path d="M72,118 C72,138 69,150 65,166"/>
</g>
<rect x="170" y="42" width="132" height="30" rx="15" fill="none" stroke="currentColor" stroke-opacity=".3" stroke-width="1.8"/>
<text x="236" y="61" text-anchor="middle" font-size="12" fill="var(--muted)">Extended</text>
<rect x="170" y="87" width="132" height="30" rx="15" fill="var(--accent)" fill-opacity=".16" stroke="var(--accent)" stroke-width="2.4"/>
<text x="236" y="106" text-anchor="middle" font-size="12" fill="var(--accent-ink)" font-weight="600">Clean</text>
<rect x="170" y="132" width="132" height="30" rx="15" fill="none" stroke="currentColor" stroke-opacity=".3" stroke-width="1.8"/>
<text x="236" y="151" text-anchor="middle" font-size="12" fill="var(--muted)">Unproofread</text>
<path d="M228,82 L236,76 L244,82" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M228,127 L236,121 L244,127" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<text x="72" y="184" text-anchor="middle" font-size="9.5" fill="var(--muted)">merge errors removed</text>
</svg></div>
    <div class="acg-eb" style="color:#b8791a">PROOF</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-clean" title="Link to this term">Clean</a></h3>
    <p class="acg-def">Arbor proofread to remove all merge errors (synapses correct, but may be incomplete).</p>
    </article>
    <article class="acg-card" id="term-cloud-volume-imageryclient" data-cat="cave" data-hay="cloud-volume / imageryclient serverless clients to read precomputed imagery/segmentation and download aligned cutouts. cave — access &amp; versioning ">
    <div class="acg-eb" style="color:#0f766e">CAVE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-cloud-volume-imageryclient" title="Link to this term">cloud-volume / ImageryClient</a></h3>
    <p class="acg-def">Serverless clients to read Precomputed imagery/segmentation and download aligned cutouts.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="https://github.com/seung-lab/cloud-volume" target="_blank" rel="noopener">cloud-volume &#8599;</a></div>
    </article>
    <article class="acg-card" id="term-column-microns" data-cat="datasets" data-hay="column (microns) a 100 µm-square region spanning all cortical layers, densely proofread for a cell-type census. datasets &amp; scope microns">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="d1"><title id="d1">Column (MICrONS)</title><rect x="66" y="30" width="180" height="140" fill="var(--scaffold)" fill-opacity=".1" stroke="currentColor" stroke-opacity=".6" stroke-width="2"/><line x1="66" y1="48" x2="246" y2="48" stroke="currentColor" stroke-opacity=".35" stroke-width="1.3"/><line x1="66" y1="84" x2="246" y2="84" stroke="currentColor" stroke-opacity=".35" stroke-width="1.3"/><line x1="66" y1="106" x2="246" y2="106" stroke="currentColor" stroke-opacity=".35" stroke-width="1.3"/><line x1="66" y1="140" x2="246" y2="140" stroke="currentColor" stroke-opacity=".35" stroke-width="1.3"/><text x="60" y="42" text-anchor="end" font-size="9" fill="var(--faint)">L1</text><text x="60" y="69" text-anchor="end" font-size="9" fill="var(--faint)">L2/3</text><text x="60" y="99" text-anchor="end" font-size="9" fill="var(--faint)">L4</text><text x="60" y="126" text-anchor="end" font-size="9" fill="var(--faint)">L5</text><text x="60" y="158" text-anchor="end" font-size="9" fill="var(--faint)">L6</text><rect x="146" y="30" width="24" height="140" fill="var(--accent)" fill-opacity=".2" stroke="var(--accent-ink)" stroke-width="2"/><text x="70" y="24" text-anchor="start" font-size="9" fill="var(--muted)">pia</text><text x="70" y="184" text-anchor="start" font-size="9" fill="var(--muted)">white matter</text><line x1="158" y1="170" x2="158" y2="185" stroke="var(--accent-ink)" stroke-width="1.5"/><text x="155" y="196" text-anchor="end" font-size="9.5" class="mono" fill="var(--accent-ink)" font-weight="600">100 µm</text><text x="158" y="196" text-anchor="start" font-size="9.5" fill="var(--accent-ink)" font-weight="600"> census column</text></svg></div>
    <div class="acg-eb" style="color:#0e7f8c">DATASETS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-column-microns" title="Link to this term">Column (MICrONS)</a></h3>
    <p class="acg-def">A 100 µm-square region spanning all cortical layers, densely proofread for a cell-type census.</p>
    <div class="acg-meta"><span class="acg-chip acg-ds">MICrONS only</span><span class="acg-chip acg-warn" title="This word means different things in different places">&#9888; ambiguous</span></div>
    </article>
    <article class="acg-card" id="term-column-v1dd-field" data-cat="datasets" data-hay="column (v1dd field) a column field naming one of 5 stacked scan sub-volumes tiling the v1dd block — a different concept from the microns column. datasets &amp; scope v1dd">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="d2"><title id="d2">Column (V1DD field)</title><text x="80" y="22" text-anchor="start" font-size="9" fill="var(--muted)">V1DD scan fields</text><polygon points="80,52 200,52 228,32 108,32" fill="var(--scaffold)" fill-opacity=".24" stroke="currentColor" stroke-opacity=".55" stroke-width="1.6"/><polygon points="200,52 228,32 228,158 200,178" fill="var(--scaffold)" fill-opacity=".08" stroke="currentColor" stroke-opacity=".55" stroke-width="1.6"/><rect x="80" y="52" width="120" height="25.2" fill="var(--accent)" fill-opacity=".16" stroke="currentColor" stroke-opacity=".5" stroke-width="1.4"/><rect x="80" y="77.2" width="120" height="25.2" fill="var(--accent)" fill-opacity=".07" stroke="currentColor" stroke-opacity=".5" stroke-width="1.4"/><rect x="80" y="102.4" width="120" height="25.2" fill="var(--accent)" fill-opacity=".16" stroke="currentColor" stroke-opacity=".5" stroke-width="1.4"/><rect x="80" y="127.6" width="120" height="25.2" fill="var(--accent)" fill-opacity=".07" stroke="currentColor" stroke-opacity=".5" stroke-width="1.4"/><rect x="80" y="152.8" width="120" height="25.2" fill="var(--accent)" fill-opacity=".16" stroke="currentColor" stroke-opacity=".5" stroke-width="1.4"/><text x="140" y="68" text-anchor="middle" font-size="10" class="mono" fill="var(--accent-ink)" font-weight="600">1</text><text x="140" y="93.2" text-anchor="middle" font-size="10" class="mono" fill="var(--accent-ink)" font-weight="600">2</text><text x="140" y="118.4" text-anchor="middle" font-size="10" class="mono" fill="var(--accent-ink)" font-weight="600">3</text><text x="140" y="143.6" text-anchor="middle" font-size="10" class="mono" fill="var(--accent-ink)" font-weight="600">4</text><text x="140" y="168.8" text-anchor="middle" font-size="10" class="mono" fill="var(--accent-ink)" font-weight="600">5</text><text x="74" y="55" text-anchor="end" font-size="9" fill="var(--muted)">pia</text><text x="74" y="178" text-anchor="end" font-size="9" fill="var(--muted)">WM</text><text x="240" y="70" text-anchor="start" font-size="8.5" fill="var(--accent-ink)" font-weight="600">cf. MICrONS:</text><text x="240" y="82" text-anchor="start" font-size="8.5" fill="var(--muted)">samples one</text><text x="240" y="94" text-anchor="start" font-size="8.5" fill="var(--muted)">narrow 100 µm</text><text x="240" y="106" text-anchor="start" font-size="8.5" fill="var(--muted)">slab</text><text x="160" y="194" text-anchor="middle" font-size="9" fill="var(--muted)">5 sub-volumes tile the full depth</text></svg></div>
    <div class="acg-eb" style="color:#0e7f8c">DATASETS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-column-v1dd-field" title="Link to this term">Column (V1DD field)</a></h3>
    <p class="acg-def">A <code>column</code> field naming one of 5 stacked scan sub-volumes tiling the V1DD block — a different concept from the MICrONS column.</p>
    <div class="acg-meta"><span class="acg-chip acg-ds">V1DD only</span><span class="acg-chip acg-warn" title="This word means different things in different places">&#9888; ambiguous</span></div>
    </article>
    <article class="acg-card" id="term-ccf" data-cat="dataorg" data-hay="common coordinate framework (ccf) a standard 3d reference space for the mouse brain that lets data from different modalities be placed in the same coordinates. datasets, sessions &amp; files ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="ccf-t"><title id="ccf-t">Common Coordinate Framework: one reference space for every modality</title><clipPath id="clip-ccf"><path d="M126,52 C176,36 226,58 224,98 C222,138 178,158 148,146 C114,132 106,66 126,52"/></clipPath><path d="M126,52 C176,36 226,58 224,98 C222,138 178,158 148,146 C114,132 106,66 126,52" fill="var(--scaffold)" fill-opacity=".18" stroke="currentColor" stroke-opacity=".5" stroke-width="2"/><g clip-path="url(#clip-ccf)" stroke="currentColor" stroke-opacity=".22" stroke-width="1.1"><path d="M140,30 V160 M170,30 V160 M200,30 V160 M100,72 H240 M100,98 H240 M100,124 H240"/></g><path d="M30,58 h16 v52 l-8,10 l-8,-10 z" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".5" stroke-width="1.7" stroke-linejoin="round"/><path d="M33,68 h10 M33,80 h10 M33,92 h10" stroke="currentColor" stroke-opacity=".45" stroke-width="1.8"/><text x="38" y="140" text-anchor="middle" font-size="10" fill="var(--muted)">ephys</text><rect x="262" y="66" width="46" height="40" rx="4" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".5" stroke-width="1.7"/><g fill="var(--neuron)" fill-opacity=".5"><circle cx="275" cy="80" r="4"/><circle cx="292" cy="76" r="4"/><circle cx="286" cy="94" r="4"/></g><text x="285" y="140" text-anchor="middle" font-size="10" fill="var(--muted)">ophys</text><path d="M54,92 H96" stroke="currentColor" stroke-opacity=".5" stroke-width="1.8" stroke-linecap="round"/><polygon points="104,92 95,87 95,97" fill="currentColor" fill-opacity=".5"/><path d="M256,92 H236" stroke="currentColor" stroke-opacity=".5" stroke-width="1.8" stroke-linecap="round"/><polygon points="228,92 237,87 237,97" fill="currentColor" fill-opacity=".5"/><text x="166" y="176" text-anchor="middle" font-size="12" fill="var(--accent-ink)" font-weight="600">CCF</text><text x="166" y="192" text-anchor="middle" font-size="9" class="mono" fill="var(--faint)">[AP, DV, ML] µm</text></svg></div>
    <div class="acg-eb" style="color:#3f3f46">DATA</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-ccf" title="Link to this term">Common Coordinate Framework (CCF)</a></h3>
    <p class="acg-def">A standard 3D reference space for the mouse brain that lets data from different modalities be placed in the same coordinates.</p>
    </article>
    <article class="acg-card" id="term-compartment-labels" data-cat="morphology" data-hay="compartment labels swc integer codes: 0 undefined, 1 soma, 2 axon, 3 basal dendrite, 4 apical dendrite. morphology — meshes &amp; skeletons ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="m-comp"><title id="m-comp">Skeleton colored by SWC compartment</title><path d="M90,101 C88,80 92,64 90,52 M90,60 C82,50 74,44 66,38 M90,58 C100,48 108,44 116,38" fill="none" stroke="var(--dendrite)" stroke-width="2.6" stroke-linecap="round"/><path d="M80,120 C64,130 56,140 46,152 M88,124 C86,142 78,150 68,160" fill="none" stroke="var(--dendrite)" stroke-width="2.2" stroke-linecap="round"/><path d="M101,120 C113,138 111,158 119,175 M108,150 C118,150 125,154 131,158" fill="none" stroke="var(--axon)" stroke-width="2.4" stroke-linecap="round"/><circle cx="90" cy="112" r="12" fill="var(--neuron)" fill-opacity=".3" stroke="var(--neuron)" stroke-width="2.2"/><text x="120" y="42" font-size="9" fill="var(--muted)">apical</text><text x="30" y="150" font-size="9" fill="var(--muted)">basal</text><circle cx="212" cy="66" r="5" fill="var(--neuron)" fill-opacity=".3" stroke="var(--neuron)" stroke-width="2"/><text x="226" y="70" font-size="10" fill="var(--muted)">soma</text><line x1="204" y1="92" x2="220" y2="92" stroke="var(--dendrite)" stroke-width="3.2" stroke-linecap="round"/><text x="226" y="96" font-size="10" fill="var(--muted)">dendrite</text><line x1="204" y1="116" x2="220" y2="116" stroke="var(--axon)" stroke-width="3.2" stroke-linecap="round"/><text x="226" y="120" font-size="10" fill="var(--muted)">axon</text></svg></div>
    <div class="acg-eb" style="color:#2a8f57">MORPH</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-compartment-labels" title="Link to this term">Compartment labels</a></h3>
    <p class="acg-def">SWC integer codes: 0 undefined, 1 soma, 2 axon, 3 basal dendrite, 4 apical dendrite.</p>
    </article>
    <article class="acg-card" id="term-connectivity-viewer" data-cat="tools" data-hay="connectivity viewer dash app showing a cell's synaptic inputs/outputs grouped and colored by cell type. visualisation tools ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="cv-t"><title id="cv-t">Connectivity Viewer</title><rect x="14" y="16" width="292" height="168" rx="9" fill="var(--surface-2)" fill-opacity=".5" stroke="currentColor" stroke-opacity=".4" stroke-width="2"/><line x1="14" y1="40" x2="306" y2="40" stroke="currentColor" stroke-opacity=".3" stroke-width="1.5"/><circle cx="26" cy="28" r="3" fill="currentColor" fill-opacity=".4"/><circle cx="37" cy="28" r="3" fill="currentColor" fill-opacity=".4"/><circle cx="48" cy="28" r="3" fill="currentColor" fill-opacity=".4"/><text x="172" y="32" text-anchor="middle" font-size="10" class="mono" fill="var(--muted)">Connectivity Viewer</text><path d="M54,64 C95,70 120,90 146,100" fill="none" stroke="var(--neuron)" stroke-width="2.2" stroke-linecap="round"/><path d="M54,104 C90,104 118,104 145,104" fill="none" stroke="var(--dendrite)" stroke-width="2.2" stroke-linecap="round"/><path d="M54,144 C95,138 120,118 146,108" fill="none" stroke="var(--axon)" stroke-width="2.2" stroke-linecap="round"/><path d="M174,100 C200,90 235,70 266,64" fill="none" stroke="var(--dendrite)" stroke-width="2.2" stroke-linecap="round"/><path d="M175,104 C205,104 240,104 266,104" fill="none" stroke="var(--neuron)" stroke-width="2.2" stroke-linecap="round"/><path d="M174,108 C200,118 235,138 266,144" fill="none" stroke="var(--axon)" stroke-width="2.2" stroke-linecap="round"/><circle cx="48" cy="64" r="8" fill="var(--neuron)" fill-opacity=".3" stroke="var(--neuron)" stroke-width="2"/><circle cx="48" cy="104" r="8" fill="var(--dendrite)" fill-opacity=".3" stroke="var(--dendrite)" stroke-width="2"/><circle cx="48" cy="144" r="8" fill="var(--axon)" fill-opacity=".3" stroke="var(--axon)" stroke-width="2"/><circle cx="272" cy="64" r="8" fill="var(--dendrite)" fill-opacity=".3" stroke="var(--dendrite)" stroke-width="2"/><circle cx="272" cy="104" r="8" fill="var(--neuron)" fill-opacity=".3" stroke="var(--neuron)" stroke-width="2"/><circle cx="272" cy="144" r="8" fill="var(--axon)" fill-opacity=".3" stroke="var(--axon)" stroke-width="2"/><circle cx="160" cy="104" r="15" fill="var(--neuron)" fill-opacity=".3" stroke="var(--neuron)" stroke-width="2.4"/><circle cx="147" cy="97" r="3.2" fill="var(--synapse)"/><circle cx="146" cy="107" r="3.2" fill="var(--synapse)"/><circle cx="148" cy="115" r="3.2" fill="var(--synapse)"/><circle cx="173" cy="97" r="3.2" fill="var(--synapse)"/><circle cx="174" cy="107" r="3.2" fill="var(--synapse)"/><circle cx="172" cy="115" r="3.2" fill="var(--synapse)"/><circle cx="70" cy="174" r="4.5" fill="var(--neuron)" fill-opacity=".4" stroke="var(--neuron)" stroke-width="1.6"/><text x="80" y="178" font-size="9" class="mono" fill="var(--muted)">23P</text><circle cx="140" cy="174" r="4.5" fill="var(--dendrite)" fill-opacity=".4" stroke="var(--dendrite)" stroke-width="1.6"/><text x="150" y="178" font-size="9" class="mono" fill="var(--muted)">BC</text><circle cx="205" cy="174" r="4.5" fill="var(--axon)" fill-opacity=".4" stroke="var(--axon)" stroke-width="1.6"/><text x="215" y="178" font-size="9" class="mono" fill="var(--muted)">5P</text></svg></div>
    <div class="acg-eb" style="color:#526278">TOOLS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-connectivity-viewer" title="Link to this term">Connectivity Viewer</a></h3>
    <p class="acg-def">Dash app showing a cell's synaptic inputs/outputs grouped and colored by cell type.</p>
    </article>
    <article class="acg-card" id="term-connectome" data-cat="datasets" data-hay="connectome a wiring map of neurons and the synaptic connections between them. datasets &amp; scope ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="d3"><title id="d3">Connectome</title><g stroke="var(--axon)" stroke-width="2.2" stroke-linecap="round" fill="none"><line x1="93" y1="51.6" x2="192" y2="48.4"/><line x1="212.7" y1="58.5" x2="244.3" y2="101.5"/><line x1="240.8" y1="118.6" x2="179.2" y2="155.3"/><line x1="78.5" y1="135.7" x2="155.5" y2="158.3"/><line x1="77.8" y1="64.8" x2="68.2" y2="119.2"/><line x1="201" y1="60.4" x2="172" y2="149.6"/></g><g fill="var(--synapse)"><circle cx="192" cy="48.4" r="3.8"/><circle cx="244.3" cy="101.5" r="3.8"/><circle cx="179.2" cy="155.3" r="3.8"/><circle cx="155.5" cy="158.3" r="3.8"/><circle cx="68.2" cy="119.2" r="3.8"/><circle cx="172" cy="149.6" r="3.8"/></g><g fill="var(--neuron)" fill-opacity=".2" stroke="var(--neuron)" stroke-width="2.2"><circle cx="80" cy="52" r="13"/><circle cx="205" cy="48" r="13"/><circle cx="252" cy="112" r="13"/><circle cx="168" cy="162" r="13"/><circle cx="66" cy="132" r="13"/></g><circle cx="30" cy="180" r="3.8" fill="var(--synapse)"/><text x="39" y="183" font-size="9" fill="var(--muted)">synapse</text><line x1="96" y1="180" x2="118" y2="180" stroke="var(--axon)" stroke-width="2.2" stroke-linecap="round"/><text x="124" y="183" font-size="9" fill="var(--muted)">directed edge</text><circle cx="214" cy="180" r="6" fill="var(--neuron)" fill-opacity=".2" stroke="var(--neuron)" stroke-width="2"/><text x="224" y="183" font-size="9" fill="var(--muted)">neuron</text></svg></div>
    <div class="acg-eb" style="color:#0e7f8c">DATASETS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-connectome" title="Link to this term">Connectome</a></h3>
    <p class="acg-def">A wiring map of neurons and the synaptic connections between them.</p>
    </article>
    <article class="acg-card" id="term-container" data-cat="dataorg" data-hay="container there is no consistent use of this term. datasets, sessions &amp; files ">
    <div class="acg-eb" style="color:#3f3f46">DATA</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-container" title="Link to this term">Container</a></h3>
    <p class="acg-def">There is no consistent use of this term.</p>
    <div class="acg-meta"><span class="acg-chip acg-warn" title="This word means different things in different places">&#9888; ambiguous</span></div>
    </article>
    <article class="acg-card" id="term-context-block" data-cat="stimuli" data-hay="context block a ten-minute stretch in which only one modality is rewarded, signalled by instruction trials at its start. blocks alternate for six blocks in a session. stimuli &amp; behavioural tasks ">
    <div class="acg-eb" style="color:#a16207">STIMULUS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-context-block" title="Link to this term">Context block</a></h3>
    <p class="acg-def">A ten-minute stretch in which only one modality is rewarded, signalled by instruction trials at its start. Blocks alternate for six blocks in a session.</p>
    <div class="acg-meta"><span class="acg-chip acg-warn" title="This word means different things in different places">&#9888; ambiguous</span></div>
    </article>
    <article class="acg-card" id="term-coordinate-frames" data-cat="volume" data-hay="coordinate frames three systems: voxel (annotations), nanometer (mesh/skeleton vertices), transformed (pia-flattened microns). volume, voxels &amp; coordinates ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="cf-t"><title id="cf-t">Coordinate frames: voxel, nanometer, pia-flattened</title><path d="M80,104 C102,74 128,74 148,104" fill="none" stroke="currentColor" stroke-opacity=".7" stroke-width="2" stroke-linecap="round"/><path d="M141,100 L148,104 L149,96" fill="none" stroke="currentColor" stroke-opacity=".7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><text x="114" y="68" text-anchor="middle" font-size="10" class="mono" fill="var(--muted)">x [4,4,40] nm</text><path d="M186,104 C208,74 234,74 256,104" fill="none" stroke="currentColor" stroke-opacity=".7" stroke-width="2" stroke-linecap="round"/><path d="M249,100 L256,104 L257,96" fill="none" stroke="currentColor" stroke-opacity=".7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><text x="221" y="68" text-anchor="middle" font-size="10.5" fill="var(--muted)">transform</text><g stroke="currentColor" stroke-opacity=".85" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M52,118 H76"/><path d="M70,114 L76,118 L70,122"/><path d="M52,118 V142"/><path d="M48,136 L52,142 L56,136"/><path d="M52,118 L34,100"/><path d="M42,102 L34,100 L36,108"/></g><text x="80" y="122" font-size="10" class="mono" fill="var(--faint)">x</text><text x="44" y="153" font-size="10" class="mono" fill="var(--faint)">y</text><text x="26" y="98" font-size="10" class="mono" fill="var(--faint)">z</text><g stroke="currentColor" stroke-opacity=".85" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M158,118 H182"/><path d="M176,114 L182,118 L176,122"/><path d="M158,118 V142"/><path d="M154,136 L158,142 L162,136"/><path d="M158,118 L140,100"/><path d="M148,102 L140,100 L142,108"/></g><text x="186" y="122" font-size="10" class="mono" fill="var(--faint)">x</text><text x="150" y="153" font-size="10" class="mono" fill="var(--faint)">y</text><text x="132" y="98" font-size="10" class="mono" fill="var(--faint)">z</text><g stroke="currentColor" stroke-opacity=".85" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M262,118 H286"/><path d="M280,114 L286,118 L280,122"/><path d="M262,118 V94"/><path d="M258,100 L262,94 L266,100"/><path d="M262,118 L244,100"/><path d="M252,102 L244,100 L246,108"/></g><text x="290" y="122" font-size="10" class="mono" fill="var(--faint)">x</text><text x="250" y="90" font-size="10" class="mono" fill="var(--faint)">y</text><text x="236" y="98" font-size="10" class="mono" fill="var(--faint)">z</text><text x="52" y="168" text-anchor="middle" font-size="11" fill="var(--muted)">voxel</text><text x="158" y="168" text-anchor="middle" font-size="11" fill="var(--muted)">nm</text><text x="262" y="168" text-anchor="middle" font-size="11" fill="var(--accent-ink)" font-weight="600">pia-flat</text><text x="52" y="184" text-anchor="middle" font-size="9" class="mono" fill="var(--faint)">[i,j,k]</text><text x="158" y="184" text-anchor="middle" font-size="9" class="mono" fill="var(--faint)">[x,y,z]</text><text x="262" y="184" text-anchor="middle" font-size="9" class="mono" fill="var(--faint)">[u,v,d]</text></svg></div>
    <div class="acg-eb" style="color:#2f6fd0">VOLUME</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-coordinate-frames" title="Link to this term">Coordinate frames</a></h3>
    <p class="acg-def">Three systems: voxel (annotations), nanometer (mesh/skeleton vertices), transformed (pia-flattened microns).</p>
    </article>
    <article class="acg-card" id="term-coregistration" data-cat="functional" data-hay="coregistration aligning functionally-imaged cells to the same cells in the em volume (manual + automatic). functional data &amp; coregistration ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="coreg-t"><title id="coreg-t">Coregistration</title><circle cx="70" cy="98" r="30" fill="var(--accent)" fill-opacity=".15" stroke="var(--accent)" stroke-width="2.4"/><path d="M50,100 h7 l4,-14 5,26 4,-16 3,6 h7" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><text x="70" y="150" text-anchor="middle" font-size="10.5" fill="var(--muted)">calcium ROI</text><polygon points="272,74 294,90 286,116 258,116 250,90" fill="var(--neuron)" fill-opacity=".15" stroke="var(--neuron)" stroke-width="2.4" stroke-linejoin="round"/><path d="M272,74 L272,58" stroke="var(--dendrite)" stroke-width="2.2" stroke-linecap="round"/><circle cx="272" cy="97" r="4" fill="var(--neuron)"/><text x="272" y="150" text-anchor="middle" font-size="10.5" fill="var(--muted)">EM soma</text><line x1="102" y1="98" x2="242" y2="98" stroke="currentColor" stroke-opacity=".5" stroke-width="2" stroke-dasharray="6 5" stroke-linecap="round"/><text x="172" y="90" text-anchor="middle" font-size="10.5" class="mono" fill="var(--accent-ink)">match</text><circle cx="172" cy="116" r="13" fill="var(--surface)" stroke="var(--ok)" stroke-width="2.4"/><path d="M165,116 l5,5 8,-10" fill="none" stroke="var(--ok)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><text x="172" y="146" text-anchor="middle" font-size="9" fill="var(--ok)">agree</text></svg></div>
    <div class="acg-eb" style="color:#9a5b12">FUNCTION</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-coregistration" title="Link to this term">Coregistration</a></h3>
    <p class="acg-def">Aligning functionally-imaged cells to the same cells in the EM volume (manual + automatic).</p>
    </article>
    <article class="acg-card" id="term-cre-line" data-cat="genetics" data-hay="cre line cre recombinase catalyses recombination between loxp sites. paired with a loxp reporter line it drives the reporter's expression, and because cre is expressed within a specific gene the expression is restricted to a subset of cells. genetic &amp; optical tools ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="cre-t"><title id="cre-t">Cre line drives a loxP reporter</title> <g stroke="currentColor" stroke-opacity=".45" stroke-width="2" stroke-linecap="round"><path d="M20,58 H300"/><path d="M20,138 H300"/></g> <g fill="var(--accent)" fill-opacity=".35" stroke="var(--accent)" stroke-width="1.6" stroke-linejoin="round"> <polygon points="86,50 100,58 86,66"/><polygon points="176,50 190,58 176,66"/><polygon points="130,130 144,138 130,146"/></g> <g fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".5" stroke-width="1.8"> <rect x="106" y="46" width="64" height="24" rx="4"/><rect x="200" y="46" width="80" height="24" rx="4"/></g> <g text-anchor="middle" font-size="10" class="mono" fill="var(--muted)"> <text x="138" y="63">STOP</text><text x="240" y="63">reporter</text></g> <g text-anchor="middle" font-size="9" class="mono" fill="var(--faint)"> <text x="93" y="38">loxP</text><text x="183" y="38">loxP</text></g> <path d="M138,80 V104" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"/> <polygon points="138,110 133,101 143,101" fill="var(--accent)"/> <text x="152" y="98" font-size="11" fill="var(--accent-ink)" font-weight="600">Cre</text> <rect x="200" y="126" width="80" height="24" rx="4" fill="var(--accent)" fill-opacity=".2" stroke="var(--accent)" stroke-width="2.2"/> <text x="240" y="143" text-anchor="middle" font-size="10" class="mono" fill="var(--accent-ink)" font-weight="600">reporter</text> <text x="88" y="143" text-anchor="middle" font-size="9" fill="var(--faint)">STOP excised</text> <text x="160" y="178" text-anchor="middle" font-size="9.5" fill="var(--muted)">only in Cre+ cells</text> </svg></div>
    <div class="acg-eb" style="color:#15803d">GENETIC</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-cre-line" title="Link to this term">Cre line</a></h3>
    <p class="acg-def">Cre recombinase catalyses recombination between loxP sites. Paired with a loxP reporter line it drives the reporter's expression, and because Cre is expressed within a specific gene the expression is restricted to a subset of cells.</p>
    </article>
    <article class="acg-card" id="term-ctr-pt-position" data-cat="connectivity" data-hay="ctr_pt_position the synapse-junction center point (not root-id-bound). connectivity &amp; synapses ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="cpp-t"><title id="cpp-t">ctr_pt_position — synapse center point</title><path d="M30,64 C84,72 122,96 150,104" fill="none" stroke="var(--axon)" stroke-width="2.6" stroke-linecap="round"/><path d="M290,144 C238,136 200,112 170,104" fill="none" stroke="var(--dendrite)" stroke-width="2.6" stroke-linecap="round"/><text x="40" y="52" font-size="9.5" class="mono" fill="var(--axon)">axon</text><text x="280" y="160" text-anchor="end" font-size="9.5" class="mono" fill="var(--dendrite)">dendrite</text><line x1="146" y1="104" x2="174" y2="104" stroke="var(--synapse)" stroke-width="1.5" stroke-linecap="round" stroke-opacity=".5"/><line x1="160" y1="90" x2="160" y2="118" stroke="var(--synapse)" stroke-width="1.5" stroke-linecap="round" stroke-opacity=".5"/><circle cx="160" cy="104" r="6.5" fill="var(--synapse)"/><line x1="160" y1="112" x2="160" y2="136" stroke="var(--synapse)" stroke-width="1.4" stroke-linecap="round" stroke-opacity=".45"/><text x="160" y="152" text-anchor="middle" font-size="11" class="mono" fill="var(--synapse)">ctr_pt_position</text><text x="160" y="167" text-anchor="middle" font-size="9.5" fill="var(--muted)">synapse centroid, not root-bound</text></svg></div>
    <div class="acg-eb" style="color:#d1462c">CONNECT</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-ctr-pt-position" title="Link to this term">ctr_pt_position</a></h3>
    <p class="acg-def">The synapse-junction center point (not root-id-bound).</p>
    </article>
    <article class="acg-card" id="term-current-source-density" data-cat="signals" data-hay="current source density (csd) the second spatial derivative of the lfp along the probe, which localises current sinks and sources and so the laminar position of synaptic input. signals &amp; preprocessing ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="csd-t"><title id="csd-t">Current source density along the probe</title> <g fill="none" stroke="currentColor" stroke-opacity=".55" stroke-width="1.6" stroke-linecap="round"> <path d="M40,34 C60,34 66,28 78,34 S104,38 126,34"/> <path d="M40,62 C60,62 68,54 80,62 S104,68 126,62"/> <path d="M40,90 C60,90 70,72 84,90 S104,100 126,90"/> <path d="M40,118 C60,118 70,136 84,118 S104,110 126,118"/> <path d="M40,146 C60,146 68,152 80,146 S104,142 126,146"/></g> <text x="83" y="166" text-anchor="middle" font-size="10.5" fill="var(--muted)">LFP by depth</text> <path d="M140,90 H168" stroke="currentColor" stroke-opacity=".5" stroke-width="1.8" stroke-linecap="round"/><polygon points="174,90 166,86 166,94" fill="currentColor" fill-opacity=".5"/> <text x="157" y="80" text-anchor="middle" font-size="9" class="mono" fill="var(--faint)">d2/dz2</text> <rect x="192" y="26" width="72" height="128" rx="4" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".4" stroke-width="1.6"/> <rect x="192" y="42" width="72" height="22" fill="currentColor" fill-opacity=".18"/> <rect x="192" y="80" width="72" height="26" fill="var(--accent)" fill-opacity=".35"/> <rect x="192" y="122" width="72" height="20" fill="currentColor" fill-opacity=".12"/> <text x="270" y="57" font-size="10" fill="var(--muted)">source</text> <text x="270" y="97" font-size="10" fill="var(--accent-ink)" font-weight="600">sink</text> <text x="270" y="137" font-size="10" fill="var(--muted)">source</text> <text x="228" y="176" text-anchor="middle" font-size="9" fill="var(--faint)">sink marks synaptic input</text> <text x="184" y="26" text-anchor="end" font-size="9" fill="var(--faint)">pia</text> </svg></div>
    <div class="acg-eb" style="color:#0369a1">SIGNAL</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-current-source-density" title="Link to this term">Current source density (CSD)</a></h3>
    <p class="acg-def">The second spatial derivative of the LFP along the probe, which localises current sinks and sources and so the laminar position of synaptic input.</p>
    </article>
    <article class="acg-card" id="term-d-prime-unit" data-cat="quality" data-hay="d_prime (unit) separability of this unit's waveforms from its neighbours', by linear discriminant analysis. higher is better. not the behavioural d-prime. quality metrics ">
    <div class="acg-eb" style="color:#4338ca">QUALITY</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-d-prime-unit" title="Link to this term">d_prime (unit)</a></h3>
    <p class="acg-def">Separability of this unit's waveforms from its neighbours', by linear discriminant analysis. Higher is better. Not the behavioural d-prime.</p>
    <div class="acg-meta"><span class="acg-chip acg-warn" title="This word means different things in different places">&#9888; ambiguous</span></div>
    </article>
    <article class="acg-card" id="term-d-prime-behavior" data-cat="stimuli" data-hay="d-prime (behavioural) signal-detection sensitivity for the task: how far the hit rate exceeds the false-alarm rate. not the unit quality metric of the same name. stimuli &amp; behavioural tasks ">
    <div class="acg-eb" style="color:#a16207">STIMULUS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-d-prime-behavior" title="Link to this term">d-prime (behavioural)</a></h3>
    <p class="acg-def">Signal-detection sensitivity for the task: how far the hit rate exceeds the false-alarm rate. Not the unit quality metric of the same name.</p>
    <div class="acg-meta"><span class="acg-chip acg-warn" title="This word means different things in different places">&#9888; ambiguous</span></div>
    </article>
    <article class="acg-card" id="term-dash-web-apps" data-cat="tools" data-hay="dash web apps plotly-dash apps (table viewer, connectivity viewer) for fast querying + neuroglancer-link generation. visualisation tools ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="dw-t"><title id="dw-t">Dash web apps</title><rect x="20" y="24" width="120" height="74" rx="8" fill="var(--surface-2)" fill-opacity=".6" stroke="currentColor" stroke-opacity=".45" stroke-width="2"/><line x1="20" y1="44" x2="140" y2="44" stroke="currentColor" stroke-opacity=".3" stroke-width="1.5"/><text x="80" y="38" text-anchor="middle" font-size="9.5" class="mono" fill="var(--muted)">Table Viewer</text><line x1="34" y1="58" x2="126" y2="58" stroke="currentColor" stroke-opacity=".45" stroke-width="2"/><line x1="34" y1="70" x2="126" y2="70" stroke="currentColor" stroke-opacity=".25" stroke-width="2"/><line x1="34" y1="82" x2="126" y2="82" stroke="currentColor" stroke-opacity=".25" stroke-width="2"/><line x1="64" y1="52" x2="64" y2="90" stroke="currentColor" stroke-opacity=".25" stroke-width="1.5"/><line x1="96" y1="52" x2="96" y2="90" stroke="currentColor" stroke-opacity=".25" stroke-width="1.5"/><rect x="180" y="24" width="120" height="74" rx="8" fill="var(--surface-2)" fill-opacity=".6" stroke="currentColor" stroke-opacity=".45" stroke-width="2"/><line x1="180" y1="44" x2="300" y2="44" stroke="currentColor" stroke-opacity=".3" stroke-width="1.5"/><text x="240" y="38" text-anchor="middle" font-size="8.5" class="mono" fill="var(--muted)">Connectivity Viewer</text><circle cx="240" cy="74" r="6" fill="var(--neuron)" fill-opacity=".3" stroke="var(--neuron)" stroke-width="2"/><line x1="235" y1="70" x2="221" y2="62" stroke="var(--dendrite)" stroke-width="2" stroke-linecap="round"/><line x1="245" y1="70" x2="259" y2="62" stroke="var(--axon)" stroke-width="2" stroke-linecap="round"/><line x1="235" y1="79" x2="222" y2="88" stroke="var(--synapse)" stroke-width="2" stroke-linecap="round"/><line x1="245" y1="79" x2="258" y2="88" stroke="var(--axon)" stroke-width="2" stroke-linecap="round"/><circle cx="219" cy="61" r="3" fill="var(--dendrite)"/><circle cx="261" cy="61" r="3" fill="var(--axon)"/><circle cx="220" cy="90" r="3" fill="var(--synapse)"/><circle cx="260" cy="90" r="3" fill="var(--axon)"/><path d="M80,98 C80,124 108,132 126,146" fill="none" stroke="currentColor" stroke-opacity=".5" stroke-width="2" stroke-linecap="round"/><polygon points="121,140 131,142 125,150" fill="currentColor" fill-opacity=".5"/><path d="M240,98 C240,124 212,132 194,146" fill="none" stroke="currentColor" stroke-opacity=".5" stroke-width="2" stroke-linecap="round"/><polygon points="189,142 199,140 195,150" fill="currentColor" fill-opacity=".5"/><rect x="100" y="150" width="120" height="30" rx="15" fill="var(--accent)" fill-opacity=".18" stroke="var(--accent)" stroke-width="2"/><text x="160" y="169" text-anchor="middle" font-size="11" class="mono" fill="var(--accent-ink)">Neuroglancer</text><line x1="118" y1="172" x2="202" y2="172" stroke="var(--accent-ink)" stroke-opacity=".5" stroke-width="1.2"/></svg></div>
    <div class="acg-eb" style="color:#526278">TOOLS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-dash-web-apps" title="Link to this term">Dash web apps</a></h3>
    <p class="acg-def">Plotly-Dash apps (Table Viewer, Connectivity Viewer) for fast querying + Neuroglancer-link generation.</p>
    </article>
    <article class="acg-card" id="term-datastack" data-cat="cave" data-hay="datastack a named bundle of imagery + segmentation + annotation db (minnie65_public, v1dd_public). cave — access &amp; versioning ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="cave-ds"><title id="cave-ds">Datastack</title>
<polygon points="62,58 182,58 208,44 88,44" fill="var(--scaffold)" fill-opacity=".3" stroke="currentColor" stroke-opacity=".55" stroke-width="2" stroke-linejoin="round"/>
<polygon points="182,58 208,44 208,66 182,80" fill="var(--scaffold)" fill-opacity=".1" stroke="currentColor" stroke-opacity=".55" stroke-width="2" stroke-linejoin="round"/>
<rect x="62" y="58" width="120" height="22" fill="var(--scaffold)" fill-opacity=".18" stroke="currentColor" stroke-opacity=".55" stroke-width="2"/>
<text x="122" y="73" text-anchor="middle" font-size="10" class="mono" fill="var(--muted)">imagery</text>
<polygon points="62,96 182,96 208,82 88,82" fill="var(--neuron)" fill-opacity=".3" stroke="currentColor" stroke-opacity=".55" stroke-width="2" stroke-linejoin="round"/>
<polygon points="182,96 208,82 208,104 182,118" fill="var(--neuron)" fill-opacity=".1" stroke="currentColor" stroke-opacity=".55" stroke-width="2" stroke-linejoin="round"/>
<rect x="62" y="96" width="120" height="22" fill="var(--neuron)" fill-opacity=".18" stroke="currentColor" stroke-opacity=".55" stroke-width="2"/>
<text x="122" y="111" text-anchor="middle" font-size="10" class="mono" fill="var(--muted)">segmentation</text>
<polygon points="62,134 182,134 208,120 88,120" fill="var(--synapse)" fill-opacity=".3" stroke="currentColor" stroke-opacity=".55" stroke-width="2" stroke-linejoin="round"/>
<polygon points="182,134 208,120 208,142 182,156" fill="var(--synapse)" fill-opacity=".1" stroke="currentColor" stroke-opacity=".55" stroke-width="2" stroke-linejoin="round"/>
<rect x="62" y="134" width="120" height="22" fill="var(--synapse)" fill-opacity=".18" stroke="currentColor" stroke-opacity=".55" stroke-width="2"/>
<text x="122" y="149" text-anchor="middle" font-size="10" class="mono" fill="var(--muted)">annotations</text>
<path d="M222,44 H234 V156 H222" fill="none" stroke="currentColor" stroke-opacity=".55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<text transform="translate(252,100) rotate(-90)" text-anchor="middle" font-size="12" class="mono" fill="var(--accent-ink)" font-weight="600">datastack</text>
</svg></div>
    <div class="acg-eb" style="color:#0f766e">CAVE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-datastack" title="Link to this term">Datastack</a></h3>
    <p class="acg-def">A named bundle of imagery + segmentation + annotation DB (<code>minnie65_public</code>, <code>v1dd_public</code>).</p>
    </article>
    <article class="acg-card" id="term-decoder-label" data-cat="quality" data-hay="decoder_label the pipeline's automated call on what a unit is — sua for a single unit, and so on — with decoder_probability as its confidence. quality metrics ">
    <div class="acg-eb" style="color:#4338ca">QUALITY</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-decoder-label" title="Link to this term">decoder_label</a></h3>
    <p class="acg-def">The pipeline's automated call on what a unit is — <code>sua</code> for a single unit, and so on — with <code>decoder_probability</code> as its confidence.</p>
    </article>
    <article class="acg-card" id="term-default-filters" data-cat="quality" data-hay="default quality filtering visual coding applies isi_violations, amplitude_cutoff and presence_ratio filters by default; visual behavior neuropixels returns every unit unfiltered. same sdk, opposite defaults — check which you are holding. quality metrics ">
    <div class="acg-eb" style="color:#4338ca">QUALITY</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-default-filters" title="Link to this term">Default quality filtering</a></h3>
    <p class="acg-def">Visual Coding applies <code>isi_violations</code>, <code>amplitude_cutoff</code> and <code>presence_ratio</code> filters by default; Visual Behavior Neuropixels returns every unit unfiltered. Same SDK, opposite defaults — check which you are holding.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="physiology/ephys/visual-coding/vcnp-quality-metrics.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-default-qc" data-cat="quality" data-hay="default_qc a single pass/fail flag summarising the pipeline's quality criteria for a unit, in the aind-packaged datasets. quality metrics ">
    <div class="acg-eb" style="color:#4338ca">QUALITY</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-default-qc" title="Link to this term">default_qc</a></h3>
    <p class="acg-def">A single pass/fail flag summarising the pipeline's quality criteria for a unit, in the AIND-packaged datasets.</p>
    </article>
    <article class="acg-card" id="term-depth-pia-wm-axis" data-cat="volume" data-hay="depth / pia→wm axis y increases with cortical depth, so depth plots need ax.invert_yaxis(). volume, voxels &amp; coordinates ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="depth-t"><title id="depth-t">Depth axis: pia at top, white matter at bottom, y increases downward</title><rect x="118" y="32" width="46" height="140" fill="var(--scaffold)" fill-opacity=".14" stroke="currentColor" stroke-opacity=".6" stroke-width="2"/><g stroke="currentColor" stroke-opacity=".25" stroke-width="1.5"><path d="M118,62 H164"/><path d="M118,92 H164"/><path d="M118,122 H164"/><path d="M118,152 H164"/></g><text x="141" y="26" text-anchor="middle" font-size="11" fill="var(--muted)">pia</text><text x="141" y="186" text-anchor="middle" font-size="11" fill="var(--muted)">white matter</text><path d="M90,32 V170" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M84,162 L90,172 L96,162" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><text x="76" y="30" font-size="10" class="mono" fill="var(--muted)">0</text><text transform="translate(70,102) rotate(-90)" text-anchor="middle" font-size="12" class="mono" fill="var(--accent-ink)" font-weight="600">+y</text><text x="180" y="96" font-size="10.5" fill="var(--muted)">y increases</text><text x="180" y="110" font-size="10.5" fill="var(--muted)">downward</text><text x="180" y="130" font-size="10" class="mono" fill="var(--faint)">invert_yaxis</text></svg></div>
    <div class="acg-eb" style="color:#2f6fd0">VOLUME</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-depth-pia-wm-axis" title="Link to this term">Depth / pia→WM axis</a></h3>
    <p class="acg-def">y increases with cortical depth, so depth plots need <code>ax.invert_yaxis()</code>.</p>
    </article>
    <article class="acg-card" id="term-digital-twin" data-cat="functional" data-hay="digital twin a dnn trained to predict a cell's response to arbitrary stimuli (source of derived functional properties). functional data &amp; coregistration ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="dtwin-t"><title id="dtwin-t">Digital twin</title><rect x="22" y="70" width="54" height="54" rx="6" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".55" stroke-width="2"/><path d="M33,74 v46 M45,74 v46 M57,74 v46 M69,74 v46" stroke="currentColor" stroke-opacity=".45" stroke-width="4"/><text x="49" y="150" text-anchor="middle" font-size="10.5" fill="var(--muted)">stimulus</text><line x1="80" y1="97" x2="110" y2="97" stroke="currentColor" stroke-opacity=".6" stroke-width="2" stroke-linecap="round"/><polygon points="116,97 108,93 108,101" fill="currentColor" fill-opacity=".6"/><rect x="120" y="62" width="82" height="70" rx="9" fill="var(--surface-2)" stroke="var(--accent)" stroke-width="2.4"/><rect x="132" y="76" width="12" height="42" rx="4" fill="var(--accent)" fill-opacity=".8"/><rect x="155" y="76" width="12" height="42" rx="4" fill="var(--accent)" fill-opacity=".5"/><rect x="178" y="76" width="12" height="42" rx="4" fill="var(--accent)" fill-opacity=".3"/><text x="161" y="150" text-anchor="middle" font-size="11" class="mono" fill="var(--accent-ink)" font-weight="600">DNN</text><line x1="206" y1="97" x2="234" y2="97" stroke="currentColor" stroke-opacity=".6" stroke-width="2" stroke-linecap="round"/><polygon points="240,97 232,93 232,101" fill="currentColor" fill-opacity=".6"/><line x1="246" y1="118" x2="246" y2="72" stroke="currentColor" stroke-opacity=".35" stroke-width="1.6"/><line x1="246" y1="118" x2="302" y2="118" stroke="currentColor" stroke-opacity=".35" stroke-width="1.6"/><path d="M248,116 L262,116 C268,116 267,80 274,80 C281,80 280,116 288,116 L300,116" fill="none" stroke="var(--neuron)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><text x="274" y="150" text-anchor="middle" font-size="10" fill="var(--muted)">predicted</text><text x="274" y="163" text-anchor="middle" font-size="10" fill="var(--muted)">response</text></svg></div>
    <div class="acg-eb" style="color:#9a5b12">FUNCTION</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-digital-twin" title="Link to this term">Digital twin</a></h3>
    <p class="acg-def">A DNN trained to predict a cell's response to arbitrary stimuli (source of derived functional properties).</p>
    </article>
    <article class="acg-card" id="term-direct-vs-indirect" data-cat="genetics" data-hay="direct vs indirect activation the central pitfall of optotagging: a neuron may respond to the laser because it expresses the opsin, or because a neuron that does synapses onto it. direct responses are short-latency (&lt;10 ms), reliable across pulses, and tightly distributed in time. genetic &amp; optical tools ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="dvi-t"><title id="dvi-t">Direct versus indirect optotagging responses</title> <rect x="26" y="34" width="6" height="102" rx="2" fill="var(--accent)" fill-opacity=".45"/> <rect x="186" y="34" width="6" height="102" rx="2" fill="var(--accent)" fill-opacity=".45"/> <g fill="var(--accent)"> <circle cx="52" cy="44" r="2.4"/><circle cx="55" cy="58" r="2.4"/><circle cx="51" cy="72" r="2.4"/><circle cx="54" cy="86" r="2.4"/><circle cx="52" cy="100" r="2.4"/><circle cx="53" cy="114" r="2.4"/><circle cx="51" cy="128" r="2.4"/><circle cx="59" cy="72" r="2.4"/></g> <g fill="currentColor" fill-opacity=".6"> <circle cx="228" cy="44" r="2.4"/><circle cx="246" cy="58" r="2.4"/><circle cx="222" cy="86" r="2.4"/><circle cx="256" cy="100" r="2.4"/><circle cx="238" cy="128" r="2.4"/><circle cx="264" cy="72" r="2.4"/><circle cx="212" cy="114" r="2.4"/></g> <g stroke="currentColor" stroke-opacity=".3" stroke-width="1.6" stroke-linecap="round"><path d="M26,142 H150"/><path d="M186,142 H310"/></g> <text x="88" y="26" text-anchor="middle" font-size="11" fill="var(--accent-ink)" font-weight="600">direct</text> <text x="248" y="26" text-anchor="middle" font-size="11" fill="var(--muted)">indirect</text> <text x="88" y="162" text-anchor="middle" font-size="9" fill="var(--faint)">under 10 ms, low jitter</text> <text x="248" y="162" text-anchor="middle" font-size="9" fill="var(--faint)">later, scattered</text> <text x="88" y="178" text-anchor="middle" font-size="9" fill="var(--faint)">every pulse</text> <text x="248" y="178" text-anchor="middle" font-size="9" fill="var(--faint)">via a synapse</text> </svg></div>
    <div class="acg-eb" style="color:#15803d">GENETIC</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-direct-vs-indirect" title="Link to this term">Direct vs indirect activation</a></h3>
    <p class="acg-def">The central pitfall of optotagging: a neuron may respond to the laser because it expresses the opsin, or because a neuron that does synapses onto it. Direct responses are short-latency (&lt;10 ms), reliable across pulses, and tightly distributed in time.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="background/Optotagging.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-distance" data-cat="dataorg" data-hay="distance four geometric senses and two statistical ones are in routine use, and they give different answers for the same pair of points. datasets, sessions &amp; files ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="dist-t"><title id="dist-t">Distance: several senses for the same pair of points</title><path d="M20,30 H306" stroke="var(--scaffold)" stroke-width="2.4" stroke-linecap="round"/><text x="20" y="24" font-size="9.5" fill="var(--faint)">pia</text><path d="M60,132 V32 M250,64 V32" stroke="currentColor" stroke-opacity=".3" stroke-width="1.4" stroke-dasharray="4 4"/><text x="272" y="50" text-anchor="middle" font-size="9.5" fill="var(--muted)">depth</text><path d="M60,140 C82,178 128,170 148,140 C170,108 202,116 244,68" fill="none" stroke="var(--dendrite)" stroke-width="2.4" stroke-linecap="round"/><path d="M60,140 L250,64" stroke="var(--accent)" stroke-width="2.2" stroke-dasharray="6 4" stroke-linecap="round"/><circle cx="60" cy="140" r="9" fill="var(--neuron)" fill-opacity=".25" stroke="var(--neuron)" stroke-width="2.2"/><circle cx="250" cy="64" r="9" fill="var(--neuron)" fill-opacity=".25" stroke="var(--neuron)" stroke-width="2.2"/><text x="176" y="118" text-anchor="middle" font-size="10.5" fill="var(--accent-ink)" font-weight="600">euclidean</text><text x="120" y="172" text-anchor="middle" font-size="10.5" fill="var(--muted)">along the arbor</text><text x="160" y="192" text-anchor="middle" font-size="9.5" fill="var(--faint)">same pair, different answers</text></svg></div>
    <div class="acg-eb" style="color:#3f3f46">DATA</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-distance" title="Link to this term">Distance</a></h3>
    <p class="acg-def">Four geometric senses and two statistical ones are in routine use, and they give different answers for the same pair of points.</p>
    <div class="acg-meta"><span class="acg-chip acg-warn" title="This word means different things in different places">&#9888; ambiguous</span></div>
    </article>
    <article class="acg-card" id="term-drift-metrics" data-cat="quality" data-hay="drift metrics max_drift and cumulative_drift record how far, in µm, a unit's spikes moved along the probe during the session. newer pipelines add activity_drift and drift_ptp. quality metrics ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="drm-t"><title id="drm-t">Drift metrics: extent versus total path of unit position</title><path d="M44,36 V158 H302" fill="none" stroke="currentColor" stroke-opacity=".4" stroke-width="1.6" stroke-linecap="round"/><path d="M50,58 H278 M50,134 H278" stroke="currentColor" stroke-opacity=".28" stroke-width="1.4" stroke-dasharray="4 4"/><path d="M50,132 C74,128 88,112 108,114 C132,116 142,88 166,82 C188,76 198,98 216,94 C238,90 252,66 276,60" fill="none" stroke="var(--neuron)" stroke-width="2.4" stroke-linecap="round"/><g stroke="var(--accent)" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M290,58 V134"/><path d="M286,64 L290,58 L294,64"/><path d="M286,128 L290,134 L294,128"/></g><text x="286" y="48" text-anchor="end" font-size="9.5" class="mono" fill="var(--accent-ink)" font-weight="600">max_drift</text><text x="34" y="42" text-anchor="end" font-size="9.5" class="mono" fill="var(--faint)">µm</text><text x="302" y="176" text-anchor="end" font-size="10" fill="var(--muted)">session time</text><text x="44" y="192" font-size="9.5" class="mono" fill="var(--faint)">cumulative_drift = length of the path</text></svg></div>
    <div class="acg-eb" style="color:#4338ca">QUALITY</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-drift-metrics" title="Link to this term">Drift metrics</a></h3>
    <p class="acg-def"><code>max_drift</code> and <code>cumulative_drift</code> record how far, in µm, a unit's spikes moved along the probe during the session. Newer pipelines add <code>activity_drift</code> and <code>drift_ptp</code>.</p>
    <div class="acg-meta"><span class="acg-chip acg-warn" title="This word means different things in different places">&#9888; ambiguous</span></div>
    </article>
    <article class="acg-card" id="term-drifting-gratings" data-cat="stimuli" data-hay="drifting gratings a full-field sinusoidal grating moving orthogonal to its own orientation. parameters: orientation and direction (degrees), temporal frequency (hz), spatial frequency (cycles/deg), contrast. typically 2 s on, 1 s grey. stimuli &amp; behavioural tasks ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="dgr-t"><title id="dgr-t">Drifting grating: bars move orthogonal to their orientation</title><clipPath id="dgr-c"><circle cx="98" cy="96" r="62"/></clipPath><circle cx="98" cy="96" r="62" fill="var(--surface-2)"/><g clip-path="url(#dgr-c)" transform="rotate(-30 98 96)"><path d="M10,8h11v184h-11zM34,8h11v184h-11zM58,8h11v184h-11zM82,8h11v184h-11zM106,8h11v184h-11zM130,8h11v184h-11zM154,8h11v184h-11zM178,8h11v184h-11zM202,8h11v184h-11zM226,8h11v184h-11zM250,8h11v184h-11zM274,8h11v184h-11zM298,8h11v184h-11zM322,8h11v184h-11z" fill="currentColor" fill-opacity=".35"/></g><circle cx="98" cy="96" r="62" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="2"/><g stroke="var(--accent)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M72,110 L124,82"/><path d="M115,78 L124,82 L120,91"/></g><text x="166" y="58" font-size="10" fill="var(--accent-ink)" font-weight="600">direction</text><path d="M52,52 L144,140" stroke="currentColor" stroke-opacity=".45" stroke-width="1.6" stroke-dasharray="4 4"/><text x="150" y="178" text-anchor="end" font-size="10" fill="var(--muted)">orientation</text><g class="mono" font-size="10" fill="var(--muted)"><text x="192" y="92">TF  Hz</text><text x="192" y="110">SF  cyc/deg</text><text x="192" y="128">contrast</text></g><rect x="192" y="158" width="66" height="12" rx="3" fill="currentColor" fill-opacity=".3"/><rect x="258" y="158" width="34" height="12" rx="3" fill="none" stroke="currentColor" stroke-opacity=".35" stroke-width="1.6"/><text x="225" y="188" text-anchor="middle" font-size="9" fill="var(--faint)">2 s on</text><text x="275" y="188" text-anchor="middle" font-size="9" fill="var(--faint)">1 s</text></svg></div>
    <div class="acg-eb" style="color:#a16207">STIMULUS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-drifting-gratings" title="Link to this term">Drifting gratings</a></h3>
    <p class="acg-def">A full-field sinusoidal grating moving orthogonal to its own orientation. Parameters: orientation and direction (degrees), temporal frequency (Hz), spatial frequency (cycles/deg), contrast. Typically 2 s on, 1 s grey.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="physiology/stimuli/passive-visual-stimuli/visual-stimuli-list.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-driver-line" data-cat="genetics" data-hay="driver line a transgenic line engineered to label a specific cell population by expressing a gene under that population's promoter. the driver line determines which cells are targeted; the reporter line determines what is expressed in them. genetic &amp; optical tools ">
    <div class="acg-eb" style="color:#15803d">GENETIC</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-driver-line" title="Link to this term">Driver line</a></h3>
    <p class="acg-def">A transgenic line engineered to label a specific cell population by expressing a gene under that population's promoter. The driver line determines which cells are targeted; the reporter line determines what is expressed in them.</p>
    </article>
    <article class="acg-card" id="term-dsi" data-cat="functional" data-hay="dsi direction selectivity index (0–1). functional data &amp; coregistration ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="dsi-t"><title id="dsi-t">DSI</title><circle cx="176" cy="100" r="70" fill="none" stroke="currentColor" stroke-opacity=".2" stroke-width="1.4"/><circle cx="176" cy="100" r="46" fill="none" stroke="currentColor" stroke-opacity=".2" stroke-width="1.4"/><circle cx="176" cy="100" r="22" fill="none" stroke="currentColor" stroke-opacity=".2" stroke-width="1.4"/><line x1="102" y1="100" x2="250" y2="100" stroke="currentColor" stroke-opacity=".28" stroke-width="1.4"/><line x1="176" y1="26" x2="176" y2="174" stroke="currentColor" stroke-opacity=".28" stroke-width="1.4"/><path d="M176,100 C186,62 232,60 238,100 C232,140 186,138 176,100 Z" fill="var(--accent)" fill-opacity=".2" stroke="var(--accent)" stroke-width="2.4" stroke-linejoin="round"/><path d="M176,100 C173,88 154,86 148,100 C154,114 173,112 176,100 Z" fill="var(--accent)" fill-opacity=".12" stroke="var(--accent)" stroke-width="2" stroke-linejoin="round"/><text x="20" y="30" font-size="14" class="mono" fill="var(--accent-ink)" font-weight="600">DSI</text><text x="176" y="192" text-anchor="middle" font-size="10" fill="var(--muted)">one dominant direction</text></svg></div>
    <div class="acg-eb" style="color:#9a5b12">FUNCTION</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-dsi" title="Link to this term">DSI</a></h3>
    <p class="acg-def">Direction selectivity index (0–1).</p>
    </article>
    <article class="acg-card" id="term-dynamic-foraging" data-cat="stimuli" data-hay="dynamic foraging task two choices, binary reward, and reward probabilities that change during the session. a go cue opens a short window in which the mouse licks left or right; the mouse must learn from recent outcomes to track the better side. stimuli &amp; behavioural tasks ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="dfg-t"><title id="dfg-t">Dynamic foraging: reward probabilities switch mid-session</title><text x="26" y="30" font-size="10" fill="var(--muted)">reward prob.</text><path d="M26,96 H294" stroke="currentColor" stroke-opacity=".2" stroke-width="1.4"/><path d="M26,52 H156 V126 H294" fill="none" stroke="currentColor" stroke-opacity=".8" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M26,126 H156 V52 H294" fill="none" stroke="currentColor" stroke-opacity=".32" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><text x="300" y="130" text-anchor="end" font-size="9.5" class="mono" fill="var(--muted)">L</text><text x="300" y="48" text-anchor="end" font-size="9.5" class="mono" fill="var(--faint)">R</text><path d="M156,40 V166" stroke="var(--accent)" stroke-width="2.2" stroke-dasharray="5 4" stroke-linecap="round"/><text x="156" y="30" text-anchor="middle" font-size="10" fill="var(--accent-ink)" font-weight="600">block switch</text><text x="26" y="158" font-size="10" fill="var(--muted)">licks</text><g stroke="currentColor" stroke-opacity=".65" stroke-width="2.2" stroke-linecap="round"><path d="M66,146 v10 M80,146 v10 M98,146 v10 M112,146 v10 M126,146 v10 M140,146 v10"/><path d="M172,158 v10 M186,158 v10 M204,158 v10 M222,158 v10 M240,158 v10 M262,158 v10"/></g><text x="100" y="184" text-anchor="middle" font-size="9.5" fill="var(--faint)">choose left</text><text x="220" y="184" text-anchor="middle" font-size="9.5" fill="var(--faint)">choose right</text></svg></div>
    <div class="acg-eb" style="color:#a16207">STIMULUS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-dynamic-foraging" title="Link to this term">Dynamic foraging task</a></h3>
    <p class="acg-def">Two choices, binary reward, and reward probabilities that change during the session. A go cue opens a short window in which the mouse licks left or right; the mouse must learn from recent outcomes to track the better side.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="physiology/stimuli/dynamic-foraging/Dynamic-Foraging.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-dynamic-routing" data-cat="stimuli" data-hay="dynamic routing task a context-dependent go/no-go task alternating visual and auditory blocks. the same stimulus is a target or not depending on the current block, so stimulus and meaning can be separated. stimuli &amp; behavioural tasks ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="dyro-t"><title id="dyro-t">Dynamic Routing: the same stimulus changes meaning by block</title><rect x="20" y="40" width="88" height="30" rx="8" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".4" stroke-width="1.8"/><rect x="116" y="40" width="88" height="30" rx="8" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".4" stroke-width="1.8"/><rect x="212" y="40" width="88" height="30" rx="8" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".4" stroke-width="1.8"/><text x="64" y="60" text-anchor="middle" font-size="10.5" fill="var(--muted)">visual block</text><text x="160" y="60" text-anchor="middle" font-size="10.5" fill="var(--muted)">auditory block</text><text x="256" y="60" text-anchor="middle" font-size="10.5" fill="var(--muted)">visual block</text><g fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".55" stroke-width="1.8"><rect x="50" y="92" width="28" height="28" rx="4"/><rect x="146" y="92" width="28" height="28" rx="4"/><rect x="242" y="92" width="28" height="28" rx="4"/></g><g stroke="currentColor" stroke-opacity=".5" stroke-width="4"><path d="M57,94 V118 M65,94 V118 M73,94 V118 M153,94 V118 M161,94 V118 M169,94 V118 M249,94 V118 M257,94 V118 M265,94 V118"/></g><text x="64" y="146" text-anchor="middle" font-size="11.5" fill="var(--accent-ink)" font-weight="600">GO</text><text x="160" y="146" text-anchor="middle" font-size="11.5" fill="var(--muted)">NO-GO</text><text x="256" y="146" text-anchor="middle" font-size="11.5" fill="var(--accent-ink)" font-weight="600">GO</text><text x="160" y="182" text-anchor="middle" font-size="10" fill="var(--faint)">same stimulus, meaning set by block</text></svg></div>
    <div class="acg-eb" style="color:#a16207">STIMULUS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-dynamic-routing" title="Link to this term">Dynamic Routing task</a></h3>
    <p class="acg-def">A context-dependent go/no-go task alternating visual and auditory blocks. The same stimulus is a target or not depending on the current block, so stimulus and meaning can be separated.</p>
    </article>
    <article class="acg-card" id="term-edges" data-cat="morphology" data-hay="edges pairs of connected vertices (mesh.edges, skeleton edges). morphology — meshes &amp; skeletons ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="m-edge"><title id="m-edge">One highlighted edge between adjacent vertices</title><g fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="1.8" stroke-linecap="round"><path d="M58,150 L100,122"/><path d="M100,122 L150,132"/><path d="M150,132 L188,96"/><path d="M188,96 L140,80"/><path d="M140,80 L96,70"/><path d="M96,70 L52,96"/><path d="M52,96 L58,150"/></g><line x1="100" y1="122" x2="96" y2="70" stroke="var(--accent)" stroke-width="3.4" stroke-linecap="round"/><g fill="currentColor" fill-opacity=".55"><circle cx="58" cy="150" r="3.6"/><circle cx="150" cy="132" r="3.6"/><circle cx="188" cy="96" r="3.6"/><circle cx="140" cy="80" r="3.6"/><circle cx="52" cy="96" r="3.6"/></g><circle cx="100" cy="122" r="5" fill="var(--accent)" stroke="var(--surface)" stroke-width="1.5"/><circle cx="96" cy="70" r="5" fill="var(--accent)" stroke="var(--surface)" stroke-width="1.5"/><line x1="98" y1="96" x2="128" y2="90" stroke="var(--accent-ink)" stroke-width="1.5"/><text x="132" y="94" font-size="11" fill="var(--accent-ink)" font-weight="600">edge</text><text x="156" y="140" font-size="9.5" fill="var(--muted)">vertex</text></svg></div>
    <div class="acg-eb" style="color:#2a8f57">MORPH</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-edges" title="Link to this term">Edges</a></h3>
    <p class="acg-def">Pairs of connected vertices (<code>mesh.edges</code>, skeleton <code>edges</code>).</p>
    </article>
    <article class="acg-card" id="term-electron-microscopy-em" data-cat="imaging" data-hay="electron microscopy (em) imaging that reaches nanometer resolution to reveal tissue ultrastructure. imaging &amp; ultrastructure ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="em-t"><title id="em-t">Electron microscopy (EM)</title>
<rect x="58" y="20" width="40" height="15" rx="2" fill="var(--accent)" fill-opacity=".18" stroke="var(--accent-ink)" stroke-width="2" stroke-linejoin="round"/>
<text x="78" y="15" text-anchor="middle" font-size="10" class="mono" fill="var(--accent-ink)">e⁻ beam</text>
<path d="M62,35 L78,106 L94,35 Z" fill="var(--accent)" fill-opacity=".12"/>
<line x1="62" y1="35" x2="78" y2="107" stroke="var(--accent-ink)" stroke-width="2" stroke-linecap="round"/>
<line x1="94" y1="35" x2="78" y2="107" stroke="var(--accent-ink)" stroke-width="2" stroke-linecap="round"/>
<line x1="78" y1="38" x2="78" y2="100" stroke="var(--accent-ink)" stroke-width="2" stroke-linecap="round" stroke-dasharray="3 4"/>
<polygon points="52,108 104,108 118,100 66,100" fill="var(--scaffold)" fill-opacity=".28" stroke="currentColor" stroke-opacity=".6" stroke-width="1.8" stroke-linejoin="round"/>
<polygon points="52,108 104,108 104,118 52,118" fill="var(--scaffold)" fill-opacity=".15" stroke="currentColor" stroke-opacity=".6" stroke-width="1.8" stroke-linejoin="round"/>
<text x="72" y="136" text-anchor="middle" font-size="10" fill="var(--muted)">thin section</text>
<line x1="132" y1="112" x2="194" y2="112" stroke="currentColor" stroke-opacity=".7" stroke-width="2" stroke-linecap="round"/>
<path d="M194,112 l-8,-4 M194,112 l-8,4" fill="none" stroke="currentColor" stroke-opacity=".7" stroke-width="2" stroke-linecap="round"/>
<rect x="204" y="66" width="90" height="84" rx="3" fill="var(--scaffold)" fill-opacity=".14" stroke="currentColor" stroke-opacity=".7" stroke-width="2"/>
<ellipse cx="232" cy="98" rx="18" ry="12" fill="var(--scaffold)" fill-opacity=".38"/>
<circle cx="268" cy="90" r="9" fill="var(--scaffold)" fill-opacity=".5"/>
<path d="M214,128 q20,-12 40,-2 t38,-2" fill="none" stroke="currentColor" stroke-opacity=".4" stroke-width="2" stroke-linecap="round"/>
<circle cx="256" cy="122" r="4" fill="var(--scaffold)" fill-opacity=".6"/>
<text x="249" y="164" text-anchor="middle" font-size="10" fill="var(--muted)">grayscale tile</text>
</svg></div>
    <div class="acg-eb" style="color:#8a6f4a">IMAGING</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-electron-microscopy-em" title="Link to this term">Electron microscopy (EM)</a></h3>
    <p class="acg-def">Imaging that reaches nanometer resolution to reveal tissue ultrastructure.</p>
    </article>
    <article class="acg-card" id="term-encoding-vs-decoding" data-cat="responses" data-hay="encoding vs decoding encoding asks whether an event changes neural activity; decoding asks whether the event can be read back out of the activity. same data, opposite direction. response properties &amp; analysis ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="encdec-t"><title id="encdec-t">Encoding and decoding: same data, opposite direction</title><rect x="22" y="66" width="94" height="66" rx="10" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".45" stroke-width="1.8"/><path d="M57,82 V116 M66,82 V116 M75,82 V116 M84,82 V116" stroke="currentColor" stroke-opacity=".5" stroke-width="5"/><text x="69" y="154" text-anchor="middle" font-size="11" fill="var(--muted)">stimulus</text><rect x="204" y="66" width="94" height="66" rx="10" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".45" stroke-width="1.8"/><path d="M218,82 V92 M240,82 V92 M268,82 V92 M284,82 V92 M224,96 V106 M250,96 V106 M262,96 V106 M290,96 V106 M214,110 V120 M232,110 V120 M258,110 V120 M280,110 V120" stroke="var(--neuron)" stroke-width="2.2" stroke-linecap="round"/><text x="251" y="154" text-anchor="middle" font-size="11" fill="var(--muted)">activity</text><path d="M124,84 H196" fill="none" stroke="currentColor" stroke-opacity=".6" stroke-width="2" stroke-linecap="round"/><path d="M190,80 L196,84 L190,88" fill="none" stroke="currentColor" stroke-opacity=".6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><text x="160" y="74" text-anchor="middle" font-size="10.5" fill="var(--muted)">encoding</text><path d="M196,114 H124" fill="none" stroke="var(--accent)" stroke-width="2.2" stroke-linecap="round"/><path d="M130,110 L124,114 L130,118" fill="none" stroke="var(--accent)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><text x="160" y="132" text-anchor="middle" font-size="10.5" fill="var(--accent-ink)" font-weight="600">decoding</text></svg></div>
    <div class="acg-eb" style="color:#9f1239">RESPONSE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-encoding-vs-decoding" title="Link to this term">Encoding vs decoding</a></h3>
    <p class="acg-def">Encoding asks whether an event changes neural activity; decoding asks whether the event can be read back out of the activity. Same data, opposite direction.</p>
    </article>
    <article class="acg-card" id="term-enhancer-aav" data-cat="genetics" data-hay="enhancer aav a virus carrying a cell-type-specific enhancer, used to restrict expression without breeding a transgenic line. genetic &amp; optical tools ">
    <div class="acg-eb" style="color:#15803d">GENETIC</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-enhancer-aav" title="Link to this term">Enhancer AAV</a></h3>
    <p class="acg-def">A virus carrying a cell-type-specific enhancer, used to restrict expression without breeding a transgenic line.</p>
    </article>
    <article class="acg-card" id="term-environment-secrets" data-cat="cave" data-hay="environment secrets how the cave auth token is supplied when code runs on a shared or hosted machine: exported as environment variables named api_secret_&lt;server&gt; instead of being written to a credentials file in the home directory. cave — access &amp; versioning ">
    <div class="acg-eb" style="color:#0f766e">CAVE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-environment-secrets" title="Link to this term">Environment secrets</a></h3>
    <p class="acg-def">How the CAVE auth token is supplied when code runs on a shared or hosted machine: exported as environment variables named <code>API_SECRET_&lt;server&gt;</code> instead of being written to a credentials file in the home directory.</p>
    </article>
    <article class="acg-card" id="term-ephys" data-cat="modalities" data-hay="ephys shorthand for electrophysiology. recording modalities &amp; instruments ">
    <div class="acg-eb" style="color:#c2410c">MODALITY</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-ephys" title="Link to this term">Ephys</a></h3>
    <p class="acg-def">Shorthand for electrophysiology.</p>
    </article>
    <article class="acg-card" id="term-selection-bias-ephys" data-cat="responses" data-hay="ephys selection bias spike sorting needs enough spikes to form a cluster, so sparsely active neurons are missed and large-spike, high-rate neurons — and layer 5 — are over-represented. ophys sees many of the cells ephys does not. response properties &amp; analysis ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="sbe-t"><title id="sbe-t">Ephys selection bias: large, fast-firing units dominate</title><rect x="40" y="30" width="94" height="148" rx="4" fill="var(--scaffold)" fill-opacity=".18" stroke="currentColor" stroke-opacity=".4" stroke-width="1.8"/><path d="M40,66H134 M40,100H134 M40,140H134" stroke="currentColor" stroke-opacity=".25" stroke-width="1.4"/><rect x="40" y="100" width="94" height="40" fill="var(--accent)" fill-opacity=".12"/><g fill="none" stroke="currentColor" stroke-opacity=".35" stroke-width="1.6" stroke-dasharray="2 3"><circle cx="60" cy="42" r="4"/><circle cx="104" cy="46" r="4"/><circle cx="84" cy="56" r="4"/><circle cx="114" cy="92" r="4"/><circle cx="62" cy="152" r="4"/><circle cx="96" cy="158" r="4"/><circle cx="66" cy="88" r="4"/><circle cx="166" cy="112" r="4"/></g><g fill="var(--neuron)"><circle cx="64" cy="60" r="6"/><circle cx="96" cy="74" r="6"/><circle cx="58" cy="118" r="6"/><circle cx="92" cy="112" r="6"/><circle cx="74" cy="128" r="6"/><circle cx="112" cy="130" r="6"/><circle cx="166" cy="82" r="6"/></g><g text-anchor="end" font-size="9" class="mono" fill="var(--faint)"><text x="32" y="52">L2/3</text><text x="32" y="88">L4</text><text x="32" y="166">L6</text></g><text x="32" y="126" text-anchor="end" font-size="9" class="mono" fill="var(--accent-ink)" font-weight="600">L5</text><g font-size="10" fill="var(--muted)"><text x="180" y="86">sorted: big, fast-firing</text><text x="180" y="116">missed: sparsely active</text></g><text x="180" y="144" font-size="10" fill="var(--accent-ink)" font-weight="600">L5 over-represented</text></svg></div>
    <div class="acg-eb" style="color:#9f1239">RESPONSE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-selection-bias-ephys" title="Link to this term">Ephys selection bias</a></h3>
    <p class="acg-def">Spike sorting needs enough spikes to form a cluster, so sparsely active neurons are missed and large-spike, high-rate neurons — and layer 5 — are over-represented. Ophys sees many of the cells ephys does not.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="background/Ophys-ephys-comparison.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-epoch" data-cat="dataorg" data-hay="epoch a labelled stretch of time — but of what, and on whose clock, differs everywhere it appears. datasets, sessions &amp; files ">
    <div class="acg-eb" style="color:#3f3f46">DATA</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-epoch" title="Link to this term">Epoch</a></h3>
    <p class="acg-def">A labelled stretch of time — but of what, and on whose clock, differs everywhere it appears.</p>
    <div class="acg-meta"><span class="acg-chip acg-warn" title="This word means different things in different places">&#9888; ambiguous</span></div>
    </article>
    <article class="acg-card" id="term-error-profiles" data-cat="proofreading" data-hay="error profiles the characteristic ways automated segmentation fails, and how they differ by compartment: thin axons are dominated by split errors, thicker dendrites and somata by merges. this asymmetry is why proofreading status is tracked separately for axon and dendrite. proofreading &amp; data quality ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="pep"><title id="pep">Error profiles — axons vs dendrites</title>
<line x1="160" y1="28" x2="160" y2="168" stroke="currentColor" stroke-opacity=".18" stroke-width="1.5"/>
<circle cx="46" cy="160" r="5" fill="var(--axon)"/>
<g fill="none" stroke="var(--axon)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
<path d="M46,155 C48,142 50,134 54,124"/>
<path d="M63,114 C68,104 72,96 78,86"/>
<path d="M87,76 C92,66 96,58 100,48"/>
<path d="M70,101 C82,99 92,98 104,96"/>
<path d="M118,94 C128,93 136,92 144,90"/>
</g>
<g fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round">
<path d="M52,122 L62,116"/>
<path d="M76,84 L86,78"/>
<path d="M104,99 L114,91"/>
</g>
<text x="85" y="184" text-anchor="middle" font-size="10" fill="var(--axon)">axons: more splits</text>
<circle cx="238" cy="150" r="9" fill="var(--dendrite)" fill-opacity=".22" stroke="var(--dendrite)" stroke-width="2.4"/>
<g fill="none" stroke="var(--dendrite)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
<path d="M238,141 C232,124 228,112 222,96"/>
<path d="M238,141 C242,120 244,108 246,90"/>
<path d="M238,141 C250,127 258,117 268,104"/>
<path d="M246,90 C252,84 258,82 264,78"/>
<path d="M268,104 C276,100 282,99 289,96"/>
<path d="M222,96 C216,91 212,89 205,85"/>
<path d="M238,141 C232,145 228,147 223,150"/>
<path d="M215,155 C210,157 206,159 200,162"/>
</g>
<path d="M214,157 L224,147" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round"/>
<text x="234" y="184" text-anchor="middle" font-size="10" fill="var(--dendrite)">dendrites: fewer errors</text>
</svg></div>
    <div class="acg-eb" style="color:#b8791a">PROOF</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-error-profiles" title="Link to this term">Error profiles</a></h3>
    <p class="acg-def">The characteristic ways automated segmentation fails, and how they differ by compartment: thin axons are dominated by split errors, thicker dendrites and somata by merges. This asymmetry is why proofreading status is tracked separately for axon and dendrite.</p>
    </article>
    <article class="acg-card" id="term-event-detection" data-cat="signals" data-hay="event detection deconvolving δf/f into discrete events, here with the l0 method. at population imaging resolutions 1- and 2-spike events are detected unreliably, particularly with gcamp6f. signals &amp; preprocessing ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="evd-t"><title id="evd-t">Event detection from delta F over F</title> <path d="M22,86 H298" stroke="currentColor" stroke-opacity=".25" stroke-width="1.4"/> <path d="M22,86 C38,86 42,84 48,86 C56,88 58,30 68,32 C78,34 82,84 96,86 C110,88 112,48 122,50 C134,52 138,84 152,86 C166,88 170,76 178,78 C186,80 190,86 200,86 C214,86 218,42 228,44 C240,46 244,84 258,86 C272,88 286,86 298,86" fill="none" stroke="var(--neuron)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/> <text x="22" y="30" font-size="10.5" class="mono" fill="var(--muted)">ΔF/F</text> <path d="M22,150 H298" stroke="currentColor" stroke-opacity=".25" stroke-width="1.4"/> <g stroke="var(--accent)" stroke-width="2.6" stroke-linecap="round"> <path d="M67,150 V116"/><path d="M121,150 V128"/><path d="M227,150 V120"/></g> <path d="M178,150 V142" stroke="currentColor" stroke-opacity=".35" stroke-width="2.6" stroke-linecap="round"/> <text x="22" y="170" font-size="10.5" fill="var(--muted)">events</text> <text x="120" y="170" font-size="9" fill="var(--faint)">L0 deconvolution</text> <text x="178" y="118" text-anchor="middle" font-size="9" fill="var(--faint)">1-2 spikes:</text> <text x="178" y="129" text-anchor="middle" font-size="9" fill="var(--faint)">unreliable</text> </svg></div>
    <div class="acg-eb" style="color:#0369a1">SIGNAL</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-event-detection" title="Link to this term">Event detection</a></h3>
    <p class="acg-def">Deconvolving ΔF/F into discrete events, here with the L0 method. At population imaging resolutions 1- and 2-spike events are detected unreliably, particularly with GCaMP6f.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="background/Two-photon-calcium-imaging.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-evoked-vs-spontaneous" data-cat="responses" data-hay="evoked vs spontaneous activity driven by a stimulus versus activity during the grey-screen epochs. the comparison that decides whether a response is a response at all. response properties &amp; analysis ">
    <div class="acg-eb" style="color:#9f1239">RESPONSE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-evoked-vs-spontaneous" title="Link to this term">Evoked vs spontaneous</a></h3>
    <p class="acg-def">Activity driven by a stimulus versus activity during the grey-screen epochs. The comparison that decides whether a response is a response at all.</p>
    </article>
    <article class="acg-card" id="term-excitatory-v1-cell-types" data-cat="celltypes" data-hay="excitatory v1 cell types pyramidal subclasses by layer/projection: 23p, 4p, 5p-it/et/np, 6p-it/ct (+ mtype clusters l2a…l6wm). cell types &amp; cortical anatomy ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="ev-t"><title id="ev-t">Excitatory V1 cell types by layer</title>
<g stroke="none">
<rect x="34" y="18" width="272" height="18" fill="currentColor" fill-opacity=".05"/>
<rect x="34" y="36" width="272" height="38" fill="currentColor" fill-opacity=".09"/>
<rect x="34" y="74" width="272" height="26" fill="currentColor" fill-opacity=".05"/>
<rect x="34" y="100" width="272" height="40" fill="currentColor" fill-opacity=".09"/>
<rect x="34" y="140" width="272" height="32" fill="currentColor" fill-opacity=".05"/>
<rect x="34" y="172" width="272" height="14" fill="currentColor" fill-opacity=".16"/>
</g>
<path d="M34,18 H306 M34,36 H306 M34,74 H306 M34,100 H306 M34,140 H306 M34,172 H306 M34,186 H306" stroke="currentColor" stroke-opacity=".28" stroke-width="1.2"/>
<g class="mono" font-size="8.5" fill="var(--muted)">
<text x="16" y="30">L1</text><text x="16" y="59">L2/3</text><text x="16" y="90">L4</text><text x="16" y="123">L5</text><text x="16" y="159">L6</text><text x="16" y="182">WM</text>
</g>
<g stroke="var(--dendrite)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path d="M95,55 V32 M95,32 l-7,-6 M95,32 l7,-6 M86,70 l-7,7 M104,70 l7,7"/>
<path d="M150,80 V32 M150,32 l-7,-6 M150,32 l7,-6 M141,95 l-7,7 M159,95 l7,7"/>
<path d="M205,110 V32 M205,32 l-8,-7 M205,32 l8,-7 M194,127 l-8,8 M216,127 l8,8"/>
<path d="M260,148 V80 M260,80 l-7,-6 M260,80 l7,-6 M251,162 l-7,7 M269,162 l7,7"/>
</g>
<g stroke="var(--axon)" stroke-width="2" fill="none" stroke-linecap="round">
<path d="M95,70 V82"/><path d="M150,95 V108"/><path d="M205,127 V145"/><path d="M260,162 V176"/>
</g>
<g fill="var(--neuron)" stroke="var(--surface)" stroke-width="1.2" stroke-linejoin="round">
<polygon points="95,53 86,70 104,70"/>
<polygon points="150,78 141,95 159,95"/>
<polygon points="205,107 194,127 216,127"/>
<polygon points="260,146 251,162 269,162"/>
</g>
<g class="mono" font-size="10" font-weight="600" fill="var(--neuron)">
<text x="112" y="64">23P</text><text x="166" y="90">4P</text><text x="222" y="121">5P</text><text x="277" y="157">6P</text>
</g>
</svg></div>
    <div class="acg-eb" style="color:#c9357f">CELLTYPE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-excitatory-v1-cell-types" title="Link to this term">Excitatory V1 cell types</a></h3>
    <p class="acg-def">Pyramidal subclasses by layer/projection: 23P, 4P, 5P-IT/ET/NP, 6P-IT/CT (+ mtype clusters L2a…L6wm).</p>
    </article>
    <article class="acg-card" id="term-experience-level" data-cat="stimuli" data-hay="experience level whether the image set in a session is the one the mouse trained on (familiar) or a different one (novel). the axis the visual behavior datasets were built to test. stimuli &amp; behavioural tasks ">
    <div class="acg-eb" style="color:#a16207">STIMULUS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-experience-level" title="Link to this term">Experience level</a></h3>
    <p class="acg-def">Whether the image set in a session is the one the mouse trained on (<code>Familiar</code>) or a different one (<code>Novel</code>). The axis the Visual Behavior datasets were built to test.</p>
    </article>
    <article class="acg-card" id="term-experiment" data-cat="dataorg" data-hay="experiment there is no consistent use of this term. establish which one is meant before joining anything. datasets, sessions &amp; files ">
    <div class="acg-eb" style="color:#3f3f46">DATA</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-experiment" title="Link to this term">Experiment</a></h3>
    <p class="acg-def">There is no consistent use of this term. Establish which one is meant before joining anything.</p>
    <div class="acg-meta"><span class="acg-chip acg-warn" title="This word means different things in different places">&#9888; ambiguous</span></div>
    </article>
    <article class="acg-card" id="term-extended" data-cat="proofreading" data-hay="extended arbor proofread to remove all merge and split errors (correct and as-complete-as-possible). proofreading &amp; data quality ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="pex"><title id="pex">Extended — proofreading status ladder</title>
<circle cx="72" cy="108" r="10" fill="var(--neuron)" fill-opacity=".2" stroke="var(--neuron)" stroke-width="2.4"/>
<g fill="none" stroke="var(--neuron)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
<path d="M72,98 C64,82 58,70 52,54"/>
<path d="M72,98 C72,80 72,66 72,48"/>
<path d="M72,98 C82,82 90,72 98,56"/>
<path d="M72,98 C56,88 48,82 38,74"/>
<path d="M72,98 C90,90 102,88 114,84"/>
<path d="M72,48 C68,42 64,40 58,36"/>
<path d="M72,48 C76,42 80,40 86,36"/>
<path d="M98,56 C104,50 110,48 116,44"/>
<path d="M114,84 C122,80 128,79 136,76"/>
<path d="M52,54 C46,50 42,49 36,46"/>
<path d="M72,118 C72,136 74,148 78,164"/>
<path d="M73,132 C67,138 62,142 56,148"/>
<path d="M75,146 C81,150 86,153 92,158"/>
</g>
<rect x="170" y="42" width="132" height="30" rx="15" fill="var(--accent)" fill-opacity=".16" stroke="var(--accent)" stroke-width="2.4"/>
<text x="236" y="61" text-anchor="middle" font-size="12" fill="var(--accent-ink)" font-weight="600">Extended</text>
<rect x="170" y="87" width="132" height="30" rx="15" fill="none" stroke="currentColor" stroke-opacity=".3" stroke-width="1.8"/>
<text x="236" y="106" text-anchor="middle" font-size="12" fill="var(--muted)">Clean</text>
<rect x="170" y="132" width="132" height="30" rx="15" fill="none" stroke="currentColor" stroke-opacity=".3" stroke-width="1.8"/>
<text x="236" y="151" text-anchor="middle" font-size="12" fill="var(--muted)">Unproofread</text>
<path d="M228,82 L236,76 L244,82" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M228,127 L236,121 L244,127" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<text x="72" y="184" text-anchor="middle" font-size="9.5" fill="var(--muted)">fullest arbor</text>
</svg></div>
    <div class="acg-eb" style="color:#b8791a">PROOF</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-extended" title="Link to this term">Extended</a></h3>
    <p class="acg-def">Arbor proofread to remove all merge AND split errors (correct and as-complete-as-possible).</p>
    </article>
    <article class="acg-card" id="term-electrophysiology" data-cat="modalities" data-hay="extracellular electrophysiology recording voltage from outside the cell membrane, which gives better access to intact brains than intracellular recording. its two readouts are spikes and the local field potential. recording modalities &amp; instruments ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="ep-t"><title id="ep-t">Extracellular electrophysiology: spikes and local field potential</title><path d="M40,34 h20 v100 l-10,14 l-10,-14 z" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".5" stroke-width="1.8" stroke-linejoin="round"/><rect x="44" y="46" width="12" height="5" rx="1.5" fill="currentColor" fill-opacity=".45"/><rect x="44" y="64" width="12" height="5" rx="1.5" fill="currentColor" fill-opacity=".45"/><rect x="44" y="82" width="12" height="5" rx="1.5" fill="currentColor" fill-opacity=".45"/><rect x="44" y="100" width="12" height="5" rx="1.5" fill="currentColor" fill-opacity=".45"/><rect x="44" y="118" width="12" height="5" rx="1.5" fill="currentColor" fill-opacity=".45"/><g fill="var(--neuron)" fill-opacity=".22" stroke="var(--neuron)" stroke-width="2"><circle cx="24" cy="58" r="7.5"/><circle cx="80" cy="96" r="7.5"/><circle cx="26" cy="124" r="7.5"/></g><text x="50" y="172" text-anchor="middle" font-size="10" fill="var(--muted)">outside the cell</text><text x="118" y="38" font-size="10.5" fill="var(--muted)">spikes</text><path d="M118,64 h26 l3,-18 l3,26 l3,-8 h34 l3,-18 l3,26 l3,-8 h30 l3,-18 l3,26 l3,-8 h60" fill="none" stroke="currentColor" stroke-opacity=".85" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M118,128 C138,106 150,150 172,128 C194,106 206,150 228,128 C250,106 262,150 284,128 C290,122 294,126 300,124" fill="none" stroke="currentColor" stroke-opacity=".4" stroke-width="2.2" stroke-linecap="round"/><text x="118" y="166" font-size="10.5" fill="var(--muted)">local field potential</text></svg></div>
    <div class="acg-eb" style="color:#c2410c">MODALITY</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-electrophysiology" title="Link to this term">Extracellular electrophysiology</a></h3>
    <p class="acg-def">Recording voltage from outside the cell membrane, which gives better access to intact brains than intracellular recording. Its two readouts are spikes and the local field potential.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="background/Neuropixels-electrophysiology.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-eye-tracking" data-cat="signals" data-hay="eye tracking / pupil ellipse fits to eye, pupil and corneal reflection per video frame, giving area, centre and rotation, plus a likely_blink flag. recorded during physiology sessions but not during training. signals &amp; preprocessing ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="eye-t"><title id="eye-t">Eye tracking: ellipse fits to eye, pupil and corneal reflection</title><path d="M40,100 C80,58 150,58 190,100 C150,142 80,142 40,100" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".55" stroke-width="2" stroke-linejoin="round"/><ellipse cx="115" cy="100" rx="76" ry="33" fill="none" stroke="currentColor" stroke-opacity=".3" stroke-width="1.6" stroke-dasharray="5 4"/><circle cx="112" cy="100" r="22" fill="var(--accent)" fill-opacity=".2" stroke="var(--accent)" stroke-width="2.4"/><circle cx="128" cy="88" r="6" fill="currentColor" fill-opacity=".3" stroke="currentColor" stroke-opacity=".7" stroke-width="1.6"/><path d="M134,84 L156,72" stroke="currentColor" stroke-opacity=".35" stroke-width="1.4"/><text x="160" y="70" font-size="9" class="mono" fill="var(--faint)">CR</text><text x="200" y="104" font-size="10" fill="var(--muted)">eye</text><text x="112" y="148" text-anchor="middle" font-size="10" fill="var(--accent-ink)" font-weight="600">pupil</text><text x="160" y="176" text-anchor="middle" font-size="10" fill="var(--muted)">area · centre · rotation</text><text x="160" y="192" text-anchor="middle" font-size="9" class="mono" fill="var(--faint)">likely_blink</text></svg></div>
    <div class="acg-eb" style="color:#0369a1">SIGNAL</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-eye-tracking" title="Link to this term">Eye tracking / pupil</a></h3>
    <p class="acg-def">Ellipse fits to eye, pupil and corneal reflection per video frame, giving area, centre and rotation, plus a <code>likely_blink</code> flag. Recorded during physiology sessions but not during training.</p>
    </article>
    <article class="acg-card" id="term-faces" data-cat="morphology" data-hay="faces triangles of connected vertex indices that tile a mesh surface (mesh.faces). morphology — meshes &amp; skeletons ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="m-face"><title id="m-face">One triangular face highlighted in a mesh patch</title><polygon points="130,50 190,58 120,105" fill="var(--accent)" fill-opacity=".28" stroke="var(--accent-ink)" stroke-width="2.4" stroke-linejoin="round"/><g fill="none" stroke="currentColor" stroke-opacity=".5" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M70,60 L130,50 L190,58 L245,52"/><path d="M60,110 L120,105 L180,108 L240,102"/><path d="M75,155 L135,150 L195,152 L250,148"/><path d="M70,60 L60,110 M130,50 L120,105 M190,58 L180,108 M245,52 L240,102"/><path d="M60,110 L75,155 M120,105 L135,150 M180,108 L195,152 M240,102 L250,148"/><path d="M130,50 L60,110 M190,58 L120,105 M245,52 L180,108"/><path d="M120,105 L75,155 M180,108 L135,150 M240,102 L195,152"/></g><line x1="150" y1="72" x2="175" y2="52" stroke="var(--accent-ink)" stroke-width="1.5"/><text x="178" y="50" font-size="10.5" fill="var(--accent-ink)" font-weight="600">1 face</text><text x="160" y="188" text-anchor="middle" font-size="9.5" fill="var(--muted)">triangle = 3 vertices + 3 edges</text></svg></div>
    <div class="acg-eb" style="color:#2a8f57">MORPH</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-faces" title="Link to this term">Faces</a></h3>
    <p class="acg-def">Triangles of connected vertex indices that tile a mesh surface (<code>mesh.faces</code>).</p>
    </article>
    <article class="acg-card" id="term-fast-spiking-neuron" data-cat="celltypes" data-hay="fast spiking neuron (fsn) narrow, fast action potentials; with enough injected current, high spike rates without frequency adaptation. in unlabelled extracellular recordings, narrow-waveform units are called fast spiking and putatively identified as pv+ cells. cell types &amp; cortical anatomy ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="fsn-t"><title id="fsn-t">Fast spiking narrow waveform versus broad waveform</title> <path d="M20,74 L46,74 L52,50 L60,108 L70,70 L86,74 L120,74" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/> <path d="M20,74 L46,74 L54,54 L66,110 L92,66 L110,74 L140,74" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/> <path d="M60,124 H92" stroke="currentColor" stroke-opacity=".35" stroke-width="1.4"/> <path d="M60,120 V128 M92,120 V128" stroke="currentColor" stroke-opacity=".35" stroke-width="1.4"/> <text x="76" y="140" text-anchor="middle" font-size="9" fill="var(--faint)">width</text> <text x="150" y="46" font-size="10.5" fill="var(--accent-ink)" font-weight="600">narrow</text> <text x="150" y="60" font-size="9" fill="var(--faint)">putative PV+</text> <text x="150" y="86" font-size="10.5" fill="var(--muted)">broad</text> <g stroke="var(--accent)" stroke-width="2" stroke-linecap="round"> <path d="M22,178 V152"/><path d="M34,178 V152"/><path d="M46,178 V152"/><path d="M58,178 V152"/><path d="M70,178 V152"/><path d="M82,178 V152"/><path d="M94,178 V152"/><path d="M106,178 V152"/><path d="M118,178 V152"/><path d="M130,178 V152"/></g> <text x="150" y="164" font-size="9.5" fill="var(--muted)">high rate</text> <text x="150" y="178" font-size="9.5" fill="var(--muted)">no adaptation</text> </svg></div>
    <div class="acg-eb" style="color:#c9357f">CELLTYPE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-fast-spiking-neuron" title="Link to this term">Fast spiking neuron (FSN)</a></h3>
    <p class="acg-def">Narrow, fast action potentials; with enough injected current, high spike rates without frequency adaptation. In unlabelled extracellular recordings, narrow-waveform units are called fast spiking and putatively identified as PV+ cells.</p>
    </article>
    <article class="acg-card" id="term-fibsem" data-cat="imaging" data-hay="fibsem focused-ion-beam sem; block-face em that mills &amp; images, giving near-isotropic voxels. imaging &amp; ultrastructure ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="fib-t"><title id="fib-t">FIBSEM vs serial-section TEM</title>
<line x1="158" y1="36" x2="158" y2="158" stroke="currentColor" stroke-opacity=".3" stroke-width="1.5" stroke-dasharray="3 5"/>
<text x="78" y="28" text-anchor="middle" font-size="11" class="mono" fill="var(--accent-ink)" font-weight="600">FIB-SEM</text>
<polygon points="44,82 96,82 110,70 58,70" fill="var(--scaffold)" fill-opacity=".3" stroke="currentColor" stroke-opacity=".55" stroke-width="1.8" stroke-linejoin="round"/>
<polygon points="44,82 96,82 96,132 44,132" fill="var(--scaffold)" fill-opacity=".2" stroke="currentColor" stroke-opacity=".55" stroke-width="1.8" stroke-linejoin="round"/>
<polygon points="96,82 110,70 110,120 96,132" fill="var(--scaffold)" fill-opacity=".12" stroke="currentColor" stroke-opacity=".55" stroke-width="1.8" stroke-linejoin="round"/>
<polygon points="44,82 96,82 100,78 48,78" fill="var(--accent)" fill-opacity=".4" stroke="var(--accent-ink)" stroke-width="1.5" stroke-linejoin="round"/>
<line x1="138" y1="46" x2="82" y2="78" stroke="var(--accent-ink)" stroke-width="2.2" stroke-linecap="round"/>
<path d="M82,78 l10,-1 M82,78 l3,-9" fill="none" stroke="var(--accent-ink)" stroke-width="2.2" stroke-linecap="round"/>
<text x="138" y="42" text-anchor="middle" font-size="9.5" fill="var(--accent-ink)">ion beam</text>
<text x="78" y="152" text-anchor="middle" font-size="9.5" fill="var(--muted)">mill block face in situ</text>
<text x="234" y="28" text-anchor="middle" font-size="11" class="mono" fill="var(--accent-ink)" font-weight="600">ssTEM</text>
<polygon points="176,86 210,86 222,76 188,76" fill="var(--scaffold)" fill-opacity=".3" stroke="currentColor" stroke-opacity=".55" stroke-width="1.8" stroke-linejoin="round"/>
<polygon points="176,86 210,86 210,128 176,128" fill="var(--scaffold)" fill-opacity=".2" stroke="currentColor" stroke-opacity=".55" stroke-width="1.8" stroke-linejoin="round"/>
<polygon points="210,86 222,76 222,118 210,128" fill="var(--scaffold)" fill-opacity=".12" stroke="currentColor" stroke-opacity=".55" stroke-width="1.8" stroke-linejoin="round"/>
<line x1="216" y1="104" x2="232" y2="104" stroke="currentColor" stroke-opacity=".6" stroke-width="2" stroke-linecap="round"/>
<path d="M232,104 l-7,-3 M232,104 l-7,3" fill="none" stroke="currentColor" stroke-opacity=".6" stroke-width="2" stroke-linecap="round"/>
<polygon points="236,92 280,92 288,86 244,86" fill="var(--scaffold)" fill-opacity=".3" stroke="currentColor" stroke-opacity=".5" stroke-width="1.5" stroke-linejoin="round"/>
<polygon points="236,92 280,92 280,99 236,99" fill="var(--scaffold)" fill-opacity=".18" stroke="currentColor" stroke-opacity=".5" stroke-width="1.5" stroke-linejoin="round"/>
<polygon points="236,106 280,106 288,100 244,100" fill="var(--scaffold)" fill-opacity=".3" stroke="currentColor" stroke-opacity=".5" stroke-width="1.5" stroke-linejoin="round"/>
<polygon points="236,106 280,106 280,113 236,113" fill="var(--scaffold)" fill-opacity=".18" stroke="currentColor" stroke-opacity=".5" stroke-width="1.5" stroke-linejoin="round"/>
<polygon points="236,120 280,120 288,114 244,114" fill="var(--scaffold)" fill-opacity=".3" stroke="currentColor" stroke-opacity=".5" stroke-width="1.5" stroke-linejoin="round"/>
<polygon points="236,120 280,120 280,127 236,127" fill="var(--scaffold)" fill-opacity=".18" stroke="currentColor" stroke-opacity=".5" stroke-width="1.5" stroke-linejoin="round"/>
<text x="234" y="152" text-anchor="middle" font-size="9.5" fill="var(--muted)">collect serial sections</text>
<text x="160" y="184" text-anchor="middle" font-size="9.5" fill="var(--faint)">context: FIB-SEM is destructive; sections stay archival</text>
</svg></div>
    <div class="acg-eb" style="color:#8a6f4a">IMAGING</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-fibsem" title="Link to this term">FIBSEM</a></h3>
    <p class="acg-def">Focused-ion-beam SEM; block-face EM that mills &amp; images, giving near-isotropic voxels.</p>
    <div class="acg-meta"><span class="acg-chip acg-aside" title="An adjacent method, not used to acquire these datasets">adjacent method</span></div>
    </article>
    <article class="acg-card" id="term-field-of-view" data-cat="modalities" data-hay="field of view the imaged extent of one plane, in pixels and in µm. recorded per experiment as field_of_view_width/height. recording modalities &amp; instruments ">
    <div class="acg-eb" style="color:#c2410c">MODALITY</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-field-of-view" title="Link to this term">Field of view</a></h3>
    <p class="acg-def">The imaged extent of one plane, in pixels and in µm. Recorded per experiment as <code>field_of_view_width/height</code>.</p>
    <div class="acg-meta"><span class="acg-chip acg-warn" title="This word means different things in different places">&#9888; ambiguous</span></div>
    </article>
    <article class="acg-card" id="term-firing-rate" data-cat="quality" data-hay="firing_rate mean spike rate over the whole session. low values may mean a sparsely active neuron or a badly detected one. quality metrics ">
    <div class="acg-eb" style="color:#4338ca">QUALITY</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-firing-rate" title="Link to this term">firing_rate</a></h3>
    <p class="acg-def">Mean spike rate over the whole session. Low values may mean a sparsely active neuron or a badly detected one.</p>
    </article>
    <article class="acg-card" id="term-fluorophore" data-cat="genetics" data-hay="fluorophore a molecule that absorbs light and re-emits it at a longer wavelength. fluorophores fluoresce only while exposed to a light source. genetic &amp; optical tools ">
    <div class="acg-eb" style="color:#15803d">GENETIC</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-fluorophore" title="Link to this term">Fluorophore</a></h3>
    <p class="acg-def">A molecule that absorbs light and re-emits it at a longer wavelength. Fluorophores fluoresce only while exposed to a light source.</p>
    </article>
    <article class="acg-card" id="term-functional-connectome" data-cat="datasets" data-hay="functional connectome a dataset linking synapse-resolution em connectivity to recorded neural function in the same neurons. datasets &amp; scope ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="d4"><title id="d4">Functional connectome</title><rect x="16" y="40" width="132" height="140" rx="6" fill="var(--surface-2)" stroke="var(--border)" stroke-width="1.4"/><rect x="190" y="40" width="114" height="140" rx="6" fill="var(--surface-2)" stroke="var(--border)" stroke-width="1.4"/><text x="82" y="33" text-anchor="middle" font-size="9" fill="var(--muted)">calcium (function)</text><text x="247" y="33" text-anchor="middle" font-size="8.5" fill="var(--muted)">EM mesh (structure)</text><g fill="none" stroke="currentColor" stroke-opacity=".8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M26,72 L46,72 C50,72 51,60 55,60 C60,60 60,72 70,72 L92,72 C96,72 97,55 102,55 C108,55 108,72 118,72 L138,72"/><path d="M26,112 L52,112 C56,112 57,98 62,98 C68,98 68,112 80,112 L104,112 C108,112 109,103 113,103 C118,103 118,112 138,112"/><path d="M26,152 L44,152 C48,152 49,140 54,140 C60,140 60,152 72,152 L96,152 C100,152 101,133 107,133 C114,133 114,152 138,152"/></g><g fill="none" stroke="var(--neuron)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="248" cy="72" rx="9" ry="7" fill="var(--neuron)" fill-opacity=".22"/><path d="M248,65 C246,54 253,52 251,42"/><path d="M242,77 C234,84 238,92 230,94"/><ellipse cx="252" cy="112" rx="9" ry="7" fill="var(--neuron)" fill-opacity=".22"/><path d="M252,105 C250,94 257,92 255,82"/><path d="M246,117 C238,124 242,132 234,134"/><ellipse cx="246" cy="152" rx="9" ry="7" fill="var(--neuron)" fill-opacity=".22"/><path d="M246,145 C244,134 251,132 249,122"/><path d="M240,157 C232,164 236,172 228,174"/></g><g stroke="currentColor" stroke-opacity=".5" stroke-width="1.8" stroke-linecap="round"><line x1="142" y1="72" x2="222" y2="72"/><line x1="142" y1="112" x2="224" y2="112"/><line x1="142" y1="152" x2="222" y2="152"/></g><g fill="currentColor" fill-opacity=".5"><polygon points="224,72 217,69 217,75"/><polygon points="226,112 219,109 219,115"/><polygon points="224,152 217,149 217,155"/></g><text x="160" y="194" text-anchor="middle" font-size="9" fill="var(--muted)">same cells</text></svg></div>
    <div class="acg-eb" style="color:#0e7f8c">DATASETS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-functional-connectome" title="Link to this term">Functional connectome</a></h3>
    <p class="acg-def">A dataset linking synapse-resolution EM connectivity to recorded neural function in the same neurons.</p>
    </article>
    <article class="acg-card" id="term-gaba" data-cat="celltypes" data-hay="gaba the main inhibitory neurotransmitter in the mammalian brain. in cortex most gabaergic neurons are local interneurons. cell types &amp; cortical anatomy ">
    <div class="acg-eb" style="color:#c9357f">CELLTYPE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-gaba" title="Link to this term">GABA</a></h3>
    <p class="acg-def">The main inhibitory neurotransmitter in the mammalian brain. In cortex most GABAergic neurons are local interneurons.</p>
    </article>
    <article class="acg-card" id="term-gabor-patches" data-cat="stimuli" data-hay="gabor patches spatially restricted gratings. the receptive-field mapping stimulus in visual coding neuropixels: 20° diameter, three orientations on a 9 × 9 grid of screen positions, identical in every session. stimuli &amp; behavioural tasks ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="gab-t"><title id="gab-t">Gabor patches on a 9 by 9 grid of screen positions</title><path d="M20,44 V170 M34,44 V170 M48,44 V170 M62,44 V170 M76,44 V170 M90,44 V170 M104,44 V170 M118,44 V170 M132,44 V170 M146,44 V170 M20,44 H146 M20,58 H146 M20,72 H146 M20,86 H146 M20,100 H146 M20,114 H146 M20,128 H146 M20,142 H146 M20,156 H146 M20,170 H146" fill="none" stroke="currentColor" stroke-opacity=".28" stroke-width="1.2"/><rect x="76" y="100" width="14" height="14" fill="var(--accent)" fill-opacity=".3" stroke="var(--accent)" stroke-width="1.8"/><path d="M92,106 C122,102 160,100 194,98" fill="none" stroke="currentColor" stroke-opacity=".35" stroke-width="1.6" stroke-dasharray="4 4"/><circle cx="240" cy="96" r="42" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".35" stroke-width="1.8"/><path d="M199,96 H281 M207,76 H273 M207,116 H273 M229,61 H251 M229,131 H251" stroke="currentColor" stroke-opacity=".5" stroke-width="10"/><text x="83" y="188" text-anchor="middle" font-size="9.5" class="mono" fill="var(--faint)">9 × 9 positions</text><text x="240" y="160" text-anchor="middle" font-size="11" fill="var(--accent-ink)" font-weight="600">20° patch</text><text x="240" y="176" text-anchor="middle" font-size="9.5" fill="var(--muted)">3 orientations</text><text x="240" y="190" text-anchor="middle" font-size="9.5" fill="var(--faint)">same every session</text></svg></div>
    <div class="acg-eb" style="color:#a16207">STIMULUS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-gabor-patches" title="Link to this term">Gabor patches</a></h3>
    <p class="acg-def">Spatially restricted gratings. The receptive-field mapping stimulus in Visual Coding Neuropixels: 20° diameter, three orientations on a 9 × 9 grid of screen positions, identical in every session.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="physiology/ephys/visual-coding/vcnp-receptive-fields.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-gcamp" data-cat="genetics" data-hay="gcamp a family of geci fusing calmodulin's calcium-binding domain to green fluorescent protein. gcamp6f and 6s are the fast and slow variants, differing in sensitivity and especially in decay kinetics. genetic &amp; optical tools ">
    <div class="acg-eb" style="color:#15803d">GENETIC</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-gcamp" title="Link to this term">GCaMP</a></h3>
    <p class="acg-def">A family of GECI fusing calmodulin's calcium-binding domain to green fluorescent protein. GCaMP6f and 6s are the fast and slow variants, differing in sensitivity and especially in decay kinetics.</p>
    </article>
    <article class="acg-card" id="term-geci" data-cat="genetics" data-hay="genetically-encoded calcium indicator (geci) a protein expressed by a cell that changes its fluorescence on binding ca²⁺, used to visualise neural activity with fluorescence microscopy. genetic &amp; optical tools ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="gec-t"><title id="gec-t">GECI: fluorescence rises when the indicator binds calcium</title><g fill="none" stroke="var(--dendrite)" stroke-width="2" stroke-linecap="round"><path d="M62,72 C56,56 50,46 44,34"/><path d="M78,72 C84,56 90,48 98,38"/><path d="M70,112 C70,132 66,146 62,160"/><path d="M198,72 C192,56 186,46 180,34"/><path d="M214,72 C220,56 226,48 234,38"/><path d="M206,112 C206,132 202,146 198,160"/></g><circle cx="70" cy="92" r="20" fill="var(--neuron)" fill-opacity=".12" stroke="var(--neuron)" stroke-width="2.2"/><circle cx="206" cy="92" r="20" fill="var(--neuron)" fill-opacity=".8" stroke="var(--neuron)" stroke-width="2.6"/><circle cx="206" cy="92" r="27" fill="none" stroke="var(--accent)" stroke-width="2.2" stroke-opacity=".7"/><g fill="var(--accent)"><circle cx="150" cy="72" r="3"/><circle cx="164" cy="84" r="3"/><circle cx="152" cy="98" r="3"/><circle cx="168" cy="108" r="3"/></g><text x="159" y="58" text-anchor="middle" font-size="10" class="mono" fill="var(--accent-ink)">Ca²⁺</text><path d="M118,92 H140" stroke="currentColor" stroke-opacity=".55" stroke-width="2" stroke-linecap="round"/><path d="M134,88 L140,92 L134,96" fill="none" stroke="currentColor" stroke-opacity=".55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><text x="70" y="184" text-anchor="middle" font-size="10.5" fill="var(--muted)">at rest, dim</text><text x="206" y="184" text-anchor="middle" font-size="10.5" fill="var(--accent-ink)" font-weight="600">active, bright</text><text x="272" y="40" text-anchor="middle" font-size="9.5" class="mono" fill="var(--faint)">ΔF/F</text><path d="M258,116 h6 c4,0 4,-44 10,-44 c7,0 5,44 12,44 h6" fill="none" stroke="var(--neuron)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
    <div class="acg-eb" style="color:#15803d">GENETIC</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-geci" title="Link to this term">Genetically-encoded calcium indicator (GECI)</a></h3>
    <p class="acg-def">A protein expressed by a cell that changes its fluorescence on binding Ca²⁺, used to visualise neural activity with fluorescence microscopy.</p>
    </article>
    <article class="acg-card" id="term-golden-mouse-409828" data-cat="functional" data-hay="golden mouse (409828) the single v1dd mouse with functional coregistration. functional data &amp; coregistration v1dd">
    <div class="acg-eb" style="color:#9a5b12">FUNCTION</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-golden-mouse-409828" title="Link to this term">Golden Mouse (409828)</a></h3>
    <p class="acg-def">The single V1DD mouse with functional coregistration.</p>
    <div class="acg-meta"><span class="acg-chip acg-ds">V1DD only</span></div>
    </article>
    <article class="acg-card" id="term-gosi-gdsi" data-cat="functional" data-hay="gosi / gdsi global orientation/direction selectivity indices (vector-sum variant). functional data &amp; coregistration ">
    <div class="acg-eb" style="color:#9a5b12">FUNCTION</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-gosi-gdsi" title="Link to this term">gOSI / gDSI</a></h3>
    <p class="acg-def">Global orientation/direction selectivity indices (vector-sum variant).</p>
    </article>
    <article class="acg-card" id="term-graphene-graphene" data-cat="segmentation" data-hay="graphene (graphene://) url protocol for dynamic, cave-backed (editable) segmentation/meshes, vs static precomputed://. segmentation &amp; reconstruction ">
    <div class="acg-eb" style="color:#6d55e0">SEGMENT</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-graphene-graphene" title="Link to this term">Graphene (graphene://)</a></h3>
    <p class="acg-def">URL protocol for dynamic, CAVE-backed (editable) segmentation/meshes, vs static <code>precomputed://</code>.</p>
    </article>
    <article class="acg-card" id="term-graphene-vs-precomputed" data-cat="cave" data-hay="graphene vs precomputed graphene:// = dynamic/editable; precomputed:// = static. cave — access &amp; versioning ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="cave-gp"><title id="cave-gp">Graphene vs Precomputed</title>
<rect x="28" y="44" width="264" height="52" rx="12" fill="var(--surface-2)" stroke="var(--ok)" stroke-width="2"/>
<circle cx="54" cy="70" r="11" fill="none" stroke="var(--ok)" stroke-opacity=".4" stroke-width="2"/>
<circle cx="54" cy="70" r="6" fill="var(--ok)"/>
<text x="76" y="75" font-size="14" class="mono" fill="var(--ok)" font-weight="600">graphene://</text>
<text x="282" y="75" text-anchor="end" font-size="10" fill="var(--ok)">editable / live</text>
<rect x="28" y="110" width="264" height="52" rx="12" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".55" stroke-width="2"/>
<rect x="46" y="130" width="16" height="14" rx="2" fill="var(--scaffold)" fill-opacity=".5" stroke="currentColor" stroke-opacity=".7" stroke-width="2"/>
<path d="M50,130 v-3 a4,4 0 0 1 8,0 v3" fill="none" stroke="currentColor" stroke-opacity=".7" stroke-width="2" stroke-linecap="round"/>
<text x="76" y="141" font-size="14" class="mono" fill="var(--muted)">precomputed://</text>
<text x="282" y="141" text-anchor="end" font-size="10" fill="var(--muted)">frozen / static</text>
</svg></div>
    <div class="acg-eb" style="color:#0f766e">CAVE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-graphene-vs-precomputed" title="Link to this term">Graphene vs Precomputed</a></h3>
    <p class="acg-def"><code>graphene://</code> = dynamic/editable; <code>precomputed://</code> = static.</p>
    </article>
    <article class="acg-card" id="term-grids-chunk" data-cat="volume" data-hay="grids / chunk the volume is partitioned into a 3d grid of chunks for the chunked-graph. volume, voxels &amp; coordinates ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="grid-t"><title id="grid-t">Volume diced into a grid of chunks, one chunk highlighted</title><polygon points="55,60 175,60 175,160 55,160" fill="var(--scaffold)" fill-opacity=".14" stroke="currentColor" stroke-opacity=".7" stroke-width="2" stroke-linejoin="round"/><polygon points="55,60 175,60 205,42 85,42" fill="var(--scaffold)" fill-opacity=".26" stroke="currentColor" stroke-opacity=".7" stroke-width="2" stroke-linejoin="round"/><polygon points="175,60 205,42 205,142 175,160" fill="var(--scaffold)" fill-opacity=".07" stroke="currentColor" stroke-opacity=".7" stroke-width="2" stroke-linejoin="round"/><polygon points="135,60 175,60 175,93 135,93" fill="var(--accent)" fill-opacity=".3"/><polygon points="135,60 175,60 205,42 165,42" fill="var(--accent)" fill-opacity=".42"/><polygon points="175,60 205,42 205,75 175,93" fill="var(--accent)" fill-opacity=".2"/><g stroke="currentColor" stroke-opacity=".5" stroke-width="1.5"><path d="M95,60 V160"/><path d="M135,60 V160"/><path d="M55,93 H175"/><path d="M55,127 H175"/><path d="M95,60 L125,42"/><path d="M135,60 L165,42"/><path d="M175,93 L205,75"/><path d="M175,127 L205,109"/></g><path d="M208,58 L232,55" fill="none" stroke="var(--accent-ink)" stroke-width="1.5" stroke-linecap="round"/><text x="236" y="59" font-size="11" fill="var(--accent-ink)" font-weight="600">chunk</text><text x="115" y="182" text-anchor="middle" font-size="11" fill="var(--muted)">chunked volume</text></svg></div>
    <div class="acg-eb" style="color:#2f6fd0">VOLUME</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-grids-chunk" title="Link to this term">Grids / Chunk</a></h3>
    <p class="acg-def">The volume is partitioned into a 3D grid of chunks for the chunked-graph.</p>
    </article>
    <article class="acg-card" id="term-head-fixation" data-cat="modalities" data-hay="head fixation / head bar a surgically implanted bar clamps the mouse's head in a repeatable position — better than 10 µm across clamp cycles, which is what makes it possible to return to the same cells on a later day. recording modalities &amp; instruments ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="hfix-t"><title id="hfix-t">Head fixation: implanted bar clamped in a repeatable position</title><ellipse cx="164" cy="128" rx="58" ry="36" fill="var(--scaffold)" fill-opacity=".18" stroke="currentColor" stroke-opacity=".5" stroke-width="2"/><ellipse cx="108" cy="142" rx="18" ry="12" fill="var(--scaffold)" fill-opacity=".18" stroke="currentColor" stroke-opacity=".5" stroke-width="2"/><circle cx="198" cy="104" r="13" fill="var(--scaffold)" fill-opacity=".18" stroke="currentColor" stroke-opacity=".5" stroke-width="2"/><circle cx="126" cy="126" r="3.2" fill="currentColor" fill-opacity=".6"/><rect x="96" y="74" width="132" height="12" rx="6" fill="var(--accent)" fill-opacity=".2" stroke="var(--accent)" stroke-width="2.4"/><rect x="70" y="60" width="28" height="40" rx="5" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".55" stroke-width="2"/><rect x="226" y="60" width="28" height="40" rx="5" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".55" stroke-width="2"/><text x="162" y="52" text-anchor="middle" font-size="11" fill="var(--accent-ink)" font-weight="600">head bar</text><text x="84" y="116" text-anchor="middle" font-size="9.5" fill="var(--muted)">clamp</text><text x="240" y="116" text-anchor="middle" font-size="9.5" fill="var(--muted)">clamp</text><text x="164" y="184" text-anchor="middle" font-size="10" class="mono" fill="var(--faint)">same position to &lt; 10 µm</text></svg></div>
    <div class="acg-eb" style="color:#c2410c">MODALITY</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-head-fixation" title="Link to this term">Head fixation / head bar</a></h3>
    <p class="acg-def">A surgically implanted bar clamps the mouse's head in a repeatable position — better than 10 µm across clamp cycles, which is what makes it possible to return to the same cells on a later day.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="background/experimental-setup.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-higher-visual-area" data-cat="responses" data-hay="higher visual area (hva) a cortical visual area receiving input from primary visual cortex, and so higher in the visual hierarchy. in the mouse: visl, visal, vispm, visam, visrl among others. response properties &amp; analysis ">
    <div class="acg-eb" style="color:#9f1239">RESPONSE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-higher-visual-area" title="Link to this term">Higher visual area (HVA)</a></h3>
    <p class="acg-def">A cortical visual area receiving input from primary visual cortex, and so higher in the visual hierarchy. In the mouse: VISl, VISal, VISpm, VISam, VISrl among others.</p>
    </article>
    <article class="acg-card" id="term-trial-outcomes" data-cat="stimuli" data-hay="hit / miss / false alarm / correct reject lick within the 750 ms window after a change = hit; no lick after a change = miss; lick after a sham change = false alarm; withholding on a sham change = correct reject. licking before the scheduled change aborts the trial. stimuli &amp; behavioural tasks ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="trout-t"><title id="trout-t">Hit, miss, false alarm and correct reject</title><text x="164" y="52" text-anchor="middle" font-size="10.5" fill="var(--muted)">lick</text><text x="256" y="52" text-anchor="middle" font-size="10.5" fill="var(--muted)">no lick</text><text x="112" y="96" text-anchor="end" font-size="10.5" fill="var(--muted)">change</text><text x="112" y="144" text-anchor="end" font-size="10.5" fill="var(--muted)">sham</text><rect x="120" y="62" width="88" height="44" rx="9" fill="var(--accent)" fill-opacity=".18" stroke="var(--accent)" stroke-width="2.4"/><text x="164" y="90" text-anchor="middle" font-size="11.5" fill="var(--accent-ink)" font-weight="600">hit</text><rect x="212" y="62" width="88" height="44" rx="9" fill="none" stroke="currentColor" stroke-opacity=".32" stroke-width="1.8"/><text x="256" y="90" text-anchor="middle" font-size="11.5" fill="var(--muted)">miss</text><rect x="120" y="110" width="88" height="44" rx="9" fill="none" stroke="currentColor" stroke-opacity=".32" stroke-width="1.8"/><text x="164" y="138" text-anchor="middle" font-size="11.5" fill="var(--muted)">false alarm</text><rect x="212" y="110" width="88" height="44" rx="9" fill="var(--accent)" fill-opacity=".18" stroke="var(--accent)" stroke-width="2.4"/><text x="256" y="132" text-anchor="middle" font-size="11.5" fill="var(--accent-ink)" font-weight="600">correct</text><text x="256" y="146" text-anchor="middle" font-size="11.5" fill="var(--accent-ink)" font-weight="600">reject</text><text x="160" y="182" text-anchor="middle" font-size="9.5" class="mono" fill="var(--faint)">750 ms response window</text></svg></div>
    <div class="acg-eb" style="color:#a16207">STIMULUS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-trial-outcomes" title="Link to this term">Hit / miss / false alarm / correct reject</a></h3>
    <p class="acg-def">Lick within the 750 ms window after a change = hit; no lick after a change = miss; lick after a sham change = false alarm; withholding on a sham change = correct reject. Licking before the scheduled change aborts the trial.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="physiology/stimuli/visual-behavior/VB-Behavior.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-image-set" data-cat="stimuli" data-hay="image set which eight natural images a session used (g or h, a or b). two images are shared between sets, so novelty is a property of the other six. stimuli &amp; behavioural tasks ">
    <div class="acg-eb" style="color:#a16207">STIMULUS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-image-set" title="Link to this term">Image set</a></h3>
    <p class="acg-def">Which eight natural images a session used (G or H, A or B). Two images are shared between sets, so novelty is a property of the other six.</p>
    </article>
    <article class="acg-card" id="term-imagery" data-cat="imaging" data-hay="imagery the 3d grayscale (0–255) array depicting em ultrastructure. imaging &amp; ultrastructure ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="img-t"><title id="img-t">Imagery: grayscale EM tile</title>
<rect x="28" y="26" width="196" height="124" rx="3" fill="var(--scaffold)" fill-opacity=".12" stroke="currentColor" stroke-opacity=".7" stroke-width="2"/>
<ellipse cx="90" cy="78" rx="40" ry="24" fill="var(--scaffold)" fill-opacity=".3"/>
<path d="M70,64 q6,14 0,28 M90,60 q6,18 0,34 M110,64 q6,14 0,28" fill="none" stroke="currentColor" stroke-opacity=".35" stroke-width="1.6" stroke-linecap="round"/>
<circle cx="170" cy="54" r="5" fill="var(--scaffold)" fill-opacity=".5"/>
<circle cx="182" cy="50" r="5" fill="var(--scaffold)" fill-opacity=".5"/>
<circle cx="178" cy="62" r="5" fill="var(--scaffold)" fill-opacity=".5"/>
<circle cx="192" cy="60" r="5" fill="var(--scaffold)" fill-opacity=".5"/>
<circle cx="184" cy="116" r="17" fill="var(--scaffold)" fill-opacity=".55"/>
<path d="M40,132 q28,-14 56,-2 t56,-4" fill="none" stroke="currentColor" stroke-opacity=".3" stroke-width="2" stroke-linecap="round"/>
<text x="126" y="166" text-anchor="middle" font-size="9.5" fill="var(--muted)">8-bit grayscale tile</text>
<rect x="244" y="30" width="22" height="15" fill="var(--scaffold)" fill-opacity=".08" stroke="currentColor" stroke-opacity=".25" stroke-width="1"/>
<rect x="244" y="45" width="22" height="15" fill="var(--scaffold)" fill-opacity=".19" stroke="currentColor" stroke-opacity=".25" stroke-width="1"/>
<rect x="244" y="60" width="22" height="15" fill="var(--scaffold)" fill-opacity=".3" stroke="currentColor" stroke-opacity=".25" stroke-width="1"/>
<rect x="244" y="75" width="22" height="15" fill="var(--scaffold)" fill-opacity=".41" stroke="currentColor" stroke-opacity=".25" stroke-width="1"/>
<rect x="244" y="90" width="22" height="15" fill="var(--scaffold)" fill-opacity=".52" stroke="currentColor" stroke-opacity=".25" stroke-width="1"/>
<rect x="244" y="105" width="22" height="15" fill="var(--scaffold)" fill-opacity=".62" stroke="currentColor" stroke-opacity=".25" stroke-width="1"/>
<rect x="244" y="120" width="22" height="15" fill="var(--scaffold)" fill-opacity=".72" stroke="currentColor" stroke-opacity=".25" stroke-width="1"/>
<rect x="244" y="135" width="22" height="15" fill="var(--scaffold)" fill-opacity=".82" stroke="currentColor" stroke-opacity=".25" stroke-width="1"/>
<text x="255" y="24" text-anchor="middle" font-size="9.5" class="mono" fill="var(--muted)">255</text>
<text x="255" y="164" text-anchor="middle" font-size="9.5" class="mono" fill="var(--muted)">0</text>
<text transform="translate(284,90) rotate(-90)" text-anchor="middle" font-size="9.5" fill="var(--faint)">intensity</text>
</svg></div>
    <div class="acg-eb" style="color:#8a6f4a">IMAGING</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-imagery" title="Link to this term">Imagery</a></h3>
    <p class="acg-def">The 3D grayscale (0–255) array depicting EM ultrastructure.</p>
    </article>
    <article class="acg-card" id="term-imaging-depth" data-cat="modalities" data-hay="imaging depth depth in µm below the cortical surface at which a plane was collected. roughly: &lt;250 layer 2/3, 250–350 layer 4, 350–500 layer 5, &gt;500 layer 6 — but layer-specific cre lines are the reliable way to get layer specificity. recording modalities &amp; instruments ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="idep-t"><title id="idep-t">Imaging depth below the cortical surface</title><rect x="90" y="34" width="100" height="140" rx="4" fill="var(--scaffold)" fill-opacity=".14" stroke="currentColor" stroke-opacity=".35" stroke-width="1.8"/><path d="M90,84 h100 M90,104 h100 M90,134 h100" stroke="currentColor" stroke-opacity=".3" stroke-width="1.2" stroke-dasharray="4 4"/><text x="140" y="28" text-anchor="middle" font-size="10" fill="var(--muted)">pia</text><text x="140" y="60" text-anchor="middle" font-size="10" fill="var(--muted)">L2/3</text><text x="140" y="98" text-anchor="middle" font-size="10" fill="var(--muted)">L4</text><text x="140" y="122" text-anchor="middle" font-size="10" fill="var(--muted)">L5</text><text x="140" y="158" text-anchor="middle" font-size="10" fill="var(--muted)">L6</text><path d="M74,34 V174" stroke="currentColor" stroke-opacity=".3" stroke-width="1.4"/><path d="M74,34.0 h6" stroke="currentColor" stroke-opacity=".3" stroke-width="1.4"/><text x="68" y="37.0" text-anchor="end" font-size="9" class="mono" fill="var(--faint)">0</text><path d="M74,84.0 h6" stroke="currentColor" stroke-opacity=".3" stroke-width="1.4"/><text x="68" y="87.0" text-anchor="end" font-size="9" class="mono" fill="var(--faint)">250</text><path d="M74,104.0 h6" stroke="currentColor" stroke-opacity=".3" stroke-width="1.4"/><text x="68" y="107.0" text-anchor="end" font-size="9" class="mono" fill="var(--faint)">350</text><path d="M74,134.0 h6" stroke="currentColor" stroke-opacity=".3" stroke-width="1.4"/><text x="68" y="137.0" text-anchor="end" font-size="9" class="mono" fill="var(--faint)">500</text><path d="M90,74 h100" stroke="var(--accent)" stroke-width="3" stroke-linecap="round"/><text x="196" y="78" font-size="10" fill="var(--accent-ink)" font-weight="600">plane</text><text x="160" y="192" text-anchor="middle" font-size="9.5" fill="var(--muted)">Cre line, not depth, gives layer specificity</text></svg></div>
    <div class="acg-eb" style="color:#c2410c">MODALITY</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-imaging-depth" title="Link to this term">Imaging depth</a></h3>
    <p class="acg-def">Depth in µm below the cortical surface at which a plane was collected. Roughly: &lt;250 layer 2/3, 250–350 layer 4, 350–500 layer 5, &gt;500 layer 6 — but layer-specific Cre lines are the reliable way to get layer specificity.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="physiology/ophys/visual-coding/vc2p-dataset.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-imaging-plane" data-cat="modalities" data-hay="imaging plane one two-photon focal plane. a single-plane microscope images one per session; the multiscope/mesoscope images up to eight. the plane, not the session, is what an ophys experiment is defined on. recording modalities &amp; instruments ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="ipl-t"><title id="ipl-t">Imaging plane: one focal plane within a multi-plane stack</title><path d="M74,46 L214,46 L172,70 L32,70 Z" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".4" stroke-width="1.8" stroke-linejoin="round"/><path d="M74,68 L214,68 L172,92 L32,92 Z" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".4" stroke-width="1.8" stroke-linejoin="round"/><path d="M74,90 L214,90 L172,114 L32,114 Z" fill="var(--accent)" fill-opacity=".14" stroke="var(--accent)" stroke-width="2.4" stroke-linejoin="round"/><g fill="var(--neuron)"><circle cx="80" cy="106" r="3.4"/><circle cx="112" cy="98" r="3.4"/><circle cx="150" cy="106" r="3.4"/><circle cx="128" cy="108" r="3.4"/><circle cx="176" cy="99" r="3.4"/></g><path d="M74,112 L214,112 L172,136 L32,136 Z" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".4" stroke-width="1.8" stroke-linejoin="round"/><path d="M74,134 L214,134 L172,158 L32,158 Z" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".4" stroke-width="1.8" stroke-linejoin="round"/><path d="M236,46 q7,0 7,8 v34 q0,10 9,10 q-9,0 -9,10 v34 q0,8 -7,8" fill="none" stroke="currentColor" stroke-opacity=".35" stroke-width="1.6" stroke-linecap="round"/><text x="262" y="98" font-size="10" fill="var(--muted)">up to 8</text><text x="262" y="112" font-size="10" fill="var(--muted)">planes</text><path d="M226,102 H210" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"/><text x="123" y="26" text-anchor="middle" font-size="11" fill="var(--accent-ink)" font-weight="600">one plane = one experiment</text><text x="123" y="180" text-anchor="middle" font-size="9.5" fill="var(--faint)">session = all planes together</text></svg></div>
    <div class="acg-eb" style="color:#c2410c">MODALITY</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-imaging-plane" title="Link to this term">Imaging plane</a></h3>
    <p class="acg-def">One two-photon focal plane. A single-plane microscope images one per session; the Multiscope/Mesoscope images up to eight. The plane, not the session, is what an ophys experiment is defined on.</p>
    </article>
    <article class="acg-card" id="term-indicator-sparsification" data-cat="responses" data-hay="indicator sparsification calcium indicators respond non-linearly to firing rate: bursts are boosted, isolated spikes washed out. tuning measured with ophys therefore looks sharper and sparser than the same tuning measured with ephys. response properties &amp; analysis ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="isp-t"><title id="isp-t">Indicator sparsification: calcium boosts bursts and loses isolated spikes</title><text x="26" y="46" font-size="9" class="mono" fill="var(--faint)">dF/F</text><path d="M26,96 L40,96 C46,96 46,52 56,52 C68,54 74,92 92,95 L100,95 C104,95 104,84 108,84 C116,86 120,94 136,95" fill="none" stroke="var(--neuron)" stroke-width="2.2" stroke-linecap="round"/><path d="M26,136 H136" stroke="currentColor" stroke-opacity=".25" stroke-width="1.2"/><path d="M40,136 V122" stroke="currentColor" stroke-opacity=".75" stroke-width="2" stroke-linecap="round"/><path d="M46,136 V122" stroke="currentColor" stroke-opacity=".75" stroke-width="2" stroke-linecap="round"/><path d="M52,136 V122" stroke="currentColor" stroke-opacity=".75" stroke-width="2" stroke-linecap="round"/><path d="M58,136 V122" stroke="currentColor" stroke-opacity=".75" stroke-width="2" stroke-linecap="round"/><path d="M104,136 V122" stroke="currentColor" stroke-opacity=".75" stroke-width="2" stroke-linecap="round"/><text x="52" y="152" text-anchor="middle" font-size="9" fill="var(--faint)">burst</text><text x="106" y="152" text-anchor="middle" font-size="9" fill="var(--faint)">single</text><text x="82" y="176" text-anchor="middle" font-size="9.5" fill="var(--muted)">bursts boosted</text><path d="M180,136 H302" stroke="currentColor" stroke-opacity=".3" stroke-width="1.4"/><path d="M182,130 C204,128 214,92 240,90 C266,88 278,126 300,130" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="2.2" stroke-linecap="round"/><path d="M182,134 C216,133 228,56 240,56 C252,56 264,133 300,134" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round"/><text x="240" y="46" text-anchor="middle" font-size="10" fill="var(--accent-ink)" font-weight="600">ophys</text><text x="296" y="112" text-anchor="end" font-size="10" fill="var(--muted)">ephys</text><text x="240" y="176" text-anchor="middle" font-size="9.5" fill="var(--muted)">tuning looks sharper</text></svg></div>
    <div class="acg-eb" style="color:#9f1239">RESPONSE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-indicator-sparsification" title="Link to this term">Indicator sparsification</a></h3>
    <p class="acg-def">Calcium indicators respond non-linearly to firing rate: bursts are boosted, isolated spikes washed out. Tuning measured with ophys therefore looks sharper and sparser than the same tuning measured with ephys.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="background/Ophys-ephys-comparison.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-inhibitory-v1-cell-types" data-cat="celltypes" data-hay="inhibitory v1 cell types interneuron subclasses: bc, bpc, mc, ngc (manual) and ptc/dtc/stc/itc (targeting-based mtypes). cell types &amp; cortical anatomy ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="iv-t"><title id="iv-t">Inhibitory V1 cell types: manual vs targeting</title>
<text x="84" y="26" text-anchor="middle" font-size="12" font-weight="600" fill="var(--accent-ink)">manual</text>
<text x="84" y="38" text-anchor="middle" font-size="8" fill="var(--muted)">by morphology</text>
<text x="236" y="26" text-anchor="middle" font-size="12" font-weight="600" fill="var(--accent-ink)">targeting-based</text>
<text x="236" y="38" text-anchor="middle" font-size="8" fill="var(--muted)">by synaptic target</text>
<path d="M160,44 V172" stroke="currentColor" stroke-opacity=".3" stroke-width="1.6" stroke-dasharray="3 3"/>
<g stroke="var(--dendrite)" stroke-width="2" fill="none" stroke-linecap="round">
<path d="M52,62 V52"/>
<path d="M116,68 V54 M116,76 V92"/>
<path d="M52,140 l-6,7 M52,140 l6,7"/>
</g>
<g stroke="var(--axon)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path d="M52,70 V80 M52,80 C47,82 44,86 46,93 M52,80 C57,82 60,86 58,93"/>
<path d="M52,132 V114 M44,114 H60"/>
<path d="M116,132 l0,-11 M116,132 l9,-6 M116,132 l11,0 M116,132 l9,6 M116,132 l0,11 M116,132 l-9,6 M116,132 l-11,0 M116,132 l-9,-6"/>
</g>
<g fill="none" stroke="currentColor" stroke-opacity=".4" stroke-width="1.6"><circle cx="45" cy="90" r="4"/><circle cx="59" cy="90" r="4"/></g>
<g fill="var(--neuron)"><circle cx="52" cy="66" r="4"/><circle cx="116" cy="72" r="4"/><circle cx="52" cy="136" r="4"/><circle cx="116" cy="132" r="4"/></g>
<g stroke="var(--axon)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path d="M198,72 H210 M210,72 l-4,-3 M210,72 l-4,3"/>
<path d="M262,72 H274 M274,72 l-4,-3 M274,72 l-4,3"/>
<path d="M262,132 H272 M272,132 l-4,-3 M272,132 l-4,3"/>
</g>
<g stroke="var(--axon)" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-dasharray="2 2">
<path d="M199,132 L212,124 M199,132 L214,132 M199,132 L212,140"/>
</g>
<polygon points="215,65 210,79 220,79" fill="var(--neuron)" fill-opacity=".18" stroke="var(--neuron)" stroke-width="2" stroke-linejoin="round"/>
<path d="M280,62 V82 M280,70 l6,-4" stroke="var(--dendrite)" stroke-width="2" fill="none" stroke-linecap="round"/>
<circle cx="280" cy="132" r="5" fill="none" stroke="var(--dendrite)" stroke-width="2"/>
<path d="M280,127 v-4 M280,137 v4" stroke="var(--dendrite)" stroke-width="1.6" stroke-linecap="round"/>
<g fill="var(--neuron)"><circle cx="194" cy="72" r="3.5"/><circle cx="258" cy="72" r="3.5"/><circle cx="194" cy="132" r="3.5"/><circle cx="258" cy="132" r="3.5"/></g>
<g class="mono" text-anchor="middle" font-size="9.5" fill="var(--muted)">
<text x="52" y="104">BC</text><text x="116" y="104">BPC</text><text x="52" y="164">MC</text><text x="116" y="164">NGC</text>
<text x="204" y="104">PTC</text><text x="268" y="104">DTC</text><text x="204" y="164">STC</text><text x="268" y="164">ITC</text>
</g>
</svg></div>
    <div class="acg-eb" style="color:#c9357f">CELLTYPE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-inhibitory-v1-cell-types" title="Link to this term">Inhibitory V1 cell types</a></h3>
    <p class="acg-def">Interneuron subclasses: BC, BPC, MC, NGC (manual) and PTC/DTC/STC/ITC (targeting-based mtypes).</p>
    </article>
    <article class="acg-card" id="term-interneuron" data-cat="celltypes" data-hay="interneuron a neuron with short axons that synapses only with nearby neurons. in cortex the term is often used to mean an inhibitory neuron. cell types &amp; cortical anatomy ">
    <div class="acg-eb" style="color:#c9357f">CELLTYPE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-interneuron" title="Link to this term">Interneuron</a></h3>
    <p class="acg-def">A neuron with short axons that synapses only with nearby neurons. In cortex the term is often used to mean an inhibitory neuron.</p>
    </article>
    <article class="acg-card" id="term-intrinsic-signal-imaging" data-cat="modalities" data-hay="intrinsic signal imaging (isi) measuring blood-flow changes from the reflectance of red light on the brain surface. commonly used to map retinotopy across the cortical surface and so to target later recordings. recording modalities &amp; instruments ">
    <div class="acg-eb" style="color:#c2410c">MODALITY</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-intrinsic-signal-imaging" title="Link to this term">Intrinsic signal imaging (ISI)</a></h3>
    <p class="acg-def">Measuring blood-flow changes from the reflectance of red light on the brain surface. Commonly used to map retinotopy across the cortical surface and so to target later recordings.</p>
    <div class="acg-meta"><span class="acg-chip acg-warn" title="This word means different things in different places">&#9888; ambiguous</span></div>
    </article>
    <article class="acg-card" id="term-isi-violations" data-cat="quality" data-hay="isi_violations rate of inter-spike intervals shorter than the refractory period. a real neuron cannot fire that fast, so violations mean spikes from more than one cell were merged. default threshold 0.5. quality metrics ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="isiv-t"><title id="isiv-t">isi_violations: intervals shorter than the refractory period</title><path d="M24,120 H296" stroke="currentColor" stroke-opacity=".3" stroke-width="1.4"/><rect x="118" y="88" width="13" height="32" rx="2" fill="var(--accent)" fill-opacity=".16"/><path d="M40,120 V92" stroke="currentColor" stroke-opacity=".8" stroke-width="2.2" stroke-linecap="round"/><path d="M84,120 V92" stroke="currentColor" stroke-opacity=".8" stroke-width="2.2" stroke-linecap="round"/><path d="M176,120 V92" stroke="currentColor" stroke-opacity=".8" stroke-width="2.2" stroke-linecap="round"/><path d="M220,120 V92" stroke="currentColor" stroke-opacity=".8" stroke-width="2.2" stroke-linecap="round"/><path d="M262,120 V92" stroke="currentColor" stroke-opacity=".8" stroke-width="2.2" stroke-linecap="round"/><path d="M120,120 V88" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round"/><path d="M129,120 V88" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round"/><path d="M120,132 v6 H129 v-6" fill="none" stroke="var(--accent)" stroke-width="1.6" stroke-linejoin="round"/><text x="124" y="154" text-anchor="middle" font-size="9.5" fill="var(--accent-ink)" font-weight="600">&lt; refractory</text><path d="M220,132 v6 H262 v-6" fill="none" stroke="currentColor" stroke-opacity=".4" stroke-width="1.6" stroke-linejoin="round"/><text x="241" y="154" text-anchor="middle" font-size="9.5" fill="var(--faint)">ISI</text><text x="160" y="40" text-anchor="middle" font-size="10.5" fill="var(--muted)">spikes from two cells merged</text><text x="160" y="186" text-anchor="middle" font-size="9" class="mono" fill="var(--faint)">threshold 0.5</text></svg></div>
    <div class="acg-eb" style="color:#4338ca">QUALITY</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-isi-violations" title="Link to this term">isi_violations</a></h3>
    <p class="acg-def">Rate of inter-spike intervals shorter than the refractory period. A real neuron cannot fire that fast, so violations mean spikes from more than one cell were merged. Default threshold 0.5.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="physiology/ephys/visual-coding/vcnp-quality-metrics.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-isolation-distance" data-cat="quality" data-hay="isolation_distance distance in mahalanobis space to the nearest other cluster of waveforms. higher is better separated. quality metrics ">
    <div class="acg-eb" style="color:#4338ca">QUALITY</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-isolation-distance" title="Link to this term">isolation_distance</a></h3>
    <p class="acg-def">Distance in Mahalanobis space to the nearest other cluster of waveforms. Higher is better separated.</p>
    </article>
    <article class="acg-card" id="term-it-et-np-ct-sp" data-cat="celltypes" data-hay="it / et / np / ct / sp projection categories: intratelencephalic, extratelencephalic, near-projecting, corticothalamic, subplate. cell types &amp; cortical anatomy ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="ip-t"><title id="ip-t">Excitatory projection classes and their targets</title>
<rect x="34" y="22" width="50" height="158" fill="currentColor" fill-opacity=".04" stroke="currentColor" stroke-opacity=".3" stroke-width="1.4"/>
<path d="M34,36 H84 M34,70 H84 M34,92 H84 M34,128 H84 M34,168 H84" stroke="currentColor" stroke-opacity=".28" stroke-width="1.1"/>
<g class="mono" font-size="7.5" fill="var(--muted)">
<text x="13" y="31">L1</text><text x="13" y="55">L2/3</text><text x="13" y="83">L4</text><text x="13" y="112">L5</text><text x="13" y="150">L6</text><text x="12" y="176">L6b</text>
</g>
<g stroke="var(--axon)" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path d="M80,54 C140,42 185,44 224,46 M224,46 l-7,-3 M224,46 l-6,4"/>
<path d="M80,150 C140,150 185,150 224,150 M224,150 l-7,-4 M224,150 l-7,4"/>
<path d="M80,112 C150,138 195,166 224,176 M224,176 l-8,-2 M224,176 l-2,-7"/>
<path d="M80,122 C104,120 120,110 126,98 M126,98 l-4,7 M126,98 l6,3"/>
<path d="M80,172 C98,177 116,181 134,182 M134,182 l-7,-3 M134,182 l-6,4"/>
</g>
<g fill="var(--neuron)"><circle cx="80" cy="54" r="4"/><circle cx="80" cy="112" r="4"/><circle cx="80" cy="122" r="4"/><circle cx="80" cy="150" r="4"/><circle cx="80" cy="172" r="4"/></g>
<g font-size="10">
<text x="230" y="50"><tspan class="mono" font-weight="600" fill="var(--axon)">IT</tspan><tspan fill="var(--muted)"> cortex</tspan></text>
<text x="132" y="96"><tspan class="mono" font-weight="600" fill="var(--axon)">NP</tspan><tspan fill="var(--muted)"> local</tspan></text>
<text x="230" y="154"><tspan class="mono" font-weight="600" fill="var(--axon)">CT</tspan><tspan fill="var(--muted)"> thalamus</tspan></text>
<text x="230" y="180"><tspan class="mono" font-weight="600" fill="var(--axon)">ET</tspan><tspan fill="var(--muted)"> brainstem</tspan></text>
<text x="140" y="186"><tspan class="mono" font-weight="600" fill="var(--axon)">SP</tspan><tspan fill="var(--muted)"> subplate</tspan></text>
</g>
</svg></div>
    <div class="acg-eb" style="color:#c9357f">CELLTYPE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-it-et-np-ct-sp" title="Link to this term">IT / ET / NP / CT / SP</a></h3>
    <p class="acg-def">Projection categories: intratelencephalic, extratelencephalic, near-projecting, corticothalamic, subplate.</p>
    </article>
    <article class="acg-card" id="term-kilosort" data-cat="signals" data-hay="kilosort the template-matching sorter used for all allen neuropixels data. it merges automatically, so no manual curation step is needed for recordings with little drift. signals &amp; preprocessing ">
    <div class="acg-eb" style="color:#0369a1">SIGNAL</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-kilosort" title="Link to this term">Kilosort</a></h3>
    <p class="acg-def">The template-matching sorter used for all Allen Neuropixels data. It merges automatically, so no manual curation step is needed for recordings with little drift.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="physiology/ephys/visual-coding/vcnp-quality-metrics.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-l-ratio" data-cat="quality" data-hay="l_ratio contamination measure related to isolation distance: the probability that nearby spikes belong to this cluster. lower is better. quality metrics ">
    <div class="acg-eb" style="color:#4338ca">QUALITY</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-l-ratio" title="Link to this term">l_ratio</a></h3>
    <p class="acg-def">Contamination measure related to isolation distance: the probability that nearby spikes belong to this cluster. Lower is better.</p>
    </article>
    <article class="acg-card" id="term-layer-cortical" data-cat="celltypes" data-hay="layer (cortical) l1–l6 along the pia→wm axis; drives cell-type naming. not the neuroglancer layer. cell types &amp; cortical anatomy ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="lc-t"><title id="lc-t">Cortical layers from pia to white matter</title>
<text x="150" y="18" text-anchor="middle" font-size="10" fill="var(--muted)">pia</text>
<g stroke="none">
<rect x="100" y="24" width="100" height="18" fill="currentColor" fill-opacity=".05"/>
<rect x="100" y="42" width="100" height="40" fill="currentColor" fill-opacity=".10"/>
<rect x="100" y="82" width="100" height="22" fill="currentColor" fill-opacity=".06"/>
<rect x="100" y="104" width="100" height="36" fill="currentColor" fill-opacity=".10"/>
<rect x="100" y="140" width="100" height="30" fill="currentColor" fill-opacity=".06"/>
<rect x="100" y="170" width="100" height="12" fill="currentColor" fill-opacity=".18"/>
</g>
<path d="M100,24 V182 M200,24 V182 M100,42 H200 M100,82 H200 M100,104 H200 M100,140 H200 M100,170 H200 M100,182 H200" stroke="currentColor" stroke-opacity=".3" stroke-width="1.2" fill="none"/>
<path d="M100,24 H200" stroke="var(--accent)" stroke-width="2.6" stroke-linecap="round"/>
<path d="M84,28 V174 M84,174 l-4,-6 M84,174 l4,-6" stroke="currentColor" stroke-opacity=".5" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<text transform="translate(72,101) rotate(-90)" text-anchor="middle" class="mono" font-size="9" fill="var(--muted)">cortical depth</text>
<g class="mono" font-size="10" fill="var(--muted)">
<text x="210" y="36">L1</text><text x="210" y="65">L2/3</text><text x="210" y="96">L4</text><text x="210" y="125">L5</text><text x="210" y="157">L6</text><text x="210" y="178">white matter</text>
</g>
</svg></div>
    <div class="acg-eb" style="color:#c9357f">CELLTYPE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-layer-cortical" title="Link to this term">Layer (cortical)</a></h3>
    <p class="acg-def">L1–L6 along the pia→WM axis; drives cell-type naming. NOT the Neuroglancer layer.</p>
    <div class="acg-meta"><span class="acg-chip acg-warn" title="This word means different things in different places">&#9888; ambiguous</span></div>
    </article>
    <article class="acg-card" id="term-level-of-detail-lod" data-cat="morphology" data-hay="level of detail (lod) static meshes are smaller, multi-lod, precomputed://; dynamic meshes are detailed, single-lod, graphene://. morphology — meshes &amp; skeletons ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="m-lod"><title id="m-lod">Same neuron at coarse versus fine triangle density</title><line x1="160" y1="24" x2="160" y2="176" stroke="currentColor" stroke-opacity=".25" stroke-width="1.5" stroke-dasharray="3 4"/><polygon points="75,68 108,88 112,120 88,145 55,142 40,112 48,82" fill="var(--neuron)" fill-opacity=".12" stroke="var(--neuron)" stroke-width="2" stroke-linejoin="round"/><g fill="none" stroke="var(--neuron)" stroke-opacity=".6" stroke-width="1.4"><path d="M74,105 L75,68 M74,105 L108,88 M74,105 L112,120 M74,105 L88,145 M74,105 L55,142 M74,105 L40,112 M74,105 L48,82"/></g><text x="75" y="170" text-anchor="middle" font-size="10.5" fill="var(--muted)">coarse</text><text x="75" y="184" text-anchor="middle" font-size="9" class="mono" fill="var(--faint)">~7 faces</text><polygon points="225,66 252,74 266,96 266,120 252,142 225,150 198,142 184,120 184,96 198,74" fill="var(--neuron)" fill-opacity=".12" stroke="var(--neuron)" stroke-width="2" stroke-linejoin="round"/><g fill="none" stroke="var(--neuron)" stroke-opacity=".55" stroke-width="1.2"><path d="M225,108 L225,66 M225,108 L252,74 M225,108 L266,96 M225,108 L266,120 M225,108 L252,142 M225,108 L225,150 M225,108 L198,142 M225,108 L184,120 M225,108 L184,96 M225,108 L198,74"/><path d="M225,66 L266,96 L252,142 L198,142 L184,96 L225,66 M252,74 L266,120 L225,150 L184,120 L198,74 L252,74"/></g><text x="225" y="170" text-anchor="middle" font-size="10.5" fill="var(--muted)">fine</text><text x="225" y="184" text-anchor="middle" font-size="9" class="mono" fill="var(--faint)">~40 faces</text></svg></div>
    <div class="acg-eb" style="color:#2a8f57">MORPH</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-level-of-detail-lod" title="Link to this term">Level of detail (LOD)</a></h3>
    <p class="acg-def">Static meshes are smaller, multi-LOD, <code>precomputed://</code>; dynamic meshes are detailed, single-LOD, <code>graphene://</code>.</p>
    </article>
    <article class="acg-card" id="term-local-field-potential" data-cat="signals" data-hay="local field potential (lfp) transient electrical potential generated in nervous tissue by the summed activity of the cells in it, typically measured below 250 hz. informative about oscillations and network synchrony. signals &amp; preprocessing ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="lfp-t"><title id="lfp-t">Local field potential: summed activity of nearby cells</title><circle cx="74" cy="108" r="52" fill="var(--scaffold)" fill-opacity=".14" stroke="currentColor" stroke-opacity=".3" stroke-width="1.6" stroke-dasharray="4 4"/><path d="M66,26 V104 L74,118 L82,104 V26" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".6" stroke-width="2" stroke-linejoin="round"/><g fill="var(--neuron)" fill-opacity=".45" stroke="var(--neuron)" stroke-width="1.6"><circle cx="38" cy="88" r="6"/><circle cx="46" cy="136" r="6"/><circle cx="98" cy="82" r="6"/><circle cx="106" cy="130" r="6"/><circle cx="72" cy="152" r="6"/><circle cx="34" cy="116" r="6"/></g><path d="M132,108 H164" stroke="currentColor" stroke-opacity=".55" stroke-width="2" stroke-linecap="round"/><path d="M158,104 L164,108 L158,112" fill="none" stroke="currentColor" stroke-opacity=".55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M176,108 C188,80 200,80 212,108 C220,127 226,131 234,116 C242,101 248,98 256,110 C266,127 274,131 284,108 C291,91 300,92 306,104" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round"/><text x="74" y="180" text-anchor="middle" font-size="10.5" fill="var(--muted)">many cells, one electrode</text><text x="242" y="164" text-anchor="middle" font-size="11" fill="var(--accent-ink)" font-weight="600">summed potential</text><text x="242" y="180" text-anchor="middle" font-size="9.5" class="mono" fill="var(--faint)">below 250 Hz</text></svg></div>
    <div class="acg-eb" style="color:#0369a1">SIGNAL</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-local-field-potential" title="Link to this term">Local field potential (LFP)</a></h3>
    <p class="acg-def">Transient electrical potential generated in nervous tissue by the summed activity of the cells in it, typically measured below 250 Hz. Informative about oscillations and network synchrony.</p>
    </article>
    <article class="acg-card" id="term-locally-sparse-noise" data-cat="stimuli" data-hay="locally sparse noise black and white spots flashed on a grey screen, arranged so no two spots fall within 5 pixels of each other. the exclusion zone is what makes the average around any pixel structureless, so a receptive field can be recovered. stimuli &amp; behavioural tasks ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="lsn-t"><title id="lsn-t">Locally sparse noise with an exclusion zone</title> <rect x="34" y="26" width="200" height="128" rx="5" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".4" stroke-width="1.8"/> <g stroke="currentColor" stroke-opacity=".12" stroke-width="1"> <path d="M59,26 V154 M84,26 V154 M109,26 V154 M134,26 V154 M159,26 V154 M184,26 V154 M209,26 V154"/> <path d="M34,51 H234 M34,77 H234 M34,103 H234 M34,129 H234"/></g> <rect x="60" y="52" width="24" height="24" fill="currentColor" fill-opacity=".65"/> <rect x="160" y="27" width="24" height="24" fill="var(--accent)" fill-opacity=".8"/> <rect x="110" y="104" width="24" height="24" fill="var(--accent)" fill-opacity=".8"/> <rect x="185" y="129" width="24" height="24" fill="currentColor" fill-opacity=".65"/> <circle cx="122" cy="116" r="34" fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-dasharray="4 4"/> <path d="M122,116 L156,116" stroke="var(--accent)" stroke-width="1.4"/> <text x="140" y="112" font-size="9" class="mono" fill="var(--accent-ink)">5 px</text> <text x="252" y="52" font-size="10" fill="var(--muted)">bright</text> <rect x="252" y="60" width="14" height="14" fill="var(--accent)" fill-opacity=".8"/> <text x="252" y="98" font-size="10" fill="var(--muted)">dark</text> <rect x="252" y="106" width="14" height="14" fill="currentColor" fill-opacity=".65"/> <text x="134" y="176" text-anchor="middle" font-size="9.5" fill="var(--faint)">no two spots within the zone</text> </svg></div>
    <div class="acg-eb" style="color:#a16207">STIMULUS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-locally-sparse-noise" title="Link to this term">Locally sparse noise</a></h3>
    <p class="acg-def">Black and white spots flashed on a grey screen, arranged so no two spots fall within 5 pixels of each other. The exclusion zone is what makes the average around any pixel structureless, so a receptive field can be recovered.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="physiology/stimuli/passive-visual-stimuli/visual-stimuli-list.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-manifest" data-cat="dataorg" data-hay="manifest the file a cache uses to know what data exists and where it was put. instantiating a cache without naming one creates it in the working directory. there is no manifest when you read nwb directly; the file is the manifest. datasets, sessions &amp; files ">
    <div class="acg-eb" style="color:#3f3f46">DATA</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-manifest" title="Link to this term">Manifest</a></h3>
    <p class="acg-def">The file a cache uses to know what data exists and where it was put. Instantiating a cache without naming one creates it in the working directory. There is no manifest when you read NWB directly; the file is the manifest.</p>
    </article>
    <article class="acg-card" id="term-martinotti-cell" data-cat="celltypes" data-hay="martinotti cell (mc) a subtype of sst cell that targets the apical dendrites of pyramidal cells in layer 1. martinotti cells are found in layer 2/3 and layer 5. cell types &amp; cortical anatomy ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="d-martinotti-cell"><title id="d-martinotti-cell">Martinotti cell</title><defs><clipPath id="d-martinotti-cell-c" clipPathUnits="userSpaceOnUse"><rect x="88" y="26" width="76" height="118"/></clipPath></defs><g transform="translate(160,100) scale(1.55) translate(-126,-88)"><g clip-path="url(#d-martinotti-cell-c)"><g stroke="var(--dendrite)" stroke-width="2" fill="none" stroke-linecap="round">
<path d="M50,73 V54 M50,73 l-9,-12 M50,73 l9,-12"/>
<path d="M126,121 V132 M126,121 l-8,9 M126,121 l8,9"/>
<path d="M202,85 V54 M202,54 l-5,-6 M202,54 l5,-6 M202,95 V128 M202,128 l-5,6 M202,128 l5,6"/>
</g>
<g stroke="var(--axon)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path d="M50,83 V95 M50,95 C44,98 40,104 42,112 M50,95 C56,98 60,104 58,112"/>
<path d="M126,111 V54 M112,54 H140 M116,54 v-6 M126,54 v-6 M136,54 v-6"/>
<path d="M278,88 l0,-16 M278,88 l14,-8 M278,88 l16,0 M278,88 l14,8 M278,88 l0,16 M278,88 l-14,8 M278,88 l-16,0 M278,88 l-14,-8"/>
</g>
<g fill="none" stroke="currentColor" stroke-opacity=".4" stroke-width="1.6"><circle cx="42" cy="110" r="5"/><circle cx="58" cy="110" r="5"/></g>
<g fill="var(--neuron)"><circle cx="50" cy="78" r="5"/><circle cx="126" cy="116" r="5"/><circle cx="202" cy="90" r="5"/><circle cx="278" cy="88" r="5"/></g></g></g></svg></div>
    <div class="acg-eb" style="color:#c9357f">CELLTYPE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-martinotti-cell" title="Link to this term">Martinotti cell (MC)</a></h3>
    <p class="acg-def">A subtype of SST cell that targets the apical dendrites of pyramidal cells in layer 1. Martinotti cells are found in layer 2/3 and layer 5.</p>
    </article>
    <article class="acg-card" id="term-materialization-versioning" data-cat="cave" data-hay="materialization &amp; versioning timestamped snapshots of the annotation db; each version = a fixed timestamp (microns v1507, v1dd v1196). cave — access &amp; versioning ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="cave-mv"><title id="cave-mv">Materialization and versioning</title>
<line x1="28" y1="132" x2="290" y2="132" stroke="currentColor" stroke-opacity=".55" stroke-width="2" stroke-linecap="round"/>
<polygon points="296,132 287,128 287,136" fill="currentColor" fill-opacity=".55"/>
<text x="290" y="150" text-anchor="end" font-size="9.5" class="mono" fill="var(--muted)">time</text>
<line x1="64" y1="132" x2="64" y2="99" stroke="currentColor" stroke-opacity=".55" stroke-width="2"/>
<circle cx="64" cy="88" r="11" fill="var(--surface)" stroke="currentColor" stroke-opacity=".55" stroke-width="2"/>
<text x="64" y="92" text-anchor="middle" font-size="10" class="mono" fill="var(--muted)">v1</text>
<line x1="124" y1="132" x2="124" y2="99" stroke="currentColor" stroke-opacity=".55" stroke-width="2"/>
<circle cx="124" cy="88" r="11" fill="var(--surface)" stroke="currentColor" stroke-opacity=".55" stroke-width="2"/>
<text x="124" y="92" text-anchor="middle" font-size="10" class="mono" fill="var(--muted)">v2</text>
<line x1="184" y1="132" x2="184" y2="99" stroke="var(--ok)" stroke-width="2.6"/>
<circle cx="184" cy="88" r="11" fill="var(--ok)" fill-opacity=".18" stroke="var(--ok)" stroke-width="2.6"/>
<text x="184" y="92" text-anchor="middle" font-size="10" class="mono" fill="var(--ok)" font-weight="600">v3</text>
<line x1="244" y1="132" x2="244" y2="99" stroke="currentColor" stroke-opacity=".55" stroke-width="2"/>
<circle cx="244" cy="88" r="11" fill="var(--surface)" stroke="currentColor" stroke-opacity=".55" stroke-width="2"/>
<text x="244" y="92" text-anchor="middle" font-size="10" class="mono" fill="var(--muted)">v4</text>
<text x="42" y="34" font-size="11" class="mono" fill="var(--accent-ink)" font-weight="600">query @ v3</text>
<path d="M60,42 C110,44 152,54 181,71" fill="none" stroke="var(--accent-ink)" stroke-width="2" stroke-linecap="round"/>
<polygon points="184,74 174,70 179,64" fill="var(--accent-ink)"/>
</svg></div>
    <div class="acg-eb" style="color:#0f766e">CAVE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-materialization-versioning" title="Link to this term">Materialization &amp; Versioning</a></h3>
    <p class="acg-def">Timestamped snapshots of the annotation DB; each version = a fixed timestamp (MICrONS v1507, V1DD v1196).</p>
    </article>
    <article class="acg-card" id="term-maximum-projection" data-cat="signals" data-hay="maximum / average projection the imaging movie collapsed over time into one image — the standard way to see every cell in a plane at once. signals &amp; preprocessing ">
    <div class="acg-eb" style="color:#0369a1">SIGNAL</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-maximum-projection" title="Link to this term">Maximum / average projection</a></h3>
    <p class="acg-def">The imaging movie collapsed over time into one image — the standard way to see every cell in a plane at once.</p>
    <div class="acg-meta"><span class="acg-chip acg-warn" title="This word means different things in different places">&#9888; ambiguous</span></div>
    </article>
    <article class="acg-card" id="term-merge-errors" data-cat="proofreading" data-hay="merge errors two neurons' processes incorrectly joined; they add false connections. proofreading &amp; data quality ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="pm"><title id="pm">Merge errors — false merge</title>
<circle cx="34" cy="60" r="10" fill="var(--neuron)" fill-opacity=".22" stroke="var(--neuron)" stroke-width="2.4"/>
<path d="M40,66 C72,74 106,86 138,98" fill="none" stroke="var(--neuron)" stroke-width="2.6" stroke-linecap="round"/>
<path d="M30,52 C28,42 27,36 26,28" fill="none" stroke="var(--neuron)" stroke-width="2.6" stroke-linecap="round"/>
<circle cx="34" cy="150" r="10" fill="var(--dendrite)" fill-opacity=".22" stroke="var(--dendrite)" stroke-width="2.4"/>
<path d="M40,144 C72,136 106,112 138,100" fill="none" stroke="var(--dendrite)" stroke-width="2.6" stroke-linecap="round"/>
<path d="M30,160 C28,170 27,176 26,184" fill="none" stroke="var(--dendrite)" stroke-width="2.6" stroke-linecap="round"/>
<circle cx="140" cy="99" r="11" fill="none" stroke="var(--error)" stroke-width="2.4"/>
<path d="M135,94 l10,10 M145,94 l-10,10" stroke="var(--error)" stroke-width="2" stroke-linecap="round"/>
<text x="96" y="150" text-anchor="middle" font-size="9.5" fill="var(--error)">false merge — adds a connection</text>
</svg></div>
    <div class="acg-eb" style="color:#b8791a">PROOF</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-merge-errors" title="Link to this term">Merge errors</a></h3>
    <p class="acg-def">Two neurons' processes incorrectly joined; they add false connections.</p>
    </article>
    <article class="acg-card" id="term-meshes" data-cat="morphology" data-hay="meshes vertices + triangular faces defining a neuron's 3d outer surface. morphology — meshes &amp; skeletons ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="m-mesh"><title id="m-mesh">Neuron surface mesh with triangle-wireframe zoom</title><path d="M120,90 C150,70 165,64 180,58 M92,128 C86,150 80,160 72,172" fill="none" stroke="var(--neuron)" stroke-width="6" stroke-linecap="round"/><ellipse cx="100" cy="105" rx="28" ry="24" fill="var(--neuron)" fill-opacity=".2" stroke="var(--neuron)" stroke-width="2.2"/><g fill="none" stroke="currentColor" stroke-opacity=".3" stroke-width="1"><path d="M80,92 L118,100 L96,124 Z M118,100 L124,116 L96,124 M80,92 L86,110 L96,124"/></g><rect x="142" y="58" width="16" height="16" fill="none" stroke="currentColor" stroke-opacity=".7" stroke-width="1.5" stroke-dasharray="3 3"/><line x1="158" y1="60" x2="221" y2="118" stroke="currentColor" stroke-opacity=".4" stroke-width="1.2"/><line x1="152" y1="74" x2="217" y2="163" stroke="currentColor" stroke-opacity=".4" stroke-width="1.2"/><circle cx="250" cy="140" r="40" fill="var(--surface)" stroke="currentColor" stroke-opacity=".7" stroke-width="2.4"/><g fill="none" stroke="var(--neuron)" stroke-width="1.6" stroke-linejoin="round"><polygon points="250,112 274,126 274,154 250,168 226,154 226,126"/><path d="M250,140 L250,112 M250,140 L274,126 M250,140 L274,154 M250,140 L250,168 M250,140 L226,154 M250,140 L226,126"/></g><text x="100" y="188" text-anchor="middle" font-size="10" fill="var(--muted)">surface mesh</text><text x="250" y="190" text-anchor="middle" font-size="9" class="mono" fill="var(--faint)">triangles</text></svg></div>
    <div class="acg-eb" style="color:#2a8f57">MORPH</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-meshes" title="Link to this term">Meshes</a></h3>
    <p class="acg-def">Vertices + triangular faces defining a neuron's 3D outer surface.</p>
    </article>
    <article class="acg-card" id="term-meshparty-meshwork" data-cat="morphology" data-hay="meshparty / meshwork python package + object bundling the l2 mesh, skeleton, and anno annotations, kept in sync. morphology — meshes &amp; skeletons ">
    <div class="acg-eb" style="color:#2a8f57">MORPH</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-meshparty-meshwork" title="Link to this term">MeshParty / Meshwork</a></h3>
    <p class="acg-def">Python package + object bundling the L2 mesh, skeleton, and <code>anno</code> annotations, kept in sync.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="https://github.com/sdorkenw/MeshParty" target="_blank" rel="noopener">MeshParty &#8599;</a></div>
    </article>
    <article class="acg-card" id="term-meshpoints" data-cat="morphology" data-hay="meshpoints informal usage for mesh vertices. not a formal term — say vertices, since “point” elsewhere means an annotation position. morphology — meshes &amp; skeletons ">
    <div class="acg-eb" style="color:#2a8f57">MORPH</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-meshpoints" title="Link to this term">Meshpoints</a></h3>
    <p class="acg-def">Informal usage for mesh vertices. Not a formal term — say <em>vertices</em>, since “point” elsewhere means an annotation position.</p>
    <div class="acg-meta"><span class="acg-chip acg-warn" title="This word means different things in different places">&#9888; ambiguous</span></div>
    </article>
    <article class="acg-card" id="term-microns" data-cat="datasets" data-hay="microns cubic-millimeter functional-connectomics em dataset of mouse visual cortex (visp/visal/visrl). datasets &amp; scope ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="d5"><title id="d5">MICrONS</title><polygon points="90,80 230,80 268,50 128,50" fill="var(--scaffold)" fill-opacity=".26" stroke="currentColor" stroke-opacity=".6" stroke-width="1.8"/><polygon points="230,80 268,50 268,145 230,175" fill="var(--scaffold)" fill-opacity=".07" stroke="currentColor" stroke-opacity=".6" stroke-width="1.8"/><polygon points="90,80 230,80 230,175 90,175" fill="var(--scaffold)" fill-opacity=".14" stroke="currentColor" stroke-opacity=".6" stroke-width="1.8"/><line x1="136.7" y1="80" x2="174.7" y2="50" stroke="currentColor" stroke-opacity=".4" stroke-width="1.3"/><line x1="183.3" y1="80" x2="221.3" y2="50" stroke="currentColor" stroke-opacity=".4" stroke-width="1.3"/><text x="128" y="67" text-anchor="middle" font-size="8.5" fill="var(--accent-ink)" font-weight="600">VISp</text><text x="177" y="64" text-anchor="middle" font-size="8.5" fill="var(--accent-ink)" font-weight="600">VISal</text><text x="223" y="61" text-anchor="middle" font-size="8.5" fill="var(--accent-ink)" font-weight="600">VISrl</text><text x="160" y="97" text-anchor="middle" font-size="9" class="mono" fill="var(--muted)">1 mm</text><text transform="translate(257,58) rotate(-38)" text-anchor="middle" font-size="9" class="mono" fill="var(--muted)">0.5 mm</text><text x="85" y="84" text-anchor="end" font-size="9" fill="var(--muted)">pia</text><text x="85" y="172" text-anchor="end" font-size="9" fill="var(--muted)">WM</text><text x="160" y="194" text-anchor="middle" font-size="8.5" fill="var(--faint)">3 visual areas · mm-scale EM volume</text></svg></div>
    <div class="acg-eb" style="color:#0e7f8c">DATASETS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-microns" title="Link to this term">MICrONS</a></h3>
    <p class="acg-def">Cubic-millimeter functional-connectomics EM dataset of mouse visual cortex (VISp/VISal/VISrl).</p>
    </article>
    <article class="acg-card" id="term-minnie" data-cat="datasets" data-hay="minnie internal name for the microns dataset/mouse (minnie65; datastack minnie65_public). datasets &amp; scope ">
    <div class="acg-eb" style="color:#0e7f8c">DATASETS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-minnie" title="Link to this term">Minnie</a></h3>
    <p class="acg-def">Internal name for the MICrONS dataset/mouse (<code>minnie65</code>; datastack <code>minnie65_public</code>).</p>
    </article>
    <article class="acg-card" id="term-motion-correction" data-cat="signals" data-hay="motion correction registering every frame of the imaging movie to a reference before segmentation, so an roi mask refers to the same cell throughout. signals &amp; preprocessing ">
    <div class="acg-eb" style="color:#0369a1">SIGNAL</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-motion-correction" title="Link to this term">Motion correction</a></h3>
    <p class="acg-def">Registering every frame of the imaging movie to a reference before segmentation, so an ROI mask refers to the same cell throughout.</p>
    </article>
    <article class="acg-card" id="term-mtypes" data-cat="celltypes" data-hay="mtypes morphology/connectivity-derived cell-type clusters (l2a…l6wm; ptc/dtc/stc/itc). cell types &amp; cortical anatomy ">
    <div class="acg-eb" style="color:#c9357f">CELLTYPE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-mtypes" title="Link to this term">mtypes</a></h3>
    <p class="acg-def">Morphology/connectivity-derived cell-type clusters (L2a…L6wm; PTC/DTC/STC/ITC).</p>
    </article>
    <article class="acg-card" id="term-natural-movies" data-cat="stimuli" data-hay="natural movies black and white film clips with natural spatial and temporal statistics — usually the opening shot of touch of evil, chosen because it is continuous, with no cuts and varied motion. stimuli &amp; behavioural tasks ">
    <div class="acg-eb" style="color:#a16207">STIMULUS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-natural-movies" title="Link to this term">Natural movies</a></h3>
    <p class="acg-def">Black and white film clips with natural spatial and temporal statistics — usually the opening shot of <i>Touch of Evil</i>, chosen because it is continuous, with no cuts and varied motion.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="physiology/stimuli/passive-visual-stimuli/visual-stimuli-list.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-natural-scenes" data-cat="stimuli" data-hay="natural scenes black and white photographs with natural spatial statistics, flashed for 0.25 s with no gap. visual coding uses 118 images drawn from the berkeley, van hateren and mcgill image sets. stimuli &amp; behavioural tasks ">
    <div class="acg-eb" style="color:#a16207">STIMULUS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-natural-scenes" title="Link to this term">Natural scenes</a></h3>
    <p class="acg-def">Black and white photographs with natural spatial statistics, flashed for 0.25 s with no gap. Visual Coding uses 118 images drawn from the Berkeley, van Hateren and McGill image sets.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="physiology/stimuli/passive-visual-stimuli/visual-stimuli-list.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-neuroglancer" data-cat="tools" data-hay="neuroglancer webgl browser viewer for very large volumetric connectomics data (imagery, segmentation, meshes, annotations). visualisation tools ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="ng-t"><title id="ng-t">Neuroglancer</title><rect x="18" y="20" width="138" height="78" rx="4" fill="var(--surface-2)" fill-opacity=".5" stroke="currentColor" stroke-opacity=".35" stroke-width="1.8"/><rect x="164" y="20" width="138" height="78" rx="4" fill="var(--surface-2)" fill-opacity=".5" stroke="currentColor" stroke-opacity=".35" stroke-width="1.8"/><rect x="18" y="102" width="138" height="78" rx="4" fill="var(--surface-2)" fill-opacity=".5" stroke="currentColor" stroke-opacity=".35" stroke-width="1.8"/><rect x="164" y="102" width="138" height="78" rx="4" fill="var(--surface-2)" fill-opacity=".5" stroke="currentColor" stroke-opacity=".35" stroke-width="1.8"/><line x1="18" y1="59" x2="156" y2="59" stroke="currentColor" stroke-opacity=".3" stroke-width="1"/><line x1="87" y1="20" x2="87" y2="98" stroke="currentColor" stroke-opacity=".3" stroke-width="1"/><ellipse cx="87" cy="59" rx="24" ry="16" fill="var(--neuron)" fill-opacity=".3" stroke="var(--neuron)" stroke-width="2"/><circle cx="96" cy="54" r="3" fill="var(--synapse)"/><line x1="164" y1="59" x2="302" y2="59" stroke="currentColor" stroke-opacity=".3" stroke-width="1"/><line x1="233" y1="20" x2="233" y2="98" stroke="currentColor" stroke-opacity=".3" stroke-width="1"/><ellipse cx="233" cy="59" rx="18" ry="19" fill="var(--neuron)" fill-opacity=".3" stroke="var(--neuron)" stroke-width="2"/><line x1="18" y1="141" x2="156" y2="141" stroke="currentColor" stroke-opacity=".3" stroke-width="1"/><line x1="87" y1="102" x2="87" y2="180" stroke="currentColor" stroke-opacity=".3" stroke-width="1"/><ellipse cx="87" cy="141" rx="23" ry="14" fill="var(--neuron)" fill-opacity=".3" stroke="var(--neuron)" stroke-width="2"/><circle cx="233" cy="138" r="8" fill="var(--neuron)" fill-opacity=".3" stroke="var(--neuron)" stroke-width="2.2"/><path d="M233,131 C228,119 221,113 213,117" fill="none" stroke="var(--dendrite)" stroke-width="2.2" stroke-linecap="round"/><path d="M233,131 C239,120 247,115 254,121" fill="none" stroke="var(--dendrite)" stroke-width="2.2" stroke-linecap="round"/><path d="M233,146 C233,158 240,164 249,168" fill="none" stroke="var(--axon)" stroke-width="2.2" stroke-linecap="round"/><text x="26" y="34" font-size="9" class="mono" fill="var(--muted)">xy</text><text x="172" y="34" font-size="9" class="mono" fill="var(--muted)">xz</text><text x="26" y="116" font-size="9" class="mono" fill="var(--muted)">yz</text><text x="172" y="116" font-size="9" class="mono" fill="var(--muted)">3D</text></svg></div>
    <div class="acg-eb" style="color:#526278">TOOLS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-neuroglancer" title="Link to this term">Neuroglancer</a></h3>
    <p class="acg-def">WebGL browser viewer for very large volumetric connectomics data (imagery, segmentation, meshes, annotations).</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="https://github.com/google/neuroglancer" target="_blank" rel="noopener">Neuroglancer &#8599;</a></div>
    </article>
    <article class="acg-card" id="term-neuroglancer-forks" data-cat="tools" data-hay="neuroglancer forks neuroglancer is maintained as several diverging branches. spelunker is the one cave datastacks link to; the seung-lab and flywire branches are the other widely used ones. states are broadly compatible but not identical. visualisation tools ">
    <div class="acg-eb" style="color:#526278">TOOLS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-neuroglancer-forks" title="Link to this term">Neuroglancer forks</a></h3>
    <p class="acg-def">Neuroglancer is maintained as several diverging branches. Spelunker is the one CAVE datastacks link to; the Seung-lab and FlyWire branches are the other widely used ones. States are broadly compatible but not identical.</p>
    <div class="acg-meta"><span class="acg-chip acg-warn" title="This word means different things in different places">&#9888; ambiguous</span></div>
    </article>
    <article class="acg-card" id="term-neuroglancer-layer-img-seg-ann" data-cat="tools" data-hay="neuroglancer layer (img/seg/ann) the data layers in a neuroglancer state. not the cortical layer. visualisation tools ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="nl-t"><title id="nl-t">Neuroglancer layers img seg ann</title><line x1="34" y1="80" x2="34" y2="164" stroke="currentColor" stroke-opacity=".25" stroke-width="1.4" stroke-dasharray="3 4"/><line x1="208" y1="80" x2="208" y2="164" stroke="currentColor" stroke-opacity=".25" stroke-width="1.4" stroke-dasharray="3 4"/><polygon points="62,132 236,132 208,164 34,164" fill="var(--scaffold)" fill-opacity=".18" stroke="currentColor" stroke-opacity=".5" stroke-width="1.8"/><line x1="70" y1="141" x2="200" y2="141" stroke="currentColor" stroke-opacity=".22" stroke-width="1.4"/><line x1="60" y1="152" x2="190" y2="152" stroke="currentColor" stroke-opacity=".22" stroke-width="1.4"/><polygon points="62,90 236,90 208,122 34,122" fill="var(--neuron)" fill-opacity=".2" stroke="var(--neuron)" stroke-width="2"/><path d="M110,98 C130,94 156,98 160,108 C162,116 140,118 120,116 C104,114 98,102 110,98 Z" fill="var(--neuron)" fill-opacity=".45" stroke="var(--neuron)" stroke-width="1.8"/><polygon points="62,48 236,48 208,80 34,80" fill="var(--synapse)" fill-opacity=".1" stroke="var(--synapse)" stroke-width="2"/><circle cx="120" cy="62" r="3.6" fill="var(--synapse)"/><circle cx="158" cy="68" r="3.6" fill="var(--synapse)"/><circle cx="90" cy="70" r="3.6" fill="var(--synapse)"/><text x="248" y="68" font-size="12" class="mono" fill="var(--synapse)">ann</text><text x="248" y="110" font-size="12" class="mono" fill="var(--neuron)">seg</text><text x="248" y="152" font-size="12" class="mono" fill="var(--muted)">img</text></svg></div>
    <div class="acg-eb" style="color:#526278">TOOLS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-neuroglancer-layer-img-seg-ann" title="Link to this term">Neuroglancer Layer (img/seg/ann)</a></h3>
    <p class="acg-def">The data layers in a Neuroglancer state. NOT the cortical layer.</p>
    <div class="acg-meta"><span class="acg-chip acg-warn" title="This word means different things in different places">&#9888; ambiguous</span></div>
    </article>
    <article class="acg-card" id="term-neuroglancer-state" data-cat="tools" data-hay="neuroglancer state json object storing all layers/view/annotations, identified by a state id. visualisation tools ">
    <div class="acg-eb" style="color:#526278">TOOLS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-neuroglancer-state" title="Link to this term">Neuroglancer State</a></h3>
    <p class="acg-def">JSON object storing all layers/view/annotations, identified by a state id.</p>
    </article>
    <article class="acg-card" id="term-neurogliaform-cell" data-cat="celltypes" data-hay="neurogliaform cell (ngc) an interneuron that makes a diffuse axonal arbor and is thought to release gaba through both synaptic release and volume transmission, non-selectively inhibiting nearby neurons. cell types &amp; cortical anatomy ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="d-neurogliaform-cell"><title id="d-neurogliaform-cell">Neurogliaform cell</title><defs><clipPath id="d-neurogliaform-cell-c" clipPathUnits="userSpaceOnUse"><rect x="240" y="26" width="76" height="118"/></clipPath></defs><g transform="translate(160,100) scale(1.55) translate(-278,-88)"><g clip-path="url(#d-neurogliaform-cell-c)"><g stroke="var(--dendrite)" stroke-width="2" fill="none" stroke-linecap="round">
<path d="M50,73 V54 M50,73 l-9,-12 M50,73 l9,-12"/>
<path d="M126,121 V132 M126,121 l-8,9 M126,121 l8,9"/>
<path d="M202,85 V54 M202,54 l-5,-6 M202,54 l5,-6 M202,95 V128 M202,128 l-5,6 M202,128 l5,6"/>
</g>
<g stroke="var(--axon)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path d="M50,83 V95 M50,95 C44,98 40,104 42,112 M50,95 C56,98 60,104 58,112"/>
<path d="M126,111 V54 M112,54 H140 M116,54 v-6 M126,54 v-6 M136,54 v-6"/>
<path d="M278,88 l0,-16 M278,88 l14,-8 M278,88 l16,0 M278,88 l14,8 M278,88 l0,16 M278,88 l-14,8 M278,88 l-16,0 M278,88 l-14,-8"/>
</g>
<g fill="none" stroke="currentColor" stroke-opacity=".4" stroke-width="1.6"><circle cx="42" cy="110" r="5"/><circle cx="58" cy="110" r="5"/></g>
<g fill="var(--neuron)"><circle cx="50" cy="78" r="5"/><circle cx="126" cy="116" r="5"/><circle cx="202" cy="90" r="5"/><circle cx="278" cy="88" r="5"/></g></g></g></svg></div>
    <div class="acg-eb" style="color:#c9357f">CELLTYPE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-neurogliaform-cell" title="Link to this term">Neurogliaform cell (NGC)</a></h3>
    <p class="acg-def">An interneuron that makes a diffuse axonal arbor and is thought to release GABA through both synaptic release and volume transmission, non-selectively inhibiting nearby neurons.</p>
    </article>
    <article class="acg-card" id="term-neuronal-process" data-cat="segmentation" data-hay="neuronal process an axon or dendrite branch of a neuron (a process that splits at branch points). segmentation &amp; reconstruction ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="nproc"><title id="nproc">Neuronal process</title><path d="M137,93 C116,80 104,70 90,50 M104,70 C100,60 98,52 100,42 M116,80 C110,72 104,70 92,64" fill="none" stroke="var(--dendrite)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M167,106 C210,112 240,116 276,132" fill="none" stroke="var(--axon)" stroke-width="2.6" stroke-linecap="round"/><circle cx="276" cy="132" r="5" fill="var(--axon)" fill-opacity=".4" stroke="var(--axon)" stroke-width="2"/><circle cx="150" cy="104" r="17" fill="var(--neuron)" fill-opacity=".25" stroke="var(--neuron)" stroke-width="2.4"/><text x="86" y="34" text-anchor="middle" font-size="11.5" fill="var(--dendrite)" font-weight="600">dendrite</text><text x="150" y="150" text-anchor="middle" font-size="11.5" fill="var(--neuron)" font-weight="600">soma</text><text x="228" y="118" text-anchor="middle" font-size="11.5" fill="var(--axon)" font-weight="600">axon</text></svg></div>
    <div class="acg-eb" style="color:#6d55e0">SEGMENT</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-neuronal-process" title="Link to this term">Neuronal process</a></h3>
    <p class="acg-def">An axon or dendrite branch of a neuron (a process that splits at branch points).</p>
    </article>
    <article class="acg-card" id="term-neuropil-correction" data-cat="signals" data-hay="neuropil correction an annulus around the roi, excluding nearby cells, gives a local neuropil signal. it is subtracted from the raw trace after weighting by a per-cell r value. signals &amp; preprocessing ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="npc-t"><title id="npc-t">Neuropil correction: annulus signal subtracted from the ROI trace</title><circle cx="70" cy="88" r="32" fill="none" stroke="currentColor" stroke-opacity=".4" stroke-width="1.6" stroke-dasharray="5 4"/><circle cx="70" cy="88" r="15" fill="var(--neuron)" fill-opacity=".3" stroke="var(--neuron)" stroke-width="2.2"/><g fill="none" stroke="var(--neuron)" stroke-opacity=".45" stroke-width="1.6" stroke-dasharray="3 3"><circle cx="42" cy="60" r="9"/><circle cx="100" cy="112" r="9"/></g><text x="70" y="140" text-anchor="middle" font-size="10" fill="var(--muted)">ROI + annulus</text><text x="70" y="154" text-anchor="middle" font-size="9" fill="var(--faint)">nearby cells excluded</text><text x="152" y="40" font-size="9.5" fill="var(--muted)">raw</text><path d="M152,60 C168,58 174,34 190,36 C206,38 210,62 226,60 C244,58 250,44 266,46 C282,48 288,58 302,56" fill="none" stroke="currentColor" stroke-opacity=".75" stroke-width="2" stroke-linecap="round"/><text x="140" y="102" text-anchor="middle" font-size="13" fill="var(--muted)">−</text><text x="152" y="86" font-size="9.5" class="mono" fill="var(--muted)">r × neuropil</text><path d="M152,106 C170,104 178,96 196,98 C214,100 220,110 238,108 C258,106 266,98 282,100 C292,101 296,104 302,104" fill="none" stroke="currentColor" stroke-opacity=".35" stroke-width="2" stroke-linecap="round"/><text x="140" y="152" text-anchor="middle" font-size="13" fill="var(--muted)">=</text><text x="152" y="136" font-size="9.5" fill="var(--accent-ink)" font-weight="600">corrected</text><path d="M152,158 C168,157 176,134 192,136 C208,138 212,158 228,157 C246,156 254,150 268,152 C284,154 290,157 302,156" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round"/></svg></div>
    <div class="acg-eb" style="color:#0369a1">SIGNAL</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-neuropil-correction" title="Link to this term">Neuropil correction</a></h3>
    <p class="acg-def">An annulus around the ROI, excluding nearby cells, gives a local neuropil signal. It is subtracted from the raw trace after weighting by a per-cell <code>r</code> value.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="physiology/ophys/visual-coding/vc2p-session-data.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-neuropixels" data-cat="modalities" data-hay="neuropixels a family of silicon probes for high-channel-count single-unit extracellular recording, miniaturised with integrated-circuit design so that hundreds of units can be recorded from one probe with minimal brain damage. recording modalities &amp; instruments ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="npx-t"><title id="npx-t">Neuropixels: dense electrode sites along one silicon shank</title><rect x="52" y="22" width="30" height="138" rx="3" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".5" stroke-width="2"/><path d="M52,158 L82,158 L67,182 Z" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".5" stroke-width="2" stroke-linejoin="round"/><path d="M57,36 h8v6h-8zM69,44 h8v6h-8zM57,52 h8v6h-8zM69,60 h8v6h-8zM57,68 h8v6h-8zM69,76 h8v6h-8zM57,84 h8v6h-8zM69,92 h8v6h-8zM57,100 h8v6h-8zM69,108 h8v6h-8zM57,116 h8v6h-8zM69,124 h8v6h-8zM57,132 h8v6h-8zM69,140 h8v6h-8z" fill="currentColor" fill-opacity=".45"/><text x="67" y="14" text-anchor="middle" font-size="10" fill="var(--muted)">one shank</text><text x="67" y="196" text-anchor="middle" font-size="9.5" class="mono" fill="var(--faint)">384 sites</text><path d="M96,56H132 M96,100H132 M96,144H132" stroke="currentColor" stroke-opacity=".3" stroke-width="1.6" stroke-dasharray="3 4"/><g fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-opacity=".45"><path d="M140,56 h8 l4,-5 l5,20 l5,-16 c3,-5 6,-2 8,-1 h12"/><path d="M140,144 h8 l4,-5 l5,20 l5,-16 c3,-5 6,-2 8,-1 h12"/></g><path d="M140,100 h8 l4,-5 l5,20 l5,-16 c3,-5 6,-2 8,-1 h12" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><text x="216" y="26" text-anchor="middle" font-size="10.5" fill="var(--accent-ink)" font-weight="600">sorted units</text><text x="216" y="180" text-anchor="middle" font-size="9.5" fill="var(--muted)">hundreds per probe</text></svg></div>
    <div class="acg-eb" style="color:#c2410c">MODALITY</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-neuropixels" title="Link to this term">Neuropixels</a></h3>
    <p class="acg-def">A family of silicon probes for high-channel-count single-unit extracellular recording, miniaturised with integrated-circuit design so that hundreds of units can be recorded from one probe with minimal brain damage.</p>
    </article>
    <article class="acg-card" id="term-nglui-statebuilder-parser" data-cat="cave" data-hay="nglui (statebuilder/parser) python package to generate and parse neuroglancer states from dataframes. cave — access &amp; versioning ">
    <div class="acg-eb" style="color:#0f766e">CAVE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-nglui-statebuilder-parser" title="Link to this term">nglui (statebuilder/parser)</a></h3>
    <p class="acg-def">Python package to generate and parse Neuroglancer states from dataframes.</p>
    </article>
    <article class="acg-card" id="term-nn-hit-miss" data-cat="quality" data-hay="nn_hit_rate / nn_miss_rate nearest-neighbour estimates of contamination and of missing spikes respectively. quality metrics ">
    <div class="acg-eb" style="color:#4338ca">QUALITY</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-nn-hit-miss" title="Link to this term">nn_hit_rate / nn_miss_rate</a></h3>
    <p class="acg-def">Nearest-neighbour estimates of contamination and of missing spikes respectively.</p>
    </article>
    <article class="acg-card" id="term-nodes" data-cat="morphology" data-hay="nodes vertices in the skeleton / l2 graph. morphology — meshes &amp; skeletons ">
    <div class="acg-eb" style="color:#2a8f57">MORPH</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-nodes" title="Link to this term">Nodes</a></h3>
    <p class="acg-def">Vertices in the skeleton / L2 graph.</p>
    </article>
    <article class="acg-card" id="term-np-generations" data-cat="modalities" data-hay="np 1.0 / 2.0 / ultra / opto 1.0: 960 sites, ~20 µm pitch, ~3.8 mm span. 2.0: 1280 sites per shank, ~15 µm pitch. ultra: 6 µm pitch, fine detail over a shorter span. opto: 1.0 plus 28 on-shank light emission sites. all read out 384 channels at a time. recording modalities &amp; instruments ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="npg-t"><title id="npg-t">Neuropixels generations: site pitch and span</title><path d="M40,40 h20 v92 l-10,12 l-10,-12 z" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".5" stroke-width="1.8" stroke-linejoin="round"/><path d="M43,48 h14M43,60 h14M43,72 h14M43,84 h14M43,96 h14M43,108 h14M43,120 h14" stroke="currentColor" stroke-opacity=".5" stroke-width="2"/><path d="M115,40 h20 v92 l-10,12 l-10,-12 z" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".5" stroke-width="1.8" stroke-linejoin="round"/><path d="M118,48 h14M118,56 h14M118,64 h14M118,72 h14M118,80 h14M118,88 h14M118,96 h14M118,104 h14M118,112 h14M118,120 h14M118,128 h14" stroke="currentColor" stroke-opacity=".5" stroke-width="1.8"/><path d="M190,40 h20 v92 l-10,12 l-10,-12 z" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".5" stroke-width="1.8" stroke-linejoin="round"/><path d="M193,48 h14M193,52 h14M193,56 h14M193,60 h14M193,64 h14M193,68 h14M193,72 h14M193,76 h14M193,80 h14M193,84 h14M193,88 h14M193,92 h14M193,96 h14M193,100 h14M193,104 h14M193,108 h14M193,112 h14M193,116 h14M193,120 h14M193,124 h14M193,128 h14" stroke="currentColor" stroke-opacity=".45" stroke-width="1.3"/><path d="M265,40 h20 v92 l-10,12 l-10,-12 z" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".5" stroke-width="1.8" stroke-linejoin="round"/><path d="M268,48 h14M268,60 h14M268,72 h14M268,84 h14M268,96 h14M268,108 h14M268,120 h14" stroke="currentColor" stroke-opacity=".5" stroke-width="2"/><g fill="var(--accent)"><circle cx="275" cy="60" r="3.4"/><circle cx="275" cy="90" r="3.4"/><circle cx="275" cy="120" r="3.4"/></g><text x="50" y="162" text-anchor="middle" font-size="11" fill="var(--muted)">1.0</text><text x="50" y="177" text-anchor="middle" font-size="9" class="mono" fill="var(--faint)">20 µm</text><text x="125" y="162" text-anchor="middle" font-size="11" fill="var(--muted)">2.0</text><text x="125" y="177" text-anchor="middle" font-size="9" class="mono" fill="var(--faint)">15 µm</text><text x="200" y="162" text-anchor="middle" font-size="11" fill="var(--muted)">Ultra</text><text x="200" y="177" text-anchor="middle" font-size="9" class="mono" fill="var(--faint)">6 µm</text><text x="275" y="162" text-anchor="middle" font-size="11" fill="var(--accent-ink)">Opto</text><text x="275" y="177" text-anchor="middle" font-size="9" class="mono" fill="var(--faint)">+ light</text><text x="160" y="194" text-anchor="middle" font-size="9.5" fill="var(--muted)">384 channels read at a time</text></svg></div>
    <div class="acg-eb" style="color:#c2410c">MODALITY</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-np-generations" title="Link to this term">NP 1.0 / 2.0 / Ultra / Opto</a></h3>
    <p class="acg-def">1.0: 960 sites, ~20 µm pitch, ~3.8 mm span. 2.0: 1280 sites per shank, ~15 µm pitch. Ultra: 6 µm pitch, fine detail over a shorter span. Opto: 1.0 plus 28 on-shank light emission sites. All read out 384 channels at a time.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="background/neuropixels-description.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-nwb" data-cat="dataorg" data-hay="nwb (neurodata without borders) the standard file format for physiology and behaviour data. visual coding and visual behavior use an hdf5 backend; the newer datasets — v1dd, bci, dynamic foraging, np ultra — use a zarr backend optimised for cloud access. datasets, sessions &amp; files ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="nwb-t"><title id="nwb-t">NWB: one format, two storage backends</title><rect x="20" y="72" width="66" height="56" rx="9" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".5" stroke-width="2"/><text x="53" y="105" text-anchor="middle" font-size="12" class="mono" fill="var(--muted)">NWB</text><text x="53" y="150" text-anchor="middle" font-size="9.5" fill="var(--faint)">one schema</text><path d="M90,100 C112,100 118,66 138,66 M90,100 C112,100 118,136 138,136" fill="none" stroke="currentColor" stroke-opacity=".4" stroke-width="1.8" stroke-linecap="round"/><rect x="146" y="44" width="38" height="46" rx="6" fill="none" stroke="currentColor" stroke-opacity=".5" stroke-width="1.8"/><path d="M154,58 h22 M154,68 h22 M154,78 h22" stroke="currentColor" stroke-opacity=".4" stroke-width="2" stroke-linecap="round"/><text x="196" y="62" font-size="11" class="mono" fill="var(--muted)">HDF5</text><text x="196" y="78" font-size="9.5" fill="var(--faint)">one file</text><g fill="var(--accent)" fill-opacity=".2" stroke="var(--accent)" stroke-width="1.8"><rect x="146" y="114" width="16" height="16" rx="3"/><rect x="166" y="114" width="16" height="16" rx="3"/><rect x="146" y="134" width="16" height="16" rx="3"/><rect x="166" y="134" width="16" height="16" rx="3"/><rect x="146" y="154" width="16" height="16" rx="3"/><rect x="166" y="154" width="16" height="16" rx="3"/></g><text x="196" y="134" font-size="11" class="mono" fill="var(--accent-ink)" font-weight="600">Zarr</text><text x="196" y="150" font-size="9.5" fill="var(--faint)">chunked, cloud-read</text></svg></div>
    <div class="acg-eb" style="color:#3f3f46">DATA</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-nwb" title="Link to this term">NWB (Neurodata Without Borders)</a></h3>
    <p class="acg-def">The standard file format for physiology and behaviour data. Visual Coding and Visual Behavior use an HDF5 backend; the newer datasets — V1DD, BCI, Dynamic Foraging, NP Ultra — use a Zarr backend optimised for cloud access.</p>
    </article>
    <article class="acg-card" id="term-nwb-layout" data-cat="dataorg" data-hay="nwb layout every nwb file has the same top-level groups: general (subject, devices, electrodes or imaging planes), acquisition (signals as acquired), stimulus (what was presented), intervals (epochs, trials, blocks), processing (anything derived), units (sorted units, ephys only) and analysis (non-standard extras). what differs between datasets is what fills them — and where a dataset puts a thing is not always where you would guess, so print the tree first. datasets, sessions &amp; files ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="nwblay-t"><title id="nwblay-t">Where data live inside an NWB file</title> <rect x="18" y="16" width="112" height="26" rx="5" fill="var(--surface-2)" stroke="var(--accent)" stroke-width="2.2"/> <text x="74" y="34" text-anchor="middle" font-size="10.5" class="mono" fill="var(--accent-ink)">session.nwb</text> <path d="M40,42 V172" stroke="currentColor" stroke-opacity=".3" stroke-width="1.6"/> <path d="M40,62 H64 M40,86 H64 M40,110 H64 M40,134 H64 M40,158 H64 M40,172 H64" stroke="currentColor" stroke-opacity=".3" stroke-width="1.6"/> <text x="70" y="66" font-size="10.5" class="mono" fill="var(--muted)">units</text> <text x="70" y="90" font-size="10.5" class="mono" fill="var(--muted)">intervals</text> <text x="70" y="114" font-size="10.5" class="mono" fill="var(--muted)">acquisition</text> <text x="70" y="138" font-size="10.5" class="mono" fill="var(--muted)">processing</text> <text x="70" y="162" font-size="10.5" class="mono" fill="var(--muted)">stimulus</text> <text x="70" y="176" font-size="10.5" class="mono" fill="var(--muted)">epochs</text> <path d="M164,62 H176 M164,86 H176 M164,110 H176 M164,134 H176 M164,158 H176 M164,172 H176" stroke="currentColor" stroke-opacity=".2" stroke-width="1.2"/> <text x="182" y="66" font-size="9.5" fill="var(--faint)">sorted spikes</text> <text x="182" y="90" font-size="9.5" fill="var(--faint)">trials</text> <text x="182" y="114" font-size="9.5" fill="var(--faint)">raw timeseries</text> <text x="182" y="138" font-size="9.5" fill="var(--faint)">derived signals</text> <text x="182" y="162" font-size="9.5" fill="var(--faint)">what was shown</text> <text x="182" y="176" font-size="9.5" fill="var(--faint)">when</text> </svg></div>
    <div class="acg-eb" style="color:#3f3f46">DATA</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-nwb-layout" title="Link to this term">NWB layout</a></h3>
    <p class="acg-def">Every NWB file has the same top-level groups: <code>general</code> (subject, devices, electrodes or imaging planes), <code>acquisition</code> (signals as acquired), <code>stimulus</code> (what was presented), <code>intervals</code> (epochs, trials, blocks), <code>processing</code> (anything derived), <code>units</code> (sorted units, ephys only) and <code>analysis</code> (non-standard extras). What differs between datasets is what fills them — and where a dataset puts a thing is not always where you would guess, so print the tree first.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="practicalities/pyNWB.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-omission" data-cat="stimuli" data-hay="omission 5% of non-change presentations are dropped, interrupting the expected stimulus cadence so that expectation signals can be measured. omissions occur during recording but not during training, and never at or just before a change. stimuli &amp; behavioural tasks ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="omi-t"><title id="omi-t">An omitted stimulus presentation</title> <g fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".45" stroke-width="1.8"> <rect x="20" y="62" width="30" height="46" rx="4"/> <rect x="66" y="62" width="30" height="46" rx="4"/> <rect x="112" y="62" width="30" height="46" rx="4"/> <rect x="204" y="62" width="30" height="46" rx="4"/> <rect x="250" y="62" width="30" height="46" rx="4"/></g> <g stroke="currentColor" stroke-opacity=".35" stroke-width="2.6"> <path d="M27,66 v38 M35,66 v38 M43,66 v38"/><path d="M73,66 v38 M81,66 v38 M89,66 v38"/><path d="M119,66 v38 M127,66 v38 M135,66 v38"/><path d="M211,66 v38 M219,66 v38 M227,66 v38"/><path d="M257,66 v38 M265,66 v38 M273,66 v38"/></g> <rect x="158" y="62" width="30" height="46" rx="4" fill="none" stroke="var(--accent)" stroke-width="2.2" stroke-dasharray="5 4"/> <text x="173" y="48" text-anchor="middle" font-size="11" fill="var(--accent-ink)" font-weight="600">omission</text> <text x="173" y="34" text-anchor="middle" font-size="9" class="mono" fill="var(--faint)">5%</text> <path d="M20,132 H288" stroke="currentColor" stroke-opacity=".3" stroke-width="1.6" stroke-linecap="round"/> <polygon points="294,132 286,128 286,136" fill="currentColor" fill-opacity=".3"/> <text x="300" y="148" text-anchor="end" font-size="10" fill="var(--muted)">time</text> <text x="152" y="176" text-anchor="middle" font-size="9.5" fill="var(--faint)">never at or just before a change</text> </svg></div>
    <div class="acg-eb" style="color:#a16207">STIMULUS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-omission" title="Link to this term">Omission</a></h3>
    <p class="acg-def">5% of non-change presentations are dropped, interrupting the expected stimulus cadence so that expectation signals can be measured. Omissions occur during recording but not during training, and never at or just before a change.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="physiology/stimuli/visual-behavior/VB-Behavior.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-ophys" data-cat="modalities" data-hay="ophys shorthand for optical physiology, often in reference to two-photon calcium imaging, but can also include other methods such as fiber photometry. recording modalities &amp; instruments ">
    <div class="acg-eb" style="color:#c2410c">MODALITY</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-ophys" title="Link to this term">Ophys</a></h3>
    <p class="acg-def">Shorthand for optical physiology, often in reference to two-photon calcium imaging, but can also include other methods such as fiber photometry.</p>
    </article>
    <article class="acg-card" id="term-ophys-container" data-cat="dataorg" data-hay="ophys container the same imaging plane followed across days. containers hold different numbers of sessions depending on which passed qc and how many retakes happened. datasets, sessions &amp; files ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="ophc-t"><title id="ophc-t">Ophys container: one imaging plane followed across days</title><text x="160" y="34" text-anchor="middle" font-size="10.5" fill="var(--muted)">same imaging plane</text><g fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".4" stroke-width="1.8"><rect x="24" y="46" width="76" height="76" rx="9"/><rect x="122" y="46" width="76" height="76" rx="9"/><rect x="220" y="46" width="76" height="76" rx="9"/></g><g fill="var(--neuron)" fill-opacity=".45" stroke="var(--neuron)" stroke-width="1.6"><circle cx="44" cy="68" r="7"/><circle cx="76" cy="80" r="7"/><circle cx="56" cy="102" r="7"/><circle cx="86" cy="108" r="7"/><circle cx="142" cy="68" r="7"/><circle cx="174" cy="80" r="7"/><circle cx="154" cy="102" r="7"/><circle cx="184" cy="108" r="7"/><circle cx="240" cy="68" r="7"/><circle cx="272" cy="80" r="7"/><circle cx="252" cy="102" r="7"/><circle cx="282" cy="108" r="7"/></g><text x="62" y="140" text-anchor="middle" font-size="10" fill="var(--muted)">day 1</text><text x="160" y="140" text-anchor="middle" font-size="10" fill="var(--muted)">day 2</text><text x="258" y="140" text-anchor="middle" font-size="10" fill="var(--muted)">day 3</text><path d="M24,152 V162 H296 V152" fill="none" stroke="var(--accent)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><text x="160" y="180" text-anchor="middle" font-size="11" fill="var(--accent-ink)" font-weight="600">one container</text><text x="160" y="194" text-anchor="middle" font-size="9.5" fill="var(--faint)">session count varies with QC</text></svg></div>
    <div class="acg-eb" style="color:#3f3f46">DATA</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-ophys-container" title="Link to this term">Ophys container</a></h3>
    <p class="acg-def">The same imaging plane followed across days. Containers hold different numbers of sessions depending on which passed QC and how many retakes happened.</p>
    <div class="acg-meta"><span class="acg-chip acg-warn" title="This word means different things in different places">&#9888; ambiguous</span></div>
    </article>
    <article class="acg-card" id="term-ophys-experiment" data-cat="dataorg" data-hay="ophys experiment one imaging plane in one session — the narrowest unit in the hierarchy, with its own imaging_depth and targeted_structure. quality control passes or fails each plane separately. datasets, sessions &amp; files ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="oexp-t"><title id="oexp-t">Ophys experiment: one imaging plane within a session</title><rect x="18" y="42" width="284" height="106" rx="10" fill="none" stroke="currentColor" stroke-opacity=".3" stroke-width="1.8"/><text x="22" y="34" font-size="10.5" fill="var(--muted)">session</text><rect x="34" y="58" width="58" height="72" rx="7" fill="var(--surface-2)" fill-opacity="1" stroke="currentColor" stroke-opacity=".35" stroke-width="1.6"/><g fill="var(--neuron)" fill-opacity=".5"><circle cx="50" cy="80" r="4"/><circle cx="64" cy="94" r="4"/><circle cx="78" cy="88" r="4"/></g><text x="63" y="122" text-anchor="middle" font-size="9" class="mono" fill="var(--faint)">175</text><text x="83" y="70" text-anchor="middle" font-size="9" fill="var(--muted)">✓</text><rect x="102" y="58" width="58" height="72" rx="7" fill="var(--accent)" fill-opacity=".12" stroke="var(--accent)" stroke-opacity="1" stroke-width="2.4"/><g fill="var(--neuron)" fill-opacity=".5"><circle cx="118" cy="80" r="4"/><circle cx="132" cy="94" r="4"/><circle cx="146" cy="88" r="4"/></g><text x="131" y="122" text-anchor="middle" font-size="9" class="mono" fill="var(--faint)">275</text><text x="151" y="70" text-anchor="middle" font-size="9" fill="var(--muted)">✓</text><rect x="170" y="58" width="58" height="72" rx="7" fill="var(--surface-2)" fill-opacity="1" stroke="currentColor" stroke-opacity=".35" stroke-width="1.6"/><g fill="var(--neuron)" fill-opacity=".5"><circle cx="186" cy="80" r="4"/><circle cx="200" cy="94" r="4"/><circle cx="214" cy="88" r="4"/></g><text x="199" y="122" text-anchor="middle" font-size="9" class="mono" fill="var(--faint)">375</text><text x="219" y="70" text-anchor="middle" font-size="9" fill="var(--muted)">✓</text><rect x="238" y="58" width="58" height="72" rx="7" fill="var(--surface-2)" fill-opacity="1" stroke="currentColor" stroke-opacity=".35" stroke-width="1.6"/><g fill="var(--neuron)" fill-opacity=".5"><circle cx="254" cy="80" r="4"/><circle cx="268" cy="94" r="4"/><circle cx="282" cy="88" r="4"/></g><text x="267" y="122" text-anchor="middle" font-size="9" class="mono" fill="var(--faint)">500</text><text x="287" y="70" text-anchor="middle" font-size="9" fill="var(--faint)">✗</text><path d="M131,132 V150" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"/><text x="131" y="166" text-anchor="middle" font-size="11" fill="var(--accent-ink)" font-weight="600">experiment</text><text x="160" y="188" text-anchor="middle" font-size="9" class="mono" fill="var(--faint)">imaging_depth · targeted_structure</text></svg></div>
    <div class="acg-eb" style="color:#3f3f46">DATA</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-ophys-experiment" title="Link to this term">Ophys experiment</a></h3>
    <p class="acg-def"><b>One imaging plane in one session</b> — the narrowest unit in the hierarchy, with its own <code>imaging_depth</code> and <code>targeted_structure</code>. Quality control passes or fails each plane separately.</p>
    <div class="acg-meta"><span class="acg-chip acg-warn" title="This word means different things in different places">&#9888; ambiguous</span></div>
    </article>
    <article class="acg-card" id="term-ophys-session" data-cat="dataorg" data-hay="ophys session one continuous recording under the two-photon microscope. it contains one imaging plane on a single-plane scope and up to eight on the multiscope. datasets, sessions &amp; files ">
    <div class="acg-eb" style="color:#3f3f46">DATA</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-ophys-session" title="Link to this term">Ophys session</a></h3>
    <p class="acg-def">One continuous recording under the two-photon microscope. It contains one imaging plane on a single-plane scope and up to eight on the Multiscope.</p>
    </article>
    <article class="acg-card" id="term-opsin" data-cat="genetics" data-hay="opsin a light-gated ion channel. illumination changes its conformation, letting ions cross the membrane and either forcing the cell to spike (excitatory opsin) or suppressing spiking (inhibitory). genetic &amp; optical tools ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="ops-t"><title id="ops-t">Opsin: a light-gated ion channel in the membrane</title><rect x="20" y="86" width="150" height="34" rx="6" fill="var(--scaffold)" fill-opacity=".18" stroke="currentColor" stroke-opacity=".3" stroke-width="1.6"/><text x="24" y="80" font-size="9" fill="var(--faint)">outside</text><text x="24" y="136" font-size="9" fill="var(--faint)">inside</text><rect x="80" y="80" width="12" height="46" rx="5" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".6" stroke-width="1.8"/><rect x="100" y="80" width="12" height="46" rx="5" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".6" stroke-width="1.8"/><g stroke="var(--accent)" stroke-width="2" stroke-linecap="round"><path d="M46,44 L70,70"/><path d="M62,38 L82,64"/><path d="M30,58 L58,78"/></g><text x="30" y="34" font-size="10" fill="var(--accent-ink)" font-weight="600">light</text><g fill="currentColor" fill-opacity=".6"><circle cx="96" cy="72" r="3.2"/><circle cx="96" cy="100" r="3.2"/><circle cx="96" cy="134" r="3.2"/></g><text x="122" y="140" font-size="9" fill="var(--faint)">ions</text><rect x="204" y="38" width="72" height="5" rx="2.5" fill="var(--accent)"/><path d="M196,62 H306" stroke="currentColor" stroke-opacity=".25" stroke-width="1.2"/><path d="M206,62 V48" stroke="currentColor" stroke-opacity=".8" stroke-width="2" stroke-linecap="round"/><path d="M215,62 V48" stroke="currentColor" stroke-opacity=".8" stroke-width="2" stroke-linecap="round"/><path d="M224,62 V48" stroke="currentColor" stroke-opacity=".8" stroke-width="2" stroke-linecap="round"/><path d="M233,62 V48" stroke="currentColor" stroke-opacity=".8" stroke-width="2" stroke-linecap="round"/><path d="M242,62 V48" stroke="currentColor" stroke-opacity=".8" stroke-width="2" stroke-linecap="round"/><path d="M251,62 V48" stroke="currentColor" stroke-opacity=".8" stroke-width="2" stroke-linecap="round"/><path d="M260,62 V48" stroke="currentColor" stroke-opacity=".8" stroke-width="2" stroke-linecap="round"/><path d="M269,62 V48" stroke="currentColor" stroke-opacity=".8" stroke-width="2" stroke-linecap="round"/><text x="250" y="82" text-anchor="middle" font-size="10" fill="var(--muted)">excitatory</text><rect x="204" y="106" width="72" height="5" rx="2.5" fill="var(--accent)"/><path d="M196,130 H306" stroke="currentColor" stroke-opacity=".25" stroke-width="1.2"/><path d="M198,130 V116" stroke="currentColor" stroke-opacity=".8" stroke-width="2" stroke-linecap="round"/><path d="M284,130 V116" stroke="currentColor" stroke-opacity=".8" stroke-width="2" stroke-linecap="round"/><path d="M298,130 V116" stroke="currentColor" stroke-opacity=".8" stroke-width="2" stroke-linecap="round"/><text x="250" y="150" text-anchor="middle" font-size="10" fill="var(--muted)">inhibitory</text><text x="250" y="186" text-anchor="middle" font-size="9" fill="var(--faint)">bar = illumination</text></svg></div>
    <div class="acg-eb" style="color:#15803d">GENETIC</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-opsin" title="Link to this term">Opsin</a></h3>
    <p class="acg-def">A light-gated ion channel. Illumination changes its conformation, letting ions cross the membrane and either forcing the cell to spike (excitatory opsin) or suppressing spiking (inhibitory).</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="background/Optotagging.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-optogenetics" data-cat="genetics" data-hay="optogenetics controlling neural activity by expressing light-activated ion channels in a specific subpopulation — a reporter line for the opsin, a driver line for the population — giving temporally precise control of spiking. genetic &amp; optical tools ">
    <div class="acg-eb" style="color:#15803d">GENETIC</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-optogenetics" title="Link to this term">Optogenetics</a></h3>
    <p class="acg-def">Controlling neural activity by expressing light-activated ion channels in a specific subpopulation — a reporter line for the opsin, a driver line for the population — giving temporally precise control of spiking.</p>
    </article>
    <article class="acg-card" id="term-optotagging" data-cat="genetics" data-hay="optotagging using optogenetics to identify which recorded units belong to a genetically defined population, by their response to laser pulses. trains of 10 ms pulses at 20 hz are a common stimulus. genetic &amp; optical tools ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="opto-t"><title id="opto-t">Optotagging: tagged units follow the laser pulse train</title><path d="M44,58 H58 V38 H70 V58 H104 V38 H116 V58 H150 V38 H162 V58 H196 V38 H208 V58 H242 V38 H254 V58 H288 V38 H300 V58" fill="none" stroke="var(--accent)" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/><text x="44" y="28" font-size="9.5" class="mono" fill="var(--faint)">10 ms pulses · 20 Hz</text><g stroke="var(--accent)" stroke-width="2.2" stroke-linecap="round"><path d="M62,80 V102 M67,80 V102 M108,80 V102 M114,80 V102 M154,80 V102 M160,80 V102 M200,80 V102 M206,80 V102 M246,80 V102 M252,80 V102 M292,80 V102"/></g><text x="44" y="120" font-size="11" fill="var(--accent-ink)" font-weight="600">tagged unit</text><g stroke="currentColor" stroke-opacity=".65" stroke-width="2.2" stroke-linecap="round"><path d="M52,138 V160 M78,138 V160 M96,138 V160 M132,138 V160 M148,138 V160 M186,138 V160 M212,138 V160 M228,138 V160 M266,138 V160 M290,138 V160"/></g><text x="44" y="178" font-size="11" fill="var(--muted)">untagged unit</text><text x="300" y="178" text-anchor="end" font-size="9.5" fill="var(--faint)">spikes locked to pulses</text></svg></div>
    <div class="acg-eb" style="color:#15803d">GENETIC</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-optotagging" title="Link to this term">Optotagging</a></h3>
    <p class="acg-def">Using optogenetics to identify which recorded units belong to a genetically defined population, by their response to laser pulses. Trains of 10 ms pulses at 20 Hz are a common stimulus.</p>
    </article>
    <article class="acg-card" id="term-oracle-score" data-cat="functional" data-hay="oracle score visual-response reliability — signal correlation across repeated “oracle” movies. functional data &amp; coregistration ">
    <div class="acg-eb" style="color:#9a5b12">FUNCTION</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-oracle-score" title="Link to this term">Oracle score</a></h3>
    <p class="acg-def">Visual-response reliability — signal correlation across repeated “oracle” movies.</p>
    </article>
    <article class="acg-card" id="term-osi" data-cat="functional" data-hay="osi orientation selectivity index (0–1). functional data &amp; coregistration ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="osi-t"><title id="osi-t">OSI</title><text x="160" y="24" text-anchor="middle" font-size="14" class="mono" fill="var(--accent-ink)" font-weight="600">OSI</text><circle cx="86" cy="96" r="42" fill="none" stroke="currentColor" stroke-opacity=".2" stroke-width="1.4"/><line x1="44" y1="96" x2="128" y2="96" stroke="currentColor" stroke-opacity=".22" stroke-width="1.3"/><line x1="86" y1="54" x2="86" y2="138" stroke="currentColor" stroke-opacity=".22" stroke-width="1.3"/><path d="M86,96 C95,79 95,64 86,58 C77,64 77,79 86,96 Z" fill="var(--accent)" fill-opacity=".22" stroke="var(--accent)" stroke-width="2.2" stroke-linejoin="round"/><path d="M86,96 C95,113 95,130 86,134 C77,130 77,113 86,96 Z" fill="var(--accent)" fill-opacity=".22" stroke="var(--accent)" stroke-width="2.2" stroke-linejoin="round"/><text x="86" y="162" text-anchor="middle" font-size="10.5" fill="var(--muted)">sharp</text><text x="86" y="176" text-anchor="middle" font-size="9.5" class="mono" fill="var(--accent-ink)">OSI ≈ 1</text><circle cx="232" cy="96" r="42" fill="none" stroke="currentColor" stroke-opacity=".2" stroke-width="1.4"/><line x1="190" y1="96" x2="274" y2="96" stroke="currentColor" stroke-opacity=".22" stroke-width="1.3"/><line x1="232" y1="54" x2="232" y2="138" stroke="currentColor" stroke-opacity=".22" stroke-width="1.3"/><path d="M232,96 C258,79 258,64 232,58 C206,64 206,79 232,96 Z" fill="var(--accent)" fill-opacity=".12" stroke="var(--accent)" stroke-width="2.2" stroke-linejoin="round"/><path d="M232,96 C258,113 258,130 232,134 C206,130 206,113 232,96 Z" fill="var(--accent)" fill-opacity=".12" stroke="var(--accent)" stroke-width="2.2" stroke-linejoin="round"/><text x="232" y="162" text-anchor="middle" font-size="10.5" fill="var(--muted)">broad</text><text x="232" y="176" text-anchor="middle" font-size="9.5" class="mono" fill="var(--accent-ink)">OSI ≈ 0</text></svg></div>
    <div class="acg-eb" style="color:#9a5b12">FUNCTION</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-osi" title="Link to this term">OSI</a></h3>
    <p class="acg-def">Orientation selectivity index (0–1).</p>
    </article>
    <article class="acg-card" id="term-pv-neuron" data-cat="celltypes" data-hay="parvalbumin-positive (pv+) neuron fast-spiking gabaergic interneurons with strong inhibitory effects on their neighbours; action potentials can be under 400 µs. parvalbumin is a calcium buffer, so calcium imaging of these cells should be read cautiously. cell types &amp; cortical anatomy ">
    <div class="acg-eb" style="color:#c9357f">CELLTYPE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-pv-neuron" title="Link to this term">Parvalbumin-positive (PV+) neuron</a></h3>
    <p class="acg-def">Fast-spiking GABAergic interneurons with strong inhibitory effects on their neighbours; action potentials can be under 400 µs. Parvalbumin is a calcium buffer, so calcium imaging of these cells should be read cautiously.</p>
    </article>
    <article class="acg-card" id="term-passive-replay" data-cat="stimuli" data-hay="passive replay block the same stimuli replayed with the lick spout retracted and no reward, so task-dependent modulation can be separated from stimulus drive. stimuli &amp; behavioural tasks ">
    <div class="acg-eb" style="color:#a16207">STIMULUS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-passive-replay" title="Link to this term">Passive replay block</a></h3>
    <p class="acg-def">The same stimuli replayed with the lick spout retracted and no reward, so task-dependent modulation can be separated from stimulus drive.</p>
    </article>
    <article class="acg-card" id="term-peak-channel" data-cat="signals" data-hay="peak channel the channel on which a unit's mean waveform is largest. a unit carries no position of its own — joining peak_channel_id to the channels table is how it acquires a ccf location, a brain-region label and a depth. signals &amp; preprocessing ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="pkch-t"><title id="pkch-t">Peak channel: the channel with the largest mean waveform</title><rect x="34" y="30" width="14" height="8" rx="2" fill="currentColor" fill-opacity=".35"/><path d="M70,34 h12 l3,0.8 l3,-4.0 l4,5.4 l5,-2.2 h16" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><rect x="34" y="56" width="14" height="8" rx="2" fill="currentColor" fill-opacity=".35"/><path d="M70,60 h12 l3,1.8 l3,-9.0 l4,12.2 l5,-5.0 h16" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><rect x="34" y="82" width="14" height="8" rx="2" fill="var(--accent)" fill-opacity=".9"/><path d="M70,86 h12 l3,4.8 l3,-24.0 l4,32.4 l5,-13.2 h16" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><rect x="34" y="108" width="14" height="8" rx="2" fill="currentColor" fill-opacity=".35"/><path d="M70,112 h12 l3,2.6 l3,-13.0 l4,17.6 l5,-7.2 h16" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><rect x="34" y="134" width="14" height="8" rx="2" fill="currentColor" fill-opacity=".35"/><path d="M70,138 h12 l3,1.2 l3,-6.0 l4,8.1 l5,-3.3 h16" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><rect x="34" y="160" width="14" height="8" rx="2" fill="currentColor" fill-opacity=".35"/><path d="M70,164 h12 l3,0.6 l3,-3.0 l4,4.1 l5,-1.7 h16" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><text x="118" y="72" font-size="9.5" fill="var(--accent-ink)" font-weight="600">largest</text><path d="M124,96 H190" stroke="currentColor" stroke-opacity=".5" stroke-width="1.8" stroke-linecap="round"/><polygon points="196,96 188,92 188,100" fill="currentColor" fill-opacity=".5"/><rect x="202" y="70" width="100" height="52" rx="8" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".35" stroke-width="1.8"/><text x="252" y="90" text-anchor="middle" font-size="9.5" class="mono" fill="var(--faint)">channels</text><text x="252" y="108" text-anchor="middle" font-size="10.5" fill="var(--muted)">region + depth</text><text x="160" y="190" text-anchor="middle" font-size="10" class="mono" fill="var(--accent-ink)">peak_channel_id</text></svg></div>
    <div class="acg-eb" style="color:#0369a1">SIGNAL</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-peak-channel" title="Link to this term">Peak channel</a></h3>
    <p class="acg-def">The channel on which a unit's mean waveform is largest. A unit carries no position of its own — joining <code>peak_channel_id</code> to the channels table is how it acquires a CCF location, a brain-region label and a depth.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="physiology/ephys/visual-coding/vcnp-units.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-physiology" data-cat="datasets" data-hay="physiology the activity side of a functional-connectomics dataset: the calcium-imaging responses recorded from the same neurons that were later reconstructed in em. datasets &amp; scope ">
    <div class="acg-eb" style="color:#0e7f8c">DATASETS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-physiology" title="Link to this term">Physiology</a></h3>
    <p class="acg-def">The activity side of a functional-connectomics dataset: the calcium-imaging responses recorded from the same neurons that were later reconstructed in EM.</p>
    </article>
    <article class="acg-card" id="term-position" data-cat="volume" data-hay="position the 3d coordinate of a bound spatial point (pt_position, stored in voxels by default). volume, voxels &amp; coordinates ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="pos-t"><title id="pos-t">A position: point marker inside a voxel grid with (x, y, z) label</title><g stroke="currentColor" stroke-opacity=".28" stroke-width="1.5"><path d="M50,45 V165"/><path d="M80,45 V165"/><path d="M110,45 V165"/><path d="M140,45 V165"/><path d="M170,45 V165"/><path d="M200,45 V165"/><path d="M230,45 V165"/><path d="M50,45 H230"/><path d="M50,75 H230"/><path d="M50,105 H230"/><path d="M50,135 H230"/><path d="M50,165 H230"/></g><path d="M140,88 V122 M123,105 H157" stroke="var(--accent)" stroke-width="1.5" stroke-opacity=".7" stroke-linecap="round"/><circle cx="140" cy="105" r="5.5" fill="var(--accent)" stroke="var(--surface)" stroke-width="1.5"/><text x="163" y="101" font-size="11.5" class="mono" fill="var(--accent-ink)" font-weight="600">(x, y, z)</text><text x="140" y="186" text-anchor="middle" font-size="10.5" fill="var(--muted)">voxel grid</text></svg></div>
    <div class="acg-eb" style="color:#2f6fd0">VOLUME</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-position" title="Link to this term">Position</a></h3>
    <p class="acg-def">The 3D coordinate of a bound spatial point (<code>pt_position</code>, stored in voxels by default).</p>
    </article>
    <article class="acg-card" id="term-precomputed-format" data-cat="cave" data-hay="precomputed format storage representation for arbitrarily large images/meshes/skeletons. cave — access &amp; versioning ">
    <div class="acg-eb" style="color:#0f766e">CAVE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-precomputed-format" title="Link to this term">Precomputed format</a></h3>
    <p class="acg-def">Storage representation for arbitrarily large images/meshes/skeletons.</p>
    </article>
    <article class="acg-card" id="term-pref-dir" data-cat="functional" data-hay="pref_dir preferred direction in degrees (0–360; 0 = vertical bar moving right, ccw+). functional data &amp; coregistration ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="pdir-t"><title id="pdir-t">pref_dir</title><circle cx="176" cy="100" r="68" fill="none" stroke="currentColor" stroke-opacity=".2" stroke-width="1.4"/><circle cx="176" cy="100" r="34" fill="none" stroke="currentColor" stroke-opacity=".2" stroke-width="1.4"/><line x1="104" y1="100" x2="248" y2="100" stroke="currentColor" stroke-opacity=".26" stroke-width="1.3"/><line x1="176" y1="28" x2="176" y2="172" stroke="currentColor" stroke-opacity=".26" stroke-width="1.3"/><path d="M176,100 C186,68 232,66 240,100 C232,134 186,132 176,100 Z" transform="rotate(-42 176 100)" fill="var(--accent)" fill-opacity=".16" stroke="var(--accent)" stroke-width="2" stroke-linejoin="round"/><line x1="176" y1="100" x2="222" y2="58" stroke="var(--accent)" stroke-width="3.4" stroke-linecap="round"/><path d="M222,58 L210,60 M222,58 L219,71" fill="none" stroke="var(--accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M202,100 A26 26 0 0 0 195,82" fill="none" stroke="currentColor" stroke-opacity=".55" stroke-width="1.6"/><text x="206" y="88" font-size="11" fill="var(--muted)">θ</text><text x="252" y="104" font-size="9" class="mono" fill="var(--faint)">0°</text><text x="176" y="24" text-anchor="middle" font-size="9" class="mono" fill="var(--faint)">90°</text><text x="100" y="104" text-anchor="end" font-size="9" class="mono" fill="var(--faint)">180°</text><text x="176" y="185" text-anchor="middle" font-size="9" class="mono" fill="var(--faint)">270°</text><text x="20" y="30" font-size="13" class="mono" fill="var(--accent-ink)" font-weight="600">pref_dir</text></svg></div>
    <div class="acg-eb" style="color:#9a5b12">FUNCTION</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-pref-dir" title="Link to this term">pref_dir</a></h3>
    <p class="acg-def">Preferred direction in degrees (0–360; 0 = vertical bar moving right, CCW+).</p>
    </article>
    <article class="acg-card" id="term-pref-ori" data-cat="functional" data-hay="pref_ori preferred orientation in degrees (0–180). functional data &amp; coregistration ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="pori-t"><title id="pori-t">pref_ori</title><g transform="rotate(-34 168 104)"><rect x="112" y="76" width="112" height="6" rx="3" fill="var(--accent)" fill-opacity=".3"/><rect x="104" y="98" width="128" height="13" rx="6" fill="var(--accent)"/><rect x="112" y="126" width="112" height="6" rx="3" fill="var(--accent)" fill-opacity=".3"/></g><line x1="168" y1="104" x2="240" y2="104" stroke="currentColor" stroke-opacity=".4" stroke-width="1.6" stroke-dasharray="5 4"/><path d="M204,104 A36 36 0 0 0 198,82" fill="none" stroke="currentColor" stroke-opacity=".55" stroke-width="1.6"/><text x="208" y="90" font-size="11" fill="var(--muted)">θ</text><text x="20" y="30" font-size="13" class="mono" fill="var(--accent-ink)" font-weight="600">pref_ori</text><text x="160" y="188" text-anchor="middle" font-size="9.5" class="mono" fill="var(--faint)">θ ∈ 0–180°</text></svg></div>
    <div class="acg-eb" style="color:#9a5b12">FUNCTION</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-pref-ori" title="Link to this term">pref_ori</a></h3>
    <p class="acg-def">Preferred orientation in degrees (0–180).</p>
    </article>
    <article class="acg-card" id="term-presence-ratio" data-cat="quality" data-hay="presence_ratio fraction of the session in which the unit had spikes. a low value usually means the unit drifted away from the probe. default threshold 0.9. quality metrics ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="pres-t"><title id="pres-t">Presence ratio across the session</title> <rect x="30" y="44" width="256" height="26" rx="4" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".35" stroke-width="1.6"/> <path d="M40,49 V65 M56,49 V65 M72,49 V65 M92,49 V65 M108,49 V65 M126,49 V65 M144,49 V65 M162,49 V65 M180,49 V65 M198,49 V65 M216,49 V65 M234,49 V65 M252,49 V65 M270,49 V65" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round"/> <text x="30" y="36" font-size="10" fill="var(--muted)">unit A</text> <text x="286" y="36" text-anchor="end" font-size="10" class="mono" fill="var(--accent-ink)">0.98 keep</text> <rect x="30" y="104" width="256" height="26" rx="4" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".35" stroke-width="1.6"/> <path d="M40,109 V125 M56,109 V125 M72,109 V125 M92,109 V125 M108,109 V125 M126,109 V125" stroke="currentColor" stroke-opacity=".55" stroke-width="1.8" stroke-linecap="round"/> <text x="30" y="96" font-size="10" fill="var(--muted)">unit B</text> <text x="286" y="96" text-anchor="end" font-size="10" class="mono" fill="var(--muted)">0.42 drifted</text> <text x="210" y="122" text-anchor="middle" font-size="9" fill="var(--faint)">no spikes after drift</text> <path d="M30,150 H286" stroke="currentColor" stroke-opacity=".3" stroke-width="1.6" stroke-linecap="round"/> <text x="158" y="168" text-anchor="middle" font-size="10" fill="var(--muted)">session</text> <text x="158" y="184" text-anchor="middle" font-size="9" class="mono" fill="var(--faint)">threshold 0.9</text> </svg></div>
    <div class="acg-eb" style="color:#4338ca">QUALITY</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-presence-ratio" title="Link to this term">presence_ratio</a></h3>
    <p class="acg-def">Fraction of the session in which the unit had spikes. A low value usually means the unit drifted away from the probe. Default threshold 0.9.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="physiology/ephys/visual-coding/vcnp-quality-metrics.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-probe-shank-channel" data-cat="modalities" data-hay="probe / shank / channel / site the recording hierarchy: a probe carries one or more shanks, a shank is patterned with recording sites, and the subset wired out for recording at any moment are the channels. recording modalities &amp; instruments ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="psc-t"><title id="psc-t">Probe, shank, site and channel</title> <rect x="46" y="22" width="112" height="22" rx="5" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".55" stroke-width="2"/> <path d="M72,44 v104 l8,14 l8,-14 V44 Z" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".55" stroke-width="1.8" stroke-linejoin="round"/> <path d="M124,44 v104 l8,14 l8,-14 V44 Z" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".55" stroke-width="1.8" stroke-linejoin="round"/> <g fill="currentColor" fill-opacity=".45"> <circle cx="80" cy="58" r="3"/><circle cx="80" cy="74" r="3"/><circle cx="80" cy="90" r="3"/><circle cx="80" cy="106" r="3"/><circle cx="80" cy="122" r="3"/><circle cx="80" cy="138" r="3"/> <circle cx="132" cy="58" r="3"/><circle cx="132" cy="74" r="3"/><circle cx="132" cy="122" r="3"/><circle cx="132" cy="138" r="3"/></g> <circle cx="132" cy="90" r="3.6" fill="var(--accent)"/><circle cx="132" cy="106" r="3.6" fill="var(--accent)"/> <g stroke="currentColor" stroke-opacity=".35" stroke-width="1.4"> <path d="M160,33 H196"/><path d="M144,60 H196"/><path d="M144,98 H196"/><path d="M74,74 H44"/></g> <text x="200" y="37" font-size="11" fill="var(--muted)">probe</text> <text x="200" y="64" font-size="11" fill="var(--muted)">shank</text> <text x="40" y="78" text-anchor="end" font-size="11" fill="var(--muted)">site</text> <text x="200" y="102" font-size="11" fill="var(--accent-ink)" font-weight="600">channel</text> <text x="200" y="115" font-size="9" fill="var(--faint)">wired out now</text> <text x="106" y="180" text-anchor="middle" font-size="9" fill="var(--faint)">sites patterned on each shank</text> </svg></div>
    <div class="acg-eb" style="color:#c2410c">MODALITY</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-probe-shank-channel" title="Link to this term">Probe / shank / channel / site</a></h3>
    <p class="acg-def">The recording hierarchy: a probe carries one or more shanks, a shank is patterned with recording sites, and the subset wired out for recording at any moment are the channels.</p>
    </article>
    <article class="acg-card" id="term-project-cache" data-cat="dataorg" data-hay="project cache the allensdk entry point for the brain observatory datasets: it downloads what you ask for, keeps it in a known directory, and hands back manifest tables and session objects. newer datasets have no cache — you open the nwb file yourself. datasets, sessions &amp; files ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="pcx-t"><title id="pcx-t">Project cache: remote store to local directory to tables</title><g fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".5" stroke-width="2" stroke-linejoin="round"><path d="M22,66h56v58c0,7 -56,7 -56,0z"/><ellipse cx="50" cy="66" rx="28" ry="8"/><rect x="246" y="62" width="56" height="62" rx="4"/></g><path d="M246,78H302 M246,94H302 M246,110H302 M274,62V124" stroke="currentColor" stroke-opacity=".3" stroke-width="1.4"/><path d="M122,64h26l6,9h48v52h-80z" fill="var(--accent)" fill-opacity=".14" stroke="var(--accent)" stroke-width="2.4" stroke-linejoin="round"/><g fill="none" stroke="currentColor" stroke-opacity=".55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M86,96H114"/><path d="M108,92L114,96L108,100"/><path d="M210,96H238"/><path d="M232,92L238,96L232,100"/></g><g text-anchor="middle" font-size="10" fill="var(--muted)"><text x="50" y="146">remote store</text><text x="274" y="146">manifest tables</text><text x="274" y="160">session objects</text></g><g text-anchor="middle" class="mono" font-size="10" fill="var(--accent-ink)" font-weight="600"><text x="162" y="102">cache_dir</text></g><text x="162" y="146" text-anchor="middle" font-size="10" fill="var(--accent-ink)" font-weight="600">downloads once</text></svg></div>
    <div class="acg-eb" style="color:#3f3f46">DATA</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-project-cache" title="Link to this term">Project cache</a></h3>
    <p class="acg-def">The AllenSDK entry point for the Brain Observatory datasets: it downloads what you ask for, keeps it in a known directory, and hands back manifest tables and session objects. Newer datasets have no cache — you open the NWB file yourself.</p>
    </article>
    <article class="acg-card" id="term-proofreading" data-cat="proofreading" data-hay="proofreading manual correction of split/merge errors to make neurons biologically accurate/complete. proofreading &amp; data quality ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="pp"><title id="pp">Proofreading — before and after</title>
<circle cx="46" cy="104" r="9" fill="var(--neuron)" fill-opacity=".2" stroke="var(--neuron)" stroke-width="2.4"/>
<g fill="none" stroke="var(--neuron)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
<path d="M46,95 C44,84 43,76 42,66"/>
<path d="M40,56 C39,48 38,42 37,34"/>
<path d="M46,104 C64,100 78,96 94,92"/>
<path d="M46,113 C46,130 44,142 42,156"/>
</g>
<path d="M36,64 L47,58" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round"/>
<path d="M94,92 C104,90 112,92 122,96" fill="none" stroke="var(--dendrite)" stroke-width="2.2" stroke-linecap="round"/>
<circle cx="94" cy="92" r="8" fill="none" stroke="var(--error)" stroke-width="2"/>
<path d="M90,88 l8,8 M98,88 l-8,8" stroke="var(--error)" stroke-width="1.8" stroke-linecap="round"/>
<text x="70" y="178" text-anchor="middle" font-size="9.5" fill="var(--error)">merge + split</text>
<path d="M150,100 L180,100" fill="none" stroke="currentColor" stroke-opacity=".55" stroke-width="2.4" stroke-linecap="round"/>
<path d="M173,95 L181,100 L173,105" fill="none" stroke="currentColor" stroke-opacity=".55" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
<text x="165" y="90" text-anchor="middle" font-size="9" fill="var(--muted)">proofread</text>
<circle cx="240" cy="104" r="9" fill="var(--neuron)" fill-opacity=".2" stroke="var(--neuron)" stroke-width="2.4"/>
<g fill="none" stroke="var(--neuron)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
<path d="M240,95 C236,82 234,72 232,58"/>
<path d="M232,58 C228,52 226,50 222,44"/>
<path d="M240,104 C258,100 272,96 288,92"/>
<path d="M272,96 C280,94 285,95 291,98"/>
<path d="M240,113 C240,130 238,142 236,156"/>
</g>
<path d="M256,52 l5,6 l11,-13" fill="none" stroke="var(--ok)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
<text x="248" y="178" text-anchor="middle" font-size="9.5" fill="var(--ok)">one clean neuron</text>
</svg></div>
    <div class="acg-eb" style="color:#b8791a">PROOF</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-proofreading" title="Link to this term">Proofreading</a></h3>
    <p class="acg-def">Manual correction of split/merge errors to make neurons biologically accurate/complete.</p>
    </article>
    <article class="acg-card" id="term-psth" data-cat="responses" data-hay="psth peri-stimulus time histogram: spikes binned relative to stimulus onset and averaged over trials, giving the time course of the response. response properties &amp; analysis ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="psth-t"><title id="psth-t">Peri-stimulus time histogram</title> <path d="M96,20 V172" stroke="var(--accent)" stroke-width="2" stroke-opacity=".7"/> <text x="96" y="14" text-anchor="middle" font-size="9.5" fill="var(--accent-ink)">onset</text> <g stroke="currentColor" stroke-opacity=".6" stroke-width="4" stroke-linecap="round"> <path d="M44,30 h0 M70,30 h0 M104,30 h0 M112,30 h0 M126,30 h0 M180,30 h0"/> <path d="M52,46 h0 M102,46 h0 M116,46 h0 M130,46 h0 M158,46 h0 M216,46 h0"/> <path d="M36,62 h0 M82,62 h0 M106,62 h0 M118,62 h0 M140,62 h0 M196,62 h0"/> <path d="M62,78 h0 M100,78 h0 M110,78 h0 M124,78 h0 M168,78 h0 M240,78 h0"/> <path d="M48,94 h0 M90,94 h0 M108,94 h0 M122,94 h0 M150,94 h0 M228,94 h0"/></g> <text x="26" y="66" text-anchor="end" font-size="9.5" fill="var(--muted)">trials</text> <path d="M30,156 H300" stroke="currentColor" stroke-opacity=".3" stroke-width="1.6"/> <path d="M32,146 h14 v-2 h16 v3 h16 v-2 h16 v-34 h16 v-8 h16 v22 h16 v12 h16 v6 h16 v-2 h16 v1 h16 v2 h16 v-1 h14 v13 h-220 Z" fill="var(--accent)" fill-opacity=".5"/> <text x="26" y="132" text-anchor="end" font-size="9.5" fill="var(--muted)">rate</text> <text x="165" y="176" text-anchor="middle" font-size="9.5" fill="var(--faint)">binned and averaged over trials</text> </svg></div>
    <div class="acg-eb" style="color:#9f1239">RESPONSE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-psth" title="Link to this term">PSTH</a></h3>
    <p class="acg-def">Peri-stimulus time histogram: spikes binned relative to stimulus onset and averaged over trials, giving the time course of the response.</p>
    </article>
    <article class="acg-card" id="term-pychunkedgraph-pcg-l2-graph" data-cat="segmentation" data-hay="pychunkedgraph (pcg) / l2 graph hierarchical representation: l0 = voxels, l1 = supervoxels, l2 = supervoxels grouped within a chunk. segmentation &amp; reconstruction ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="pcg"><title id="pcg">PyChunkedGraph L2 graph</title><g stroke="currentColor" stroke-opacity=".4" stroke-width="1.5"><rect x="60" y="150" width="14" height="14" fill="var(--scaffold)" fill-opacity=".16"/><rect x="78" y="150" width="14" height="14" fill="var(--scaffold)" fill-opacity=".16"/><rect x="96" y="150" width="14" height="14" fill="var(--scaffold)" fill-opacity=".16"/><rect x="114" y="150" width="14" height="14" fill="var(--scaffold)" fill-opacity=".16"/><rect x="132" y="150" width="14" height="14" fill="var(--scaffold)" fill-opacity=".16"/><rect x="150" y="150" width="14" height="14" fill="var(--scaffold)" fill-opacity=".16"/><rect x="168" y="150" width="14" height="14" fill="var(--scaffold)" fill-opacity=".16"/><rect x="186" y="150" width="14" height="14" fill="var(--scaffold)" fill-opacity=".16"/></g><g stroke="currentColor" stroke-opacity=".55" stroke-width="2"><rect x="74" y="98" width="22" height="22" fill="var(--scaffold)" fill-opacity=".3"/><rect x="104" y="98" width="22" height="22" fill="var(--scaffold)" fill-opacity=".3"/><rect x="134" y="98" width="22" height="22" fill="var(--scaffold)" fill-opacity=".3"/><rect x="164" y="98" width="22" height="22" fill="var(--scaffold)" fill-opacity=".3"/></g><circle cx="116" cy="48" r="12" fill="var(--accent)" fill-opacity=".3" stroke="var(--accent-ink)" stroke-width="2.2"/><circle cx="144" cy="48" r="12" fill="var(--accent)" fill-opacity=".3" stroke="var(--accent-ink)" stroke-width="2.2"/><g fill="none" stroke="currentColor" stroke-opacity=".6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M130,148 V124"/><path d="M124,130 l6,-6 6,6"/><path d="M130,96 V66"/><path d="M124,72 l6,-6 6,6"/></g><text x="210" y="52" font-size="10.5" fill="var(--accent-ink)">L2 nodes <tspan class="mono" fill="var(--faint)">~10</tspan></text><text x="210" y="113" font-size="10.5" fill="var(--muted)">supervoxels <tspan class="mono" fill="var(--faint)">1e3</tspan></text><text x="210" y="160" font-size="10.5" fill="var(--muted)">voxels <tspan class="mono" fill="var(--faint)">1e6</tspan></text></svg></div>
    <div class="acg-eb" style="color:#6d55e0">SEGMENT</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-pychunkedgraph-pcg-l2-graph" title="Link to this term">PyChunkedGraph (PCG) / L2 graph</a></h3>
    <p class="acg-def">Hierarchical representation: L0 = voxels, L1 = supervoxels, L2 = supervoxels grouped within a chunk.</p>
    </article>
    <article class="acg-card" id="term-pyramidal-cell" data-cat="celltypes" data-hay="pyramidal cell an excitatory neuron with a characteristic cell-body shape and apical dendrite. in visual cortex, by far the most common excitatory type. cell types &amp; cortical anatomy ">
    <div class="acg-eb" style="color:#c9357f">CELLTYPE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-pyramidal-cell" title="Link to this term">Pyramidal cell</a></h3>
    <p class="acg-def">An excitatory neuron with a characteristic cell-body shape and apical dendrite. In visual cortex, by far the most common excitatory type.</p>
    </article>
    <article class="acg-card" id="term-q-value-rpe" data-cat="stimuli" data-hay="q value / rpe latent variables of a reinforcement-learning fit to foraging behaviour: the expected value of each choice, and the reward prediction error that updates it. useful precisely because they can then be regressed against neural activity. stimuli &amp; behavioural tasks ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="qrpe-t"><title id="qrpe-t">Q value and reward prediction error fitted to foraging behaviour</title><text x="20" y="66" font-size="9" fill="var(--faint)">choice</text><path d="M20,76 H92" stroke="currentColor" stroke-opacity=".25" stroke-width="1.2"/><path d="M28,76 V64" stroke="currentColor" stroke-opacity=".75" stroke-width="2" stroke-linecap="round"/><path d="M46,76 V64" stroke="currentColor" stroke-opacity=".75" stroke-width="2" stroke-linecap="round"/><path d="M62,76 V64" stroke="currentColor" stroke-opacity=".75" stroke-width="2" stroke-linecap="round"/><path d="M84,76 V64" stroke="currentColor" stroke-opacity=".75" stroke-width="2" stroke-linecap="round"/><path d="M20,104 H92" stroke="currentColor" stroke-opacity=".25" stroke-width="1.2"/><path d="M28,104 V92" stroke="currentColor" stroke-opacity=".75" stroke-width="2" stroke-linecap="round"/><path d="M62,104 V92" stroke="currentColor" stroke-opacity=".75" stroke-width="2" stroke-linecap="round"/><text x="20" y="122" font-size="9" fill="var(--faint)">reward</text><text x="56" y="150" text-anchor="middle" font-size="10" fill="var(--muted)">behaviour</text><path d="M98,90 H112" stroke="currentColor" stroke-opacity=".5" stroke-width="1.8" stroke-linecap="round"/><polygon points="118,90 110,86 110,94" fill="currentColor" fill-opacity=".5"/><rect x="122" y="58" width="86" height="64" rx="9" fill="var(--surface-2)" stroke="var(--accent)" stroke-width="2.2"/><text x="165" y="86" text-anchor="middle" font-size="11" class="mono" fill="var(--accent-ink)" font-weight="600">Q value</text><text x="165" y="106" text-anchor="middle" font-size="11" class="mono" fill="var(--accent-ink)" font-weight="600">RPE</text><text x="165" y="150" text-anchor="middle" font-size="10" fill="var(--muted)">RL model fit</text><path d="M214,90 H228" stroke="currentColor" stroke-opacity=".5" stroke-width="1.8" stroke-linecap="round"/><polygon points="234,90 226,86 226,94" fill="currentColor" fill-opacity=".5"/><path d="M240,104 h8 l4,-22 l4,26 l6,-8 h6 l4,-20 l4,24 l6,-6 h20" fill="none" stroke="var(--neuron)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><text x="270" y="150" text-anchor="middle" font-size="10" fill="var(--muted)">neural activity</text><text x="160" y="184" text-anchor="middle" font-size="9.5" fill="var(--faint)">latent variables become regressors</text></svg></div>
    <div class="acg-eb" style="color:#a16207">STIMULUS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-q-value-rpe" title="Link to this term">Q value / RPE</a></h3>
    <p class="acg-def">Latent variables of a reinforcement-learning fit to foraging behaviour: the expected value of each choice, and the reward prediction error that updates it. Useful precisely because they can then be regressed against neural activity.</p>
    </article>
    <article class="acg-card" id="term-query-table-synapse-query" data-cat="tables" data-hay="query_table / synapse_query the two query entry points + filter_in_dict; note the 200k-row cap, desired_resolution, select_columns, split_positions. annotation tables, ids &amp; queries ">
    <div class="acg-eb" style="color:#9333ea">TABLES</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-query-table-synapse-query" title="Link to this term">query_table / synapse_query</a></h3>
    <p class="acg-def">The two query entry points + <code>filter_in_dict</code>; note the 200k-row cap, <code>desired_resolution</code>, <code>select_columns</code>, <code>split_positions</code>.</p>
    </article>
    <article class="acg-card" id="term-radius" data-cat="morphology" data-hay="radius half the cable thickness at a skeleton vertex (µm). morphology — meshes &amp; skeletons ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="m-rad"><title id="m-rad">Skeleton segment as tapering tube with radius callout</title><path d="M50,82 C120,78 200,92 260,98 L260,122 C200,128 120,142 50,138 Z" fill="var(--neuron)" fill-opacity=".16" stroke="var(--neuron)" stroke-width="2.2" stroke-linejoin="round"/><line x1="50" y1="110" x2="260" y2="110" stroke="currentColor" stroke-opacity=".55" stroke-width="1.8" stroke-dasharray="6 5" stroke-linecap="round"/><g fill="currentColor" fill-opacity=".7"><circle cx="50" cy="110" r="3.2"/><circle cx="155" cy="110" r="3.2"/><circle cx="260" cy="110" r="3.2"/></g><line x1="120" y1="80" x2="120" y2="140" stroke="currentColor" stroke-opacity=".3" stroke-width="1.2" stroke-dasharray="3 3"/><path d="M120,110 L120,84 M116,90 L120,84 L124,90 M116,104 L120,110 L124,104" fill="none" stroke="var(--accent-ink)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><text x="130" y="94" font-size="11" class="mono" fill="var(--accent-ink)" font-weight="600">r = 1.2 µm</text><text x="155" y="164" text-anchor="middle" font-size="9.5" fill="var(--muted)">radius per skeleton vertex</text></svg></div>
    <div class="acg-eb" style="color:#2a8f57">MORPH</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-radius" title="Link to this term">Radius</a></h3>
    <p class="acg-def">Half the cable thickness at a skeleton vertex (µm).</p>
    </article>
    <article class="acg-card" id="term-readout-loc-x-y" data-cat="functional" data-hay="readout_loc_x/y approximate receptive-field center in stimulus space. functional data &amp; coregistration ">
    <div class="acg-eb" style="color:#9a5b12">FUNCTION</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-readout-loc-x-y" title="Link to this term">readout_loc_x/y</a></h3>
    <p class="acg-def">Approximate receptive-field center in stimulus space.</p>
    </article>
    <article class="acg-card" id="term-receptive-field" data-cat="responses" data-hay="receptive field the region of the stimulus domain in which a stimulus must lie to evoke a response. generalises beyond space to any stimulus dimension, and so to the stimulus features that drive a cell. response properties &amp; analysis ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="rfd-t"><title id="rfd-t">Receptive field: only stimuli inside the region drive the cell</title><rect x="24" y="34" width="96" height="60" rx="4" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".45" stroke-width="1.8"/><ellipse cx="72" cy="64" rx="26" ry="18" fill="var(--accent)" fill-opacity=".14" stroke="var(--accent)" stroke-width="2" stroke-dasharray="4 4"/><rect x="64" y="56" width="16" height="16" rx="2" fill="currentColor" fill-opacity=".6"/><path d="M150,56v14M155,56v14M162,56v14M165,56v14M167,56v14M176,56v14M184,56v14M185,56v14M186,56v14M191,56v14M194,56v14M198,56v14M205,56v14M207,56v14" stroke="var(--neuron)" stroke-width="2.2" stroke-linecap="round"/><text x="292" y="46" text-anchor="end" font-size="10" fill="var(--accent-ink)" font-weight="600">response</text><rect x="24" y="112" width="96" height="60" rx="4" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".45" stroke-width="1.8"/><ellipse cx="72" cy="142" rx="26" ry="18" fill="none" stroke="currentColor" stroke-opacity=".3" stroke-width="2" stroke-dasharray="4 4"/><rect x="98" y="118" width="16" height="16" rx="2" fill="currentColor" fill-opacity=".6"/><path d="M190,134v14M194,134v14M207,134v14" stroke="currentColor" stroke-opacity=".45" stroke-width="2.2" stroke-linecap="round"/><text x="292" y="124" text-anchor="end" font-size="10" fill="var(--muted)">no response</text><text x="72" y="22" text-anchor="middle" font-size="10" fill="var(--muted)">stimulus inside</text><text x="72" y="190" text-anchor="middle" font-size="10" fill="var(--muted)">stimulus outside</text></svg></div>
    <div class="acg-eb" style="color:#9f1239">RESPONSE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-receptive-field" title="Link to this term">Receptive field</a></h3>
    <p class="acg-def">The region of the stimulus domain in which a stimulus must lie to evoke a response. Generalises beyond space to any stimulus dimension, and so to the stimulus features that drive a cell.</p>
    </article>
    <article class="acg-card" id="term-reference-table" data-cat="tables" data-hay="reference table a table linked to another (usually nucleus_detection_v0) by shared annotation id, adding _ref columns. annotation tables, ids &amp; queries ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="reft-t">
<title id="reft-t">Reference table</title>
<rect x="20" y="48" width="112" height="94" rx="5" fill="var(--surface-2)" stroke="var(--border)" stroke-width="1.5"/>
<text x="26" y="62" font-size="9.5" class="mono" fill="var(--muted)">cells</text>
<line x1="20" y1="68" x2="132" y2="68" stroke="var(--border)" stroke-width="1.3"/>
<rect x="96" y="68" width="36" height="74" fill="var(--accent)" fill-opacity=".18"/>
<line x1="96" y1="48" x2="96" y2="142" stroke="var(--border)" stroke-width="1.3"/>
<line x1="20" y1="92" x2="132" y2="92" stroke="var(--border)" stroke-opacity=".55" stroke-width="1"/>
<line x1="20" y1="117" x2="132" y2="117" stroke="var(--border)" stroke-opacity=".55" stroke-width="1"/>
<text x="30" y="84" font-size="9" class="mono" fill="var(--muted)">pos</text>
<text x="30" y="109" font-size="9" class="mono" fill="var(--faint)">…</text>
<text x="30" y="134" font-size="9" class="mono" fill="var(--faint)">…</text>
<text x="114" y="84" text-anchor="middle" font-size="9" class="mono" fill="var(--accent-ink)">id</text>
<text x="114" y="109" text-anchor="middle" font-size="9" class="mono" fill="var(--accent-ink)">7</text>
<text x="114" y="134" text-anchor="middle" font-size="9" class="mono" fill="var(--accent-ink)">8</text>
<rect x="188" y="48" width="112" height="94" rx="5" fill="var(--surface-2)" stroke="var(--border)" stroke-width="1.5"/>
<text x="194" y="62" font-size="9.5" class="mono" fill="var(--muted)">cell_type</text>
<line x1="188" y1="68" x2="300" y2="68" stroke="var(--border)" stroke-width="1.3"/>
<rect x="188" y="68" width="36" height="74" fill="var(--accent)" fill-opacity=".18"/>
<rect x="224" y="68" width="76" height="74" fill="var(--dendrite)" fill-opacity=".14"/>
<line x1="224" y1="48" x2="224" y2="142" stroke="var(--border)" stroke-width="1.3"/>
<line x1="188" y1="92" x2="300" y2="92" stroke="var(--border)" stroke-opacity=".55" stroke-width="1"/>
<line x1="188" y1="117" x2="300" y2="117" stroke="var(--border)" stroke-opacity=".55" stroke-width="1"/>
<text x="206" y="84" text-anchor="middle" font-size="9" class="mono" fill="var(--accent-ink)">id</text>
<text x="206" y="109" text-anchor="middle" font-size="9" class="mono" fill="var(--accent-ink)">7</text>
<text x="206" y="134" text-anchor="middle" font-size="9" class="mono" fill="var(--accent-ink)">8</text>
<text x="232" y="84" font-size="9" class="mono" fill="var(--dendrite)">type_ref</text>
<text x="232" y="109" font-size="9" class="mono" fill="var(--muted)">exc</text>
<text x="232" y="134" font-size="9" class="mono" fill="var(--muted)">inh</text>
<text x="160" y="94" text-anchor="middle" font-size="8.5" fill="var(--accent-ink)">join on id</text>
<line x1="136" y1="105" x2="184" y2="105" stroke="var(--accent-ink)" stroke-width="2" stroke-linecap="round"/>
<path d="M142,100 l-6,5 6,5" fill="none" stroke="var(--accent-ink)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M178,100 l6,5 -6,5" fill="none" stroke="var(--accent-ink)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<text x="160" y="170" text-anchor="middle" font-size="9.5" fill="var(--muted)">adds *_ref columns</text>
</svg></div>
    <div class="acg-eb" style="color:#9333ea">TABLES</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-reference-table" title="Link to this term">Reference table</a></h3>
    <p class="acg-def">A table linked to another (usually <code>nucleus_detection_v0</code>) by shared annotation <code>id</code>, adding <code>_ref</code> columns.</p>
    </article>
    <article class="acg-card" id="term-regular-spiking-neuron" data-cat="celltypes" data-hay="regular spiking neuron (rs) longer action potentials and spike-frequency adaptation — the rate falls over a sustained current step. the most common cortical type, usually associated with excitatory pyramidal neurons. cell types &amp; cortical anatomy ">
    <div class="acg-eb" style="color:#c9357f">CELLTYPE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-regular-spiking-neuron" title="Link to this term">Regular spiking neuron (RS)</a></h3>
    <p class="acg-def">Longer action potentials and spike-frequency adaptation — the rate falls over a sustained current step. The most common cortical type, usually associated with excitatory pyramidal neurons.</p>
    </article>
    <article class="acg-card" id="term-reporter-line" data-cat="genetics" data-hay="reporter line a transgenic line engineered to express a protein that monitors or manipulates activity — gfp, gcamp, channelrhodopsin — but only once the controlling protein (cre or flp) is present. genetic &amp; optical tools ">
    <div class="acg-eb" style="color:#15803d">GENETIC</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-reporter-line" title="Link to this term">Reporter line</a></h3>
    <p class="acg-def">A transgenic line engineered to express a protein that monitors or manipulates activity — GFP, GCaMP, channelrhodopsin — but only once the controlling protein (Cre or FLP) is present.</p>
    </article>
    <article class="acg-card" id="term-residual-separation-score" data-cat="functional" data-hay="residual / separation score the two coregistration-quality metrics. functional data &amp; coregistration ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="resid-t"><title id="resid-t">Residual and separation score</title><circle cx="128" cy="30" r="5" fill="var(--accent)"/><circle cx="192" cy="30" r="5" fill="var(--neuron)"/><line x1="133" y1="30" x2="187" y2="30" stroke="currentColor" stroke-opacity=".5" stroke-width="2" stroke-dasharray="5 4"/><text x="160" y="20" text-anchor="middle" font-size="9.5" class="mono" fill="var(--muted)">coreg match</text><path d="M46,128 A46 46 0 0 1 138,128" fill="none" stroke="currentColor" stroke-opacity=".3" stroke-width="6" stroke-linecap="round"/><path d="M46,128 A46 46 0 0 1 70,89" fill="none" stroke="var(--ok)" stroke-width="6" stroke-linecap="round"/><line x1="92" y1="128" x2="63" y2="104" stroke="var(--accent)" stroke-width="3" stroke-linecap="round"/><circle cx="92" cy="128" r="5" fill="var(--accent)"/><text x="92" y="150" text-anchor="middle" font-size="10.5" fill="var(--muted)">residual</text><text x="92" y="165" text-anchor="middle" font-size="10" class="mono" fill="var(--accent-ink)">2.1 µm</text><path d="M186,128 A46 46 0 0 1 278,128" fill="none" stroke="currentColor" stroke-opacity=".3" stroke-width="6" stroke-linecap="round"/><path d="M254,89 A46 46 0 0 1 278,128" fill="none" stroke="var(--ok)" stroke-width="6" stroke-linecap="round"/><line x1="232" y1="128" x2="261" y2="104" stroke="var(--accent)" stroke-width="3" stroke-linecap="round"/><circle cx="232" cy="128" r="5" fill="var(--accent)"/><text x="232" y="150" text-anchor="middle" font-size="10.5" fill="var(--muted)">separation</text><text x="232" y="165" text-anchor="middle" font-size="10" class="mono" fill="var(--accent-ink)">0.92</text></svg></div>
    <div class="acg-eb" style="color:#9a5b12">FUNCTION</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-residual-separation-score" title="Link to this term">Residual / Separation score</a></h3>
    <p class="acg-def">The two coregistration-quality metrics.</p>
    </article>
    <article class="acg-card" id="term-resolution" data-cat="volume" data-hay="resolution physical voxel size in nm/voxel (microns 4×4×40; v1dd 9×9×45); set per query via desired_resolution. volume, voxels &amp; coordinates ">
    <div class="acg-eb" style="color:#2f6fd0">VOLUME</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-resolution" title="Link to this term">Resolution</a></h3>
    <p class="acg-def">Physical voxel size in nm/voxel (MICrONS 4×4×40; V1DD 9×9×45); set per query via <code>desired_resolution</code>.</p>
    </article>
    <article class="acg-card" id="term-rmi" data-cat="stimuli" data-hay="response modulation index (rmi) the normalised contrast between visual and auditory target response rates, collapsing two hit rates into one number that says which context the mouse is behaving in. stimuli &amp; behavioural tasks ">
    <div class="acg-eb" style="color:#a16207">STIMULUS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-rmi" title="Link to this term">Response modulation index (RMI)</a></h3>
    <p class="acg-def">The normalised contrast between visual and auditory target response rates, collapsing two hit rates into one number that says which context the mouse is behaving in.</p>
    </article>
    <article class="acg-card" id="term-retake" data-cat="dataorg" data-hay="retake a second attempt at a session_type after the first failed qc. why prior_exposures_to_image_set and not session_type tells you whether a session was truly the first with novel images. datasets, sessions &amp; files ">
    <div class="acg-eb" style="color:#3f3f46">DATA</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-retake" title="Link to this term">Retake</a></h3>
    <p class="acg-def">A second attempt at a <code>session_type</code> after the first failed QC. Why <code>prior_exposures_to_image_set</code> and not <code>session_type</code> tells you whether a session was truly the first with novel images.</p>
    </article>
    <article class="acg-card" id="term-retinotopy" data-cat="responses" data-hay="retinotopy the mapping of visual space onto neural space: neighbouring points in the visual field are represented by neighbouring points in the brain. measured as altitude (upper–lower) and azimuth (left–right). response properties &amp; analysis ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="ret-t"><title id="ret-t">Retinotopy: neighbouring points in visual space map to neighbouring cortex</title><rect x="30" y="44" width="100" height="100" rx="3" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".4" stroke-width="1.6"/><path d="M63,44 V144 M97,44 V144 M30,77 H130 M30,111 H130" stroke="currentColor" stroke-opacity=".18" stroke-width="1.2"/><circle cx="50" cy="68" r="5" fill="var(--accent)" fill-opacity="1"/><circle cx="108" cy="72" r="5" fill="currentColor" fill-opacity=".7"/><circle cx="76" cy="124" r="5" fill="currentColor" fill-opacity=".35"/><path d="M206,52 C252,40 296,62 292,96 C288,132 244,152 212,140 C186,130 180,68 206,52" fill="var(--scaffold)" fill-opacity=".18" stroke="currentColor" stroke-opacity=".45" stroke-width="1.8"/><circle cx="224" cy="76" r="5" fill="var(--accent)" fill-opacity="1"/><circle cx="272" cy="88" r="5" fill="currentColor" fill-opacity=".7"/><circle cx="238" cy="124" r="5" fill="currentColor" fill-opacity=".35"/><path d="M140,94 H166" stroke="currentColor" stroke-opacity=".5" stroke-width="1.8" stroke-linecap="round"/><polygon points="174,94 165,89 165,99" fill="currentColor" fill-opacity=".5"/><text x="157" y="84" text-anchor="middle" font-size="9" fill="var(--faint)">maps to</text><path d="M30,156 H92" stroke="currentColor" stroke-opacity=".4" stroke-width="1.5"/><polygon points="98,156 90,152 90,160" fill="currentColor" fill-opacity=".4"/><text x="112" y="159" font-size="9" fill="var(--faint)">azimuth</text><path d="M20,144 V60" stroke="currentColor" stroke-opacity=".4" stroke-width="1.5"/><polygon points="20,52 16,60 24,60" fill="currentColor" fill-opacity=".4"/><text x="14" y="102" text-anchor="middle" font-size="9" fill="var(--faint)" transform="rotate(-90 14 102)">altitude</text><text x="80" y="184" text-anchor="middle" font-size="10.5" fill="var(--muted)">visual field</text><text x="244" y="184" text-anchor="middle" font-size="10.5" fill="var(--muted)">cortex</text></svg></div>
    <div class="acg-eb" style="color:#9f1239">RESPONSE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-retinotopy" title="Link to this term">Retinotopy</a></h3>
    <p class="acg-def">The mapping of visual space onto neural space: neighbouring points in the visual field are represented by neighbouring points in the brain. Measured as altitude (upper–lower) and azimuth (left–right).</p>
    </article>
    <article class="acg-card" id="term-roi-mask" data-cat="signals" data-hay="roi mask the pixel mask for one segmented cell in an imaging plane. in two-photon data an roi is the set of pixels thought to belong to a single neuron. signals &amp; preprocessing ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="roi-t"><title id="roi-t">ROI mask: the pixels assigned to one segmented cell</title><path d="M124,88h16v16h-16zM124,104h16v16h-16zM140,72h16v16h-16zM140,88h16v16h-16zM140,104h16v16h-16zM156,72h16v16h-16zM156,88h16v16h-16zM156,104h16v16h-16zM172,72h16v16h-16zM172,88h16v16h-16zM172,104h16v16h-16zM188,88h16v16h-16zM188,104h16v16h-16z" fill="var(--accent)" fill-opacity=".3"/><path d="M92,40V152M108,40V152M124,40V152M140,40V152M156,40V152M172,40V152M188,40V152M204,40V152M220,40V152M236,40V152M252,40V152M92,40H252M92,56H252M92,72H252M92,88H252M92,104H252M92,120H252M92,136H252M92,152H252" stroke="currentColor" stroke-opacity=".22" stroke-width="1"/><rect x="92" y="40" width="160" height="112" fill="none" stroke="currentColor" stroke-opacity=".5" stroke-width="2"/><ellipse cx="164" cy="98" rx="38" ry="30" fill="none" stroke="var(--neuron)" stroke-width="2.4"/><text x="172" y="26" text-anchor="middle" font-size="10.5" fill="var(--muted)">imaging plane, pixel grid</text><text x="60" y="96" text-anchor="middle" font-size="10.5" fill="var(--accent-ink)" font-weight="600">mask</text><path d="M62,104 V122 C62,130 74,132 96,124" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"/><text x="172" y="176" text-anchor="middle" font-size="10" fill="var(--muted)">one ROI = pixels of one cell</text></svg></div>
    <div class="acg-eb" style="color:#0369a1">SIGNAL</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-roi-mask" title="Link to this term">ROI mask</a></h3>
    <p class="acg-def">The pixel mask for one segmented cell in an imaging plane. In two-photon data an ROI is the set of pixels thought to belong to a single neuron.</p>
    </article>
    <article class="acg-card" id="term-root-id-pt-root-id" data-cat="segmentation" data-hay="root_id (pt_root_id) unique integer for a specific segmentation = a specific version of a cell (a.k.a. segment / object id). segmentation &amp; reconstruction ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="rootid"><title id="rootid">Root ID (pt_root_id)</title><circle cx="74" cy="100" r="16" fill="var(--neuron)" fill-opacity=".28" stroke="var(--neuron)" stroke-width="2.4"/><path d="M74,84 C66,64 58,56 48,44 M74,84 C84,66 94,60 106,50 M74,116 C74,140 82,148 92,158 M60,98 C44,94 34,94 24,88 M86,110 C100,116 108,120 116,128" fill="none" stroke="var(--neuron)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M126,96 H172" stroke="currentColor" stroke-opacity=".3" stroke-width="1.5" stroke-dasharray="2 4"/><text x="232" y="58" text-anchor="middle" font-size="11" class="mono" fill="var(--muted)">pt_root_id</text><text x="232" y="94" text-anchor="middle" font-size="18" class="mono" font-weight="600" fill="var(--accent-ink)">864691135…</text><text x="232" y="120" text-anchor="middle" font-size="10.5" fill="var(--muted)">changes with every edit</text></svg></div>
    <div class="acg-eb" style="color:#6d55e0">SEGMENT</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-root-id-pt-root-id" title="Link to this term">Root_id (pt_root_id)</a></h3>
    <p class="acg-def">Unique integer for a specific segmentation = a specific version of a cell (a.k.a. segment / object id).</p>
    </article>
    <article class="acg-card" id="term-running-speed" data-cat="signals" data-hay="running speed speed on the running disc, temporally aligned to the activity traces. same length as δf/f, so a stimulus epoch indexes into both. signals &amp; preprocessing ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="run-t"><title id="run-t">Running speed aligned sample-for-sample with the activity trace</title><rect x="140" y="26" width="52" height="130" fill="var(--accent)" fill-opacity=".12"/><text x="166" y="20" text-anchor="middle" font-size="9.5" fill="var(--accent-ink)" font-weight="600">stimulus epoch</text><path d="M40,74 H292" stroke="currentColor" stroke-opacity=".2" stroke-width="1.4"/><path d="M40,67L50,64L59,66L69,62L79,59L88,69L98,76L108,63L118,67L127,70L137,57L147,60L156,54L166,58L176,57L185,66L195,62L205,55L214,57L224,55L234,55L244,67L253,59L263,59L273,64L282,72L292,61" fill="none" stroke="currentColor" stroke-opacity=".75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><text x="40" y="40" font-size="10" fill="var(--muted)">running speed</text><text x="292" y="40" text-anchor="end" font-size="9" class="mono" fill="var(--faint)">cm/s</text><path d="M40,148 H292" stroke="currentColor" stroke-opacity=".2" stroke-width="1.4"/><path d="M40,137L50,135L59,128L69,132L79,134L88,133L98,140L108,138L118,135L127,130L137,140L147,142L156,147L166,136L176,133L185,142L195,131L205,125L214,127L224,129L234,138L244,146L253,141L263,147L273,147L282,147L292,150" fill="none" stroke="var(--neuron)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><text x="40" y="114" font-size="10" fill="var(--muted)">ΔF/F</text><path d="M40,166 H292" stroke="currentColor" stroke-opacity=".35" stroke-width="1.6"/><text x="166" y="184" text-anchor="middle" font-size="10" fill="var(--muted)">same time index in both</text></svg></div>
    <div class="acg-eb" style="color:#0369a1">SIGNAL</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-running-speed" title="Link to this term">Running speed</a></h3>
    <p class="acg-def">Speed on the running disc, temporally aligned to the activity traces. Same length as ΔF/F, so a stimulus epoch indexes into both.</p>
    </article>
    <article class="acg-card" id="term-saccade" data-cat="celltypes" data-hay="saccade a rapid ballistic eye movement between fixation points. mice are not foveal animals and their eye movements differ from those of foveal species. cell types &amp; cortical anatomy ">
    <div class="acg-eb" style="color:#c9357f">CELLTYPE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-saccade" title="Link to this term">Saccade</a></h3>
    <p class="acg-def">A rapid ballistic eye movement between fixation points. Mice are not foveal animals and their eye movements differ from those of foveal species.</p>
    </article>
    <article class="acg-card" id="term-scan" data-cat="functional" data-hay="scan the scan_idx from functional imaging; part of the roi's unique id. functional data &amp; coregistration ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="scan-t"><title id="scan-t">Scan</title><text x="72" y="30" text-anchor="middle" font-size="10" fill="var(--muted)">ROI identity</text><rect x="16" y="42" width="112" height="34" rx="8" fill="var(--accent)" fill-opacity=".16" stroke="var(--accent)" stroke-width="2.6"/><text x="72" y="63" text-anchor="middle" font-size="13" class="mono" fill="var(--accent-ink)" font-weight="600">scan_idx</text><rect x="16" y="88" width="112" height="34" rx="8" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".35" stroke-width="2"/><text x="72" y="109" text-anchor="middle" font-size="13" class="mono" fill="var(--muted)">session</text><rect x="16" y="134" width="112" height="34" rx="8" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".35" stroke-width="2"/><text x="72" y="155" text-anchor="middle" font-size="13" class="mono" fill="var(--muted)">unit_id</text><text x="72" y="86" text-anchor="middle" font-size="15" fill="currentColor" opacity=".5">+</text><text x="72" y="132" text-anchor="middle" font-size="15" fill="currentColor" opacity=".5">+</text><path d="M128,59 C152,59 152,105 172,105" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="2"/><path d="M128,105 H172" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="2"/><path d="M128,151 C152,151 152,105 172,105" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="2"/><circle cx="172" cy="105" r="3.5" fill="currentColor" fill-opacity=".55"/><line x1="176" y1="105" x2="212" y2="105" stroke="currentColor" stroke-opacity=".55" stroke-width="2" stroke-linecap="round"/><polygon points="218,105 210,101 210,109" fill="currentColor" fill-opacity=".55"/><circle cx="250" cy="105" r="30" fill="var(--neuron)" fill-opacity=".15" stroke="var(--neuron)" stroke-width="2.4"/><circle cx="250" cy="105" r="6" fill="var(--neuron)"/><text x="250" y="152" text-anchor="middle" font-size="10.5" fill="var(--muted)">unique ROI</text></svg></div>
    <div class="acg-eb" style="color:#9a5b12">FUNCTION</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-scan" title="Link to this term">Scan</a></h3>
    <p class="acg-def">The <code>scan_idx</code> from functional imaging; part of the ROI's unique id.</p>
    </article>
    <article class="acg-card" id="term-segmentation" data-cat="segmentation" data-hay="segmentation a 3d array where each voxel stores the root_id of the object at that location. segmentation &amp; reconstruction ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="segm"><title id="segm">Segmentation</title><rect x="22" y="54" width="118" height="100" fill="var(--scaffold)" fill-opacity=".1" stroke="currentColor" stroke-opacity=".55" stroke-width="2"/><path d="M28,68 H134 M28,82 H134 M28,96 H134 M28,118 H134 M28,132 H134 M28,146 H134" stroke="currentColor" stroke-opacity=".16" stroke-width="2" stroke-linecap="round"/><path d="M81,54 V154 M22,104 H140" stroke="currentColor" stroke-opacity=".4" stroke-width="2"/><text x="81" y="172" text-anchor="middle" font-size="11" fill="var(--muted)">EM tile</text><path d="M146,104 H171" stroke="currentColor" stroke-opacity=".6" stroke-width="2" stroke-linecap="round"/><path d="M167,98 l7,6 -7,6" fill="none" stroke="currentColor" stroke-opacity=".6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polygon points="180,54 239,54 239,104 180,104" fill="var(--neuron)" fill-opacity=".65"/><polygon points="239,54 298,54 298,104 239,104" fill="var(--dendrite)" fill-opacity=".65"/><polygon points="180,104 239,104 239,154 180,154" fill="var(--axon)" fill-opacity=".65"/><polygon points="239,104 298,104 298,154 239,154" fill="var(--synapse)" fill-opacity=".65"/><path d="M239,54 V154 M180,104 H298" stroke="var(--surface)" stroke-width="1.5"/><rect x="180" y="54" width="118" height="100" fill="none" stroke="currentColor" stroke-opacity=".55" stroke-width="2"/><text x="239" y="172" text-anchor="middle" font-size="11" fill="var(--muted)">by object id</text></svg></div>
    <div class="acg-eb" style="color:#6d55e0">SEGMENT</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-segmentation" title="Link to this term">Segmentation</a></h3>
    <p class="acg-def">A 3D array where each voxel stores the root_id of the object at that location.</p>
    </article>
    <article class="acg-card" id="term-segments-root-object-id" data-cat="segmentation" data-hay="segments (= root/object id) “segment id” used as a synonym for root id — collides with the skeleton sense of “segment”. segmentation &amp; reconstruction ">
    <div class="acg-eb" style="color:#6d55e0">SEGMENT</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-segments-root-object-id" title="Link to this term">Segments (= root/object id)</a></h3>
    <p class="acg-def">“Segment id” used as a synonym for root id — collides with the skeleton sense of “segment”.</p>
    <div class="acg-meta"><span class="acg-chip acg-warn" title="This word means different things in different places">&#9888; ambiguous</span></div>
    </article>
    <article class="acg-card" id="term-segments-skeleton" data-cat="morphology" data-hay="segments (skeleton) an unbranched run of vertices between branch/end points. morphology — meshes &amp; skeletons ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="m-seg"><title id="m-seg">One unbranched skeleton segment highlighted</title><path d="M55,160 L85,120 M85,120 L65,88 L48,58 M65,88 L80,56 M85,120 L118,96 L108,62 M118,96 L142,66" fill="none" stroke="currentColor" stroke-opacity=".5" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><line x1="85" y1="120" x2="118" y2="96" stroke="var(--accent)" stroke-width="4.5" stroke-linecap="round"/><circle cx="55" cy="160" r="10" fill="var(--neuron)" fill-opacity=".18" stroke="var(--neuron)" stroke-width="2"/><g fill="currentColor" fill-opacity=".75" stroke="var(--surface)" stroke-width="1.2"><circle cx="85" cy="120" r="4.5"/><circle cx="65" cy="88" r="4.5"/></g><circle cx="85" cy="120" r="5.5" fill="none" stroke="var(--accent-ink)" stroke-width="2"/><circle cx="118" cy="96" r="5.5" fill="none" stroke="var(--accent-ink)" stroke-width="2"/><line x1="102" y1="108" x2="150" y2="120" stroke="var(--accent-ink)" stroke-width="1.5"/><text x="154" y="116" font-size="11" fill="var(--accent-ink)" font-weight="600">segment</text><text x="154" y="132" font-size="9" fill="var(--muted)">unbranched path</text><text x="154" y="144" font-size="9" fill="var(--muted)">between nodes</text></svg></div>
    <div class="acg-eb" style="color:#2a8f57">MORPH</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-segments-skeleton" title="Link to this term">Segments (skeleton)</a></h3>
    <p class="acg-def">An unbranched run of vertices between branch/end points.</p>
    <div class="acg-meta"><span class="acg-chip acg-warn" title="This word means different things in different places">&#9888; ambiguous</span></div>
    </article>
    <article class="acg-card" id="term-serial-section-em" data-cat="imaging" data-hay="serial-section em many ultrathin sections are cut from a block, imaged one by one, then re-aligned into a volume. resolution is fine in x/y and coarse in z, so voxels are strongly anisotropic. imaging &amp; ultrastructure ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="sse-t"><title id="sse-t">Serial-section EM</title>
<polygon points="30,88 78,88 94,74 46,74" fill="var(--scaffold)" fill-opacity=".3" stroke="currentColor" stroke-opacity=".55" stroke-width="1.8" stroke-linejoin="round"/>
<polygon points="30,88 78,88 78,142 30,142" fill="var(--scaffold)" fill-opacity=".2" stroke="currentColor" stroke-opacity=".55" stroke-width="1.8" stroke-linejoin="round"/>
<polygon points="78,88 94,74 94,128 78,142" fill="var(--scaffold)" fill-opacity=".12" stroke="currentColor" stroke-opacity=".55" stroke-width="1.8" stroke-linejoin="round"/>
<rect x="60" y="46" width="52" height="9" rx="1.5" transform="rotate(-7 86 50)" fill="var(--scaffold)" fill-opacity=".28" stroke="currentColor" stroke-opacity=".5" stroke-width="1.6"/>
<rect x="66" y="34" width="52" height="9" rx="1.5" transform="rotate(4 92 38)" fill="var(--scaffold)" fill-opacity=".28" stroke="currentColor" stroke-opacity=".5" stroke-width="1.6"/>
<rect x="72" y="22" width="52" height="9" rx="1.5" transform="rotate(-3 98 26)" fill="var(--scaffold)" fill-opacity=".28" stroke="currentColor" stroke-opacity=".5" stroke-width="1.6"/>
<text x="62" y="160" text-anchor="middle" font-size="9.5" fill="var(--muted)">sections peel off</text>
<line x1="120" y1="100" x2="158" y2="100" stroke="currentColor" stroke-opacity=".7" stroke-width="2" stroke-linecap="round"/>
<path d="M158,100 l-8,-4 M158,100 l-8,4" fill="none" stroke="currentColor" stroke-opacity=".7" stroke-width="2" stroke-linecap="round"/>
<text x="139" y="92" text-anchor="middle" font-size="9.5" fill="var(--muted)">align</text>
<polygon points="172,126 236,126 250,117 186,117" fill="var(--scaffold)" fill-opacity=".28" stroke="currentColor" stroke-opacity=".5" stroke-width="1.6" stroke-linejoin="round"/>
<polygon points="172,126 236,126 236,136 172,136" fill="var(--scaffold)" fill-opacity=".16" stroke="currentColor" stroke-opacity=".5" stroke-width="1.6" stroke-linejoin="round"/>
<polygon points="172,113 236,113 250,104 186,104" fill="var(--scaffold)" fill-opacity=".28" stroke="currentColor" stroke-opacity=".5" stroke-width="1.6" stroke-linejoin="round"/>
<polygon points="172,113 236,113 236,123 172,123" fill="var(--scaffold)" fill-opacity=".16" stroke="currentColor" stroke-opacity=".5" stroke-width="1.6" stroke-linejoin="round"/>
<polygon points="172,100 236,100 250,91 186,91" fill="var(--scaffold)" fill-opacity=".28" stroke="currentColor" stroke-opacity=".5" stroke-width="1.6" stroke-linejoin="round"/>
<polygon points="172,100 236,100 236,110 172,110" fill="var(--scaffold)" fill-opacity=".16" stroke="currentColor" stroke-opacity=".5" stroke-width="1.6" stroke-linejoin="round"/>
<polygon points="172,87 236,87 250,78 186,78" fill="var(--scaffold)" fill-opacity=".28" stroke="currentColor" stroke-opacity=".5" stroke-width="1.6" stroke-linejoin="round"/>
<polygon points="172,87 236,87 236,97 172,97" fill="var(--scaffold)" fill-opacity=".16" stroke="currentColor" stroke-opacity=".5" stroke-width="1.6" stroke-linejoin="round"/>
<line x1="204" y1="70" x2="222" y2="70" stroke="var(--accent-ink)" stroke-width="2" stroke-linecap="round"/>
<path d="M222,70 l-6,-3 M222,70 l-6,3" fill="none" stroke="var(--accent-ink)" stroke-width="2" stroke-linecap="round"/>
<line x1="204" y1="70" x2="192" y2="62" stroke="var(--accent-ink)" stroke-width="2" stroke-linecap="round"/>
<path d="M192,62 l1,6 M192,62 l6,1" fill="none" stroke="var(--accent-ink)" stroke-width="2" stroke-linecap="round"/>
<text x="200" y="52" text-anchor="middle" font-size="9.5" fill="var(--accent-ink)">fine x/y</text>
<line x1="262" y1="80" x2="262" y2="134" stroke="var(--accent-ink)" stroke-width="2" stroke-linecap="round"/>
<path d="M262,80 l-4,7 M262,80 l4,7 M262,134 l-4,-7 M262,134 l4,-7" fill="none" stroke="var(--accent-ink)" stroke-width="2" stroke-linecap="round"/>
<text transform="translate(280,107) rotate(-90)" text-anchor="middle" font-size="9.5" fill="var(--accent-ink)">coarse z</text>
<text x="205" y="160" text-anchor="middle" font-size="9.5" fill="var(--muted)">re-aligned stack</text>
</svg></div>
    <div class="acg-eb" style="color:#8a6f4a">IMAGING</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-serial-section-em" title="Link to this term">Serial-section EM</a></h3>
    <p class="acg-def">Many ultrathin sections are cut from a block, imaged one by one, then re-aligned into a volume. Resolution is fine in x/y and coarse in z, so voxels are strongly anisotropic.</p>
    </article>
    <article class="acg-card" id="term-session" data-cat="dataorg" data-hay="session the databook defines it as “a physiological and/or behavioral recording that happens at one time”, but four narrower senses are in use as identifiers. datasets, sessions &amp; files ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="sess-t"><title id="sess-t">Session</title><text x="72" y="30" text-anchor="middle" font-size="10" fill="var(--muted)">ROI identity</text><rect x="16" y="42" width="112" height="34" rx="8" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".35" stroke-width="2"/><text x="72" y="63" text-anchor="middle" font-size="13" class="mono" fill="var(--muted)">scan_idx</text><rect x="16" y="88" width="112" height="34" rx="8" fill="var(--accent)" fill-opacity=".16" stroke="var(--accent)" stroke-width="2.6"/><text x="72" y="109" text-anchor="middle" font-size="13" class="mono" fill="var(--accent-ink)" font-weight="600">session</text><rect x="16" y="134" width="112" height="34" rx="8" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".35" stroke-width="2"/><text x="72" y="155" text-anchor="middle" font-size="13" class="mono" fill="var(--muted)">unit_id</text><text x="72" y="86" text-anchor="middle" font-size="15" fill="currentColor" opacity=".5">+</text><text x="72" y="132" text-anchor="middle" font-size="15" fill="currentColor" opacity=".5">+</text><path d="M128,59 C152,59 152,105 172,105" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="2"/><path d="M128,105 H172" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="2"/><path d="M128,151 C152,151 152,105 172,105" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="2"/><circle cx="172" cy="105" r="3.5" fill="currentColor" fill-opacity=".55"/><line x1="176" y1="105" x2="212" y2="105" stroke="currentColor" stroke-opacity=".55" stroke-width="2" stroke-linecap="round"/><polygon points="218,105 210,101 210,109" fill="currentColor" fill-opacity=".55"/><circle cx="250" cy="105" r="30" fill="var(--neuron)" fill-opacity=".15" stroke="var(--neuron)" stroke-width="2.4"/><circle cx="250" cy="105" r="6" fill="var(--neuron)"/><text x="250" y="152" text-anchor="middle" font-size="10.5" fill="var(--muted)">unique ROI</text></svg></div>
    <div class="acg-eb" style="color:#3f3f46">DATA</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-session" title="Link to this term">Session</a></h3>
    <p class="acg-def">The databook defines it as “a physiological and/or behavioral recording that happens at one time”, but four narrower senses are in use as identifiers.</p>
    <div class="acg-meta"><span class="acg-chip acg-warn" title="This word means different things in different places">&#9888; ambiguous</span></div>
    </article>
    <article class="acg-card" id="term-share-link-middleauth" data-cat="tools" data-hay="share link / middleauth authenticated state-sharing mechanism. visualisation tools ">
    <div class="acg-eb" style="color:#526278">TOOLS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-share-link-middleauth" title="Link to this term">Share link / middleauth</a></h3>
    <p class="acg-def">Authenticated state-sharing mechanism.</p>
    </article>
    <article class="acg-card" id="term-signal-noise-correlation" data-cat="responses" data-hay="signal vs noise correlation signal correlation compares two cells' mean responses across stimulus conditions — do they like the same things. noise correlation compares their trial-to-trial fluctuations to the same condition — do they vary together. response properties &amp; analysis ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="snc-t"><title id="snc-t">Signal correlation across conditions versus noise correlation within a condition</title><text x="86" y="34" text-anchor="middle" font-size="11" fill="var(--muted)" font-weight="600">signal</text><path d="M34,44 V118 H140" fill="none" stroke="currentColor" stroke-opacity=".3" stroke-width="1.4"/><path d="M40,112 C58,110 64,58 84,56 C104,54 118,104 136,110" fill="none" stroke="currentColor" stroke-opacity=".85" stroke-width="2.2" stroke-linecap="round"/><path d="M40,116 C60,114 68,74 88,72 C108,70 120,110 136,114" fill="none" stroke="currentColor" stroke-opacity=".35" stroke-width="2.2" stroke-linecap="round"/><text x="88" y="134" text-anchor="middle" font-size="9" fill="var(--faint)">stimulus condition</text><text x="88" y="156" text-anchor="middle" font-size="9.5" fill="var(--muted)">same preferences?</text><text x="242" y="34" text-anchor="middle" font-size="11" fill="var(--muted)" font-weight="600">noise</text><path d="M190,44 V118 H296" fill="none" stroke="currentColor" stroke-opacity=".3" stroke-width="1.4"/><path d="M198,112 L288,54" stroke="var(--accent)" stroke-width="2" stroke-dasharray="5 4" stroke-linecap="round"/><circle cx="206" cy="104" r="2.8" fill="currentColor" fill-opacity=".6"/><circle cx="218" cy="102" r="2.8" fill="currentColor" fill-opacity=".6"/><circle cx="224" cy="90" r="2.8" fill="currentColor" fill-opacity=".6"/><circle cx="236" cy="92" r="2.8" fill="currentColor" fill-opacity=".6"/><circle cx="242" cy="80" r="2.8" fill="currentColor" fill-opacity=".6"/><circle cx="252" cy="84" r="2.8" fill="currentColor" fill-opacity=".6"/><circle cx="258" cy="70" r="2.8" fill="currentColor" fill-opacity=".6"/><circle cx="270" cy="72" r="2.8" fill="currentColor" fill-opacity=".6"/><circle cx="280" cy="60" r="2.8" fill="currentColor" fill-opacity=".6"/><text x="242" y="134" text-anchor="middle" font-size="9" fill="var(--faint)">cell A, trial by trial</text><text x="242" y="156" text-anchor="middle" font-size="9.5" fill="var(--muted)">fluctuate together?</text><text x="160" y="184" text-anchor="middle" font-size="9" fill="var(--faint)">two cells, two questions</text></svg></div>
    <div class="acg-eb" style="color:#9f1239">RESPONSE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-signal-noise-correlation" title="Link to this term">Signal vs noise correlation</a></h3>
    <p class="acg-def">Signal correlation compares two cells' mean responses across stimulus conditions — do they like the same things. Noise correlation compares their trial-to-trial fluctuations to the same condition — do they vary together.</p>
    </article>
    <article class="acg-card" id="term-single-vs-multi-unit" data-cat="signals" data-hay="single unit vs multi-unit not two categories but a gradient, from complete and uncontaminated to incomplete and highly contaminated. every analysis still has to draw a binary line somewhere; quality metrics are how you draw it deliberately. signals &amp; preprocessing ">
    <div class="acg-eb" style="color:#0369a1">SIGNAL</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-single-vs-multi-unit" title="Link to this term">Single unit vs multi-unit</a></h3>
    <p class="acg-def">Not two categories but a gradient, from complete and uncontaminated to incomplete and highly contaminated. Every analysis still has to draw a binary line somewhere; quality metrics are how you draw it deliberately.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="physiology/ephys/visual-coding/vcnp-quality-metrics.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-skeletons" data-cat="morphology" data-hay="skeletons tree-like linear representation of a neuron's branching (vertices + edges, radius, compartments). morphology — meshes &amp; skeletons ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="m-skel"><title id="m-skel">Cartoon neuron reduced to a skeleton</title><path d="M72,93 C68,72 60,60 52,50 M62,100 C44,92 34,86 24,80 M84,98 C100,86 108,78 118,66 M66,122 C54,138 46,146 38,158 M80,122 C92,140 96,150 100,162" fill="none" stroke="var(--neuron)" stroke-width="4.5" stroke-linecap="round"/><circle cx="72" cy="108" r="15" fill="var(--neuron)" fill-opacity=".3" stroke="var(--neuron)" stroke-width="2.2"/><path d="M150,105 L176,105 M170,100 L176,105 L170,110" fill="none" stroke="currentColor" stroke-opacity=".7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><text x="163" y="98" text-anchor="middle" font-size="9" class="mono" fill="var(--faint)">skeletonize</text><path d="M232,102 C228,82 220,70 212,60 M224,104 C206,96 196,90 186,84 M244,102 C260,90 268,82 278,70 M228,120 C216,136 208,144 200,156 M240,120 C252,138 256,148 260,160" fill="none" stroke="currentColor" stroke-opacity=".7" stroke-width="2" stroke-linecap="round"/><circle cx="232" cy="108" r="6" fill="var(--neuron)" stroke="var(--surface)" stroke-width="1.5"/><text x="72" y="184" text-anchor="middle" font-size="10.5" fill="var(--muted)">neuron</text><text x="235" y="184" text-anchor="middle" font-size="10.5" fill="var(--muted)">skeleton</text></svg></div>
    <div class="acg-eb" style="color:#2a8f57">MORPH</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-skeletons" title="Link to this term">Skeletons</a></h3>
    <p class="acg-def">Tree-like linear representation of a neuron's branching (vertices + edges, radius, compartments).</p>
    </article>
    <article class="acg-card" id="term-snr-unit" data-cat="quality" data-hay="snr waveform amplitude relative to background noise on the peak channel. quality metrics ">
    <div class="acg-eb" style="color:#4338ca">QUALITY</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-snr-unit" title="Link to this term">snr</a></h3>
    <p class="acg-def">Waveform amplitude relative to background noise on the peak channel.</p>
    <div class="acg-meta"><span class="acg-chip acg-warn" title="This word means different things in different places">&#9888; ambiguous</span></div>
    </article>
    <article class="acg-card" id="term-somatostatin-sst-cell" data-cat="celltypes" data-hay="somatostatin (sst) cell an inhibitory interneuron expressing somatostatin (sst, sometimes som). sst cells tend to target the distal dendrites of excitatory neurons, and have important roles in regulating their activity. cell types &amp; cortical anatomy ">
    <div class="acg-eb" style="color:#c9357f">CELLTYPE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-somatostatin-sst-cell" title="Link to this term">Somatostatin (SST) cell</a></h3>
    <p class="acg-def">An inhibitory interneuron expressing somatostatin (SST, sometimes SOM). SST cells tend to target the distal dendrites of excitatory neurons, and have important roles in regulating their activity.</p>
    </article>
    <article class="acg-card" id="term-source" data-cat="tables" data-hay="source disambiguation: image_source/segmentation_source, the neuroglancer layer source, and skeleton path_between(source,…). annotation tables, ids &amp; queries ">
    <div class="acg-eb" style="color:#9333ea">TABLES</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-source" title="Link to this term">Source</a></h3>
    <p class="acg-def">Disambiguation: <code>image_source</code>/<code>segmentation_source</code>, the Neuroglancer layer source, and skeleton <code>path_between(source,…)</code>.</p>
    <div class="acg-meta"><span class="acg-chip acg-warn" title="This word means different things in different places">&#9888; ambiguous</span></div>
    </article>
    <article class="acg-card" id="term-source-presynaptic" data-cat="connectivity" data-hay="source (presynaptic) the presynaptic partner of a synapse (pre_pt_root_id). connectivity &amp; synapses ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="src-t"><title id="src-t">Source (presynaptic)</title><text x="252" y="34" text-anchor="middle" font-size="9.5" fill="var(--faint)">target</text><path d="M258,44 C252,92 252,116 258,160" fill="none" stroke="var(--dendrite)" stroke-width="2.6" stroke-linecap="round" stroke-opacity=".5"/><circle cx="56" cy="98" r="22" fill="var(--neuron)" fill-opacity=".18" stroke="var(--neuron)" stroke-width="2.6"/><path d="M78,98 C120,98 168,98 204,98" fill="none" stroke="var(--axon)" stroke-width="2.6" stroke-linecap="round"/><path d="M214,98 l-11,-5 M214,98 l-11,5" fill="none" stroke="var(--axon)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="240" cy="98" r="6.5" fill="var(--synapse)"/><text x="56" y="150" text-anchor="middle" font-size="13" class="mono" fill="var(--axon)" font-weight="600">pre</text><text x="56" y="166" text-anchor="middle" font-size="9.5" fill="var(--muted)">presynaptic source</text></svg></div>
    <div class="acg-eb" style="color:#d1462c">CONNECT</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-source-presynaptic" title="Link to this term">Source (presynaptic)</a></h3>
    <p class="acg-def">The presynaptic partner of a synapse (<code>pre_pt_root_id</code>).</p>
    </article>
    <article class="acg-card" id="term-spatial-frequency" data-cat="responses" data-hay="spatial frequency how often the sinusoidal components of a signal repeat per unit distance — for a grating, the spacing of its bars. typically cycles per degree. response properties &amp; analysis ">
    <div class="acg-eb" style="color:#9f1239">RESPONSE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-spatial-frequency" title="Link to this term">Spatial frequency</a></h3>
    <p class="acg-def">How often the sinusoidal components of a signal repeat per unit distance — for a grating, the spacing of its bars. Typically cycles per degree.</p>
    </article>
    <article class="acg-card" id="term-spike-band-lfp-band" data-cat="modalities" data-hay="spike band / lfp band the two streams split off each channel: the spike band at 30 khz with a 500 hz high-pass, carrying action potentials from adjacent neurons; the lfp band at 2.5 khz, carrying low-frequency fluctuations from a wider area. recording modalities &amp; instruments ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="sblb-t"><title id="sblb-t">Spike band and LFP band split from the same channel</title><rect x="20" y="30" width="18" height="136" rx="5" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".5" stroke-width="1.8"/><path d="M24,48 h10 M24,66 h10 M24,110 h10 M24,128 h10 M24,146 h10" stroke="currentColor" stroke-opacity=".4" stroke-width="4" stroke-linecap="round"/><path d="M24,88 h10" stroke="var(--accent)" stroke-width="5" stroke-linecap="round"/><path d="M42,88 H60 M60,88 V54 H82 M60,88 V132 H82" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M88,54 H118 L122,36 L126,66 L130,54 H164 L168,38 L172,64 L176,54 H216 L220,36 L224,66 L228,54 H306" fill="none" stroke="currentColor" stroke-opacity=".8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><text x="88" y="82" font-size="11" fill="var(--accent-ink)" font-weight="600">spike band</text><text x="88" y="96" font-size="9.5" class="mono" fill="var(--faint)">30 kHz · high-pass 500 Hz</text><path d="M88,132 C104,110 120,110 136,132 C152,154 168,154 184,132 C200,110 216,110 232,132 C248,154 264,154 280,132 C288,121 298,118 306,120" fill="none" stroke="currentColor" stroke-opacity=".8" stroke-width="2.2" stroke-linecap="round"/><text x="88" y="176" font-size="11" fill="var(--muted)">LFP band</text><text x="88" y="190" font-size="9.5" class="mono" fill="var(--faint)">2.5 kHz · low frequency</text></svg></div>
    <div class="acg-eb" style="color:#c2410c">MODALITY</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-spike-band-lfp-band" title="Link to this term">Spike band / LFP band</a></h3>
    <p class="acg-def">The two streams split off each channel: the spike band at 30 kHz with a 500 Hz high-pass, carrying action potentials from adjacent neurons; the LFP band at 2.5 kHz, carrying low-frequency fluctuations from a wider area.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="background/neuropixels-description.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-raster" data-cat="responses" data-hay="spike raster one row per trial, one tick per spike, aligned on an event. the plot to make before any model, because it shows trial-to-trial structure that an average hides. response properties &amp; analysis ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="rst-t"><title id="rst-t">Spike raster: one row per trial, one tick per spike</title><path d="M150,30 V166" stroke="var(--accent)" stroke-width="2.4"/><text x="150" y="24" text-anchor="middle" font-size="10" fill="var(--accent-ink)" font-weight="600">event</text><path d="M96,42v7M113,42v7M125,42v7M162,42v7M170,42v7M170,42v7M172,42v7M179,42v7M220,42v7M227,42v7M238,42v7M242,42v7M74,55v7M75,55v7M101,55v7M157,55v7M160,55v7M183,55v7M211,55v7M212,55v7M215,55v7M221,55v7M227,55v7M259,55v7M86,68v7M88,68v7M132,68v7M163,68v7M180,68v7M186,68v7M191,68v7M191,68v7M195,68v7M205,68v7M227,68v7M233,68v7M234,68v7M55,81v7M93,81v7M99,81v7M152,81v7M160,81v7M177,81v7M183,81v7M185,81v7M185,81v7M186,81v7M213,81v7M237,81v7M279,81v7M281,81v7M43,94v7M52,94v7M81,94v7M164,94v7M172,94v7M173,94v7M182,94v7M183,94v7M184,94v7M216,94v7M225,94v7M241,94v7M272,94v7M85,107v7M90,107v7M144,107v7M153,107v7M158,107v7M164,107v7M171,107v7M171,107v7M182,107v7M186,107v7M197,107v7M228,107v7M252,107v7M262,107v7M47,120v7M114,120v7M135,120v7M153,120v7M178,120v7M191,120v7M196,120v7M215,120v7M217,120v7M234,120v7M260,120v7M285,120v7M47,133v7M95,133v7M124,133v7M156,133v7M172,133v7M184,133v7M186,133v7M207,133v7M219,133v7M258,133v7M269,133v7M275,133v7M73,146v7M120,146v7M121,146v7M155,146v7M167,146v7M191,146v7M196,146v7M208,146v7M211,146v7M216,146v7M228,146v7M260,146v7M278,146v7" stroke="currentColor" stroke-opacity=".75" stroke-width="1.8" stroke-linecap="round"/><path d="M34,30 V166 M34,166 H292" fill="none" stroke="currentColor" stroke-opacity=".35" stroke-width="1.6"/><text x="26" y="100" text-anchor="middle" font-size="9.5" fill="var(--muted)" transform="rotate(-90 26 100)">trial</text><text x="292" y="182" text-anchor="end" font-size="9.5" fill="var(--faint)">time</text><text x="34" y="182" font-size="9.5" fill="var(--faint)">aligned on each trial</text></svg></div>
    <div class="acg-eb" style="color:#9f1239">RESPONSE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-raster" title="Link to this term">Spike raster</a></h3>
    <p class="acg-def">One row per trial, one tick per spike, aligned on an event. The plot to make before any model, because it shows trial-to-trial structure that an average hides.</p>
    </article>
    <article class="acg-card" id="term-spike-sorting" data-cat="signals" data-hay="spike sorting assigning detected spikes to individual neurons — a blind source separation problem. detection, extraction, feature extraction, clustering, then validation against the refractory period. signals &amp; preprocessing ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="ssort-t"><title id="ssort-t">Spike sorting: waveforms to clusters to refractory check</title> <g fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"> <path d="M14,72 L28,72 L33,52 L40,98 L48,70 L64,72" stroke="currentColor" stroke-opacity=".5"/> <path d="M14,84 L28,84 L34,64 L42,106 L50,82 L64,84" stroke="var(--accent)" stroke-opacity=".6"/></g> <g stroke="currentColor" stroke-opacity=".5" stroke-width="1.8" stroke-linecap="round" fill="none"> <path d="M74,80 H96 M188,80 H210"/><path d="M90,75 L96,80 L90,85 M204,75 L210,80 L204,85"/></g> <path d="M112,112 V46 M112,112 H178" stroke="currentColor" stroke-opacity=".3" stroke-width="1.6" stroke-linecap="round"/> <path d="M128,94 h0 M135,100 h0 M123,101 h0 M140,96 h0" stroke="currentColor" stroke-opacity=".5" stroke-width="5.2" stroke-linecap="round"/> <path d="M160,62 h0 M166,70 h0 M154,69 h0 M163,57 h0" stroke="var(--accent)" stroke-width="5.2" stroke-linecap="round"/> <path d="M226,112 H308" stroke="currentColor" stroke-opacity=".3" stroke-width="1.6" stroke-linecap="round"/> <path d="M250,112 v-38 h9 v-12 h9 v8 h9 v16 h9 v26 Z" fill="currentColor" fill-opacity=".45"/> <rect x="228" y="100" width="20" height="12" rx="2" fill="var(--accent)" fill-opacity=".2" stroke="var(--accent)" stroke-width="1.6"/> <g text-anchor="middle" font-size="10" fill="var(--muted)"> <text x="39" y="130">waveforms</text><text x="145" y="130">features</text><text x="268" y="130">ISI check</text></g> <text x="238" y="52" text-anchor="middle" font-size="9" fill="var(--accent-ink)">refractory gap</text> <text x="160" y="168" text-anchor="middle" font-size="9.5" fill="var(--faint)">one cluster per neuron</text> </svg></div>
    <div class="acg-eb" style="color:#0369a1">SIGNAL</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-spike-sorting" title="Link to this term">Spike sorting</a></h3>
    <p class="acg-def">Assigning detected spikes to individual neurons — a blind source separation problem. Detection, extraction, feature extraction, clustering, then validation against the refractory period.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="background/Neuropixels-electrophysiology.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-split-errors" data-cat="proofreading" data-hay="split errors a process incorrectly appears to stop; they remove true connections. proofreading &amp; data quality ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="ps"><title id="ps">Split errors — false split</title>
<circle cx="44" cy="104" r="10" fill="var(--neuron)" fill-opacity=".2" stroke="var(--neuron)" stroke-width="2.4"/>
<g fill="none" stroke="var(--neuron)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
<path d="M54,102 C90,98 118,96 146,94"/>
<path d="M44,95 C40,82 38,72 36,58"/>
<path d="M44,113 C42,130 40,142 38,156"/>
<path d="M46,100 C60,90 68,86 78,80"/>
<path d="M176,94 C196,92 210,90 226,84"/>
<path d="M226,84 C236,80 242,78 250,72"/>
<path d="M210,90 C216,98 220,104 226,112"/>
<path d="M196,92 C200,100 202,106 204,114"/>
</g>
<path d="M146,94 L176,94" fill="none" stroke="var(--accent)" stroke-width="2" stroke-dasharray="3 5" stroke-opacity=".8"/>
<path d="M146,86 L146,102" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round"/>
<path d="M176,86 L176,102" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round"/>
<path d="M156,89 L149,94 L156,99" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M166,89 L173,94 L166,99" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<text x="160" y="182" text-anchor="middle" font-size="9.5" fill="var(--accent)">false split — removes a connection</text>
</svg></div>
    <div class="acg-eb" style="color:#b8791a">PROOF</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-split-errors" title="Link to this term">Split errors</a></h3>
    <p class="acg-def">A process incorrectly appears to stop; they remove true connections.</p>
    </article>
    <article class="acg-card" id="term-spontaneous-activity" data-cat="stimuli" data-hay="spontaneous activity an epoch of mean-luminance grey with no patterned stimulus, included in most sessions as a baseline for visually evoked activity. stimuli &amp; behavioural tasks ">
    <div class="acg-eb" style="color:#a16207">STIMULUS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-spontaneous-activity" title="Link to this term">Spontaneous activity</a></h3>
    <p class="acg-def">An epoch of mean-luminance grey with no patterned stimulus, included in most sessions as a baseline for visually evoked activity.</p>
    </article>
    <article class="acg-card" id="term-standard-transform" data-cat="volume" data-hay="standard_transform package converting voxel/nm coordinates to pia-flattened micron coordinates (minnie_ds, v1dd_ds). volume, voxels &amp; coordinates ">
    <div class="acg-eb" style="color:#2f6fd0">VOLUME</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-standard-transform" title="Link to this term">standard_transform</a></h3>
    <p class="acg-def">Package converting voxel/nm coordinates to pia-flattened micron coordinates (<code>minnie_ds</code>, <code>v1dd_ds</code>).</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="https://github.com/ceesem/standard_transform" target="_blank" rel="noopener">standard_transform &#8599;</a></div>
    </article>
    <article class="acg-card" id="term-state" data-cat="dataorg" data-hay="state four unrelated meanings, two of which appear in the same workshop. datasets, sessions &amp; files ">
    <div class="acg-eb" style="color:#3f3f46">DATA</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-state" title="Link to this term">State</a></h3>
    <p class="acg-def">Four unrelated meanings, two of which appear in the same workshop.</p>
    <div class="acg-meta"><span class="acg-chip acg-warn" title="This word means different things in different places">&#9888; ambiguous</span></div>
    </article>
    <article class="acg-card" id="term-static-gratings" data-cat="stimuli" data-hay="static gratings a stationary full-field sinusoidal grating flashed for 0.25 s. no temporal frequency; phase becomes a parameter instead. stimuli &amp; behavioural tasks ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="sgr-t"><title id="sgr-t">Static gratings: phase replaces temporal frequency</title><rect x="42" y="40" width="12" height="96" fill="currentColor" fill-opacity="0.06"/><rect x="54" y="40" width="12" height="96" fill="currentColor" fill-opacity="0.22"/><rect x="66" y="40" width="12" height="96" fill="currentColor" fill-opacity="0.44"/><rect x="78" y="40" width="12" height="96" fill="currentColor" fill-opacity="0.62"/><rect x="90" y="40" width="12" height="96" fill="currentColor" fill-opacity="0.44"/><rect x="102" y="40" width="12" height="96" fill="currentColor" fill-opacity="0.22"/><rect x="114" y="40" width="12" height="96" fill="currentColor" fill-opacity="0.06"/><rect x="42" y="40" width="96" height="96" rx="3" fill="none" stroke="currentColor" stroke-opacity=".4" stroke-width="1.6"/><rect x="182" y="40" width="12" height="96" fill="currentColor" fill-opacity="0.44"/><rect x="194" y="40" width="12" height="96" fill="currentColor" fill-opacity="0.22"/><rect x="206" y="40" width="12" height="96" fill="currentColor" fill-opacity="0.06"/><rect x="230" y="40" width="12" height="96" fill="currentColor" fill-opacity="0.06"/><rect x="242" y="40" width="12" height="96" fill="currentColor" fill-opacity="0.22"/><rect x="254" y="40" width="12" height="96" fill="currentColor" fill-opacity="0.44"/><rect x="266" y="40" width="12" height="96" fill="currentColor" fill-opacity="0.62"/><rect x="182" y="40" width="96" height="96" rx="3" fill="none" stroke="currentColor" stroke-opacity=".4" stroke-width="1.6"/><text x="90" y="156" text-anchor="middle" font-size="10.5" fill="var(--muted)">phase 0</text><text x="230" y="156" text-anchor="middle" font-size="10.5" fill="var(--accent-ink)" font-weight="600">phase shifted</text><text x="160" y="178" text-anchor="middle" font-size="9.5" class="mono" fill="var(--faint)">flashed 0.25 s</text><text x="160" y="194" text-anchor="middle" font-size="9.5" fill="var(--muted)">no temporal frequency</text></svg></div>
    <div class="acg-eb" style="color:#a16207">STIMULUS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-static-gratings" title="Link to this term">Static gratings</a></h3>
    <p class="acg-def">A stationary full-field sinusoidal grating flashed for 0.25 s. No temporal frequency; phase becomes a parameter instead.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="physiology/stimuli/passive-visual-stimuli/visual-stimuli-list.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-status-flags" data-cat="proofreading" data-hay="status flags booleans status_axon/status_dendrite recording whether each arbor was proofread, plus valid_id (root id at assessment). proofreading &amp; data quality ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="psf"><title id="psf">Status flags — per-compartment badges</title>
<circle cx="44" cy="100" r="10" fill="var(--neuron)" fill-opacity=".2" stroke="var(--neuron)" stroke-width="2.4"/>
<g fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
<path d="M44,91 C40,78 38,68 34,54" stroke="var(--dendrite)"/>
<path d="M38,66 C32,62 28,60 22,56" stroke="var(--dendrite)"/>
<path d="M52,106 C66,120 76,130 88,142" stroke="var(--axon)"/>
</g>
<text x="44" y="164" text-anchor="middle" font-size="10" class="mono" fill="var(--muted)">cell</text>
<text x="128" y="82" font-size="12" class="mono" fill="var(--muted)">status_axon</text>
<rect x="250" y="64" width="46" height="28" rx="8" fill="var(--ok)" fill-opacity=".16" stroke="var(--ok)" stroke-width="2.2"/>
<path d="M262,79 l5,6 l11,-13" fill="none" stroke="var(--ok)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
<text x="128" y="126" font-size="12" class="mono" fill="var(--muted)">status_dendrite</text>
<rect x="250" y="108" width="46" height="28" rx="8" fill="var(--error)" fill-opacity=".14" stroke="var(--error)" stroke-width="2.2"/>
<path d="M263,114 l20,16 M283,114 l-20,16" stroke="var(--error)" stroke-width="2.4" stroke-linecap="round"/>
</svg></div>
    <div class="acg-eb" style="color:#b8791a">PROOF</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-status-flags" title="Link to this term">Status flags</a></h3>
    <p class="acg-def">Booleans <code>status_axon</code>/<code>status_dendrite</code> recording whether each arbor was proofread, plus <code>valid_id</code> (root id at assessment).</p>
    </article>
    <article class="acg-card" id="term-stimulus-epoch-table" data-cat="dataorg" data-hay="stimulus epoch table when each interleaved stimulus block began and ended. in visual coding 2p the bounds are given as imaging frames, so they index directly into the δf/f and running-speed traces. datasets, sessions &amp; files ">
    <div class="acg-eb" style="color:#3f3f46">DATA</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-stimulus-epoch-table" title="Link to this term">Stimulus epoch table</a></h3>
    <p class="acg-def">When each interleaved stimulus block began and ended. In Visual Coding 2P the bounds are given as imaging frames, so they index directly into the ΔF/F and running-speed traces.</p>
    </article>
    <article class="acg-card" id="term-stimulus-presentations" data-cat="dataorg" data-hay="stimulus presentations table one row per stimulus shown, with its parameters and its start_time and stop_time. the table every alignment starts from. in nwb it lives under stimulus/presentation, or as a timeintervals table under intervals — which one depends on the dataset. datasets, sessions &amp; files ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="spt-t"><title id="spt-t">Stimulus presentations table: one row per stimulus shown</title><rect x="24" y="42" width="272" height="120" rx="6" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".45" stroke-width="1.8"/><path d="M24,66H296" stroke="currentColor" stroke-opacity=".4" stroke-width="1.6"/><rect x="24" y="115" width="272" height="22" rx="4" fill="var(--accent)" fill-opacity=".14"/><g text-anchor="middle" class="mono" font-size="9.5" fill="var(--muted)"><text x="58" y="58">start_time</text><text x="128" y="58">stop_time</text><text x="194" y="58">image</text><text x="256" y="58">is_change</text><text x="58" y="82">31.5</text><text x="128" y="82">31.8</text><text x="194" y="82">im065</text><text x="256" y="82">False</text><text x="58" y="106">32.3</text><text x="128" y="106">32.6</text><text x="194" y="106">im065</text><text x="256" y="106">False</text><text x="58" y="154">33.8</text><text x="128" y="154">34.1</text><text x="194" y="154">im012</text><text x="256" y="154">False</text></g><g text-anchor="middle" class="mono" font-size="9.5" fill="var(--accent-ink)" font-weight="600"><text x="58" y="130">33.0</text><text x="128" y="130">33.3</text><text x="194" y="130">im012</text><text x="256" y="130">True</text></g><text x="160" y="30" text-anchor="middle" font-size="10.5" fill="var(--muted)">one row per presentation</text><text x="160" y="184" text-anchor="middle" font-size="10" fill="var(--accent-ink)" font-weight="600">every alignment starts here</text></svg></div>
    <div class="acg-eb" style="color:#3f3f46">DATA</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-stimulus-presentations" title="Link to this term">Stimulus presentations table</a></h3>
    <p class="acg-def">One row per stimulus shown, with its parameters and its <code>start_time</code> and <code>stop_time</code>. The table every alignment starts from. In NWB it lives under <code>stimulus/presentation</code>, or as a TimeIntervals table under <code>intervals</code> — which one depends on the dataset.</p>
    </article>
    <article class="acg-card" id="term-stimulus-template" data-cat="stimuli" data-hay="stimulus template the literal image shown, stored alongside the stimulus table for image and movie stimuli. often available both unwarped and warped — the warped version is what the monitor rendered. stimuli &amp; behavioural tasks ">
    <div class="acg-eb" style="color:#a16207">STIMULUS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-stimulus-template" title="Link to this term">Stimulus template</a></h3>
    <p class="acg-def">The literal image shown, stored alongside the stimulus table for image and movie stimuli. Often available both <code>unwarped</code> and <code>warped</code> — the warped version is what the monitor rendered.</p>
    </article>
    <article class="acg-card" id="term-strategy-values" data-cat="proofreading" data-hay="strategy values dendrite_clean, dendrite_extended, axon_partially_extended, axon_fully_extended, axon_interareal (microns only), none. proofreading &amp; data quality ">
    <div class="acg-eb" style="color:#b8791a">PROOF</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-strategy-values" title="Link to this term">Strategy values</a></h3>
    <p class="acg-def"><code>dendrite_clean</code>, <code>dendrite_extended</code>, <code>axon_partially_extended</code>, <code>axon_fully_extended</code>, <code>axon_interareal</code> (MICrONS only), <code>none</code>.</p>
    </article>
    <article class="acg-card" id="term-structure-acronym" data-cat="dataorg" data-hay="structure acronym the ccf region label attached to a channel or unit — visp, mos, lsr. a unit with no ccf registration gets coordinates of [-1, -1, -1]. datasets, sessions &amp; files ">
    <div class="acg-eb" style="color:#3f3f46">DATA</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-structure-acronym" title="Link to this term">Structure acronym</a></h3>
    <p class="acg-def">The CCF region label attached to a channel or unit — <code>VISp</code>, <code>MOs</code>, <code>LSr</code>. A unit with no CCF registration gets coordinates of <code>[-1, -1, -1]</code>.</p>
    </article>
    <article class="acg-card" id="term-supervoxel-pt-supervoxel-id" data-cat="segmentation" data-hay="supervoxel (pt_supervoxel_id) l1 grouping of voxels within a chunk; the stable internal id an annotation binds to. segmentation &amp; reconstruction ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="svox"><title id="svox">Supervoxel</title><rect x="40" y="46" width="224" height="112" fill="var(--scaffold)" fill-opacity=".08"/><g stroke="currentColor" stroke-opacity=".3" stroke-width="1.5"><path d="M68,46 V158 M96,46 V158 M124,46 V158 M152,46 V158 M180,46 V158 M208,46 V158 M236,46 V158"/><path d="M40,74 H264 M40,102 H264 M40,130 H264"/></g><rect x="40" y="46" width="224" height="112" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="2"/><rect x="45" y="51" width="46" height="46" rx="6" fill="var(--neuron)" fill-opacity=".28" stroke="var(--neuron)" stroke-width="2.4"/><polygon points="129,51 175,51 175,97 157,97 157,79 129,79" fill="var(--axon)" fill-opacity=".25" stroke="var(--axon)" stroke-width="2.4" stroke-linejoin="round"/><rect x="213" y="107" width="46" height="46" rx="6" fill="var(--dendrite)" fill-opacity=".28" stroke="var(--dendrite)" stroke-width="2.4"/><text x="68" y="78" text-anchor="middle" font-size="10" class="mono" fill="var(--surface)">sv1</text><text x="147" y="64" text-anchor="middle" font-size="10" class="mono" fill="var(--surface)">sv2</text><text x="236" y="134" text-anchor="middle" font-size="10" class="mono" fill="var(--surface)">sv3</text><text x="40" y="38" font-size="10" class="mono" fill="var(--muted)">voxel grid</text><text x="152" y="180" text-anchor="middle" font-size="10.5" fill="var(--muted)">voxels merged into supervoxels</text></svg></div>
    <div class="acg-eb" style="color:#6d55e0">SEGMENT</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-supervoxel-pt-supervoxel-id" title="Link to this term">Supervoxel (pt_supervoxel_id)</a></h3>
    <p class="acg-def">L1 grouping of voxels within a chunk; the stable internal id an annotation binds to.</p>
    </article>
    <article class="acg-card" id="term-surround-suppression" data-cat="responses" data-hay="surround suppression a stimulus extending beyond a cell's classical receptive field suppresses its response. stronger in superficial layers, and one of the questions v1dd's windowed and full-field gratings were designed to address. response properties &amp; analysis ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="sur-t"><title id="sur-t">Surround suppression by a large grating</title> <circle cx="62" cy="70" r="34" fill="none" stroke="currentColor" stroke-opacity=".35" stroke-width="1.6" stroke-dasharray="4 4"/> <clipPath id="sur-c1"><circle cx="62" cy="70" r="30"/></clipPath> <g clip-path="url(#sur-c1)" stroke="currentColor" stroke-opacity=".45" stroke-width="6"><path d="M36,40 v70 M50,40 v70 M64,40 v70 M78,40 v70"/></g> <clipPath id="sur-c2"><rect x="152" y="22" width="96" height="96" rx="6"/></clipPath> <g clip-path="url(#sur-c2)" stroke="currentColor" stroke-opacity=".45" stroke-width="6"><path d="M158,20 v104 M172,20 v104 M186,20 v104 M200,20 v104 M214,20 v104 M228,20 v104 M242,20 v104"/></g> <circle cx="200" cy="70" r="34" fill="none" stroke="currentColor" stroke-opacity=".35" stroke-width="1.6" stroke-dasharray="4 4"/> <text x="62" y="134" text-anchor="middle" font-size="10" fill="var(--muted)">within RF</text> <text x="200" y="134" text-anchor="middle" font-size="10" fill="var(--muted)">beyond RF</text> <path d="M282,152 V54" stroke="currentColor" stroke-opacity=".3" stroke-width="1.4"/> <rect x="272" y="60" width="9" height="92" rx="2" fill="var(--accent)" fill-opacity=".55"/> <rect x="286" y="118" width="9" height="34" rx="2" fill="var(--accent)" fill-opacity=".55"/> <text x="284" y="170" text-anchor="middle" font-size="9.5" fill="var(--muted)">response</text> <text x="284" y="46" text-anchor="middle" font-size="9" fill="var(--accent-ink)">suppressed</text> <text x="131" y="176" text-anchor="middle" font-size="9" fill="var(--faint)">stronger in superficial layers</text> </svg></div>
    <div class="acg-eb" style="color:#9f1239">RESPONSE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-surround-suppression" title="Link to this term">Surround suppression</a></h3>
    <p class="acg-def">A stimulus extending beyond a cell's classical receptive field suppresses its response. Stronger in superficial layers, and one of the questions V1DD's windowed and full-field gratings were designed to address.</p>
    </article>
    <article class="acg-card" id="term-swc-format" data-cat="morphology" data-hay="swc format standard skeleton file format (one of three: swc, meshwork-h5, precomputed). morphology — meshes &amp; skeletons ">
    <div class="acg-eb" style="color:#2a8f57">MORPH</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-swc-format" title="Link to this term">SWC format</a></h3>
    <p class="acg-def">Standard skeleton file format (one of three: SWC, meshwork-h5, precomputed).</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="https://swc-specification.readthedocs.io/en/latest/" target="_blank" rel="noopener">SWC specification &#8599;</a></div>
    </article>
    <article class="acg-card" id="term-synapse-size" data-cat="connectivity" data-hay="synapse size synapse size in voxels; correlates with surface area / strength. connectivity &amp; synapses ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="ss-t"><title id="ss-t">Synapse size — small vs large cleft</title><path d="M50,58 C70,54 92,54 112,58" fill="none" stroke="var(--axon)" stroke-width="2.4" stroke-linecap="round"/><path d="M50,104 C70,108 92,108 112,104" fill="none" stroke="var(--dendrite)" stroke-width="2.4" stroke-linecap="round"/><ellipse cx="81" cy="82" rx="9" ry="6" fill="var(--synapse)"/><rect x="65" y="118" width="10" height="10" rx="1.5" fill="var(--scaffold)" fill-opacity=".22" stroke="currentColor" stroke-opacity=".55" stroke-width="1.4"/><rect x="77" y="118" width="10" height="10" rx="1.5" fill="var(--scaffold)" fill-opacity=".22" stroke="currentColor" stroke-opacity=".55" stroke-width="1.4"/><rect x="89" y="118" width="10" height="10" rx="1.5" fill="var(--scaffold)" fill-opacity=".22" stroke="currentColor" stroke-opacity=".55" stroke-width="1.4"/><text x="81" y="147" text-anchor="middle" font-size="10" fill="var(--muted)">small</text><text x="81" y="162" text-anchor="middle" font-size="10" class="mono" fill="var(--accent-ink)">3 vox</text><path d="M160,54 C192,48 250,48 282,54" fill="none" stroke="var(--axon)" stroke-width="2.4" stroke-linecap="round"/><path d="M160,108 C192,114 250,114 282,108" fill="none" stroke="var(--dendrite)" stroke-width="2.4" stroke-linecap="round"/><ellipse cx="221" cy="82" rx="30" ry="9" fill="var(--synapse)"/><rect x="180" y="120" width="10" height="10" rx="1.5" fill="var(--scaffold)" fill-opacity=".22" stroke="currentColor" stroke-opacity=".55" stroke-width="1.4"/><rect x="192" y="120" width="10" height="10" rx="1.5" fill="var(--scaffold)" fill-opacity=".22" stroke="currentColor" stroke-opacity=".55" stroke-width="1.4"/><rect x="204" y="120" width="10" height="10" rx="1.5" fill="var(--scaffold)" fill-opacity=".22" stroke="currentColor" stroke-opacity=".55" stroke-width="1.4"/><rect x="216" y="120" width="10" height="10" rx="1.5" fill="var(--scaffold)" fill-opacity=".22" stroke="currentColor" stroke-opacity=".55" stroke-width="1.4"/><rect x="228" y="120" width="10" height="10" rx="1.5" fill="var(--scaffold)" fill-opacity=".22" stroke="currentColor" stroke-opacity=".55" stroke-width="1.4"/><rect x="240" y="120" width="10" height="10" rx="1.5" fill="var(--scaffold)" fill-opacity=".22" stroke="currentColor" stroke-opacity=".55" stroke-width="1.4"/><rect x="252" y="120" width="10" height="10" rx="1.5" fill="var(--scaffold)" fill-opacity=".22" stroke="currentColor" stroke-opacity=".55" stroke-width="1.4"/><text x="221" y="149" text-anchor="middle" font-size="10" fill="var(--muted)">large</text><text x="221" y="164" text-anchor="middle" font-size="10" class="mono" fill="var(--accent-ink)">7 vox</text></svg></div>
    <div class="acg-eb" style="color:#d1462c">CONNECT</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-synapse-size" title="Link to this term">Synapse size</a></h3>
    <p class="acg-def">Synapse size in voxels; correlates with surface area / strength.</p>
    </article>
    <article class="acg-card" id="term-synapse-target-predictions-ssa" data-cat="connectivity" data-hay="synapse_target_predictions_ssa per-synapse postsynaptic-compartment prediction (soma / spine / shaft). connectivity &amp; synapses ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="stp-t"><title id="stp-t">synapse_target_predictions_ssa — soma, spine, shaft</title><text x="20" y="90" font-size="9.5" class="mono" fill="var(--axon)">axon</text><path d="M20,100 C58,98 96,100 126,100" fill="none" stroke="var(--axon)" stroke-width="2.6" stroke-linecap="round"/><path d="M126,100 C158,84 178,58 198,50" fill="none" stroke="var(--axon)" stroke-width="2.4" stroke-linecap="round"/><path d="M126,100 C156,100 176,100 196,100" fill="none" stroke="var(--axon)" stroke-width="2.4" stroke-linecap="round"/><path d="M126,100 C158,116 180,144 198,150" fill="none" stroke="var(--axon)" stroke-width="2.4" stroke-linecap="round"/><circle cx="224" cy="48" r="15" fill="var(--neuron)" fill-opacity=".18" stroke="var(--neuron)" stroke-width="2.4"/><circle cx="206" cy="49" r="6" fill="var(--synapse)"/><text x="244" y="52" font-size="10.5" fill="var(--muted)">soma</text><path d="M250,82 L250,118" fill="none" stroke="var(--dendrite)" stroke-width="2.6" stroke-linecap="round"/><path d="M250,100 L224,100" fill="none" stroke="var(--dendrite)" stroke-width="2.2" stroke-linecap="round"/><circle cx="220" cy="100" r="5" fill="var(--dendrite)"/><circle cx="204" cy="100" r="6" fill="var(--synapse)"/><text x="260" y="104" font-size="10.5" fill="var(--muted)">spine</text><path d="M250,138 L250,174" fill="none" stroke="var(--dendrite)" stroke-width="3.4" stroke-linecap="round"/><circle cx="238" cy="152" r="6" fill="var(--synapse)"/><text x="260" y="156" font-size="10.5" fill="var(--muted)">shaft</text></svg></div>
    <div class="acg-eb" style="color:#d1462c">CONNECT</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-synapse-target-predictions-ssa" title="Link to this term">synapse_target_predictions_ssa</a></h3>
    <p class="acg-def">Per-synapse postsynaptic-compartment prediction (soma / spine / shaft).</p>
    </article>
    <article class="acg-card" id="term-synapses-pni-2-synapses-v1dd" data-cat="connectivity" data-hay="synapses_pni_2 / synapses_v1dd the sole synapse tables (337m / 639m rows). connectivity &amp; synapses ">
    <div class="acg-eb" style="color:#d1462c">CONNECT</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-synapses-pni-2-synapses-v1dd" title="Link to this term">synapses_pni_2 / synapses_v1dd</a></h3>
    <p class="acg-def">The sole synapse tables (337M / 639M rows).</p>
    </article>
    <article class="acg-card" id="term-table-viewer" data-cat="tools" data-hay="table viewer dash app to query/filter one table and select rows in neuroglancer. visualisation tools ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="tv-t"><title id="tv-t">Table Viewer</title><rect x="16" y="16" width="288" height="168" rx="9" fill="var(--surface-2)" fill-opacity=".5" stroke="currentColor" stroke-opacity=".4" stroke-width="2"/><text x="30" y="37" font-size="9" class="mono" fill="var(--muted)">filters</text><rect x="72" y="28" width="60" height="18" rx="9" fill="none" stroke="currentColor" stroke-opacity=".5" stroke-width="1.8"/><text x="102" y="41" text-anchor="middle" font-size="9" class="mono" fill="var(--muted)">type</text><rect x="140" y="28" width="60" height="18" rx="9" fill="none" stroke="currentColor" stroke-opacity=".5" stroke-width="1.8"/><text x="170" y="41" text-anchor="middle" font-size="9" class="mono" fill="var(--muted)">layer</text><rect x="30" y="66" width="260" height="70" rx="4" fill="none" stroke="currentColor" stroke-opacity=".35" stroke-width="1.6"/><rect x="30" y="66" width="260" height="17" rx="4" fill="var(--accent)" fill-opacity=".16" stroke="none"/><line x1="30" y1="83" x2="290" y2="83" stroke="currentColor" stroke-opacity=".3" stroke-width="1.4"/><line x1="30" y1="100" x2="290" y2="100" stroke="currentColor" stroke-opacity=".2" stroke-width="1.2"/><line x1="30" y1="118" x2="290" y2="118" stroke="currentColor" stroke-opacity=".2" stroke-width="1.2"/><line x1="118" y1="66" x2="118" y2="136" stroke="currentColor" stroke-opacity=".2" stroke-width="1.2"/><line x1="204" y1="66" x2="204" y2="136" stroke="currentColor" stroke-opacity=".2" stroke-width="1.2"/><line x1="42" y1="75" x2="96" y2="75" stroke="var(--accent-ink)" stroke-opacity=".7" stroke-width="2"/><line x1="130" y1="75" x2="184" y2="75" stroke="var(--accent-ink)" stroke-opacity=".7" stroke-width="2"/><line x1="216" y1="75" x2="270" y2="75" stroke="var(--accent-ink)" stroke-opacity=".7" stroke-width="2"/><line x1="42" y1="92" x2="94" y2="92" stroke="currentColor" stroke-opacity=".3" stroke-width="2"/><line x1="130" y1="92" x2="176" y2="92" stroke="currentColor" stroke-opacity=".3" stroke-width="2"/><line x1="216" y1="92" x2="256" y2="92" stroke="currentColor" stroke-opacity=".3" stroke-width="2"/><line x1="42" y1="109" x2="90" y2="109" stroke="currentColor" stroke-opacity=".3" stroke-width="2"/><line x1="130" y1="109" x2="180" y2="109" stroke="currentColor" stroke-opacity=".3" stroke-width="2"/><line x1="216" y1="109" x2="262" y2="109" stroke="currentColor" stroke-opacity=".3" stroke-width="2"/><line x1="42" y1="127" x2="96" y2="127" stroke="currentColor" stroke-opacity=".3" stroke-width="2"/><line x1="130" y1="127" x2="172" y2="127" stroke="currentColor" stroke-opacity=".3" stroke-width="2"/><line x1="216" y1="127" x2="258" y2="127" stroke="currentColor" stroke-opacity=".3" stroke-width="2"/><rect x="166" y="152" width="126" height="24" rx="12" fill="var(--accent)" fill-opacity=".18" stroke="var(--accent)" stroke-width="2"/><text x="229" y="168" text-anchor="middle" font-size="9.5" class="mono" fill="var(--accent-ink)">view in Neuroglancer</text></svg></div>
    <div class="acg-eb" style="color:#526278">TOOLS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-table-viewer" title="Link to this term">Table Viewer</a></h3>
    <p class="acg-def">Dash app to query/filter one table and select rows in Neuroglancer.</p>
    </article>
    <article class="acg-card" id="term-tables" data-cat="tables" data-hay="tables cave annotation tables (synapses, nuclei, cell types, proofreading, coregistration). annotation tables, ids &amp; queries ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="tbls-t">
<title id="tbls-t">Tables</title>
<g transform="translate(160,190) rotate(-24)">
<rect x="-54" y="-152" width="108" height="94" rx="7" fill="var(--surface-2)" stroke="var(--border-strong)" stroke-width="1.6"/>
<circle cx="-40" cy="-138" r="5" fill="var(--synapse)"/>
<text x="-30" y="-134" font-size="10" fill="var(--synapse)" font-weight="600">synapses</text>
<line x1="-42" y1="-118" x2="42" y2="-118" stroke="currentColor" stroke-opacity=".3" stroke-width="1.4"/>
<line x1="-42" y1="-102" x2="42" y2="-102" stroke="currentColor" stroke-opacity=".3" stroke-width="1.4"/>
<line x1="-42" y1="-86" x2="18" y2="-86" stroke="currentColor" stroke-opacity=".3" stroke-width="1.4"/>
</g>
<g transform="translate(160,190) rotate(-12)">
<rect x="-54" y="-152" width="108" height="94" rx="7" fill="var(--surface-2)" stroke="var(--border-strong)" stroke-width="1.6"/>
<circle cx="-40" cy="-138" r="5" fill="var(--neuron)"/>
<text x="-30" y="-134" font-size="10" fill="var(--neuron)" font-weight="600">nuclei</text>
<line x1="-42" y1="-118" x2="42" y2="-118" stroke="currentColor" stroke-opacity=".3" stroke-width="1.4"/>
<line x1="-42" y1="-102" x2="42" y2="-102" stroke="currentColor" stroke-opacity=".3" stroke-width="1.4"/>
<line x1="-42" y1="-86" x2="18" y2="-86" stroke="currentColor" stroke-opacity=".3" stroke-width="1.4"/>
</g>
<g transform="translate(160,190) rotate(0)">
<rect x="-54" y="-152" width="108" height="94" rx="7" fill="var(--surface-2)" stroke="var(--border-strong)" stroke-width="1.6"/>
<circle cx="-40" cy="-138" r="5" fill="var(--accent)"/>
<text x="-30" y="-134" font-size="10" fill="var(--accent-ink)" font-weight="600">cell types</text>
<line x1="-42" y1="-118" x2="42" y2="-118" stroke="currentColor" stroke-opacity=".3" stroke-width="1.4"/>
<line x1="-42" y1="-102" x2="42" y2="-102" stroke="currentColor" stroke-opacity=".3" stroke-width="1.4"/>
<line x1="-42" y1="-86" x2="18" y2="-86" stroke="currentColor" stroke-opacity=".3" stroke-width="1.4"/>
</g>
<g transform="translate(160,190) rotate(12)">
<rect x="-54" y="-152" width="108" height="94" rx="7" fill="var(--surface-2)" stroke="var(--border-strong)" stroke-width="1.6"/>
<circle cx="-40" cy="-138" r="5" fill="var(--ok)"/>
<text x="-30" y="-134" font-size="10" fill="var(--ok)" font-weight="600">proofread</text>
<line x1="-42" y1="-118" x2="42" y2="-118" stroke="currentColor" stroke-opacity=".3" stroke-width="1.4"/>
<line x1="-42" y1="-102" x2="42" y2="-102" stroke="currentColor" stroke-opacity=".3" stroke-width="1.4"/>
<line x1="-42" y1="-86" x2="18" y2="-86" stroke="currentColor" stroke-opacity=".3" stroke-width="1.4"/>
</g>
<g transform="translate(160,190) rotate(24)">
<rect x="-54" y="-152" width="108" height="94" rx="7" fill="var(--surface-2)" stroke="var(--border-strong)" stroke-width="1.6"/>
<circle cx="-40" cy="-138" r="5" fill="var(--scaffold)"/>
<text x="-30" y="-134" font-size="10" fill="var(--muted)" font-weight="600">coreg</text>
<line x1="-42" y1="-118" x2="42" y2="-118" stroke="currentColor" stroke-opacity=".3" stroke-width="1.4"/>
<line x1="-42" y1="-102" x2="42" y2="-102" stroke="currentColor" stroke-opacity=".3" stroke-width="1.4"/>
<line x1="-42" y1="-86" x2="18" y2="-86" stroke="currentColor" stroke-opacity=".3" stroke-width="1.4"/>
</g>
</svg></div>
    <div class="acg-eb" style="color:#9333ea">TABLES</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-tables" title="Link to this term">Tables</a></h3>
    <p class="acg-def">CAVE annotation tables (synapses, nuclei, cell types, proofreading, coregistration).</p>
    </article>
    <article class="acg-card" id="term-tags-shortcuts" data-cat="tools" data-hay="tags / shortcuts keyboard-driven annotation labels for fast bulk labeling in neuroglancer. visualisation tools ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="ts-t"><title id="ts-t">Tags and shortcuts</title><text x="49" y="30" text-anchor="middle" font-size="9" class="mono" fill="var(--faint)">key</text><text x="205" y="30" text-anchor="middle" font-size="9" class="mono" fill="var(--faint)">tag</text><rect x="34" y="44" width="30" height="30" rx="6" fill="var(--surface)" stroke="currentColor" stroke-opacity=".7" stroke-width="2.2"/><text x="49" y="64" text-anchor="middle" font-size="14" class="mono" fill="currentColor">s</text><rect x="34" y="98" width="30" height="30" rx="6" fill="var(--surface)" stroke="currentColor" stroke-opacity=".7" stroke-width="2.2"/><text x="49" y="118" text-anchor="middle" font-size="14" class="mono" fill="currentColor">a</text><rect x="34" y="152" width="30" height="30" rx="6" fill="var(--surface)" stroke="currentColor" stroke-opacity=".7" stroke-width="2.2"/><text x="49" y="172" text-anchor="middle" font-size="14" class="mono" fill="currentColor">d</text><line x1="70" y1="59" x2="140" y2="59" stroke="currentColor" stroke-opacity=".5" stroke-width="2" stroke-linecap="round"/><polygon points="140,54 150,59 140,64" fill="currentColor" fill-opacity=".5"/><line x1="70" y1="113" x2="140" y2="113" stroke="currentColor" stroke-opacity=".5" stroke-width="2" stroke-linecap="round"/><polygon points="140,108 150,113 140,118" fill="currentColor" fill-opacity=".5"/><line x1="70" y1="167" x2="140" y2="167" stroke="currentColor" stroke-opacity=".5" stroke-width="2" stroke-linecap="round"/><polygon points="140,162 150,167 140,172" fill="currentColor" fill-opacity=".5"/><rect x="156" y="46" width="128" height="26" rx="13" fill="var(--synapse)" fill-opacity=".18" stroke="var(--synapse)" stroke-width="2"/><circle cx="172" cy="59" r="4.5" fill="var(--synapse)"/><text x="186" y="63" font-size="12" class="mono" fill="var(--synapse)">synapse</text><rect x="156" y="100" width="128" height="26" rx="13" fill="var(--axon)" fill-opacity=".18" stroke="var(--axon)" stroke-width="2"/><circle cx="172" cy="113" r="4.5" fill="var(--axon)"/><text x="186" y="117" font-size="12" class="mono" fill="var(--axon)">axon</text><rect x="156" y="154" width="128" height="26" rx="13" fill="var(--dendrite)" fill-opacity=".18" stroke="var(--dendrite)" stroke-width="2"/><circle cx="172" cy="167" r="4.5" fill="var(--dendrite)"/><text x="186" y="171" font-size="12" class="mono" fill="var(--dendrite)">dendrite</text></svg></div>
    <div class="acg-eb" style="color:#526278">TOOLS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-tags-shortcuts" title="Link to this term">Tags / Shortcuts</a></h3>
    <p class="acg-def">Keyboard-driven annotation labels for fast bulk labeling in Neuroglancer.</p>
    </article>
    <article class="acg-card" id="term-target" data-cat="tables" data-hay="target disambiguation: target_id (reference link) vs synaptic postsynaptic partner vs path target_index. annotation tables, ids &amp; queries ">
    <div class="acg-eb" style="color:#9333ea">TABLES</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-target" title="Link to this term">Target</a></h3>
    <p class="acg-def">Disambiguation: <code>target_id</code> (reference link) vs synaptic postsynaptic partner vs path <code>target_index</code>.</p>
    <div class="acg-meta"><span class="acg-chip acg-warn" title="This word means different things in different places">&#9888; ambiguous</span></div>
    </article>
    <article class="acg-card" id="term-target-postsynaptic" data-cat="connectivity" data-hay="target (postsynaptic) the postsynaptic partner of a synapse (post_pt_root_id). connectivity &amp; synapses ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="tgt-t"><title id="tgt-t">Target (postsynaptic)</title><text x="66" y="82" text-anchor="middle" font-size="9.5" fill="var(--faint)">pre</text><path d="M32,96 C82,96 128,96 168,96" fill="none" stroke="var(--axon)" stroke-width="2.6" stroke-linecap="round" stroke-opacity=".5"/><path d="M176,96 l-11,-5 M176,96 l-11,5" fill="none" stroke="var(--axon)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" stroke-opacity=".5"/><circle cx="190" cy="96" r="6.5" fill="var(--synapse)"/><path d="M228,96 C214,96 206,96 200,96" fill="none" stroke="var(--dendrite)" stroke-width="2.6" stroke-linecap="round"/><path d="M250,76 C246,60 250,50 262,42" fill="none" stroke="var(--dendrite)" stroke-width="2.2" stroke-linecap="round"/><circle cx="250" cy="96" r="22" fill="var(--neuron)" fill-opacity=".2" stroke="var(--neuron)" stroke-width="2.8"/><text x="250" y="150" text-anchor="middle" font-size="13" class="mono" fill="var(--neuron)" font-weight="600">post</text><text x="250" y="166" text-anchor="middle" font-size="9.5" fill="var(--muted)">postsynaptic target</text></svg></div>
    <div class="acg-eb" style="color:#d1462c">CONNECT</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-target-postsynaptic" title="Link to this term">Target (postsynaptic)</a></h3>
    <p class="acg-def">The postsynaptic partner of a synapse (<code>post_pt_root_id</code>).</p>
    </article>
    <article class="acg-card" id="term-teasar" data-cat="morphology" data-hay="teasar algorithm that turns the l2 graph into a skeleton tree. morphology — meshes &amp; skeletons ">
    <div class="acg-eb" style="color:#2a8f57">MORPH</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-teasar" title="Link to this term">TEASAR</a></h3>
    <p class="acg-def">Algorithm that turns the L2 graph into a skeleton tree.</p>
    </article>
    <article class="acg-card" id="term-tem" data-cat="imaging" data-hay="tem transmission em; microns/v1dd are serial-section tem-style (thin sections, anisotropic z). imaging &amp; ultrastructure ">
    <div class="acg-eb" style="color:#8a6f4a">IMAGING</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-tem" title="Link to this term">TEM</a></h3>
    <p class="acg-def">Transmission EM; MICrONS/V1DD are serial-section TEM-style (thin sections, anisotropic z).</p>
    <div class="acg-meta"><span class="acg-chip acg-aside" title="An adjacent method, not used to acquire these datasets">adjacent method</span></div>
    </article>
    <article class="acg-card" id="term-temporal-frequency" data-cat="responses" data-hay="temporal frequency how many complete periods the signal goes through per unit time. typically hz. response properties &amp; analysis ">
    <div class="acg-eb" style="color:#9f1239">RESPONSE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-temporal-frequency" title="Link to this term">Temporal frequency</a></h3>
    <p class="acg-def">How many complete periods the signal goes through per unit time. Typically Hz.</p>
    </article>
    <article class="acg-card" id="term-three-photon-imaging" data-cat="modalities" data-hay="three-photon (3p) imaging raises signal-to-noise for deep imaging of densely labelled tissue. used to extend the v1dd centre column to white matter, where 2p image quality has degraded. recording modalities &amp; instruments ">
    <div class="acg-eb" style="color:#c2410c">MODALITY</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-three-photon-imaging" title="Link to this term">Three-photon (3P) imaging</a></h3>
    <p class="acg-def">Raises signal-to-noise for deep imaging of densely labelled tissue. Used to extend the V1DD centre column to white matter, where 2P image quality has degraded.</p>
    </article>
    <article class="acg-card" id="term-token-auth" data-cat="cave" data-hay="token / auth google-account credential required before any programmatic access, saved per server. cave — access &amp; versioning ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="cave-tk"><title id="cave-tk">Token and authentication</title>
<circle cx="42" cy="100" r="15" fill="none" stroke="var(--accent-ink)" stroke-width="2.6"/>
<circle cx="42" cy="100" r="5" fill="var(--surface)" stroke="var(--accent-ink)" stroke-width="2"/>
<line x1="57" y1="100" x2="112" y2="100" stroke="var(--accent-ink)" stroke-width="2.6" stroke-linecap="round"/>
<line x1="98" y1="100" x2="98" y2="111" stroke="var(--accent-ink)" stroke-width="2.6" stroke-linecap="round"/>
<line x1="108" y1="100" x2="108" y2="108" stroke="var(--accent-ink)" stroke-width="2.6" stroke-linecap="round"/>
<text x="42" y="134" text-anchor="middle" font-size="10" class="mono" fill="var(--muted)">key</text>
<line x1="114" y1="100" x2="214" y2="100" stroke="currentColor" stroke-opacity=".45" stroke-width="2" stroke-dasharray="4 5" stroke-linecap="round"/>
<text x="158" y="90" text-anchor="middle" font-size="10" class="mono" fill="var(--muted)">token</text>
<rect x="176" y="94" width="20" height="18" rx="3" fill="var(--scaffold)" fill-opacity=".4" stroke="currentColor" stroke-opacity=".7" stroke-width="2"/>
<path d="M181,94 v-4 a5,5 0 0 1 10,0 v4" fill="none" stroke="currentColor" stroke-opacity=".7" stroke-width="2" stroke-linecap="round"/>
<rect x="214" y="60" width="76" height="80" rx="8" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".65" stroke-width="2"/>
<line x1="214" y1="87" x2="290" y2="87" stroke="currentColor" stroke-opacity=".3" stroke-width="1.5"/>
<line x1="214" y1="114" x2="290" y2="114" stroke="currentColor" stroke-opacity=".3" stroke-width="1.5"/>
<circle cx="224" cy="74" r="3" fill="currentColor" fill-opacity=".35"/>
<circle cx="224" cy="100" r="3" fill="currentColor" fill-opacity=".35"/>
<circle cx="224" cy="127" r="3" fill="currentColor" fill-opacity=".35"/>
<text x="252" y="156" text-anchor="middle" font-size="10" class="mono" fill="var(--muted)">server</text>
<circle cx="286" cy="62" r="10" fill="var(--ok)" stroke="var(--surface)" stroke-width="1.5"/>
<path d="M281,62 l4,4 l7,-8" fill="none" stroke="var(--surface)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg></div>
    <div class="acg-eb" style="color:#0f766e">CAVE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-token-auth" title="Link to this term">Token / auth</a></h3>
    <p class="acg-def">Google-account credential required before any programmatic access, saved per server.</p>
    </article>
    <article class="acg-card" id="term-transgenic-line" data-cat="genetics" data-hay="transgenic line a mouse line whose genome has been altered by introducing foreign dna. here, typically a cre line driving expression of a reporter line within a specific subset of cells. genetic &amp; optical tools ">
    <div class="acg-eb" style="color:#15803d">GENETIC</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-transgenic-line" title="Link to this term">Transgenic line</a></h3>
    <p class="acg-def">A mouse line whose genome has been altered by introducing foreign DNA. Here, typically a Cre line driving expression of a reporter line within a specific subset of cells.</p>
    </article>
    <article class="acg-card" id="term-trials-table" data-cat="dataorg" data-hay="trials table one row per trial: timing landmarks and outcome flags. usually nwb.intervals['trials'], but not always — the bci dataset keeps its trials under stimulus/presentation, because there the lickport is driven by the neuron. and a “trial” is not always behavioural: in the cell-type look-up table it is a laser pulse train. datasets, sessions &amp; files ">
    <div class="acg-eb" style="color:#3f3f46">DATA</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-trials-table" title="Link to this term">Trials table</a></h3>
    <p class="acg-def">One row per trial: timing landmarks and outcome flags. Usually <code>nwb.intervals['trials']</code>, but not always — the BCI dataset keeps its trials under <code>stimulus/presentation</code>, because there the lickport is driven by the neuron. And a “trial” is not always behavioural: in the cell-type look-up table it is a laser pulse train.</p>
    </article>
    <article class="acg-card" id="term-tuning-curve" data-cat="responses" data-hay="tuning curve mean response plotted against a stimulus parameter. the shape of the curve is what selectivity indices such as osi and dsi summarise in one number. response properties &amp; analysis ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="tune-t"><title id="tune-t">Tuning curve: mean response against a stimulus parameter</title><path d="M48,36 V150 H302" fill="none" stroke="currentColor" stroke-opacity=".4" stroke-width="1.6" stroke-linecap="round"/><path d="M52,140 C82,138 102,136 118,120 C134,102 140,60 156,60 C172,60 182,104 198,124 C220,148 252,142 298,140" fill="none" stroke="currentColor" stroke-opacity=".8" stroke-width="2.4" stroke-linecap="round"/><path d="M156,60 V150" stroke="var(--accent)" stroke-width="2" stroke-dasharray="4 3"/><g fill="currentColor" fill-opacity=".75"><circle cx="66" cy="139" r="3"/><circle cx="110" cy="128" r="3"/><circle cx="134" cy="86" r="3"/><circle cx="180" cy="94" r="3"/><circle cx="222" cy="143" r="3"/><circle cx="266" cy="141" r="3"/></g><g stroke="currentColor" stroke-opacity=".45" stroke-width="1.6" stroke-linecap="round"><path d="M66,132 V146 M110,120 V136 M134,76 V96 M180,84 V104 M222,136 V150 M266,134 V148"/></g><text x="156" y="50" text-anchor="middle" font-size="10.5" fill="var(--accent-ink)" font-weight="600">preferred</text><text x="52" y="166" font-size="9.5" class="mono" fill="var(--faint)">0</text><text x="298" y="166" text-anchor="end" font-size="9.5" class="mono" fill="var(--faint)">360</text><text x="176" y="182" text-anchor="middle" font-size="10.5" fill="var(--muted)">direction (°)</text><text x="44" y="30" font-size="10" fill="var(--muted)">mean response</text></svg></div>
    <div class="acg-eb" style="color:#9f1239">RESPONSE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-tuning-curve" title="Link to this term">Tuning curve</a></h3>
    <p class="acg-def">Mean response plotted against a stimulus parameter. The shape of the curve is what selectivity indices such as OSI and DSI summarise in one number.</p>
    </article>
    <article class="acg-card" id="term-two-photon-calcium-imaging" data-cat="modalities" data-hay="two-photon calcium imaging measuring neural activity through a fluorescent calcium indicator such as gcamp. at rest a neuron has low calcium; when it spikes, calcium flows in, binds the indicator and raises the emitted fluorescence. recording modalities &amp; instruments ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="tpci-t"><title id="tpci-t">Two-photon calcium imaging: a spike raises indicator fluorescence</title><path d="M22,104 H84" stroke="currentColor" stroke-opacity=".3" stroke-width="1.6" stroke-linecap="round"/><path d="M46,104 L53,58 L60,104" fill="none" stroke="currentColor" stroke-opacity=".8" stroke-width="2.2" stroke-linejoin="round"/><circle cx="152" cy="88" r="26" fill="var(--neuron)" fill-opacity=".2" stroke="var(--neuron)" stroke-width="2.4"/><g fill="none" stroke="currentColor" stroke-opacity=".6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M104,58 L124,72"/><path d="M117,70 L124,72 L122,65"/><path d="M104,118 L124,104"/><path d="M122,111 L124,104 L117,106"/></g><text x="96" y="94" text-anchor="middle" font-size="10" fill="var(--muted)">Ca²⁺</text><path d="M184,88 H206" stroke="currentColor" stroke-opacity=".55" stroke-width="2" stroke-linecap="round"/><path d="M200,84 L206,88 L200,92" fill="none" stroke="currentColor" stroke-opacity=".55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M216,120 H306" stroke="currentColor" stroke-opacity=".3" stroke-width="1.6" stroke-linecap="round"/><path d="M216,116 L240,116 C246,116 248,60 256,60 C266,60 270,100 284,110 C292,115 298,116 306,116" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><text x="53" y="174" text-anchor="middle" font-size="10.5" fill="var(--muted)">spike</text><text x="152" y="174" text-anchor="middle" font-size="10.5" fill="var(--muted)">calcium influx</text><text x="262" y="174" text-anchor="middle" font-size="10.5" fill="var(--accent-ink)" font-weight="600">fluorescence</text></svg></div>
    <div class="acg-eb" style="color:#c2410c">MODALITY</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-two-photon-calcium-imaging" title="Link to this term">Two-photon calcium imaging</a></h3>
    <p class="acg-def">Measuring neural activity through a fluorescent calcium indicator such as GCaMP. At rest a neuron has low calcium; when it spikes, calcium flows in, binds the indicator and raises the emitted fluorescence.</p>
    </article>
    <article class="acg-card" id="term-two-photon-excitation" data-cat="modalities" data-hay="two-photon excitation two long-wavelength photons excite one fluorophore. absorption is non-linear in photon density, so only a single voxel is excited at a time — that is what gives optical sectioning in intact tissue. recording modalities &amp; instruments ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="tpe-t"><title id="tpe-t">Two-photon excitation is confined to the focal volume</title> <g fill="var(--accent)" fill-opacity=".16" stroke="currentColor" stroke-opacity=".45" stroke-width="1.8" stroke-linejoin="round"> <path d="M60,40 L88,102 L116,40 Z"/><path d="M60,164 L88,102 L116,164 Z"/></g> <circle cx="88" cy="102" r="6" fill="var(--accent)" fill-opacity=".9"/> <g fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="1.8" stroke-linejoin="round"> <path d="M204,40 L232,102 L260,40 Z"/><path d="M204,164 L232,102 L260,164 Z"/></g> <circle cx="232" cy="102" r="7" fill="var(--accent)" fill-opacity=".9"/> <text x="88" y="182" text-anchor="middle" font-size="11" fill="var(--muted)">one photon</text> <text x="232" y="182" text-anchor="middle" font-size="11" fill="var(--accent-ink)" font-weight="600">two photons</text> <text x="88" y="195" text-anchor="middle" font-size="9" fill="var(--faint)">excited along the cone</text> <text x="232" y="195" text-anchor="middle" font-size="9" fill="var(--faint)">excited at the focus only</text> <text x="88" y="24" text-anchor="middle" font-size="9.5" fill="var(--faint)">linear</text> <text x="232" y="24" text-anchor="middle" font-size="9.5" fill="var(--faint)">non-linear in photon density</text> </svg></div>
    <div class="acg-eb" style="color:#c2410c">MODALITY</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-two-photon-excitation" title="Link to this term">Two-photon excitation</a></h3>
    <p class="acg-def">Two long-wavelength photons excite one fluorophore. Absorption is non-linear in photon density, so only a single voxel is excited at a time — that is what gives optical sectioning in intact tissue.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="background/Two-photon-calcium-imaging.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-types-of-errors-in-imagery" data-cat="imaging" data-hay="types of errors in imagery section/alignment artifacts (folds, cracks, missing sections) that propagate into segmentation. imaging &amp; ultrastructure ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="err-t"><title id="err-t">Types of errors in imagery</title>
<rect x="16" y="44" width="84" height="94" rx="3" fill="var(--scaffold)" fill-opacity=".12" stroke="currentColor" stroke-opacity=".6" stroke-width="2"/>
<ellipse cx="42" cy="100" rx="15" ry="10" fill="var(--scaffold)" fill-opacity=".28"/>
<polygon points="60,44 100,44 100,84" fill="var(--scaffold)" fill-opacity=".4"/>
<line x1="60" y1="44" x2="100" y2="84" stroke="var(--error)" stroke-width="2.4" stroke-linecap="round"/>
<line x1="66" y1="48" x2="96" y2="78" stroke="var(--error)" stroke-width="1.6" stroke-linecap="round" stroke-opacity=".55"/>
<text x="58" y="154" text-anchor="middle" font-size="10.5" fill="var(--error)" font-weight="600">fold</text>
<rect x="118" y="44" width="84" height="94" rx="3" fill="var(--scaffold)" fill-opacity=".12" stroke="currentColor" stroke-opacity=".6" stroke-width="2"/>
<circle cx="150" cy="70" r="9" fill="var(--scaffold)" fill-opacity=".3"/>
<ellipse cx="176" cy="110" rx="13" ry="9" fill="var(--scaffold)" fill-opacity=".28"/>
<path d="M156,44 l10,22 l-12,18 l14,20 l-8,16 l10,18" fill="none" stroke="var(--error)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
<text x="160" y="154" text-anchor="middle" font-size="10.5" fill="var(--error)" font-weight="600">crack</text>
<rect x="220" y="44" width="84" height="94" rx="3" fill="var(--scaffold)" fill-opacity=".08" stroke="currentColor" stroke-opacity=".6" stroke-width="2"/>
<line x1="220" y1="72" x2="248" y2="44" stroke="currentColor" stroke-opacity=".18" stroke-width="1.5"/>
<line x1="220" y1="100" x2="276" y2="44" stroke="currentColor" stroke-opacity=".18" stroke-width="1.5"/>
<line x1="220" y1="128" x2="304" y2="44" stroke="currentColor" stroke-opacity=".18" stroke-width="1.5"/>
<line x1="248" y1="138" x2="304" y2="82" stroke="currentColor" stroke-opacity=".18" stroke-width="1.5"/>
<line x1="276" y1="138" x2="304" y2="110" stroke="currentColor" stroke-opacity=".18" stroke-width="1.5"/>
<circle cx="262" cy="91" r="14" fill="none" stroke="var(--error)" stroke-width="2.4"/>
<line x1="252" y1="101" x2="272" y2="81" stroke="var(--error)" stroke-width="2.4" stroke-linecap="round"/>
<text x="262" y="154" text-anchor="middle" font-size="10.5" fill="var(--error)" font-weight="600">dropped</text>
</svg></div>
    <div class="acg-eb" style="color:#8a6f4a">IMAGING</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-types-of-errors-in-imagery" title="Link to this term">Types of errors in imagery</a></h3>
    <p class="acg-def">Section/alignment artifacts (folds, cracks, missing sections) that propagate into segmentation.</p>
    </article>
    <article class="acg-card" id="term-ultrastructure" data-cat="imaging" data-hay="ultrastructure fine sub-cellular em features: organelles, mitochondria, synapses, myelin. imaging &amp; ultrastructure ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="ult-t"><title id="ult-t">Ultrastructure</title>
<rect x="20" y="24" width="280" height="132" rx="4" fill="var(--scaffold)" fill-opacity=".1" stroke="currentColor" stroke-opacity=".6" stroke-width="2"/>
<ellipse cx="76" cy="74" rx="34" ry="20" fill="var(--scaffold)" fill-opacity=".32" stroke="currentColor" stroke-opacity=".5" stroke-width="2"/>
<path d="M60,60 q6,14 0,28 M76,58 q6,16 0,32 M92,60 q6,14 0,28" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="1.6" stroke-linecap="round"/>
<line x1="76" y1="46" x2="76" y2="54" stroke="currentColor" stroke-opacity=".4" stroke-width="1.4"/>
<text x="76" y="42" text-anchor="middle" font-size="9.5" fill="var(--muted)">mitochondrion</text>
<circle cx="205" cy="54" r="4.5" fill="var(--synapse)" fill-opacity=".35" stroke="var(--synapse)" stroke-width="1.5"/>
<circle cx="216" cy="50" r="4.5" fill="var(--synapse)" fill-opacity=".35" stroke="var(--synapse)" stroke-width="1.5"/>
<circle cx="226" cy="56" r="4.5" fill="var(--synapse)" fill-opacity=".35" stroke="var(--synapse)" stroke-width="1.5"/>
<circle cx="208" cy="64" r="4.5" fill="var(--synapse)" fill-opacity=".35" stroke="var(--synapse)" stroke-width="1.5"/>
<circle cx="219" cy="64" r="4.5" fill="var(--synapse)" fill-opacity=".35" stroke="var(--synapse)" stroke-width="1.5"/>
<circle cx="215" cy="59" r="4.5" fill="var(--synapse)" fill-opacity=".35" stroke="var(--synapse)" stroke-width="1.5"/>
<line x1="215" y1="45" x2="215" y2="39" stroke="var(--synapse)" stroke-opacity=".55" stroke-width="1.4"/>
<text x="215" y="35" text-anchor="middle" font-size="9.5" fill="var(--synapse)">synaptic vesicles</text>
<circle cx="252" cy="108" r="24" fill="none" stroke="var(--axon)" stroke-width="2" stroke-opacity=".9"/>
<circle cx="252" cy="108" r="18" fill="none" stroke="var(--axon)" stroke-width="2" stroke-opacity=".6"/>
<circle cx="252" cy="108" r="12" fill="none" stroke="var(--axon)" stroke-width="2" stroke-opacity=".9"/>
<circle cx="252" cy="108" r="6" fill="var(--scaffold)" fill-opacity=".4"/>
<line x1="252" y1="132" x2="258" y2="142" stroke="var(--axon)" stroke-opacity=".6" stroke-width="1.4"/>
<text x="264" y="152" text-anchor="middle" font-size="9.5" fill="var(--axon)">myelin</text>
<path d="M40,124 H150" fill="none" stroke="currentColor" stroke-opacity=".55" stroke-width="2" stroke-linecap="round"/>
<path d="M40,129 H150" fill="none" stroke="currentColor" stroke-opacity=".55" stroke-width="2" stroke-linecap="round"/>
<line x1="95" y1="131" x2="95" y2="140" stroke="currentColor" stroke-opacity=".4" stroke-width="1.4"/>
<text x="95" y="151" text-anchor="middle" font-size="9.5" fill="var(--muted)">membrane</text>
</svg></div>
    <div class="acg-eb" style="color:#8a6f4a">IMAGING</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-ultrastructure" title="Link to this term">Ultrastructure</a></h3>
    <p class="acg-def">Fine sub-cellular EM features: organelles, mitochondria, synapses, myelin.</p>
    </article>
    <article class="acg-card" id="term-unit" data-cat="dataorg" data-hay="unit two different recording modalities use this word for their basic recorded element, and they are not the same thing. datasets, sessions &amp; files ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="unit-t"><title id="unit-t">Unit</title><text x="72" y="30" text-anchor="middle" font-size="10" fill="var(--muted)">ROI identity</text><rect x="16" y="42" width="112" height="34" rx="8" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".35" stroke-width="2"/><text x="72" y="63" text-anchor="middle" font-size="13" class="mono" fill="var(--muted)">scan_idx</text><rect x="16" y="88" width="112" height="34" rx="8" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".35" stroke-width="2"/><text x="72" y="109" text-anchor="middle" font-size="13" class="mono" fill="var(--muted)">session</text><rect x="16" y="134" width="112" height="34" rx="8" fill="var(--accent)" fill-opacity=".16" stroke="var(--accent)" stroke-width="2.6"/><text x="72" y="155" text-anchor="middle" font-size="13" class="mono" fill="var(--accent-ink)" font-weight="600">unit_id</text><text x="72" y="86" text-anchor="middle" font-size="15" fill="currentColor" opacity=".5">+</text><text x="72" y="132" text-anchor="middle" font-size="15" fill="currentColor" opacity=".5">+</text><path d="M128,59 C152,59 152,105 172,105" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="2"/><path d="M128,105 H172" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="2"/><path d="M128,151 C152,151 152,105 172,105" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="2"/><circle cx="172" cy="105" r="3.5" fill="currentColor" fill-opacity=".55"/><line x1="176" y1="105" x2="212" y2="105" stroke="currentColor" stroke-opacity=".55" stroke-width="2" stroke-linecap="round"/><polygon points="218,105 210,101 210,109" fill="currentColor" fill-opacity=".55"/><circle cx="250" cy="105" r="30" fill="var(--neuron)" fill-opacity=".15" stroke="var(--neuron)" stroke-width="2.4"/><circle cx="250" cy="105" r="6" fill="var(--neuron)"/><text x="250" y="152" text-anchor="middle" font-size="10.5" fill="var(--muted)">unique ROI</text></svg></div>
    <div class="acg-eb" style="color:#3f3f46">DATA</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-unit" title="Link to this term">Unit</a></h3>
    <p class="acg-def">Two different recording modalities use this word for their basic recorded element, and they are not the same thing.</p>
    <div class="acg-meta"><span class="acg-chip acg-warn" title="This word means different things in different places">&#9888; ambiguous</span></div>
    </article>
    <article class="acg-card" id="term-quality-metrics" data-cat="quality" data-hay="unit quality metrics per-unit numbers describing how badly spike sorting may have gone wrong for that unit — contamination from other neurons, spikes missed, or the unit drifting away. none is perfect; which thresholds apply depends on the analysis. quality metrics ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="qm-t"><title id="qm-t">Unit quality metrics: contamination, missed spikes, drift</title><g fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".25" stroke-width="1.6"><rect x="16" y="40" width="88" height="82" rx="8"/><rect x="116" y="40" width="88" height="82" rx="8"/><rect x="216" y="40" width="88" height="82" rx="8"/></g><rect x="22" y="46" width="16" height="70" fill="var(--accent)" fill-opacity=".16"/><path d="M38,46 V116" stroke="var(--accent)" stroke-width="1.8" stroke-dasharray="4 3"/><path d="M22,114 L34,112 L44,88 L56,66 L70,74 L86,94 L98,108" fill="none" stroke="currentColor" stroke-opacity=".8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M122,114 C136,114 140,60 160,60 C180,60 184,114 198,114" fill="none" stroke="currentColor" stroke-opacity=".8" stroke-width="2.2" stroke-linecap="round"/><path d="M140,46 V116" stroke="var(--accent)" stroke-width="1.8" stroke-dasharray="4 3"/><path d="M222,96 C234,82 242,110 254,94 C266,78 274,102 286,72 C292,60 296,56 300,52" fill="none" stroke="currentColor" stroke-opacity=".8" stroke-width="2.2" stroke-linecap="round"/><path d="M222,110 H300" stroke="var(--accent)" stroke-width="1.8" stroke-dasharray="4 3"/><text x="60" y="144" text-anchor="middle" font-size="10.5" fill="var(--muted)">contamination</text><text x="160" y="144" text-anchor="middle" font-size="10.5" fill="var(--muted)">spikes missed</text><text x="260" y="144" text-anchor="middle" font-size="10.5" fill="var(--muted)">unit drifts away</text><text x="160" y="176" text-anchor="middle" font-size="9.5" fill="var(--faint)">thresholds depend on the analysis</text></svg></div>
    <div class="acg-eb" style="color:#4338ca">QUALITY</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-quality-metrics" title="Link to this term">Unit quality metrics</a></h3>
    <p class="acg-def">Per-unit numbers describing how badly spike sorting may have gone wrong for that unit — contamination from other neurons, spikes missed, or the unit drifting away. None is perfect; which thresholds apply depends on the analysis.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="physiology/ephys/visual-coding/vcnp-quality-metrics.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-units-table" data-cat="dataorg" data-hay="units table one row per sorted unit: spike times, mean waveform, quality metrics, and the peak channel that gives it a location. the primary table of any ephys dataset. datasets, sessions &amp; files ">
    <div class="acg-eb" style="color:#3f3f46">DATA</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-units-table" title="Link to this term">Units table</a></h3>
    <p class="acg-def">One row per sorted unit: spike times, mean waveform, quality metrics, and the peak channel that gives it a location. The primary table of any ephys dataset.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="physiology/ephys/visual-coding/vcnp-units.html">in this book</a></div>
    </article>
    <article class="acg-card" id="term-unproofread" data-cat="proofreading" data-hay="unproofread an arbor that has not been comprehensively corrected. it is truncated by split errors and may carry merged fragments of other cells, so its apparent partners are unreliable. proofreading &amp; data quality ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="pu"><title id="pu">Unproofread — proofreading status ladder</title>
<circle cx="72" cy="108" r="10" fill="currentColor" fill-opacity=".08" stroke="currentColor" stroke-opacity=".45" stroke-width="2.2"/>
<g fill="none" stroke="currentColor" stroke-opacity=".4" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
<path d="M72,98 C68,86 66,78 64,66"/>
<path d="M72,98 C80,86 86,80 92,72"/>
<path d="M72,118 C72,132 70,142 68,154"/>
</g>
<path d="M92,72 C98,66 102,62 108,56" fill="none" stroke="currentColor" stroke-opacity=".22" stroke-width="2" stroke-dasharray="2 5"/>
<g fill="var(--surface)" stroke="currentColor" stroke-opacity=".4" stroke-width="1.8">
<circle cx="64" cy="66" r="3.2"/>
<circle cx="92" cy="72" r="3.2"/>
<circle cx="68" cy="154" r="3.2"/>
</g>
<rect x="170" y="42" width="132" height="30" rx="15" fill="none" stroke="currentColor" stroke-opacity=".3" stroke-width="1.8"/>
<text x="236" y="61" text-anchor="middle" font-size="12" fill="var(--muted)">Extended</text>
<rect x="170" y="87" width="132" height="30" rx="15" fill="none" stroke="currentColor" stroke-opacity=".3" stroke-width="1.8"/>
<text x="236" y="106" text-anchor="middle" font-size="12" fill="var(--muted)">Clean</text>
<rect x="170" y="132" width="132" height="30" rx="15" fill="var(--accent)" fill-opacity=".16" stroke="var(--accent)" stroke-width="2.4"/>
<text x="236" y="151" text-anchor="middle" font-size="12" fill="var(--accent-ink)" font-weight="600">Unproofread</text>
<path d="M228,82 L236,76 L244,82" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M228,127 L236,121 L244,127" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<text x="72" y="184" text-anchor="middle" font-size="9.5" fill="var(--muted)">incomplete arbor</text>
</svg></div>
    <div class="acg-eb" style="color:#b8791a">PROOF</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-unproofread" title="Link to this term">Unproofread</a></h3>
    <p class="acg-def">An arbor that has not been comprehensively corrected. It is truncated by split errors and may carry merged fragments of other cells, so its apparent partners are unreliable.</p>
    </article>
    <article class="acg-card" id="term-v1dd-v1-deep-dive" data-cat="datasets" data-hay="v1dd (v1 deep-dive) functional (2p/3p calcium) + em dataset of v1 across all layers in 4 mice (~50k neurons/mouse). datasets &amp; scope v1dd">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="d6"><title id="d6">V1DD (V1 Deep-Dive)</title><polygon points="95,55 215,55 250,32 130,32" fill="var(--scaffold)" fill-opacity=".26" stroke="currentColor" stroke-opacity=".6" stroke-width="1.8"/><polygon points="215,55 250,32 250,155 215,178" fill="var(--scaffold)" fill-opacity=".07" stroke="currentColor" stroke-opacity=".6" stroke-width="1.8"/><polygon points="95,55 215,55 215,178 95,178" fill="var(--scaffold)" fill-opacity=".14" stroke="currentColor" stroke-opacity=".6" stroke-width="1.8"/><text x="155" y="50" text-anchor="middle" font-size="9" class="mono" fill="var(--muted)">800 µm</text><text transform="translate(240,40) rotate(-33)" text-anchor="middle" font-size="9" class="mono" fill="var(--muted)">800 µm</text><g stroke="currentColor" stroke-opacity=".5" stroke-width="1.6" stroke-linecap="round"><line x1="88" y1="62" x2="88" y2="170"/></g><g fill="currentColor" fill-opacity=".5"><polygon points="88,58 85,64 91,64"/><polygon points="88,174 85,168 91,168"/></g><text x="88" y="50" text-anchor="middle" font-size="9" fill="var(--muted)">pia</text><text x="88" y="184" text-anchor="middle" font-size="9" fill="var(--muted)">WM</text><text transform="translate(76,116) rotate(-90)" text-anchor="middle" font-size="8.5" fill="var(--faint)">cortical depth</text><rect x="236" y="163" width="72" height="26" rx="6" fill="var(--accent)" fill-opacity=".18" stroke="var(--accent-ink)" stroke-width="1.8"/><text x="272" y="180" text-anchor="middle" font-size="12" fill="var(--accent-ink)" font-weight="700">×4 mice</text></svg></div>
    <div class="acg-eb" style="color:#0e7f8c">DATASETS</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-v1dd-v1-deep-dive" title="Link to this term">V1DD (V1 Deep-Dive)</a></h3>
    <p class="acg-def">Functional (2p/3p calcium) + EM dataset of V1 across all layers in 4 mice (~50k neurons/mouse).</p>
    <div class="acg-meta"><span class="acg-chip acg-ds">V1DD only</span></div>
    </article>
    <article class="acg-card" id="term-v1dd-functional-index" data-cat="functional" data-hay="v1dd functional index v1dd's golden-mouse column/volume/plane/roi scheme, distinct from microns session/scan/unit. functional data &amp; coregistration v1dd">
    <div class="acg-eb" style="color:#9a5b12">FUNCTION</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-v1dd-functional-index" title="Link to this term">V1DD functional index</a></h3>
    <p class="acg-def">V1DD's Golden-Mouse <code>column/volume/plane/roi</code> scheme, distinct from MICrONS session/scan/unit.</p>
    <div class="acg-meta"><span class="acg-chip acg-ds">V1DD only</span></div>
    </article>
    <article class="acg-card" id="term-valid-roi" data-cat="quality" data-hay="valid_roi the ophys equivalent of a unit quality flag: whether cell classification judged a segmented roi to be a real cell. only valid rois are released. quality metrics ">
    <div class="acg-eb" style="color:#4338ca">QUALITY</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-valid-roi" title="Link to this term">valid_roi</a></h3>
    <p class="acg-def">The ophys equivalent of a unit quality flag: whether cell classification judged a segmented ROI to be a real cell. Only valid ROIs are released.</p>
    </article>
    <article class="acg-card" id="term-vertex-vertices" data-cat="morphology" data-hay="vertex / vertices points in 3d (n×3, nanometers) that, connected, build meshes and skeletons. morphology — meshes &amp; skeletons ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="m-vert"><title id="m-vert">Vertices tracing a neuron outline</title><g fill="none" stroke="currentColor" stroke-opacity=".4" stroke-width="1.8" stroke-linecap="round"><path d="M55,120 L70,100 L88,112 M88,112 L105,100 L140,88 L180,80 L220,72 L255,66"/><path d="M255,66 L258,96"/><path d="M258,96 L226,104 L188,112 L148,120 L112,132 L78,138"/><path d="M78,138 L58,142 L55,120"/></g><g fill="var(--neuron)"><circle cx="55" cy="120" r="3.6"/><circle cx="70" cy="100" r="3.6"/><circle cx="88" cy="112" r="3.6"/><circle cx="105" cy="100" r="3.6"/><circle cx="180" cy="80" r="3.6"/><circle cx="220" cy="72" r="3.6"/><circle cx="255" cy="66" r="3.6"/><circle cx="258" cy="96" r="3.6"/><circle cx="226" cy="104" r="3.6"/><circle cx="188" cy="112" r="3.6"/><circle cx="148" cy="120" r="3.6"/><circle cx="112" cy="132" r="3.6"/><circle cx="78" cy="138" r="3.6"/><circle cx="58" cy="142" r="3.6"/></g><g fill="var(--neuron)" fill-opacity=".45"><circle cx="130" cy="58" r="3.2"/><circle cx="205" cy="145" r="3.2"/></g><circle cx="140" cy="88" r="6" fill="var(--neuron)" stroke="var(--accent-ink)" stroke-width="2"/><line x1="140" y1="80" x2="150" y2="60" stroke="var(--accent-ink)" stroke-width="1.5"/><text x="152" y="58" font-size="11" fill="var(--accent-ink)" font-weight="600">vertex</text><text x="150" y="184" text-anchor="middle" font-size="9.5" fill="var(--muted)">3D points sampling the surface</text></svg></div>
    <div class="acg-eb" style="color:#2a8f57">MORPH</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-vertex-vertices" title="Link to this term">Vertex / Vertices</a></h3>
    <p class="acg-def">Points in 3D (N×3, nanometers) that, connected, build meshes and skeletons.</p>
    </article>
    <article class="acg-card" id="term-vip-cell" data-cat="celltypes" data-hay="vip cell an inhibitory interneuron expressing vasoactive intestinal protein. vip cells tend to target somatostatin cells rather than excitatory neurons; this role as a “disinhibitory specialist” is thought to matter for context-dependent modulation of cortical activity. cell types &amp; cortical anatomy ">
    <div class="acg-eb" style="color:#c9357f">CELLTYPE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-vip-cell" title="Link to this term">VIP cell</a></h3>
    <p class="acg-def">An inhibitory interneuron expressing Vasoactive Intestinal Protein. VIP cells tend to target somatostatin cells rather than excitatory neurons; this role as a “disinhibitory specialist” is thought to matter for context-dependent modulation of cortical activity.</p>
    </article>
    <article class="acg-card" id="term-visp-visal-visrl" data-cat="celltypes" data-hay="visp / visal / visrl the visual cortical areas (v1 / al / rl / lm) the volume spans and assigns. cell types &amp; cortical anatomy ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="vp-t"><title id="vp-t">Mouse visual area flat-map patch</title>
<rect x="40" y="34" width="240" height="140" rx="28" fill="currentColor" fill-opacity=".04" stroke="currentColor" stroke-opacity=".25" stroke-width="1.6"/>
<ellipse cx="180" cy="112" rx="62" ry="48" fill="var(--accent)" fill-opacity=".18" stroke="var(--accent)" stroke-width="2.4"/>
<g fill="currentColor" fill-opacity=".05" stroke="currentColor" stroke-opacity=".6" stroke-width="2">
<ellipse cx="150" cy="52" rx="24" ry="18"/>
<ellipse cx="104" cy="68" rx="24" ry="20"/>
<ellipse cx="106" cy="120" rx="26" ry="24"/>
</g>
<text x="180" y="110" text-anchor="middle" font-size="16" font-weight="700" fill="var(--accent-ink)">V1</text>
<text x="180" y="126" text-anchor="middle" class="mono" font-size="9" fill="var(--accent-ink)">VISp</text>
<text x="150" y="50" text-anchor="middle" font-size="11" font-weight="600" fill="var(--muted)">RL</text>
<text x="150" y="61" text-anchor="middle" class="mono" font-size="7.5" fill="var(--faint)">VISrl</text>
<text x="104" y="66" text-anchor="middle" font-size="11" font-weight="600" fill="var(--muted)">AL</text>
<text x="104" y="77" text-anchor="middle" class="mono" font-size="7.5" fill="var(--faint)">VISal</text>
<text x="106" y="119" text-anchor="middle" font-size="11" font-weight="600" fill="var(--muted)">LM</text>
<text x="106" y="131" text-anchor="middle" class="mono" font-size="7.5" fill="var(--faint)">VISl</text>
<path d="M66,170 V154 M66,154 l-3,5 M66,154 l3,5 M66,170 H50 M50,170 l5,-3 M50,170 l5,3" stroke="currentColor" stroke-opacity=".55" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<text x="66" y="150" text-anchor="middle" class="mono" font-size="8" fill="var(--muted)">A</text>
<text x="44" y="173" text-anchor="middle" class="mono" font-size="8" fill="var(--muted)">L</text>
</svg></div>
    <div class="acg-eb" style="color:#c9357f">CELLTYPE</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-visp-visal-visrl" title="Link to this term">VISp / VISal / VISrl</a></h3>
    <p class="acg-def">The visual cortical areas (V1 / AL / RL / LM) the volume spans and assigns.</p>
    </article>
    <article class="acg-card" id="term-volume" data-cat="volume" data-hay="volume a cubic-mm 3d em image dataset spanning a cortical region. volume, voxels &amp; coordinates ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="vol-t"><title id="vol-t">Cortical EM volume with a zoom-in to a single voxel</title><polygon points="40,70 120,70 120,165 40,165" fill="var(--scaffold)" fill-opacity=".14" stroke="currentColor" stroke-opacity=".7" stroke-width="2" stroke-linejoin="round"/><polygon points="40,70 120,70 150,50 70,50" fill="var(--scaffold)" fill-opacity=".26" stroke="currentColor" stroke-opacity=".7" stroke-width="2" stroke-linejoin="round"/><polygon points="120,70 150,50 150,145 120,165" fill="var(--scaffold)" fill-opacity=".07" stroke="currentColor" stroke-opacity=".7" stroke-width="2" stroke-linejoin="round"/><rect x="104" y="74" width="9" height="9" fill="var(--accent)" fill-opacity=".28" stroke="var(--accent)" stroke-width="1.5"/><text x="95" y="184" text-anchor="middle" font-size="11" fill="var(--muted)">EM volume</text><path d="M113,74 L235,78 M113,83 L235,132" fill="none" stroke="var(--accent)" stroke-opacity=".8" stroke-width="1.5" stroke-dasharray="4 3"/><polygon points="235,78 258,78 258,138 235,138" fill="var(--scaffold)" fill-opacity=".14" stroke="var(--accent)" stroke-width="2" stroke-linejoin="round"/><polygon points="235,78 258,78 272,66 249,66" fill="var(--scaffold)" fill-opacity=".26" stroke="var(--accent)" stroke-width="2" stroke-linejoin="round"/><polygon points="258,78 272,66 272,126 258,138" fill="var(--scaffold)" fill-opacity=".07" stroke="var(--accent)" stroke-width="2" stroke-linejoin="round"/><text x="253" y="158" text-anchor="middle" font-size="11" fill="var(--accent-ink)" font-weight="600">1 voxel</text></svg></div>
    <div class="acg-eb" style="color:#2f6fd0">VOLUME</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-volume" title="Link to this term">Volume</a></h3>
    <p class="acg-def">A cubic-mm 3D EM image dataset spanning a cortical region.</p>
    </article>
    <article class="acg-card" id="term-vortex" data-cat="proofreading" data-hay="vortex nih program (virtual observatory of the cortex) funding continued proofreading; source of the vortex_* tables. proofreading &amp; data quality ">
    <div class="acg-eb" style="color:#b8791a">PROOF</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-vortex" title="Link to this term">VORTEX</a></h3>
    <p class="acg-def">NIH program (Virtual Observatory of the Cortex) funding continued proofreading; source of the <code>vortex_*</code> tables.</p>
    </article>
    <article class="acg-card" id="term-voxel" data-cat="volume" data-hay="voxel the smallest 3d image unit; anisotropic 4×4×40 nm (microns) / 9×9×45 nm (v1dd). volume, voxels &amp; coordinates ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="voxel-t"><title id="voxel-t">Voxel: anisotropic, z ~10x coarser than x and y</title><polygon points="110,55 150,55 150,165 110,165" fill="var(--scaffold)" fill-opacity=".14" stroke="currentColor" stroke-opacity=".65" stroke-width="2" stroke-linejoin="round"/><polygon points="110,55 150,55 184,35 144,35" fill="var(--scaffold)" fill-opacity=".26" stroke="currentColor" stroke-opacity=".65" stroke-width="2" stroke-linejoin="round"/><polygon points="150,55 184,35 184,145 150,165" fill="var(--scaffold)" fill-opacity=".07" stroke="currentColor" stroke-opacity=".65" stroke-width="2" stroke-linejoin="round"/><text x="130" y="182" text-anchor="middle" font-size="11" class="mono" fill="var(--muted)">4 nm</text><text x="170" y="30" text-anchor="middle" font-size="11" class="mono" fill="var(--muted)">4 nm</text><text transform="translate(96,110) rotate(-90)" text-anchor="middle" font-size="12" class="mono" fill="var(--accent-ink)" font-weight="600">40 nm</text></svg></div>
    <div class="acg-eb" style="color:#2f6fd0">VOLUME</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-voxel" title="Link to this term">Voxel</a></h3>
    <p class="acg-def">The smallest 3D image unit; anisotropic 4×4×40 nm (MICrONS) / 9×9×45 nm (V1DD).</p>
    </article>
    <article class="acg-card" id="term-watertight" data-cat="morphology" data-hay="watertight em meshes are not watertight, so trimesh .volume/.center_mass are invalid. morphology — meshes &amp; skeletons ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="m-water"><title id="m-water">Mesh hole flagged as not watertight</title><polygon points="58,40 118,34 178,40 238,36 244,116 184,120 124,118 64,122" fill="var(--scaffold)" fill-opacity=".12"/><g fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M58,40 L118,34 L178,40 L238,36"/><path d="M50,82 L110,78 L170,80 L230,76"/><path d="M64,122 L124,118 L184,120 L244,116"/><path d="M58,40 L50,82 M118,34 L110,78 M178,40 L170,80 M238,36 L230,76"/><path d="M50,82 L64,122 M110,78 L124,118 M170,80 L184,120 M230,76 L244,116"/><path d="M118,34 L50,82 M238,36 L170,80"/><path d="M110,78 L64,122 M170,80 L124,118 M230,76 L184,120"/></g><polygon points="110,78 170,80 124,118" fill="var(--surface)" stroke="var(--error)" stroke-width="2.6" stroke-dasharray="5 4" stroke-linejoin="round"/><line x1="140" y1="98" x2="140" y2="62" stroke="var(--error)" stroke-width="1.5"/><text x="140" y="58" text-anchor="middle" font-size="10.5" fill="var(--error)" font-weight="600">hole</text><g transform="rotate(-5 227 172)"><rect x="150" y="159" width="155" height="26" rx="5" fill="none" stroke="var(--error)" stroke-width="2" stroke-dasharray="4 3"/><text x="227" y="177" text-anchor="middle" font-size="12" fill="var(--error)" font-weight="700">⚠ not watertight</text></g></svg></div>
    <div class="acg-eb" style="color:#2a8f57">MORPH</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-watertight" title="Link to this term">Watertight</a></h3>
    <p class="acg-def">EM meshes are NOT watertight, so Trimesh <code>.volume</code>/<code>.center_mass</code> are invalid.</p>
    </article>
    <article class="acg-card" id="term-waveform" data-cat="signals" data-hay="waveform the voltage over time measured at an electrode when a neuron fires an action potential. the per-unit mean waveform is what the shape metrics are computed from. signals &amp; preprocessing ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="wfm-t"><title id="wfm-t">Spike waveform: trough and repolarisation peak of the mean spike</title><path d="M36,96 H284" stroke="currentColor" stroke-opacity=".25" stroke-width="1.6"/><g fill="none" stroke="currentColor" stroke-opacity=".22" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M36,96 H98 C106,96 110,90 114,86 L122,150 L142,66 C150,50 158,52 166,68 C174,84 184,94 200,96 H284" transform="translate(-3,-7)"/><path d="M36,96 H98 C106,96 110,90 114,86 L122,150 L142,66 C150,50 158,52 166,68 C174,84 184,94 200,96 H284" transform="translate(3,8)"/></g><path d="M36,96 H98 C106,96 110,90 114,86 L122,150 L142,66 C150,50 158,52 166,68 C174,84 184,94 200,96 H284" fill="none" stroke="var(--accent)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="122" cy="150" r="3.4" fill="var(--accent-ink)"/><circle cx="159" cy="60" r="3.4" fill="var(--accent-ink)"/><text x="122" y="172" text-anchor="middle" font-size="10" fill="var(--muted)">trough</text><text x="176" y="52" font-size="10" fill="var(--muted)">peak</text><text x="30" y="70" font-size="9.5" class="mono" fill="var(--faint)">µV</text><text x="284" y="112" text-anchor="end" font-size="9.5" class="mono" fill="var(--faint)">~3 ms</text><text x="60" y="188" font-size="10" fill="var(--muted)">single spikes</text><line x1="140" y1="184" x2="164" y2="184" stroke="var(--accent)" stroke-width="2.6" stroke-linecap="round"/><text x="170" y="188" font-size="10" fill="var(--accent-ink)" font-weight="600">mean waveform</text></svg></div>
    <div class="acg-eb" style="color:#0369a1">SIGNAL</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-waveform" title="Link to this term">Waveform</a></h3>
    <p class="acg-def">The voltage over time measured at an electrode when a neuron fires an action potential. The per-unit mean waveform is what the shape metrics are computed from.</p>
    </article>
    <article class="acg-card" id="term-df-f" data-cat="signals" data-hay="δf/f (df/f) change in fluorescence normalised by a baseline. the baseline is the median fluorescence in a 180 s window centred on each time point, so δf/f is a relative, unitless signal. signals &amp; preprocessing ">
    <div class="acg-art"><svg viewBox="0 0 320 200" role="img" aria-labelledby="dff-t"><title id="dff-t">ΔF/F: fluorescence normalised by a rolling baseline</title><path d="M26,112 C42,112 48,110 58,110 C66,110 68,70 78,70 C90,70 94,104 106,106 C116,108 120,82 130,82 C142,82 146,106 158,106 C168,106 172,104 180,104" fill="none" stroke="currentColor" stroke-opacity=".8" stroke-width="2.2" stroke-linecap="round"/><path d="M26,110 H180" stroke="currentColor" stroke-opacity=".45" stroke-width="1.6" stroke-dasharray="5 4"/><text x="26" y="46" font-size="10.5" fill="var(--muted)">raw F</text><text x="180" y="124" text-anchor="end" font-size="9.5" class="mono" fill="var(--faint)">F₀</text><path d="M64,128 V136 H142 V128" fill="none" stroke="currentColor" stroke-opacity=".4" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><text x="103" y="152" text-anchor="middle" font-size="9.5" class="mono" fill="var(--faint)">180 s window</text><path d="M190,92 H210" stroke="currentColor" stroke-opacity=".55" stroke-width="2" stroke-linecap="round"/><path d="M204,88 L210,92 L204,96" fill="none" stroke="currentColor" stroke-opacity=".55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M220,116 H306" stroke="currentColor" stroke-opacity=".35" stroke-width="1.6"/><path d="M220,116 L234,116 C242,116 244,68 254,68 C264,68 266,114 276,114 C284,114 288,86 296,86 C302,86 304,114 306,114" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round"/><text x="263" y="46" text-anchor="middle" font-size="11" fill="var(--accent-ink)" font-weight="600">ΔF/F</text><text x="263" y="152" text-anchor="middle" font-size="10" class="mono" fill="var(--muted)">(F − F₀) / F₀</text></svg></div>
    <div class="acg-eb" style="color:#0369a1">SIGNAL</div>
    <h3 class="acg-h"><a class="acg-name" href="#term-df-f" title="Link to this term">ΔF/F (dF/F)</a></h3>
    <p class="acg-def">Change in fluorescence normalised by a baseline. The baseline is the median fluorescence in a 180 s window centred on each time point, so ΔF/F is a relative, unitless signal.</p>
    <div class="acg-meta"><a class="acg-chip acg-src" href="physiology/ophys/visual-coding/vc2p-session-data.html">in this book</a></div>
    </article>
  </div>

  <p class="acg-empty" hidden>Nothing matches that search.</p>

  <p class="acg-foot">
    Generated from the <a href="https://alleninstitute.github.io/allen-connectomics-glossary/" target="_blank" rel="noopener">Allen Glossary</a>
    (revision 2026-08), which is the source of truth for these definitions &#8212;
    corrections and new terms belong there, not on this page.<br>Further reading: <a href="https://www.microns-explorer.org/" target="_blank" rel="noopener">MICrONS Explorer</a> &middot; <a href="https://caveconnectome.github.io/CAVEclient/" target="_blank" rel="noopener">CAVEclient documentation</a> &middot; <a href="https://nwb.org/" target="_blank" rel="noopener">NWB</a> &middot; <a href="https://registry.opendata.aws/allen-nd-open-data/" target="_blank" rel="noopener">AIND open data on S3</a>
  </p>

</div>

<script>
(function(){
  "use strict";
  var root = document.getElementById("acg");
  if (!root) return;

  var cards = Array.prototype.slice.call(root.querySelectorAll(".acg-card"));
  var pills = Array.prototype.slice.call(root.querySelectorAll(".acg-pill"));
  var input = root.querySelector(".acg-q");
  var count = root.querySelector(".acg-count");
  var empty = root.querySelector(".acg-empty");
  var clear = root.querySelector(".acg-clear");
  var total = cards.length;
  var cats  = Object.create(null);

  // cache the original markup once, so highlighting can be re-applied from
  // scratch on every keystroke instead of nesting <mark> inside <mark>
  cards.forEach(function(c){
    c._name = c.querySelector(".acg-name");
    c._def  = c.querySelector(".acg-def");
    c._nameHTML = c._name ? c._name.innerHTML : "";
    c._defHTML  = c._def ? c._def.innerHTML : "";
    c._hay = c.getAttribute("data-hay") || "";
    c._cat = c.getAttribute("data-cat") || "";
  });

  function escapeRx(s){ return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

  // highlight matches in markup, touching only the text between tags
  function hl(html, q){
    if (!q) return html;
    var rx = new RegExp("(" + escapeRx(q) + ")", "ig");
    return String(html).split(/(<[^>]+>)/).map(function(part){
      return part.charAt(0) === "<" ? part : part.replace(rx, "<mark>$1</mark>");
    }).join("");
  }

  function activeCats(){
    var on = [];
    for (var k in cats) if (cats[k]) on.push(k);
    return on;
  }

  function apply(){
    var q = (input && input.value ? input.value : "").trim().toLowerCase();
    var on = activeCats();
    var set = on.length ? on : null;
    var shown = 0;
    // counts ignore the category filter itself, so pill numbers do not collapse
    // to zero the moment you narrow to one category
    var per = Object.create(null);

    cards.forEach(function(c){
      var hit = !q || c._hay.indexOf(q) !== -1;
      if (hit) per[c._cat] = (per[c._cat] || 0) + 1;
      var vis = hit && (!set || set.indexOf(c._cat) !== -1);
      c.hidden = !vis;
      if (vis){
        shown++;
        if (c._name) c._name.innerHTML = hl(c._nameHTML, q);
        if (c._def)  c._def.innerHTML  = hl(c._defHTML, q);
      }
    });

    pills.forEach(function(p){
      var n = per[p.getAttribute("data-cat")] || 0;
      var slot = p.querySelector(".acg-n");
      if (slot) slot.textContent = String(n);
      p.classList.toggle("acg-zero", n === 0);
    });

    if (count) count.textContent = (q || set) ? shown + " of " + total + " terms"
                                              : total + " terms";
    if (empty) empty.hidden = shown !== 0;
    if (clear) clear.hidden = !set;
  }

  if (input){
    var t = null;
    input.addEventListener("input", function(){
      clearTimeout(t);
      t = setTimeout(apply, 110);
    });
  }

  pills.forEach(function(p){
    p.addEventListener("click", function(){
      var id = p.getAttribute("data-cat");
      cats[id] = !cats[id];
      p.setAttribute("aria-pressed", cats[id] ? "true" : "false");
      apply();
    });
  });

  if (clear){
    clear.addEventListener("click", function(){
      pills.forEach(function(p){ cats[p.getAttribute("data-cat")] = false;
                                 p.setAttribute("aria-pressed", "false"); });
      apply();
    });
  }

  // "/" focuses the box, Escape empties it — but only while the page has focus,
  // never stealing keys from the databook's own search
  document.addEventListener("keydown", function(e){
    if (!input) return;
    if (e.key === "/" && document.activeElement !== input){
      var tag = (document.activeElement && document.activeElement.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      e.preventDefault();
      input.focus();
    } else if (e.key === "Escape" && document.activeElement === input){
      input.value = "";
      apply();
    }
  });

  // a card linked to directly should survive an active filter
  window.addEventListener("hashchange", function(){
    var h = location.hash.replace(/^#/, "");
    if (h.indexOf("term-") !== 0) return;
    var el = document.getElementById(h);
    if (el && el.hidden){
      pills.forEach(function(p){ cats[p.getAttribute("data-cat")] = false;
                                 p.setAttribute("aria-pressed", "false"); });
      if (input) input.value = "";
      apply();
      el.scrollIntoView({ block: "center" });
    }
  });

  apply();
})();
</script>
:::::

## Term index

The same 249 terms as a plain list, A to Z. This is what the databook's own
search box and any `{term}` cross-reference elsewhere in the book resolve against,
so it is folded away rather than left out.

::::::{dropdown} Every term, A to Z
:::::{glossary}
3D reconstruction
  Turning EM imagery into 3D neuron objects (dense segmentation → meshes). <a href="#term-3d-reconstruction">Go to the card</a>.

Action potential
Spike
  A characteristic signal in excitable cell membranes: a potential-difference waveform that propagates along the membrane. In neurons it indicates activation. The trace is a Hodgkin-Huxley simulation: a brief current pulse opens sodium channels, which depolarise the membrane and then inactivate, while potassium conductance rises more slowly and repolarises it past rest. <a href="#term-action-potential">Go to the card</a>.

AIND metadata schema
  Six JSON classes describing a newer data asset: data description, subject, procedures, rig or instrument, session or acquisition, and processing. Where you look up which virus was injected, or what a capsule actually ran. <a href="#term-aind-metadata">Go to the card</a>.

AllenSDK
  The Python package for the Brain Observatory physiology datasets, wrapping downloads and metadata behind a cache object. Being retired in favour of reading NWB files directly, so new work should not start here. <a href="#term-allensdk">Go to the card</a>.

amplitude_cutoff
  Estimated fraction of the unit's spikes that fell below the detection threshold and were never recorded — a false-negative rate. Default threshold 0.1. <a href="#term-amplitude-cutoff">Go to the card</a>.

Annotation
  Labeled data (points/tables) bound to locations or cells in the volume. <a href="#term-annotation">Go to the card</a>.

Baiting / coupled vs uncoupled
  Baiting: a reward an unchosen side would have given is held and delivered on the next choice of that side. Coupled or uncoupled describes whether the two sides' probabilities change together or independently. <a href="#term-baiting">Go to the card</a>.

Basket cell (BC)
Basket cell
  Inhibitory neuron whose synaptic output targets the cell body and proximal dendrites of excitatory neurons. Many basket cells express parvalbumin (PV), but not all — some express cholecystokinin (CCK). PV basket cells are typically fast spiking, and are thought to be important for gain control and for the temporal precision of network activity. <a href="#term-basket-cell">Go to the card</a>.

BCI task / conditioned neuron
  A lickport moves toward the mouse at a speed set by the fluorescence of one chosen neuron. Reaching the near position within 10 s earns water. Mice usually learn to drive that neuron within about 30 trials. <a href="#term-bci-task">Go to the card</a>.

Behavior session
  One behavioural recording, whether it happened under the microscope or in the training facility. Its session_type names the training stage, which is how the full training history is reconstructed. <a href="#term-behavior-session">Go to the card</a>.

Bipolar cell (BPC)
Bipolar cell
  A subset of VIP cell with a bipolar dendritic arbor — two primary dendrites leaving opposite poles of the soma. Distinct from the retinal cell of the same name. <a href="#term-bipolar-cell">Go to the card</a>.

Blank sweep
  A trial in which the stimulus is replaced by mean-luminance grey, interleaved among real trials so each stimulus has its own baseline. <a href="#term-blank-sweep">Go to the card</a>.

Bound Spatial Point
  Binds an annotation to the cell at a location via the triad pt_position → pt_supervoxel_id → pt_root_id. <a href="#term-bound-spatial-point">Go to the card</a>.

Branch / End / Root point
  Named skeleton vertex types; the root is conventionally placed at the soma. <a href="#term-branch-end-root-point">Go to the card</a>.

Catch trial / sham change
  A change time is drawn but the image does not change. This conservative definition counts only presentations drawn from the change-time distribution; aborted trials are arguably catches too. <a href="#term-catch-trial">Go to the card</a>.

CAVE
  Connectome Annotation Versioning Engine — the suite managing large dynamic connectomics data. <a href="#term-cave">Go to the card</a>.

CAVEclient
  The main Python client for programmatic access to CAVE services. Servers: MICrONS global.daf-apis.com, V1DD global.em.brain.allentech.org. <a href="#term-caveclient">Go to the card</a>.

cc_abs / cc_max / cc_norm
  Digital-twin model-performance columns. <a href="#term-cc-abs-cc-max-cc-norm">Go to the card</a>.

Cell type
  Classification of a cell (e.g. 23P, BC) via several tables/methods, keyed on nucleus id. <a href="#term-cell-type">Go to the card</a>.

cell_id / soma_id
  The 6-digit nucleus id (from nucleus_detection_v0), static across versions; tracks a cell over time. <a href="#term-cell-id-soma-id">Go to the card</a>.

cell_specimen_id vs cell_roi_id
  cell_roi_id identifies a segmented ROI within one experiment, before matching. cell_specimen_id identifies the cell after matching across sessions, and is therefore shared across a container. Joining on the wrong one silently loses the across-day link. <a href="#term-cell-specimen-vs-roi-id">Go to the card</a>.

Change detection task
  A go/no-go task: images are presented in a continuous stream and the mouse earns water by licking when the image identity changes. The 500 ms grey gap between images adds a working-memory component. <a href="#term-change-detection">Go to the card</a>.

Channelrhodopsin (ChR2)
  A light-gated ion channel used in optogenetics to control neuronal activity with light. <a href="#term-channelrhodopsin">Go to the card</a>.

Channels table
  One row per recording site, at general/extracellular_ephys/electrodes, with its position on the shank and in the CCF. A unit points into this table through its electrodes column; that is how a spike acquires a place in the brain. <a href="#term-channels-table">Go to the card</a>.

ChRmine
  A red-shifted opsin, excited near 1080 nm. Because GCaMP is excited near 920 nm the two can be driven independently, which is what makes simultaneous imaging and single-cell photostimulation possible. <a href="#term-chrmine">Go to the card</a>.

classification_system column
  The E / I / non-neuron grouping column in cell-type tables. <a href="#term-classification-system-column">Go to the card</a>.

Clean
  Arbor proofread to remove all merge errors (synapses correct, but may be incomplete). <a href="#term-clean">Go to the card</a>.

cloud-volume / ImageryClient
  Serverless clients to read Precomputed imagery/segmentation and download aligned cutouts. <a href="#term-cloud-volume-imageryclient">Go to the card</a>.

Column (MICrONS)
Minnie column
  A 100 µm-square region spanning all cortical layers, densely proofread for a cell-type census. <a href="#term-column-microns">Go to the card</a>.

Column (V1DD field)
  A column field naming one of 5 stacked scan sub-volumes tiling the V1DD block — a different concept from the MICrONS column. <a href="#term-column-v1dd-field">Go to the card</a>.

Common Coordinate Framework (CCF)
CCF
  A standard 3D reference space for the mouse brain that lets data from different modalities be placed in the same coordinates. <a href="#term-ccf">Go to the card</a>.

Compartment labels
  SWC integer codes: 0 undefined, 1 soma, 2 axon, 3 basal dendrite, 4 apical dendrite. <a href="#term-compartment-labels">Go to the card</a>.

Connectivity Viewer
  Dash app showing a cell's synaptic inputs/outputs grouped and colored by cell type. <a href="#term-connectivity-viewer">Go to the card</a>.

Connectome
  A wiring map of neurons and the synaptic connections between them. <a href="#term-connectome">Go to the card</a>.

Container
  There is no consistent use of this term. <a href="#term-container">Go to the card</a>.

Context block
  A ten-minute stretch in which only one modality is rewarded, signalled by instruction trials at its start. Blocks alternate for six blocks in a session. <a href="#term-context-block">Go to the card</a>.

Coordinate frames
  Three systems: voxel (annotations), nanometer (mesh/skeleton vertices), transformed (pia-flattened microns). <a href="#term-coordinate-frames">Go to the card</a>.

Coregistration
  Aligning functionally-imaged cells to the same cells in the EM volume (manual + automatic). <a href="#term-coregistration">Go to the card</a>.

Cre line
  Cre recombinase catalyses recombination between loxP sites. Paired with a loxP reporter line it drives the reporter's expression, and because Cre is expressed within a specific gene the expression is restricted to a subset of cells. <a href="#term-cre-line">Go to the card</a>.

ctr_pt_position
  The synapse-junction center point (not root-id-bound). <a href="#term-ctr-pt-position">Go to the card</a>.

Current source density (CSD)
  The second spatial derivative of the LFP along the probe, which localises current sinks and sources and so the laminar position of synaptic input. <a href="#term-current-source-density">Go to the card</a>.

d_prime (unit)
  Separability of this unit's waveforms from its neighbours', by linear discriminant analysis. Higher is better. Not the behavioural d-prime. <a href="#term-d-prime-unit">Go to the card</a>.

d-prime (behavioural)
  Signal-detection sensitivity for the task: how far the hit rate exceeds the false-alarm rate. Not the unit quality metric of the same name. <a href="#term-d-prime-behavior">Go to the card</a>.

Dash web apps
  Plotly-Dash apps (Table Viewer, Connectivity Viewer) for fast querying + Neuroglancer-link generation. <a href="#term-dash-web-apps">Go to the card</a>.

Datastack
  A named bundle of imagery + segmentation + annotation DB (minnie65_public, v1dd_public). <a href="#term-datastack">Go to the card</a>.

decoder_label
  The pipeline's automated call on what a unit is — sua for a single unit, and so on — with decoder_probability as its confidence. <a href="#term-decoder-label">Go to the card</a>.

Default quality filtering
  Visual Coding applies isi_violations, amplitude_cutoff and presence_ratio filters by default; Visual Behavior Neuropixels returns every unit unfiltered. Same SDK, opposite defaults — check which you are holding. <a href="#term-default-filters">Go to the card</a>.

default_qc
  A single pass/fail flag summarising the pipeline's quality criteria for a unit, in the AIND-packaged datasets. <a href="#term-default-qc">Go to the card</a>.

Depth / pia→WM axis
  y increases with cortical depth, so depth plots need ax.invert_yaxis(). <a href="#term-depth-pia-wm-axis">Go to the card</a>.

Digital twin
  A DNN trained to predict a cell's response to arbitrary stimuli (source of derived functional properties). <a href="#term-digital-twin">Go to the card</a>.

Direct vs indirect activation
  The central pitfall of optotagging: a neuron may respond to the laser because it expresses the opsin, or because a neuron that does synapses onto it. Direct responses are short-latency (<10 ms), reliable across pulses, and tightly distributed in time. <a href="#term-direct-vs-indirect">Go to the card</a>.

Distance
  Four geometric senses and two statistical ones are in routine use, and they give different answers for the same pair of points. <a href="#term-distance">Go to the card</a>.

Drift metrics
  max_drift and cumulative_drift record how far, in µm, a unit's spikes moved along the probe during the session. Newer pipelines add activity_drift and drift_ptp. <a href="#term-drift-metrics">Go to the card</a>.

Drifting gratings
  A full-field sinusoidal grating moving orthogonal to its own orientation. Parameters: orientation and direction (degrees), temporal frequency (Hz), spatial frequency (cycles/deg), contrast. Typically 2 s on, 1 s grey. <a href="#term-drifting-gratings">Go to the card</a>.

Driver line
  A transgenic line engineered to label a specific cell population by expressing a gene under that population's promoter. The driver line determines which cells are targeted; the reporter line determines what is expressed in them. <a href="#term-driver-line">Go to the card</a>.

DSI
  Direction selectivity index (0–1). <a href="#term-dsi">Go to the card</a>.

Dynamic foraging task
  Two choices, binary reward, and reward probabilities that change during the session. A go cue opens a short window in which the mouse licks left or right; the mouse must learn from recent outcomes to track the better side. <a href="#term-dynamic-foraging">Go to the card</a>.

Dynamic Routing task
  A context-dependent go/no-go task alternating visual and auditory blocks. The same stimulus is a target or not depending on the current block, so stimulus and meaning can be separated. <a href="#term-dynamic-routing">Go to the card</a>.

Edges
  Pairs of connected vertices (mesh.edges, skeleton edges). <a href="#term-edges">Go to the card</a>.

Electron microscopy (EM)
  Imaging that reaches nanometer resolution to reveal tissue ultrastructure. <a href="#term-electron-microscopy-em">Go to the card</a>.

Encoding vs decoding
  Encoding asks whether an event changes neural activity; decoding asks whether the event can be read back out of the activity. Same data, opposite direction. <a href="#term-encoding-vs-decoding">Go to the card</a>.

Enhancer AAV
  A virus carrying a cell-type-specific enhancer, used to restrict expression without breeding a transgenic line. <a href="#term-enhancer-aav">Go to the card</a>.

Environment secrets
  How the CAVE auth token is supplied when code runs on a shared or hosted machine: exported as environment variables named API_SECRET_<server> instead of being written to a credentials file in the home directory. <a href="#term-environment-secrets">Go to the card</a>.

Ephys
  Shorthand for electrophysiology. <a href="#term-ephys">Go to the card</a>.

Ephys selection bias
  Spike sorting needs enough spikes to form a cluster, so sparsely active neurons are missed and large-spike, high-rate neurons — and layer 5 — are over-represented. Ophys sees many of the cells ephys does not. <a href="#term-selection-bias-ephys">Go to the card</a>.

Epoch
  A labelled stretch of time — but of what, and on whose clock, differs everywhere it appears. <a href="#term-epoch">Go to the card</a>.

Error profiles
  The characteristic ways automated segmentation fails, and how they differ by compartment: thin axons are dominated by split errors, thicker dendrites and somata by merges. This asymmetry is why proofreading status is tracked separately for axon and dendrite. <a href="#term-error-profiles">Go to the card</a>.

Event detection
  Deconvolving ΔF/F into discrete events, here with the L0 method. At population imaging resolutions 1- and 2-spike events are detected unreliably, particularly with GCaMP6f. <a href="#term-event-detection">Go to the card</a>.

Evoked vs spontaneous
  Activity driven by a stimulus versus activity during the grey-screen epochs. The comparison that decides whether a response is a response at all. <a href="#term-evoked-vs-spontaneous">Go to the card</a>.

Excitatory V1 cell types
  Pyramidal subclasses by layer/projection: 23P, 4P, 5P-IT/ET/NP, 6P-IT/CT (+ mtype clusters L2a…L6wm). <a href="#term-excitatory-v1-cell-types">Go to the card</a>.

Experience level
  Whether the image set in a session is the one the mouse trained on (Familiar) or a different one (Novel). The axis the Visual Behavior datasets were built to test. <a href="#term-experience-level">Go to the card</a>.

Experiment
  There is no consistent use of this term. Establish which one is meant before joining anything. <a href="#term-experiment">Go to the card</a>.

Extended
  Arbor proofread to remove all merge AND split errors (correct and as-complete-as-possible). <a href="#term-extended">Go to the card</a>.

Extracellular electrophysiology
  Recording voltage from outside the cell membrane, which gives better access to intact brains than intracellular recording. Its two readouts are spikes and the local field potential. <a href="#term-electrophysiology">Go to the card</a>.

Eye tracking / pupil
  Ellipse fits to eye, pupil and corneal reflection per video frame, giving area, centre and rotation, plus a likely_blink flag. Recorded during physiology sessions but not during training. <a href="#term-eye-tracking">Go to the card</a>.

Faces
  Triangles of connected vertex indices that tile a mesh surface (mesh.faces). <a href="#term-faces">Go to the card</a>.

Fast spiking neuron (FSN)
  Narrow, fast action potentials; with enough injected current, high spike rates without frequency adaptation. In unlabelled extracellular recordings, narrow-waveform units are called fast spiking and putatively identified as PV+ cells. <a href="#term-fast-spiking-neuron">Go to the card</a>.

FIBSEM
  Focused-ion-beam SEM; block-face EM that mills & images, giving near-isotropic voxels. <a href="#term-fibsem">Go to the card</a>.

Field of view
  The imaged extent of one plane, in pixels and in µm. Recorded per experiment as field_of_view_width/height. <a href="#term-field-of-view">Go to the card</a>.

firing_rate
  Mean spike rate over the whole session. Low values may mean a sparsely active neuron or a badly detected one. <a href="#term-firing-rate">Go to the card</a>.

Fluorophore
  A molecule that absorbs light and re-emits it at a longer wavelength. Fluorophores fluoresce only while exposed to a light source. <a href="#term-fluorophore">Go to the card</a>.

Functional connectome
  A dataset linking synapse-resolution EM connectivity to recorded neural function in the same neurons. <a href="#term-functional-connectome">Go to the card</a>.

GABA
  The main inhibitory neurotransmitter in the mammalian brain. In cortex most GABAergic neurons are local interneurons. <a href="#term-gaba">Go to the card</a>.

Gabor patches
  Spatially restricted gratings. The receptive-field mapping stimulus in Visual Coding Neuropixels: 20° diameter, three orientations on a 9 × 9 grid of screen positions, identical in every session. <a href="#term-gabor-patches">Go to the card</a>.

GCaMP
  A family of GECI fusing calmodulin's calcium-binding domain to green fluorescent protein. GCaMP6f and 6s are the fast and slow variants, differing in sensitivity and especially in decay kinetics. <a href="#term-gcamp">Go to the card</a>.

Genetically-encoded calcium indicator (GECI)
GECI
  A protein expressed by a cell that changes its fluorescence on binding Ca²⁺, used to visualise neural activity with fluorescence microscopy. <a href="#term-geci">Go to the card</a>.

Golden Mouse (409828)
  The single V1DD mouse with functional coregistration. <a href="#term-golden-mouse-409828">Go to the card</a>.

gOSI / gDSI
  Global orientation/direction selectivity indices (vector-sum variant). <a href="#term-gosi-gdsi">Go to the card</a>.

Graphene (graphene://)
  URL protocol for dynamic, CAVE-backed (editable) segmentation/meshes, vs static precomputed://. <a href="#term-graphene-graphene">Go to the card</a>.

Graphene vs Precomputed
  graphene:// = dynamic/editable; precomputed:// = static. <a href="#term-graphene-vs-precomputed">Go to the card</a>.

Grids / Chunk
  The volume is partitioned into a 3D grid of chunks for the chunked-graph. <a href="#term-grids-chunk">Go to the card</a>.

Head fixation / head bar
  A surgically implanted bar clamps the mouse's head in a repeatable position — better than 10 µm across clamp cycles, which is what makes it possible to return to the same cells on a later day. <a href="#term-head-fixation">Go to the card</a>.

Higher visual area (HVA)
HVA
  A cortical visual area receiving input from primary visual cortex, and so higher in the visual hierarchy. In the mouse: VISl, VISal, VISpm, VISam, VISrl among others. <a href="#term-higher-visual-area">Go to the card</a>.

Hit / miss / false alarm / correct reject
  Lick within the 750 ms window after a change = hit; no lick after a change = miss; lick after a sham change = false alarm; withholding on a sham change = correct reject. Licking before the scheduled change aborts the trial. <a href="#term-trial-outcomes">Go to the card</a>.

Image set
  Which eight natural images a session used (G or H, A or B). Two images are shared between sets, so novelty is a property of the other six. <a href="#term-image-set">Go to the card</a>.

Imagery
  The 3D grayscale (0–255) array depicting EM ultrastructure. <a href="#term-imagery">Go to the card</a>.

Imaging depth
  Depth in µm below the cortical surface at which a plane was collected. Roughly: <250 layer 2/3, 250–350 layer 4, 350–500 layer 5, >500 layer 6 — but layer-specific Cre lines are the reliable way to get layer specificity. <a href="#term-imaging-depth">Go to the card</a>.

Imaging plane
  One two-photon focal plane. A single-plane microscope images one per session; the Multiscope/Mesoscope images up to eight. The plane, not the session, is what an ophys experiment is defined on. <a href="#term-imaging-plane">Go to the card</a>.

Indicator sparsification
  Calcium indicators respond non-linearly to firing rate: bursts are boosted, isolated spikes washed out. Tuning measured with ophys therefore looks sharper and sparser than the same tuning measured with ephys. <a href="#term-indicator-sparsification">Go to the card</a>.

Inhibitory V1 cell types
  Interneuron subclasses: BC, BPC, MC, NGC (manual) and PTC/DTC/STC/ITC (targeting-based mtypes). <a href="#term-inhibitory-v1-cell-types">Go to the card</a>.

Interneuron
  A neuron with short axons that synapses only with nearby neurons. In cortex the term is often used to mean an inhibitory neuron. <a href="#term-interneuron">Go to the card</a>.

Intrinsic signal imaging (ISI)
ISI
  Measuring blood-flow changes from the reflectance of red light on the brain surface. Commonly used to map retinotopy across the cortical surface and so to target later recordings. <a href="#term-intrinsic-signal-imaging">Go to the card</a>.

isi_violations
  Rate of inter-spike intervals shorter than the refractory period. A real neuron cannot fire that fast, so violations mean spikes from more than one cell were merged. Default threshold 0.5. <a href="#term-isi-violations">Go to the card</a>.

isolation_distance
  Distance in Mahalanobis space to the nearest other cluster of waveforms. Higher is better separated. <a href="#term-isolation-distance">Go to the card</a>.

IT / ET / NP / CT / SP
  Projection categories: intratelencephalic, extratelencephalic, near-projecting, corticothalamic, subplate. <a href="#term-it-et-np-ct-sp">Go to the card</a>.

Kilosort
  The template-matching sorter used for all Allen Neuropixels data. It merges automatically, so no manual curation step is needed for recordings with little drift. <a href="#term-kilosort">Go to the card</a>.

l_ratio
  Contamination measure related to isolation distance: the probability that nearby spikes belong to this cluster. Lower is better. <a href="#term-l-ratio">Go to the card</a>.

Layer (cortical)
  L1–L6 along the pia→WM axis; drives cell-type naming. NOT the Neuroglancer layer. <a href="#term-layer-cortical">Go to the card</a>.

Level of detail (LOD)
  Static meshes are smaller, multi-LOD, precomputed://; dynamic meshes are detailed, single-LOD, graphene://. <a href="#term-level-of-detail-lod">Go to the card</a>.

Local field potential (LFP)
LFP
Local field potential
  Transient electrical potential generated in nervous tissue by the summed activity of the cells in it, typically measured below 250 Hz. Informative about oscillations and network synchrony. <a href="#term-local-field-potential">Go to the card</a>.

Locally sparse noise
  Black and white spots flashed on a grey screen, arranged so no two spots fall within 5 pixels of each other. The exclusion zone is what makes the average around any pixel structureless, so a receptive field can be recovered. <a href="#term-locally-sparse-noise">Go to the card</a>.

Manifest
  The file a cache uses to know what data exists and where it was put. Instantiating a cache without naming one creates it in the working directory. There is no manifest when you read NWB directly; the file is the manifest. <a href="#term-manifest">Go to the card</a>.

Martinotti cell (MC)
Martinotti cell
  A subtype of SST cell that targets the apical dendrites of pyramidal cells in layer 1. Martinotti cells are found in layer 2/3 and layer 5. <a href="#term-martinotti-cell">Go to the card</a>.

Materialization & Versioning
  Timestamped snapshots of the annotation DB; each version = a fixed timestamp (MICrONS v1507, V1DD v1196). <a href="#term-materialization-versioning">Go to the card</a>.

Maximum / average projection
  The imaging movie collapsed over time into one image — the standard way to see every cell in a plane at once. <a href="#term-maximum-projection">Go to the card</a>.

Merge errors
  Two neurons' processes incorrectly joined; they add false connections. <a href="#term-merge-errors">Go to the card</a>.

Meshes
  Vertices + triangular faces defining a neuron's 3D outer surface. <a href="#term-meshes">Go to the card</a>.

MeshParty / Meshwork
  Python package + object bundling the L2 mesh, skeleton, and anno annotations, kept in sync. <a href="#term-meshparty-meshwork">Go to the card</a>.

Meshpoints
  Informal usage for mesh vertices. Not a formal term — say vertices, since “point” elsewhere means an annotation position. <a href="#term-meshpoints">Go to the card</a>.

MICrONS
  Cubic-millimeter functional-connectomics EM dataset of mouse visual cortex (VISp/VISal/VISrl). <a href="#term-microns">Go to the card</a>.

Minnie
  Internal name for the MICrONS dataset/mouse (minnie65; datastack minnie65_public). <a href="#term-minnie">Go to the card</a>.

Motion correction
  Registering every frame of the imaging movie to a reference before segmentation, so an ROI mask refers to the same cell throughout. <a href="#term-motion-correction">Go to the card</a>.

mtypes
  Morphology/connectivity-derived cell-type clusters (L2a…L6wm; PTC/DTC/STC/ITC). <a href="#term-mtypes">Go to the card</a>.

Natural movies
  Black and white film clips with natural spatial and temporal statistics — usually the opening shot of Touch of Evil, chosen because it is continuous, with no cuts and varied motion. <a href="#term-natural-movies">Go to the card</a>.

Natural scenes
  Black and white photographs with natural spatial statistics, flashed for 0.25 s with no gap. Visual Coding uses 118 images drawn from the Berkeley, van Hateren and McGill image sets. <a href="#term-natural-scenes">Go to the card</a>.

Neuroglancer
  WebGL browser viewer for very large volumetric connectomics data (imagery, segmentation, meshes, annotations). <a href="#term-neuroglancer">Go to the card</a>.

Neuroglancer forks
  Neuroglancer is maintained as several diverging branches. Spelunker is the one CAVE datastacks link to; the Seung-lab and FlyWire branches are the other widely used ones. States are broadly compatible but not identical. <a href="#term-neuroglancer-forks">Go to the card</a>.

Neuroglancer Layer (img/seg/ann)
  The data layers in a Neuroglancer state. NOT the cortical layer. <a href="#term-neuroglancer-layer-img-seg-ann">Go to the card</a>.

Neuroglancer State
  JSON object storing all layers/view/annotations, identified by a state id. <a href="#term-neuroglancer-state">Go to the card</a>.

Neurogliaform cell (NGC)
  An interneuron that makes a diffuse axonal arbor and is thought to release GABA through both synaptic release and volume transmission, non-selectively inhibiting nearby neurons. <a href="#term-neurogliaform-cell">Go to the card</a>.

Neuronal process
  An axon or dendrite branch of a neuron (a process that splits at branch points). <a href="#term-neuronal-process">Go to the card</a>.

Neuropil correction
  An annulus around the ROI, excluding nearby cells, gives a local neuropil signal. It is subtracted from the raw trace after weighting by a per-cell r value. <a href="#term-neuropil-correction">Go to the card</a>.

Neuropixels
  A family of silicon probes for high-channel-count single-unit extracellular recording, miniaturised with integrated-circuit design so that hundreds of units can be recorded from one probe with minimal brain damage. <a href="#term-neuropixels">Go to the card</a>.

nglui (statebuilder/parser)
  Python package to generate and parse Neuroglancer states from dataframes. <a href="#term-nglui-statebuilder-parser">Go to the card</a>.

nn_hit_rate / nn_miss_rate
  Nearest-neighbour estimates of contamination and of missing spikes respectively. <a href="#term-nn-hit-miss">Go to the card</a>.

Nodes
  Vertices in the skeleton / L2 graph. <a href="#term-nodes">Go to the card</a>.

NP 1.0 / 2.0 / Ultra / Opto
  1.0: 960 sites, ~20 µm pitch, ~3.8 mm span. 2.0: 1280 sites per shank, ~15 µm pitch. Ultra: 6 µm pitch, fine detail over a shorter span. Opto: 1.0 plus 28 on-shank light emission sites. All read out 384 channels at a time. <a href="#term-np-generations">Go to the card</a>.

NWB (Neurodata Without Borders)
  The standard file format for physiology and behaviour data. Visual Coding and Visual Behavior use an HDF5 backend; the newer datasets — V1DD, BCI, Dynamic Foraging, NP Ultra — use a Zarr backend optimised for cloud access. <a href="#term-nwb">Go to the card</a>.

NWB layout
  Every NWB file has the same top-level groups: general (subject, devices, electrodes or imaging planes), acquisition (signals as acquired), stimulus (what was presented), intervals (epochs, trials, blocks), processing (anything derived), units (sorted units, ephys only) and analysis (non-standard extras). What differs between datasets is what fills them — and where a dataset puts a thing is not always where you would guess, so print the tree first. <a href="#term-nwb-layout">Go to the card</a>.

Omission
  5% of non-change presentations are dropped, interrupting the expected stimulus cadence so that expectation signals can be measured. Omissions occur during recording but not during training, and never at or just before a change. <a href="#term-omission">Go to the card</a>.

Ophys
  Shorthand for optical physiology, often in reference to two-photon calcium imaging, but can also include other methods such as fiber photometry. <a href="#term-ophys">Go to the card</a>.

Ophys container
  The same imaging plane followed across days. Containers hold different numbers of sessions depending on which passed QC and how many retakes happened. <a href="#term-ophys-container">Go to the card</a>.

Ophys experiment
  One imaging plane in one session — the narrowest unit in the hierarchy, with its own imaging_depth and targeted_structure. Quality control passes or fails each plane separately. <a href="#term-ophys-experiment">Go to the card</a>.

Ophys session
  One continuous recording under the two-photon microscope. It contains one imaging plane on a single-plane scope and up to eight on the Multiscope. <a href="#term-ophys-session">Go to the card</a>.

Opsin
  A light-gated ion channel. Illumination changes its conformation, letting ions cross the membrane and either forcing the cell to spike (excitatory opsin) or suppressing spiking (inhibitory). <a href="#term-opsin">Go to the card</a>.

Optogenetics
  Controlling neural activity by expressing light-activated ion channels in a specific subpopulation — a reporter line for the opsin, a driver line for the population — giving temporally precise control of spiking. <a href="#term-optogenetics">Go to the card</a>.

Optotagging
  Using optogenetics to identify which recorded units belong to a genetically defined population, by their response to laser pulses. Trains of 10 ms pulses at 20 Hz are a common stimulus. <a href="#term-optotagging">Go to the card</a>.

Oracle score
  Visual-response reliability — signal correlation across repeated “oracle” movies. <a href="#term-oracle-score">Go to the card</a>.

OSI
  Orientation selectivity index (0–1). <a href="#term-osi">Go to the card</a>.

Parvalbumin-positive (PV+) neuron
Parvalbumin-positive interneuron
  Fast-spiking GABAergic interneurons with strong inhibitory effects on their neighbours; action potentials can be under 400 µs. Parvalbumin is a calcium buffer, so calcium imaging of these cells should be read cautiously. <a href="#term-pv-neuron">Go to the card</a>.

Passive replay block
  The same stimuli replayed with the lick spout retracted and no reward, so task-dependent modulation can be separated from stimulus drive. <a href="#term-passive-replay">Go to the card</a>.

Peak channel
  The channel on which a unit's mean waveform is largest. A unit carries no position of its own — joining peak_channel_id to the channels table is how it acquires a CCF location, a brain-region label and a depth. <a href="#term-peak-channel">Go to the card</a>.

Physiology
  The activity side of a functional-connectomics dataset: the calcium-imaging responses recorded from the same neurons that were later reconstructed in EM. <a href="#term-physiology">Go to the card</a>.

Position
  The 3D coordinate of a bound spatial point (pt_position, stored in voxels by default). <a href="#term-position">Go to the card</a>.

Precomputed format
  Storage representation for arbitrarily large images/meshes/skeletons. <a href="#term-precomputed-format">Go to the card</a>.

pref_dir
  Preferred direction in degrees (0–360; 0 = vertical bar moving right, CCW+). <a href="#term-pref-dir">Go to the card</a>.

pref_ori
  Preferred orientation in degrees (0–180). <a href="#term-pref-ori">Go to the card</a>.

presence_ratio
  Fraction of the session in which the unit had spikes. A low value usually means the unit drifted away from the probe. Default threshold 0.9. <a href="#term-presence-ratio">Go to the card</a>.

Probe / shank / channel / site
  The recording hierarchy: a probe carries one or more shanks, a shank is patterned with recording sites, and the subset wired out for recording at any moment are the channels. <a href="#term-probe-shank-channel">Go to the card</a>.

Project cache
  The AllenSDK entry point for the Brain Observatory datasets: it downloads what you ask for, keeps it in a known directory, and hands back manifest tables and session objects. Newer datasets have no cache — you open the NWB file yourself. <a href="#term-project-cache">Go to the card</a>.

Proofreading
  Manual correction of split/merge errors to make neurons biologically accurate/complete. <a href="#term-proofreading">Go to the card</a>.

PSTH
  Peri-stimulus time histogram: spikes binned relative to stimulus onset and averaged over trials, giving the time course of the response. <a href="#term-psth">Go to the card</a>.

PyChunkedGraph (PCG) / L2 graph
  Hierarchical representation: L0 = voxels, L1 = supervoxels, L2 = supervoxels grouped within a chunk. <a href="#term-pychunkedgraph-pcg-l2-graph">Go to the card</a>.

Pyramidal cell
  An excitatory neuron with a characteristic cell-body shape and apical dendrite. In visual cortex, by far the most common excitatory type. <a href="#term-pyramidal-cell">Go to the card</a>.

Q value / RPE
  Latent variables of a reinforcement-learning fit to foraging behaviour: the expected value of each choice, and the reward prediction error that updates it. Useful precisely because they can then be regressed against neural activity. <a href="#term-q-value-rpe">Go to the card</a>.

query_table / synapse_query
  The two query entry points + filter_in_dict; note the 200k-row cap, desired_resolution, select_columns, split_positions. <a href="#term-query-table-synapse-query">Go to the card</a>.

Radius
  Half the cable thickness at a skeleton vertex (µm). <a href="#term-radius">Go to the card</a>.

readout_loc_x/y
  Approximate receptive-field center in stimulus space. <a href="#term-readout-loc-x-y">Go to the card</a>.

Receptive field
  The region of the stimulus domain in which a stimulus must lie to evoke a response. Generalises beyond space to any stimulus dimension, and so to the stimulus features that drive a cell. <a href="#term-receptive-field">Go to the card</a>.

Reference table
  A table linked to another (usually nucleus_detection_v0) by shared annotation id, adding _ref columns. <a href="#term-reference-table">Go to the card</a>.

Regular spiking neuron (RS)
  Longer action potentials and spike-frequency adaptation — the rate falls over a sustained current step. The most common cortical type, usually associated with excitatory pyramidal neurons. <a href="#term-regular-spiking-neuron">Go to the card</a>.

Reporter line
  A transgenic line engineered to express a protein that monitors or manipulates activity — GFP, GCaMP, channelrhodopsin — but only once the controlling protein (Cre or FLP) is present. <a href="#term-reporter-line">Go to the card</a>.

Residual / Separation score
  The two coregistration-quality metrics. <a href="#term-residual-separation-score">Go to the card</a>.

Resolution
  Physical voxel size in nm/voxel (MICrONS 4×4×40; V1DD 9×9×45); set per query via desired_resolution. <a href="#term-resolution">Go to the card</a>.

Response modulation index (RMI)
  The normalised contrast between visual and auditory target response rates, collapsing two hit rates into one number that says which context the mouse is behaving in. <a href="#term-rmi">Go to the card</a>.

Retake
  A second attempt at a session_type after the first failed QC. Why prior_exposures_to_image_set and not session_type tells you whether a session was truly the first with novel images. <a href="#term-retake">Go to the card</a>.

Retinotopy
retinotopic map
  The mapping of visual space onto neural space: neighbouring points in the visual field are represented by neighbouring points in the brain. Measured as altitude (upper–lower) and azimuth (left–right). <a href="#term-retinotopy">Go to the card</a>.

ROI mask
ROI
  The pixel mask for one segmented cell in an imaging plane. In two-photon data an ROI is the set of pixels thought to belong to a single neuron. <a href="#term-roi-mask">Go to the card</a>.

Root_id (pt_root_id)
  Unique integer for a specific segmentation = a specific version of a cell (a.k.a. segment / object id). <a href="#term-root-id-pt-root-id">Go to the card</a>.

Running speed
  Speed on the running disc, temporally aligned to the activity traces. Same length as ΔF/F, so a stimulus epoch indexes into both. <a href="#term-running-speed">Go to the card</a>.

Saccade
  A rapid ballistic eye movement between fixation points. Mice are not foveal animals and their eye movements differ from those of foveal species. <a href="#term-saccade">Go to the card</a>.

Scan
  The scan_idx from functional imaging; part of the ROI's unique id. <a href="#term-scan">Go to the card</a>.

Segmentation
  A 3D array where each voxel stores the root_id of the object at that location. <a href="#term-segmentation">Go to the card</a>.

Segments (= root/object id)
  “Segment id” used as a synonym for root id — collides with the skeleton sense of “segment”. <a href="#term-segments-root-object-id">Go to the card</a>.

Segments (skeleton)
  An unbranched run of vertices between branch/end points. <a href="#term-segments-skeleton">Go to the card</a>.

Serial-section EM
  Many ultrathin sections are cut from a block, imaged one by one, then re-aligned into a volume. Resolution is fine in x/y and coarse in z, so voxels are strongly anisotropic. <a href="#term-serial-section-em">Go to the card</a>.

Session
  The databook defines it as “a physiological and/or behavioral recording that happens at one time”, but four narrower senses are in use as identifiers. <a href="#term-session">Go to the card</a>.

Share link / middleauth
  Authenticated state-sharing mechanism. <a href="#term-share-link-middleauth">Go to the card</a>.

Signal vs noise correlation
  Signal correlation compares two cells' mean responses across stimulus conditions — do they like the same things. Noise correlation compares their trial-to-trial fluctuations to the same condition — do they vary together. <a href="#term-signal-noise-correlation">Go to the card</a>.

Single unit vs multi-unit
  Not two categories but a gradient, from complete and uncontaminated to incomplete and highly contaminated. Every analysis still has to draw a binary line somewhere; quality metrics are how you draw it deliberately. <a href="#term-single-vs-multi-unit">Go to the card</a>.

Skeletons
  Tree-like linear representation of a neuron's branching (vertices + edges, radius, compartments). <a href="#term-skeletons">Go to the card</a>.

snr
  Waveform amplitude relative to background noise on the peak channel. <a href="#term-snr-unit">Go to the card</a>.

Somatostatin (SST) cell
Somatostatin cell
  An inhibitory interneuron expressing somatostatin (SST, sometimes SOM). SST cells tend to target the distal dendrites of excitatory neurons, and have important roles in regulating their activity. <a href="#term-somatostatin-sst-cell">Go to the card</a>.

Source
  Disambiguation: image_source/segmentation_source, the Neuroglancer layer source, and skeleton path_between(source,…). <a href="#term-source">Go to the card</a>.

Source (presynaptic)
  The presynaptic partner of a synapse (pre_pt_root_id). <a href="#term-source-presynaptic">Go to the card</a>.

Spatial frequency
  How often the sinusoidal components of a signal repeat per unit distance — for a grating, the spacing of its bars. Typically cycles per degree. <a href="#term-spatial-frequency">Go to the card</a>.

Spike band / LFP band
  The two streams split off each channel: the spike band at 30 kHz with a 500 Hz high-pass, carrying action potentials from adjacent neurons; the LFP band at 2.5 kHz, carrying low-frequency fluctuations from a wider area. <a href="#term-spike-band-lfp-band">Go to the card</a>.

Spike raster
  One row per trial, one tick per spike, aligned on an event. The plot to make before any model, because it shows trial-to-trial structure that an average hides. <a href="#term-raster">Go to the card</a>.

Spike sorting
  Assigning detected spikes to individual neurons — a blind source separation problem. Detection, extraction, feature extraction, clustering, then validation against the refractory period. <a href="#term-spike-sorting">Go to the card</a>.

Split errors
  A process incorrectly appears to stop; they remove true connections. <a href="#term-split-errors">Go to the card</a>.

Spontaneous activity
  An epoch of mean-luminance grey with no patterned stimulus, included in most sessions as a baseline for visually evoked activity. <a href="#term-spontaneous-activity">Go to the card</a>.

standard_transform
  Package converting voxel/nm coordinates to pia-flattened micron coordinates (minnie_ds, v1dd_ds). <a href="#term-standard-transform">Go to the card</a>.

State
  Four unrelated meanings, two of which appear in the same workshop. <a href="#term-state">Go to the card</a>.

Static gratings
  A stationary full-field sinusoidal grating flashed for 0.25 s. No temporal frequency; phase becomes a parameter instead. <a href="#term-static-gratings">Go to the card</a>.

Status flags
  Booleans status_axon/status_dendrite recording whether each arbor was proofread, plus valid_id (root id at assessment). <a href="#term-status-flags">Go to the card</a>.

Stimulus epoch table
  When each interleaved stimulus block began and ended. In Visual Coding 2P the bounds are given as imaging frames, so they index directly into the ΔF/F and running-speed traces. <a href="#term-stimulus-epoch-table">Go to the card</a>.

Stimulus presentations table
  One row per stimulus shown, with its parameters and its start_time and stop_time. The table every alignment starts from. In NWB it lives under stimulus/presentation, or as a TimeIntervals table under intervals — which one depends on the dataset. <a href="#term-stimulus-presentations">Go to the card</a>.

Stimulus template
  The literal image shown, stored alongside the stimulus table for image and movie stimuli. Often available both unwarped and warped — the warped version is what the monitor rendered. <a href="#term-stimulus-template">Go to the card</a>.

Strategy values
  dendrite_clean, dendrite_extended, axon_partially_extended, axon_fully_extended, axon_interareal (MICrONS only), none. <a href="#term-strategy-values">Go to the card</a>.

Structure acronym
  The CCF region label attached to a channel or unit — VISp, MOs, LSr. A unit with no CCF registration gets coordinates of [-1, -1, -1]. <a href="#term-structure-acronym">Go to the card</a>.

Supervoxel (pt_supervoxel_id)
  L1 grouping of voxels within a chunk; the stable internal id an annotation binds to. <a href="#term-supervoxel-pt-supervoxel-id">Go to the card</a>.

Surround suppression
  A stimulus extending beyond a cell's classical receptive field suppresses its response. Stronger in superficial layers, and one of the questions V1DD's windowed and full-field gratings were designed to address. <a href="#term-surround-suppression">Go to the card</a>.

SWC format
  Standard skeleton file format (one of three: SWC, meshwork-h5, precomputed). <a href="#term-swc-format">Go to the card</a>.

Synapse size
  Synapse size in voxels; correlates with surface area / strength. <a href="#term-synapse-size">Go to the card</a>.

synapse_target_predictions_ssa
  Per-synapse postsynaptic-compartment prediction (soma / spine / shaft). <a href="#term-synapse-target-predictions-ssa">Go to the card</a>.

synapses_pni_2 / synapses_v1dd
  The sole synapse tables (337M / 639M rows). <a href="#term-synapses-pni-2-synapses-v1dd">Go to the card</a>.

Table Viewer
  Dash app to query/filter one table and select rows in Neuroglancer. <a href="#term-table-viewer">Go to the card</a>.

Tables
  CAVE annotation tables (synapses, nuclei, cell types, proofreading, coregistration). <a href="#term-tables">Go to the card</a>.

Tags / Shortcuts
  Keyboard-driven annotation labels for fast bulk labeling in Neuroglancer. <a href="#term-tags-shortcuts">Go to the card</a>.

Target
  Disambiguation: target_id (reference link) vs synaptic postsynaptic partner vs path target_index. <a href="#term-target">Go to the card</a>.

Target (postsynaptic)
  The postsynaptic partner of a synapse (post_pt_root_id). <a href="#term-target-postsynaptic">Go to the card</a>.

TEASAR
  Algorithm that turns the L2 graph into a skeleton tree. <a href="#term-teasar">Go to the card</a>.

TEM
  Transmission EM; MICrONS/V1DD are serial-section TEM-style (thin sections, anisotropic z). <a href="#term-tem">Go to the card</a>.

Temporal frequency
  How many complete periods the signal goes through per unit time. Typically Hz. <a href="#term-temporal-frequency">Go to the card</a>.

Three-photon (3P) imaging
  Raises signal-to-noise for deep imaging of densely labelled tissue. Used to extend the V1DD centre column to white matter, where 2P image quality has degraded. <a href="#term-three-photon-imaging">Go to the card</a>.

Token / auth
  Google-account credential required before any programmatic access, saved per server. <a href="#term-token-auth">Go to the card</a>.

Transgenic line
  A mouse line whose genome has been altered by introducing foreign DNA. Here, typically a Cre line driving expression of a reporter line within a specific subset of cells. <a href="#term-transgenic-line">Go to the card</a>.

Trials table
  One row per trial: timing landmarks and outcome flags. Usually nwb.intervals['trials'], but not always — the BCI dataset keeps its trials under stimulus/presentation, because there the lickport is driven by the neuron. And a “trial” is not always behavioural: in the cell-type look-up table it is a laser pulse train. <a href="#term-trials-table">Go to the card</a>.

Tuning curve
  Mean response plotted against a stimulus parameter. The shape of the curve is what selectivity indices such as OSI and DSI summarise in one number. <a href="#term-tuning-curve">Go to the card</a>.

Two-photon calcium imaging
  Measuring neural activity through a fluorescent calcium indicator such as GCaMP. At rest a neuron has low calcium; when it spikes, calcium flows in, binds the indicator and raises the emitted fluorescence. <a href="#term-two-photon-calcium-imaging">Go to the card</a>.

Two-photon excitation
  Two long-wavelength photons excite one fluorophore. Absorption is non-linear in photon density, so only a single voxel is excited at a time — that is what gives optical sectioning in intact tissue. <a href="#term-two-photon-excitation">Go to the card</a>.

Types of errors in imagery
  Section/alignment artifacts (folds, cracks, missing sections) that propagate into segmentation. <a href="#term-types-of-errors-in-imagery">Go to the card</a>.

Ultrastructure
  Fine sub-cellular EM features: organelles, mitochondria, synapses, myelin. <a href="#term-ultrastructure">Go to the card</a>.

Unit
  Two different recording modalities use this word for their basic recorded element, and they are not the same thing. <a href="#term-unit">Go to the card</a>.

Unit quality metrics
  Per-unit numbers describing how badly spike sorting may have gone wrong for that unit — contamination from other neurons, spikes missed, or the unit drifting away. None is perfect; which thresholds apply depends on the analysis. <a href="#term-quality-metrics">Go to the card</a>.

Units table
  One row per sorted unit: spike times, mean waveform, quality metrics, and the peak channel that gives it a location. The primary table of any ephys dataset. <a href="#term-units-table">Go to the card</a>.

Unproofread
  An arbor that has not been comprehensively corrected. It is truncated by split errors and may carry merged fragments of other cells, so its apparent partners are unreliable. <a href="#term-unproofread">Go to the card</a>.

V1DD (V1 Deep-Dive)
  Functional (2p/3p calcium) + EM dataset of V1 across all layers in 4 mice (~50k neurons/mouse). <a href="#term-v1dd-v1-deep-dive">Go to the card</a>.

V1DD functional index
  V1DD's Golden-Mouse column/volume/plane/roi scheme, distinct from MICrONS session/scan/unit. <a href="#term-v1dd-functional-index">Go to the card</a>.

valid_roi
  The ophys equivalent of a unit quality flag: whether cell classification judged a segmented ROI to be a real cell. Only valid ROIs are released. <a href="#term-valid-roi">Go to the card</a>.

Vertex / Vertices
  Points in 3D (N×3, nanometers) that, connected, build meshes and skeletons. <a href="#term-vertex-vertices">Go to the card</a>.

VIP cell
  An inhibitory interneuron expressing Vasoactive Intestinal Protein. VIP cells tend to target somatostatin cells rather than excitatory neurons; this role as a “disinhibitory specialist” is thought to matter for context-dependent modulation of cortical activity. <a href="#term-vip-cell">Go to the card</a>.

VISp / VISal / VISrl
Primary visual cortex
V1
VISp
  The visual cortical areas (V1 / AL / RL / LM) the volume spans and assigns. <a href="#term-visp-visal-visrl">Go to the card</a>.

Volume
  A cubic-mm 3D EM image dataset spanning a cortical region. <a href="#term-volume">Go to the card</a>.

VORTEX
  NIH program (Virtual Observatory of the Cortex) funding continued proofreading; source of the vortex_* tables. <a href="#term-vortex">Go to the card</a>.

Voxel
  The smallest 3D image unit; anisotropic 4×4×40 nm (MICrONS) / 9×9×45 nm (V1DD). <a href="#term-voxel">Go to the card</a>.

Watertight
  EM meshes are NOT watertight, so Trimesh .volume/.center_mass are invalid. <a href="#term-watertight">Go to the card</a>.

Waveform
  The voltage over time measured at an electrode when a neuron fires an action potential. The per-unit mean waveform is what the shape metrics are computed from. <a href="#term-waveform">Go to the card</a>.

ΔF/F (dF/F)
  Change in fluorescence normalised by a baseline. The baseline is the median fluorescence in a 180 s window centred on each time point, so ΔF/F is a relative, unitless signal. <a href="#term-df-f">Go to the card</a>.
:::::
::::::

:::{note}
This page is generated from [`855c456`](https://github.com/AllenInstitute/allen-connectomics-glossary/commit/855c456f480bac600d71aa14bdfad1043cccd558) of the
[Allen Glossary](https://github.com/AllenInstitute/allen-connectomics-glossary) repository.
Do not edit it directly &mdash; edits are overwritten the next time it is regenerated.
To fix a definition or add a term, open a pull request against that repository.
:::
