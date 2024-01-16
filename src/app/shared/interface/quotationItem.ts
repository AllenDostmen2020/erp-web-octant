import { BaseModel, CoinEnum } from "./baseModel";
import { MeasurementUnit } from "./measurementUnit";
import { ProviderProduct } from "./providerProduct";
import { Quotation } from "./quotation";
import { UnitCost } from "./unitCost";

export interface QuotationItem extends BaseModel {
  quotation_id?: number;
  name: string;
  description?:string;

  parent_quotation_item_id?:number;

  price?: number;
  quantity?: number;
  utility?: number;
  index?: number;
  general_costs?: number;
  type: QuotationItemTypeEnum;
  provider_product_id?: number;
  unit_cost_id?: number;
  measurement_unit_id?: number;
  coin?: CoinEnum;

  unit_cost?: UnitCost;
  provider_product?: ProviderProduct;
  measurement_unit?: MeasurementUnit;
  quotation?: Quotation;
  children?: QuotationItem[];
}

export enum QuotationItemTypeEnum {
  Simple = 'simple',
  CostoUnitario = 'costo unitario',
  SinCostoUnitario = 'sin costo unitario',
}
