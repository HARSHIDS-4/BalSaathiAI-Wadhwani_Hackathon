# BalSaathiAI 🌱
### *Har Baccha, Sahi Samay — Every Child, At The Right Time*

> AI-powered early developmental screening platform for children aged 0–6 years in rural India, built for Anganwadi and ASHA workers on the frontlines.

**Shai for Shiksha Hackathon 2026 — Powered by Wadhwani AI | Team Vibe Before Code**

---

## 🔗 Live Demo

**[🌐 View Platform →](https://bal-saathi-ai-wadhwani-hackathon.vercel.app/)**

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

A trained scikit-learn **Logistic Regression** model (`model.pkl`) is loaded by FastAPI at startup and called on every screening submission. No hardcoded outputs.

### Model Comparison

Four models were evaluated. Logistic Regression was chosen for its balance of accuracy, interpretability, and inference speed, making it ideal for on-device deployment by frontline workers.

| Model | Test Accuracy | Macro F1 | Watch F1 | Refer Now Recall |
|---|---|---|---|---|
| **Logistic Regression** | **0.84** | **0.84** | 0.74 | 0.86 |
| Random Forest (default) | 0.80 | 0.79 | 0.67 | 0.85 |
| Random Forest (tuned) | 0.82 | 0.82 | 0.71 | 0.87 |
| XGBoost | 0.84 | 0.84 | **0.75** | 0.86 |

**Why Logistic Regression?**
It matched the performance of more complex models like XGBoost on key metrics while being significantly more lightweight and interpretable—a crucial factor for a public health tool where understanding model behavior is important.

The full training process, exploratory data analysis (EDA), and detailed model comparisons are documented in the `BalSaathi AI.ipynb` notebook.

Full training, model comparison (RF vs XGBoost vs LR), documented in [`BalSaathi AI.ipynb`](./BalSaathiAI.ipynb).

---

## ✨ Key Features

- **Adaptive AI Screening** — "No" responses trigger targeted follow-up questions per domain
- **3-Level Risk Flagging** — On Track / Watch / Refer Now with domain-level context
- **Smart Referral Generation** — nearest RBSK centre + parent WhatsApp message
- **Follow-Up Tracking** — closes the loop after referral
- **Supervisor Dashboard** — block-level screening coverage and pending cases
- **Multilingual UI** — Hindi, Bengali, Marathi, Tamil, Telugu, English
- **Worker Training Module** — swipeable illustrated guides

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS |
| Animation | Framer Motion, GSAP, Three.js |
| Backend / ML API | FastAPI + Uvicorn |
| ML | scikit-learn, pandas, numpy,XGBoost |
| Containerization | Docker |
| Frontend hosting | Vercel |
| Backend hosting | Docker Hub → Render  |

---

## 📁 Project Structure

```
BalSaathiAI-Wadhwani_Hackathon/
├── app.py                      # FastAPI backend — loads model.pkl, exposes /predict
├── model.pkl                   # Trained Logistic Regression pipeline
├── requirements.txt            # Python dependencies
├── Dockerfile                  # Docker config for backend
├── BalSaathi AI.ipynb          # Full ML notebook — training, evaluation, ablation study
├── EVALUATION.md               # Dataset, metrics, confusion matrix, justification
├── DEPLOYMENT.md               # Pilot plan, cost, scaling path
├── src/
│   ├── components/
│   │   ├── screening/          # ScreeningFlow.tsx — domain-wise flow, calls /predict
│   │   ├── dashboard/          # Worker dashboard
│   │   ├── referral/           # Referral generation UI
│   │   ├── followup/           # Follow-up tracker
│   │   ├── analytics/          # Supervisor dashboard
│   │   ├── training/           # Worker training modules
│   │   ├── landing/            # Landing page
│   │   └── splash/             # Language selection
│   ├── services/
│   │   └── api.ts              # predictRisk() — typed call to FastAPI /predict
│   ├── data/
│   ├── contexts/
│   └── constants/
├── public/
├── package.json
└── vite.config.ts
```

---

## 🚀 Setup — Run Locally

This project has **two parts**: React frontend + FastAPI backend. Both must run together.

### Option A — Docker (Recommended for Backend)

```bash
# Pull the backend image from Docker Hub
docker pull harshi16gupta/balsaathi

# Run the container
docker run -d -p 8000:8000 harshi16gupta/balsaathi
```

Backend runs at `http://localhost:8000`
API docs at `http://localhost:8000/docs`

---

### Option B — Run Backend Without Docker

```bash
# Create virtual environment
python -m venv myenv
source myenv/bin/activate        # Windows: myenv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
uvicorn app:app --reload --port 8000
```

---

### Frontend (both options)

```bash
# In a separate terminal
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

 

---

## 🐳 Docker Hub

**Image:** [`harshi16gupta/balsaathi`](https://hub.docker.com/r/harshi16gupta/balsaathi)

```bash
docker pull harshi16gupta/balsaathi
docker run -d -p 8000:8000 harshi16gupta/balsaathi
```

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

## ⚠️ Disclaimer

BalSaathiAI is a **triage and referral support tool** — not a diagnostic system. Model is trained on a clinically-informed **synthetic** dataset; real-world validation is the explicit goal of our proposed Phase 2 pilot. See `EVALUATION.md` for full disclosure.

---

## 👥 Team — Vibe Before Code

| Name | Role |
|---|---|
| Harshi Gupta | ML Developer — scikit-learn, FastAPI, Docker |
| Akshita Tyagi | Full-Stack Developer — React, Node.js, Tailwind CSS |
| Ankita Rai | Frontend Developer — React, Tailwind CSS |

---


**हर बच्चा, सही समय पर।**
*Every child, at the right time.*

**[🌐 Live Platform](https://bal-saathi-ai-wadhwani-hackathon.vercel.app/)** · **[🐳 Docker Hub](https://hub.docker.com/r/harshi16gupta/balsaathi)**
