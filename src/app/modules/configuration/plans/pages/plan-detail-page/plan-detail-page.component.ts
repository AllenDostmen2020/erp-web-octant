import { Component } from '@angular/core';
import { ItemDetailTemplateComponent, registerDataGroupDetail } from '@component/item-detail-template/item-detail-template.component';
import { ItemDetailConfiguration } from '@component/item-detail-template/item-detail-template.component';
import { Plan } from '@interface/plan';

@Component({
    selector: 'app-plan-detail-page',
    standalone: true,
    imports: [ItemDetailTemplateComponent],
    templateUrl: './plan-detail-page.component.html',
    styleUrl: './plan-detail-page.component.scss'
})
export class PlanDetailPageComponent {
    public configuration: ItemDetailConfiguration<Plan> = {
        title: 'Detalles',
        server: { url: 'plan' },
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
                        title: 'Moneda',
                        displayValueFn: (item) => item.coin.toUpperCase()
                    },
                    {
                        title: 'Precio',
                        displayValueFn: (item) => item.price
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
