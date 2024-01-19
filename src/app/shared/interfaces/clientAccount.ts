import { CoinEnum } from "./account";
import { Bank } from "./bank";
import { BaseModel } from "./baseModel";
import { Client } from "./client";

export interface ClientAccount extends BaseModel {
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
