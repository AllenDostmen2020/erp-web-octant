import { ConfirmDialogData } from "./confirmDialog";

export const NAME_TOKEN = 'access_token';

export enum FetchErrorType {
    HTTP = 'HttpErrorResponse',
    ABORT = 'AbortError',
    FAILED_FETCH = 'FailedFetch',
    UNKNOWN = 'UnknownError',

    CONFIRMATION_DIALOG = 'ConfirmationDialogAborted',
    TYPE_ERROR = 'TypeError',
}

export interface RequestInitFetch extends RequestInit {
    // example: {'Authorization': 'Bearer xyz........'}
    headers?: { [Key: string]: string };

    // ignore auth token
    ignoreAuthorization?: boolean;

    // ignore interception errors for actions globally
    ignoreInterceptErrors?: boolean;

    confirmDialog?: ConfirmDialogData;

}

export interface FetchErrorResponse {
    name?: FetchErrorType;
    message?: string;
    error?: any;
    ok?: boolean;
    status?: number;
    statusText?: string;
    url: string;
    headers?: Headers;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
}

export const defaultMessageDialogCreateItem = () => ({
    title: '¿Está seguro de guardar el registro?',
    description: 'Asegúrese de haber llenado todos los datos del formulario correctamente',
    icon: 'save',
});

export const defaultMessageDialogUpdateItem = () => ({
    title: '¿Está seguro de actualizar el registro?',
    description: 'Asegúrese de haber modificado los datos del formulario correctamente',
    icon: 'autorenew',
});

export const defaultMessageDialogDeleteItem = () => ({
    title: '¿Está seguro de eliminar el registro?',
    description: 'El ítem se eliminará por completo, está acción es única y no se puede revertir',
    icon: 'delete_forever',
});

export const HTTP_ERROR_CODES = [
    {
        status: 400,
        title: 'Solicitud Incorrecta',
        description: 'La solicitud que el servidor recibió no se puede entender o procesar.',
    },
    {
        status: 401,
        title: 'No Autorizado',
        description: 'El recurso solicitado requiere autenticación y no se ha proporcionado credenciales válidas.',
        icon: 'security',
    },
    {
        status: 403,
        title: 'Prohibido',
        description: 'No tiene permiso para acceder al recurso solicitado.',
        icon: 'security',
    },
    {
        status: 404,
        title: 'No Encontrado',
        description: 'El servidor no puede encontrar el recurso solicitado.',
        icon: 'dangerous',
    },
    {
        status: 405,
        title: 'Método No Permitido',
        description: 'El método utilizado en la solicitud no está permitido para el recurso solicitado.'
    },
    {
        status: 408,
        title: 'Tiempo de Espera Agotado',
        description: 'El servidor ha esperado demasiado tiempo para recibir la solicitud del cliente.',

    },
    {
        status: 422,
        title: 'Entidad No Procesable',
        description: 'La solicitud fue bien formada, pero no se pudo seguir debido a errores semánticos.'
    },
    {
        status: 500,
        title: 'Error Interno del Servidor',
        description: 'El servidor ha encontrado una situación inesperada que le impide completar la solicitud.'
    },
    {
        status: 501,
        title: 'No Implementado',
        description: 'El servidor no admite la funcionalidad necesaria para completar la solicitud.'
    },
    {
        status: 502,
        title: 'Puerta de Enlace Incorrecta',
        description: 'El servidor de la puerta de enlace ha recibido una respuesta no válida del servidor de origen.'
    },
    {
        status: 503,
        title: 'Servicio No Disponible',
        description: 'El servidor no puede responder a la solicitud en este momento debido a una sobrecarga o mantenimiento.'
    },
];