import { BaseModel } from "./baseModel";
import { ProviderProduct } from "./providerProduct";
import { QuotationMaterial } from "./quotationMaterial";

export interface QuotationMaterialProvider extends Omit<BaseModel, 'status'> {
    quotation_material_id: number;
    provider_product_id: number;

    quantity: number;

    quotation_material?: QuotationMaterial;
    provider_product?: ProviderProduct;
}
