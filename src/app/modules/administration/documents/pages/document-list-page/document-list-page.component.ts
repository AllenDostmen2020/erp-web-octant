import { Component, TemplateRef, ViewChild, inject, signal } from '@angular/core';
import { ItemListTemplateComponent, ListItemExtended, viewItemActionButton } from '@component/item-list-template/item-list-template.component';
import { Document } from '@interface/document';
import { ItemListConfiguration, clickEventActionButton, textColumn } from '@component/item-list-template/item-list-template.component';
import { FetchService, RequestInitFetch } from '@service/fetch.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmDialogData } from '@component/confirm-dialog-template/confirm-dialog-template.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface ExtDocument extends Document, ListItemExtended { }

@Component({
  selector: 'app-document-list-page',
  standalone: true,
  imports: [
    ItemListTemplateComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
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
            updateChangesItemFn(index, { ...item, ... await this.emitDocument(item) });
          },
        })
      ],
      options: [
        viewItemActionButton(),
        clickEventActionButton({
          text: 'Anular',
          icon: 'scan_delete',
          fn: async (item, index, { updateChangesItemFn }) => {
            const response = await this.cancelDocument(item);
            updateChangesItemFn(index, { ...item, ...response });
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
    ]),
  }

  @ViewChild('formComment', { static: true }) formComment!: TemplateRef<any>;
  public commentCtrl = new FormControl('', [Validators.required]);
  private confirmDialogData: ConfirmDialogData = {
    title: '¿Está seguro de anular el documento?',
    description: 'Una vez anulado no se puede revertir el proceso, pero puede emitir la factura con otro proceso',
    confirmButton: {
      disabled: this.commentCtrl.invalid,
    }
  }
  private body = { low_reason: '' };

  ngOnInit() {
    this.commentCtrl.valueChanges.subscribe((value) => {
      if (value) this.body.low_reason = value;
      this.confirmDialogData.confirmButton!.disabled = this.commentCtrl.invalid;
    });
  }


  private async emitDocument(item: Document): Promise<Document> {
    return await this.fetch.put<Document>(`document/send-to-sunat/${item.id}`, {}, {
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
  }

  private async cancelDocument(item: Document): Promise<Document> {
    this.commentCtrl.reset('', { emitEvent: false });
    this.body.low_reason = '';
    this.confirmDialogData.templateRef = this.formComment;
    const url = `document/anulate-simple-to-sunat/${item.id}`;
    const request: RequestInitFetch = {
      confirmDialog: this.confirmDialogData,
      toast: {
        loading: 'Anulando documento...',
        success: 'Documento anulado',
        error: (error) => 'Error al anular documento',
      }
    };
    return await this.fetch.put<Document>(url, this.body, request);
  }
}
