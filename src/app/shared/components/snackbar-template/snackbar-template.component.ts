import { CommonModule } from '@angular/common';
import { Component, WritableSignal, inject, signal } from '@angular/core';
import { MatSnackBarModule, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { ToastDataPromise, ToastDataSimple } from '@interface/toast';

interface DataSnackbar {
  simple?: ToastDataSimple;
  promise?: ToastDataPromise;
}

@Component({
  selector: 'app-snackbar-template',
  templateUrl: './snackbar-template.component.html',
  styleUrls: ['./snackbar-template.component.scss'],
  standalone: true,
  imports: [CommonModule, MatSnackBarModule]
})
export class SnackbarTemplateComponent {
  public snackBarRef = inject(MatSnackBarRef);
  public dialogData: DataSnackbar = inject(MAT_SNACK_BAR_DATA);

  public message: WritableSignal<string> = signal('');
  public icon: WritableSignal<string|null> = signal(null);
  public loading: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    if(this.dialogData.simple) {
      this.message.set(this.dialogData.simple.message);
      this.icon.set(this.dialogData.simple.icon ?? null);
    } else if(this.dialogData.promise) {
      this.executePromise(this.dialogData.promise)
    }
  }

  private async executePromise(configuration: ToastDataPromise) {
    const {promise, success, loading} = configuration;
    this.message.set(loading instanceof Object ? loading.message : loading);
    this.icon.set(loading instanceof Object ? loading.icon : 'rotate_right');
    try {
      this.loading.set(true);
      const data = await promise;

      let message = 'Completado';
      let icon = 'done';

      if(success instanceof Function) {
        message = await success(data, this.snackBarRef, this.message());
      } else if (success instanceof Object) {
        message = success.message;
        icon = success.icon;
      } else {
        message = success;
      }

      this.message.set(message);
      this.icon.set(icon);

      this.loading.set(false);

      setTimeout(() => this.snackBarRef.dismiss(), 10000);

    } catch(exception) {

      const { error } = configuration;
      let message = 'Completado';
      let icon = 'error';

      if(error instanceof Function) {
        message = await error(exception, this.snackBarRef, this.message());
      } else if (error instanceof Object) {
        message = error.message;
        icon = error.icon;
      } else {
        message = error;
      }

      this.message.set(message);
      this.icon.set(icon);

      this.loading.set(false);

      setTimeout(() => this.snackBarRef.dismiss(), 10000);
    }
  }
}
