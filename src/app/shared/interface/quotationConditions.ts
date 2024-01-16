import { BaseModel } from "./baseModel";
import { Quotation } from "./quotation";

export interface QuotationCondition extends BaseModel{
  quotation_id?: number;
  name: string;
  description?:string;

  quotation?: Quotation
}
