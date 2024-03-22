import { Component } from '@angular/core';
import { ItemFormConfiguration } from '@component/item-form-template/item-form-template.component';
import { clientFormGroup } from '../../helpers';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { ClientFormComponent } from '../../components/client-form/client-form.component';

@Component({
    selector: 'app-client-create-page',
    standalone: true,
    templateUrl: './client-create-page.component.html',
    styleUrls: ['./client-create-page.component.css'],
    imports: [ItemFormTemplateComponent, ClientFormComponent]
})
export class ClientCreatePageComponent {
    public configuration: ItemFormConfiguration = {
        type: 'create',
        titleModule: 'cliente',
        formGroup: clientFormGroup(),
        server: { url: 'client' },
    };

}
