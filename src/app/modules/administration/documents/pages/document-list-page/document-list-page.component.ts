import { Component, signal } from '@angular/core';
import { ItemListTemplateComponent } from '@component/item-list-template/item-list-template.component';
import { Document } from '@interface/document';
import { ItemListConfiguration, clickEventActionButton, textColumn } from '@interface/itemList';

@Component({
  selector: 'app-document-list-page',
  standalone: true,
  imports: [ItemListTemplateComponent],
  templateUrl: './document-list-page.component.html',
  styleUrl: './document-list-page.component.scss'
})
export class DocumentListPageComponent {
  public configuration: ItemListConfiguration<Document> = {
    title: 'Documentos',
    serverUrl: 'document',
    queryParams: { relations: 'client' },
    itemActions: [
      clickEventActionButton({
        text: 'Emitir',
        clickEvent: (item) => {
          console.log(item)
        },
      })
    ],
    columns: signal([
      textColumn({
        title: 'Código',
        displayValueFn: (item) => item.serie ? `${item.serie}-${item.correlative}` : '--',
      }),
      textColumn({
        title: 'Cliente',
        displayValueFn: (item) => item.client?.name,
        gridColumn: '1fr',
      }),
      textColumn({
        title: 'Total',
        displayValueFn: (item) => item.total,
      }),
    ])
  }
}
