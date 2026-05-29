# BalSaathiAI-Wadhwani_Hackathon
### *Har Baccha, Sahi Samay — Every Child, At The Right Time*

> AI-powered early developmental screening platform for children aged 0–6 years in rural India, built for Anganwadi and ASHA workers on the frontlines.

**Shai for Shiksha Hackathon 2026 — Powered by Wadhwani AI**

---

## 🔗 Live Demo

**[🌐 View Platform →](https://bal-saathi-ai-wadhwani-hackathon.vercel.app/)**

---

## 🚨 The Problem

In India, **13.7 million children** live with developmental disabilities. The majority are identified only after age 5–6 — well past the critical 0–3 year intervention window.

| Reality | Number |
|---|---|
| Children with developmental disabilities in India | 13.7 Million |
| Average age of diagnosis in rural India | 5–6 Years |
| Critical intervention window | 0–3 Years |
| Anganwadi workers with no screening tool | 1.4 Million |
| Scalable village-level screening systems | 0 |

### Why does this happen?

- Existing screening tools are designed for doctors — not frontline workers
- No standardized protocol at the village level
- Referral systems exist on paper but are never tracked
- 60%+ Anganwadi centres have poor or no internet connectivity
- Tools are in English — unusable for workers in rural Bihar or Odisha

**By the time most children are identified, the window for intervention has already closed.**

---

## 💡 Our Solution — BalSaathiAI

A warm, intelligent, offline-first AI platform that empowers Anganwadi workers to:

1. **Screen** children for developmental delays in under 5 minutes
2. **Flag** risk across 4 domains using adaptive AI logic
3. **Refer** families to the nearest care centre with one tap
4. **Track** follow-ups so no child falls through the cracks

> BalSaathiAI is not a diagnostic tool. It is an intelligent triage and referral support system built specifically for India's frontline health workers.

---

## ✨ Key Features

### 🧠 Adaptive AI Screening
- Age-based milestone questions from validated ASQ-3 framework
- Covers 4 domains — Speech & Language, Motor Skills, Social & Emotional, Cognitive
- If a worker answers "No" — system triggers targeted follow-up questions automatically
- Feels conversational, not like a survey form

### 🚦 3-Level Risk Flagging
- 🟢 **On Track** — No action needed
- 🟡 **Watch** — Monitor closely, re-screen in 6 weeks
- 🔴 **Refer Now** — Developmental concern detected, immediate referral recommended

### 📋 Smart Referral Generation
- Auto-filled referral slip with child details and flagged domains
- Nearest RBSK centre shown with contact and directions
- Pre-written WhatsApp message to parent in their language — warm, simple, non-scary
- One-tap sharing

### 🔁 Closed-Loop Follow-Up Tracking
- Worker receives reminder 2 weeks after referral
- Status update — Visited / Not Yet / Needs Help
- Supervisor dashboard reflects every pending case in real time
- **No child falls through the cracks**

### 🎙️ Voice-Powered Accessibility
- Floating voice command button on home screen
- Worker can navigate by speaking — "Screen new child", "Show follow-ups"
- Questions read aloud via Text-to-Speech in selected language
- Designed for low-literacy frontline workers


### 📡 Offline-First Architecture
- Complete screening, result generation, and referral creation works without internet
- Data syncs automatically when connectivity is available
- Sync status indicator — never shows a broken error screen

### 📊 Supervisor Dashboard
- Block-level screening coverage per village
- Flagged children, referrals made, follow-ups pending
- **Risk Pulse AI Insight** — actionable district-level observations
- Accountability built in — shows which worker owns each pending case

### 🎓 Worker Training Module
- Instagram-story style illustrated learning guides
- Topics: How to ask questions, how to explain referrals, how to handle distressed parents
- No PDFs. No videos. Swipeable illustrated cards.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Anganwadi Worker                   │
│              (Android Mobile Device)                │
└─────────────────────┬───────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│              BalSaathiAI Platform                   │
│                                                     │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │  Screening  │  │  Adaptive AI │  │  Referral  │ │
│  │   Module    │→ │    Engine    │→ │  Generator │ │
│  └─────────────┘  └──────────────┘  └────────────┘ │
│                                            │        │
│  ┌─────────────┐  ┌──────────────┐         │        │
│  │  Follow-Up  │  │  Supervisor  │←────────┘        │
│  │   Tracker   │  │  Dashboard   │                  │
│  └─────────────┘  └──────────────┘                  │
│                                                     │
│  [Offline Storage Layer — AsyncStorage + SQLite]    │
│  [Syncs to central DB when internet available]      │
└─────────────────────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│           District Health System                    │
│     RBSK Centres | Block Supervisors | PHCs         │
└─────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Styling | TailwindCSS |
| Animations | Framer Motion + GSAP |
| 3D Elements | Three.js / React Three Fiber |
| Offline Storage | AsyncStorage + SQLite |
| Text-to-Speech | Expo Speech (hi-IN / en-IN) |
| Deployment | Vercel |
| Screening Logic | ASQ-3 validated decision tree |

---

## 📱 Screening Flow

```
Worker opens app
      ↓
Selects child profile
      ↓
Confirms age in months
      ↓
Answers 5–7 milestone questions
(picture-based, voice-assisted)
      ↓
AI processes responses adaptively
      ↓
Risk flag generated — 🟢 🟡 🔴
      ↓
If 🔴 → Referral slip auto-generated
      ↓
WhatsApp message sent to parent
      ↓
Worker marks referral made
      ↓
2 weeks later → Follow-up reminder
      ↓
Worker updates status
      ↓
Supervisor dashboard reflects outcome
```

---

## 👤 Demo Credentials

The platform is preloaded with demo data for judging.

**Worker:** Savitri Devi
**Centre:** Anganwadi Centre 14, Rampur, Jharkhand

| Child | Age | Status |
|---|---|---|
| Meena | 24 months | 🔴 Refer Now |
| Arjun | 18 months | 🟢 On Track |
| Kavya | 30 months | 🟡 Watch |
| Ramu | 12 months | ⚪ Not Screened |

**Supervisor Dashboard:**
47 screened · 6 flagged · 4 referrals · 2 follow-ups complete

---

## 🚀 Run Locally

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/balsaathiai.git

# Navigate to project
cd balsaathiai

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
http://localhost:5173
```

---

## 📁 Project Structure

```
balsaathiai/
├── public/
│   └── assets/
├── src/
│   ├── components/
│   │   ├── Hero/
│   │   ├── Screening/
│   │   ├── Referral/
│   │   ├── FollowUp/
│   │   ├── Dashboard/
│   │   └── Supervisor/
│   ├── data/
│   │   └── seedData.js        # Demo data
│   ├── utils/
│   │   ├── storage.js         # Offline storage layer
│   │   └── screeningLogic.js  # ASQ-3 decision engine
│   ├── App.jsx
│   └── main.jsx
├── README.md
├── package.json
└── vite.config.js
```

---

## 🎯 Impact Potential

BalSaathiAI is designed to scale across India's existing frontline health infrastructure — no new workers needed, no new infrastructure required.

- **1.4 million** Anganwadi workers — existing deployment network
- **158 million** children under 6 in India — addressable population
- **RBSK programme** — existing government referral infrastructure
- **0 to 3 years** — the window where intervention changes everything

> One screening. Five minutes. One child's life changed.

---

## 🧩 What Makes BalSaathiAI Different

| Feature | Other Solutions | BalSaathiAI |
|---|---|---|
| Designed for frontline workers | ❌ Built for doctors | ✅ |
| Works offline | ❌ Requires internet | ✅ |
| Closes the referral loop | ❌ Screening only | ✅ |
| Regional language support | ❌ English only | ✅ 6 languages |
| Low-literacy UI | ❌ Text heavy | ✅ Picture + voice |
| Supervisor accountability | ❌ No visibility | ✅ Dashboard |

---

## ⚠️ Disclaimer

BalSaathiAI is a **triage and referral support tool** — not a diagnostic system. It does not replace medical professionals. All flagged cases are referred to qualified specialists through established government channels (RBSK, PHCs).

---

## 👥 Team

Built with purpose at **Shai for Shiksha Hackathon 2026**
Powered by **Wadhwani AI**

| Name | Role |
|---|---|
| [Harshi] | Product Lead |
| [Akshita] | Developer |
| [Ankita] | UX / Research |

---

## 📄 License

MIT License — Open for use, adaptation, and deployment by NGOs, government bodies, and social impact organisations working in early childhood development.

---

<div align="center">

**हर बच्चा, सही समय पर।**
*Every child, at the right time.*

**[🌐 Live Platform](https://bal-saathi-ai-wadhwani-hackathon.vercel.app/) · [📋 Problem Statement](#-the-problem) · [💡 Solution](#-our-solution--balsaathiai)**

</div>

