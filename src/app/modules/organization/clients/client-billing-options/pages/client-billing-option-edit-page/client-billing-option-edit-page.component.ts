import { Component } from '@angular/core';
import { ClientBillingOptionCreatePageComponent } from '../client-billing-option-create-page/client-billing-option-create-page.component';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
    selector: 'app-client-billing-option-edit-page',
    standalone: true,
    imports: [ItemFormTemplateComponent, MatSlideToggleModule],
    templateUrl: './client-billing-option-edit-page.component.html',
    styleUrl: './client-billing-option-edit-page.component.scss'
})
export class ClientBillingOptionEditPageComponent extends ClientBillingOptionCreatePageComponent {
    constructor() {
        super();
        this.configuration.type = 'update';
        this.configuration.hiddeFields = true;
    }
}
