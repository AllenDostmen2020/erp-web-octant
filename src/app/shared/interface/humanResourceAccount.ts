import { Bank } from "./bank";
import { BaseModel } from "./baseModel";
import { HumanResource } from "./humanResource";

export interface HumanResourceAccount extends BaseModel {
    human_resource_id: number;
    baknk_id: number;
    number: string;
    type: HumanResourceAccountTypeEnum;

    human_resource?: HumanResource;
    bank?: Bank;
}

export enum HumanResourceAccountTypeEnum {
    CTS = 'cts',
    SUELDO = 'sueldo',
}
