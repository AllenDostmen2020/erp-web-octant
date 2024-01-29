import { Component, EventEmitter, inject, signal } from '@angular/core';
import { ItemListTemplateComponent, ListItemExtended, routerLinkActionButton, viewItemActionButton } from '@component/item-list-template/item-list-template.component';
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
            const response = await this.fetch.put<Document>(`document/send-to-sunat/${item.id}`, {}, { 
              confirmDialog: { 
                title: '¿Está seguro de emitir el documento a Sunat?',
                description: 'Una vez emitido a Sunat no se puede revertir el proceso, pero puede anular la factura con otro proceso'
              },
              toast: {
                loading: 'Enviando a Sunat...',
                success: 'Documento enviado a Sunat',
                error: (error) => error.error ?? 'Error al enviar a Sunat',
              }
            });
            updateChangesItemFn(index, {...item, ...response});
          },
        })
      ],
      options: [
        viewItemActionButton(),
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
