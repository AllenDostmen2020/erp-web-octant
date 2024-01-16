import { BaseModel } from "./baseModel";

export interface CostCenterType extends BaseModel {
    name: string;
    description: string;

    category_father_id: number;
    level: number;

    children?: CostCenterType[];

    children_count: number;
}
