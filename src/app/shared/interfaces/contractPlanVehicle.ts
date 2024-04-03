import { BaseModel } from "./baseModel"
import { ContractInstallation } from "./contractInstallation";
import { ContractPlan } from "./contractPlan";
import { Vehicle } from "./vehicle";

export interface ContractPlanVehicle extends BaseModel {
    contract_plan_id: number;
    vehicle_id: number;
    contract_installation_id: number;
    installation_date: string;
    gps_imei: string;

    vehicle?: Vehicle;
    contract_plan?: ContractPlan;
    contract_installation?: ContractInstallation;
}