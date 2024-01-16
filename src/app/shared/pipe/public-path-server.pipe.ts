import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
    name: 'publicPathServer',
    standalone: true
})
export class PublicPathServerPipe implements PipeTransform {

  transform(value: string): string {
    if(value.startsWith('/')) return environment.API_URL + value;
    else return environment.API_URL + '/' + value;
  }

}
