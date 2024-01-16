import { BaseModel } from "./baseModel";
import { Requirement } from "./requirement";
import { User } from "./user";

export interface RequirementWorkflow extends BaseModel {
    user_id: number;
    requirement_id: number;
    status_workflow: RequirementWokflowStatusEnum;
    comments: string;

    user?: User;
    requirement?: Requirement;
}

export enum RequirementWokflowStatusEnum {
    SOLICITANDO = 'solicitando',
    APROVANDO = 'aprovando',
    PROMOVIDO = 'promovido',
}
