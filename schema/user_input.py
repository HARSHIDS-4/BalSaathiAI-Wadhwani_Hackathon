from typing import Annotated,Literal,Optional
from pydantic import BaseModel,Field

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