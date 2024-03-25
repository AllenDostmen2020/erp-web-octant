import { BaseModel } from "./baseModel";
import { Contract } from "./contract";
import { Vehicle } from "./vehicle";

export interface ContractPlanVehicle extends BaseModel {
    contract_id: number;
    vehicle_id: number;
    installation_date: string;

    vehicle?: Vehicle;
    contract?: Contract;
}