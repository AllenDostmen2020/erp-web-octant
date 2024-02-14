import { BaseModel } from "./baseModel";
import { Client } from "./client";

export interface ClientContact extends BaseModel {
    client_id: number;
    document_type: string;
    document_number: string;
    name: string;
    paternal_name: string;
    maternal_name: string;
    email: string;
    address: string;
    phone: string;
    cellphone: string;
    principal: boolean;

    client?: Client;
}
