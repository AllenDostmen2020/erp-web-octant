import { BaseModel } from "./baseModel";
import { DocumentType } from "./documentType";
import { Investment } from "./investment";

export interface Investor extends BaseModel {
    id: number;
    business_sector_id: number;
    document_number: string;
    comercial_name: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    type: InvestorTypeEnum;
    description: string;
    code: string;
    document_type_id: number;
    active: boolean;

    document_type?: DocumentType;

    investments?: Investment[];

}

export enum InvestorTypeEnum {
    FINANCIERO = 'financiero',
    SOCIO_INTERNO = 'socio interno',
    SOCIO_EXTERNO = 'socio externo',
}
