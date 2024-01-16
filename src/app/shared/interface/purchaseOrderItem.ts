import { BaseModel, CoinEnum } from "./baseModel";
import { MeasurementUnit } from "./measurementUnit";
import { PurchaseOrder } from "./purchaseOrder";

export interface PurchaseOrderItem extends BaseModel {
    purchase_order_id?: number;
    measurement_unit_id?: number;
    code?: string;
    name?: string;
    coin?: CoinEnum;
    warranty?: string;
    description?: string;
    price?: number;
    quantity?: number;
    subtotal?: number;

    parent_id: number | null;
    quotation_item_id: number | null;
    unit_cost_material_id: number | null;
    unit_cost_workforce_id: number | null;
    unit_cost_equipment_tool_id: number | null;
    unit_cost_subcontract_id: number | null;
    index: number;
    level: number;

    purchase_order?: PurchaseOrder;
    measurement_unit?: MeasurementUnit;

    children?: PurchaseOrderItem[];
}
