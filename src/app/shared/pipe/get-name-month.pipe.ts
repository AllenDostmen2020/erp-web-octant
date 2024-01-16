import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getNameMonth',
  standalone: true
})
export class GetNameMonthPipe implements PipeTransform {

  transform(month: number | string): string {
    return month == 1 ? 'Enero' : month == 2 ? 'Febrero' : month == 3 ? 'Marzo' : month == 4 ? 'Abril' : month == 5 ? 'Mayo' : month == 6 ? 'Junio' : month == 7 ? 'Julio' : month == 8 ? 'Agosto' : month == 9 ? 'Septiembre' : month == 10 ? 'Octubre' : month == 11 ? 'Noviembre' : month == 12 ? 'Diciembre' : 'xx';;
  }

}
