
import { BaseModel } from "./baseModel";
import { Employee } from "./employees";
import { MeasurementFrequencyType } from "./measurementFrequencyType";
import { ProcessTree } from "./processTree";
export interface StrategicObjective extends BaseModel {
    id: number;

    process_tree_id: number;
    process_tree?: ProcessTree;
    client_id: number;
    client_location_id: number;
    strategic_objective_id: number;
    code: string;
    name: string;
    description: string;

    goal: string;

    start_date: string;
    end_date: string;
    measurement_date: string;

    justification_update: Text;
    measurement_frequency_type_id: number;
    measurement_frequency_type: MeasurementFrequencyType;
    measurement_frequency: number;
    reference_specific_objective_id: number;
    status: 'elaborado' | 'revisado' | 'aprobado';
    status_document: number;

    link_file: string;
    external_link_file: string;


    active: boolean;
    elaborate_employee_id: number | null;
    review_employee_id: number | null;
    approval_employee_id: number | null;

    elaborate_employee?: Employee;
    review_employee?: Employee;
    approval_employee?: Employee;

    specific_objectives_count?:number;
    specific_objectives:StrategicObjective[];


}

