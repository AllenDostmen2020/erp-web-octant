import { Component } from '@angular/core';
import { ItemDetailTemplateComponent, registerDataGroupDetail } from '@component/item-detail-template/item-detail-template.component';
import { Client } from '@interface/client';
import { ItemDetailConfiguration } from '@component/item-detail-template/item-detail-template.component';

@Component({
  selector: 'app-client-detail-page',
  standalone: true,
  imports: [ItemDetailTemplateComponent],
  templateUrl: './client-detail-page.component.html',
  styleUrl: './client-detail-page.component.scss'
})
export class ClientDetailPageComponent {
    public configuration: ItemDetailConfiguration<Client> = {
        title: 'Detalles',
        subtitle: false,
        server: { url: 'client' },
        backButton: false,
        editButton: false,
        deleteButton: false,
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
