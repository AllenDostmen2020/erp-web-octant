import { BaseModel } from "./baseModel";
import { ClientBox } from "./clientBox";
import { Document } from "./document";

export interface ClientPaymentDocument extends BaseModel {
    document_id: number;
    client_box_id: number;
    amount: number;

    document?: Document;
    client_box?: ClientBox;
}