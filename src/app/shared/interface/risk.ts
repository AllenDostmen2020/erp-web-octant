import {BaseModel } from "./baseModel";
import { Danger } from "./danger";
export interface Risk extends BaseModel{
  id:number;
  name:string;
  description:string;
  danger:Danger;
  danger_id:number;
}
