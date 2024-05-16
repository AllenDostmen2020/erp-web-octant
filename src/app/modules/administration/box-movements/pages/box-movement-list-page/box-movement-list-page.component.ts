import { DecimalPipe } from '@angular/common';
import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormInput, autocompleteLocalFormInput } from '@component/item-form-template/item-form-template.component';
import { ItemListConfiguration, ItemListTemplateComponent, ListColumn, clickEventActionButton, defaultListFilterInputs, htmlColumn, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, numberColumn, textColumn, titlecaseColumn, uppercaseColumn, viewItemActionButton } from '@component/item-list-template/item-list-template.component';
import { Box } from '@interface/box';
import { BoxMovement, BoxMovementTypeEnum } from '@interface/boxMovement';
import { NameModuleDatabase } from '@service/database-storage.service';

@Component({
  selector: 'app-box-movement-list-page',
  standalone: true,
  imports: [ItemListTemplateComponent],
  providers: [DecimalPipe],
  templateUrl: './box-movement-list-page.component.html',
  styleUrl: './box-movement-list-page.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class BoxMovementListPageComponent {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private decimalPipe = inject(DecimalPipe);

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
    filters: signal(this.getFilters()),
    rows: { 
      options: [
        clickEventActionButton({
          icon: 'post_add',
          text: 'Detalles',
          fn: (item) => this.router.navigate([{ outlets: { 'route-lateral': `administration/box-movement/detail/${item.id}` } }]),
        }),
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
      itemCreatedAtColumn(),
      itemUpdatedAtColumn(),
      itemStatusColumn(),
    ];
    if (this.router.url.includes('/administration/box/view')) columns.splice(3, 1);
    return columns;
  }
}
