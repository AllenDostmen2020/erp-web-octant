import { BaseModel } from "./baseModel";
import { Provider } from "./proveedor";
import { Subcontract } from "./subcontract";

 export interface SubcontractProvider extends BaseModel {
    subcontract_id: number;
    provider_id: number;
    code: string;
    name: string;
    description: string;

    delivery_days: number;
    price: number;
    coin: CoinEnum;

    commentary: string;
    payment_type: string;

    subcontract?: Subcontract;
    provider?: Provider;

 }

 export enum CoinEnum {
    Soles = 'soles',
    Dolares = 'dólares',
}
