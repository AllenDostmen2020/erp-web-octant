import {BaseModel } from "./baseModel";
export interface CapacitationThemeFile extends BaseModel{
    capacitation_id:number;
    capacitation_theme_id:number;
    type:string;
    name:string;
    description:string;
    status:string;
    link_file:string;
    client_id:number;
    client_location_id:number;

    active:boolean;
    create_user_id:number;
    update_user_id:number;
}
