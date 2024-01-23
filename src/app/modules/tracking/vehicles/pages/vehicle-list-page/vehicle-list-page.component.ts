import { Component, signal } from '@angular/core';
import { ItemListTemplateComponent } from '@component/item-list-template/item-list-template.component';
import { ItemListConfiguration, defaultCreatedAtColumn, defaultStatusColumn, defaultUpdatedAtColumn, textColumn } from '@interface/itemList';
import { Vehicle } from '@interface/vehicle';

@Component({
  selector: 'app-vehicle-list-page',
  standalone: true,
  imports: [ItemListTemplateComponent],
  templateUrl: './vehicle-list-page.component.html',
  styleUrl: './vehicle-list-page.component.scss'
})
export class VehicleListPageComponent {
    public configList: ItemListConfiguration<Vehicle> = {
        title: 'Vehículos',
        serverUrl: 'vehicle',
        queryParams: 'relations=client,vehicleType',
        columns: signal([
            textColumn({
                title: 'Cliente',
                routerLinkValue: { url: (item) => `../view/${item.id}` },
                gridColumn: '1fr',
                displayValueFn: (item) => item?.client?.name ? item.client?.name : '--',
            }),
            textColumn({
                title: 'Tipo de vehículo',
                gridColumn: 'auto',
                displayValueFn: (item) => item.vehicle_type?.name,
            }),
            textColumn({
                title: 'Placa',
                sort: { key: 'plate' },
                gridColumn: 'auto',
                displayValueFn: (item) => item.plate,
            }),
            textColumn({
                title: 'Color',
                sort: { key: 'color' },
                gridColumn: 'auto',
                displayValueFn: (item) => item.color,
            }),
            textColumn({
                title: 'Marca',
                sort: { key: 'brand' },
                gridColumn: 'auto',
                displayValueFn: (item) => item.brand,
            }),
            defaultCreatedAtColumn(),
            defaultUpdatedAtColumn(),
            defaultStatusColumn(),
        ]),
    }
}
