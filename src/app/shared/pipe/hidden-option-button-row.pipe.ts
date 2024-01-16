import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hiddenOptionButtonRow',
  standalone: true
})
export class HiddenOptionButtonRowPipe implements PipeTransform {

  transform(idOption: string | number, idsHidden: unknown[]): boolean {
    if(!idOption || !idsHidden || !(idsHidden instanceof Array) || !idsHidden.length) return false;
    return idsHidden.includes(idOption);
  }

}
