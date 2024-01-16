export interface DocumentType {
  id: number;
  name: DocumentTypeName;
  description:string;
  active: boolean;
}

export enum DocumentTypeName {
  Ruc = 'RUC',
  Dni = 'DNI',
  CE = 'CARNE DE EXTRANJERÍA',
  Otro = 'OTRO',
}
