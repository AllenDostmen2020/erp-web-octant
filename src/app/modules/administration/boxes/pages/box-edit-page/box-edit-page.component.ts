import { Component } from '@angular/core';
import { BoxCreatePageComponent } from '../box-create-page/box-create-page.component';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { BoxFormPageComponent } from '../box-form-page/box-form-page.component';
import { FormControl } from '@angular/forms';

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
        this.configuration.hiddeFields = true;
    }

    get coinCrtl(): FormControl {
        return this.configuration.formGroup.get('coin') as FormControl;
    }
    get typeCrtl(): FormControl {
        return this.configuration.formGroup.get('type') as FormControl;
    }

    ngOnInit(){
        this.coinCrtl.disable();
        this.coinCrtl.clearValidators();
        this.typeCrtl.disable();
        this.typeCrtl.clearValidators();
    }
}
