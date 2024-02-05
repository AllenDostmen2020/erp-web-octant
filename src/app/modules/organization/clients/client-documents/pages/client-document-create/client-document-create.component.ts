import { Component, WritableSignal, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemFormConfiguration, ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { Contract } from '@interface/contract';
import { ClientContractDocumentItemFormComponent } from '../../components/client-contract-document-item-form/client-contract-document-item-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventsService } from '@service/events.service';
import { StatusModel } from '@interface/baseModel';
import { addMonths, format, parseISO, setDefaultOptions, subDays } from 'date-fns';
import { es } from 'date-fns/locale'

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
            url: 'document/contracts/generate',
        },
        formGroup: new FormGroup({
            client_id: new FormControl(this.activatedRoute.snapshot.parent?.parent?.paramMap.get('id'), [Validators.required]),
            valid_contracts: new FormControl(false, [Validators.requiredTrue]),
        }),
        parseDataItemBeforeSendFormFn: (data) => ({
            ...data,
            contracts: this.items().map((item) => ({ id: item.contract.id, periods: item.periods }))
        }),
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
        this.formConfiguration.formGroup.get('valid_contracts')?.setValue(true);
    }

    private getDetails(contract: Contract, periods: number) {
        setDefaultOptions({ locale: es })
        const contractVehiclesActives = contract.contract_vehicles?.filter((contract_vehicle) => contract_vehicle.vehicle?.status == StatusModel.Habilitado);
        const platesString = contractVehiclesActives?.map(contractVehicle => contractVehicle.vehicle?.plate).join(', ');
        const nextPeriod = contract.last_contract_document_item?.end_period ? contract.last_contract_document_item?.end_period : 1;
        const dateNextPeriod = addMonths(parseISO(contract.start_date), nextPeriod);
        const dateEndPeriod = subDays(addMonths(addMonths(parseISO(contract.start_date), nextPeriod), periods), 1);
        const dateStringInit = dateNextPeriod.getFullYear() == dateEndPeriod.getFullYear() ? format(dateNextPeriod, "dd 'DE' MMMM").toUpperCase() : format(dateNextPeriod, "dd 'DE' MMMM yyyy").toUpperCase();
        const dateStringEnd = format(dateEndPeriod, "dd 'DE' MMMM yyyy").toUpperCase();
        const vehiclesQuantity = contractVehiclesActives?.length ?? 0;
        const price = (contract.sale_price * vehiclesQuantity);
        const description = `ALQUILER MENSUAL DE GPS POR ${vehiclesQuantity} UNIDADES - PERIODO DEL ${dateStringInit} AL ${dateStringEnd} | ${contract.plan?.name} | CONTRATO ${contract.code} | PLACAS: ${platesString}`;
        return { description, price }
    }

    public newAdd(event: Event) {
        event.preventDefault()
        const clientId = this.activatedRoute.snapshot.parent?.parent?.paramMap.get('id');
        const not_include_ids = this.items().map(item => item.contract.id);
        this.router.navigate([{ outlets: { 'route-lateral': `client/${clientId}/contract/add` } }], { state: { not_include_ids } });
    }

    public deleteItem(index: number) {
        this.items.update((data) => data.toSpliced(index, 1))
        if (this.items().length == 0) this.formConfiguration.formGroup.get('valid_contracts')?.setValue(false);
    }

    public updateDescription(index: number) {
        const item = this.items()[index];
        const description = this.getDetails(item.contract, item.periods).description;
        this.items.update((data) => data.toSpliced(index, 1, { ...item, description }));
    }
}
