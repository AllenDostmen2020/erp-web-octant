import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'renameTitleColumnList',
  standalone: true
})
export class RenameTitleColumnListPipe implements PipeTransform {

  transform(title:string): any {
    return title.replaceAll(/[\s\/\\°\-]+/g, '_').toLowerCase().trim();
  }

}
