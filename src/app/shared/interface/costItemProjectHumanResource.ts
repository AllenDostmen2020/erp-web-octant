import { BaseModel } from "./baseModel";
import { CostItem } from "./costItem";
import { ProjectHumanResource } from "./projectHumanResource";

export interface CostItemProjectHumanResource extends BaseModel {
  cost_item_id: number;
  project_hr_id: number;
  cost_item: CostItem;
  project_human_resource: ProjectHumanResource;
}
