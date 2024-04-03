import { BaseModel } from "./baseModel";
import { Contract } from "./contract";

export interface ContractInstallation extends BaseModel {
    contract_id: number;
    responsible_document_type: string;
    responsible_document_number: string;
    responsible_name: string;
    responsible_paternal_name: string;
    responsible_maternal_name: string;
    date: string;
    observation: string;

    contract?: Contract;
}