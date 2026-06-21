const API_URL = "http://127.0.0.1:8000";

export interface PredictionRequest {
  Age_Months: number;
  Gender: "Male" | "Female";
  "Does child respond when called by name?": "Yes" | "Sometimes" | "No";
  "If not, does child react to familiar voices?": "Yes" | "No" | null;
  "Can child communicate basic needs using words or gestures?": "Yes" | "Sometimes" | "No";
  "If not, does child attempt communication through sounds or pointing?": "Yes" | "No" | null;
  "Can child walk without support?": "Yes" | "Sometimes" | "No";
  "If not, can child stand while holding furniture?": "Yes" | "No" | null;
  "Can child climb stairs or furniture independently?": "Yes" | "Sometimes" | "No";
  "If not, can child move independently between locations?": "Yes" | "No" | null;
  "Does child make eye contact during interaction?": "Yes" | "Sometimes" | "No";
  "If not, does child respond to smiling faces?": "Yes" | "No" | null;
  "Does child engage in play with caregivers or peers?": "Yes" | "Sometimes" | "No";
  "If not, does child show interest when others are playing nearby?": "Yes" | "No" | null;
  "Can child identify familiar people or objects?": "Yes" | "Sometimes" | "No";
  "If not, can child recognize their primary caregiver?": "Yes" | "No" | null;
  "Can child follow age-appropriate instructions?": "Yes" | "Sometimes" | "No";
  "If not, can child follow simple one-step commands?": "Yes" | "No" | null;
}

export interface PredictionResponse {
  predicted_category: "On Track" | "Watch" | "Refer Now";
  confidence: number;
  class_confidence: Record<string, number>;
  recommendation: string;
  next_action: string;
}

export const predictRisk = async (data: PredictionRequest): Promise<PredictionResponse> => {
  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `API Error: ${response.status}`);
  }

  return response.json();
};