import { BaseModel } from "./baseModel";
import { Box } from "./box";
import { User } from "./user";

export interface BoxOpening extends Omit<BaseModel,'status'>{
    id: number;
    open_user_id: number;
    close_user_id: number;
    working_user_ids: string;
    date_open: string;
    date_close: string;
    amount_init: number;
    amount_exit: number;
    code: string;
    status: string;

    box_id: number;

    open_user?: User;
    close_user?: User;

    box?: Box;
}
