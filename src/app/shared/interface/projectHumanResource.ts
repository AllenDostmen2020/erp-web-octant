import { BaseModel } from "./baseModel";
import { HumanResource } from "./humanResource";
import { Project } from "./project";
import { User } from "./user";

export interface ProjectHumanResource extends BaseModel {
  project_id: number;
  human_resource_id: number;
  user_id: number;

  project:Project;
  human_resource: HumanResource;
  user:User;
}
