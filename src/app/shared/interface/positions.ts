import { BaseModel } from "./baseModel";
import { CompanyArea } from "./companyArea";
import { HumanResource } from "./humanResource";
import { UserRoleEnum } from "./user";

export interface Position extends BaseModel{
  parent_id: number;
  name: string;
  description:string;
  active: boolean;
  user_role: UserRoleEnum;
  level: number;
  company_area_id: number;

  human_resources?: HumanResource[];
  children: Position[];
  company_area?: CompanyArea;

  children_count: number;
}

export const userRoles = Object.values(UserRoleEnum);
