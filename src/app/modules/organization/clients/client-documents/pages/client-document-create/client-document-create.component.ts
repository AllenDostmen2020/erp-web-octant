import { Component, WritableSignal, inject, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { Contract } from '@interface/contract';
import { ItemFormConfiguration } from '@interface/itemForm';
import { ClientContractDocumentItemFormComponent } from '../../components/client-contract-document-item-form/client-contract-document-item-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventsService } from '@service/events.service';
import { StatusModel } from '@interface/baseModel';
import { addMonths, parseISO } from 'date-fns';

export interface ItemFormDocumentContractItem {
    edit?: boolean;
    inputAutoFocus?: 'period';
    contract: Contract,
    periods: number,
    description: string,
    price: number,
}

@Component({
    selector: 'app-client-document-create',
    standalone: true,
    imports: [ItemFormTemplateComponent, ClientContractDocumentItemFormComponent],
    templateUrl: './client-document-create.component.html',
    styleUrl: './client-document-create.component.scss'
})
export class ClientDocumentCreateComponent {
    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);
    private eventsService = inject(EventsService);
    private subscription?: Subscription;
    public items: WritableSignal<ItemFormDocumentContractItem[]> = signal([]);
    public formConfiguration: ItemFormConfiguration = {
        title: "Nuevo Documento",
        titleModule: "documento",
        type: "create",
        server: {
            url: 'client-document',
        },
        formGroup: new FormGroup({}),
        parseDataItemBeforeSendFormFn: (data) => {
            data.contracts = this.items().map((item) => ({ id: item.contract.id, periods: item.periods }))
            return data;
        },
    }
    ngOnInit() {
        this.subscription = this.eventsService.eventsFiltered(['add-contract-document-item']).subscribe(event => {
            this.addData(event.data);
        });

    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }

    private addData(contracts: Contract[]) {
        const newData: ItemFormDocumentContractItem[] = contracts.map(contract => {
            const { description, price } = this.getDetails(contract, 1);
            return { contract, periods: 1, description, price }
        })
        this.items.update((data) => [...data, ...newData]);
    }

    private getDetails(contract: Contract, periods: number) {
        const contractVehiclesActives = contract.contract_vehicles?.filter((contract_vehicle) => contract_vehicle.vehicle?.status == StatusModel.Habilitado);
        const platesString = contractVehiclesActives?.map(contractVehicle => contractVehicle.vehicle?.plate).join(', ');
        const nextPeriod = contract.last_contract_document_item?.end_period ? contract.last_contract_document_item?.end_period : 1;
        const startDateContract = parseISO(contract.start_date);
        const dateNextPeriod = addMonths(startDateContract, nextPeriod);
        const dateEndPeriod = addMonths(dateNextPeriod, periods);

        const meses = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        const dateStringInit = dateNextPeriod.getFullYear() == dateEndPeriod.getFullYear() ? `${dateNextPeriod.getDay()} DE ${meses[dateNextPeriod.getMonth()].toUpperCase()} ` : `${dateNextPeriod.getDay()} DE ${meses[dateNextPeriod.getMonth()].toUpperCase()} ${dateNextPeriod.getFullYear()} `;
        const dateStringEnd = `${dateEndPeriod.getDay()} DE ${meses[dateEndPeriod.getMonth()].toUpperCase()} ${dateEndPeriod.getFullYear()} `;
        const vehiclesQuantity = contractVehiclesActives?.length ?? 0;
        const price = (contract.sale_price * vehiclesQuantity);
        const description = `ALQUILER MENSUAL DE GPS POR ${vehiclesQuantity} UNIDADES - PERIODO DEL ${dateStringInit} AL ${dateStringEnd} | ${contract.plan?.name} | CONTRATO ${contract.code} | PLACAS: ${platesString}`;
        return { description, price }
    }

    // PERIODO DEL 26 DE ENERO AL 25 DE FEBRERO 2024 -> cuando son del mismo año
    // PERIODO DEL 26 DE ENERO 2024 AL 25 DE FEBRERO 2025 -> cuando son de diferente año

    public newAdd(event: Event) {
        event.preventDefault()
        const clientId = this.activatedRoute.snapshot.parent?.parent?.paramMap.get('id');
        const not_include_ids = this.items().map(item => item.contract.id);
        this.router.navigate([{ outlets: { 'route-lateral': `client/${clientId}/contract/add` } }], { state: { not_include_ids } });
    }

    public deleteItem(index: number) {
        this.items.update((data) => data.toSpliced(index, 1))
    }

    public updateDescription(index: number) {
        const item = this.items()[index];
        const description = this.getDetails(item.contract, item.periods).description;
        this.items.update((data) => data.toSpliced(index, 1, { ...item, description }));
        console.log(this.items());

    }
}
