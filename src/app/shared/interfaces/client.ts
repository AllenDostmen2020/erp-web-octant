import { BaseModel, DocumentTypeEnum } from "./baseModel";
import { ClientAccount } from "./clientAccount";
import { ClientBusinessUnit } from "./clientBusinessUnit";

export interface Client extends BaseModel {
  document_type: DocumentTypeEnum;
  document_number: string;
  name: string;
  address: string;
  phone: string;
  cellphone: string;
  avatar: string;
  birth_date: string;
  gender: string;
  civil_status: string;
  description: string;

  user_limit: number;
  storage_limit: number;
  storage_usage_size: number;
  storage_number_files: number;
  client_business_units?: ClientBusinessUnit[];
  client_accounts?: ClientAccount[];
}
