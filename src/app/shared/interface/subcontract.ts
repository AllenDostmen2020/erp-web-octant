import { BaseModel } from "./baseModel";
import { MeasurementUnit } from "./measurementUnit";
import { Provider } from "./proveedor";
import { SubcontractProvider } from "./subcontractProvider";
import { UnitCostCategory } from "./unitCostCategory";

export interface Subcontract extends BaseModel{
  name: string;
  price: number;
  description:string;
  code:string;
  active: boolean;
  unit_cost_category_id: number;
  measurement_unit_id: number;
  provider_id: number | null;
  provider_date: string | null;


  unit_cost_category?: UnitCostCategory;
  measurement_unit?: MeasurementUnit;
  provider?: Provider;
  subcontract_providers?: SubcontractProvider[];
}
