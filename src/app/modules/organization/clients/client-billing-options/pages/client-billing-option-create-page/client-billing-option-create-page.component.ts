import { Component, WritableSignal, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DEFAULT_DISPLAY_FIELDS_FORM_CLIENT_BILLING_OPTION, clientBillingOptionFormGroup } from '../../helpers';
import { FormControl, FormGroup } from '@angular/forms';
import { ItemFormConfiguration, ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ClientBillingOption } from '@interface/clientBillingOption';

@Component({
    selector: 'app-client-billing-option-create-page',
    standalone: true,
    imports: [ItemFormTemplateComponent, MatSlideToggleModule],
    templateUrl: './client-billing-option-create-page.component.html',
    styleUrl: './client-billing-option-create-page.component.scss'
})
export class ClientBillingOptionCreatePageComponent {
    public activatedRoute = inject(ActivatedRoute);
    public configuration: ItemFormConfiguration<ClientBillingOption> = {
        titleModule: 'opciones de facturación',
        type: 'create',
        formGroup: clientBillingOptionFormGroup({ id: Number(this.activatedRoute.parent?.parent?.snapshot.paramMap.get('id')!) }),
        fields: [...DEFAULT_DISPLAY_FIELDS_FORM_CLIENT_BILLING_OPTION],
        server: { url: 'client-billing-option' },
    };

    get data() {
        return this.configuration.dataItem!;
    }

    get formGroup(): FormGroup {
        return this.configuration.formGroup;
    }

    get retentionCtrl(): FormControl {
        return this.configuration.formGroup.get('retention') as FormControl;
    }

    ngAfterViewInit(): void {
        this.retentionCtrl.valueChanges.subscribe((value) => {
            if (!value) {
                this.formGroup.removeControl('retention_percent');
            } else {
                this.formGroup.setControl('retention_percent', new FormControl(this.data()?.retention_percent ?? 3.00));
            }
        });
    }
}
