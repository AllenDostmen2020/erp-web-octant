import { BaseModel } from "./baseModel";
import { CostItem } from "./costItem";
import { Investment } from "./investment";

export interface CostItemPullInvestment extends BaseModel {
  cost_item_id: number;
  investment_id: number;

  cost_item: CostItem;
  investment: Investment;
}
