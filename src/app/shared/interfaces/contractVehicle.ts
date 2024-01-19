import { BaseModel } from "./baseModel";
import { Contract } from "./contract";
import { Vehicle } from "./vehicle";

export interface ContractVehicle extends BaseModel {
    contract_id: number;
    vehicle_id: number;

    vehicle?: Vehicle;
    contract?: Contract;
}