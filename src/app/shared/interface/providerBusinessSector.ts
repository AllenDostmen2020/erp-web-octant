import { BaseModel } from "./baseModel";
import { BusinessSector } from "./businessSector";
import { Provider } from "./proveedor";

export interface ProviderBusinessSector extends BaseModel{
  provider_id: number;
  business_sector_id: number;

  provider?: Provider;
  business_sector?: BusinessSector;
}
