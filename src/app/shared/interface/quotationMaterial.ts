import { BaseModel } from "./baseModel";
import { Product } from "./product";
import { ProviderProduct } from "./providerProduct";
import { Quotation } from "./quotation";
import { QuotationMaterialProvider } from "./quotationMaterialProvider";

 export interface QuotationMaterial extends BaseModel {
    quotation_id: number;
    provider_product_id: number;
    product_id: number;
    parent_id: number;

    buy_quantity: number;
    quantity: number;
    price: number;
    category?: string;
    coin: CoinEnum;

    is_not_projected: boolean;
    quantity_not_projected: number;
    justification_quantity_not_projected: string | null;

    quotation?: Quotation;
    provider_product?: ProviderProduct;
    product?: Product;

    children?: QuotationMaterial[];

    quotation_material_providers?: QuotationMaterialProvider[];
 }

 export enum CoinEnum {
    Soles = 'soles',
    Dolares = 'dólares',
}
