import {BaseModel } from "./baseModel";
import { Rule } from "./rule";
export interface ClientRule extends BaseModel{
  id:number;
  name:string;
  description:string;
  active: boolean;

  rule:Rule;


}
