import { Bank } from "./bank";
import { BaseModel, CoinEnum } from "./baseModel";
import { BoxOpening } from "./boxOpening";
import { ComprobantTypeEnum } from "./clientBillingOption";
import { User } from "./user";

export interface BoxMovement extends BaseModel {
    id: number;
    type: BoxMovementTypeEnum;
    concept: string;
    link_file: string;
    amount: number;
    payment_type: PaymentTypeEnum;
    payment_date: string;
    code: string;
    operation_code: string;
    coin: CoinEnum;
    observation: string;
    voucher_type: ComprobantTypeEnum;
    voucher_file: string;
    invoice_number: string;

    bank_id: number;
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
