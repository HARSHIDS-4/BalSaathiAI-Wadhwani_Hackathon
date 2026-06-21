# BalSaathiAI — Deployment & Sustainability Plan

**Shai for Shiksha Hackathon 2026 | Team Vibe Before Code**

---

## 1. Current Deployment Status

| Layer | Technology | Status |
|---|---|---|
| Frontend | React + Vite + TypeScript | Deployed on Vercel (free tier) |
| Backend / ML API | FastAPI + scikit-learn | Built, pending production deployment (Render/Railway free tier) |
| Model | Logistic Regression pipeline (`model.pkl`) | Trained, evaluated, exported |
| Data storage | None yet (prototype is stateless per session) | Planned for Phase 2 |

**Current cost: ₹0.** Entirely on free tiers.

---

## 2. Phase 1 — Pilot (Months 1–3)

**Goal:** Validate the screening flow and AI model with real Anganwadi workers and real children, not synthetic data.

| Parameter | Detail |
|---|---|
| Sites | 2 Anganwadi centres, 1 district (Jharkhand) |
| Sample size | 50 children, ages 12–72 months |
| Duration | 3 months |
| Worker onboarding | 30-minute training session per centre, using in-app training module |
| Approval pathway | District ICDS (Integrated Child Development Services) office sign-off |
| Supervision | 1 block supervisor monitors via Supervisor Dashboard |

**Pilot Infrastructure & Cost**

| Item | Tier | Cost |
|---|---|---|
| Frontend hosting (Vercel) | Free | ₹0 |
| Backend hosting (Render/Railway) | Free tier | ₹0 |
| Database (Supabase) | Free tier (500MB) | ₹0 |
| Domain (optional) | — | ~₹800/year |
| **Total Phase 1 cost** | | **~₹0–800 for 3 months** |

**Pilot Success Metrics**

- Screening completion rate (target: >90% of started screenings completed)
- Average screening time (target: <5 minutes)
- Referral confirmation rate — flagged children who reach a centre
- Worker-reported usability score (post-pilot survey)
- Model recalibration: real classification report vs. synthetic-trained baseline

---

## 3. Phase 2 — Scale (Months 4–9)

**Goal:** Expand from pilot to district-wide deployment with real infrastructure.

| Parameter | Detail |
|---|---|
| Sites | 5 districts, ~500 Anganwadi centres |
| Sample size | 50,000+ screenings (estimated) |
| Partnership | State Health Department, NHM (National Health Mission) |
| Referral integration | RBSK (Rashtriya Bal Swasthya Karyakram) centre database |

**Scale Infrastructure & Cost**

| Item | Tier | Estimated Monthly Cost |
|---|---|---|
| Frontend hosting (Vercel Pro) | Pro | ~₹1,600/month |
| Backend hosting (Render/Railway) | Starter/Standard | ~₹600–1,500/month |
| Database (Supabase Pro) | Pro | ~₹1,800/month |
| SMS/WhatsApp API (referral notifications) | Pay-per-use | ~₹2,000–4,000/month (volume dependent) |
| **Total Phase 2 cost** | | **~₹6,000–9,000/month** |

**Maintenance Requirements**

- 1 part-time backend maintainer (model monitoring, API uptime)
- Quarterly model retraining cycle as real screening data accumulates
- Worker support channel for technical issues (WhatsApp group, as used by hackathon mentors — same low-friction model)

---

## 4. Phase 3 — National Pathway (Year 2+)

**Goal:** Integration with existing government digital health infrastructure rather than a standalone parallel system.

| Initiative | Detail |
|---|---|
| ICDS-CAS integration | API integration with the national ICDS Common Application Software, where Anganwadi workers already log data |
| Language expansion | All 22 scheduled Indian languages (currently: Hindi, Bengali, Marathi, Tamil, Telugu, English) |
| Offline-first hardening | Full PWA with service workers + IndexedDB for zero-connectivity field use |
| Feature-phone fallback | SMS/IVR-based screening for areas without smartphone access |

**Estimated Phase 3 Cost**

| Item | Estimated Cost |
|---|---|
| Cloud infrastructure (national scale) | ~₹40,000–80,000/month (usage-dependent) |
| Dedicated engineering support | 1–2 full-time roles |
| Government integration/compliance | Variable — typically absorbed under existing NHM/ICDS digital budgets |

This phase is **not self-funded** — it depends on government or NGO partnership, consistent with how comparable public health tools (e.g., Poshan Tracker, RBSK digital systems) are sustained in India today.

---

## 5. Sustainability Model

BalSaathiAI is designed to be sustained through **existing public infrastructure, not new standalone funding**:

1. **No new workforce required** — uses India's existing 1.4 million Anganwadi workers
2. **No new hardware required** — works on basic Android smartphones already issued/used in the field
3. **No new referral network required** — routes into the existing RBSK government referral system
4. **Open architecture** — built with standard, swappable components (React, FastAPI, scikit-learn, Supabase) rather than proprietary lock-in, keeping long-term maintenance cost low

**Funding pathway, in order of likelihood:**
1. State NHM digital health budget (post-pilot, if validated)
2. NGO/CSR partnership for Phase 1–2 bridge funding
3. Central government ICDS digital modernization allocation (Phase 3)

---

## 6. Risk & Mitigation

| Risk | Mitigation |
|---|---|
| Model underperforms on real data vs. synthetic | Phase 1 pilot explicitly designed to surface this early, before any scale commitment |
| Low connectivity in target villages | Offline-first architecture (Phase 3) planned; pilot accepts manual sync as interim |
| Worker resistance to new tool | In-app training module + 30-min onboarding; mentors/supervisors as champions |
| Data privacy concerns | No PII stored beyond what's needed for referral; consent built into screening flow (see README — Responsible AI section) |

---

*BalSaathiAI — Har Baccha, Sahi Samay*
*Team Vibe Before Code | Shai for Shiksha Hackathon 2026*
