import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'executeFunction',
  standalone: true
})
export class ExecuteFunctionPipe implements PipeTransform {

  transform(fn: Function, parameter: any): any {
    return fn(parameter);
  }

}
