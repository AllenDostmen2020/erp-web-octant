import { BaseModel } from "./baseModel";
import { ComprobantTypeEnum } from "./boxMovement";

export interface ClientBillingOption extends BaseModel {
    client_id: number;
    comprobant_type: ComprobantTypeEnum;
    group_notes_single_voucher: boolean;
    detraction: boolean;
    detraction_percent: number;
    retention: boolean;
    igv_apply: boolean;
    retention_percent: number;
}


export const COMPROBANT_TYPES = Object.values(ComprobantTypeEnum);
