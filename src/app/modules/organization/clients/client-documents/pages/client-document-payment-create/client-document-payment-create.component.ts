import { Component } from '@angular/core';
import { ItemFormConfiguration, ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { ClientDocumentPaymentFormComponent } from '../../components/client-document-payment-form/client-document-payment-form.component';
import { clientFormGroup } from '../../../helpers';

@Component({
  selector: 'app-client-document-payment-create',
  standalone: true,
  imports: [ItemFormTemplateComponent, ClientDocumentPaymentFormComponent],
  templateUrl: './client-document-payment-create.component.html',
  styleUrl: './client-document-payment-create.component.scss'
})
export class ClientDocumentPaymentCreateComponent {
  public configuration: ItemFormConfiguration = {
    type: 'create',
    titleModule: 'cliente',
    formGroup: clientFormGroup(),
    server: { url: 'client' },
};
}
