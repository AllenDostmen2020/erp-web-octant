import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetterName',
  standalone: true,
})
export class FirstLetterNamePipe implements PipeTransform {

  transform(value: string = '', numberLetter: 1 | 2 = 2): unknown {
    let keysName = '';
    const array = value.split(' ');
    if(array.length > 1) {
      if (numberLetter > 0) keysName += array[0].substring(0, 1);
      if (numberLetter > 1) keysName += array[1].substring(0, 1);
    } else {
      if (numberLetter > 0) keysName += array[0].substring(0, 1);
      if (numberLetter > 1) keysName += array[0].substring(1, 2);
    }
    return keysName.toUpperCase();
  }

}
