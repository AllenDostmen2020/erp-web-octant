import { BaseModel } from "./baseModel";
import { Client } from "./client";
import { ContractPlanVehicle } from "./contractPlanVehicle";
import { ContractVehicle } from "./contractVehicle";
import { VehicleType } from "./vehicleType";

export interface Vehicle extends BaseModel {
    vehicle_type_id: number;
    client_id: number;
    plate: string;
    color: string;
    brand: string;
    model: string;
    year: string;
    image: string;
    file: string;
    description: string;

    client?: Client;
    vehicle_type?: VehicleType;
    latest_contract_plan_vehicle?: ContractPlanVehicle;
    contract_vehicles?: ContractVehicle[];
}
