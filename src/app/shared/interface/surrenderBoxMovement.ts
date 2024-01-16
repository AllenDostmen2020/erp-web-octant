import { Bank } from "./bank";
import { BaseModel } from "./baseModel";
import { SurrenderBoxOpening } from "./surrenderBoxOpening";
import { User } from "./user";

export interface SurrenderBoxMovement extends BaseModel {
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
    surrender_box_opening_id: number;
    user_id: number;

    bank?: Bank;
    surrender_box_opening?: SurrenderBoxOpening;
    user?: User;
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
