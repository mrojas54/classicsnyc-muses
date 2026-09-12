# Classics NYC Muses — the data contract

## The shelf (`window.LOOM_WORKS`)

`data/manifest.js` opens with the shelf: one entry per work the club has read. Each
work names its `unit` ("Book", "Act"), its `parts` (each with an id `prefix` and a
`count`), its `cast` bands (name + ink class), an optional `deadline`, and a `voice`
object that overrides the renderer's diction. The Homer entry uses the default voice
(the Loom / the Fates) verbatim; the play's entry overrides most keys (the Chorus, the
Prince, the stars). Every string a view speaks is a key in `VOICE_DEFAULT` in
`app/index.html`; a work may override any of them and leave the rest.

Unit ids are `<prefix>-NN`, zero-padded: `iliad-02`, `odyssey-24`, `rj-03`. The renderer
finds a unit's work by its prefix, so prefixes must not overlap.

## A unit (book or act)

Each unit is ONE file: `data/<id>.js`. The file does exactly one thing: registers a
unit object into the global registry.

```js
window.LOOM_DATA = window.LOOM_DATA || {};
window.LOOM_DATA["iliad-02"] = { /* unit object below */ };
```

Then add the `id` to `data/manifest.js` (the `window.LOOM_BOOKS` array), in reading order.

## Unit object

```
meta:        { id, epic, song, book, title, subtitle, tagline, epigraph:{text, src, verbatim?} }
             // epic = the work's name as the crown shows it; song = "First Song" / "Act Three";
             // book = the unit's number
recap:       [ "<p-html>", ... ]        // optional — "Previously, on <epic>": the story up to but NOT including this book
scene:       [ "<p-html>", ... ]        // dark scene-set card; 1–3 paragraphs
terms:       [ { gk, def }, ... ]        // optional — words to carry; `gk` holds the word (mēnis, timē, wherefore)
movements:   [ { n, title, what, why }, ... ]   // `what` and `why` are HTML strings
panels:      [ { label, lines:[ "<i>...</i>", ... ] }, ... ]   // optional — similes / asides
characters:  { "<band>":[ {name, epithet, role, tag, god?} ], ... }   // bands are the work's `cast` names:
             // Homer: "Mortals", "Gods & Powers" · the play: "House of Montague", "House of Capulet", "Verona"
threads:     [ { dir, to, title, note }, ... ]   // optional — cross-book ties (see below)
quiz:        [ { n, kind, q, opts:[...], correct:<index>, truth } ]   // 4–6 omens
```

## Quiz `kind` — the comprehension layers

Each quiz item carries a `kind` so the examination tests recall *and* understanding,
and the verdict reports a per-layer breakdown:

- `"event"` — recall of what happened (a beat, who did what, the order of events).
- `"meaning"` — why it matters / theme (what Homer is *showing*, the force of a term).
- `"thread"` — a cross-book tie (how this book connects to one already read).

Aim for a mix: mostly `event`, at least one or two `meaning`, and a `thread` omen
when the book has a thread. If `kind` is omitted the renderer treats it as `event`.

## Threads — the cross-book weave

`threads` links a book to another book in reading order. Each entry:

- `dir`  — `"back"` (ties to an earlier book) or `"ahead"` (sets up a later one).
- `to`   — the target book id (e.g. `"iliad-01"`). May be unwritten; the link greys out.
- `title`— a short name for the connection.
- `note` — 1–3 sentences, HTML allowed, explaining the tie in the Loom voice.

Threads render in the book (a "Threads of the Loom" section) and collect into the
global **Woven Threads** view. Keep them spoiler-aware: a `"back"` thread is always
safe; an `"ahead"` thread should hint, not spoil, a book not yet read.

## Conventions
- HTML allowed in `what`, `why`, `role`, `scene`, `panel lines`, `truth`.
- Wrap names in the ink of their band: Homer — `<span class="who">` mortal, `<span class="god">` god;
  the play — `<span class="who">` Montague, `<span class="cap">` Capulet, `<span class="ver">` Verona.
- `correct` is the 0-based index of the right option.
- Voice: the work's register — see CLAUDE.md (the Loom / Oracle for Homer, the Chorus / the Prince for the play). Spoiler-aware: name what a unit *sets up* for later ones, since the reader has the prior ones.
- `recap` renders a "Previously, on <epic>" card between the epigraph and the scene-set. It is the story **up to but not including this book** (Book 1's is the pre-war backstory), so it is spoiler-safe by construction. The card is italic — use `<b>` (upright ink) for name/callout emphasis, not `<i>`. Paraphrase in the app's voice; do not wrap in quotation marks (that convention is reserved for verbatim Fagles).
- `meta.epigraph.verbatim` is optional and defaults to false. Set it to `true` only when `text` has been verified as a verbatim quotation (Fagles for Homer; the play's text for Shakespeare). Derived line omens use this flag to decide whether they may say "Fagles wrote it thus" / "Shakespeare wrote it thus" (the work's `voice.riteVerbatim`); paraphrases get the recall copy instead.
- Data is trusted (authored locally); the renderer injects it as HTML. Do not paste untrusted content.

- `threads[].to` may name a unit in another work on the shelf (an act tying back to a Homer book); the link opens that work.

## Add a unit by hand
1. Write `data/<id>.js` to the shape above.
2. Append `"<id>"` to `window.LOOM_BOOKS` in `data/manifest.js`.
3. Open `app/index.html` — the new unit appears on its work's grid. No build, no server.

## Add a work by hand
1. Append an entry to `window.LOOM_WORKS` in `data/manifest.js` (copy the `rj` entry; pick a fresh `prefix`).
2. Author its units as above. A work with no authored units shows its grid as unwritten.
