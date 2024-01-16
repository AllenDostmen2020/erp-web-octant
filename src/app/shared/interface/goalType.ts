import {BaseModel } from "./baseModel";
export interface GoalType extends BaseModel{
  id:number;
  name:string;
  description:string;
  active: boolean;

}

