import { Account } from "./account";
import { BaseModel, CoinEnum } from "./baseModel";
import { BoxTypeEnum } from "./box";
import { WorkingCapitalBoxOpening } from "./workingCapitalBoxOpening";

export interface WorkingCapitalBox extends BaseModel{
    id: number;
    type: BoxTypeEnum;
    name: string;
    description: string;
    coin: CoinEnum;
    amount: number;
    code: string;

    working_capital_box_openings?: WorkingCapitalBoxOpening[];
    last_working_capital_box_opening?: WorkingCapitalBoxOpening;
    last_working_capital_box_opening_active?: WorkingCapitalBoxOpening;

    account_id: number;

    account?: Account;
}

