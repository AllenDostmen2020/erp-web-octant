import { BaseModel } from "./baseModel";
import { Holiday } from "./holiday";

export interface Calendar extends BaseModel {
    holiday_id: number;
    name: string;
    description: string;
    working_days: any[];

    holiday?: Holiday;
}
