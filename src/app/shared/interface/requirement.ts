import { BaseModel } from "./baseModel";
import { CostCenterType } from "./costCenterType";
import { RequirementWorkflow } from "./requirementWorkflow";

export interface Requirement extends BaseModel {

    title: string;
    cost_center_type_id: number;
    date: string;
    attached_file: string;
    description: string;

    cost_center_type?: CostCenterType;
    last_requirement_workflow?: RequirementWorkflow;
}
