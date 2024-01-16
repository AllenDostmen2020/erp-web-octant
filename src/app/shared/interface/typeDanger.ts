import {BaseModel } from "./baseModel";
import { Danger } from "./danger";
import { Risk } from "./risk";
export interface TypeDanger extends BaseModel{
  name:string;
  description:string;
  dangers: Danger[];
}
