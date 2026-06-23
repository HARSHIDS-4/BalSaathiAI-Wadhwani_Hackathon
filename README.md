# BalSaathiAI 🌱
### *Har Baccha, Sahi Samay — Every Child, At The Right Time*

> AI-powered early developmental screening platform for children aged 0–6 years in rural India, built for Anganwadi and ASHA workers on the frontlines.

**Shai for Shiksha Hackathon 2026 — Powered by Wadhwani AI | Team Vibe Before Code**

---

## 🔗 Live Demo

**[🌐 View Platform →](https://bal-saathi-ai-wadhwani-hackathon.vercel.app/)**

> ⚠️ The screening flow requires the FastAPI backend to be running and reachable — see [Setup](#-setup--run-locally) below. If the live link's screening step fails to return a result, the backend may not be deployed/reachable at that moment.

---

## 🚨 The Problem

In India, **13.7 million children** live with developmental disabilities. The majority are identified only after age 5–6 — well past the critical 0–3 year intervention window. India's **1.4 million Anganwadi workers** — the people closest to these children — have no standardized, AI-assisted tool to screen for delays during routine home visits.

---

## 💡 Our Solution

BalSaathiAI lets a frontline worker screen a child across four developmental domains in under 5 minutes, get a real-time AI risk classification, generate a referral, and track whether the family actually followed through.

```
Worker selects child
      ↓
Answers domain-wise milestone questions
(Speech & Language → Motor Skills → Social & Emotional → Cognitive)
      ↓
"No" answers trigger adaptive follow-up questions
      ↓
Complete answer set sent to FastAPI /predict endpoint
      ↓
Trained Logistic Regression model returns risk classification
      ↓
🟢 On Track | 🟡 Watch | 🔴 Refer Now
      ↓
If Refer Now → referral generated → follow-up tracked
```

---

## 🧠 The AI — Real, Not Mocked

This is not a rule-based if/else system behind a UI. A trained scikit-learn **Logistic Regression** model (`model.pkl`) is loaded by FastAPI at startup and called on every screening submission.

| | |
|---|---|
| Model | Logistic Regression (Pipeline: ordinal encoding → feature selection → classifier) |
| Test Accuracy | 0.84 |
| Macro F1 | 0.84 |
| Training data | 50,000-record synthetic dataset, ASQ-3-informed weighted labels |
| Full evaluation | See [`EVALUATION.md`](./EVALUATION.md) — dataset, train/test split, confusion matrix, model comparison |

Full training, comparison against Random Forest and XGBoost, and an age-feature ablation study are documented in [`BalSaathi AI.ipynb`](./BalSaathi%20AI.ipynb).

---

## ✨ Key Features

- **Adaptive AI Screening** — "No" responses trigger targeted follow-up questions per domain, not a static checklist
- **3-Level Risk Flagging** — On Track / Watch / Refer Now, with domain-level context
- **Referral Generation** — nearest centre details + parent-facing message
- **Follow-Up Tracking** — closes the loop after referral
- **Supervisor Dashboard** — block-level screening coverage and pending cases
- **Multilingual UI** — Hindi, Bengali, Marathi, Tamil, Telugu, English (toggle)
- **Worker Training Module** — swipeable illustrated guides, not PDFs

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS |
| Animation | Framer Motion, GSAP, Three.js |
| Backend / ML API | FastAPI |
| ML | scikit-learn (Logistic Regression), pandas, numpy |
| Database (planned) | Supabase |
| Frontend hosting | Vercel |
| Backend hosting | Render / Railway (free tier) |

---

## 📁 Project Structure

```
BalSaathiAI-Wadhwani_Hackathon/
├── app.py                      # FastAPI backend — loads model.pkl, exposes /predict
├── model.pkl                  # Trained Logistic Regression pipeline
├── BalSaathi AI.ipynb          # Full ML notebook — training, evaluation, ablation study
├── EVALUATION.md               # Dataset, metrics, confusion matrix, justification
├── DEPLOYMENT.md               # Pilot plan, cost, scaling path
├── src/
│   ├── components/
│   │   ├── screening/          # ScreeningFlow.tsx — domain-wise question flow, calls API
│   │   ├── dashboard/          # Worker dashboard
│   │   ├── referral/           # Referral generation UI
│   │   ├── followup/           # Follow-up tracker
│   │   ├── analytics/          # Supervisor dashboard
│   │   ├── training/           # Worker training modules
│   │   ├── landing/            # Marketing/landing page
│   │   └── splash/             # Language selection splash screen
│   ├── services/
│   │   └── api.ts              # predictRisk() — calls FastAPI /predict
│   ├── data/                   # Demo/seed data
│   ├── contexts/                # React context providers
│   └── constants/
├── public/
├── package.json
└── vite.config.ts
```

---

## 🚀 Setup — Run Locally

This project has **two parts that must run together**: the React frontend and the FastAPI backend.

### 1. Backend (FastAPI + ML model)

```bash
# From project root
python -m venv myenv
source myenv/bin/activate        # Windows: myenv\Scripts\activate

pip install fastapi uvicorn scikit-learn pandas numpy

uvicorn app:app --reload --port 8000
```

API will run at `http://127.0.0.1:8000`
Interactive docs at `http://127.0.0.1:8000/docs`

### 2. Frontend (React + Vite)

```bash
# In a separate terminal, from project root
npm install
npm run dev
```

Frontend will run at `http://localhost:5173`

> **Note:** `src/services/api.ts` currently points to `http://127.0.0.1:8000`. For the live Vercel deployment to work end-to-end, this must point to a deployed backend URL (Render/Railway) via an environment variable rather than localhost.

---

## 📊 Demo Data

| Child | Age | Status |
|---|---|---|
| Meena | 24 months | 🔴 Refer Now |
| Arjun | 18 months | 🟢 On Track |
| Kavya | 30 months | 🟡 Watch |
| Ramu | 12 months | ⚪ Not Screened |

**Worker:** Savitri Devi — Anganwadi Centre 14, Rampur, Jharkhand

---

## 📄 Documentation

| File | Covers |
|---|---|
| [`EVALUATION.md`](./EVALUATION.md) | Dataset description, train/test split, model comparison, confusion matrix |
| [`DEPLOYMENT.md`](./DEPLOYMENT.md) | Pilot plan, infrastructure cost, scaling path, sustainability model |
| [`BalSaathi AI.ipynb`](./BalSaathi%20AI.ipynb) | Full ML pipeline — EDA, preprocessing, model training, ablation study |

---

## ⚠️ Disclaimer

BalSaathiAI is a **triage and referral support tool** — not a diagnostic system. It does not replace medical professionals. All flagged cases are referred to qualified specialists through established government channels (RBSK, PHCs). Model is trained on a clinically-informed **synthetic** dataset; real-world validation is the explicit goal of our proposed Phase 2 pilot.

---

## 👥 Team — Vibe Before Code

| Name | Role |
|---|---|
| Harshi Gupta | Machine Learning Developer — Scikit-Learn, XGBoost, LightGBM |
| Akshita Tyagi | Full-Stack Developer — React, Node.js, Tailwind CSS |
| Ankita Rai | Frontend Developer — React, Tailwind CSS |

---

<div align="center">

**हर बच्चा, सही समय पर।**
*Every child, at the right time.*

**[🌐 Live Platform](https://bal-saathi-ai-wadhwani-hackathon.vercel.app/)**

</div>