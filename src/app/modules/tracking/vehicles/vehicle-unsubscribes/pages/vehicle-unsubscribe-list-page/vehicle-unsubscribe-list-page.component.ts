import { Component, signal } from '@angular/core';
import { ItemListConfiguration, ItemListTemplateComponent, dateColumn, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, textColumn } from '@component/item-list-template/item-list-template.component';
import { VehicleUnsubscribe } from '@interface/vehicleUnsubscribe';

@Component({
  selector: 'app-vehicle-unsubscribe-list-page',
  standalone: true,
  imports: [ItemListTemplateComponent],
  templateUrl: './vehicle-unsubscribe-list-page.component.html',
  styleUrl: './vehicle-unsubscribe-list-page.component.scss'
})
export class VehicleUnsubscribeListPageComponent {
    public configList: ItemListConfiguration<VehicleUnsubscribe> = {
        title: 'Vehículos de baja',
        server: {
            url: 'vehicle-unsubscribe',
            queryParams: 'relations=user',
        },
        columns: signal([
            textColumn({
                title: 'Usuario',
                routerLinkValue: { url: (item) => `../detail/${item.id}` },
                gridColumn: '1fr',
                displayValueFn: (item) => item?.user?.name ? item.user?.name : '--',
            }),
            textColumn({
                title: 'Tipo de programación',
                gridColumn: 'auto',
                displayValueFn: (item) => item.programming_type.toUpperCase(),
            }),
            textColumn({
                title: 'Motivo',
                gridColumn: 'auto',
                displayValueFn: (item) => item.reason,
            }),
            dateColumn({
                title: 'Fecha de inicio',
                gridColumn: 'auto',
                displayValueFn: (item) => item.start_date,
            }),
            dateColumn({
                title: 'Fecha de fin',
                gridColumn: 'auto',
                displayValueFn: (item) => item.end_date,
            }),
            itemCreatedAtColumn(),
            itemUpdatedAtColumn(),
            itemStatusColumn(),
        ]),
    }
}
