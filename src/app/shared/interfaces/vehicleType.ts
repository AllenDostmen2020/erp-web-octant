import { BaseModel } from "./baseModel";

export interface VehicleType extends BaseModel {
    name: string;
    description: string;
    image: string;
}
