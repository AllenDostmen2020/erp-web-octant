import { Address } from "./address";
import { BaseModel } from "./baseModel";
import { ConditionsPaymentInstallment } from "./conditionsPaymentInstallment";
import { PurchaseOrder } from "./purchaseOrder";

export interface PurchaseOrderCondition extends BaseModel {

    purchase_order_id: number;
    delivery_terms: string;
    payment_condition: string;
    address_id: number;
    number_installments: number;

    purchase_order?: PurchaseOrder;
    address?: Address;

    conditions_payment_installments?: ConditionsPaymentInstallment[];
}
