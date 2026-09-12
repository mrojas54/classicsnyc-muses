---
description: Author an act of Romeo and Juliet into the Classics NYC Muses reading app (data/rj-NN.js + manifest) — specific to this app
argument-hint: <act-number>   e.g. "3"
---

You are authoring a reading-comprehension deep dive for **Act $ARGUMENTS** of *Romeo and Juliet*
into the Classics NYC Muses app (the `rj` work on the shelf).

Follow this exactly:

1. Read `schema.md` and `CLAUDE.md` in this directory for the data contract and the
   Chorus voice (the play's register: the Chorus keeps the count, the clock strikes nine,
   the Prince gives sentence). Honest, spoiler-aware for acts already read, never for acts ahead.

2. Compute the id: `rj-NN`, zero-padded (act 3 → `rj-03`).

3. Write `data/<id>.js` registering one act object into `window.LOOM_DATA["<id>"]`.
   Required substance:
   - `meta` with `epic: "Romeo and Juliet"`, `song` ("Act Three"), `book` (the act number),
     title, subtitle, tagline, and an `epigraph`: a verbatim line from the act, cited
     `Shakespeare, Romeo and Juliet <act>.<scene>`, with `verbatim: true` only when the
     wording is certain. Otherwise paraphrase without quotation marks.
   - `recap`: the play up to but not including this act; Act 1's is the Prologue's backstory.
   - `scene`: 1–3 paragraphs setting day, place, and what just changed. The play runs
     Sunday to Thursday; keep the calendar straight.
   - `terms`: 2–4 words to carry (`gk` holds the word: *wherefore*, *banishèd*, *surcease*…).
   - `movements`: one per scene, in order, `n` = "Scene 1"… (Act 2 begins with "Prologue";
     a long scene such as 5.3 may be split into several movements). Each has `title`,
     `what` (HTML, narrate the beat), and `why`. Wrap names by house:
     `<span class="who">` Montague · `<span class="cap">` Capulet · `<span class="ver">` Verona
     (the Prince, Mercutio, Paris, the Friars, the Chorus, the Apothecary).
   - `panels`: optional — a famous speech, a pattern worth pulling out.
   - `characters`: grouped exactly `"House of Montague"`, `"House of Capulet"`, `"Verona"`;
     name, epithet, role, tag. Servants belong to the house they serve.
   - `threads`: `{ dir, to, title, note }` to acts already read (`"back"`) or the next act
     (`"ahead"`, hint only). A thread may reach across the shelf to a Homer book the club
     has finished (`to: "iliad-24"`) when the tie is real.
   - `quiz`: 4–6 omens: `n`, `kind` (`event` / `meaning` / `thread`), `q`, `opts` (4),
     `correct` (0-based), and a `truth` that teaches. Mostly events, one or two meaning,
     a thread omen when a thread exists.

4. Append `"<id>"` to `window.LOOM_BOOKS` in `data/manifest.js`, after the Homer ids, in act order.

5. Tell the user to open (or refresh) `app/index.html` — the act appears on the shelf under
   Romeo and Juliet. No build step, no server. To deploy, run `node build-single-file.js`,
   then `cp classicsnyc-muses.html index.html`.

Accuracy over flourish: the text is public domain, so quote freely, but only what you are
sure of, and cite act and scene rather than line numbers, which differ by edition. If a
reading is disputed (Q2 against the Folio), say so or paraphrase.
