import { BaseModel } from "./baseModel"
import { ContractPlan } from "./contractPlan";
import { Vehicle } from "./vehicle";

export interface ContractPlanVehicle extends BaseModel {
    contract_plan_id: number;
    vehicle_id: number;
    installation_date: string;

    vehicle?: Vehicle;
    contract_plan?: ContractPlan;
}