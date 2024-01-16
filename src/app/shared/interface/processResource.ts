import { BaseModel } from "./baseModel";
import { ProcessTree } from "./processTree";
import { TypeActivity } from "./typeActivity";
export interface ProcessResource extends BaseModel {
    name: string;
    description: string;

    process_tree_id: number,
    process_tree: ProcessTree,
    file:string,
    active:boolean,
    children?: ProcessTree[];
}
