import { BaseModel, CoinEnum } from "./baseModel";
import { Client } from "./client";

export interface ClientBox extends BaseModel {
    client_id: number;
    name: string;
    type: ClientAccountTypeEnum;
    coin: CoinEnum;
    total: any;
    amount_available: number;
    amount_entered: number;
    amount_graduated: number;

    client?: Client;
}


export enum ClientAccountTypeEnum {
    Recaudacion = 'recaudación',
    Detraccion = 'detracción',
    Retención = 'retención',
}
