import { User, UserRoleEnum } from "./user";

export interface BaseModel {
  id: number;

  status_update_date: string;
  status_update_comment: string;
  delete_comment: string;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  create_user_id: number | null;
  update_user_id: number | null;
  delete_user_id: number | null;
  restore_user_id: number | null;

  update_user?: User;
  create_user?: User;
  delete_user?: User;
  restore_user?: User;

  status: StatusModel;
}

export enum DocumentTypeEnum {
  DNI = 'dni',
  RUC = 'ruc',
  CARNET_EXTRANJERIA = 'carnet de extranjeria',
  PASAPORTE = 'pasaporte',
  OTRO = 'otro',
}
export enum CoinEnum {
  SOLES = 'soles',
  DOLARES = 'dólares',
}

export const DOCUMENT_TYPES = Object.values(DocumentTypeEnum);
export const USER_ROLES = Object.values(UserRoleEnum);
export const COIN = Object.values(CoinEnum);

export enum StatusModel {
  Activo = 'activo',
  Inactivo = 'inactivo',
  Pediente = 'pendiente',
  Aprobado = 'aprobado',
  Enviado = 'enviado',
  Entregado = 'entregado',
  Recibido = 'recibido',
  Pagado = 'pagado',
  Facturado = 'facturado',
  Vigente = 'vigente',
  Habilitado = 'habilitado',
  Deshabilitado = 'deshabilitado',

  Anulado = 'anulado',
  Rechazado = 'rechazado',
  Expirado = 'expirado',
  Finalizado = 'finalizado',
  Abierto = 'abierto',
  Cerrado = 'cerrado',
  Revisado = 'revisado',
  Eliminado = 'eliminado',

  PendientePago = 'pendiente de pago',
  PendienteFacturación = 'pendiente de facturación',
  PendienteEntrega = 'pendiente de entrega',
  PendienteRevision = 'pendiente de revisión',
  PendienteAprobacion = 'pendiente de aprobación',
  PendienteEnvio = 'pendiente de envío',
  PendienteRecibo = 'pendiente de recibo',
  PendienteCierre = 'pendiente de cierre',
  PendienteFinalizacion = 'pendiente de finalización',
  PendienteAnulación = 'pendiente de anulación',
  PendienteRechazo = 'pendiente de rechazo',

  PendienteInstalacion = 'pendiente de instalación',

  Generada= 'generada',
  PendienteAceptar= 'pendiente de aceptar',
  Aceptada= 'aceptada',
  Observada= 'observada',
  Rechazada= 'rechazada',
  Pagada = 'pagada',
  Anulada= 'anulada',
  PendienteAnular= 'pendiente de anular',
  Aplicada= 'aplicada',
  Emitida= 'emitida',
  PorEmitir= 'por emitir',

  Activa= 'activa',
  Inactiva= 'inactiva',
}

