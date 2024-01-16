import { BaseModel } from "./baseModel";

export interface PensionScheme extends BaseModel {
    name: string;
    discount_percent: number;
    discount_amount: number;
    description: string;
}
