import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'executeFunctionList',
  standalone: true
})
export class ExecuteFunctionListPipe implements PipeTransform {

  transform(data: any, [item, index]: [item: any, index: number]): any {
    if(data instanceof Function) return data(item, index);
    return data;
  }

}
