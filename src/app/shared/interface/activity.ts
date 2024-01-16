import {BaseModel } from "./baseModel";
import { TypeActivity } from "./typeActivity";
export interface Activity extends BaseModel{
  name:string;
  description:string;
  type_activity_id:number;
  type_activity?:TypeActivity;
}
