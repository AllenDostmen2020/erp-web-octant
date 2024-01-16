import { NativeDateAdapter } from "@angular/material/core";
import { DateFnsAdapter } from "@angular/material-date-fns-adapter";


export class MyDateAdapter extends NativeDateAdapter {
  constructor(private abc: DateFnsAdapter) {
    super('es-PE');
  }

  override format(date: Date, displayFormat: string | Intl.DateTimeFormatOptions): string {
    if (displayFormat instanceof Object) {
      return new Intl.DateTimeFormat('es-ES', displayFormat).format(date)
    } else {
      return date.toISOString();
    }
  }

  override parse(value: any, parseFormat?: any): Date | null {
    return this.abc.parse(value, parseFormat);
  }
}