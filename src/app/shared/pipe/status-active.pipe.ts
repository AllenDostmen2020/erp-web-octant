import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'statusActive',
    standalone: true
})
export class StatusActivePipe implements PipeTransform {

  transform(item: any): 'Activo' | 'Inactivo' | '-' {
    return item?.active === false ? 'Inactivo' : item?.active === true ? 'Activo' : '-';
  }

}
