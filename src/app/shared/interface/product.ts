import { BaseModel } from './baseModel';
import { Brand } from './brand';
import { MeasurementUnit } from './measurementUnit';
import { ProductCategory } from './productCategory';
import { Provider } from './proveedor';
import { ProviderProduct } from './providerProduct';

export interface Product extends BaseModel {
  name: string;
  description: string;
  code: string;
  part_number: string;
  buy_price: string;
  sale_price: string;
  features: string;
  stock: string;
  image: string;
  active: boolean;
  brand_id: number;
  measurement_unit_id: number;
  provider_id: number;

  brand?: Brand;
  measurement_unit?: MeasurementUnit;
  provider_products?: ProviderProduct[];
  product_categories?: ProductCategory[];
}
