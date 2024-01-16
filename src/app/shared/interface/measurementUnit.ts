import { BaseModel } from "./baseModel";

export interface MeasurementUnit extends BaseModel {
  name: string;
  description:string;
  abbreviation:string;
}
