import { DatePipe } from '@angular/common';
import { Component, TemplateRef, ViewChild, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogData, ConfirmDialogTemplateComponent } from '@component/confirm-dialog-template/confirm-dialog-template.component';
import { ItemListConfiguration, ItemListTemplateComponent, clickEventActionButton, htmlColumn, itemCreatedAtColumn, itemStatusColumn, numberColumn, selectableActionButton, textColumn } from '@component/item-list-template/item-list-template.component';
import { Document } from '@interface/document';
import { FetchService, RequestInitFetch } from '@service/fetch.service';
import { format, parseISO } from 'date-fns';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { dateRangeFormInput, switchFormInput } from '@component/item-form-template/item-form-template.component';

@Component({
  selector: 'app-client-send-email-page',
  standalone: true,
  imports: [
    ItemListTemplateComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    DatePipe,
    MatChipsModule
  ],
  templateUrl: './client-send-email-page.component.html',
  styleUrl: './client-send-email-page.component.scss'
})
export class ClientSendEmailPageComponent {
  @ViewChild('emailFormTemplate', { static: true }) emailFormTemplate!: TemplateRef<any>;
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;
  private fetch = inject(FetchService);
  private matDialog = inject(MatDialog);
  private activatedRoute = inject(ActivatedRoute);
  public emails: string[] = [];
  public configList: ItemListConfiguration<Document> = {
    title: 'Envío de documentos',
    server: {
      url: 'document',
      queryParams: {
        client_id: this.activatedRoute.snapshot.parent?.paramMap.get('id'),
        enable_send_email: 'true',
        relations: 'documentItems',
      },
    },
    columns: signal([
      textColumn({
        title: 'Código/Descripción',
        gridColumn: '1fr',
        displayValueFn: (item) => item.serie ? `${item.serie}-${item.correlative}` : '--',
        displayAdditionalValueFn: (item) => item.document_items?.map((item) => item.description).join(', '),
      }),
      textColumn({
        title: 'Emitido',
        displayValueFn: (item) => item.emit_date ? format(parseISO(item.emit_date), 'dd/MM/yyyy') : '--',
      }),
      numberColumn({
        title: 'Sub total',
        displayValueFn: (item) => item.total_value,
      }),
      numberColumn({
        title: 'Igv',
        displayValueFn: (item) => item.total_igv,
      }),
      numberColumn({
        title: 'Total',
        displayValueFn: (item) => item.total,
      }),
      htmlColumn({
        title: 'Enviado',
        align: 'center',
        displayValueFn: (item) => item.send_email ? '<i class="material-icons color-primary">done_all</i>' : '',
      }),
      itemStatusColumn(),
    ]),
    createButton: false,
    rows: {
      options: [
        clickEventActionButton({
          icon: 'send',
          text: 'Enviar email',
          // hidden: (item) => item.send_email,
          fn: (item) => this.sendEmail([item]),
        }),
      ],
      selectable: {
        actions: [
          selectableActionButton({
            icon: 'send',
            title: 'Enviar por email',
            fn: (selectedItems) => this.sendEmail(selectedItems),
          })
        ]
      }
    },
    filters: signal([
      dateRangeFormInput({
        textLabel: 'Fecha de emisión',
        formControlNameFrom: 'emit_date_from',
        formControlNameTo: 'emit_date_to',
      }),
      switchFormInput({
        textLabel: 'Pendientes de enviar',
        formControlName: 'not_send_email',
      }),
    ])
  }

  removeKeyword(reference: string) {
    const index = this.emails.indexOf(reference);
    if (index >= 0) {
      this.emails.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(value && regex.test(value)) this.emails.push(value);
    else return;
    event.chipInput!.clear();
  }



  public emailForm = new FormGroup({
    cc_email: new FormControl([]),
  });

  get ccEmailCtrl(): FormControl { return this.emailForm.get('cc_email')! as FormControl; }
  
  private confirmDialog(data: ConfirmDialogData): Promise<boolean> {
    return new Promise((resolve) => {
      const dialogRef = this.matDialog.open(ConfirmDialogTemplateComponent, { data });
      dialogRef.afterClosed().subscribe((result) => resolve(result));
    });
  }

  private async sendEmail(items: Document[]): Promise<void> {
    this.emailForm.reset();
    const dialogData: ConfirmDialogData = {
      icon: 'info',
      title: '¿Está seguro de enviar emails?',
      description: '',
      data: items,
      templateRef: this.emailFormTemplate,
      confirmButton: { disabled: false },
    };
    const subscribe = this.emailForm.valueChanges.subscribe(() => dialogData.confirmButton!.disabled = this.emailForm.invalid);
    const confirm = await this.confirmDialog(dialogData);
    subscribe.unsubscribe();
    if (!confirm) return;
    const url = `document/send-email`;
    const body = {
      document_ids: items.map((item) => item.id),
      cc_email: this.emailForm.value.cc_email,
      client_id: this.activatedRoute.snapshot.parent?.paramMap.get('id'),
    };
    const request: RequestInitFetch = {
      confirmDialog: false,
      toast: {
        loading: 'Enviando email...',
        success: 'Email enviado',
        error: (error) => error.error.message ?? 'Error al enviar Email',
      }
    };
    await this.fetch.post<Document>(url, body, request);
    this.configList.updateListEvent?.emit();
  }
}
