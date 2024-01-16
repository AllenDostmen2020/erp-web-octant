import { array } from "@amcharts/amcharts5";
import { BaseModel } from "./baseModel";
import { CapacitationTheme } from "./capacitationTheme";
import { CapacitationThemeFile } from "./capacitationThemeFile";
import { Employee } from "./employees";
import { ProcessTree } from "./processTree";
import { TypeActivity } from "./typeActivity";
import { User } from "./user";
import { Workstation } from "./Workstation";
export interface Capacitation extends BaseModel {
    name: string;
    description: string;
    elaborate_user_id: number | null;
    review_user_id: number | null;
    approval_user_id: number | null;

    elaborate_user?: Employee;
    review_user?: Employee;
    approval_user?: Employee;

    status:string;
    active:boolean;
    schedule_date:string;
    expire_schedule_date:string;
    link_zoom:string;
    link_meet:string;
    user:User;
    employee?:Employee;
    maximum_attempts_evaluation: number;
    process_tree_ids:string;
    worstation_ids:string;

    process_trees?: ProcessTree[];
    workstations?: Array<Workstation>

    capacitation_themes?: CapacitationTheme[];
    capacitation_files?: CapacitationThemeFile[];

}
