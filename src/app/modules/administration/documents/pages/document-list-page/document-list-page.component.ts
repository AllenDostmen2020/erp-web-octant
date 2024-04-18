import { Component, TemplateRef, ViewChild, inject, signal } from '@angular/core';
import { ItemListTemplateComponent, ListColumn, ListItemExtended, dateColumn, defaultListFilterInputs, itemCreatedAtColumn, itemStatusColumn, numberColumn, viewItemActionButton } from '@component/item-list-template/item-list-template.component';
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
import { ActivatedRoute, Router } from '@angular/router';
import { StatusModel } from '@interface/baseModel';
import { autocompleteServerFormInput } from '@component/item-form-template/item-form-template.component';

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
  private activatedRoute = inject(ActivatedRoute);
  private fetch = inject(FetchService);
  private matDialog = inject(MatDialog);
  public commentCtrl = new FormControl('', [Validators.required]);
  public emitForm = new FormGroup({
    expiration_date: new FormControl('', [Validators.required]),
    emit_comment: new FormControl('', [Validators.required]),
    credit: new FormControl(false, [Validators.required]),
  });
  public minDate = addDays(new Date(), 1);

  public configuration: ItemListConfiguration<ExtDocument> = {
    title: 'Documentos',
    server: {
      url: 'document',
      queryParams: {
        relations: this.router.url.includes('/organization/client/view') ? 'documentItems' : 'client,documentItems',
        client_id: this.router.url.includes('/organization/client/view') ? this.activatedRoute.snapshot.parent?.parent?.paramMap.get('id') : null,
        contract_id: this.router.url.includes('/tracking/contract/view') ? this.activatedRoute.snapshot.parent?.parent?.paramMap.get('id') : null,
      },
    },
    createButton: false,
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
          icon: 'task_alt',
          text: 'Verificar estado SUNAT',
          hidden: (item) => item.status !== StatusModel.PendienteAnular && item.status !== StatusModel.PendienteAceptar,
          fn: async (item, index, { updateChangesItemFn }) => {
            const response = await this.consultStatusSunat(item);
            if (response) updateChangesItemFn(index, { ...item, ...response });
          },
        }),
        clickEventActionButton({
          icon: 'send',
          text: 'Emitir',
          hidden: (item) => item.status !== StatusModel.Generada,
          fn: async (item, index, { updateChangesItemFn }) => {
            const response = await this.emitDocument(item);
            if (response) updateChangesItemFn(index, { ...item, ...response });
          },
        }),
        clickEventActionButton({
          text: 'Anular',
          icon: 'scan_delete',
          hidden: (item) => {
            return item.status !== StatusModel.Emitida;
          },
          fn: async (item, index, { updateChangesItemFn }) => {
            const response = await this.cancelDocument(item);
            if (response) updateChangesItemFn(index, { ...item, ...response });
          },
        }),
        clickEventActionButton({
          text: 'Nota de crédito',
          icon: 'scan_delete',
          hidden: (item) => {
            return item.status !== StatusModel.Emitida;
          },
          fn: async (item, index, { updateChangesItemFn }) => {
            const response = await this.anulateWithNote(item, 'crédito');
            if (response) updateChangesItemFn(index, { ...item, ...response });
          },
        }),
        clickEventActionButton({
          text: 'Descargar PDF',
          icon: 'cloud_download',
          hidden: (item) => {
            return item.status !== StatusModel.Aceptada;
          },
          fn: (item) => console.log('Descargar PDF'),
        }),
        clickEventActionButton({
          text: 'Descargar XML',
          icon: 'cloud_download',
          hidden: (item) => {
            return item.status !== StatusModel.Aceptada;
          },
          fn: (item) => this.downloadFile(item, 'xml'),
        }),
        clickEventActionButton({
          text: 'Descargar CDR',
          icon: 'cloud_download',
          hidden: (item) => {
            return item.status !== StatusModel.Aceptada;
          },
          fn: (item) => this.downloadFile(item, 'cdr'),
        }),
      ]
    },
    columns: signal(this.generateColumns()),
    filters: signal([
      autocompleteServerFormInput({
          formControlName: 'client_id',
          textLabel: 'Cliente',
          server: {
              url: 'client',
          }
      }),
      ...defaultListFilterInputs(),
  ])
  }

  private generateColumns(): ListColumn<Document>[] {
    let columns = [
      textColumn<Document>({
        title: 'Código/Descripción',
        displayValueFn: (item) => item.serie ? `${item.serie}-${item.correlative}` : '--',
        displayAdditionalValueFn: (item) => item.document_items?.map((item) => item.description).join(', '),
      }),
      textColumn<Document>({
        title: 'Cliente',
        displayValueFn: (item) => item.client?.name,
        gridColumn: 'fit-content(200px)',
      }),
      textColumn<Document>({
        title: 'Emitido',
        displayValueFn: (item) => item.emit_date ? format(parseISO(item.emit_date), 'dd/MM/yyyy') : '--',
      }),
      numberColumn<Document>({
        title: 'Sub total',
        displayValueFn: (item) => item.total_value,
      }),
      numberColumn<Document>({
        title: 'Igv',
        displayValueFn: (item) => item.total_igv,
      }),
      numberColumn<Document>({
        title: 'Total',
        displayValueFn: (item) => item.total,
      }),
      itemCreatedAtColumn(),
      itemStatusColumn(),
    ];
    if (this.router.url.includes('/organization/client/view')) columns.splice(1, 1);
    return columns;
  }

  get emitExpirationDateCtrl(): FormControl { return this.emitForm.get('expiration_date')! as FormControl; }
  get emitCreditCtrl(): FormControl { return this.emitForm.get('credit')! as FormControl; }
  get emitCommentCtrl(): FormControl { return this.emitForm.get('emit_comment')! as FormControl; }

  private confirmDialog(data: ConfirmDialogData): Promise<boolean> {
    return new Promise((resolve) => {
      const dialogRef = this.matDialog.open(ConfirmDialogTemplateComponent, { data });
      dialogRef.afterClosed().subscribe((result) => resolve(result));
    });
  }

  private async emitDocument(item: Document): Promise<Document | null> {
    this.emitForm.reset();
    if (item.fees) {
      this.emitCreditCtrl.setValue(true);
      if (item.expiration_date) {
        const expireDate = parseISO(item.expiration_date);
        this.emitExpirationDateCtrl.setValue(this.minDate > expireDate ? this.minDate : expireDate);
      };
    } else {
      this.emitCreditCtrl.setValue(false);
      this.emitExpirationDateCtrl.setValue(this.minDate);
    }
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
        error: (error) => error.error.message?? 'Error al enviar a SUNAT',
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
    const url = `document/anulate-to-sunat/${item.id}`;
    const body = {
      anulation_reason: this.commentCtrl.value
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
      templateRef: this.anulateFormTemplate,
      confirmButton: {
        text: `Anular con nota de ${type}`,
        disabled: true,
      },
    };
    const subscribe = this.commentCtrl.valueChanges.subscribe(() => dialogData.confirmButton!.disabled = this.commentCtrl.invalid);
    const confirm = await this.confirmDialog(dialogData);
    subscribe.unsubscribe();
    if (!confirm) return null;
    const url = `${type == 'crédito' ? 'credit' : 'debit'}-note`;
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
      anulation_reason: this.commentCtrl.value,
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

  private async consultStatusSunat(item: Document): Promise<Document | null> {
    const url = `document/consult-status-sunat/${item.id}`;
    const request: RequestInitFetch = {
      confirmDialog: false,
      toast: {
        loading: 'Verificando estado en SUNAT...',
        success: 'Estado verificado',
        error: (error) => error.error.message?? 'Error al verificar estado en SUNAT',
      }
    };
    return await this.fetch.get<Document>(url, request);
  }

}
