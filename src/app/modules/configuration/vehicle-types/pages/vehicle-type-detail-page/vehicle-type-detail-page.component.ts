import { Component } from '@angular/core';
import { ItemDetailTemplateComponent, registerDataGroupDetail } from '@component/item-detail-template/item-detail-template.component';
import { ItemDetailConfiguration } from '@interface/itemDetail';
import { VehicleType } from '@interface/vehicleType';

@Component({
    selector: 'app-vehicle-type-detail-page',
    standalone: true,
    imports: [ItemDetailTemplateComponent],
    templateUrl: './vehicle-type-detail-page.component.html',
    styleUrl: './vehicle-type-detail-page.component.scss'
})
export class VehicleTypeDetailPageComponent {
    public configuration: ItemDetailConfiguration<VehicleType> = {
        title: 'Detalles',
        server: { url: 'vehicle-type' },
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
