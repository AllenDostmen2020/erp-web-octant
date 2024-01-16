import {BaseModel } from "./baseModel";
export interface UserRol extends BaseModel{
  id:number;
  name:string;
  description:string;
  display_name:string;

}
