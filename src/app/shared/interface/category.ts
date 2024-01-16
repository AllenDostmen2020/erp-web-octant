import { BaseModel } from "./baseModel";

export interface Category extends BaseModel{
  name: string;
  description: string;
  image: string;
  thumbnall: string;
  category_father_id: number;
  level: number;

  children?: Category[];
}
