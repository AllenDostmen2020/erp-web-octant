import { Component, inject } from '@angular/core';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { ItemFormConfiguration } from '@component/item-form-template/item-form-template.component';
import { ClientPaymentFormPageComponent } from '../../components/client-payment-form-page/client-payment-form-page.component';
import { clientPaymentFormGroup } from '../../helpers';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-client-payment-create-page',
    standalone: true,
    imports: [ItemFormTemplateComponent, ClientPaymentFormPageComponent],
    templateUrl: './client-payment-create-page.component.html',
    styleUrl: './client-payment-create-page.component.scss'
})
export class ClientPaymentCreatePageComponent {
    private activatedRoute = inject(ActivatedRoute);
    public configuration: ItemFormConfiguration = {
        type: 'create',
        titleModule: 'pagos',
        formGroup: clientPaymentFormGroup({
            client_id: Number(this.activatedRoute.snapshot.parent?.parent?.paramMap.get('id')) ?? null,
        }),
        server: { url: 'client-payment' },
    };
}
