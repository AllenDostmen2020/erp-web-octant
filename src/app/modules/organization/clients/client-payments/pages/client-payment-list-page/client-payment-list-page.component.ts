import { Component, TemplateRef, ViewChild, ViewEncapsulation, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConfirmDialogData, ConfirmDialogTemplateComponent } from '@component/confirm-dialog-template/confirm-dialog-template.component';
import { ItemListConfiguration, ItemListTemplateComponent, clickEventActionButton, dateColumn, datesFilterFormInput, editItemActionButton, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, numberColumn, statusFilterFormInput, textColumn, titlecaseColumn, userColumn, viewItemActionButton } from '@component/item-list-template/item-list-template.component';
import { StatusModel } from '@interface/baseModel';
import { BoxMovementTypeEnum } from '@interface/boxMovement';
import { ClientBoxMovement } from '@interface/clientBoxMovement';
import { FetchService, RequestInitFetch } from '@service/fetch.service';

@Component({
  selector: 'app-client-payment-list-page',
  standalone: true,
  imports: [
    ItemListTemplateComponent,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './client-payment-list-page.component.html',
  styleUrl: './client-payment-list-page.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ClientPaymentListPageComponent {
  @ViewChild('deletePaymentTemplate', { static: true }) deletePaymentTemplate!: TemplateRef<any>;
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private fetch = inject(FetchService);
  private matDialog = inject(MatDialog);
  public listConfiguration: ItemListConfiguration<ClientBoxMovement> = {
    title: 'Pagos y movimientos',
    server: {
      url: 'client-box-movement',
      queryParams: {
        relations: 'clientBox,boxMovement',
        client_id: this.router.url.includes('/organization/client/view/') ? this.activatedRoute.snapshot.parent?.parent?.paramMap.get('id') : null,
      }
    },
    columns: signal([
      textColumn({
        title: 'Cuenta',
        displayValueFn: (item) => item.client_box?.name,
      }),
      textColumn({
        title: 'Concepto',
        displayValueFn: (item) => item.box_movement?.concept,
        routerLinkValue: { url: (item) => `../detail/${item.id}` },
        gridColumn: '1fr',
      }),
      dateColumn({
        title: 'F. Operación',
        displayValueFn: (item) => item.created_at,
      }),
      userColumn({
        title: 'Usuario',
        displayValueFn: (item) => item.create_user_id,
      }),
      titlecaseColumn({
        title: 'Moneda',
        displayValueFn: (item) => item.box_movement?.coin ?? item.client_box?.coin,
      }),
      numberColumn({
        title: 'Monto',
        displayValueFn: (item) => item.amount,
        cssClass: (item) => item.type == BoxMovementTypeEnum.INGRESO ? 'ingreso' : 'egreso',
      }),
      itemCreatedAtColumn(),
      itemUpdatedAtColumn(),
    ]),
    rows: {
      options: [
        viewItemActionButton(),
        editItemActionButton(),
        clickEventActionButton({
          icon: 'delete',
          text: 'Eliminar',
          fn: (item) => this.deletePayment(item),
        })
      ]
    },
    filter: {
      inputs: signal([
        statusFilterFormInput([StatusModel.Inactivo]),
        datesFilterFormInput(),
      ])
    }
  }

  public form = new FormGroup({
    delete_comment: new FormControl(''),
  });
  get deleteCommentCtrl(): FormControl { return this.form.get('delete_comment')! as FormControl; }

  private confirmDialog(data: ConfirmDialogData): Promise<boolean> {
    return new Promise((resolve) => {
      const dialogRef = this.matDialog.open(ConfirmDialogTemplateComponent, { data });
      dialogRef.afterClosed().subscribe((result) => resolve(result));
    });
  }

  private async deletePayment(item: ClientBoxMovement): Promise<ClientBoxMovement | null> {
    this.deleteCommentCtrl.reset('');
    const dialogData: ConfirmDialogData = {
      icon: 'error',
      title: '¿Está seguro de eliminar el pago?',
      description: '',
      templateRef: this.deletePaymentTemplate,
      confirmButton: { disabled: true },
    };
    const subscribe = this.deleteCommentCtrl.valueChanges.subscribe(() => dialogData.confirmButton!.disabled = this.deleteCommentCtrl.invalid);
    const confirm = await this.confirmDialog(dialogData);
    subscribe.unsubscribe();
    if (!confirm) return null;
    const url = `client-box-movement/delete/${item.id}`;
    const body = {
      delete_comment: this.deleteCommentCtrl.value
    };
    const request: RequestInitFetch = {
      confirmDialog: false,
      toast: {
        loading: 'Eliminando registro...',
        success: 'Registro eliminado',
        error: (error) => 'Error al eliminar pago',
      }
    };
    const response = await this.fetch.put<ClientBoxMovement>(url, body, request);
    this.listConfiguration.updateListEvent?.emit();
    return response;
  }
}
