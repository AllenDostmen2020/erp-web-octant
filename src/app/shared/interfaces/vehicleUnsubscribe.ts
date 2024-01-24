import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BaseModel } from "./baseModel";
import { User } from "./user";
import { Vehicle } from "./vehicle";

export interface VehicleUnsubscribe extends BaseModel {
    vehicle_id: number;
    user_id: number;
    programming_type: VehicleUnsubscribeProgrammingType;
    reason: string;
    observations: string;
    start_date: string;
    end_date: string;
    cancellation_user_id: number;
    cancellation_date: string;

    vehicle?: Vehicle;
    user?: User;
    cancellation_user?: User;
}

export enum VehicleUnsubscribeProgrammingType {
    FinDeContrato = 'fin de contrato',
    fechaFija = 'fecha fija',
    indefinida = 'indefinida',
}
export const VEHICLE_UNSUBSCRIBE_PROGRAMMING_TYPE = Object.values(VehicleUnsubscribeProgrammingType);
