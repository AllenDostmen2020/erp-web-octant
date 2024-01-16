import { BaseModel } from "./baseModel";
import { Client } from "./client";
import { CostCenter } from "./costCenter";
import { Quotation } from "./quotation";
import { User } from "./user";

export interface Project extends BaseModel {
    code: string;
    customer_id: number;
    quotation_id: number;
    name: string;
    description: string;
    investment: number;
    start_date: string;
    ending_date: string;

    quotation?: Quotation;
    customer?: Client;
    cost_centers?: CostCenter[];
}
