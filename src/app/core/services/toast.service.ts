import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ToastDataPromise, ToastDataSimple } from '@interface/toast';
import { SnackbarTemplateComponent } from 'src/app/shared/components/snackbar-template/snackbar-template.component';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  private snackBar = inject(MatSnackBar);
  private readonly horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  private readonly verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  public open(message: string, data?: Omit<ToastDataSimple, 'message'>) {
    const snackbar = this.snackBar.openFromComponent(SnackbarTemplateComponent, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: (data?.duration ?? 10) * 1000,
      data: { simple: { ...data, message } },
    });

    if (data?.action) snackbar.onAction().subscribe(() => data.action?.fn(data.data ?? null));

    if (data?.autoCloseFn) snackbar.afterDismissed().subscribe(() => data.autoCloseFn?.(data.data ?? null));

  }

  public promise<T = any>(promise: Promise<T>, configuration?: Partial<Omit<ToastDataPromise, 'promise'>>): void {
    const data: ToastDataPromise = {
      promise,
      loading: configuration?.loading ?? 'Cargando...',
      success: configuration?.success ?? 'Completado',
      error: configuration?.error ?? 'Error al realizar la operación',
    }

    this.snackBar.openFromComponent(SnackbarTemplateComponent, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 60 * 1000,
      data: { promise: data }
    });
  }

}
