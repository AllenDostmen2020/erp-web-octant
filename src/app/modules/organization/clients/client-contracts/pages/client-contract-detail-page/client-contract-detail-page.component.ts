import { Component } from '@angular/core';
import { ItemDetailTemplateComponent, registerDataGroupDetail } from '@component/item-detail-template/item-detail-template.component';
import { Contract } from '@interface/contract';
import { ItemDetailConfiguration } from '@interface/itemDetail';

@Component({
  selector: 'app-client-contract-detail-page',
  standalone: true,
  imports: [ItemDetailTemplateComponent],
  templateUrl: './client-contract-detail-page.component.html',
  styleUrl: './client-contract-detail-page.component.scss'
})
export class ClientContractDetailPageComponent {
    public configuration: ItemDetailConfiguration<Contract> = {
        title: 'Detalles',
        subtitle: false,
        itemPathServer: 'contract',
        queryParams: 'relations=plan,clientBusinessUnit',
        backButton: false,
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
                        title: 'Unidad de negocio',
                        displayValueFn: (item) => item.client_business_unit?.name
                    },
                    {
                        title: 'Plan',
                        displayValueFn: (item) => item.plan?.name
                    },
                    {
                        title: 'Fecha de instalación',
                        displayValueFn: (item) => item.installation_date,
                        type: 'date',
                    },
                    {
                        title: 'Fecha de inicio',
                        displayValueFn: (item) => item.start_date,
                        type: 'date',
                    },
                    {
                        title: 'Fecha de fin',
                        displayValueFn: (item) => item.end_date,
                        type: 'date',
                    },
                    {
                        title: 'Periodo',
                        displayValueFn: (item) => item.period
                    },
                    {
                        title: 'Cantidad',
                        displayValueFn: (item) => item.quantity,
                    },
                    {
                        title: 'Precio de compra',
                        displayValueFn: (item) => item.buy_price,
                        type: 'currency',
                    },
                    {
                        title: 'Precio de venta',
                        displayValueFn: (item) => item.sale_price,
                        type: 'currency',
                    },
                    {
                        title: 'Precio de instalación',
                        displayValueFn: (item) => item.installation_price,
                        type: 'currency',
                    },
                    {
                        title: 'Recurrente de pago',
                        displayValueFn: (item) => item.recurrent_type.toUpperCase(),
                    },
                ]
            },
            registerDataGroupDetail(),
        ]
    }
}
