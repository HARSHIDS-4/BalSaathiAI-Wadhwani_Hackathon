from fastapi import FastAPI
from typing import Annotated,Literal,Optional,Dict
from pydantic import BaseModel,Field
import pickle 
import pandas as pd
import numpy as np
from fastapi.responses import JSONResponse

app=FastAPI()

MODEL_VERSION='1.0.0'

# import ML Model
with open('model.pkl',"rb") as f:
    model=pickle.load(f)

question_mapping={
    'speech_q1' : "Does child respond when called by name?",
    'speech_followup_q1' : "If not, does child react to familiar voices?",
    'speech_q2' : "Can child communicate basic needs using words or gestures?",
    'speech_followup_q2' : "If not, does child attempt communication through sounds or pointing?",

    'motor_q1' : "Can child walk without support?",
    'motor_followup_q1' : "If not, can child stand while holding furniture?",
    'motor_q2' : "Can child climb stairs or furniture independently?",
    'motor_followup_q2' : "If not, can child move independently between locations?",

    'social_q1' : "Does child make eye contact during interaction?",
    'social_followup_q1' : "If not, does child respond to smiling faces?",
    'social_q2' : "Does child engage in play with caregivers or peers?",
    'social_followup_q2' : "If not, does child show interest when others are playing nearby?",

    'cognitive_q1' : "Can child identify familiar people or objects?",
    'cognitive_followup_q1' : "If not, can child recognize their primary caregiver?",
    'cognitive_q2' : "Can child follow age-appropriate instructions?",
    'cognitive_followup_q2' : "If not, can child follow simple one-step commands?"
    }
class USERINPUT(BaseModel):

    # Child_ID : Annotated[str,Field(...,description=' Enter ID of the child: ', examples=['C000001'])]
    Age_Months	: Annotated[int,Field(...,description='The age of the Child is:', example=15)]
    Gender: Annotated[Literal['Male','Female'],Field(...)]
    speech_q1 : Annotated[Literal['Yes','Sometimes','No'],Field(...,alias="Does child respond when called by name?",example='Yes')]
    speech_followup_q1 : Annotated[Optional[Literal['Yes','No']], Field(default=None,alias="If not, does child react to familiar voices?",example='No')]

    speech_q2 : Annotated[Literal['Yes','Sometimes','No'],Field(...,alias="Can child communicate basic needs using words or gestures?",example='Sometimes')]
    speech_followup_q2 : Annotated[Optional[Literal['Yes','No']],Field(default=None,alias="If not, does child attempt communication through sounds or pointing?",example='No')]

    motor_q1 : Annotated[Literal['Yes','Sometimes','No'],Field(...,alias="Can child walk without support?",example='Yes')]
    motor_followup_q1 : Annotated[Optional[Literal['Yes','No']],Field(default=None,alias="If not, can child stand while holding furniture?",example='No')]

    motor_q2 : Annotated[Literal['Yes','Sometimes','No'],Field(...,alias= "Can child climb stairs or furniture independently?",example='No')]
    motor_followup_q2 : Annotated[Optional[Literal['Yes','No']],Field(default=None,alias="If not, can child move independently between locations?",example='Yes')]

    social_q1 : Annotated[Literal['Yes','Sometimes','No'],Field(...,alias= "Does child make eye contact during interaction?",example='No')]
    social_followup_q1 : Annotated[Optional[Literal['Yes','No']],Field(default=None,alias="If not, does child respond to smiling faces?",example='Yes')]

    social_q2 : Annotated[Literal['Yes','Sometimes','No'],Field(...,alias="Does child engage in play with caregivers or peers?",example='Sometimes')]
    social_followup_q2 : Annotated[Optional[Literal['Yes','No']],Field(default=None,alias="If not, does child show interest when others are playing nearby?",example='No')]

    cognitive_q1 : Annotated[Literal['Yes','Sometimes','No'],Field(...,alias="Can child identify familiar people or objects?",example='Yes')]
    cognitive_followup_q1 : Annotated[Optional[Literal['Yes','No']],Field(default=None,alias="If not, can child recognize their primary caregiver?",example='No')]

    cognitive_q2 : Annotated[Literal['Yes','Sometimes','No'],Field(...,alias="Can child follow age-appropriate instructions?",example='Sometimes')]
    cognitive_followup_q2 : Annotated[Optional[Literal['Yes','No']],Field(default=None,alias= "If not, can child follow simple one-step commands?",example='No')]

    model_config = {
        "populate_by_name": True
    }

@app.get('/')
def home():
    return {'message' : 'BalSaathi AI: Har Baccha, Sahi Samay'}

@app.get('/children')
def view_child():
    return {
        'status' : 'ok',
        'model_version' : MODEL_VERSION,
        'model_loaded' : model is not None
    }

@app.get("/questions")
def get_questions():
    return question_mapping

class PredictionResponse(BaseModel):
    predicted_category : str = Field(
        ...,
        description="The risk level for the child is : ",
        example=['Refer Now']
    )

    confidence : float = Field(
        ...,
        description ="The confidence score of prediction",
        example =['0.98']
    )

    class_confidence : Dict[str,float] = Field(
        ...,
        description = "A dictionary containing class names and there corrosponding probabilities: ",
        example = {'Refer Now' : 0.85, 'Watch' : 0.50, 'On Track' : 0.1}    
        )
    
    recommendation : str = Field(
        ...,
        description = "Recommendation for the predicted category is: ",
        example = ['Further developmental assessment by a qualified healthcare professional is recommended.']
    )

    next_action :str =Field(
        ...,
        description= "The next action that should be taken is: ",
        example=['Generate referral to nearest RBSK centre immediately.']
    )

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
        'Risk Level' : risk_level,
        'confidence' : confidence,
        'class_confidence' : class_probabilities,
        'recommendation' : recommend,
        'Next Action' : next
    }


@app.post('/predict', response_model=PredictionResponse)
def Predict_Premium (user_input:USERINPUT):
    try:
        prediction=Predict(user_input.model_dump(by_alias=True))
        return JSONResponse(status_code=200,content={'Predicted Category' : prediction})
    
    except Exception as e : 
        return JSONResponse(status_code=500,content={'error' : str(e)})