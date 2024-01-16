import { BaseModel } from "./baseModel";
import { BoxMovement } from "./boxMovement";
import { PurchaseOrderCondition } from "./purchaseOrderCondition";

export interface ConditionsPaymentInstallment extends Omit<BaseModel, 'status'> {
    purchase_order_condition_id: number;
    box_movement_id: number;
    amount: number;
    percent: number;
    payment_date: string;
    comentary: string;
    status: string;


    purchase_order_condition?: PurchaseOrderCondition;
    box_movement?: BoxMovement;
}
