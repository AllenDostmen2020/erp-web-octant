import { User } from "./user";

export interface BaseModel {
    id?: any;
    active?: boolean;
    status?: StatusModel;

    update_user?: User;
    update_user_id?: number;
    create_user?: User;
    create_user_id?: number;
    created_at?: string;
    updated_at?: string;
}

export declare type DocumentTypeItem = 'DNI' | 'RUC' | 'CE' | 'OTRO';

export enum StatusModel {
    Activo = 'activo',
    Inactivo = 'inactivo',
    Pendiente = 'pendiente',
    Aprobado = 'aprobado',
    Enviado = 'enviado',
    Entregado = 'entregado',
    Recibido = 'recibido',
    Pagado = 'pagado',
    Facturado = 'facturado',
    Vigente = 'vigente',

    Editando = 'editando',

    Anulado = 'anulado',
    Rechazado = 'rechazado',
    Expirado = 'expirado',
    Finalizado = 'finalizado',
    Cerrado = 'cerrado',
    Revisado = 'revisado',
    Abierto = 'abierto',
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

}


export enum CoinEnum {
    Soles = 'soles',
    Dolares = 'dólares',
}