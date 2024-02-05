import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { ItemFormConfiguration } from '@component/item-form-template/item-form-template.component';
import { ClientPaymentFormPageComponent } from '../../components/client-payment-form-page/client-payment-form-page.component';

@Component({
  selector: 'app-client-payment-create-page',
  standalone: true,
  imports: [ItemFormTemplateComponent, ClientPaymentFormPageComponent],
  templateUrl: './client-payment-create-page.component.html',
  styleUrl: './client-payment-create-page.component.scss'
})
export class ClientPaymentCreatePageComponent {
    public configuration: ItemFormConfiguration = {
        type: 'create',
        titleModule: 'pagos',
        formGroup: new FormGroup({
            account_id: new FormControl(''),
            type: new FormControl('', [Validators.required]),
            name: new FormControl('', [Validators.required]),
            description: new FormControl(''),
            coin: new FormControl(''),
        }),
        server: { url: 'client-payment' },
    };
}
