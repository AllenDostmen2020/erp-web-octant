import {BaseModel } from "./baseModel";
export interface ProyectSede extends BaseModel{
  id:number;
  name:string;
  description:string;
  risks_id:number;
  active: boolean;


}
