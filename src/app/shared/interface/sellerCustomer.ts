import { BaseModel } from "./baseModel";
import { Client } from "./client";
import { User } from "./user";

export interface SellerCustomer extends Omit<BaseModel, 'status'> {
  status:string;
  description:string;
  active: boolean;

  seller?: User;
  customer?: Client;
}
