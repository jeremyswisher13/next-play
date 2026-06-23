# Next Play — Clinical Sources & Rationale

This maps the deterministic triage engine (`src/lib/triage.ts`), the warning-sign
list (`src/content/redFlags.ts`), the first-response steps (`src/content/emergency.ts`),
and the return-to-play roadmaps (`src/content/roadmaps.ts`) to current
sports-medicine guidance. It is derived from a sourced research review and is
intended for the physician owner to audit and keep current (add a "last
reviewed" date when you revise).

> Next Play is a **non-diagnostic navigation tool**. These sources inform *level
> of care* and *what-to-do-now* guidance; they are not used to diagnose.

## Design principles (evidence-aligned)

- **Red-flag-first.** Time-critical patterns force *Emergency now* before any
  body-part questions (cardiac arrest, cervical-spine danger signs, heat stroke,
  severe bleeding, neurovascular compromise, open fracture/dislocation,
  compartment syndrome). — NATA SCA consensus; NATA cervical-spine; NATA EHI; AAOS.
- **Pediatric ≠ small adult.** Growth-plate (physeal) injury, apophysitis, SCFE,
  and throwing-arm physeal stress are up-triaged. — AAOS growth-plate fractures;
  OrthoKids; AAP overuse; HealthyChildren Little League elbow.
- **Monitor is narrow.** Only mild symptoms, no red flags, normal neurovascular
  status, able to use/bear weight, and clearly improving over 24–72h; otherwise
  auto-escalate. — AHRQ health-literacy (action-based follow-up).
- **A negative Ottawa rule ≠ "safe to play."** It lowers fracture likelihood
  only; it does not clear ligament/tendon/growth-plate injury or return to sport.

## Triage thresholds → sources

| Engine decision | Source(s) |
| --- | --- |
| Concussion danger signs → **Emergency** | CDC HEADS UP danger signs — https://www.cdc.gov/heads-up/signs-symptoms/index.html |
| Any concussion symptom, no danger signs → **Urgent**, remove from play, **no same-day return** | CDC HEADS UP returning-to-sports — https://www.cdc.gov/heads-up/guidelines/returning-to-sports.html ; NATA |
| Neck pain/stiffness after trauma (± neuro) → **Emergency** (with neuro) / **Urgent** (without); never self-clear | NATA acute cervical-spine management — https://www.nata.org/sites/default/files/2025-08/acute_management_of_the_cervical_spine-injured_athlete.pdf |
| Exertional heat stroke (collapse / altered mental status) → **Emergency, cool-first** | NATA exertional heat illnesses — https://www.nata.org/sites/default/files/2025-08/exertional_heat_illnesses.pdf ; Korey Stringer Institute (cold-water immersion) |
| Heat exhaustion/syncope → **Urgent**; cramps only → **Monitor** | NATA exertional heat illnesses (Table 3 distinctions) |
| Collapse + abnormal/agonal breathing; chest blow → collapse (commotio cordis) → **Emergency, CPR + AED** | NATA SCA consensus — https://www.nata.org/sites/default/files/2025-08/sudden-cardiac-arrest-consensus-statement.pdf ; AHA CERP |
| Exertional chest pain / fainting / palpitations / unusual breathlessness → **≥ Urgent**, never Monitor | NATA preventing sudden death — https://www.nata.org/sites/default/files/2025-08/preventing_sudden_death_in_sports.pdf |
| Severe bleeding → **Emergency**, direct pressure / tourniquet | Stop the Bleed — https://www.stopthebleed.org/ ; Red Cross |
| Open fracture / deformity / absent pulse / cold-pale limb / compartment signs (pain out of proportion, pain with passive stretch, tense compartment; pediatric "3 A's") → **Emergency** | AAOS compartment syndrome — https://orthoinfo.aaos.org/en/diseases--conditions/compartment-syndrome/ ; AAOS growth-plate fractures |
| Focal bony tenderness / cannot bear weight or use normally → **Urgent same-day** (suspected fracture; growth-plate injuries mimic "sprains") | AAOS growth-plate fractures — https://orthoinfo.aaos.org/en/diseases--conditions/growth-plate-fractures/ ; Ottawa rules |
| Wrist + fall + bony (snuffbox) tenderness → **Urgent** (possible scaphoid; do not dismiss as sprain) | RCH scaphoid guideline — https://www.rch.org.au/clinicalguide/guideline_index/fractures/ |
| Teen + hip/groin/thigh/knee pain (esp. limp; knee pain can be referred hip) → up-triage (**SCFE**) | OrthoKids / AAOS SCFE — https://orthoinfo.aaos.org/en/diseases--conditions/slipped-capital-femoral-epiphysis-scfe |
| Throwing elbow/shoulder pain (esp. next-day) → **Sports-med eval** (Little League elbow/shoulder = physeal) | HealthyChildren Little League elbow — https://www.healthychildren.org/English/health-issues/injuries-emergencies/sports-injuries/Pages/little-league-elbow.aspx ; AAP/Pitch Smart |
| Apophysitis (Osgood-Schlatter knee, Sever's heel, hip/pelvis) → **Sports-med eval** | OrthoKids Osgood-Schlatter — https://orthokids.org/conditions/osgood-schlatter-s-disease/ ; OrthoKids Sever's; Scottish Rite hip/pelvis apophysitis |
| Achilles pop / unable to push off → **Urgent** (possible rupture) | AAOS Achilles rupture — https://orthoinfo.aaos.org/en/diseases--conditions/achilles-tendon-rupture-tear/ |
| Ankle: Ottawa-positive → **Urgent**; mild, walks 4 steps, improving → **Monitor** | Ottawa Ankle Rules — https://pmc.ncbi.nlm.nih.gov/articles/PMC149439/ |

## Return-to-play / return-to-learn → sources

- Concussion staged RTP + return-to-learn (no same-day RTP; school before risky
  sport; ≥24h between steps; written clearance for contact): CDC return-to-school
  https://www.cdc.gov/heads-up/guidelines/returning-to-school.html ; CDC return-to-sports.
- Ankle sprain RTS: JOSPT ankle sprain CPG — https://www.jospt.org/doi/10.2519/jospt.2021.0302
- ACL / knee RTS (youth: no pivoting competition too early; ~12 months; clearance): pediatric ACL consensus.
- Hamstring RTS: JOSPT hamstring CPG — https://www.jospt.org/doi/10.2519/jospt.2022.0301
- Shoulder/throwing return: Bern shoulder consensus — https://ifspt.org/wp-content/uploads/2025/05/2022-Bern-Consensus.pdf ; Little League shoulder.
- Elbow/throwing return: HealthyChildren Little League elbow; Pitch Smart.
- Post–heat stroke return (mandatory written clearance, 7–21 day rest): NATA EHI.

## First response → sources

- Cardiac collapse (CPR + AED; agonal gasps / myoclonic jerks still = arrest):
  NATA SCA consensus; AHA CERP — https://cpr.heart.org/
- Heat stroke (cool-first, cold-water immersion, transport second): NATA EHI; KSI.
- Cervical spine (manual in-line stabilization; do not remove helmet/pads; do not
  sit up or walk off): NATA cervical-spine statement.
- Severe bleeding (direct pressure, tourniquet for limb): Stop the Bleed; Red Cross.

## Communication & regulatory → sources

- Plain language ~5th–6th grade, action-based, teach-back: AHRQ — https://psnet.ahrq.gov/primer/personal-health-literacy ; CDC Clear Communication — https://www.cdc.gov/health-literacy/php/develop-materials/guidance-standards.html
- Parent-friendly US Spanish (plain, non-literal, regionally neutral): NIH Spanish Style Guide — https://digital.gov/s3/files/m-files/NIH_Spanish_Style_Guide_Eng_ver.pdf
- Regulatory framing: FDA CDS guidance — https://www.fda.gov/regulatory-information/search-fda-guidance-documents/clinical-decision-support-software ; FDA examples (not devices) — https://www.fda.gov/medical-devices/device-software-functions-including-mobile-medical-applications/examples-software-functions-are-not-medical-devices ; symptom-checker accuracy caution — https://www.nature.com/articles/s41746-022-00667-w
