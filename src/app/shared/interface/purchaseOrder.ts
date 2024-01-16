import { BaseModel, CoinEnum } from "./baseModel";
import { CostCenter } from "./costCenter";
import { Project } from "./project";
import { Provider } from "./proveedor";
import { ProviderAccount } from "./providerAccount";
import { ProviderContact } from "./providerContact";
import { PurchaseOrderCondition } from "./purchaseOrderCondition";
import { PurchaseOrderItem } from "./purchaseOrderItem";
import { PurchaseOrderWorkflow } from "./purchaseOrderWorkflow";

export interface PurchaseOrder extends BaseModel {

    project_id: number;
    cost_center_id: number;
    provider_id: number;
    provider_contact_id: number;
    name: string;
    code: string;
    type: PurchaseOrderTypeEnum;
    coin: CoinEnum;
    exchage_rate: number;
    rent: number;
    detraction: number;
    igv: number;
    total: number;
    description: string;
    include_igv_items: boolean;
    asociate_to: PurchaseOrderAsociateToEnum;
    global_discount: number;
    reference: string;
    scopes: string[];

    current_account_id: number;
    detraction_account_id: number;

    cost_center?: CostCenter;
    project?: Project;
    provider?: Provider;
    provider_contact?: ProviderContact;
    purchase_order_items?: PurchaseOrderItem[];
    purchase_order_condition?: PurchaseOrderCondition;
    purchase_order_scopes?: string[];
    current_account?: ProviderAccount;
    detraction_account?: ProviderAccount;

    last_purchase_order_workflow?: PurchaseOrderWorkflow;
}

export enum PurchaseOrderTypeEnum {
    BIEN = 'bien',
    SERVICIO = 'servicio',
}

export enum PurchaseOrderAsociateToEnum {
    CENTRO_DE_COSTO = 'centro de costo',
    PROYECTO = 'proyecto',
}
