/* The shelf: every work the reading companion carries, in the order the book
   club read them. A work is a set of units (books, acts) that share one voice,
   one cast layout, and one deadline. The renderer builds its plan, its labels,
   and its diction from these entries; nothing about a work is hard-coded there.

   To add a work: append an entry here, then author data/<prefix>-NN.js files
   and list their ids in window.LOOM_BOOKS below. See schema.md.

   Fields:
     id        short key; also names the per-work examination score
     title/by  the shelf line on the home hub
     status    "reading" (the club is on it) | "retired" (finished; stays readable)
     unit      the singular noun for one data file ("Book", "Act")
     parts     the sub-works and how many units each has; `prefix` builds the ids
     cast      the roster bands in order; `cls` is the ink each band is set in
               ("" wine · "god" sky · "cap" sky · "ver" olive) and is also the span
               class authors use inline: <span class="who">, <span class="cap">…
     deadline  optional. { day: "YYYY-MM-DD", at: ISO instant, label } — the
               countdown hides itself when absent
     voice     overrides for the renderer's diction; any key left out falls back
               to the Loom / Fates register (the Homer default) */
window.LOOM_WORKS = [
  {
    id: "homer",
    title: "The Muse's Odyssey",
    by: "the Iliad & the Odyssey · Robert Fagles",
    status: "retired",
    unit: "Book",
    parts: [
      { prefix: "iliad",   name: "The Iliad",   short: "Iliad",   count: 24 },
      { prefix: "odyssey", name: "The Odyssey", short: "Odyssey", count: 24 }
    ],
    cast: [
      { name: "Mortals",       cls: "" },
      { name: "Gods & Powers", cls: "god" }
    ],
    deadline: { day: "2026-07-15", at: "2026-07-15T23:30:00Z", label: "the theater door opens at 7:30 PM ET" }
    /* voice: the Loom default, verbatim */
  },
  {
    id: "rj",
    title: "Romeo and Juliet",
    by: "William Shakespeare · the Chorus keeps the count",
    status: "retired",
    unit: "Act",
    parts: [
      { prefix: "rj", name: "Romeo and Juliet", short: "R&J", count: 5 }
    ],
    cast: [
      { name: "House of Montague", cls: "" },
      { name: "House of Capulet",  cls: "cap" },
      { name: "Verona",            cls: "ver" }
    ],
    /* the club's night: Thursday 2026-09-24, 7:00 PM ET (EDT, UTC-4). `day` drives the
       day count; `at` is the absolute instant for the final-night ticker */
    deadline: { day: "2026-09-24", at: "2026-09-24T23:00:00Z", label: "the club takes its seats at 7:00 PM ET" },
    voice: {
      /* the shelf and the hub */
      allUnits: "✦ All Acts",
      progress: "{a} of {n} acts on the stage · {r} read",
      dayKept: "The scene is played. The day is kept.",
      dayHow: "An act is kept when it is read and its omens hold.",
      streakWaits: "✦ the stage waits for its first night",
      volatile: "This copy cannot keep a streak — open it from the web to have the Chorus remember.",
      doorFar: "The curtain rises in {days} {dayWord} · {left}",
      doorLive: "The curtain rises in {label} · {deadlineLabel}{unread}",
      doorPast: "The curtain has risen · {left}",
      unreadLeft: "{left} {unitWord} on the stage, unread",
      unreadLeftPast: "{left} {unitWord} unread",
      unreadNone: "every written act is read",
      unreadNonePast: "every written act was read",
      /* home actions */
      riteBtn: "☼ The Daily Rehearsal (practice) →",
      examBtn: "◈ The Grand Examination ({n}) →",
      castBtn: "☙ The players ({n}) →",
      threadsBtn: "✦ The Chorus's threads ({n}) →",
      reviewBtn: "↺ Re-walk the missed omens ({n}) →",
      /* the daily practice */
      riteTab: "The Daily Rehearsal",
      riteCrown: "◈ The players rehearse ◈",
      riteTitle: "The Daily Rehearsal",
      riteEmpty: "Mark an act read and the Chorus will draw from it.",
      riteSub: "{n} omens · practice only · the stars are not moved here",
      riteHide: "Whose name does the Chorus hide?",
      riteSeq: "The Chorus shows four beats. Set them in their true order.",
      riteVerbatim: "Shakespeare wrote it thus.",
      riteRecall: "The Chorus recalls the line.",
      /* threads */
      threadsTab: "The Chorus's threads",
      threadsCrown: "◈ The Chorus remembers ◈",
      threadsTitle: "The Chorus's Threads",
      threadsSub: "how each act ties back into the ones before — and forward into the ones to come",
      threadsEmpty: "No threads tied yet. Author an act with a <i>threads</i> entry and they appear here.",
      threadBand: "Threads through the play",
      /* the roster */
      rosterCrown: "◈ Enter the players ◈",
      rosterTitle: "The Players of Verona",
      rosterSub: "every Montague, Capulet, and citizen of Verona the reading has met — and the acts they walk through",
      rosterEmpty: "No players yet — the roster fills as you read. Mark an act read and everyone it names gathers here.",
      /* the review */
      reviewCrown: "◈ The Chorus keeps the count ◈",
      reviewSub: "every omen you let slip, gathered from all the acts into one re-walking",
      reviewMeta: "answer true and the omen is mended — it leaves this page",
      reviewEmpty: "No omens outstanding. Every one you missed has been re-walked — the count is clean.",
      reviewStrand: "missed omen",
      reviewStrands: "missed omens",
      reviewAll: "All {total} mended. What you once let slip, you now hold. The count is clean.",
      reviewNone: "None mended this pass — these {still} run deep. Re-walk their acts, then gather them again.",
      reviewSome: "{mended} mended, {still} still missed. The mended ones leave this page; come back for the rest.",
      /* the per-act examination */
      gateCrown: "◈ The Clock Strikes Nine ◈",
      gateTitle: "The Chorus's Examination",
      gateSub: "{n} omens · the stars hold or the moon turns inconstant",
      notYet: "Not yet examined on this act.",
      verdictCrown: "The Prince Gives Sentence",
      verdictSmall: "Tap a truth to read it · the play goes on",
      heldLine: "All omens already read · {n} of {n} · the stars held",
      barLabel: "The stars",
      barEnd: "☾",
      verdict: [
        "The stars stand fixed. You read clearly — the Prince pardons this one.",
        "The stars hold bright. The act lives in you; a line or two slipped. Onward.",
        "The stars hold. The spine is yours, the finer turns still forming. Re-walk the scenes and go on.",
        "One light in the dark. A single true sight is a beginning; the rest passed too quick. Linger here once more.",
        "The stars cross at the meaning, not the count. The pages turned faster than the play took root. No frown — sit longer."
      ],
      /* the grand examination */
      examCrown: "◈ The whole play at once ◈",
      examSub: "all {n} omens from the acts you have walked, gathered into one reckoning",
      examMeta: "the Prince weighs every act at once — no act announced, the stars alone must tell",
      examEmpty: "No omens to sit yet. Author an act with a <i>quiz</i> and the examination opens.",
      examBest: "Your best reckoning across all acts: {best} / {total}",
      examVerdictCrown: "The Prince Gives Full Sentence",
      examSmall: "Tap a truth to read it · every act at once",
      examVerdict: [
        "Every star stands fixed across all the acts. The whole play lives in you — the Prince finds nothing to punish, and that silence is the highest praise.",
        "The stars hold bright end to end. A line or two slipped, but the play is yours.",
        "The stars hold. The great shape of the tragedy is in you; the finer turns still settling — gather the missed omens in the Review.",
        "The spine holds, the detail wavers. You know where the play is going; sit with the acts that slipped and the picture sharpens.",
        "Lights in the dark. Some omens caught, most passed too quick across so many acts — gather them in the Review and walk again.",
        "The sentence is hard. So many acts read fast leave little to hold — no frown; re-walk them one by one, then return to the full sitting."
      ],
      /* the act page */
      sceneLabel: "✦ The scene is set ✦",
      termsBand: "Words to carry",
      movementsBand: "The scenes",
      byUnit: "By act"
    }
  },
  {
    id: "mm",
    title: "The Master and Margarita",
    by: "Mikhail Bulgakov",
    status: "reading",
    unit: "Chapter",
    parts: [
      { prefix: "mm", name: "The Master and Margarita", short: "M&M", count: 32 },
      { prefix: "mm-epilogue", name: "Epilogue", short: "Epilogue", count: 1 }
    ],
    cast: [
      { name: "Moscow", cls: "" },
      { name: "Woland's company", cls: "god" },
      { name: "Jerusalem", cls: "ver" }
    ],
    // Date-only deadline: end of October 26 in New York (EDT, UTC-4).
    // Replace `at` and `label` if the club supplies a meeting time.
    deadline: { day: "2026-10-26", at: "2026-10-27T04:00:00Z", label: "due October 26" },
    // Translation-neutral until the reader's edition is known; no quotations yet.
    voice: {
  allUnits: "✦ All Chapters",
  progress: "{a} of {n} chapters on the reading · {r} read",
  dayKept: "The thread is spun. The day is kept.",
  dayHow: "A chapter is kept when it is read and its omens hold.",
  streakWaits: "✦ the thread waits to be spun",
  volatile: "This copy cannot keep a streak — open it from the web to have the reader remember.",
  doorFar: "The reading is due in {days} {dayWord} · {left}",
  doorLive: "The reading is due in {label} · {deadlineLabel}{unread}",
  doorPast: "The reading deadline has passed · {left}",
  unreadLeft: "{left} {unitWord} on the reading, unread",
  unreadLeftPast: "{left} {unitWord} unread",
  unreadNone: "no authored chapters remain unread",
  unreadNonePast: "no authored chapters remained unread",
  riteBtn: "☼ The Daily Rite (practice) →",
  examBtn: "◈ The Grand Examination ({n}) →",
  castBtn: "☙ The players ({n}) →",
  threadsBtn: "✦ The woven threads ({n}) →",
  reviewBtn: "↺ Re-walk the missed omens ({n}) →",
  riteTab: "The Daily Rite",
  riteCrown: "◈ The Reader offers practice ◈",
  riteTitle: "The Daily Rite",
  riteEmpty: "Mark a chapter read and the reader will draw from it.",
  riteSub: "{n} omens · practice only · the thread is not spun here",
  riteHide: "Whose name does the reader hide?",
  riteSeq: "The Reader shows four beats. Set them in their true order.",
  riteVerbatim: "Bulgakov wrote it thus.",
  riteRecall: "The Reader recalls the line.",
  threadsTab: "The woven threads",
  threadsCrown: "◈ The Reader remembers ◈",
  threadsTitle: "The Woven Threads",
  threadsSub: "how each chapter ties back into the ones before — and forward into the ones to come",
  threadsEmpty: "No threads woven yet. Author a chapter with a <i>threads</i> entry and they appear here.",
  threadBand: "Threads of the reader",
  rosterCrown: "◈ The Reader names its players ◈",
  rosterTitle: "The Cast of The Master and Margarita",
  rosterSub: "every character the reading has met — and the chapters they walk through",
  rosterMeta: "{total} named across {n} {unitWord} read · follow a chapter to return to it",
  rosterEmpty: "No players yet — the roster fills as you read. Mark a chapter read and everyone it names gathers here.",
  reviewCrown: "◈ The Reader keeps its frayed strands ◈",
  reviewSub: "every omen you let slip, gathered from all the chapters into one re-walking",
  reviewMeta: "answer true and the strand is mended — it leaves this page",
  reviewEmpty: "No omens outstanding. Every strand you missed has been re-walked — the reading is clean.",
  reviewStrand: "frayed strand",
  reviewStrands: "frayed strands",
  reviewTally: "Re-walked {answered} of {total} · {mended} mended, {still} still frayed",
  reviewDoneCrown: "The Strands Re-walked",
  reviewAgain: "Gather what still frays",
  reviewAll: "All {total} strands mended. What you once let slip, you now hold. The loom is clean.",
  reviewNone: "None mended this pass — these {still} run deep. Re-walk their chapters, then gather them again.",
  reviewSome: "{mended} mended, {still} still fray. The mended ones leave this page; come back for the rest.",
  gateCrown: "◈ The Ninth Hour ◈",
  gateTitle: "The Reader's Examination",
  gateSub: "{n} omens · the thread holds or the shears draw near",
  notYet: "Not yet examined on this chapter.",
  verdictCrown: "The Reader Render Judgment",
  verdictSmall: "Tap a truth to read it · the thread spins on",
  heldLine: "All omens already read · {n} of {n} · the thread held",
  barLabel: "The thread",
  barEnd: "✂",
  verdict: [
    "The thread runs golden. You read clearly — the reader smile on this one.",
    "The thread holds bright. The chapter lives in you; a strand or two slipped. Onward.",
    "The thread holds. The spine is yours, the finer turns still forming. Re-walk the movements and go on.",
    "One light in the fog. A single true sight is a beginning; the rest passed too quick. Linger here once more.",
    "The thread frays at the meaning, not the count. The pages turned faster than the tale took root. No frown — sit longer."
  ],
  examCrown: "◈ Every thread drawn taut ◈",
  examSub: "all {n} omens from the chapters you have walked, gathered into one reckoning",
  examMeta: "the reader weigh every chapter at once — no chapter announced, the thread alone must tell",
  examEmpty: "No omens to sit yet. Author a chapter with a <i>quiz</i> and the examination opens.",
  examBest: "Your best reckoning across all chapters: {best} / {total}",
  examVerdictCrown: "The Reader Render Full Judgment",
  examSmall: "Tap a truth to read it · every chapter at once",
  examVerdict: [
    "Every thread runs golden across all the chapters. The whole tale lives in you — the reader fall silent, and that silence is the highest praise.",
    "The weave holds bright end to end. A strand or two slipped, but the novel is yours.",
    "The weave holds. The great shape of the war is in you; the finer turns still settling — gather the frayed omens in the Review.",
    "The spine holds, the detail wavers. You know where the tale is going; sit with the chapters that slipped and the picture sharpens.",
    "Lights in the fog. Some threads caught, most passed too quick across so many chapters — gather them in the Review and walk again.",
    "The reckoning frays. So many chapters read fast leave little to hold — no frown; re-walk them one by one, then return to the full sitting."
  ],
  sceneLabel: "✦ The scene is set ✦",
  termsBand: "Words to carry",
  movementsBand: "The movements",
  byUnit: "By chapter"
    }
  }
];

/* Every authored unit, in reading order. Add an id here after writing data/<id>.js */
window.LOOM_BOOKS = [
  "iliad-01",
  "iliad-02",
  "iliad-03",
  "iliad-04",
  "iliad-05",
  "iliad-06",
  "iliad-07",
  "iliad-08",
  "iliad-09",
  "iliad-10",
  "iliad-11",
  "iliad-12",
  "iliad-13",
  "iliad-14",
  "iliad-15",
  "iliad-16",
  "iliad-17",
  "iliad-18",
  "iliad-19",
  "iliad-20",
  "iliad-21",
  "iliad-22",
  "iliad-23",
  "iliad-24",
  "odyssey-01",
  "odyssey-02",
  "odyssey-03",
  "odyssey-04",
  "odyssey-05",
  "odyssey-06",
  "odyssey-07",
  "odyssey-08",
  "odyssey-09",
  "odyssey-10",
  "odyssey-11",
  "odyssey-12",
  "odyssey-13",
  "odyssey-14",
  "odyssey-15",
  "odyssey-16",
  "odyssey-17",
  "odyssey-18",
  "odyssey-19",
  "odyssey-20",
  "odyssey-21",
  "odyssey-22",
  "odyssey-23",
  "odyssey-24",
  "rj-01",
  "rj-02",
  "rj-03",
  "rj-04",
  "rj-05"
];
