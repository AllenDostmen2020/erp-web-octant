import { array } from "@amcharts/amcharts5";
import { BaseModel } from "./baseModel";
import { DocumentType } from "./documentType";
export interface CapacitationExternal extends BaseModel {
    name: string;
    description: string;

    capacitation_id:number;
    document_type?:DocumentType;
    attendance:string;
    dni:number;
    position:string;
    gender:string;

    // document_type_id:number;
    // document_number:number;
    status:string;
    active:boolean;


}
