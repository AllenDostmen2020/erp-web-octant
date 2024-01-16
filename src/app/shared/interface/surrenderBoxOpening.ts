import { BaseModel } from "./baseModel";
import { SurrenderBox } from "./surrenderBox";
import { User } from "./user";

export interface SurrenderBoxOpening extends BaseModel{
    id: number;
    open_user_id: number;
    close_user_id: number;
    working_user_ids: string;
    date_open: string;
    date_close: string;
    amount_init: number;
    amount_exit: number;
    code: string;

    surrender_box_id: number;

    open_user?: User;
    close_user?: User;

    surrender_box?: SurrenderBox;
}
