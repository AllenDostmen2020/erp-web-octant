import { BaseModel } from "./baseModel";
import { BoxMovement } from "./boxMovement";
import { PaymentOrderWorkflow } from "./paymentOrderWorkflow";
import { PurchaseOrder } from "./purchaseOrder";
import { PurchaseOrderCondition } from "./purchaseOrderCondition";

export interface PaymentOrder extends Omit<BaseModel, 'status'> {
    purchase_order_id: number;
    purchase_order_condition_id: number;
    box_movement_id: number;
    amount: number;
    percent: number;
    payment_date: string;
    comentary: string;
    code: string;
    status: string;


    purchase_order_condition?: PurchaseOrderCondition;
    purchase_order?: PurchaseOrder;
    box_movement?: BoxMovement;

    last_payment_order_workflow?: PaymentOrderWorkflow;
}

export enum PaymentOrderWokflowStatusEnum {
    ADMINISTRACIÓN = 'administración',
    TESORERÍA = 'tesorería',
}
