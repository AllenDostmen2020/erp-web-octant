import { BaseModel } from "./baseModel";
import { BoxMovement } from "./boxMovement";
import { CostCenter } from "./costCenter";

export interface CostCenterMovement extends BaseModel {
    cost_center_id: number;
    box_movement_id: number;

    cost_center?: CostCenter;
    box_movement?: BoxMovement;

}
