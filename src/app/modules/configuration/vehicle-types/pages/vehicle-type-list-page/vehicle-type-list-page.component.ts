import { Component, signal } from '@angular/core';
import { ItemListTemplateComponent, imageColumn } from '@component/item-list-template/item-list-template.component';
import { ItemListConfiguration, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, textColumn } from '@component/item-list-template/item-list-template.component';
import { VehicleType } from '@interface/vehicleType';

@Component({
    selector: 'app-vehicle-type-list-page',
    standalone: true,
    imports: [ItemListTemplateComponent],
    templateUrl: './vehicle-type-list-page.component.html',
    styleUrl: './vehicle-type-list-page.component.scss'
})
export class VehicleTypeListPageComponent {
    public configList: ItemListConfiguration<VehicleType> = {
        title: 'Tipos de vehículo',
        server: {
            url: 'vehicle-type',
        },
        columns: signal([
            imageColumn({
                title: 'Imagen',
                displayValueFn: (item) => item.image,
            }),
            textColumn({
                title: 'Nombre',
                sort: { key: 'name' },
                routerLinkValue: { url: (item) => `../view/${item.id}` },
                gridColumn: '1fr',
                displayValueFn: (item) => item?.name ? item.name : '--',
            }),
            itemCreatedAtColumn(),
            itemUpdatedAtColumn(),
            itemStatusColumn(),
        ]),
    }
}
