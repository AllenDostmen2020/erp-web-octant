import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundTwoDecimal',
  standalone: true,
})
export class RoundTwoDecimalPipe implements PipeTransform {

  transform(value: number, args?: any): number {
    return Number(value.toFixed(2));
  }

}
