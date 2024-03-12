import { Component } from '@angular/core';
import { ItemDetailTemplateComponent, registerDataGroupDetail } from '@component/item-detail-template/item-detail-template.component';
import { Bank } from '@interface/bank';
import { ItemDetailConfiguration } from '@component/item-detail-template/item-detail-template.component';

@Component({
    selector: 'app-bank-detail-page',
    standalone: true,
    imports: [ItemDetailTemplateComponent],
    templateUrl: './bank-detail-page.component.html',
    styleUrl: './bank-detail-page.component.scss'
})
export class BankDetailPageComponent {
    public configuration: ItemDetailConfiguration<Bank> = {
        title: 'Detalles',
        server: { url: 'bank' },
        groups: [
            {
                title: 'Datos generales',
                icon: 'account_circle',
                details: [
                    {
                        title: 'Código',
                        displayValueFn: (item) => item.code
                    },
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
