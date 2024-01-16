import { BaseModel } from "./baseModel";
import { User } from "./user";

export interface CreditRisk extends BaseModel {
  level: string;
  company: string;
  description:string;
  active: boolean;
  client_id: number;
  user_id: number;

  user: User;
}
