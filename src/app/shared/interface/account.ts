import { Bank } from "./bank";
import { CoinEnum } from "./baseModel";

export interface Account {
    id: number;
    name: string;
    number: string;
    description: string;
    coin: CoinEnum;

    bank_id: number;

    bank?: Bank;
}

