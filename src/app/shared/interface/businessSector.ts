import { BaseModel } from "./baseModel";

export interface BusinessSector extends BaseModel {
  name: string;
  description:string;
  active: boolean;
}
