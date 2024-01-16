import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generatePathUrl',
  standalone: true
})
export class GeneratePathUrlPipe implements PipeTransform {

  transform(prefix: string, valueConcat: string | undefined | null | boolean): string {
    const path = this.cleanPath(prefix);
    return valueConcat ? `${path}/${valueConcat}` : path;
  }

  private cleanPath(path: string) {
    return path.endsWith('/') ? path.slice(0, -1) : path;
  }

}
