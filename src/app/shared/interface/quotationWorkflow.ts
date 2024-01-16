import { BaseModel } from "./baseModel";
import { Quotation } from "./quotation";
import { User } from "./user";

export interface QuotationWorkflow extends Omit<BaseModel, 'status'>{
    quotation_id: number;
    user_id: number;
    seller_id: number;
    project_manager_id: number;
    comments: string;
    status: QuotationWorkflowStatusEnum;

    quotation?: Quotation;
    user?: User;
    seller?: User;
    project_manager?: User;
}


export enum QuotationWorkflowStatusEnum {
    Cotizando = 'cotizando',
    Revisando = 'revisando',
    Aprobado = 'aprobado',
    Negociando = 'negociando',
    Cierre = 'cierre',
}
