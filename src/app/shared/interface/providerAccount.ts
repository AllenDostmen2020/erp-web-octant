import { Bank } from "./bank";
import { BaseModel } from "./baseModel";

export interface ProviderAccount extends BaseModel {
  bank_id: number;
  responsible: string;
  account_number:string;
  account_type:string;
  email:string;
  description:string;

  bank?: Bank;
}
