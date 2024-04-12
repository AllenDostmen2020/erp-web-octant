import { BaseModel } from "./baseModel";
import { BoxMovement, BoxMovementTypeEnum } from "./boxMovement";
import { Client } from "./client";
import { ClientBox } from "./clientBox";
import { ClientPaymentDocument } from "./clientPaymentDocument";

export interface ClientBoxMovement extends BaseModel {
    client_id: number;
    client_box_id: number;
    box_movement_id: number;
    to_client_box_id: number;
    from_client_box_id: number;
    amount: number;
    type: BoxMovementTypeEnum;
    concept: string;

    client?: Client;
    client_box?: ClientBox;
    box_movement?: BoxMovement;
    client_payment_documents?: ClientPaymentDocument[];
}
