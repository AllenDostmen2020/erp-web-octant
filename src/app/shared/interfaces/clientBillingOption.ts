import { BaseModel } from "./baseModel";

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

export enum ComprobantTypeEnum {
    Factura = 'factura',
    Boleta = 'boleta',
}

export const COMPROBANT_TYPES = Object.values(ComprobantTypeEnum);
