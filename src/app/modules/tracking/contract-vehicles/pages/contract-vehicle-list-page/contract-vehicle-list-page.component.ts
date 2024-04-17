import { NgClass } from '@angular/common';
import { Component, WritableSignal, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemListConfiguration, ItemListTemplateComponent, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, routerLinkActionButton, textColumn, viewItemActionButton } from '@component/item-list-template/item-list-template.component';
import { SpinnerDefaultComponent } from '@component/spinner-default/spinner-default.component';
import { ContractPlan } from '@interface/contractPlan';
import { ContractPlanVehicle } from '@interface/contractPlanVehicle';
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
    public contractPlanIdActive = signal<null | number>(null)
    public configurationList: ItemListConfiguration<ContractPlanVehicle> = {
        title: 'Vehículos',
        createButton: {
            text: 'Instalar vehículos',
            routerLink: {
                url: '../installation/create'
            }
        },
        server: {
            url: 'contract-plan-vehicle',
            queryParams: {
                relations: 'contractPlan.plan,vehicle.vehicleType',
                contract_id: this.activatedRoute.snapshot.parent?.parent?.paramMap.get('id'),
            },
        },
        columns: signal([
            textColumn({
                title: 'Placa / Tipo',
                displayValueFn: (item) => `${item.vehicle?.plate} / ${item.vehicle?.vehicle_type?.name.toUpperCase()}`,
                gridColumn: '1fr',
            }),
            textColumn({
                title: 'Plan',
                displayValueFn: (item) => item.contract_plan?.plan?.name ?? '--',
            }),
            textColumn({
                title: 'Color',
                sort: { key: 'color' },
                displayValueFn: (item) => item.vehicle?.color ?? '--',
            }),
            textColumn({
                title: 'Marca',
                sort: { key: 'brand' },
                displayValueFn: (item) => item.vehicle?.brand ?? '--',
            }),
            textColumn({
                title: 'Modelo',
                sort: { key: 'model' },
                displayValueFn: (item) => item.vehicle?.model ?? '--',
            }),
            itemCreatedAtColumn(),
            itemUpdatedAtColumn(),
            itemStatusColumn(),
        ]),
        rows: {
            options: [
                routerLinkActionButton({
                    icon: 'visibility',
                    text: 'Ver',
                    routerLink: {
                        url: (item) => `../view/${item.vehicle?.id}`
                    },
                })
            ]
        }
    };

    ngOnInit() {
        this.getContractPlans();
    }

    private async getContractPlans() {
        const contractId = this.activatedRoute.snapshot.parent?.parent?.paramMap.get('id');
        const data = (await this.fetch.get<PaginatorData<ContractPlan>>(`contract-plan?relations=plan&contract_id=${contractId}`)).data;
        if (data.length) this.contractPlans.set(data.sort((a, b) => a.plan_id - b.plan_id));
    }

    public changeFilterPlan(contractPlanId: number | null) {
        if (contractPlanId == this.contractPlanIdActive()) return;
        this.contractPlanIdActive.set(contractPlanId);
        this.configurationList!.server!.queryParams!['contract_plan_id'] = this.contractPlanIdActive();
        this.configurationList!.updateListEvent?.emit();
    }
}
