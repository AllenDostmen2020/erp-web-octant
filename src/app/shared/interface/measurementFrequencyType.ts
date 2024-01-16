import {BaseModel } from "./baseModel";
export interface MeasurementFrequencyType extends BaseModel{
  id:number;
  name:string;
  description:string;
  active: boolean;

}

