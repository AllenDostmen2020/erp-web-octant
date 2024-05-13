import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'renameTitleColumnList',
  standalone: true
})
export class RenameTitleColumnListPipe implements PipeTransform {

  transform(title:any): any {
    return title.trim().toLowerCase().replaceAll(/[^a-z]+/g, '_') ?? '__';
  }

}
