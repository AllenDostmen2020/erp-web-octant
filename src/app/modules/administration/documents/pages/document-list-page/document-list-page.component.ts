import { Component, TemplateRef, ViewChild, inject, signal } from '@angular/core';
import { ItemListTemplateComponent, ListItemExtended, dateColumn, itemCreatedAtColumn, itemStatusColumn, numberColumn, viewItemActionButton } from '@component/item-list-template/item-list-template.component';
import { Document } from '@interface/document';
import { ItemListConfiguration, clickEventActionButton, textColumn } from '@component/item-list-template/item-list-template.component';
import { FetchService, RequestInitFetch } from '@service/fetch.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmDialogData, ConfirmDialogTemplateComponent } from '@component/confirm-dialog-template/confirm-dialog-template.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { addDays, format, parseISO } from 'date-fns';
import { Router } from '@angular/router';

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
    MatSlideToggleModule,
  ],
  templateUrl: './document-list-page.component.html',
  styleUrl: './document-list-page.component.scss',
})
export class DocumentListPageComponent {
  @ViewChild('anulateFormTemplate', { static: true }) anulateFormTemplate!: TemplateRef<any>;
  @ViewChild('emitFormTemplate', { static: true }) emitFormTemplate!: TemplateRef<any>;
  private router = inject(Router);
  private fetch = inject(FetchService);
  private matDialog = inject(MatDialog);
  public commentCtrl = new FormControl('', [Validators.required]);
  public emitForm = new FormGroup({
    expire_date: new FormControl('', [Validators.required]),
    comment: new FormControl('', [Validators.required]),
    credit: new FormControl(false, [Validators.required]),
  });
  public minDate = addDays(new Date(), 1);

  public configuration: ItemListConfiguration<ExtDocument> = {
    title: 'Documentos',
    server: {
      url: 'document',
      queryParams: { relations: 'client,documentItems' },
    },
    rows: {
      options: [
        viewItemActionButton(),
        clickEventActionButton({
          icon: 'post_add',
          text: 'Detalles',
          fn: (item) => {
            this.router.navigate([{ outlets: { 'route-lateral': `administration/document/detail/${item.id}` } }]);
          },
        }),
        clickEventActionButton({
          icon: 'send',
          text: 'Emitir',
          fn: async (item, index, { updateChangesItemFn }) => {
            if (item.expiration_date) {
              const expireDate = parseISO(item.expiration_date);
              this.expireDateCtrl.setValue(this.minDate > expireDate ? this.minDate : expireDate);
            };
            const response = await this.emitDocument(item);
            if (response) updateChangesItemFn(index, { ...item, ...response });
          },
        }),
        clickEventActionButton({
          text: 'Anular',
          icon: 'scan_delete',
          fn: async (item, index, { updateChangesItemFn }) => {
            const response = await this.cancelDocument(item);
            if (response) updateChangesItemFn(index, { ...item, ...response });
          },
        }),
        clickEventActionButton({
          text: 'Nota de crédito',
          icon: 'scan_delete',
          fn: async (item, index, { updateChangesItemFn }) => {
            const response = await this.anulateWithNote(item, 'crédito');
            if (response) updateChangesItemFn(index, { ...item, ...response });
          },
        }),
        clickEventActionButton({
          text: 'Nota de débito',
          icon: 'scan_delete',
          fn: async (item, index, { updateChangesItemFn }) => {
            const response = await this.anulateWithNote(item, 'crédito');
            if (response) updateChangesItemFn(index, { ...item, ...response });
          }
        }),
        clickEventActionButton({
          text: 'Descargar PDF',
          icon: 'cloud_download',
          fn: (item) => console.log('Descargar PDF'),
        }),
        clickEventActionButton({
          text: 'Descargar XML',
          icon: 'cloud_download',
          fn: (item) => this.downloadFile(item, 'xml'),
        }),
        clickEventActionButton({
          text: 'Descargar CDR',
          icon: 'cloud_download',
          fn: (item) => this.downloadFile(item, 'cdr'),
        }),
      ]
    },
    columns: signal([
      textColumn({
        title: 'Código/Descripción',
        displayValueFn: (item) => item.serie ? `${item.serie}-${item.correlative}` : '--',
        displayAdditionalValueFn: (item) => item.document_items?.map((item) => item.description).join(', '),
      }),
      textColumn({
        title: 'Cliente',
        displayValueFn: (item) => item.client?.name,
        gridColumn: 'fit-content(200px)',
      }),
      textColumn({
        title: 'Emitido',
        displayValueFn: (item) => item.issue_date ? format(parseISO(item.issue_date), 'dd/MM/yyyy') : '--',
      }),
      numberColumn({
        title: 'Sub total',
        displayValueFn: (item) => item.total_value,
      }),
      numberColumn({
        title: 'Igv',
        displayValueFn: (item) => item.total_taxes,
      }),
      numberColumn({
        title: 'Total',
        displayValueFn: (item) => item.total,
      }),
      itemCreatedAtColumn(),
      itemStatusColumn(),
    ]),
  }

  get expireDateCtrl(): FormControl { return this.emitForm.get('expire_date')! as FormControl; }
  get creditCtrl(): FormControl { return this.emitForm.get('credit')! as FormControl; }

  private confirmDialog(data: ConfirmDialogData): Promise<boolean> {
    return new Promise((resolve) => {
      const dialogRef = this.matDialog.open(ConfirmDialogTemplateComponent, { data });
      dialogRef.afterClosed().subscribe((result) => resolve(result));
    });
  }

  private async emitDocument(item: Document): Promise<Document | null> {
    this.commentCtrl.reset('');
    const dialogData: ConfirmDialogData = {
      icon: 'info',
      title: '¿Está seguro de emitir documento?',
      description: '',
      templateRef: this.emitFormTemplate,
      confirmButton: { disabled: true },
    };
    const subscribe = this.emitForm.valueChanges.subscribe(() => dialogData.confirmButton!.disabled = this.emitForm.invalid);
    const confirm = await this.confirmDialog(dialogData);
    subscribe.unsubscribe();
    if (!confirm) return null;
    const url = `document/send-to-sunat/${item.id}`;
    const body = this.emitForm.value;
    const request: RequestInitFetch = {
      confirmDialog: false,
      toast: {
        loading: 'Enviando a SUNAT...',
        success: 'Documento enviado a SUNAT',
        error: (error) => error.error ?? 'Error al enviar a SUNAT',
      }
    };
    return await this.fetch.put<Document>(url, body, request);
  }

  private async cancelDocument(item: Document): Promise<Document | null> {
    this.commentCtrl.reset('');
    const dialogData: ConfirmDialogData = {
      icon: 'error',
      title: '¿Está seguro de anular documento?',
      description: '',
      templateRef: this.anulateFormTemplate,
      confirmButton: { disabled: true },
    };
    const subscribe = this.commentCtrl.valueChanges.subscribe(() => dialogData.confirmButton!.disabled = this.commentCtrl.invalid);
    const confirm = await this.confirmDialog(dialogData);
    subscribe.unsubscribe();
    if (!confirm) return null;
    const url = 'cancel-document-send';
    const body = {
      low_reason: this.commentCtrl.value,
      document_id: item.id,
    };
    const request: RequestInitFetch = {
      confirmDialog: false,
      toast: {
        loading: 'Anulando documento...',
        success: 'Documento anulado',
        error: (error) => 'Error al anular documento',
      }
    };
    return await this.fetch.post<Document>(url, body, request);
  }

  private async anulateWithNote(item: Document, type: 'débito' | 'crédito'): Promise<Document | null> {
    this.commentCtrl.reset('');
    const dialogData: ConfirmDialogData = {
      icon: 'error',
      title: `¿Está seguro de anular documento con nota de ${type}?`,
      description: `Se generará una nota de ${type}`,
      confirmButton: {
        text: `Anular con nota de ${type}`,
        disabled: true,
      },
    };
    const subscribe = this.commentCtrl.valueChanges.subscribe(() => dialogData.confirmButton!.disabled = this.commentCtrl.invalid);
    const confirm = await this.confirmDialog(dialogData);
    subscribe.unsubscribe();
    if (!confirm) return null;
    const url = `${type}-note`;
    const request: RequestInitFetch = {
      confirmDialog: false,
      toast: {
        loading: 'Anulando documento...',
        success: 'Documento anulado',
        error: (error) => 'Error al anular documento',
      }
    };
    const body = {
      document_id: item.id,
      low_reason: this.commentCtrl.value,
    };
    return await this.fetch.post<Document>(url, body, request);
  }

  private async downloadFile(item: Document, type: 'xml' | 'cdr'): Promise<void> {
    const url = `document/${item.id}/download/${type}`;
    const request: RequestInitFetch = {
      confirmDialog: {
        icon: 'cloud_download',
        title: `¿Está seguro de descargar ${type.toUpperCase()}?`,
        description: `Se descargará el ${type.toUpperCase()} del documento`,
        confirmButton: { text: `Descargar ${type.toUpperCase()}` },

      },
      toast: {
        loading: `Descargando ${type.toUpperCase()}...`,
        success: `${type.toUpperCase()} descargado`,
        error: () => `Error al descargar ${type.toUpperCase()}`,
      }
    };
    const blob: Blob = await this.fetch.blob(url, request);
    const URL = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = URL;
    a.download = `${type.toUpperCase()}-${item.serie}-${item.correlative}.${type == 'xml' ? 'xml' : 'zip'}`;
    a.click();
    window.URL.revokeObjectURL(URL);

  }

}
