import { MatSnackBarRef } from "@angular/material/snack-bar";

export interface ToastDataSimple {
  title?: string;
  icon?: string;
  message: string;
  duration?: number;
  data?: any;
  autoCloseFn?: (data: any) => void;
  action?: {
    text: string;
    fn: (data: any) => void;
  }
}

export interface ToastStatusPromise {
  message: string;
  icon: string;
}

export interface ToastDataPromise {
    promise: Promise<any>;
    loading: string | ToastStatusPromise;
    success: string | ToastStatusPromise | ((data: any, snackbarRef: MatSnackBarRef<any>, currentMessage: string) => Promise<string> | string);
    error: string | ToastStatusPromise | ((error: any, snackbarRef: MatSnackBarRef<any>, currentMessage: string) => Promise<string> | string);
}
