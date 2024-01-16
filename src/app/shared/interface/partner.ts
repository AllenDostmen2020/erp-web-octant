import { BaseModel } from "./baseModel";
import { DocumentType } from "./documentType";

export interface Partner extends BaseModel {
    id:number;
    business_sector_id: number;
    document_number: string;
    name: string;
    comercial_name: string;
    address: string;
    phone: string;
    email: string;
    type: string;
    logo: string;
    description: string;
    code: string;
    website: string;
    document_type_id: number;
    participation_percentage: number;
    active: boolean;

    document_type?: DocumentType;

}
