import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetterUppercase',
  standalone: true
})
export class FirstLetterUppercasePipe implements PipeTransform {

  transform(value: string | null): string | null {
    if(value) return value.charAt(0).toUpperCase() + value.slice(1);
    return value;
  }

}
