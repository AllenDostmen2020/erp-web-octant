import { Component } from '@angular/core';
import { ItemDetailTemplateComponent, registerDataGroupDetail } from '@component/item-detail-template/item-detail-template.component';
import { ClientBoxMovement } from '@interface/clientBoxMovement';
import { ItemDetailConfiguration } from '@component/item-detail-template/item-detail-template.component';

@Component({
    selector: 'app-client-payment-detail-page',
    standalone: true,
    imports: [ItemDetailTemplateComponent],
    templateUrl: './client-payment-detail-page.component.html',
    styleUrl: './client-payment-detail-page.component.scss'
})
export class ClientPaymentDetailPageComponent {
    public configuration: ItemDetailConfiguration<ClientBoxMovement> = {
        title: 'Detalles',
        subtitle: false,
        server: { url: 'client-box-movement', queryParams: { relations: 'boxMovement,clientBox' } },
        backButton: true,
        groups: [
            {
                title: 'Datos generales',
                icon: 'account_circle',
                details: [
                    {
                        title: 'Cuenta',
                        displayValueFn: (item) => item.client_box?.name,
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
                ]
            },
            registerDataGroupDetail(),
        ]
    }
}
