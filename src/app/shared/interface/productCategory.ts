import { BaseModel } from "./baseModel";
import { Category } from "./category";
import { Product } from "./product";

export interface ProductCategory extends BaseModel{
  product_id: number;
  category_id: number;

  product?: Product;
  category?: Category;
}
