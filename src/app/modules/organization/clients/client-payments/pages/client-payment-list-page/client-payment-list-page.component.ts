import { Component, signal } from '@angular/core';
import { ItemListConfiguration, ItemListTemplateComponent, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, textColumn } from '@component/item-list-template/item-list-template.component';
import { ClientPayment } from '@interface/clientPayment';

@Component({
  selector: 'app-client-payment-list-page',
  standalone: true,
  imports: [ItemListTemplateComponent],
  templateUrl: './client-payment-list-page.component.html',
  styleUrl: './client-payment-list-page.component.scss'
})
export class ClientPaymentListPageComponent {
    public listConfiguration: ItemListConfiguration<ClientPayment> = {
        title: 'Documentos',
        server: {
          url: 'client-payment',
          queryParams: {relations: 'clientAccount,boxMovement'}
        },
        columns: signal([
          textColumn({
            title: 'Cuenta',
            displayValueFn: (item) => item.client_account?.name,
          }),
          textColumn({
            title: 'Monto de movimiento',
            displayValueFn: (item) => item.box_movement?.amount,
            gridColumn: '1fr',
          }),
          itemCreatedAtColumn(),
          itemUpdatedAtColumn(),
          itemStatusColumn(),
        ])
      }
}
