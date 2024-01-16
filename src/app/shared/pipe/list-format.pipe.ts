import { Pipe, PipeTransform } from '@angular/core';
interface ListFormatOptions {
  lang?: string;
  type?: 'conjunction' | 'disjunction' | 'unit';
  style?: 'long' | 'short' | 'narrow';
}

@Pipe({
  name: 'listFormat',
  standalone: true
})
export class ListFormatPipe implements PipeTransform {

  transform(values: string[], options?:ListFormatOptions): string {
    if(!(values instanceof Array)) return '';
    else if (values.length && (values[0] as any) instanceof Object) return '';
    const { lang = 'es-ES', type = 'conjunction', style = 'long' } = options ?? {};
    return (new Intl.ListFormat(lang, { style, type}).format(values)) ?? '';
  }

}
