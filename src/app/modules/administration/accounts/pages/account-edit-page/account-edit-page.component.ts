import { Component, inject } from '@angular/core';
import { AccountCreatePageComponent } from '../account-create-page/account-create-page.component';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';

@Component({
  selector: 'app-account-edit-page',
  standalone: true,
  imports: [ItemFormTemplateComponent],
  templateUrl: './account-edit-page.component.html',
  styleUrl: './account-edit-page.component.scss'
})
export class AccountEditPageComponent extends AccountCreatePageComponent{
    constructor(
    ) {
        super();
        this.configuration.type = 'update';
        this.configuration.server.itemQueryParams = {relations: 'bank'},
        this.configuration.hiddeFields = true;
    }
}
