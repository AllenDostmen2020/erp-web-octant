import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'pathFilesServer',
  standalone: true
})
export class PathFilesServerPipe implements PipeTransform {

  transform(value: unknown): string {
    if(value) {
      return environment.URL_FILES_SERVER + value;
    } else {
      return 'assets/images/no-image.webp';
    }
  }

}
