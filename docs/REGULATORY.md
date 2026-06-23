# Next Play — Intended Use & Risk Overview (Draft)

> **This is an internal working draft, not legal or regulatory advice.** It is a
> starting point for a qualified regulatory/FDA attorney to review before any
> launch. Nothing here should be treated as a determination of device status.

---

## 1. Intended Use Statement

**Next Play is a bilingual (English/Spanish) educational and care-navigation tool
that helps athletes, parents, coaches, athletic trainers, and clinicians decide
the next safest level of care after a sports injury, and prepare a written
summary to share with a healthcare professional.**

Next Play:

- Provides general health information and a deterministic, rules-based
  suggestion of an appropriate **level of care** (emergency, urgent same-day,
  scheduled sports-medicine evaluation, or monitor-with-a-plan).
- Surfaces well-established **warning signs** that warrant urgent or emergency
  evaluation, and general first-72-hour and staged return-to-play information.
- Generates a structured **summary** the user can share with a clinician.

Next Play does **not**:

- Diagnose, or identify, a specific injury or condition.
- Recommend a specific treatment, drug, or dose.
- Clear, or authorize, any athlete to return to play, practice, or competition.
- Replace evaluation, diagnosis, or treatment by a qualified professional.
- Function as a real-time monitoring or emergency-dispatch system.

## 2. Indications for Use

For lay caregivers and athletes seeking information about whether and how quickly
to seek care after a suspected sports injury, and for coaches, athletic trainers,
and clinicians as a communication and documentation aid. General audience; the
content is oriented to youth/adolescent and adult recreational and organized
sport. Not for use in place of calling emergency services in an emergency.

## 3. Limitations

- Output is only as good as the user-entered information; the tool cannot
  examine the patient.
- It is rules-based and intentionally conservative; it may recommend more care
  than is ultimately necessary ("over-triage" is a deliberate safety bias).
- It does not cover every injury or scenario.
- It is not a substitute for an in-person evaluation or for 911 in an emergency.

## 4. Regulatory positioning rationale (to be confirmed by counsel)

The design deliberately tries to stay on the safer side of the U.S. medical
device line by aligning with the FDA's **Clinical Decision Support / 21st Century
Cures Act** thinking and general-wellness/medical-information concepts:

1. **No device-type data analysis.** It does not analyze images, signals, or
   patterns from a medical device (e.g., no concussion "scoring" from sensors).
2. **Transparent, inspectable basis.** The logic is deterministic and rules-based
   (`src/lib/triage.ts`), so the basis for every recommendation can be reviewed
   and independently verified — not a black box.
3. **Level-of-care navigation, not diagnosis or treatment directives.** It points
   to *where/when to seek care*, and never states a diagnosis or a specific
   treatment to administer.
4. **Human in the loop / escalation-first.** Every pathway directs to a clinician
   or emergency care and repeats that it does not replace medical care.

**Key finding (from the sourced research review) — flag for counsel:** the FDA
non-device CDS exclusion under the 21st Century Cures Act is built around software
that supports a **healthcare professional**, not a patient or caregiver. FDA's CDS
guidance (updated Jan 2026) applies the exclusion only when all four criteria are
met *and* the recommendation is HCP-directed; FDA also states digital-health
device policies continue to apply to functions intended for **patients or
caregivers**. Therefore a patient-facing youth-injury triage app is **likely NOT
protected by the non-device CDS exclusion**, even though its logic is transparent
and citation-backed. Transparency is good product design and trust, but it does
not by itself move a patient-facing, condition-oriented triage recommendation into
the safe harbor. The "general wellness" category is also a poor fit, since the app
addresses injury and care escalation rather than general healthy living.

**Therefore the conservative, defensible posture is to design and message Next Play
as a navigation + hand-off tool** that (a) never diagnoses, (b) never clears return
to play, (c) always routes toward clinician involvement, (d) presents transparent,
citation-backed rules, and (e) is framed as *support for contacting appropriate
care*, not a substitute for professional judgment. FDA's own examples are more
favorable to software that helps users **organize, record, and share** health
information with clinicians than to software that appears to replace clinician
reasoning. Get formal FDA/regulatory counsel before launch; review marketing
claims, the on-field first-response content, and any future personalization.
Published symptom-checker literature is a warning against overconfidence
(accuracy is variable), which supports the deliberate **over-triage bias**.

## 5. Risk analysis (initial hazard list)

| # | Hazard | Cause | Severity | Mitigation in product |
|---|--------|-------|----------|-----------------------|
| 1 | Under-triage (dangerous injury told to "monitor") | Gaps in rules; user mis-codes the injury | Critical | Conservative ordered rules that bias UP; global red flags always shown; broadened concussion/heat screening; deterministic test suite (`scripts/triage-check.ts`) |
| 2 | False reassurance | Wording implies "you're fine"/"cleared" | High | Hard content rule: never says "fine" or "cleared"; monitor copy states "no warning signs now ≠ cleared to play" |
| 3 | Perceived diagnosis | Output reads as a diagnosis | High | No diagnostic labels; "level of care" framing; persistent disclaimer banner + `/disclaimer` |
| 4 | Delayed emergency care | User reads app instead of calling 911 | Critical | Emergency pathway leads with a 911 call button; landing emergency note; `/emergency` first-response page leads with "call 911 first" |
| 5 | Mistranslation changes safety meaning | Inaccurate Spanish | High | Bilingual `{ en, es }` pairs reviewed together; compile-enforced EN/ES key parity; native-Spanish review pass |
| 6 | Privacy exposure of shared summary | PHI in a shared link/QR | Medium | Data kept in the URL **fragment** (never sent to a server); explicit in-product notice; planned move to access-controlled server storage |
| 7 | First-response steps misapplied | Bystander attempts unsafe maneuver | Medium/High | "Only do what you're trained to do"; "call 911 first"; steps aligned to widely taught guidance |

## 6. Required disclaimers (present in product)

- "This app does not replace medical care." (every pathway + persistent banner)
- "If you think there may be a medical emergency, call 911 (or your local
  emergency number) immediately." (`/disclaimer`)
- "Using Next Play does not create a doctor–patient relationship." (`/disclaimer`)

## 7. Recommended next steps before launch

1. Engage regulatory/FDA counsel for a device-status determination.
2. Finalize an intended-use statement and labeling/marketing claims with counsel.
3. Establish a clinical content governance process: a named clinician owner,
   versioned rule sets, a change log, and a periodic literature review with
   "last reviewed" dates on safety content.
4. Privacy/security review (HIPAA applicability, data handling) before any
   server-side persistence or accounts.
5. Document the deterministic rule set and its evidence basis (guideline links).
