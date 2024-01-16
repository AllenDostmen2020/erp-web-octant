import { BaseModel } from "./baseModel";
import { PaymentOrder } from "./paymentOrder";
import { User } from "./user";

export interface PaymentOrderWorkflow extends BaseModel {

    user_id: any;
    payment_order_id: number;
    status_workflow: PaymentOrderWokflowStatusEnum;
    actions: any[];
    comments: string;

    user?: User;
    payment_order?: PaymentOrder;
}

export enum PaymentOrderWokflowStatusEnum {
    Administracion = 'administración',
    Tesoreria = 'tesorería',
    Proveedor = 'proveedor',
}
