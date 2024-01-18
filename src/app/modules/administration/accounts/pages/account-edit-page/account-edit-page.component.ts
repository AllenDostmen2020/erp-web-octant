import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private activatedRoute = inject(ActivatedRoute);

    constructor(
    ) {
        super();
        this.configuration.type = 'update';
        this.configuration.itemPathServer = 'account';
        this.configuration.itemQueryParamsString = 'relations=bank',
        this.configuration.itemId = this.activatedRoute.snapshot.paramMap.get('id')!;
        this.configuration.hiddeFields = true;
    }
}
