import {BaseModel } from "./baseModel";
export interface Permissions extends BaseModel{
  id:number;
  name:string;
  display_name:string;
  active: boolean;
}
