import { ActivityProcess } from "./activityProcess";
import {BaseModel } from "./baseModel";
import { ClientDocumentType } from "./ClientDocumentType";
import { Employee } from "./employees";
import { ProcessTree } from "./processTree";
import { User } from "./user";
export interface ClientDocument extends BaseModel{
  id:number;
  process_tree_ids:number|null;
  document_parent_id: number|null;
  name:string;
  code:string;
  description:string;
  type:'folder'|'file';
  status:string;
  level:number;
  client_id:number;
  client_location_id:number;
  link_file:string;
  active: boolean;
  version:number;

  elaborate_employee_id: number | null;
  review_employee_id: number | null;
  approval_employee_id: number | null;

  elaborate_employee?: Employee;
  review_employee?: Employee;
  approval_employee?: Employee;

  children?: ClientDocument[];
  child_folders?: ClientDocument[];
  child_files?: ClientDocument[];
  observation:string|null;
  children_count?: number;
  child_folders_count?: number;
  child_files_count?: number;

  process_tree?: ProcessTree;
  shared_process_trees?: ProcessTree[];

  clientDocumentType?: ClientDocumentType[];

  update_user_id:number;
  create_user_id:number;

  user?:User;

}

