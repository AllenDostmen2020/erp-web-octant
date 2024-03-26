
import { BaseModel } from "./baseModel";
import { Contract } from "./contract";
import { ContractPlan } from "./contractPlan";
import { DocumentItem } from "./documentItem";
import { Plan } from "./plan";

export interface ContractPlanDocumentItem extends BaseModel {
    contract_plan_id: number;
    document_item_id: number;
    plan_id: number;
    start_period: number;
    end_period: number;
    price: number;
    quantity: number;

    contract_plan?: ContractPlan;
    document_item?: DocumentItem;
    plan?: Plan;
}
