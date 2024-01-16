import { BaseModel } from "./baseModel";
import { BusinessSector } from "./businessSector";
import { DocumentType } from "./documentType";
import { ProviderBusinessSector } from "./providerBusinessSector";
import { ProviderContact } from "./providerContact";
import { ProviderProduct } from "./providerProduct";
import { QuotationMaterialProvider } from "./quotationMaterialProvider";
import { QuotationSubcontractProvider } from "./quotationSubcontractProvider";
import { SubcontractProvider } from "./subcontractProvider";
import { Ubigeo } from "./ubigeo";
import { User } from "./user";

export interface Provider extends BaseModel {
  name: string;
  comercial_name: string;
  business_sector_id?: string;
  document_type_id?: string;
  ubigeo_id: string;
  document_number: string;
  address: string;
  phone: string;
  delivery_days: number;
  code: string;
  email: string;
  document_number_legal_representant: string;
  name_legal_representant: string;
  image: string;
  principal_provider_contact?: ProviderContact;

  business_sector?:BusinessSector;
  document_type?:DocumentType;

  provider_products?: ProviderProduct[];
  provider_contacts?: ProviderContact[];
  provider_business_sectors?: ProviderBusinessSector[];
  quotation_material_providers?: ProviderQuotationMaterialProvider[];
  quotation_subcontract_providers?: ProviderQuotationSubcontractProvider[];

  ubigeo?: Ubigeo;
}

export interface ProviderQuotationMaterialProvider extends QuotationMaterialProvider, ProviderProduct {}
export interface ProviderQuotationSubcontractProvider extends QuotationSubcontractProvider, SubcontractProvider {}
