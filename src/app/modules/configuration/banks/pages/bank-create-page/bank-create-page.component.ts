import { Component } from '@angular/core';
import { ItemFormConfiguration, ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { DEFAULT_DISPLAY_FIELDS_FORM_BANK, bankFormGroup } from '../../helpers';

@Component({
  selector: 'app-bank-create-page',
  standalone: true,
  imports: [ItemFormTemplateComponent],
  templateUrl: './bank-create-page.component.html',
  styleUrl: './bank-create-page.component.scss'
})
export class BankCreatePageComponent {
  public configuration: ItemFormConfiguration = {
    type: 'create',
    titleModule: 'banco',
    formGroup: bankFormGroup(),
    fields: DEFAULT_DISPLAY_FIELDS_FORM_BANK,
    server: { url: 'bank' },
  };
}
