import { Component } from '@angular/core';
import { ItemDetailTemplateComponent, registerDataGroupDetail } from '@component/item-detail-template/item-detail-template.component';
import { ClientBusinessUnit } from '@interface/clientBusinessUnit';
import { ItemDetailConfiguration } from '@component/item-detail-template/item-detail-template.component';

@Component({
    selector: 'app-client-business-unit-detail-page',
    standalone: true,
    imports: [ItemDetailTemplateComponent],
    templateUrl: './client-business-unit-detail-page.component.html',
    styleUrl: './client-business-unit-detail-page.component.scss'
})
export class ClientBusinessUnitDetailPageComponent {
    public configuration: ItemDetailConfiguration<ClientBusinessUnit> = {
        title: 'Detalles',
        server: { url: 'client-business-unit' },
        groups: [
            {
                title: 'Datos generales',
                icon: 'account_circle',
                details: [
                    {
                        title: 'Nombre',
                        displayValueFn: (item) => item.name
                    },
                    {
                        title: 'Descripción',
                        displayValueFn: (item) => item.description
                    },
                ]
            },
            registerDataGroupDetail(),
        ]
    }
}
