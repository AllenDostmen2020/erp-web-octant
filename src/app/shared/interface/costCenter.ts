import { BaseModel } from "./baseModel";
import { CostCenterType } from "./costCenterType";
import { Project } from "./project";
import { RecordMeeting } from "./recordMeeting";
import { Requirement } from "./requirement";

export interface CostCenter extends BaseModel {
    name: string;
    description: string;
    investment: number;
    code: string;
    type: CostCenterTypeEnum;
    duration: string;
    duration_type: DurationTypeEnum;
    asociate_module: string;
    project_id: number;
    requirement_id: number;
    record_meeting_id: number;
    cost_center_type_id: number;
    start_date: string;
    ending_date: string;
    payment_date: string;


    project?: Project;
    requirement?: Requirement;
    record_meeting?: RecordMeeting;
    cost_center_type?: CostCenterType;
}

export enum CostCenterTypeEnum {
    FIJO = 'fijo',
    VARIABLE = 'Variable',
}

export enum DurationTypeEnum {
    DIARIO = 'diario',
    SEMANAL = 'semanal',
    MENSUAL = 'mensual',
    ANUAL = 'anual',
}
