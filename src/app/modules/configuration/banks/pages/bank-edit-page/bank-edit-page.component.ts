import { Component, inject } from '@angular/core';
import { BankCreatePageComponent } from '../bank-create-page/bank-create-page.component';
import { ActivatedRoute } from '@angular/router';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';

@Component({
    selector: 'app-bank-edit-page',
    standalone: true,
    imports: [ItemFormTemplateComponent],
    templateUrl: './bank-edit-page.component.html',
    styleUrl: './bank-edit-page.component.scss'
})
export class BankEditPageComponent extends BankCreatePageComponent {
    private activatedRoute = inject(ActivatedRoute);

    constructor(
    ) {
        super();
        this.configuration.type = 'update';
        this.configuration.itemPathServer = 'bank';
        this.configuration.itemId = this.activatedRoute.snapshot.paramMap.get('id')!;
        this.configuration.hiddeFields = true;
    }
}
