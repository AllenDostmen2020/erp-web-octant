import { Component, signal } from '@angular/core';
import { ItemListConfiguration, ItemListTemplateComponent, itemCreatedAtColumn, itemUpdatedAtColumn, textColumn } from '@component/item-list-template/item-list-template.component';
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
          title: 'Nombre',
          displayValueFn: (item) => item.serie ? `${item.serie}-${item.correlative}` : '--',
        }),
        textColumn({
          title: 'Nombre',
          displayValueFn: (item) => item.serie ? `${item.serie}-${item.correlative}` : '--',
          gridColumn: '1fr',
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
