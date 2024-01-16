import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'getDocumentType',
    standalone: true
})
export class GetDocumentTypePipe implements PipeTransform {

  transform(document_number: string, args?: any): string {
    if(document_number.length == 8){
      return 'DNI'
    } else if(document_number.length == 11){
      return 'RUC'
    } else {
      return 'Número de documento'
    }
  }

}
