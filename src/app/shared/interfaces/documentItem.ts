import { BaseModel } from "./baseModel";
import { Document } from "./document";

export interface DocumentItem extends BaseModel {

    document_id: number;
    description: string;
    quantity: number;
    unit_value: number;
    unit_price: number;
    total_value: number;
    total_igv: number;
    total_discount: number;
    total: number;
    unit_type: string;
    igv_affectation_type: string;

    document?: Document;
}