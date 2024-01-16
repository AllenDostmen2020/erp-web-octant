import { BaseModel } from "./baseModel";
import { ProviderProduct } from "./providerProduct";
import { PurchaseOrderItem } from "./purchaseOrderItem";
import { QuotationMaterial } from "./quotationMaterial";

export interface QuotationMaterialBuy extends BaseModel {
    quotation_material_id: number;
    provider_product_id: number;
    purchase_order_item_id: number;

    quotation_material?: QuotationMaterial;
    provider_product?: ProviderProduct;
    purchase_order_item?: PurchaseOrderItem;
}
