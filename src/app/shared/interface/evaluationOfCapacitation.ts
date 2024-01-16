import { CapacitationTheme } from "./capacitationTheme";
import {BaseModel } from "./baseModel";
import { CapacitationParticipanEvaluation } from "./capacitationParticipanEvaluation";
export interface EvaluationOfCapacitation extends BaseModel{
    id:number;
    capacitation_id:number;
    capacitation_theme_id:number;
    name:string;
    description:string;
    response_time:number;
    maximum_attempts:string;
    maximum_date:string;
    evaluator_user_id:number;
    reviewer_user_id:number;
    type_of_evaluation:string;
    link_file:string;
    note_to_approve:number;
    status:boolean;
    client_id:number;
    client_location_id:number
    update_user_id:number;
    create_user_id:number;
    active:boolean;
    created_at:string;
    updated_at:string;

    capacitation_evaluation_questions?: any[];
    capacitation_participant_evaluation?: CapacitationParticipanEvaluation;



    capacitation_theme?:CapacitationTheme;

    capacitation_evaluation_questions_count?:number

}
