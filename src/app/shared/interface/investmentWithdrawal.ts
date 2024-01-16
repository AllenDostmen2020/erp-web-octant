import { Bank } from "./bank";
import { BaseModel, StatusModel } from "./baseModel";
import { BoxMovement } from "./boxMovement";
import { BoxOpening } from "./boxOpening";
import { Investment } from "./investment";

export interface InvestmentWithdrawal extends BaseModel {
    investment_id: number;
    box_movement_id: number;
    name: string;
    description: string;
    amount?: number;
    status: StatusModel;

    number_installment: number;
    scheduled_payment_date: string;
    made_payment_date: string;
    fee_amount: number;
    delay_days: number;
    delay_interest: number;

    box_movement?: BoxMovement;
    investment?: Investment;
    bank?: Bank;
    box_opening?: BoxOpening;
}
