import { Injectable, inject } from '@angular/core';
import { FetchErrorResponse, FetchErrorType, HTTP_ERROR_CODES, NAME_TOKEN, RequestInitFetch as RequestInit, defaultMessageDialogCreateItem, defaultMessageDialogDeleteItem, defaultMessageDialogUpdateItem } from 'src/app/shared/interfaces/fetch';
import { FetchBase } from '@utility/fetchBase';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from './toast.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastDataPromise } from '@interface/toast';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { ConfirmDialogData, ConfirmDialogTemplateComponent } from '@component/confirm-dialog-template/confirm-dialog-template.component';
import { environment } from 'src/environments/environment';

export interface ToastForFetch extends Omit<ToastDataPromise, 'promise' | 'success' | 'error'> {
  success: string | ((data: any, snackbarRef: MatSnackBarRef<any>, currentMessage: string) => Promise<string> | string);
  error: string | ((error: any, snackbarRef: MatSnackBarRef<any>, currentMessage: string) => Promise<string> | string);
}

export interface RequestInitFetch extends Omit<RequestInit, 'confirmDialog'> {
  confirmDialog?: ConfirmDialogData | false;
  toast?: ToastForFetch | false;
}


@Injectable({
  providedIn: 'root',
})
export class FetchService extends FetchBase {
  private dialog = inject(MatDialog);
  private toastService = inject(ToastService);
  private router = inject(Router);
  private authService = inject(AuthService);

  private apiUrl: string = environment.API_URL;

  constructor() {
    super(
      {
        interceptHeadersFn: (request) => this.interceptHeadersFn(request),
        interceptErrorsFn: (error, request) => this.interceptErrorsFn(error, request),
      }
    )
  }

  /* -------------------------------------------------------------------------------------- */
  /* -----------------------------------    INTERCEPTORS   -------------------------------- */
  /* -------------------------------------------------------------------------------------- */
  private interceptHeadersFn(requestInit: RequestInitFetch): { [Key: string]: string } {
    const headers = requestInit?.headers || {};
    const token = localStorage.getItem(NAME_TOKEN);
    if (token && !requestInit?.ignoreAuthorization) headers['Authorization'] = `Bearer ${token}`;
    return headers;
  }

  private async interceptErrorsFn(error: FetchErrorResponse, request: RequestInitFetch): Promise<void> {    
    if (request.ignoreInterceptErrors) return; // if ignore intercept errors

    const errorName = error.name;

    if (errorName == FetchErrorType.ABORT) return;

    if (errorName == FetchErrorType.HTTP && error.status == 401 && error.statusText?.includes('Unauthorized')) {
      this.toastService.open('Su sesión ha expirado');
      this.authService.removeToken();
      this.router.navigate(['/login']);
      return;
    }

    this.toastService.open(this.getNameError(error) ?? 'Error desconocido');
  }

  private getNameError(error: FetchErrorResponse): string | undefined {
    const errorHttp = HTTP_ERROR_CODES.find((httpError) => httpError.status == error.status);
    return errorHttp?.description;
  }

  /* -------------------------------------------------------------------------------------- */
  /* ------------------------------------   METHODS    ------------------------------------ */
  /* -------------------------------------------------------------------------------------- */

  public async get<T>(url: string, requestInit?: RequestInitFetch, baseUrl: string = this.apiUrl): Promise<T> {
    const { toast, confirmDialog, ...request} = { ...requestInit ?? {} };

    if (confirmDialog) await this.confirmDialog(confirmDialog);

    if (toast) {
      request.ignoreInterceptErrors = true;
      const promise = this._get(`${baseUrl}/${url}`, request);
      return this.resolveToastPromise<T>(promise, toast);
    }

    return this._get(`${baseUrl}/${url}`, request);
  }

  public async post<T>(url: string, body: any, requestInit?: RequestInitFetch, baseUrl: string = this.apiUrl): Promise<T> {
    const { toast, confirmDialog, ...request} = { ...requestInit ?? {} };

    if (confirmDialog != false) await this.confirmDialog(confirmDialog ?? defaultMessageDialogCreateItem());

    if (toast != false) {
      request.ignoreInterceptErrors = true;
      const promise = this._post(`${baseUrl}/${url}`, body, request);
      const toastDataPromise = toast ? toast : {
        loading: 'Guardando registro...',
        success: 'Registro guardado',
        error: (error: any) => `Error al guardar registro: ${error.error?.message ?? 'Error desconocido'}`,
      };
      return this.resolveToastPromise<T>(promise, toastDataPromise, requestInit);
    }

    return this._post(`${baseUrl}/${url}`, body, request);
  }

  public async put<T>(url: string, body: any, requestInit?: RequestInitFetch, baseUrl: string = this.apiUrl): Promise<T> {
    const { toast, confirmDialog, ...request} = { ...requestInit ?? {} };

    if (confirmDialog != false) await this.confirmDialog(confirmDialog ?? defaultMessageDialogUpdateItem());

    if (toast != false) {
      request.ignoreInterceptErrors = true;
      const promise = this._put(`${baseUrl}/${url}`, body, request);
      const toastDataPromise = toast ? toast : {
        loading: 'Actualizando registro...',
        success: 'Registro actualizado',
        error: (error: any) => `Error al actualizar registro: ${error.error?.message ?? 'Error desconocido'}`,
      };
      return this.resolveToastPromise<T>(promise, toastDataPromise, requestInit);
    }

    return this._put(`${baseUrl}/${url}`, body, request);
  }

  public async patch<T>(url: string, body: any, requestInit?: RequestInitFetch, baseUrl: string = this.apiUrl): Promise<T> {
    const { toast, confirmDialog, ...request} = { ...requestInit ?? {} };

    if (confirmDialog != false) await this.confirmDialog(confirmDialog ?? defaultMessageDialogUpdateItem());
    
    if (toast != false) {
      request.ignoreInterceptErrors = true;
      const promise = this._patch(`${baseUrl}/${url}`, body, request);
      const toastDataPromise = toast ? toast : {
        loading: 'Actualizando registro...',
        success: 'Registro actualizado',
        error: 'Error al actualizar registro',
      };
      return this.resolveToastPromise<T>(promise, toastDataPromise, requestInit);
    }

    return this._patch(`${baseUrl}/${url}`, body, request);
  }

  public async delete<T>(url: string, requestInit?: RequestInitFetch, baseUrl: string = this.apiUrl): Promise<T> {
    const { toast, confirmDialog, ...request} = { ...requestInit ?? {} };

    if (confirmDialog != false) await this.confirmDialog(confirmDialog ?? defaultMessageDialogDeleteItem());

    if (toast != false) {
      request.ignoreInterceptErrors = true;
      const promise = this._delete(`${baseUrl}/${url}`, request);
      const toastDataPromise = toast ? toast : {
        loading: 'Eliminando registro...',
        success: 'Registro eliminado',
        error: 'Error al eliminar registro',
      };
      return this.resolveToastPromise<T>(promise, toastDataPromise, requestInit);
    }

    return this._delete(`${baseUrl}/${url}`, request);
  }

  public async blob(url: string, requestInit?: RequestInitFetch, baseUrl: string = this.apiUrl): Promise<Blob> {
    const { toast, confirmDialog, ...request} = { ...requestInit ?? {} };

    if (confirmDialog) await this.confirmDialog(confirmDialog);

    if (toast) {
      request.ignoreInterceptErrors = true;
      const promise = this._blob<Blob>(`${baseUrl}/${url}`, request);
      return this.resolveToastPromise<Blob>(promise, toast, requestInit);
    }

    return this._blob<Blob>(`${baseUrl}/${url}`, request);
  }

  /* -------------------------------------------------------------------------------------- */
  /* ------------------------------------   ACTIONS   ------------------------------------- */
  /* -------------------------------------------------------------------------------------- */
  private confirmDialog(data: ConfirmDialogData): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.dialog
        .open(ConfirmDialogTemplateComponent, { data })
        .afterClosed()
        .subscribe((res: boolean) => {
          if (res) resolve(true);
          reject({ name: FetchErrorType.CONFIRMATION_DIALOG, message: 'Abort confirmation dialog' });
        });
    });
  }

  private resolveToastPromise<T>(promise: Promise<T>, toastDataPromise: ToastForFetch, requestInit?: RequestInitFetch): Promise<T> {
    return new Promise(async (resolve, reject) => {
      this.toastService.promise(promise, {
        loading: toastDataPromise.loading ?? 'Cargando...',
        success: async (data, snackBarRef, currentMessage) => {
          resolve(data);
          return toastDataPromise.success instanceof Function ? await toastDataPromise.success(data, snackBarRef, currentMessage) : toastDataPromise.success;
        },

        error: (error: FetchErrorResponse, snackBarRef, currentMessage) => {
          if (error.name == FetchErrorType.ABORT) {
            snackBarRef.dismiss();
            reject(error);
            return currentMessage;
          } else if (error.name == FetchErrorType.HTTP && error.status == 401 && error.statusText?.includes('Unauthorized') && !requestInit?.ignoreAuthorization) {
            this.authService.removeToken();
            this.router.navigate(['/login']);
            return 'Su sesión ha expirado, vuelva a iniciar';
          }
          reject(error);
          return toastDataPromise.error instanceof Function ? toastDataPromise.error(error, snackBarRef, currentMessage) : toastDataPromise.error;
        },
      });
    });
  }

}
