import {BaseModel } from "./baseModel";
import { Risk } from "./risk";
export interface MediumAlert extends BaseModel{
  id:number;
  name:string;
  description:string;
}
