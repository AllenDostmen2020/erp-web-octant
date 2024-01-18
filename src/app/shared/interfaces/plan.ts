import { BaseModel, CoinEnum } from "./baseModel";

export interface Plan extends BaseModel {
    name: string;
    price: number;
    interval: string | null;
    interval_count: number | null;
    trial_period_days: number | null;
    coin: CoinEnum;
    description: string;
}
