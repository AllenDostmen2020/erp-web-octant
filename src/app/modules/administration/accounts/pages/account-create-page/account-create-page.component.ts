import { Component } from '@angular/core';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { ItemFormConfiguration } from '@interface/itemForm';
import { DEFAULT_DISPLAY_FIELDS_FORM_ACCOUNT, accountFormGroup } from '../../helpers';

@Component({
  selector: 'app-account-create-page',
  standalone: true,
  imports: [ItemFormTemplateComponent],
  templateUrl: './account-create-page.component.html',
  styleUrl: './account-create-page.component.scss'
})
export class AccountCreatePageComponent {
    public configuration: ItemFormConfiguration = {
        type: 'create',
        titleModule: 'cuenta',
        formGroup: accountFormGroup(),
        fields: DEFAULT_DISPLAY_FIELDS_FORM_ACCOUNT,
        pathServer: 'account',
    };
}
