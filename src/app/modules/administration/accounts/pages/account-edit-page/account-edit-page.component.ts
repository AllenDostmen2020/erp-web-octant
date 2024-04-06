import { Component, inject } from '@angular/core';
import { AccountCreatePageComponent } from '../account-create-page/account-create-page.component';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { FormControl } from '@angular/forms';

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
        this.configuration.hiddeFields = true;
    }

    ngOnInit(): void {
      this.bankCtrl.disable();
      this.bankCtrl.clearValidators();
      this.bankIdCtrl.disable();
      this.bankIdCtrl.clearValidators();
    }

    get bankCtrl(): FormControl {
        return this.configuration.formGroup.get('bank') as FormControl;
    }

    get bankIdCtrl(): FormControl {
        return this.configuration.formGroup.get('bank_id') as FormControl;
    }
}
