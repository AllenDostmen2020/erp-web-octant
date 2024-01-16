import { BaseModel } from "./baseModel";
import { Position } from "./positions";

export interface CompanyArea extends BaseModel{
  name: string;
  description: string;
  father_company_area_id: number;
  level: number;

  positions?: Position[];
  child_company_areas?: CompanyArea[];
  children_count: number;
}
