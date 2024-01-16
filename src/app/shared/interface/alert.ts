import { SafeHtml } from '@angular/platform-browser';
import { QueryParamsHandling } from '@angular/router';

export declare type typeAlert = 'success' | 'info' | 'error' | 'warning' | 'notification';

export interface AlertModal {
  id: number;
  key?: string;
  title?: string;
  description: string | SafeHtml;
  link?: string;
  queryParams?: any;
  duration?: number;
  icon: string;
  type?: typeAlert;
  date?: Date;
  deleting?: boolean;
}
