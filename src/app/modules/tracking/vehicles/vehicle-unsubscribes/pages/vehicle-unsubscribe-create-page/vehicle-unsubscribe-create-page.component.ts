import { Component, WritableSignal, inject, signal } from '@angular/core';
import { DEFAULT_DISPLAY_FIELDS_FORM_VEHICLE, vehicleUnsubscribeFormGroup } from '../../helpers';
import { VehicleUnsubscribe, VehicleUnsubscribeProgrammingType } from '@interface/vehicleUnsubscribe';
import { ActivatedRoute } from '@angular/router';
import { FetchService } from '@service/fetch.service';
import { Contract } from '@interface/contract';
import { FormControl } from '@angular/forms';
import { ItemFormConfiguration, ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { DatePipe } from '@angular/common';
import { AlertConfiguration, AlertTemplateComponent } from '@component/alert-template/alert-template.component';

@Component({
    selector: 'app-vehicle-unsubscribe-create-page',
    standalone: true,
    imports: [ItemFormTemplateComponent, AlertTemplateComponent],
    templateUrl: './vehicle-unsubscribe-create-page.component.html',
    styleUrl: './vehicle-unsubscribe-create-page.component.scss',
    providers: [DatePipe],
})
export class VehicleUnsubscribeCreatePageComponent {
    public activatedRoute = inject(ActivatedRoute);
    private fetch = inject(FetchService);
    private datePipe = inject(DatePipe);
    public alertConfiguration?: AlertConfiguration;
    public configuration: ItemFormConfiguration<VehicleUnsubscribe> = {
        titleModule: 'baja',
        server: { url: 'vehicle-unsubscribe' },
        formGroup: vehicleUnsubscribeFormGroup({
            vehicle_id: Number(this.activatedRoute.parent?.parent?.snapshot.paramMap.get('id')!),
            start_date: new Date().toISOString(),
        }),
        type: 'create',
        fields: DEFAULT_DISPLAY_FIELDS_FORM_VEHICLE,
    };

    public contract: WritableSignal<Contract | null> = signal(null);

    get programmingTypeCtrl(): FormControl {
        return this.configuration.formGroup.get(
            'programming_type'
        )! as FormControl;
    }

    get startDateCtrl(): FormControl {
        return this.configuration.formGroup.get('start_date')! as FormControl;
    }

    get endDateCtrl(): FormControl {
        return this.configuration.formGroup.get('end_date')! as FormControl;
    }

    ngOnInit(): void {
        this.getContractInformation();
        this.programmingTypeCtrl.valueChanges.subscribe((value) => {
            if (value == VehicleUnsubscribeProgrammingType.FinDeContrato) {
                this.endDateCtrl.setValue(this.contract()?.end_date);
                this.endDateCtrl.disable();
            } else if (value == VehicleUnsubscribeProgrammingType.fechaFija) {
                this.endDateCtrl.enable();
            } else if (value == VehicleUnsubscribeProgrammingType.indefinida) {
                this.endDateCtrl.setValue('indefinido');
                this.endDateCtrl.disable();
            }
        });
    }

    private async getContractInformation() {
        const vehicleId = this.activatedRoute.parent?.parent?.snapshot.paramMap.get('id')!;
        const contract = await this.fetch.get<Contract>(`contract-from-vehicle/${vehicleId}`);
        this.contract.set(contract);
        this.alertConfiguration = {
            icon: 'warning',
            title: 'Advertencia',
            description: `Este vehículo esta en el contrato <strong>${contract.code}</strong> con fecha de validez desde el <strong>${this.datePipe.transform(contract.start_date, 'longDate')}</strong> hasta el <strong>${this.datePipe.transform(contract.end_date, 'longDate')}`
        }
    }
}
