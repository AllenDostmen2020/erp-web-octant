import { BaseModel } from "./baseModel";
import { MeasurementUnit } from "./measurementUnit";
import { Quotation } from "./quotation";
import { UnitCostsEquipmentTool } from "./unitCostsEquipmentTools";
import { UnitCostsMaterial } from "./unitCostsMaterial";
import { UnitCostsSubcontract } from "./unitCostsSubcontracts";
import { UnitCostsWorkforce } from "./unitCostsWorkforces";

export interface UnitCost extends Omit<BaseModel, 'status'>{
  name: string;
  description:string;
  measurement_unit_id?: number;
  yield: number;
  code: string;
  workday: number;
  active: boolean;
  status: string;
  quotation_id: number;

  quotation?: Quotation;

  measurement_unit?: MeasurementUnit;
  unit_cost_workforces?: UnitCostsWorkforce[];
  unit_cost_materials?: UnitCostsMaterial[];
  unit_cost_equipment_tools?: UnitCostsEquipmentTool[];
  unit_cost_subcontracts?: UnitCostsSubcontract[];
}
