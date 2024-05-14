import { DatePipe } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, TemplateRef, ViewChild, inject, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogData, ConfirmDialogTemplateComponent } from '@component/confirm-dialog-template/confirm-dialog-template.component';
import { ItemListConfiguration, ItemListTemplateComponent, clickEventActionButton, itemCreatedAtColumn, itemStatusColumn, numberColumn, selectableActionButton, textColumn } from '@component/item-list-template/item-list-template.component';
import { Document } from '@interface/document';
import { FetchService, RequestInitFetch } from '@service/fetch.service';
import { format, parseISO } from 'date-fns';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

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
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('emailFormTemplate', { static: true }) emailFormTemplate!: TemplateRef<any>;
  private fetch = inject(FetchService);
  private matDialog = inject(MatDialog);
  private activatedRoute = inject(ActivatedRoute);
  public emails: string[] = [];
  announcer = inject(LiveAnnouncer);
  public configList: ItemListConfiguration<Document> = {
    title: 'Documentos',
    server: {
      url: 'document',
      queryParams: {
        client_id: this.activatedRoute.snapshot.parent?.paramMap.get('id'),
        // not_send_email: 'false',
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
      itemCreatedAtColumn(),
      itemStatusColumn(),
    ]),
    createButton: false,
    rows: {
      options: [
        clickEventActionButton({
          icon: 'send',
          text: 'Enviar email',
          hidden: (item) => item.send_email,
          fn: async (item, index, { updateChangesItemFn }) => {
            const response = await this.sendEmail([item], true);
            if (response) {
              updateChangesItemFn(index, { ...item, ...response });
              this.matDialog.open(ConfirmDialogTemplateComponent, {
                data: <ConfirmDialogData>{
                  icon: 'check_circle',
                  title: 'Email enviado',
                  description: '',
                  data: response,
                  templateRef: this.emailFormTemplate,
                  cancelButton: false,
                  confirmButton: {
                    text: 'Cerrar',
                  }
                }
              });
            }
          },
        }),
      ],
      selectable: {
        actions: [
          selectableActionButton({
            icon: 'send',
            title: 'Enviar por email',
            fn: (selectedItems) => {
              this.sendEmail(selectedItems, false);
            }
          })
        ]
      }
    },
  }

  removeKeyword(reference: string) {
    const index = this.emails.indexOf(reference);
    if (index >= 0) {
        this.emails.splice(index, 1);

        this.announcer.announce(`removed ${reference}`);
    }
}

add(event: MatChipInputEvent): void {

    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
        this.emails.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
}



  public emailForm = new FormGroup({
    cc_emails: new FormControl([]),
  });

  get ccEmailCtrl(): FormControl { return this.emailForm.get('cc_emails')! as FormControl; }
  private confirmDialog(data: ConfirmDialogData): Promise<boolean> {
    return new Promise((resolve) => {
      const dialogRef = this.matDialog.open(ConfirmDialogTemplateComponent, { data });
      dialogRef.afterClosed().subscribe((result) => resolve(result));
    });
  }

  private data?: any;

  private async sendEmail(items: Document[], whithEmails: boolean) {
    if (whithEmails) {
      this.emailForm.reset();
      const dialogData: ConfirmDialogData = {
        icon: 'info',
        title: '¿Está seguro de enviar emails?',
        description: '',
        templateRef: this.emailFormTemplate,
        confirmButton: { disabled: false },
      };
      const subscribe = this.emailForm.valueChanges.subscribe(() => dialogData.confirmButton!.disabled = this.emailForm.invalid);
      const confirm = await this.confirmDialog(dialogData);
      subscribe.unsubscribe();
      if (!confirm) return null;
      this.data = [...items, this.emailForm.value];
    } else {
      this.data = items;
    }
    const url = `document/send-email`;
    const request: RequestInitFetch = {
      confirmDialog: false,
      toast: {
        loading: 'Enviando...',
        success: 'Datos enviados',
        error: (error) => error.error.message ?? 'Error al ejecutar acción',
      }
    };
    console.log(this.data);
    
    return await this.fetch.put<Document>(url, this.data, request);
  }
}
