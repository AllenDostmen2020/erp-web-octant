import { BaseModel } from "./baseModel";
import { User } from "./user";

export interface ContractResolution extends BaseModel {
    contract_id: number;
    type: ContractResolutionTypeEnum;
    resolution_entity: ContractResolutionEntityEnum;
    reason: string;
    mutual_agreement: string;
    discharge_from_other_party: string;
    final_agreement: string;
    responsible_user_id: number;
    client_responsible_document_type: string;
    client_responsible_document_number: string;
    client_responsible_role: string;
    client_responsible_name: string;
    client_responsible_phone: string;
    client_responsible_email: string;
    link_file: string;

    responsible_user?:  User;
}

export enum ContractResolutionTypeEnum {
    Unilateral = 'unilateral',
    MutuoAcuerdo = 'mutuo acuerdo',
}

export const CONTRACT_RESOLUTION_TYPE_VALUES = Object.values(ContractResolutionTypeEnum);

export enum ContractResolutionEntityEnum {
    Empresa = 'empresa',
    Cliente = 'cliente',
}

export const CONTRACT_RESOLUTION_ENTITY_VALUES = Object.values(ContractResolutionEntityEnum);