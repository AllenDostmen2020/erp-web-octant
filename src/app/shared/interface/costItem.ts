import { Bank } from "./bank";
import { BaseModel } from "./baseModel";
import { ProjectHumanResource } from "./projectHumanResource";
import { Provider } from "./proveedor";
import { CoinEnum } from "./purchaseOrder";
import { Transfer } from "./transfer";
import { User } from "./user";

export interface CostItem extends BaseModel {
  project_id: number;
  type: string;
  amount: number;
  money_type: CoinEnum;
  description: string;
  acepted: 'SI' | 'NO';
  create_user_id: number;
  acepted_user_id: number;
  update_user_id: number;

  create_user: User;
  acepted_user: User;
  update_user: User;

  require_project_human_resource_id?: number;
  require_project_human_resource?: ProjectHumanResource;
  aprobe_project_human_resource_id?: number;
  aprobe_project_human_resource?: ProjectHumanResource;

  good_and_service: GoodAndService

  cost_item_cuotas_count: number;
  cost_item_cuotas: CostItemCuota[];
}

export interface GoodAndService extends BaseModel {
  cost_item_id: number;
  proveedor_id: number;
  cotization_number: string;
  cotization_date: string;
  comprobant_number: string;
  file: string;
  description: string;

  proveedor?: Provider;
}


export interface CostItemCuota extends BaseModel {
  cost_item_id: number;
  expire_date: string;
  number: number;
  percent: number;
  amount: number;
  exchange_rate: number;
  account_number: string;
  bank_id: number;
  payment_date: string;
  transfer_id: number;
  update_user_id: number;

  bank: Bank;
  update_user: User;
  transfer: Transfer;
  cost_item: CostItem;
}
