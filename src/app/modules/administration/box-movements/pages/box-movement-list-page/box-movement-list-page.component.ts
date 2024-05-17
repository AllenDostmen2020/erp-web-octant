import { DecimalPipe } from '@angular/common';
import { Component, TemplateRef, ViewChild, ViewEncapsulation, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogData, ConfirmDialogTemplateComponent } from '@component/confirm-dialog-template/confirm-dialog-template.component';
import { FormInput, autocompleteLocalFormInput } from '@component/item-form-template/item-form-template.component';
import { ItemListConfiguration, ItemListTemplateComponent, ListColumn, clickEventActionButton, defaultListFilterInputs, htmlColumn, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, numberColumn, textColumn, titlecaseColumn, uppercaseColumn, viewItemActionButton } from '@component/item-list-template/item-list-template.component';
import { StatusModel } from '@interface/baseModel';
import { Box } from '@interface/box';
import { BoxMovement, BoxMovementTypeEnum } from '@interface/boxMovement';
import { NameModuleDatabase } from '@service/database-storage.service';
import { FetchService, RequestInitFetch } from '@service/fetch.service';

@Component({
  selector: 'app-box-movement-list-page',
  standalone: true,
  imports: [
    ItemListTemplateComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [DecimalPipe],
  templateUrl: './box-movement-list-page.component.html',
  styleUrl: './box-movement-list-page.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class BoxMovementListPageComponent {
  @ViewChild('deleteBoxMovementTemplate', { static: true }) deleteBoxMovementTemplate!: TemplateRef<any>;
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private decimalPipe = inject(DecimalPipe);
  private fetch = inject(FetchService);
  private matDialog = inject(MatDialog);
  public configuration: ItemListConfiguration<BoxMovement> = {
    title: 'Movimientos',
    server: {
      url: 'box-movement',
      queryParams: {
        relations: 'boxOpening.box,ClientBoxMovement.client',
        box_id: this.router.url.includes('/administration/box/view') ? this.activatedRoute.snapshot.parent?.parent?.paramMap.get('id') : null,
      },
    },
    columns: signal(this.generateColumns()),
    filter: {
      inputs: signal(this.getFilters()),
    },
    rows: { 
      options: [
        clickEventActionButton({
          icon: 'post_add',
          text: 'Detalles',
          fn: (item) => this.router.navigate([{ outlets: { 'route-lateral': `administration/box-movement/detail/${item.id}` } }]),
        }),
        clickEventActionButton({
          icon: 'delete',
          text: 'Eliminar',
          hidden: (item) => item.status == StatusModel.Eliminado,
          fn: (item) => this.deleteMovement(item),
        })
      ] 
    },
  }

  private getFilters(): FormInput[] {
    const filters: FormInput[] = [];
    if (!this.router.url.includes('/administration/box/view')) {
      filters.push(autocompleteLocalFormInput<Box>({
        formControlName: 'box_id',
        textLabel: 'Caja',
        local: { nameModuleDatabase: NameModuleDatabase.Boxes },
        displayTextFn: (box) => box instanceof Object ? (box?.name ?? '') : '',
        optionDisplayTextFn: (box) => box ? `<div class="grid">
            <div class="label-large">
                ${box?.name}
                <span class="py-px px-2 rounded-full bg-tertiary-container text-on-tertiary-container">
                     ${(box?.account?.coin ?? box?.coin)}
                </span>
            </div>
            <div class="body-small flex gap-2">
                ${box?.account?.name} | ${box?.account?.bank?.name}
            </div>
            </div>` : '--',
      }))
    }
    return [...filters, ...defaultListFilterInputs()];
  }

  private generateColumns(): ListColumn<BoxMovement>[] {
    let columns: ListColumn<BoxMovement>[] = [
      textColumn({
        title: 'Código',
        sort: { key: 'code' },
        displayValueFn: (item) => item.code,
      }),
      textColumn({
        title: 'Caja',
        displayValueFn: (item) => item.box_opening?.box?.name ?? '--',
        cssClass: (item) => item.box_opening?.box?.deleted_at ? 'item-deleted' : '',
      }),
      textColumn({
        title: 'Concepto',
        routerLinkValue: {
          url: (item) => `box-movement/detail/${item.id}`,
          outlet: 'route-lateral'
        },
        gridColumn: '1fr',
        displayValueFn: (item) => item?.concept ? item.concept : '--',
      }),
      uppercaseColumn({
        title: 'Negocio',
        displayValueFn: (item) => item.business,
      }),
      uppercaseColumn({
        title: 'Cliente',
        gridColumn: 'fit-content(280px)',
        displayValueFn: (item) => item.client_box_movement?.client ? item.client_box_movement?.client?.name : (item.type == BoxMovementTypeEnum.EGRESO ? item.addressee : item.business),
      }),
      htmlColumn({
        title: 'Monto',
        align: 'right',
        displayValueFn: (item) => `<p class="label-medium" style="display: flex; align-items: center; color: var(--color-${item.type == 'ingreso' ? 'primary' : 'error'});">
          <span class="material-icons">${item.type == 'ingreso' ? 'arrow_upward_alt' : 'arrow_downward_alt'}</span>
          ${item.coin == 'soles' ? 'S/' : '$'} ${this.decimalPipe.transform(item.amount, '1.2-2')}
        </p>`,
      }),
      textColumn({
        title: 'Comentario de eliminación',
        displayValueFn: (item) => item.delete_comment,
        hidden: true,
      }),
      itemCreatedAtColumn(),
      itemUpdatedAtColumn(),
      itemStatusColumn(),
    ];
    if (this.router.url.includes('/administration/box/view')) columns.splice(3, 1);
    return columns;
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

  private async deleteMovement(item: BoxMovement): Promise<BoxMovement | null> {
    this.deleteCommentCtrl.reset('');
    const dialogData: ConfirmDialogData = {
      icon: 'error',
      title: '¿Está seguro de eliminar el movimiento?',
      description: '',
      templateRef: this.deleteBoxMovementTemplate,
      confirmButton: { disabled: true },
    };
    const subscribe = this.deleteCommentCtrl.valueChanges.subscribe(() => dialogData.confirmButton!.disabled = this.deleteCommentCtrl.invalid);
    const confirm = await this.confirmDialog(dialogData);
    subscribe.unsubscribe();
    if (!confirm) return null;
    const url = `box-movement/delete/${item.id}`;
    const body = {
      delete_comment: this.deleteCommentCtrl.value
    };
    const request: RequestInitFetch = {
      confirmDialog: false,
      toast: {
        loading: 'Eliminando registro...',
        success: 'Registro eliminado',
        error: (error) => 'Error al eliminar movimiento',
      }
    };
    const response = await this.fetch.put<BoxMovement>(url, body, request);
    this.configuration.updateListEvent?.emit();
    return response;
  }
}
