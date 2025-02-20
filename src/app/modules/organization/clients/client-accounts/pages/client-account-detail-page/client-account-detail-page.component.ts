import { Component } from '@angular/core';
import { ItemDetailTemplateComponent, registerDataGroupDetail } from '@component/item-detail-template/item-detail-template.component';
import { ClientBox } from '@interface/clientBox';
import { ItemDetailConfiguration } from '@component/item-detail-template/item-detail-template.component';

@Component({
    selector: 'app-client-account-detail-page',
    standalone: true,
    imports: [ItemDetailTemplateComponent],
    templateUrl: './client-account-detail-page.component.html',
    styleUrl: './client-account-detail-page.component.scss'
})
export class ClientAccountDetailPageComponent {
    public configuration: ItemDetailConfiguration<ClientBox> = {
        title: 'Detalles',
        server: { url: 'client-box' },
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
                        title: 'Tipo',
                        displayValueFn: (item) => item.type.toLocaleUpperCase()
                    },
                    {
                        title: 'Moneda',
                        displayValueFn: (item) => item.coin.toLocaleUpperCase()
                    },
                ]
            },
            registerDataGroupDetail(),
        ]
    }
}
