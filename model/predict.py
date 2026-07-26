from typing import Dict
import pandas as pd
import numpy as np
import pickle

MODEL_VERSION='1.0.0'

# import ML Model
with open('model.pkl',"rb") as f:
    model=pickle.load(f)

mapping={
    0 : 'On Track',
    1 : 'Watch' ,
    2 : 'Refer Now'
}

recommendation_mapping = {
    'On Track':
    "Development appears age appropriate. Continue routine monitoring.",

    'Watch':
    "Monitor developmental progress and consider re-screening in 2–3 months.",

    'Refer Now':
    "Further developmental assessment by a qualified healthcare professional is recommended."
    }

next_actions_mapping = {
    "On Track": "Re-screen in 3 months",
    "Watch": "Re-screen in 6 weeks. Monitor flagged domain closely.",
    "Refer Now": "Generate referral to nearest RBSK centre immediately."
}

def Predict(USERINPUT : Dict):

    # Create dataframe for user input 
    input_df= pd.DataFrame([USERINPUT])
    input_df = input_df.replace({None: np.nan})

    #Predcit the class
    output=model.predict(input_df)[0]
    risk_level = mapping[output]

    #predict probabilities
    probability= model.predict_proba(input_df)[0]
    confidence=round(max(probability),7)

    #mapping 
    class_probabilities ={
        mapping[class_id] : round(float(proba),6)
        for class_id,proba in zip(model.classes_,probability)
    }
    
    recommend = recommendation_mapping[risk_level]
    next = next_actions_mapping[risk_level]

    return {
        'predicted_category' : risk_level,
        'confidence' : confidence,
        'class_confidence' : class_probabilities,
        'recommendation' : recommend,
        'next_action' : next
    }
