import { BaseModel } from "./baseModel";
import { User } from "./user";
import { WorkingCapitalBox } from "./workinCapitalBox";

export interface WorkingCapitalBoxOpening extends BaseModel{
    id: number;
    open_user_id: number;
    close_user_id: number;
    working_user_ids: string;
    date_open: string;
    date_close: string;
    amount_init: number;
    amount_exit: number;
    // status: string;
    code: string;

    working_capital_box_id: number;

    open_user?: User;
    close_user?: User;

    working_capital_box?: WorkingCapitalBox;
}
