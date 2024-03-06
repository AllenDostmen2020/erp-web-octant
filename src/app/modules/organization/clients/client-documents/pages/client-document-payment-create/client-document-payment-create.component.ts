import { Component, Signal, WritableSignal, inject, signal } from '@angular/core';
import { ItemFormConfiguration, ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { ClientDocumentPaymentFormComponent } from '../../components/client-document-payment-form/client-document-payment-form.component';
import { clientFormGroup } from '../../../helpers';
import { FetchService } from '@service/fetch.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { from } from 'rxjs';
import { DecimalPipe } from '@angular/common';

export interface AmountsByClient {
    recaudation_amount: number;
    detraction_amount: number;
    retention_amount: number;
}

@Component({
    selector: 'app-client-document-payment-create',
    standalone: true,
    imports: [ItemFormTemplateComponent, ClientDocumentPaymentFormComponent, DecimalPipe],
    templateUrl: './client-document-payment-create.component.html',
    styleUrl: './client-document-payment-create.component.scss'
})
export class ClientDocumentPaymentCreateComponent {
    private fetch = inject(FetchService);
    private activatedRoute = inject(ActivatedRoute);
    public amountsByClient = toSignal(from(this.fetch.get<AmountsByClient>(`client-payment/client/${this.activatedRoute.snapshot.parent?.paramMap.get('id')}`)))
    public configuration: ItemFormConfiguration = {
        type: 'create',
        titleModule: 'cliente',
        formGroup: clientFormGroup(),
        server: { url: 'client' },
    };
}
