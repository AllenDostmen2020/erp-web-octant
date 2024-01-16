import { BaseModel } from "./baseModel";
import { HumanResource } from "./humanResource";
import { Position } from "./positions";
import { Project } from "./project";
import { User } from "./user";

export interface ProjectUser extends BaseModel {
  project_id: number;
  user_id: number;
  position_id: number;
  isset_surrender_box: boolean;

  project?:Project;
  position?: Position;
  user?:User;
}
