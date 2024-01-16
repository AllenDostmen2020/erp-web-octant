import { BaseModel } from "./baseModel";
import { PurchaseOrderItem } from "./purchaseOrderItem";
import { QuotationSubcontract } from "./quotationSubcontract";
import { SubcontractProvider } from "./subcontractProvider";

export interface QuotationSubcontractBuy extends BaseModel{
    quotation_subcontract_id: number;
    subcontract_provider_id: number;
    purchase_order_item_id: number;

    quotation_subcontract?: QuotationSubcontract;
    subcontract_provider?: SubcontractProvider;
    purchase_order_item?: PurchaseOrderItem;
}
