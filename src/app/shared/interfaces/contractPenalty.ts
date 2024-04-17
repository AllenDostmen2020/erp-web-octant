
import { BaseModel } from "./baseModel";
import { Contract } from "./contract";

export interface ContractPenalty extends BaseModel {

  contract_id: number;
  reason: string;
  observations: string;

  contract?: Contract;
}