# Next Play

**Clearer injury decisions. Safer return to play.**

Next Play is a mobile-first, bilingual (English / Spanish) web app that helps injured
athletes, parents, coaches, athletic trainers, and clinicians find the **next safest step**
after a sports injury. It is a **navigation and triage tool — not a diagnostic tool**. It does
not diagnose, does not clear anyone to return to play, and does not replace medical care. It
organizes what you already know about an injury and points to the right level of care:

| Pathway | When |
| --- | --- |
| 🟥 **Emergency now** | Warning signs that can be dangerous (e.g. loss of consciousness, chest pain, neuro symptoms, heat collapse). |
| 🟧 **Urgent — same-day** | Possible fracture/dislocation, can't bear weight, concussion symptoms, major swelling. |
| 🟦 **Sports medicine eval** | Persistent/overuse pain, throwing-arm pain, an injury "pop," or worsening symptoms. |
| 🟩 **Monitor + 72-hour plan** | No warning signs and mild/improving symptoms. |

The triage logic is **deterministic and rules-based on purpose** (no AI in the decision path),
so a physician can read, audit, and edit every decision.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build + full TypeScript typecheck
npm start        # run the production build
npx tsx scripts/triage-check.ts   # run the triage safety scenarios
```

Requirements: Node 18+ (developed on Node 25).

---

## Tech stack

- **Next.js (App Router) + TypeScript** — mobile-first, PWA-ready (manifest + theme color).
- **Tailwind CSS v4** — design tokens for the medical palette live in `src/app/globals.css`.
- **Hand-rolled shadcn-style UI primitives** in `src/components/ui/` (Button, Card, Badge,
  RadioCard, CheckboxRow, Progress) + `lucide-react` icons.
- **Custom lightweight i18n** — a React context with an instant English/Spanish toggle.
- **Local-first state** — React context mirrored to `sessionStorage`. No backend yet; the store
  is isolated so Supabase can be added later without touching the screens.

---

## Where to edit things (for the physician-founder)

Everything a clinician needs to edit is plain TypeScript data — no JSX, no framework knowledge.

### 1. Triage rules → `src/lib/triage.ts`

This is the single, deterministic `evaluateTriage(intake)` function. It is an **ordered if/else
ladder** evaluated top to bottom; the first match wins, so the most dangerous conditions are
checked first. Each rule has a comment explaining it. To change *how a warning sign is treated*,
you usually don't touch this file at all — you change the flag's tier (below).

```ts
evaluateTriage(intake) => {
  pathway: "emergency" | "urgent" | "sportsMed" | "monitor",
  reasons: string[],          // why this pathway was chosen
  recommendations: string[],  // intake-specific "what to do now"
  restrictions: string[],     // intake-specific "what not to do"
  roadmapType: string,
}
```

### 2. Warning signs / red flags → `src/content/redFlags.ts`

Each red flag has a `tier`:

- `"emergency"` → forces the **Emergency** pathway.
- `"urgent"` → forces at least the **Urgent same-day** pathway.

and a `category` (`global` shown always, `concussion` shown for head injuries, `heat` shown for
heat injuries). **Change a `tier` here to change triage behavior — no engine edits needed.**

### 3. English + Spanish safety content → `src/content/`

Every medical string is an `{ en, es }` pair, so you edit **both languages side-by-side**:

| File | Content |
| --- | --- |
| `carePathways.ts` | The four pathways: explanation, what to do, what not to do, what to watch for, next step, return-to-play principle. |
| `roadmaps.ts` | The 8 return-to-play roadmaps + a general fallback (shared 7 stages, per-injury detail). |
| `first72.ts` | Reusable first-72-hour content blocks. |
| `redFlags.ts` | Warning-sign labels. |
| `bodyRegions.ts`, `mechanisms.ts`, `roles.ts` | Intake option labels. |
| `pages.ts` | About + disclaimer page copy. |

### 4. UI text (buttons, headings) → `src/content/ui.ts`

`en` is the source of truth. `es` is typed as `typeof en`, so **if you add an English key the
build fails until you add the matching Spanish key** — the two languages can never drift.

### 5. Return-to-play roadmaps → `src/content/roadmaps.ts`

All 8 roadmaps (ankle, knee, hamstring, shoulder, elbow/throwing, concussion, heat illness,
calf/Achilles) plus a `general` fallback share the same 7 stages (`STAGE_TITLES`); each injury
customizes one detail line per stage.

---

## How the safety model works

Per the product thesis, Next Play deliberately stays on the safe side of medical-software risk by
**emphasizing escalation, documentation, and clinician review rather than autonomous diagnosis**:

- It never says "you are fine" or "cleared to play," and never gives a diagnosis.
- It never tells anyone to return to competition on the app's word alone.
- Every result shows: *"This app does not replace medical care."*
- Any concussion symptom ⇒ explicit **no same-day return to play** + evaluation.
- Heat with altered mental status, chest pain/fainting, trouble breathing, or post-trauma neuro
  symptoms ⇒ **Emergency**.

These invariants are enforced in `src/lib/triage.ts` and the copy in `src/content/carePathways.ts`,
and are exercised by `scripts/triage-check.ts`.

---

## Project structure

```
src/
  app/            # routes: / /start /intake /result /summary /roadmaps /about /disclaimer
  components/     # feature components + ui/ primitives
  content/        # ALL clinician-editable data (bilingual)
  lib/            # triage.ts (engine), i18n, store, summary, types, utils
scripts/
  triage-check.ts # deterministic triage safety scenarios
```

User flow: `/` → `/start` (role, language, athlete info) → `/intake` (region → mechanism →
red flags → functional questions) → `/result` (care pathway) → `/summary` (clinician handoff,
copy/print/share).

---

## Adding things

- **A new body region:** add an id to `BodyRegionId` in `src/lib/types.ts`, a label in
  `src/content/bodyRegions.ts`, and (optionally) map it to a roadmap in `roadmapForRegion()` in
  `src/lib/triage.ts`.
- **A new red flag:** add an entry to `src/content/redFlags.ts` with a unique `id`, a `tier`,
  and a `category`. The checklist and triage pick it up automatically.
- **A new roadmap:** add a `RoadmapId` in `src/lib/types.ts` and a source entry in
  `src/content/roadmaps.ts`.

---

## Roadmap (next steps)

1. **Clinician handoff + escalation loop** — a shareable/QR summary link an ATC or parent can
   hand to the sports-medicine clinic, plus persistence (Supabase) so summaries and a symptom
   diary survive across devices. This is the school-first, clinician-routable wedge.
2. Body-region-specific functional questions and roadmaps beyond the current set.
3. Accounts + saved injuries; analytics for schools/clinics.

---

## Disclaimer

Next Play provides general health information and injury-navigation guidance only. It is not a
medical device and does not provide a diagnosis. It cannot clear anyone to return to play and does
not replace evaluation, diagnosis, or treatment by a qualified healthcare professional. If you
think there may be a medical emergency, call 911 (or your local emergency number) immediately.
