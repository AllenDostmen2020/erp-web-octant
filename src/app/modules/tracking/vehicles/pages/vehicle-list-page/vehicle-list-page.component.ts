import { Component, signal } from '@angular/core';
import { ItemListTemplateComponent, ItemListConfiguration, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, textColumn } from '@component/item-list-template/item-list-template.component';
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
        server: {
            url: 'vehicle',
            queryParams: { relations: 'client,vehicleType' },
        },
        columns: signal([
            textColumn({
                title: 'Placa / Tipo',
                sort: { key: 'plate' },
                routerLinkValue: { url: (item) => `../view/${item.id}` },
                displayValueFn: (item) => `${item.plate} / ${item.vehicle_type?.name.toUpperCase()}`,
            }),
            textColumn({
                title: 'Cliente',
                gridColumn: '1fr',
                displayValueFn: (item) => item?.client?.name ? item.client?.name : '--',
            }),
            textColumn({
                title: 'Color',
                sort: { key: 'color' },
                displayValueFn: (item) => item.color ?? '--',
            }),
            textColumn({
                title: 'Marca',
                sort: { key: 'brand' },
                displayValueFn: (item) => item.brand ?? '--',
            }),
            itemCreatedAtColumn(),
            itemUpdatedAtColumn(),
            itemStatusColumn(),
        ]),
    }
}
