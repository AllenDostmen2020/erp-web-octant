import { Pipe, PipeTransform } from '@angular/core';
import { parseISO } from 'date-fns';

@Pipe({
  name: 'parseDate',
  standalone: true
})
export class ParseDatePipe implements PipeTransform {

  transform(value: string | null): Date | null {
    if(!value) return null;
    return parseISO(value);
  }

}
