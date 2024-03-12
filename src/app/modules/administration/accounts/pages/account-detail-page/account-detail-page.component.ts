import { Component } from '@angular/core';
import { ItemDetailTemplateComponent, registerDataGroupDetail } from '@component/item-detail-template/item-detail-template.component';
import { Account } from '@interface/account';
import { ItemDetailConfiguration } from '@component/item-detail-template/item-detail-template.component';

@Component({
    selector: 'app-account-detail-page',
    standalone: true,
    imports: [ItemDetailTemplateComponent],
    templateUrl: './account-detail-page.component.html',
    styleUrl: './account-detail-page.component.scss'
})
export class AccountDetailPageComponent {
    public configuration: ItemDetailConfiguration<Account> = {
        title: 'Detalles',
        server: {
            url: 'account',
            queryParams: { relations: 'bank', },
        },
        groups: [
            {
                title: 'Datos generales',
                icon: 'account_circle',
                details: [
                    {
                        title: 'Banco',
                        displayValueFn: (item) => item.bank?.name
                    },
                    {
                        title: 'Número de cuenta',
                        displayValueFn: (item) => item.number
                    },
                    {
                        title: 'Nombre',
                        displayValueFn: (item) => item.name
                    },
                    {
                        title: 'Moneda',
                        displayValueFn: (item) => item.coin.toUpperCase()
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
