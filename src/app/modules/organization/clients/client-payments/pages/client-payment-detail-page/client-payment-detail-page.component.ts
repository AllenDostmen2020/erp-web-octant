import { Component } from '@angular/core';
import { ItemDetailTemplateComponent, registerDataGroupDetail } from '@component/item-detail-template/item-detail-template.component';
import { ClientPayment } from '@interface/clientPayment';
import { ItemDetailConfiguration } from '@interface/itemDetail';

@Component({
  selector: 'app-client-payment-detail-page',
  standalone: true,
  imports: [ ItemDetailTemplateComponent ],
  templateUrl: './client-payment-detail-page.component.html',
  styleUrl: './client-payment-detail-page.component.scss'
})
export class ClientPaymentDetailPageComponent {
  public configuration: ItemDetailConfiguration<ClientPayment> = {
    title: 'Detalles',
    subtitle: false,
    server: { url: 'client-payment', queryParams: {relations: 'clientPaymentDocuments.document,boxMovement,clientAccount'} },
    backButton: true,
    groups: [
        {
            title: 'Datos generales',
            icon: 'account_circle',
            details: [
                {
                    title: 'Cuenta',
                    displayValueFn: (item) => item.client_account?.name,
                },
                {
                    title: 'Tipo de pago',
                    displayValueFn: (item) => item.box_movement?.payment_type
                },
                {
                    title: 'Fecha de pago',
                    displayValueFn: (item) => item.box_movement?.payment_date,
                    type: 'date'
                },
                {
                    title: 'Documentos pagados',
                    displayValueFn: (item) => item.client_payment_documents?.length ? `<div class="flex gap-2">${item.client_payment_documents?.map((cpd) => `<div>${cpd.amount} | </div>`).join('')}</div>` : 'No tiene documentos asignados',
                    type: 'html'
                },
            ]
        },
        registerDataGroupDetail(),
    ]
}
}
