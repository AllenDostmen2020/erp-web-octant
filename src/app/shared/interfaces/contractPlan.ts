import { BaseModel } from "./baseModel";
import { Contract } from "./contract";
import { Plan } from "./plan";

export interface ContractPlan extends BaseModel {
  contract_id: number;
  plan_id: number;
  quantity: number;
  buy_price: number;
  sale_price: number;
  installation_price: number;
  total_installation_price: number;
  total: number;

  contract?: Contract;
  plan?: Plan;
}