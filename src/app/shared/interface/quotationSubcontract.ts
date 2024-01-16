import { BaseModel } from "./baseModel";
import { Quotation } from "./quotation";
import { QuotationSubcontractProvider } from "./quotationSubcontractProvider";
import { Subcontract } from "./subcontract";

export interface QuotationSubcontract extends BaseModel {
    quotation_id: number;
    subcontract_id: number;
    parent_id: number;

    buy_quantity: number;
    quantity: number;
    price: number;
    coin: CoinEnum;

    is_not_projected: boolean;
    quantity_not_projected?: number;
    justification_quantity_not_projected?: string;

    quotation?: Quotation;
    subcontract?: Subcontract;

    children?: QuotationSubcontract[];

    quotation_subcontract_providers?: QuotationSubcontractProvider[];
 }

 export enum CoinEnum {
    Soles = 'soles',
    Dolares = 'dólares',
}
