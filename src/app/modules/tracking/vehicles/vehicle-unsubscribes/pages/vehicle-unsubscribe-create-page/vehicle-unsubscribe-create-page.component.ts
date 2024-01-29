import { Component, WritableSignal, inject, signal } from '@angular/core';
import { DEFAULT_DISPLAY_FIELDS_FORM_VEHICLE, vehicleUnsubscribeFormGroup } from '../../helpers';
import { ItemFormConfiguration } from '@interface/itemForm';
import { VehicleUnsubscribe, VehicleUnsubscribeProgrammingType } from '@interface/vehicleUnsubscribe';
import { ActivatedRoute } from '@angular/router';
import { FetchService } from '@service/fetch.service';
import { Contract } from '@interface/contract';
import { FormControl } from '@angular/forms';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-vehicle-unsubscribe-create-page',
    standalone: true,
    imports: [ItemFormTemplateComponent, DatePipe],
    templateUrl: './vehicle-unsubscribe-create-page.component.html',
    styleUrl: './vehicle-unsubscribe-create-page.component.scss'
})
export class VehicleUnsubscribeCreatePageComponent {
    public activatedRoute = inject(ActivatedRoute);
    private fetch = inject(FetchService);

    public configuration: ItemFormConfiguration<VehicleUnsubscribe> = {
        titleModule: 'baja',
        pathServer: 'vehicle-unsubscribe',
        formGroup: vehicleUnsubscribeFormGroup(
            {
                vehicle_id: Number(this.activatedRoute.parent?.parent?.snapshot.paramMap.get('id')!),
                start_date: new Date().toISOString(),
            }
        ),
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
        this.contract?.set(contract);
    }
}
