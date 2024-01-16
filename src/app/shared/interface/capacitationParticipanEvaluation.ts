import {BaseModel } from "./baseModel";
export interface CapacitationParticipanEvaluation extends BaseModel{
    id:number;
    capacitation_id:number;
    capacitation_evaluation_id:number;
    internal_participant_id:number;
    external_participant_id:number;
    date_time_init:string;
    status:string
    client_id:number;
    client_location_id:number;
    update_user_id:number;
    create_user_id:number;
    active:boolean;



}
