import { BaseModel } from "./baseModel";

export interface HealthRegimen extends BaseModel {
    name: string;
    pay_percent: number;
    pay_amount: number;
    description: string;
}
