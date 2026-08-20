// build-glossary-page.mjs — render the Allen Glossary into databook/glossary.md.
//
//   node scripts/build-glossary-page.mjs \
//     --source /path/to/allen-connectomics-glossary \
//     --out databook/glossary.md
//
// The glossary lives in its own repository and is the source of truth for the
// definitions. This script only reads it — never writes to it — and turns its
// data/ directory into one MyST page for the databook: cards, the category
// pills that double as filters, the legends, and a search box.
//
// The output is a single Markdown file, so nothing else in the databook has to
// change: it overwrites databook/glossary.md in place and the existing
// `- file: glossary` entry in _toc.yml keeps working.
//
// Three choices worth knowing about:
//
//  * The cards are rendered here, not in the browser. The page is complete
//    HTML before any JavaScript runs, so it prints, survives JS being off and
//    does not flash empty on load. The script only hides and shows what is
//    already in the DOM.
//
//  * Output is deterministic: same data in, byte-identical file out. There is
//    no generated-at timestamp unless you pass --stamp, so the sync workflow
//    only opens a PR when the glossary itself actually changed.
//
//  * The renderer lives here rather than in the glossary repository, so the
//    databook owns how it presents the data and the glossary stays a pure
//    source. The cost is that upstream changes land here unannounced, so the
//    script sorts them by how bad they are: something that would produce a
//    wrong page — a term in a category that does not exist — stops the build
//    with the offending term id, while something that merely costs a
//    cross-reference its link — a stale entry in the alias map — warns and
//    carries on. A hand-maintained file will rot, and one dead alias must not
//    be able to freeze every future glossary update. --strict makes the
//    survivable cases fatal too, for checking the alias map deliberately.

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { execFileSync } from "node:child_process";

/* ── arguments ───────────────────────────────────────────────── */

const argv = process.argv.slice(2);
const flag = name => {
  const i = argv.indexOf(name);
  return i === -1 ? null : argv[i + 1];
};

const USAGE = "usage: node scripts/build-glossary-page.mjs --source <glossary-checkout> --out <path/to/glossary.md> [--repo <owner/name>] [--commit <sha>] [--aliases <path.json>] [--preview <path.html>] [--stamp]";

const SOURCE = flag("--source");
const OUT = flag("--out");
if (!SOURCE || !OUT) {
  console.error(USAGE);
  process.exit(2);
}

const ROOT = path.resolve(SOURCE);
if (!fs.existsSync(path.join(ROOT, "data", "terms.js"))) {
  console.error(`error: ${ROOT} does not look like an allen-connectomics-glossary checkout (no data/terms.js).`);
  process.exit(2);
}

const STAMP = argv.includes("--stamp");
const STRICT = argv.includes("--strict");

// Warnings need to reach a person. On a runner that means an annotation, which
// shows on the run summary and against the pull request the sync opens.
const IN_ACTIONS = process.env.GITHUB_ACTIONS === "true";
const warn = msg => console.warn(`${IN_ACTIONS ? "::warning::" : "warning: "}${msg}`);

// Where the glossary lives, as owner/name. Everything the page links back to is
// derived from this, so a fork building its own copy points at its own glossary
// rather than at the canonical one.
const REPO = (flag("--repo") || "AllenInstitute/allen-connectomics-glossary").replace(/^\/+|\/+$/g, "");
if (!/^[\w.-]+\/[\w.-]+$/.test(REPO)) {
  console.error(`error: --repo must look like owner/name, got "${REPO}"`);
  process.exit(2);
}
const [REPO_OWNER, REPO_NAME] = REPO.split("/");
const REPO_URL = `https://github.com/${REPO}`;
// GitHub Pages serves a project site from the lower-cased owner
const SITE_URL = `https://${REPO_OWNER.toLowerCase()}.github.io/${REPO_NAME}/`;

// Alias map, read from beside the output page unless told otherwise. Optional:
// without it the page still builds, just with fewer cross-references resolving.
const ALIAS_PATH = flag("--aliases") ||
  path.join(path.dirname(path.resolve(OUT)), "glossary-aliases.json");

const COMMIT = flag("--commit") || (() => {
  try {
    return execFileSync("git", ["-C", ROOT, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
  } catch {
    return null;   // not a checkout, or no git — provenance line degrades to the repo link
  }
})();

/* ── load the glossary's data/ ───────────────────────────────── */

// The data files are plain JSON wrapped in `window.X =` so the site works over
// file://. Run them against a stand-in window rather than parsing them, so this
// script never disagrees with what the browser would load.
function loadData() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  for (const f of ["config.js", "terms.js", "diagrams.js"]) {
    const src = fs.readFileSync(path.join(ROOT, "data", f), "utf8");
    vm.runInContext(src, sandbox, { filename: f });
  }
  return sandbox.window;
}

const W = loadData();
const SITE = W.SITE;
const CATS = W.CATEGORIES;
const CAT = Object.fromEntries(CATS.map(c => [c.id, c]));
const DISCIPLINES = W.DISCIPLINES || [];
const DS = W.DATASETS;
const ANATOMY = W.ANATOMY;
const TERMS = W.TERMS;
const DIAG = W.DIAGRAMS || {};

/* ── helpers ─────────────────────────────────────────────────── */

const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const strip = s => String(s).replace(/<[^>]+>/g, "");
// definitions are authored with entities (&amp;, &lt;) — undo them for the
// search haystack so a query for "&" or "<" behaves the way a reader expects
const unent = s => String(s).replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");

const byName = (a, b) => a.term.toLowerCase().localeCompare(b.term.toLowerCase());

/* ── card ────────────────────────────────────────────────────── */

// The search haystack rides on the element, so filtering never has to touch the
// source data — the page carries everything it needs.
function haystack(t) {
  return [
    t.term,
    unent(strip(t.def)),
    CAT[t.category] ? CAT[t.category].label : t.category,
    (t.datasets || []).map(d => (DS[d] ? DS[d].label : d)).join(" "),
  ].join(" ").toLowerCase();
}

function cardHTML(t) {
  const c = CAT[t.category];
  if (!c) throw new Error(`term "${t.id}" has unknown category "${t.category}"`);
  const svg = t.diagram ? DIAG[t.diagram] : null;

  const chips = [];
  if (t.datasets && t.datasets.length === 1) {
    const d = DS[t.datasets[0]];
    chips.push(`<span class="acg-chip acg-ds">${esc(d ? d.label : t.datasets[0])} only</span>`);
  }
  if ((t.flags || []).includes("ambiguous")) {
    chips.push(`<span class="acg-chip acg-warn" title="This word means different things in different places">&#9888; ambiguous</span>`);
  }
  if ((t.flags || []).includes("context")) {
    chips.push(`<span class="acg-chip acg-aside" title="An adjacent method, not used to acquire these datasets">adjacent method</span>`);
  }
  for (const [k, url] of Object.entries(t.ng || {})) {
    if (!url) continue;
    chips.push(`<a class="acg-chip acg-ng" href="${esc(url)}" target="_blank" rel="noopener">${esc(DS[k] ? DS[k].label : k)} &#8599;</a>`);
  }
  // A term's source chip cites where the definition came from. Most of them
  // cite the databook — which is where this page now lives, so citing it as an
  // external source is circular. Three cases:
  //
  //   * the databook's own glossary: that is this page. Dropped.
  //   * another databook page: kept, but as an internal link that stays in the
  //     book rather than bouncing the reader to the published copy of it.
  //   * anywhere else: left alone.
  const src = t.source && t.source.url ? String(t.source.url) : null;
  if (src) {
    const inBook = src.match(/^https?:\/\/allenswdb\.github\.io\/(.*)$/i);
    if (!inBook) {
      chips.push(`<a class="acg-chip acg-src" href="${esc(src)}" target="_blank" rel="noopener">${esc(t.source.label)} &#8599;</a>`);
    } else {
      const rel = inBook[1].replace(/^\/+/, "");
      // glossary.html, or the site root, is this page
      if (rel && !/^glossary\.html(#.*)?$/i.test(rel)) {
        chips.push(`<a class="acg-chip acg-src" href="${esc(rel)}">in this book</a>`);
      }
    }
  }

  return [
    `<article class="acg-card" id="term-${esc(t.id)}" data-cat="${esc(t.category)}" data-hay="${esc(haystack(t))}">`,
    svg ? `<div class="acg-art">${svg}</div>` : "",
    `<div class="acg-eb" style="color:${esc(c.color)}">${esc(c.short)}</div>`,
    `<h3 class="acg-h"><a class="acg-name" href="#term-${esc(t.id)}" title="Link to this term">${esc(t.term)}</a></h3>`,
    `<p class="acg-def">${t.def}</p>`,
    chips.length ? `<div class="acg-meta">${chips.join("")}</div>` : "",
    `</article>`,
  ].filter(Boolean).join("\n    ");
}

/* ── legends ─────────────────────────────────────────────────── */

// Pills are grouped by discipline. With connectomics and physiology terms in one
// glossary, the discipline is the first cut a reader makes, and grouping the
// pills gets that for free without adding a second control.
function pillsHTML() {
  const groups = [
    ...DISCIPLINES.map(d => ({ id: d.id, label: d.label })),
    { id: "both", label: "Both" },
  ];
  const seen = new Set();
  const blocks = groups.map(g => {
    const items = CATS.filter(c => c.discipline === g.id);
    items.forEach(c => seen.add(c.id));
    if (!items.length) return "";
    return `<div class="acg-pillgroup">
        <span class="acg-glabel">${esc(g.label)}</span>
        ${items.map(pill).join("\n        ")}
      </div>`;
  });
  // anything whose discipline is missing or unrecognised still gets a pill
  const rest = CATS.filter(c => !seen.has(c.id));
  if (rest.length) {
    blocks.push(`<div class="acg-pillgroup">
        <span class="acg-glabel">Other</span>
        ${rest.map(pill).join("\n        ")}
      </div>`);
  }
  return blocks.filter(Boolean).join("\n      ");
}

function pill(c) {
  const n = TERMS.filter(t => t.category === c.id).length;
  return `<button type="button" class="acg-pill" data-cat="${esc(c.id)}" style="--cc:${esc(c.color)}" aria-pressed="false"><i></i>${esc(c.label)}<span class="acg-n">${n}</span></button>`;
}

function anatomyHTML() {
  return ANATOMY.map(a =>
    `<span><i style="background:var(--${esc(a.id)})"></i>${esc(a.label)}</span>`).join("\n        ");
}

/* ── term index ──────────────────────────────────────────────── */

// The cards live in a `{raw} html` block, and Sphinx neither indexes raw HTML
// for its own search nor registers cross-reference targets in it. So the same
// terms are emitted a second time as a real MyST `{glossary}` directive, folded
// as a plain list. That buys two things the cards cannot:
//
//   * `{term}`Neuroglancer`` from anywhere else in the databook resolves again
//     (matching is case-insensitive), instead of warning and rendering as
//     plain text under `jb build -n`;
//   * the databook's own search box finds glossary terms.
//
// Matching is on the term name exactly as written in data/terms.js. Names that
// differ from what the databook writes — "basket cell" here vs "Basket cell
// (BC)" upstream — will not resolve, and deliberately are not guessed at: a
// derived alias that strips "(BC)" also turns "d_prime (unit)" into "unit" and
// silently points a cross-reference at the wrong definition. Aliases belong in
// data/terms.js as an explicit field.
const plain = s => unent(strip(String(s))).replace(/\s+/g, " ").trim();

// The databook and the glossary do not always spell a term the same way, so an
// entry can carry extra names. A glossary directive accepts several term lines
// above one definition, and each becomes its own cross-reference target.
//
// Everything here is validated rather than trusted: an id that no longer exists
// upstream, or an alias that shadows a real term name, fails the build. A wrong
// alias is worse than a missing one — it silently sends a reader to the wrong
// definition — so nothing is guessed at from the term text.
function loadAliases() {
  if (!fs.existsSync(ALIAS_PATH)) {
    console.warn(`note: no alias map at ${ALIAS_PATH}; cross-references rely on exact name matches`);
    return new Map();
  }

  const raw = JSON.parse(fs.readFileSync(ALIAS_PATH, "utf8"));
  const byId = new Map(TERMS.map(t => [t.id, t]));
  const names = new Set(TERMS.map(t => String(t.term).trim().toLowerCase()));

  const out = new Map();          // term id -> [alias, ...]
  const unknown = [], shadowed = [];

  for (const [alias, id] of Object.entries(raw.aliases || {})) {
    const a = alias.trim();
    if (!byId.has(id)) { unknown.push(`${a} -> ${id}`); continue; }
    // an alias equal to a real term name would define that term twice, which
    // Sphinx reports as a duplicate description
    if (names.has(a.toLowerCase())) { shadowed.push(a); continue; }
    if (!out.has(id)) out.set(id, []);
    out.get(id).push(a);
  }

  // A stale entry is skipped, not fatal. This file is maintained by hand and
  // the glossary moves on its own schedule, so entries will rot; making that
  // stop the build would mean one dead alias freezes every future glossary
  // update, which is far worse than a handful of references losing their link.
  // Both cases below degrade to exactly what no alias at all would give.
  //
  // Pass --strict to turn them back into errors when checking the file itself.
  const notes = [];
  if (unknown.length) {
    notes.push(`${unknown.length} alias(es) point at a term the glossary no longer has ` +
      `(renamed or removed upstream): ${unknown.join(", ")}. Those references will not link.`);
  }
  if (shadowed.length) {
    notes.push(`${shadowed.length} alias(es) are now redundant — the glossary defines that ` +
      `name itself: ${shadowed.join(", ")}. Safe to delete from ${path.basename(ALIAS_PATH)}.`);
  }
  for (const n of notes) warn(n);
  if (notes.length && STRICT) {
    throw new Error(`${ALIAS_PATH}: stale entries, and --strict was given.`);
  }

  const n = [...out.values()].reduce((s, a) => s + a.length, 0);
  console.log(`aliases: ${n} extra name(s) across ${out.size} term(s)` +
    (notes.length ? `, ${unknown.length + shadowed.length} stale` : ""));
  return out;
}

function termIndex() {
  const aliases = loadAliases();
  const seen = new Map();
  const dupes = [];
  const entries = [];

  for (const t of [...TERMS].sort(byName)) {
    const name = String(t.term).trim();
    const key = name.toLowerCase();
    if (seen.has(key)) { dupes.push(name); continue; }   // a repeated term name would fail the build
    seen.set(key, t.id);
    // the definition is one paragraph, so a stray newline cannot break out of
    // the indented block the glossary directive expects
    const def = plain(t.def) || "See the card above.";
    const lines = [name, ...(aliases.get(t.id) || [])].join("\n");
    entries.push(`${lines}\n  ${def} <a href="#term-${esc(t.id)}">Go to the card</a>.`);
  }

  if (dupes.length) {
    warn(`${dupes.length} duplicate term name(s) left out of the index: ${dupes.join(", ")}`);
  }

  return { count: entries.length, body: entries.join("\n\n") };
}

/* ── page ────────────────────────────────────────────────────── */

const CSS = `
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
.acg-legend > summary::before{content:"\\25B8 "; color:var(--faint)}
.acg-legend[open] > summary::before{content:"\\25BE "}
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
`.trim();

// No template literals and no "</" sequences in here: the whole thing is emitted
// verbatim inside a <script> tag in a raw HTML block.
const JS = `
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

  function escapeRx(s){ return s.replace(/[.*+?^\${}()|[\\]\\\\]/g, "\\\\$&"); }

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
`.trim();

// The style / markup / script trio, shared verbatim by the databook page and the
// standalone preview so what you eyeball locally is what the databook renders.
function bodyHTML() {
  const sorted = [...TERMS].sort(byName);
  const withArt = sorted.filter(t => t.diagram && DIAG[t.diagram]).length;

  const refs = (SITE.references || [])
    .filter(r => !/allenswdb\.github\.io/.test(r.url))   // don't link the databook to itself
    .map(r => `<a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.label)}</a>`)
    .join(" &middot; ");

  return `\
<style>
${CSS}
</style>

<div class="acg-root" id="acg">

  <div class="acg-bar">
    <label class="acg-search">
      <svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="7" cy="7" r="4.6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M10.4 10.4 14 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
      <input class="acg-q" type="search" placeholder="Search terms and definitions&#8230;" aria-label="Search the glossary" autocomplete="off" spellcheck="false">
    </label>
    <span class="acg-count">${TERMS.length} terms</span>
  </div>

  <div class="acg-legends">
    <details class="acg-legend" open>
      <summary>Category <span class="acg-hint">&#8212; the colour on a card's edge. Click to filter.</span></summary>
      <div class="acg-body">
      ${pillsHTML()}
        <button type="button" class="acg-clear" hidden>show all</button>
      </div>
    </details>
    <details class="acg-legend">
      <summary>Illustration <span class="acg-hint">&#8212; colour inside a drawing means anatomy, never category</span></summary>
      <div class="acg-body acg-anat">
        ${anatomyHTML()}
      </div>
      <p class="acg-caveat">The illustrations are generated rather than hand-drawn. They are being
      checked by the people who know the data, but errors cannot be ruled out at this stage &#8212;
      read them as sketches of the idea, and trust the definition over the picture.
      ${withArt} of ${TERMS.length} terms have one.</p>
    </details>
  </div>

  <div class="acg-grid">
    ${sorted.map(cardHTML).join("\n    ")}
  </div>

  <p class="acg-empty" hidden>Nothing matches that search.</p>

  <p class="acg-foot">
    Generated from the <a href="${SITE_URL}" target="_blank" rel="noopener">Allen Glossary</a>
    (revision ${esc(SITE.revision)}), which is the source of truth for these definitions &#8212;
    corrections and new terms belong there, not on this page.${refs ? `<br>Further reading: ${refs}` : ""}
  </p>

</div>

<script>
${JS}
</script>`;
}

/* ── the databook page ───────────────────────────────────────── */

// One MyST file. The body is a single `{raw} html` block fenced with five
// colons — the databook enables colon_fence, and colons let the embedded script
// use backticks freely, which a ``` fence would not.
function page() {
  const provenance = COMMIT
    ? `[\`${COMMIT.slice(0, 7)}\`](${REPO_URL}/commit/${COMMIT})`
    : "the source repository";

  const idx = termIndex();

  return `\
<!-- GENERATED FILE — DO NOT EDIT BY HAND.
     Produced by scripts/build-glossary-page.mjs in this repository, from
     ${REPO_URL}
     Source commit: ${COMMIT || "unknown"}${STAMP ? `\n     Generated:     ${new Date().toISOString()}` : ""}
     Edit the definitions in that repository's data/ directory; this page is
     regenerated from it and any change made here will be overwritten. -->

# Glossary

${TERMS.length} terms across ${CATS.length} categories, from the
[Allen Glossary](${SITE_URL}). Search matches names, definitions, categories and dataset
names; the category legend doubles as a filter, so clicking one or more pills narrows the
list. Every term has a permalink you can paste into an email — click a term name to copy
the link to it.

:::::{raw} html
${bodyHTML()}
:::::

## Term index

The same ${idx.count} terms as a plain list, A to Z. This is what the databook's own
search box and any \`{term}\` cross-reference elsewhere in the book resolve against,
so it is folded away rather than left out.

::::::{dropdown} Every term, A to Z
:::::{glossary}
${idx.body}
:::::
::::::

:::{note}
This page is generated from ${provenance} of the
[Allen Glossary](${REPO_URL}) repository.
Do not edit it directly &mdash; edits are overwritten the next time it is regenerated.
To fix a definition or add a term, open a pull request against that repository.
:::
`;
}

/* ── standalone preview ──────────────────────────────────────── */

// The same body in a bare page, for checking the result without standing up a
// Jupyter Book build. The theme switch mimics how the databook stamps
// data-theme on <html>, so dark mode can be checked too.
function previewHTML() {
  return `<!doctype html>
<html lang="en" data-theme="light">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Glossary — databook preview</title>
<style>
  body{margin:0; padding:2rem 1.5rem 4rem; background:#fff; color:#222;
       font-family:ui-sans-serif, system-ui, sans-serif; max-width:1100px}
  html[data-theme="dark"] body{background:#0f1419; color:#e7edf3}
  .pv{position:fixed; top:10px; right:12px; z-index:9; font:600 12px/1 ui-sans-serif, system-ui, sans-serif;
      background:#111; color:#fff; border:0; border-radius:99px; padding:.5rem .9rem; cursor:pointer}
  html[data-theme="dark"] .pv{background:#e7edf3; color:#111}
  .pvnote{font-size:.75rem; color:#888; margin:0 0 1.5rem}
</style>
<button class="pv" onclick="var h=document.documentElement;h.dataset.theme=h.dataset.theme==='dark'?'light':'dark'">toggle theme</button>
<h1>Glossary</h1>
<p class="pvnote">Standalone preview of the generated databook page — the databook's own
chrome (sidebar, header) is not shown. Toggle the theme to check both palettes.</p>
${bodyHTML()}
</html>
`;
}

/* ── write ───────────────────────────────────────────────────── */

const out = path.resolve(OUT);
const text = page();
const before = fs.existsSync(out) ? fs.readFileSync(out, "utf8") : null;

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, text);

const PREVIEW = flag("--preview");
if (PREVIEW) {
  const p = path.resolve(PREVIEW);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, previewHTML());
  console.log(`${path.relative(process.cwd(), p) || p}  (preview)`);
}

const rel = path.relative(process.cwd(), out) || out;
const changed = before !== text;
console.log(
  `${rel}  ${(text.length / 1024).toFixed(0)} kB  ` +
  `${TERMS.length} terms, ${CATS.length} categories  ` +
  `[${changed ? (before === null ? "created" : "updated") : "unchanged"}]`
);
