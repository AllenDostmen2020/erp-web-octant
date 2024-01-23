import { Component, signal } from '@angular/core';
import { ItemListTemplateComponent } from '@component/item-list-template/item-list-template.component';
import { ItemListConfiguration, defaultCreatedAtColumn, defaultStatusColumn, defaultUpdatedAtColumn, textColumn } from '@component/item-list-template/item-list-template.component';
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
        serverUrl: 'vehicle-type',
        columns: signal([
            textColumn({
                title: 'Nombre',
                sort: { key: 'name' },
                routerLinkValue: { url: (item) => `../view/${item.id}` },
                gridColumn: '1fr',
                displayValueFn: (item) => item?.name ? item.name : '--',
            }),
            defaultCreatedAtColumn(),
            defaultUpdatedAtColumn(),
            defaultStatusColumn(),
        ]),
    }
}
