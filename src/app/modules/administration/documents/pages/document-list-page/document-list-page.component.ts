import { Component, TemplateRef, ViewChild, inject, signal } from '@angular/core';
import { ItemListTemplateComponent, ListItemExtended, viewItemActionButton } from '@component/item-list-template/item-list-template.component';
import { Document } from '@interface/document';
import { ItemListConfiguration, clickEventActionButton, textColumn } from '@component/item-list-template/item-list-template.component';
import { FetchService, RequestInitFetch } from '@service/fetch.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmDialogData, ConfirmDialogTemplateComponent } from '@component/confirm-dialog-template/confirm-dialog-template.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';

interface ExtDocument extends Document, ListItemExtended { }

@Component({
  selector: 'app-document-list-page',
  standalone: true,
  imports: [
    ItemListTemplateComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  templateUrl: './document-list-page.component.html',
  styleUrl: './document-list-page.component.scss'
})
export class DocumentListPageComponent {
  @ViewChild('anulateFormTemplate', { static: true }) anulateFormTemplate!: TemplateRef<any>;
  @ViewChild('emitFormTemplate', { static: true }) emitFormTemplate!: TemplateRef<any>;
  private fetch = inject(FetchService);
  private matDialog = inject(MatDialog);
  public commentCtrl = new FormControl('', [Validators.required]);
  public emitForm = new FormGroup({
    expire_date: new FormControl('', [Validators.required]),
    comment: new FormControl('', [Validators.required]),
  });

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
            if(response) updateChangesItemFn(index, { ...item, ...response });
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

  private confirmDialog(data: ConfirmDialogData): Promise<boolean> {
    return new Promise((resolve) => {
      const dialogRef = this.matDialog.open(ConfirmDialogTemplateComponent, { data });
      dialogRef.afterClosed().subscribe((result) => resolve(result));
    });
  }

  private async emitDocument(item: Document): Promise<Document | null> {
    this.commentCtrl.reset('');
    const dialogData = {
      title: '¿Está seguro de emitir el documento a Sunat?',
      description: 'Una vez emitido a Sunat no se puede revertir el proceso, pero puede anular la factura con otro proceso',
      templateRef: this.emitFormTemplate,
      confirmButton: { disabled: true },
    };
    const subscribe = this.emitForm.valueChanges.subscribe(() => dialogData.confirmButton!.disabled = this.emitForm.invalid);
    const confirm = await this.confirmDialog(dialogData);
    subscribe.unsubscribe();
    if(!confirm) return null;
    const url = `document/send-to-sunat/${item.id}`;
    const body = this.emitForm.value;
    const request: RequestInitFetch = {
      confirmDialog: false,
      toast: {
        loading: 'Enviando a Sunat...',
        success: 'Documento enviado a Sunat',
        error: (error) => error.error ?? 'Error al enviar a Sunat',
      }
    };
    return await this.fetch.put<Document>(url, body, request);
  }

  private async cancelDocument(item: Document): Promise<Document | null> {
    this.commentCtrl.reset('');
    const dialogData = {
      title: '¿Está seguro de anular el documento?',
      description: 'Una vez anulado no se puede revertir el proceso, pero puede emitir la factura con otro proceso',
      templateRef: this.anulateFormTemplate,
      confirmButton: { disabled: true },
    };
    const subscribe = this.commentCtrl.valueChanges.subscribe(() => dialogData.confirmButton!.disabled = this.commentCtrl.invalid);
    const confirm = await this.confirmDialog(dialogData);
    subscribe.unsubscribe();
    if(!confirm) return null;
    const url = `document/anulate-simple-to-sunat/${item.id}`;
    const body = { low_reason: this.commentCtrl.value };
    const request: RequestInitFetch = {
      confirmDialog: false,
      toast: {
        loading: 'Anulando documento...',
        success: 'Documento anulado',
        error: (error) => 'Error al anular documento',
      }
    };
    return await this.fetch.put<Document>(url, body, request);
  }

}
