import { Pipe, PipeTransform } from '@angular/core';
import { parseISO, intlFormatDistance } from 'date-fns';
@Pipe({
  name: 'diffDate',
  standalone: true,
})
export class DiffDatePipe implements PipeTransform {
  transform(value: string, referenceDate: Date = new Date()): any {
    const date = parseISO(value);
    return intlFormatDistance(date, referenceDate);
  }
}
