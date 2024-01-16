import {BaseModel } from "./baseModel";
import { Risk } from "./risk";
export interface AuditType extends BaseModel{
  id:number;
  name:string;
  description:string;
}
