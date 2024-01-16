import { BaseModel, CoinEnum } from './baseModel';
import { Client } from './client';
import { ClientContact } from './clientContact';
import { QuotationCommission } from './quotationCommission';
import { QuotationCondition } from './quotationConditions';
import { QuotationItem } from './quotationItem';
import { QuotationScope } from './quotationScope';
import { QuotationWorkflow } from './quotationWorkflow';
import { User } from './user';

export interface Quotation extends Omit<BaseModel, 'status'>{
  id: number;
  name: string;
  code: string;
  version: string;
  conversion: number;
  igv: number;
  rent: number;
  detraction: number;
  date_quotation: string;
  coin: CoinEnum;
  validity: number;
  description: string;
  utility: number;
  utility_type: 'global' | 'individual';
  user_id: number;
  seller_id: number;
  project_manager_id: number;
  general_costs: number;
  global_discount_percent: number;
  update_date: string;
  reference_quotation_id?: number;
  replace_quotation_id?: number;
  include_igv_items_for_pdf: boolean;
  status: string;
  customer_contact_id: number;
  sub_total : any;
  client_business_unit_id : number;

  scopes: null | string[];
  conditions: null | any[];

  versions?: Quotation[];

  user?: User;
  customer?: Client;
  seller?: User;
  project_manager?: User;
  customer_contact?: ClientContact;

  replace_quotation?: Quotation;
  replaced_quotation?: Quotation;

  quotation_items?: QuotationItem[];
  quotation_conditions?: QuotationCondition[];
  quotation_scopes?: QuotationScope[];
  quotation_commission?: QuotationCommission;
  last_quotation_workflow?: QuotationWorkflow;
  quotation_workflows?: QuotationWorkflow[];
}
