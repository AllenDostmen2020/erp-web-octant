import { BaseModel } from "./baseModel";
import { ClientBusinessUnit } from "./clientBusinessUnit";
import { Position } from "./positions";
import { User } from "./user";

export interface ClientContact extends BaseModel {
    customer_id: number;
    document_number: string;
    position_id: number;
    name: string;
    phone: string;
    email: string;
    principal_contact: boolean;
    clientBusinessUnit: ClientBusinessUnit;
    client_business_unit: number;

    user_id: number;
    update_user_id: number;
    create_user_id: number;

    user?: User;
    position?: Position;
}
