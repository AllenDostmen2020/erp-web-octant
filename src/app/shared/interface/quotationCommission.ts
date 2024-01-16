import { BaseModel } from "./baseModel";
import { Quotation } from "./quotation";

export interface QuotationCommission extends BaseModel{
  quotation_id?: number;
  commission_adviser: number;
  commission_adviser_percent:number;
  cost_administration:number;
  cost_administration_percent:number;

  quotation?: Quotation
}
