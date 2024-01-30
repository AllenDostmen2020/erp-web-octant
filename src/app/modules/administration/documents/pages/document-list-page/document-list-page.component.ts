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
        clickEventActionButton({
          text: 'Anular',
          icon: 'scan_delete',
          fn: async (item, index, { updateChangesItemFn }) => {
            const response = await this.fetch.put<Document>(`document/anulate-simple-to-sunat/${item.id}`, {}, {
              confirmDialog: {
                title: '¿Está seguro de anular el documento?',
                description: 'Una vez anulado no se puede revertir el proceso, pero puede emitir la factura con otro proceso'
              },
              toast: {
                loading: 'Anulando documento...',
                success: 'Documento anulado',
                error: (error) => error.error ?? 'Error al anular documento',
              }
            });
            updateChangesItemFn(index, {...item, ...response});
          },
        }),
        clickEventActionButton({
          text: 'Anular con nota de crédito',
          icon: 'scan_delete',
          fn: (item) => console.log('Anular con nota de crédito'),
        }),
        clickEventActionButton({
          text: 'Anular con nota de débito',
          icon: 'scan_delete',
          fn: (item) => console.log('Anular con nota de débito'),
        }),
        clickEventActionButton({
          text: 'Descargar PDF',
          icon: 'cloud_download',
          fn: (item) => console.log('Descargar PDF'),
        }),
        clickEventActionButton({
          text: 'Descargar XML',
          icon: 'cloud_download',
          fn: (item) => console.log('Descargar XML'),
        }),
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
      textColumn({
        title: 'Estado SUNAT',
        displayValueFn: (item) => item.state_type_id ?? '--',
      }),
    ])
  }
}
