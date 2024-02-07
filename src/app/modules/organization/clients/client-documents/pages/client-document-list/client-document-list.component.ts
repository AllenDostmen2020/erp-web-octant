import { Component, signal } from '@angular/core';
import { ItemListConfiguration, ItemListTemplateComponent, dateColumn, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, numberColumn, textColumn } from '@component/item-list-template/item-list-template.component';
import { Document } from '@interface/document';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-client-document-list',
  standalone: true,
  imports: [ItemListTemplateComponent],
  templateUrl: './client-document-list.component.html',
  styleUrl: './client-document-list.component.scss'
})
export class ClientDocumentListComponent {
  
  public listConfiguration: ItemListConfiguration<Document> = {
      title: 'Documentos',
      server: {
        url: 'document',
        queryParams: { relations: 'documentItems' },
      },
      columns: signal([
        textColumn({
          title: 'Código/Descripción',
          displayValueFn: (item) => item.serie ? `${item.serie}-${item.correlative}` : '--',
          displayAdditionalValueFn: (item) => item.document_items?.map((item) => item.description).join(', '),
        }),
        textColumn({
          title: 'Emitido',
          displayValueFn: (item) => item.issue_date ?  format(parseISO(item.issue_date), 'dd/MM/yyyy') : '--',
        }),
        numberColumn({
          title: 'Sub total',
          displayValueFn: (item) => item.total_value,
        }),
        numberColumn({
          title: 'Igv',
          displayValueFn: (item) => item.total_taxes,
        }),
        numberColumn({
          title: 'Total',
          displayValueFn: (item) => item.total,
        }),
        itemCreatedAtColumn(),
        itemStatusColumn(),
      ])
    }
}
