import {BaseModel } from "./baseModel";
export interface CapacitationEvaluationForms extends BaseModel{
    capacitation_id:number,
    evaluation_capacitation_id:number,
    type:string,
    name:string,
    description:string,
    question:string,
    score:string,
    answers:string,
    correct_answer:string,
    status:string,

    client_id:number,
    client_location_id:number,
    create_user_id:number,

    active:boolean,
    update_user_id:number,
}



