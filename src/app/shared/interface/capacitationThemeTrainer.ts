import {BaseModel } from "./baseModel";
export interface CapacitationThemeTrainer extends BaseModel{
    capacitation_id:number,
    capacitation_theme_id:number,
    employee_id:number,
    type:string,
    document_type_id:number,
    document_number:string,
    client_id:number,
    client_location_id:number
    name:string,
    description:string,
    position:string,
    gender:string,
    status:string,

    active:boolean,
    create_user_id:number,
    update_user_id:number,
}
