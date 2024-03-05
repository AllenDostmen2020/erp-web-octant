import { Component, WritableSignal, inject, signal } from '@angular/core';
import { ItemFormConfiguration, ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { ClientDocumentPaymentFormComponent } from '../../components/client-document-payment-form/client-document-payment-form.component';
import { clientFormGroup } from '../../../helpers';
import { FetchService } from '@service/fetch.service';
import { ActivatedRoute } from '@angular/router';

export interface AmountsByClient {
    recaudation_amount: number;
    detraction_amount: number;
    retention_amount: number;
}

@Component({
    selector: 'app-client-document-payment-create',
    standalone: true,
    imports: [ItemFormTemplateComponent, ClientDocumentPaymentFormComponent],
    templateUrl: './client-document-payment-create.component.html',
    styleUrl: './client-document-payment-create.component.scss'
})
export class ClientDocumentPaymentCreateComponent {
    private fetch = inject(FetchService);
    private activatedRoute = inject(ActivatedRoute);
    public amountsByClient: WritableSignal<AmountsByClient | null> = signal(null);
    public configuration: ItemFormConfiguration = {
        type: 'create',
        titleModule: 'cliente',
        formGroup: clientFormGroup(),
        server: { url: 'client' },
    };

    ngOnInit(){
        this.getAmountsByClient();
    }

    private async getAmountsByClient(){
        console.log('cargando datos');

        const clientId = this.activatedRoute.snapshot.parent?.paramMap.get('id');
        this.amountsByClient.set((await this.fetch.get<AmountsByClient>(`client-payment/client/${clientId}`)));
        console.log(this.amountsByClient, 'datos');

    }
}
