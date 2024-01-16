import { BaseModel } from "./baseModel";

export interface ClientLocation extends BaseModel {
    name: string;
    address: string | null;
    description: string;
}
