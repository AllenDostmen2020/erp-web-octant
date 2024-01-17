import { BaseModel, DocumentTypeEnum } from "./baseModel";

export interface Client extends BaseModel {
    document_type: DocumentTypeEnum;
    document_number: string;
    name: string;
    description: string;
    address: string;
    phone: string;
    cellphone: string;
    email: string;
}
