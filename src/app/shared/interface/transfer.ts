import { Bank } from "./bank";
import { BaseModel } from "./baseModel";
import { Client } from "./client";
import { CostItemCuota } from "./costItem";
import { InvestmentItem } from "./investmentItem";
import { ProjectAccount } from "./projectAccount";
import { User } from "./user";

export interface Transfer extends BaseModel {
  uuid: string;
  project_account_id: number;
  type: string;
  is_beetwen_accounts: 'TRUE' | 'FALSE';
  payment_method: string;
  operation_code: string;
  amount: number;
  operation_date: string;
  file_link: string;
  observation: string;
  user_id: number;
  reference_project_account_id: number;
  reference_transfer_id: number;

  project_account: ProjectAccount;
  reference_project_account: ProjectAccount;
  reference_transfer: Transfer;
  user: User;

  investment_item?: InvestmentItem;
  partida_gasto?: PartidaGasto;
  cost_item_cuota?: CostItemCuota;
}

export interface PartidaGasto {
  transfer_id: number;
  type: string;
  description: string;
  active: string;
  proveedor_id?: number;
  number_account?: string;
  bank_id?: string;
  user_id: number;

  transfer?: Transfer;
  user?: User;
  proveedor: Client;
  bank: Bank;
}
