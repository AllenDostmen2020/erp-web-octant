import { Component, signal } from '@angular/core';
import { ItemListConfiguration, ItemListTemplateComponent, dateColumn, itemCreatedAtColumn, itemUpdatedAtColumn, textColumn } from '@component/item-list-template/item-list-template.component';
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
        url: 'document'
      },
      columns: signal([
        textColumn({
          title: 'Serie/Correlativo',
          displayValueFn: (item) => item.serie ? `${item.serie}-${item.correlative}` : '--',
          gridColumn: '1fr',
        }),
        dateColumn({
          title: 'Fecha de emisión',
          displayValueFn: (item) => item.issue_date ? new Date(item.issue_date).toLocaleDateString() : '--',
        }),
        itemCreatedAtColumn(),
        itemUpdatedAtColumn(),
        textColumn({
          title: 'Estado',
          displayValueFn: (item) => item.status,
        })
      ])
    }
}
