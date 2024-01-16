import {BaseModel } from "./baseModel";
import { Risk } from "./risk";
import { TypeDanger } from "./typeDanger";
export interface Danger extends BaseModel{
  type_danger_id: number;
  name:string;
  description:string;
  risks:Risk[];
  type_danger:TypeDanger;
}
