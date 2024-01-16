import { BaseModel } from "./baseModel";

export interface UserType extends BaseModel {
  name: string;
  description:string;
  active: boolean;
}
