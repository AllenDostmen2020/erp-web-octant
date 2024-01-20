import { Component } from '@angular/core';
import { ItemDetailTemplateComponent, registerDataGroupDetail } from '@component/item-detail-template/item-detail-template.component';
import { ClientBusinessUnit } from '@interface/clientBusinessUnit';
import { ItemDetailConfiguration } from '@interface/itemDetail';

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
        itemPathServer: 'client-business-unit',
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
