import {BaseModel } from "./baseModel";
export interface Rule extends BaseModel{
  id:number;
  name:string;
  description:string;
  active: boolean;


}
