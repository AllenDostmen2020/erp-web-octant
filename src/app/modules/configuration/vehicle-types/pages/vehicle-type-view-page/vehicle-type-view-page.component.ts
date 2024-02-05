import { Component } from '@angular/core';
import { ItemViewTemplateComponent, ItemViewConfiguration } from '@component/item-view-template/item-view-template.component';

@Component({
    selector: 'app-vehicle-type-view-page',
    standalone: true,
    imports: [ItemViewTemplateComponent],
    templateUrl: './vehicle-type-view-page.component.html',
    styleUrl: './vehicle-type-view-page.component.scss'
})
export class VehicleTypeViewPageComponent {
    public config: ItemViewConfiguration = {
        server: { url: 'vehicle-type' },
        titleModule: 'Tipo de vehículo',
        links: [
            {
                routerLink: './detail',
                text: 'Detalle',
            },
        ]
    }
}
