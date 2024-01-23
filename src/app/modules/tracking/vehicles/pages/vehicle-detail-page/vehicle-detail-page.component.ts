import { Component, inject } from '@angular/core';
import { ItemDetailTemplateComponent, registerDataGroupDetail } from '@component/item-detail-template/item-detail-template.component';
import { ItemDetailConfiguration } from '@interface/itemDetail';
import { Vehicle } from '@interface/vehicle';

@Component({
  selector: 'app-vehicle-detail-page',
  standalone: true,
  imports: [ItemDetailTemplateComponent],
  templateUrl: './vehicle-detail-page.component.html',
  styleUrl: './vehicle-detail-page.component.scss'
})
export class VehicleDetailPageComponent {
    public configuration: ItemDetailConfiguration<Vehicle> = {
        title: 'Detalles',
        itemPathServer: 'vehicle',
        queryParams: 'relations=client,vehicleType',
        subtitle: false,
        groups: [
            {
                title: 'Datos generales',
                icon: 'account_circle',
                details: [
                    {
                        title: 'Cliente',
                        displayValueFn: (item) => item.client?.name
                    },
                    {
                        title: 'Tipo de vehículo',
                        displayValueFn: (item) => item.vehicle_type?.name,
                    },
                    {
                        title: 'Placa',
                        displayValueFn: (item) => item.plate
                    },
                    {
                        title: 'Color',
                        displayValueFn: (item) => item.color
                    },
                    {
                        title: 'Modelo',
                        displayValueFn: (item) => item.model
                    },
                    {
                        title: 'Año',
                        displayValueFn: (item) => item.year
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
