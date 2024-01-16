import { BaseModel } from "./baseModel";
import { EquipmentTool } from "./equipmentTool";
import { MeasurementUnit } from "./measurementUnit";
import { UnitCost } from "./unitCost";

export interface UnitCostsEquipmentTool extends BaseModel{
  name: string;
  description:string;
  participation_percent: number;
  price: number;
  quantity: number;
  resource: number;
  index?: number;
  yield?: number;
  unit_cost_id: number;
  equipment_tool_id: number;
  measurement_unit_id: number;
  calculated_price: number;

  unit_cost?: UnitCost;
  equipment_tool?: EquipmentTool;
  measurement_unit?: MeasurementUnit;
}
