import { Component } from '@angular/core';
import { ClientAccountCreatePageComponent } from '../client-account-create-page/client-account-create-page.component';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';

@Component({
  selector: 'app-client-account-edit-page',
  standalone: true,
  imports: [ItemFormTemplateComponent],
  templateUrl: './client-account-edit-page.component.html',
  styleUrl: './client-account-edit-page.component.scss'
})
export class ClientAccountEditPageComponent extends ClientAccountCreatePageComponent{
    constructor(
    ) {
        super();
        this.configuration.type = 'update';
        this.configuration.hiddeFields = true;
    }
}
