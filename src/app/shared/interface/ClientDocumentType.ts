import { ActivityProcess } from "./activityProcess";
import {BaseModel } from "./baseModel";
import { Employee } from "./employees";
import { ProcessTree } from "./processTree";
export interface ClientDocumentType extends BaseModel{
  id:number;
  name:string;
  code:string;
  description:string;
  status:string;
  client_id:number;
  client_location_id:number;
  active: boolean;

  clientDocumentType?: ClientDocumentType[];

}

