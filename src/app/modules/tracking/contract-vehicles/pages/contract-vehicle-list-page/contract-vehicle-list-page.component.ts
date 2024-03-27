import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemListConfiguration, ItemListTemplateComponent, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, textColumn } from '@component/item-list-template/item-list-template.component';
import { SpinnerDefaultComponent } from '@component/spinner-default/spinner-default.component';
import { ContractPlan } from '@interface/contractPlan';
import { PaginatorData } from '@interface/paginator';
import { Vehicle } from '@interface/vehicle';
import { FetchService } from '@service/fetch.service';

@Component({
  selector: 'app-contract-vehicle-list-page',
  standalone: true,
  imports: [ItemListTemplateComponent, SpinnerDefaultComponent, NgClass],
  templateUrl: './contract-vehicle-list-page.component.html',
  styleUrl: './contract-vehicle-list-page.component.scss'
})
export class ContractVehicleListPageComponent {
    private fetch = inject(FetchService);
    private activatedRoute = inject(ActivatedRoute);
    public contractPlans = signal<ContractPlan[]>([]);
    public configurationList?: ItemListConfiguration<Vehicle>;
    public contractPlanIdActive = signal<null|number>(null)

    ngOnInit() {
        this.getContractPlans();
    }

    private async getContractPlans() {
        const contractId = this.activatedRoute.snapshot.parent?.parent?.paramMap.get('id');
        const data = (await this.fetch.get<PaginatorData<ContractPlan>>(`contract-plan?relations=plan&contract_id=${contractId}`)).data;
        if(data.length) {
            this.setConfigurationList(data[0]);
            this.contractPlans.set(data);
        }
    }

    private setConfigurationList(contractPlan: ContractPlan) {
        this.contractPlanIdActive.set(contractPlan.id);
        this.configurationList = {
            title: 'Vehículos',
            server: {
                url: 'vehicle',
                queryParams: {
                    relations: 'client,vehicleType,latestContractPlanVehicle.contractPlan.plan',
                    contract_plan_id: contractPlan.id
                },
            },
            columns: signal([
                textColumn({
                    title: 'Placa / Tipo',
                    sort: { key: 'plate' },
                    displayValueFn: (item) => `${item.plate} / ${item.vehicle_type?.name.toUpperCase()}`,
                    gridColumn: '1fr',
                }),
                textColumn({
                    title: 'Cliente',
                    gridColumn: 'fit-content(250px)',
                    displayValueFn: (item) => item?.client?.name ? item.client?.name : '--',
                }),
                textColumn({
                    title: 'Color',
                    sort: { key: 'color' },
                    displayValueFn: (item) => item.color ?? '--',
                }),
                textColumn({
                    title: 'Plan',
                    displayValueFn: (item) => item.latest_contract_plan_vehicle?.contract_plan?.plan?.name ?? '--',
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

    public changeFilterPlan(contractPlan: ContractPlan) {
        if(contractPlan.id == this.contractPlanIdActive()) return;
        this.contractPlanIdActive.set(contractPlan.id);
        this.configurationList!.server!.queryParams!['contract_plan_id'] = contractPlan.id;
        this.configurationList!.updateListEvent?.emit();
    }
}
