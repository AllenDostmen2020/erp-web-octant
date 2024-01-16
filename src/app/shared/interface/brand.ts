import { BaseModel } from "./baseModel";

export interface Brand extends BaseModel {
  code: string;
  name: string;
  description:string;
  active: boolean;
}
