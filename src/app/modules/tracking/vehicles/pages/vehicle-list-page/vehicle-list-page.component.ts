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
            queryParams: { 
                relations: 'client,vehicleType,latestContractPlanVehicle.contractPlan.contract'
            },
        },
        columns: signal([
            textColumn({
                title: 'Placa / Tipo',
                sort: { key: 'plate' },
                routerLinkValue: { url: (item) => `../view/${item.id}` },
                displayValueFn: (item) => `${item.plate} / ${item.vehicle_type?.name.toUpperCase()}`,
                gridColumn: 'fit-content(250px)',
            }),
            textColumn({
                title: 'Cliente',
                gridColumn: 'fit-content(250px)',
                routerLinkValue: { url: (item) => `/organization/client/view/${item.client_id}` },
                displayValueFn: (item) => item?.client?.name ? item.client?.name : '--',
            }),
            textColumn({
                title: 'Contrato',
                displayValueFn: (item) => item?.latest_contract_plan_vehicle?.contract_plan?.contract?.code,
                gridColumn: 'fit-content(250px)',
                routerLinkValue: { url: (item) => `/tracking/contract/view/${item.latest_contract_plan_vehicle?.contract_plan?.contract_id}` },
            }),
            textColumn({
                title: 'Plan',
                displayValueFn: (item) => item.latest_contract_plan_vehicle?.contract_plan?.plan?.name ?? '--',
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
            textColumn({
                title: 'Modelo',
                sort: { key: 'model' },
                displayValueFn: (item) => item.model ?? '--',
            }),
            itemCreatedAtColumn(),
            itemUpdatedAtColumn(),
            itemStatusColumn(),
        ]),
        createButton: false,
    }
}
