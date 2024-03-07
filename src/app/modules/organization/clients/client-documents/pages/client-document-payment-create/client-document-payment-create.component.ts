import { Component, inject } from '@angular/core';
import { ItemFormConfiguration, ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { ClientDocumentPaymentFormComponent } from '../../components/client-document-payment-form/client-document-payment-form.component';
import { FetchService } from '@service/fetch.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { from } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface ClientAmounts {
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
    public clientAmounts = toSignal(from(this.fetch.get<ClientAmounts>(`client-payment/client/${this.activatedRoute.snapshot.parent?.paramMap.get('id')}`)))
    public configuration: ItemFormConfiguration = {
        type: 'create',
        titleModule: 'Comprobantes',
        title: 'Pagar comprobantes',
        formGroup: new FormGroup({
            document_ids: new FormControl<null | []>(null, [Validators.required]),
        }),
        server: { url: 'client' },
    };
}
