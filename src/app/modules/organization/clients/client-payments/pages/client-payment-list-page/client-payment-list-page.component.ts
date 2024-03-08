import { Component, signal } from '@angular/core';
import { ItemListConfiguration, ItemListTemplateComponent, dateColumn, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, numberColumn, textColumn, titlecaseColumn, userColumn } from '@component/item-list-template/item-list-template.component';
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
            title: 'Código',
            displayValueFn: (item) => item.box_movement?.code,
          }),
          textColumn({
            title: 'Cuenta',
            displayValueFn: (item) => item.client_account?.name,
            routerLinkValue: { url: (item) => `../detail/${item.id}` },
            gridColumn: '1fr',
          }),
          titlecaseColumn({
            title: 'Tipo pago',
            displayValueFn: (item) => item.box_movement?.payment_type,
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
            displayValueFn: (item) => item.box_movement?.coin ?? item.client_account?.coin,
          }),
          numberColumn({
            title: 'Monto D / U',
            displayValueFn: (item) => item.amount,
            displayAdditionalValueFn: (item) => item.amount_used,
          }),
          itemCreatedAtColumn(),
          itemUpdatedAtColumn(),
          itemStatusColumn(),
        ])
      }
}
