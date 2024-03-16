import { BaseModel, CoinEnum } from "./baseModel";
import { Client } from "./client";

export interface ClientBox extends BaseModel {
    client_id: number;
    name: string;
    type: ClientAccountTypeEnum;
    coin: CoinEnum;
    total: any;

    client?: Client;
}


export enum ClientAccountTypeEnum {
    Recaudacion = 'recaudación',
    Detraccion = 'detracción',
    Retención = 'retención',
}
