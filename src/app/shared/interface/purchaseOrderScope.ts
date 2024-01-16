import { BaseModel } from "./baseModel";
import { PurchaseOrder } from "./purchaseOrder";

export interface PurchaseOrderScope extends BaseModel {

    purchase_order_id: number;
    name: string;
    description: string;

    purchase_order?: PurchaseOrder;
}
