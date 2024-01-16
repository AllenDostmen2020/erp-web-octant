import { BaseModel } from "./baseModel";
import { MeasurementUnit } from "./measurementUnit";

export interface Material extends BaseModel{
  name: string;
  price: number;
  measurement_unit_id: number;
  description:string;
  code:string;
  active: boolean;

  measurement_unit?: MeasurementUnit;
}
