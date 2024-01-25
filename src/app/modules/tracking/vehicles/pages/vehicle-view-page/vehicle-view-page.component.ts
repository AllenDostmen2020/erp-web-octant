import { Component } from '@angular/core';
import { ItemViewTemplateComponent } from '@component/item-view-template/item-view-template.component';
import { ItemViewConfiguration } from '@interface/itemView';
import { Vehicle } from '@interface/vehicle';

@Component({
    selector: 'app-vehicle-view-page',
    standalone: true,
    imports: [ItemViewTemplateComponent],
    templateUrl: './vehicle-view-page.component.html',
    styleUrl: './vehicle-view-page.component.scss'
})
export class VehicleViewPageComponent {
    public configuration: ItemViewConfiguration<Vehicle> = {
        titleModule: 'Vehículo',
        itemPathServer: 'vehicle',
        queryParams: { relations: 'client' },
        nameItemFn: (item) => `${item.plate} - ${item.client?.name}`,
        links: [
            {
                text: 'Detalles',
                routerLink: './detail',
            },
            {
                text: 'Vehículos de baja',
                routerLink: './vehicle-unsubscribe',
            },
        ]
    }
}
