from pydantic import BaseModel,Field
from typing import Dict

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

