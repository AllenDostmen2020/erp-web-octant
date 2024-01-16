import {BaseModel } from "./baseModel";
import { CapacitationThemeFile } from "./capacitationThemeFile";
import { CapacitationThemeTrainer } from "./capacitationThemeTrainer";
export interface CapacitationTheme extends BaseModel{
    id:number;
    capacitation_id:number
    name:string;
    description:string;
    start_date:string;
    start_time:string;
    duration:string;
    end_time:string;
    status:string;
    client_id:number
    client_location_id:number
    update_user_id:number
    create_user_id:number
    active:boolean;
    created_at:string;
    updated_at:string;

    capacitation_theme_trainers?: CapacitationThemeTrainer[];
    capacitation_theme_trainers_count?: number;

    capacitation_theme_files?: CapacitationThemeFile[];
    capacitation_theme_files_count?: number;

}
