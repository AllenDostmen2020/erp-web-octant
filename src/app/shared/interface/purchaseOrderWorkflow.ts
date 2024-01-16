import { BaseModel } from "./baseModel";
import { PurchaseOrder } from "./purchaseOrder";
import { User } from "./user";

export interface PurchaseOrderWorkflow extends BaseModel {

    user_id: any;
    purchase_order_id: number;
    status_workflow: PurchaseOrderWokflowStatusEnum;
    actions: any[];
    comments: string;

    user?: User;
    purchase_order?: PurchaseOrder;
}

export enum PurchaseOrderWokflowStatusEnum {
    LOGISTICA = 'logística',
    ADMINISTRACION = 'administración',
    PROVEEDOR = 'proveedor',
}

export enum PurchaseOrderWokflowActionEnum {
    SolicitudDeAprobacion = 'solicitud de aprobación',
    Aprobar = 'aprobar',
    Denegar = 'denegar',
    Enviar = 'enviar',
}
