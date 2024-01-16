import { BaseModel, DocumentTypeItem } from "./baseModel";
import { ClientBusinessUnit } from "./clientBusinessUnit";
import { ClientContact } from "./clientContact";
import { CustomerBusinessSector } from "./customerBusinessSectors";
import { Quotation } from "./quotation";

export interface Client extends BaseModel {
    id:number;
    business_sector_id: number;
    document_number: string;
    name: string;
    comercial_name: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    type: string;
    logo: string;
    code: string;
    website: string;
    document_type_id: number;
    active: boolean;
    principal_customer_contact?: ClientContact;
    customer_contacts? : ClientContact[];
    // quotations? : Quotation[];
    // count_quotations? : number[];
    // count_quotation_closes? : Quotation[];
    
    document_type?: DocumentType;

    customer_business_sectors?: CustomerBusinessSector[];
    client_business_units?: ClientBusinessUnit[];
}
