import { BaseModel } from "./baseModel";
import { Quotation } from "./quotation";

export interface QuotationScope extends BaseModel{
  quotation_id?: number;
  name: string;
  description?:string;

  quotation?: Quotation
}
