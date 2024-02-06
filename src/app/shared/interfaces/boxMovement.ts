import { Bank } from "./bank";
import { BaseModel, CoinEnum } from "./baseModel";
import { BoxOpening } from "./boxOpening";
import { User } from "./user";

export interface BoxMovement extends BaseModel {
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
    operation_code: string;
    coin: CoinEnum;
    observation: string;

    bank_id: string;
    box_opening_id: number;
    user_id: number;

    bank?: Bank;
    box_opening?: BoxOpening;
    user?: User;
}

export enum BoxMovementTypeEnum {
    INGRESO = 'ingreso',
    EGRESO = 'egreso',
    MOVIMIENTO_ENTRE_CAJAS = 'movimiento entre cajas',
}

export enum PaymentTypeEnum {
    TRANSFERENCIA = 'transferencia',
    DEPOSITO = 'depósito',
    EFECTIVO = 'efectivo',
    CHEQUE = 'cheque',
}
