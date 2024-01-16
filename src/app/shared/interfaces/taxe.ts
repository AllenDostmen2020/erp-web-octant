import { BaseModel } from "./baseModel";

export interface Taxe extends BaseModel {
  name: TaxeName;
  description: string;
  value: number
}

export enum TaxeName {
  Igv = 'IGV',
  TipoDeCambio = 'TIPO DE CAMBIO',
  Renta = 'RENTA'
}