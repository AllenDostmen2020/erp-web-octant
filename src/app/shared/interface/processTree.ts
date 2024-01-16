import { ActivityProcess } from "./activityProcess";
import {BaseModel } from "./baseModel";
import { Employee } from "./employees";
export interface ProcessTree extends BaseModel{
  id:number;
  name:string;
  type: 'root' | 'macroproceso' | 'proceso' | 'subproceso';
  description:string;
  abbreviation:string;
  active: boolean;
  process_tree_parent_id: number|null;
  children?: ProcessTree[];
  activity_processes: ActivityProcess[]
  process_employees: ProcessEmployees[]

}

interface ProcessEmployees extends BaseModel {
  process_tree_id: number;
  employee_id: number;
  employee: Employee
}
