import { Component, signal } from '@angular/core';
import { ItemListConfiguration, ItemListTemplateComponent, dateColumn, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, numberColumn, textColumn } from '@component/item-list-template/item-list-template.component';
import { Document } from '@interface/document';

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
          displayValueFn: (item) => item.serie ? `${item.serie}-${item.correlative}` : '...',
          displayAdditionalValueFn: (item) => item.document_items?.map((item) => item.description).join(', '),
          gridColumn: '1fr',
        }),
        numberColumn({
          title: 'Total',
          displayValueFn: (item) => item.total,
        }),
        dateColumn({
          title: 'Emitido',
          displayValueFn: (item) => item.issue_date,
        }),
        textColumn({
          title: 'Estado SUNAT',
          displayValueFn: (item) => item.state_type_id ?? '--',
        }),
        itemCreatedAtColumn(),
        itemStatusColumn(),
      ])
    }
}
