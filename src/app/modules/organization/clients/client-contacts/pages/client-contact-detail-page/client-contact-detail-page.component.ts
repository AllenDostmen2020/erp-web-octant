import { Component } from '@angular/core';
import { ItemDetailTemplateComponent, registerDataGroupDetail } from '@component/item-detail-template/item-detail-template.component';
import { ClientContact } from '@interface/clientContact';
import { ItemDetailConfiguration } from '@interface/itemDetail';

@Component({
    selector: 'app-client-contact-detail-page',
    standalone: true,
    imports: [ItemDetailTemplateComponent],
    templateUrl: './client-contact-detail-page.component.html',
    styleUrl: './client-contact-detail-page.component.scss'
})
export class ClientContactDetailPageComponent {
    public configuration: ItemDetailConfiguration<ClientContact> = {
        title: 'Detalles',
        subtitle: false,
        server: { url: 'client-contact' },
        backButton: false,
        groups: [
            {
                title: 'Datos generales',
                icon: 'account_circle',
                details: [
                    {
                        title: 'T. Documento',
                        displayValueFn: (item) => item.document_type.toUpperCase()
                    },
                    {
                        title: 'N° Documento',
                        displayValueFn: (item) => item.document_number
                    },
                    {
                        title: 'Nombre',
                        displayValueFn: (item) => item.name
                    },
                    {
                        title: 'Dirección',
                        displayValueFn: (item) => item.address
                    },
                    {
                        title: 'Teléfono',
                        displayValueFn: (item) => item.phone,
                        type: 'phone'
                    },
                    {
                        title: 'Email',
                        displayValueFn: (item) => item.email,
                        type: 'email',
                    },
                ]
            },
            registerDataGroupDetail(),
        ]
    }
}
