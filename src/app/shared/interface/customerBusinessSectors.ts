import { BaseModel } from "./baseModel";
import { BusinessSector } from "./businessSector";
import { Client } from "./client";

export interface CustomerBusinessSector extends BaseModel{
  customer_id: number;
  business_sector_id: number;

  customer?: Client;
  business_sector?: BusinessSector;
}
