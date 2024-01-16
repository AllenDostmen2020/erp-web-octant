import { BaseModel } from "./baseModel";
import { DocumentType } from "./documentType";
import { Investor } from "./investor";
import { Position } from "./positions";

export interface InvestorContact extends BaseModel {
    investor_id: number;
    document_number: string;
    document_type_id: number;
    position_id: number;
    name: string;
    phone: string;
    email: string;
    description: string;
    principal_contact: boolean;

    document_type?: DocumentType;
    investor?: Investor;
    position?: Position;
}
