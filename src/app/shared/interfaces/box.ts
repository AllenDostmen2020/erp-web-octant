import { Account } from "./account";
import { BaseModel, CoinEnum } from "./baseModel";
import { BoxOpening } from "./boxOpening";

export interface Box extends BaseModel{
    id: number;
    type: BoxTypeEnum;
    name: string;
    description: string;
    coin: CoinEnum;
    amount: number;
    code: string;

    box_openings?: BoxOpening[];
    last_box_opening?: BoxOpening;
    last_box_opening_active?: BoxOpening;

    account_id: number;

    account?: Account;
}

export enum BoxTypeEnum {
    FISICA = 'fisica',
    VIRTUAL = 'virtual',
}
