import { BaseModel } from "./baseModel";
import { DocumentType } from "./documentType";
import { UserType } from "./userType";

export interface User extends BaseModel {
  id:number;
  document_number: string;
  name: string;
  email: string;
  role: UserRoleEnum;
  code: string;
  address: string;
  phone: string;
  cellphone: string;
  image?: string
  email_verified_at?: string;

  level: UserlevelEnum;

  user_type: UserType;
  document_type: DocumentType;

}

export interface DataRUC {
    document_type_id:number;
    direccion: string;
    direccion_completa: string;
    ruc: string;
    nombre_o_razon_social: string;
    estado: string;
    condicion: string;
    departamento: string;
    provincia: string;
    distrito: string;
    ubigeo_sunat: string;
    ubigeo: [string, string, string],
    es_agente_de_retencion: 'SI' | 'NO',
    representantes_legales: RepresentanteLegal[]

}

export enum UserRoleEnum {
    PM = 'pm',
    KAM = 'kam',
    MASTER = 'master',
    COMPRAS = 'compras',
    ALMACEN = 'almacén',
    TESORERÍA = 'tesorería',
    CONTABILIDAD = 'contabilidad',
    ADMINISTRACIÓN = 'administración',
    GESTIÓN = 'gestión',
}

export enum UserlevelEnum {
    Master = 1,
    Full = 2,
    Standar = 3,
    Basic = 4,
}

export interface RepresentanteLegal {
  tipodoc: string;
  numdoc: string;
  nombre: string;
  cargo: string;
  desde: string;
}


export interface DataDNI {
    dni: string;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    codVerifica: string;
    document_type_id:number;

}

export interface UserToken {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    last_used_at: string;
  }
