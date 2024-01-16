import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'executeFunction',
  standalone: true
})
export class ExecuteFunctionPipe implements PipeTransform {

  transform(value: Function, parameter: any): any {
    return value(parameter);
  }

}
