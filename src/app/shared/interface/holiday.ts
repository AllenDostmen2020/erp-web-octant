import { BaseModel } from "./baseModel";

export interface Holiday extends BaseModel {
  name: string;
  values: string[];
}
