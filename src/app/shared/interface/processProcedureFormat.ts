import { BaseModel } from "./baseModel";
import { Employee } from "./employees";
import { ProcessTree } from "./processTree";
import { User } from "./user";
export interface ProcessProcedureFormat extends BaseModel {
    id:number;
    process_tree_id: number,
    name: string;
    description: string;
    reference_table: string;
    reference_id: number;
    client_id: number;
    link_file: string|null;
    external_link_file: string|null;
    reference_redirect_url: string;
    reference:any;
    employee:Employee;
    user:User;
    process_tree: ProcessTree,
    active:boolean,
}
