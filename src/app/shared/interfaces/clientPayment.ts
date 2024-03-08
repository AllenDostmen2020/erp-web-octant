import { BaseModel } from "./baseModel";
import { BoxMovement } from "./boxMovement";
import { Client } from "./client";
import { ClientAccount } from "./clientAccount";
import { ClientPaymentDocument } from "./clientPaymentDocument";

export interface ClientPayment extends BaseModel {
    client_id: number;
    client_account_id: number;
    box_movement_id: number;
    amount: number;
    amount_used: number;

    client?: Client;
    client_account?: ClientAccount;
    box_movement?: BoxMovement;
    client_payment_documents?: ClientPaymentDocument[];
}
