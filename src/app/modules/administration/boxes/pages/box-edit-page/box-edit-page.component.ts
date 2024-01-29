import { Component } from '@angular/core';
import { BoxCreatePageComponent } from '../box-create-page/box-create-page.component';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { BoxFormPageComponent } from '../box-form-page/box-form-page.component';

@Component({
    selector: 'app-box-edit-page',
    standalone: true,
    imports: [ItemFormTemplateComponent, BoxFormPageComponent],
    templateUrl: './box-edit-page.component.html',
    styleUrl: './box-edit-page.component.scss'
})
export class BoxEditPageComponent extends BoxCreatePageComponent {
    constructor(
    ) {
        super();
        this.configuration.type = 'update';
        this.configuration.itemPathServer = 'box';
        this.configuration.hiddeFields = true;
    }
}
