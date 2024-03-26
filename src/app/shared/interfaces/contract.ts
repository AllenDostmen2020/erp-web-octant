import { BaseModel } from "./baseModel";
import { Client } from "./client";
import { ClientBusinessUnit } from "./clientBusinessUnit";
import { ContractPlanDocumentItem } from "./contractPlanDocumentItem";
import { ContractVehicle } from "./contractVehicle";
import { Plan } from "./plan";

export interface Contract extends BaseModel {
    client_id: number;
    client_business_unit_id: number;
    plan_id: number;
    code: string;
    installation_date: string;
    start_date: string;
    end_date: string;
    period: string;
    proration_days: number;

    quantity: number;
    buy_price: number;
    sale_price: number;
    installation_price: number;
    total_installation_price: number;
    discount: number;
    total: number;
    recurrent_type: RecurrentTypeEnum;

    description: string;
    sale_user_id: number;
    client_responsible_document_type: string;
    client_responsible_document_number: string;
    client_responsible_role: string;
    client_responsible_name: string;
    client_responsible_paternal_name: string;
    client_responsible_maternal_name: string;
    client_responsible_phone: string;
    client_responsible_email: string;
    link_file: string;

    client?: Client;
    client_business_unit?: ClientBusinessUnit;
    plan?: Plan;
    contract_vehicles?: ContractVehicle[];
    last_contract_document_item?: ContractPlanDocumentItem;
}

export enum RecurrentTypeEnum {
    MENSUAL = 'mensual',
    TRIMESTRAL = 'trimestral',
    SEMESTRAL = 'semestral',
    ANUAL = 'anual',
}

export const RECURRENT_TYPE_VALUES = Object.values(RecurrentTypeEnum);
