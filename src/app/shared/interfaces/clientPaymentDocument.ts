import { BaseModel } from "./baseModel";
import { ClientBoxMovement } from "./clientBoxMovement";
import { Document } from "./document";

export interface ClientPaymentDocument extends BaseModel {
    document_id: number;
    client_payment_id: number;
    amount: number;

    document?: Document;
    client_box_movement?: ClientBoxMovement;
}