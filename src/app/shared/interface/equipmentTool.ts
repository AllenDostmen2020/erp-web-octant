import { BaseModel } from "./baseModel";
import { MeasurementUnit } from "./measurementUnit";
import { UnitCostCategory } from "./unitCostCategory";

export interface EquipmentTool extends BaseModel{
  name: string;
  price: number;
  measurement_unit_id: number;
  unit_cost_category_id: number;
  description:string;
  code:string;
  active: boolean;

  measurement_unit?: MeasurementUnit;
  unit_cost_category?: UnitCostCategory;
}
