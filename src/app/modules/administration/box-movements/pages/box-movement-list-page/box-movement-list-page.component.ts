import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemListConfiguration, ItemListTemplateComponent, ListColumn, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, numberColumn, textColumn, viewItemActionButton } from '@component/item-list-template/item-list-template.component';
import { BoxMovement, BoxMovementTypeEnum } from '@interface/boxMovement';

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
    rows: {
      options: [
        viewItemActionButton(),
      ]
    }
  }

  private generateColumns(): ListColumn<BoxMovement>[] {
    let columns = [
      textColumn({
        title: 'Código',
        sort: { key: 'code' },
        displayValueFn: (item) => item.code,
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
      textColumn({
        title: 'Cliente',
        routerLinkValue: {
          url: (item) => `box-movement/detail/${item.id}`,
          outlet: 'route-lateral'
        },
        gridColumn: 'fit-content(300px)',
        displayValueFn: (item) => item.client_box_movement.client.name ? item.client_box_movement.client.name : 'Empresa',
      }),
      textColumn({
        title: 'Caja',
        displayValueFn: (item) => item.box_opening?.box?.name ?? '--',
        cssClass: (item) => item.box_opening?.box?.deleted_at ? 'item-deleted' : '',
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
