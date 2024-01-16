import { Account } from "./account";
import { BaseModel, CoinEnum } from "./baseModel";
import { Project } from "./project";
import { SurrenderBoxOpening } from "./surrenderBoxOpening";
import { User } from "./user";

export interface SurrenderBox extends BaseModel{
    user_id: number;
    project_id: number;
    type: BoxTypeEnum;
    name: string;
    description: string;
    coin: CoinEnum;
    amount: number;
    code: string;

    surrender_box_openings?: SurrenderBoxOpening[];
    last_surrender_box_opening?: SurrenderBoxOpening;
    last_surrender_box_opening_active?: SurrenderBoxOpening;

    account_id: number;

    account?: Account;
    user?: User;
    project?: Project;
}

export enum BoxTypeEnum {
    FISICA = 'fisica',
    VIRTUAL = 'virtual',
}
