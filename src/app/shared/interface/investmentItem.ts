import { BaseModel } from "./baseModel";
import { Client } from "./client";
import { Investment } from "./investment";
import { Transfer } from "./transfer";
import { User } from "./user";

export interface InvestmentItem extends BaseModel {
  type: string;
  detail?: string;

  investment_id?: number;
  client_id?: number;
  user_id?: number;

  investment?:Investment;
  client?:Client;
  user?:User;

  transfer?:Transfer;
}
