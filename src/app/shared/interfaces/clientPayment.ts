import { BaseModel, CoinEnum } from "./baseModel";
import { BoxMovement } from "./boxMovement";
import { Client } from "./client";
import { ClientAccount } from "./clientAccount";

export interface ClientPayment extends BaseModel {
    client_id: number;
    client_account_id: number;
    box_movement_id: number;

    client?: Client;
    client_account?: ClientAccount;
    box_movement?: BoxMovement;
}
