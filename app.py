from fastapi import FastAPI
from pydantic import Field
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from model.predict import MODEL_VERSION, model
from config.questions import question_mapping
from schema.prediction_response import PredictionResponse
from schema.user_input import USERINPUT
from model.predict import Predict

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

@app.post('/predict', response_model=PredictionResponse)
def Predict_Premium (user_input:USERINPUT):
    try:
        prediction=Predict(user_input.model_dump(by_alias=True))
        return prediction
    
    except Exception as e : 
        return JSONResponse(status_code=500,content={'error' : str(e)})