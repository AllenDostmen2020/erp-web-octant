import { BaseModel } from "./baseModel";
import { Quotation } from "./quotation";

 export interface QuotationLog extends Omit<BaseModel, 'status'> {
    quotation_id: number;
    description: string;
    status: string;

    quotation?: Quotation;
 }
