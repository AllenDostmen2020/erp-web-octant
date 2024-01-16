import { BaseModel } from "./baseModel";
import { Calendar } from "./calendar";

export interface CalendarConfiguration extends BaseModel {
    calendar_id: number;
    module: CalendarConfigurationModuleEnum;

    calendar?: Calendar;
}

export enum CalendarConfigurationModuleEnum {
    PURCHASE_ORDER = 'purchase_order',
    QUOTATION = 'quotation',
    PROJECT = 'project',
}
