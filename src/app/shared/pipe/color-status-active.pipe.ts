import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'colorStatusActive',
    standalone: true
})
export class ColorStatusActivePipe implements PipeTransform {

  transform({ active }: any, prefix: string = ''): any {
    const color = active === true ? 'success' : active === false ? 'warning' : 'default';
    return prefix + color;
  }

}
