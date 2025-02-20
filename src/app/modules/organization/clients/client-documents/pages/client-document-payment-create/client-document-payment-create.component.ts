import { Component, inject } from '@angular/core';
import { ItemFormConfiguration, ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { ClientDocumentPaymentFormComponent } from '../../components/client-document-payment-form/client-document-payment-form.component';
import { FetchService } from '@service/fetch.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { from, map } from 'rxjs';
import { DecimalPipe, UpperCasePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientBox } from '@interface/clientBox';
import { PaginatorData } from '@interface/paginator';


@Component({
    selector: 'app-client-document-payment-create',
    standalone: true,
    imports: [ItemFormTemplateComponent, ClientDocumentPaymentFormComponent, DecimalPipe, UpperCasePipe],
    templateUrl: './client-document-payment-create.component.html',
    styleUrl: './client-document-payment-create.component.scss'
})
export class ClientDocumentPaymentCreateComponent {
    private fetch = inject(FetchService);
    private activatedRoute = inject(ActivatedRoute);
    public clientBoxes = toSignal(from(this.fetch.get<PaginatorData<ClientBox>>(`client-box?client_id=${this.activatedRoute.snapshot.parent?.paramMap.get('id')}`)).pipe(map(value=> value.data)))
    public configuration: ItemFormConfiguration = {
        type: 'create',
        titleModule: 'Comprobantes',
        title: 'Pagar comprobantes',
        formGroup: new FormGroup({
            document_ids: new FormControl<null | []>(null, [Validators.required]),
            client_id: new FormControl(this.activatedRoute.snapshot.parent?.paramMap.get('id')),
        }),
        server: { url: 'client-payment-document' },
    };
}
