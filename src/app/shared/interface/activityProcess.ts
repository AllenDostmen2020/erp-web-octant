import { BaseModel } from "./baseModel";
import { ProcessTree } from "./processTree";

export interface ActivityProcess extends BaseModel {
    name: string;
    description: string;
    file: string;
    process_tree_id: number;
    processTree:ProcessTree;
}
