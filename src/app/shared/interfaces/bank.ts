import { BaseModel } from "./baseModel";

export interface Bank extends BaseModel {
  name: string;
  code: string;
  image: string;
  description: string;
}
