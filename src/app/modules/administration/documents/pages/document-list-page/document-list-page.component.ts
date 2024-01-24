import { Component, EventEmitter, inject, signal } from '@angular/core';
import { ItemListTemplateComponent, ListItemExtended, routerLinkActionButton } from '@component/item-list-template/item-list-template.component';
import { Document } from '@interface/document';
import { ItemListConfiguration, clickEventActionButton, textColumn } from '@component/item-list-template/item-list-template.component';
import { FetchService } from '@service/fetch.service';

interface ExtDocument extends Document, ListItemExtended {}

@Component({
  selector: 'app-document-list-page',
  standalone: true,
  imports: [ItemListTemplateComponent],
  templateUrl: './document-list-page.component.html',
  styleUrl: './document-list-page.component.scss'
})
export class DocumentListPageComponent {
  private fetch = inject(FetchService);
  public configuration: ItemListConfiguration<ExtDocument> = {
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
            item.total = 2000;
          },
        })
      ],
      options: [
        routerLinkActionButton({
          icon: 'home',
          text: 'Ver',
          routerLink: {url: (item) => `../view/${item.id}`}
        }),
        clickEventActionButton({
          icon: 'delete',
          text: 'Eliminar',
          fn: async (item, index, { updateChangesItemFn }) => {
            // item.total = 2000;
            updateChangesItemFn(index, {...item, __loading_status__: true});
            await new Promise((resolve, reject) => {
              setTimeout(() => { resolve(true)}, 3000)
            })
            updateChangesItemFn(index, { ...item, __loading_status__: false });
          }
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
