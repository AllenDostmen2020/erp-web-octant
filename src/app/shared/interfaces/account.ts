import { Bank } from "./bank";
import { BaseModel, CoinEnum } from "./baseModel";

export interface Account extends BaseModel {
    bank_id: number;
    name: string;
    number: string;
    description: string;
    coin: CoinEnum;

    bank?: Bank;
}
