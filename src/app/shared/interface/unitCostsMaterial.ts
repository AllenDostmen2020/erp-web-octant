import { BaseModel } from "./baseModel";
import { Material } from "./material";
import { MeasurementUnit } from "./measurementUnit";
import { ProviderProduct } from "./providerProduct";
import { UnitCost } from "./unitCost";

export interface UnitCostsMaterial extends BaseModel{
  name: string;
  description:string;
  participation_percent: number;
  price: number;
  quantity: number;
  calculated_price: number;
  index?: number;
  yield?: number;
  unit_cost_id?: number;
  provider_product_id?: number;
  measurement_unit_id?: number;

  unit_cost?: UnitCost;
  provider_product?: ProviderProduct;
  measurement_unit?: MeasurementUnit;
}
