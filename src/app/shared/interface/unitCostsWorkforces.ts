import { BaseModel } from "./baseModel";
import { MeasurementUnit } from "./measurementUnit";
import { UnitCost } from "./unitCost";
import { Workforce } from "./workforce";

export interface UnitCostsWorkforce extends BaseModel{
  name: string;
  description:string;
  participation_percent: number;
  price: number;
  quantity: number;
  resource: number;
  calculated_price: number;
  index?: number;
  yield?: number;
  unit_cost_id: number;
  workforce_id: number;
  measurement_unit_id: number;

  unit_cost?: UnitCost;
  workforce?: Workforce;
  measurement_unit?: MeasurementUnit;
}
