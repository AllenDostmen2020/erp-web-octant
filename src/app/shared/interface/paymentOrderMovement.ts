import { BaseModel } from "./baseModel";
import { BoxMovement } from "./boxMovement";
import { PaymentOrder } from "./paymentOrder";

export interface PaymentOrderMovement extends BaseModel {

    box_movement_id: any;
    payment_order_id: number;

    box_movement?: BoxMovement;
    payment_order?: PaymentOrder;
}
