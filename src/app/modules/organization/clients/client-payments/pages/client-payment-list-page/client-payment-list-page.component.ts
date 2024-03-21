import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ItemListConfiguration, ItemListTemplateComponent, dateColumn, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, numberColumn, textColumn, titlecaseColumn, userColumn } from '@component/item-list-template/item-list-template.component';
import { ClientBoxMovement } from '@interface/clientBoxMovement';

@Component({
  selector: 'app-client-payment-list-page',
  standalone: true,
  imports: [ItemListTemplateComponent, RouterLink],
  templateUrl: './client-payment-list-page.component.html',
  styleUrl: './client-payment-list-page.component.scss'
})
export class ClientPaymentListPageComponent {
  public listConfiguration: ItemListConfiguration<ClientBoxMovement> = {
    title: 'Pagos y movimientos',
    server: {
      url: 'client-box-movement',
      queryParams: { relations: 'clientBox,boxMovement' }
    },
    columns: signal([
      textColumn({
        title: 'Código',
        displayValueFn: (item) => item.box_movement?.code,
      }),
      textColumn({
        title: 'Cuenta',
        displayValueFn: (item) => item.client_box?.name,
        routerLinkValue: { url: (item) => `../detail/${item.id}` },
        gridColumn: '1fr',
      }),
      titlecaseColumn({
        title: 'Tipo mov.',
        displayValueFn: (item) => item.box_movement?.type,
      }),
      dateColumn({
        title: 'Fecha pago',
        displayValueFn: (item) => item.box_movement?.payment_date,
      }),
      userColumn({
        title: 'Usuario',
        displayValueFn: (item) => item.box_movement?.user_id,
      }),
      titlecaseColumn({
        title: 'Moneda',
        displayValueFn: (item) => item.box_movement?.coin ?? item.client_box?.coin,
      }),
      numberColumn({
        title: 'Monto Disponible',
        displayValueFn: (item) => item.amount,
      }),
      itemCreatedAtColumn(),
      itemUpdatedAtColumn(),
      itemStatusColumn(),
    ])
  }
}
