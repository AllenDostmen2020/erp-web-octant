import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormInput, autocompleteLocalFormInput } from '@component/item-form-template/item-form-template.component';
import { ItemListConfiguration, ItemListTemplateComponent, ListColumn, defaultListFilterInputs, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, numberColumn, textColumn, titlecaseColumn, uppercaseColumn, viewItemActionButton } from '@component/item-list-template/item-list-template.component';
import { Box } from '@interface/box';
import { BoxMovement, BoxMovementTypeEnum } from '@interface/boxMovement';
import { NameModuleDatabase } from '@service/database-storage.service';

@Component({
  selector: 'app-box-movement-list-page',
  standalone: true,
  imports: [ItemListTemplateComponent],
  templateUrl: './box-movement-list-page.component.html',
  styleUrl: './box-movement-list-page.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class BoxMovementListPageComponent {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

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
        viewItemActionButton(),
      ]
    }
  }

  private getFilters(): FormInput[] {
    const filters: FormInput[] = [];
    if (!this.router.url.includes('/administration/box/view')) {
      filters.push(autocompleteLocalFormInput<Box>({
        formControlName: 'box_id',
        textLabel: 'Caja',
        local: { nameModuleDatabase: NameModuleDatabase.Boxes },
        displayValueFn: (item) => item instanceof Object ? item.name : '',
        displayTextFn: (item) => `<div class="autocomplete-option__box">
          <div class="autocomplete-option__box__name">
            ${item.name.toUpperCase()} [${item.coin.toUpperCase()}]
          </div>
          <div class="autocomplete-option__box__details">
            <span class="autocomplete-option__box__details__type">${item.type.toUpperCase()}</span>
            ${
              item.account ? ('<span class="autocomplete-option__box__details__separator"></span> <span>' + item.account.bank?.name  + '</span> <span class="autocomplete-option__box__details__separator"></span> <span>' + item.account.bank?.name  + '</span>') : ''
            }
          </div>
        </div>`,
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
      numberColumn({
        title: 'Monto',
        displayValueFn: (item) => item.amount,
        cssClass: (item) => item.type == BoxMovementTypeEnum.INGRESO ? 'ingreso' : 'egreso',
      }),
      itemCreatedAtColumn(),
      itemUpdatedAtColumn(),
      itemStatusColumn(),
    ];
    if (this.router.url.includes('/administration/box/view')) columns.splice(3, 1);
    return columns;
  }
}
