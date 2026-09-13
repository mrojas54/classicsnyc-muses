# Classics NYC Muses

Reading companions for the Classics NYC book club. One static, data-driven app
holds a shelf of works; each work is a set of units (a book of Homer, an act of
the play), and each unit is a guided deep dive plus a self-testing examination
that probes recall *and* understanding.

**Live site:** https://mrojas54.github.io/classicsnyc-muses/

## The shelf

| Work | Units | Status | Voice |
|---|---|---|---|
| **The Muse's Odyssey** — the *Iliad* and the *Odyssey* (Robert Fagles) | 48 books | Retired: every book read and scored; stays readable | the Loom / the Fates |
| **Romeo and Juliet** — William Shakespeare | 5 acts | Now reading | the Chorus / the Prince |

The home hub shows the open work; the pill row at the top switches works.
Everything below the hub (roster, threads, review, daily practice, grand
examination) is scoped to the open work. Progress is stored per unit id, so
switching works loses nothing.

## What a unit contains

Each unit renders in the same order: scene-set → words to carry → movements
(what happened / why it matters) → panels (similes, asides) → cast → cross-book
threads → the examination. Quiz scores persist in `localStorage` per unit, and
the examination reports a per-layer breakdown across three kinds of question:

- `event` — what happened.
- `meaning` — why it matters.
- `thread` — how this unit ties to one already read.

## Run it locally

There is no build step and no server needed to read the app. Clone the repo and
open `app/index.html` in a browser. It loads `data/manifest.js` and every unit
file listed there through `<script>` tags.

Data files are `.js` rather than `.json` on purpose: browsers block `fetch()` on
`file://`, but `<script>` tags load fine. Each unit registers itself into
`window.LOOM_DATA`; the manifest carries the shelf (`window.LOOM_WORKS`) and the
list of unit ids to load (`window.LOOM_BOOKS`).

## Layout

```
app/index.html          the renderer (one file; every string it speaks is a VOICE_DEFAULT key)
app/clock.js            day keys, streaks, countdown math
app/omens.js            derived practice questions
data/manifest.js        the shelf and the unit list
data/<id>.js            one unit per file: iliad-01 … odyssey-24, rj-01 … rj-05
schema.md               the data contract for a unit and a work
build-single-file.js    bundler: inlines manifest + units into one self-contained HTML file
index.html              the committed, built deploy copy served by GitHub Pages
test/                   node:test suites for clock.js and omens.js
supabase/               optional cross-device quiz-history sync (schema + token minting)
docs/                   PRD, plans, and design specs
.claude/commands/       the deep-dive authoring commands
AGENTS.md               guidance for coding agents (CLAUDE.md is a symlink to it)
```

## Add a unit or a work

To add a unit, write `data/<id>.js` to the shape in `schema.md` and append the
id to `window.LOOM_BOOKS` in `data/manifest.js`. Nothing else is required; the
unit appears on its work's grid the next time the page loads.

To add a work, append one entry to `window.LOOM_WORKS` in the manifest with a
fresh id prefix, then author its units as above.

Two authoring commands produce a unit to schema and register it:

- `/deep-dive-odyssey <epic> <n>` for a book of Homer.
- `/deep-dive-romeo-juliet <act>` for an act of the play.

Voice, quotation, and spoiler rules live in `AGENTS.md`. The short version:
quote Fagles and Shakespeare only verbatim and cited, never present a
paraphrase as a quote, and never thread ahead past the unit being read.

## Tests

```
node --test test/*.js
```

The suites cover `app/clock.js` (local-date keys, streaks, DST transitions) and
`app/omens.js` (derived practice questions). They need no dependencies beyond
Node 18 or later.

## Build and deploy

`app/index.html` plus `data/*.js` are the source of truth. The bundler produces
a single self-contained file, hardened for iOS and `file://` use:

```
node build-single-file.js          # writes classicsnyc-muses.html (git-ignored)
cp classicsnyc-muses.html index.html
```

`index.html` at the repo root is the committed deploy copy. GitHub Pages serves
it from `main`, so a deploy is: rebuild, copy, commit, push `main`. Re-run the
bundler after authoring a unit so the deployed bundle matches the source.

The `classicsnyc-muses.html` copy is the same file for offline, phone, or
AirDrop use. On a hosted `https://` origin `localStorage` works normally; on
iOS `file://` the bundle falls back to in-memory storage, so scores do not
persist there.

## Cross-device sync (optional)

Quiz history can also sync to Supabase. `localStorage` remains the instant,
on-device source of truth; Supabase is best-effort and fire-and-forget. The
schema in `supabase/schema.sql` auto-enables row-level security on every new
table, so a new table is deny-all until it gets a `muse_reader` policy. The
token the app uses is minted by `supabase/mint-muse-token.py`. See the design
and plan under `docs/superpowers/` for the full picture.

## License

Shakespeare is public domain. Robert Fagles' translations of Homer are quoted
only in brief, cited excerpts. No license is declared for the app's own code
and prose.
