import {BaseModel } from "./baseModel";
import { User } from "./user";
import { Workstation } from "./Workstation";
export interface Employee extends BaseModel{
  id:number;
  client_id: number;
  client_location_id: number;
  document_number: string;
  position: string;
  name: string;
  phone: string;
  email: string;
  enable_system_access: boolean;
  expire_enable_system_access: string;
  worksation_id:number;
  description:string;

  user_id: number;
  update_user_id: number;
  create_user_id: number;
  user?: User;
  workstation?: Workstation;
}
