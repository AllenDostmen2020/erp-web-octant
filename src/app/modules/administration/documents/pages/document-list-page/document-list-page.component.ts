import { Component, signal } from '@angular/core';
import { ItemListTemplateComponent } from '@component/item-list-template/item-list-template.component';
import { Document } from '@interface/document';
import { ItemListConfiguration, clickEventActionButton, textColumn } from '@component/item-list-template/item-list-template.component';

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
    server: {
      url: 'document',
      queryParams: { relations: 'client' },
    },
    rows: {
      actions: [
        clickEventActionButton({
          text: 'Emitir',
          fn: async (item, index, { updateChangesItemFn }) => {
            updateChangesItemFn(index, { ...item, total: Math.random() });
          },
        })
      ]
    },
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
