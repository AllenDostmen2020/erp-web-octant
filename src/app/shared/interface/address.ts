import { BaseModel } from "./baseModel";
import { Ubigeo } from "./ubigeo";

export interface Address extends BaseModel {

    name: string;
    ubigeo_id: number;

    ubigeo: Ubigeo;
}
