import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getMixedValue',
  standalone: true
})
export class GetMixedValuePipe implements PipeTransform {

  transform(value: any, parameter: any): any {
    if(typeof value === 'function') {
      return value(parameter);
    } else {
      return value;
    }
  }

}
