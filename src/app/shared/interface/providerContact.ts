import { BaseModel } from "./baseModel";
import { DocumentType } from "./documentType";
import { Position } from "./positions";
import { Provider } from "./proveedor";
import { User } from "./user";

export interface ProviderContact extends BaseModel {
  provider_id: number;
  document_number: string;
  name: string;
  phone: string;
  email: string;
  description: string;
  position_id: number;
  document_type_id: number;
  principal_contact: boolean;

  document_type?: DocumentType;
  provider?: Provider;
  position?: Position;


}
