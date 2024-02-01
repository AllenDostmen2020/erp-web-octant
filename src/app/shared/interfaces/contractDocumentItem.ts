
import { BaseModel } from "./baseModel";
import { Contract } from "./contract";
import { DocumentItem } from "./documentItem";
import { Plan } from "./plan";

export interface ContractDocumentItem extends BaseModel {
    contract_id: number;
    document_item_id: number;
    plan_id: number;
    start_period: number;
    end_period: number;
    price: number;
    quantity: number;

    contract?: Contract;
    document_item?: DocumentItem;
    plan?: Plan;
}
