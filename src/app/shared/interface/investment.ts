import { Bank } from "./bank";
import { BaseModel } from "./baseModel";
import { BoxMovement } from "./boxMovement";
import { BoxOpening } from "./boxOpening";
import { InvestmentWithdrawal } from "./investmentWithdrawal";
import { Investor } from "./investor";

export interface Investment extends BaseModel {
    investor_id: number;
    box_movement_id: number;
    name: string;
    description: string;
    amount: number

    interest: number,
    start_date: string,
    final_date: string,
    number_installments: number,
    payment_date: string,
    payment_amount: number,
    recurring_payment: RecurringPaymentTypeEnum,

    box_movement?: BoxMovement;
    investor?: Investor;
    bank?: Bank;
    box_opening?: BoxOpening;

    investment_withdrawals?: InvestmentWithdrawal[];
}

export enum RecurringPaymentTypeEnum {
    SEMANAL = 'semanal',
    QUINCENAL = 'quincenal',
    MENSUAL = 'mensual',
    BIMESTRAL = 'bimestral',
    TRIMESTRAL = 'trimestral',
    SEMESTRAL = 'semestral',
    ANUAL = 'anual',
}

