import { BaseModel } from "./baseModel";
import { MeasurementUnit } from "./measurementUnit";
import { Subcontract } from "./subcontract";
import { UnitCost } from "./unitCost";

export interface UnitCostsSubcontract extends BaseModel{
  name: string;
  description:string;
  price: number;
  index?: number;
  quantity: number;
  unit_cost_id?: number;
  subcontract_id?: number;
  measurement_unit_id: number;
  calculated_price: number;

  unit_cost?: UnitCost;
  subcontract?: Subcontract;
  measurement_unit?: MeasurementUnit;
}
