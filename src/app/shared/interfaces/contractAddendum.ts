import { BaseModel } from "./baseModel";
import { Contract } from "./contract";
import { User } from "./user";

export interface ContractAddendum extends BaseModel {

  contract_id : number;
  validity_date : string;
  signature_date : string;
  responsible_document_type : string;
  responsible_document_string : string;
  responsible_name : string;
  responsible_paternal_name : string;
  responsible_maternal_name : string;
  client_responsible_phone : string;
  client_responsible_email : string;
  business_user_id : number;
  link_file : string;
  previous_contract : string;
  current_contract : string;
  previous_recurring : number;
  current_recurring : number;
  previous_plan_number : number;
  current_plan_number : number;
  previous_vehicles_number : number;
  current_vehicles_number : number;
  vehicles_replace_number : number;
  vehicles_replace_install_price : number;
  vehicles_replace_uninstall_price : number;
  penalty_applies : boolean;
  penalty_description : string;

    contract?: Contract;
    business_user?: User;
}