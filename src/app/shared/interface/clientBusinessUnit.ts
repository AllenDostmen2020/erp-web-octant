import { BaseModel } from "./baseModel";

export interface ClientBusinessUnit extends BaseModel {
  client_id: number;
  name: string;
  description:string;
  address:string;
  active: boolean;
}
