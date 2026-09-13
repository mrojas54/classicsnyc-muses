# Classics NYC Muses — reading companions for the book club

> Single source of truth for all agents/tools. `CLAUDE.md` is a symlink to this
> file, so Claude Code, Codex, Cursor, etc. all read the same guidance.

A data-driven static app: one renderer, one shelf of works, one data file per unit
(a book of Homer, an act of the play). (Internal codename in the source: `LOOM_*` — the
data registry and localStorage keys keep that prefix from the app's first life as
*The Muse's Odyssey*.) One renderer (`app/index.html`), one data file per unit
(`data/<id>.js`), one manifest (`data/manifest.js`) that carries both the shelf and
the unit list. No build step or server is needed to *read* it — double-click
`app/index.html`. (A bundler produces the deployed single file; see **Build & deploy**.)

## The shelf
Two works so far, in the order the club read them:

- **The Muse's Odyssey** (`homer`) — the *Iliad* and the *Odyssey*, 48 books, Fagles.
  **Retired**: every book is read and scored; it stays on the shelf, readable and
  examinable, in its original Loom / Fates voice.
- **Romeo and Juliet** (`rj`) — five acts, one deep dive per act. **Now reading.**
  Its voice is the Chorus's (below). No deadline is set yet; add one to the manifest
  entry when the club fixes its night and the countdown appears on the hub.

The home hub shows the open work; the pill row at the top switches works. Everything
below the hub (roster, threads, review, rehearsal, grand examination) is scoped to the
open work. Progress is per unit id, so switching works loses nothing.

## How it works
- Data files are **`.js`, not `.json`**, on purpose: browsers block `fetch()` on
  `file://`, but `<script>` tags load fine. Each data file registers itself into
  `window.LOOM_DATA`. The manifest lists the shelf (`LOOM_WORKS`) and which ids to load
  (`LOOM_BOOKS`).
- The renderer reads a unit object and draws: scene-set → words-to-carry →
  movements (what happened / why it matters) → panels → cast → threads → the examination.
  Quiz scores persist in `localStorage` per unit.
- Every string a view speaks is a key of `VOICE_DEFAULT` in `app/index.html` (the Homer
  voice, verbatim). A work's `voice` in the manifest overrides any key. Do not hard-code
  a work's diction into the renderer; add a key.

## The data contract
See `schema.md`. To add a unit: write `data/<id>.js`, append the id to
`window.LOOM_BOOKS` in `data/manifest.js`. Nothing else. To add a work: one entry in
`window.LOOM_WORKS`, then its units.

## Build & deploy
`app/index.html` + `data/*.js` are the source of truth; read them locally by
double-clicking `app/index.html` (no build needed). Two derived, self-contained
single files come from the bundler:

    node build-single-file.js          # inline manifest + every unit, iOS/file:// hardened
    cp classicsnyc-muses.html index.html

- `classicsnyc-muses.html` — offline / phone / AirDrop copy (git-ignored; regenerate anytime).
- `index.html` (repo root, **committed**) — the byte-identical deploy copy GitHub
  Pages serves at https://mrojas54.github.io/classicsnyc-muses/.

`main` is the trunk: it carries the source tree **and** the built `index.html`, so
the branch you edit is the branch you deploy. Deploy = rebuild → copy to
`index.html` → commit → push `main` (Pages redeploys on push). Re-run the bundler
after authoring a unit (once its id is in `data/manifest.js`) so the deployed
bundle matches the source. The repo is `mrojas54/classicsnyc-muses` (renamed from
`muses-odyssey` on 2026-09-13; GitHub redirects the old repo URL and git remote, but
not the old Pages address).

## Voice — the Loom / the Oracle (the Homer work)
- Parchment register, lightly mythic, never purple. Georgia serif, wine + gold.
- The three Fates frame the reading: Clotho sets the measure, Lachesis allots the
  pages, Atropos waits at the theater door (the July 28 book-club deadline).
- The nightly quiz is "the Ninth Hour" / "the Oracle's Examination"; results are
  "the Fates' verdict." Keep that diction.
- **Spoiler-aware, not spoiler-blind:** the reader has already read the earlier
  books, so it's good to name what a book *sets up* (e.g. Book 1's nod → Book 2's
  Dream). Do not foreshadow books not yet read unless flagged.
- Honesty over flourish: if a Greek term or claim is uncertain, say so plainly.
  (E.g. *Iliad* names Troy/Ilios; it does not mean "wound.")

## Voice — the Chorus / the Prince (Romeo and Juliet)
- Same parchment register, the play's own furniture: the **Chorus** keeps the count,
  **the clock strikes nine** (Juliet's hour, 2.5) names the nightly examination, and
  **the Prince gives sentence** is the verdict. The fray bar is **the stars** (star-crossed);
  the marker at its end is the inconstant moon. The daily practice is **the Daily
  Rehearsal**; the roster is **the Players of Verona**.
- Three inks: Montague wine (`who`), Capulet sky (`cap`), Verona olive (`ver`) — the
  Prince, Mercutio, Paris, the Friars, the Chorus, the Apothecary are Verona.
- The play runs Sunday to Thursday. Keep the calendar straight in every scene-set.
- Spoiler-aware across the shelf: the club has finished Homer, so a thread from the play
  back to a Homer book is fair (`to: "iliad-24"`). Never thread ahead past the act being read.

## Source text & quotation
- **Shakespeare** is public domain: quote verbatim freely, but only lines you are sure
  of, in modern spelling, cited by act and scene (*Romeo and Juliet* 2.2). Line numbers
  differ by edition, so omit them. Where Q2 and the Folio disagree, say so or paraphrase.
  `verbatim: true` on an epigraph only when the wording is certain.
- The reader's translation of Homer is **Robert Fagles** (Penguin Classics; Bernard Knox
  introductions). Match Fagles' name spellings and phrasing; when a movement leans on
  a memorable line, prefer Fagles' wording.
- **Epigraphs and any quotation marks must be verbatim Fagles** — cite book.line
  (e.g. *Fagles, Iliad 1.1–2*). If a line cannot be confirmed verbatim, do NOT wrap it
  in quotation marks: paraphrase in the app's own voice, or label it "after Fagles".
  Never present a paraphrase as a quote.
- Resonance worth keeping: Fagles' *Odyssey* opens "Sing to me of the man, Muse…" —
  the source of the app's name.

## Authoring a deep dive
- Homer: `/deep-dive-odyssey <epic> <n>` (`.claude/commands/deep-dive-odyssey.md`).
- The play: `/deep-dive-romeo-juliet <act>` (`.claude/commands/deep-dive-romeo-juliet.md`).

Each produces the `data/<id>.js` file to schema and registers it. Movements follow the
unit's major beats — a book's up to ~10, an act's scenes one by one; quiz 4–6 omens;
always include `why it matters` and at least a couple of `terms`.

## Backend — Supabase cross-device sync

The quiz-history sync feature (see `docs/superpowers/plans/2026-07-06-quiz-history-sync.md`
and `supabase/schema.sql`) stores quiz history in Supabase. localStorage stays the
instant on-device source of truth; Supabase is best-effort, fire-and-forget.

### Row-Level Security (RLS) policy

This project auto-enables RLS on every table. `supabase/schema.sql` installs a
DDL event trigger (`on_create_table_force_rls`) that flips `ENABLE ROW LEVEL
SECURITY` on at `CREATE TABLE` time for any table in the `public` schema. This is
deliberate: SQL-created tables ship with RLS **off**, and an RLS-off table in an
exposed schema is reachable through the Supabase Data API by the `anon` role.

**The rule that follows: a new table is deny-all until you write it a policy.**
RLS-on with no policy blocks everyone — including the app. So whenever you add a
table:

1. **Assume it will exist but return nothing.** "Table exists but the app reads
   an empty array / a write silently fails" is the *expected* symptom of a table
   without a policy — not a bug. The fix is always **add the policy**, never
   "turn RLS off."
2. **Write a policy scoped to the `muse_reader` role**, matching the access that
   table actually needs — do not blindly copy the same grants onto every table.
   The established pattern (see `supabase/schema.sql`):

   ```sql
   -- grant the DB-level privileges the role needs on the new table
   grant select, insert on public.<new_table> to muse_reader;
   grant usage, select on all sequences in schema public to muse_reader;  -- if it has an identity/serial col

   -- then the RLS policy that opens exactly that access to muse_reader
   create policy muse_rw on public.<new_table>
     for all to muse_reader using (true) with check (true);
   ```

   Narrow `for all` / `using (true)` if the table needs read-only or per-row
   rules; `using(true)` is only correct because this is a single shared reader
   with no per-user rows.
3. **Never weaken RLS to "fix" access.** Do not `disable row level security`, do
   not grant to `anon`/`authenticated` to make a table readable. If a table must
   be reachable, it gets a `muse_reader` policy — nothing broader.
4. **UPDATE needs a SELECT policy too.** In Postgres RLS an UPDATE must first
   SELECT the row; without a matching SELECT policy an update returns 0 rows with
   no error. `for all` covers this; if you split policies by command, add SELECT.

**Verify after any schema change** (a fix without verification is incomplete):

```sql
-- every public table must have RLS on
select tablename, rowsecurity from pg_tables where schemaname = 'public';
-- the auto-RLS trigger must still be armed
select evtname, evtenabled from pg_event_trigger where evtname = 'on_create_table_force_rls';
```

Or run the Supabase security advisor (`supabase db advisors`, or MCP
`get_advisors` type `security`) before committing a migration — it flags any
`public` table still missing RLS or a policy.

## HTML Artifacts
When generating HTML study artifacts (book walkthroughs, character sheets, examinations), confirm the file was fully written and report the final path before ending the session.
