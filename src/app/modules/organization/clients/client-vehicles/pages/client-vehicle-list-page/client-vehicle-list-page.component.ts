import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemListConfiguration, ItemListTemplateComponent, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, listFormatColumn, textColumn } from '@component/item-list-template/item-list-template.component';
import { Vehicle } from '@interface/vehicle';

@Component({
  selector: 'app-client-vehicle-list-page',
  standalone: true,
  imports: [ItemListTemplateComponent],
  templateUrl: './client-vehicle-list-page.component.html',
  styleUrl: './client-vehicle-list-page.component.scss'
})
export class ClientVehicleListPageComponent {
    private activatedRoute = inject(ActivatedRoute);
    public configList: ItemListConfiguration<Vehicle> = {
        title: 'Vehículos',
        server: {
            url: 'vehicle',
            queryParams: {
                relations: 'vehicleType,contractPlanVehicles.contractPlan.contract',
                client_id: this.activatedRoute.snapshot.parent?.parent?.paramMap.get('id')
            },
        },
        columns: signal([
            textColumn({
                title: 'Placa / Tipo',
                sort: { key: 'plate' },
                displayValueFn: (item) => `${item.plate} / ${item.vehicle_type?.name.toUpperCase()}`,
                gridColumn: '1fr',
            }),
            listFormatColumn({
                title: 'Contrato',
                displayValueFn: (item)=> item.contract_plan_vehicles!.map(item=> item.contract_plan!.contract!.code),
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
        createButton: false,
    }
}
