
import { BaseModel } from "./baseModel";
import { Employee } from "./employees";
import { ProcessTree } from "./processTree";
import { SpecificObjective } from "./specificObjective";
import { StrategicObjective } from "./strategicObjective";
export interface Measure extends BaseModel {
    id: number;

    client_id: number;
    client_location_id: number;

    strategic_objective_id: number|null;
    strategic_objective: StrategicObjective[];
    specific_objective_id: number|null;
    specific_objective: SpecificObjective[];

    measurement_date: string;
    period: string;
    value: string;
    name: string;
    description: string;

    link_file: string;

    update_user_id:number;
    create_user_id:number;
    active: boolean;



}

