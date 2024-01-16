import { BaseModel } from "./baseModel";
import { QuotationSubcontract } from "./quotationSubcontract";
import { SubcontractProvider } from "./subcontractProvider";

export interface QuotationSubcontractProvider extends BaseModel{
    quotation_subcontract_id: number;
    subcontract_provider_id: number;

    quantity: number;

    quotation_subcontract?: QuotationSubcontract;
    subcontract_provider?: SubcontractProvider;
}
