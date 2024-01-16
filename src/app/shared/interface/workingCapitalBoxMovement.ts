import { Bank } from "./bank";
import { BaseModel } from "./baseModel";
import { BoxMovement } from "./boxMovement";
import { Partner } from "./partner";
import { WorkingCapitalBoxOpening } from "./workingCapitalBoxOpening";

export interface WorkingCapitalBoxMovement extends BaseModel {
    id: number;
    type: BoxMovementTypeEnum;
    concept: string;
    link_file: string;
    amount: number;
    payment_type: PaymentTypeEnum;
    opcode: string;
    payment_date: string;
    invoice_number: string;
    code: string;
    observation: string;

    bank_id: string;
    box_opening_id: number;
    partner_id: number;
    box_movement_id: number;

    bank?: Bank;
    working_capital_box_opening?: WorkingCapitalBoxOpening;
    partner?: Partner;
    box_movement? : BoxMovement;
}

export enum BoxMovementTypeEnum {
    INGRESO = 'ingreso',
    EGRESO = 'egreso',
}

export enum PaymentTypeEnum {
    TRANSFERENCIA = 'transferencia',
    DEPOSITO = 'depósito',
    EFECTIVO = 'efectivo',
    CHEQUE = 'cheque',
}
