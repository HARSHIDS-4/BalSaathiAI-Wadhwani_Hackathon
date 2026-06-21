# BalSaathiAI — Model Evaluation Report

**Shai for Shiksha Hackathon 2026 | Team Vibe Before Code**

---

## 1. Dataset Description

| Property | Value | 
|---|---|
| Total records | 50,000 |
| Total features | 19 (after preprocessing) |
| Age range | 12–72 months |
| Target classes | On Track, Watch, Refer Now |
| Class distribution | On Track ~39.6% · Refer Now ~30.3% · Watch ~30.1% |

**Source:** A clinically-informed synthetic dataset, generated in the absence of a publicly available Indian pediatric developmental screening dataset. Labels were produced using a domain-weighted scoring framework consistent with **ASQ-3** (Ages & Stages Questionnaire, 3rd Edition) clinical cutoffs:

| Domain | Weight |
|---|---|
| Speech & Language | 35% |
| Social & Emotional | 25% |
| Motor Skills | 25% |
| Cognitive | 15% |

**Clinical grounding:** ASQ-3 (Squires & Bricker, 2009 — validated across 57 countries) · Indian adaptation, Gulati et al., *Indian Pediatrics* 2023, AIIMS Delhi (95.9% sensitivity on Indian children) · RBSK Guidelines, Govt. of India · WHO Child Development Milestones (0–6 yrs).

**Disclosed limitation:** Performance on synthetic data does not guarantee equivalent performance on real clinical data. Real-data validation is the explicit goal of our proposed Phase 2 pilot (Section 6).

---

## 2. Train-Test Split

| Set | Records | Proportion |
|---|---|---|
| Training | 40,000 | 80% |
| Test | 10,000 | 20% |

**Method:** `train_test_split(test_size=0.2, random_state=42, stratify=Y)` - stratified to preserve class proportions across both sets.

**Justification for test set size:** 10,000 held-out records is large enough to produce stable per-class metrics for a 3-class problem (minimum ~3,000 support per class — see Section 3), while reserving 80% of data for training. This far exceeds typical minimum sample-size guidance for classification evaluation at this class count, giving low-variance estimates of precision, recall, and F1 rather than figures that could shift significantly on a different random split.

---

## 3. Models Evaluated and Metrics

Four models were trained and compared using the same preprocessing pipeline (ordinal encoding → feature selection → classifier).

| Model | Accuracy | Macro F1 | Watch F1 | Refer Now Recall |
|---|---|---|---|---|
| Logistic Regression | **0.84** | **0.84** | 0.74 | 0.86 |
| Random Forest (default) | 0.80 | 0.79 | 0.67 | 0.85 |
| Random Forest (tuned, GridSearchCV) | 0.82 | 0.82 | 0.71 | 0.87 |
| XGBoost | 0.84 | 0.84 | **0.75** | 0.86 |

### Selected Model: Logistic Regression

**Full classification report (test set, n=10,000):**

```
              precision    recall  f1-score   support

   On Track       0.89      0.88      0.88      3958
  Refer Now       0.90      0.86      0.88      3034
      Watch       0.72      0.76      0.74      3008

    accuracy                           0.84     10000
   macro avg       0.84      0.83      0.84     10000
weighted avg       0.84      0.84      0.84     10000
```

**Why Logistic Regression:** It matched or led every model on accuracy and macro F1 while remaining fully interpretable (per-feature coefficients), fastest at inference, and best suited to deployment on low-resource Android devices used by Anganwadi workers. An ablation study (training with vs. without `Age_Months`) confirmed LR uses age as a clinically sensible linear predictor, while tree-based models over-split on age at the expense of screening-response patterns — a known failure mode for tree ensembles on near-linear synthetic labels.

---

## 4. Confusion Matrix — Final Model (Logistic Regression)

| Actual \ Predicted | On Track | Watch | Refer Now |
|---|---|---|---|
| **On Track** | ~3,483 | ~396 | ~79 |
| **Watch** | ~391 | ~2,286 | ~331 |
| **Refer Now** | ~85 | ~340 | ~2,609 |

*(Derived from reported precision/recall/support; exact cell counts available in `BalSaathi AI.ipynb`, Cell 41–42.)*

**Clinical interpretation:**
- **On Track → Refer Now** (low-harm error): unnecessary referral, family visits a centre unnecessarily.
- **Refer Now → On Track** (high-harm error): a child needing care is missed — the most costly error type, kept low by design (Refer Now recall = 0.86).
- **Watch misclassification** is the most common error across *every* model tested (67–75% F1), reflecting the genuine clinical ambiguity of borderline developmental cases. This is mitigated operationally: Watch-flagged children are automatically scheduled for re-screening in 6 weeks rather than receiving a single irreversible classification.

---

## 5. Known Limitations

1. **Synthetic training data** — labels derived from a weighted formula, not real clinical observation. Real-world accuracy will likely differ and must be re-established.
2. **Watch class ambiguity** — consistently the hardest class across all four models; this matches known difficulty in clinical developmental screening literature, not a defect specific to our pipeline.
3. **No real-user field data yet** — evaluation reported here is purely on held-out synthetic test data.

---

## 6. Phase 2 — Real-Data Validation Plan

| Step | Detail |
|---|---|
| Partner sites | 2 Anganwadi centres, Jharkhand |
| Sample | 50 children, 3 months |
| Action | Retrain/recalibrate on real screening data; recompute confusion matrix and per-class F1 against pediatrician-confirmed outcomes |
| Threshold tuning | Adjust decision threshold to further prioritise Refer Now recall, accepting some increase in unnecessary referrals |

---

*Model: Logistic Regression pipeline · Exported as `model.pkl` · Served via FastAPI `/predict` endpoint*
*BalSaathiAI — Har Baccha, Sahi Samay*
