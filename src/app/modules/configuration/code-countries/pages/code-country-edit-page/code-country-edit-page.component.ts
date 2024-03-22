import { Component } from '@angular/core';
import { CodeCountryCreatePageComponent } from '../code-country-create-page/code-country-create-page.component';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';

@Component({
  selector: 'app-code-country-edit-page',
  standalone: true,
  imports: [ItemFormTemplateComponent],
  templateUrl: './code-country-edit-page.component.html',
  styleUrl: './code-country-edit-page.component.scss'
})
export class CodeCountryEditPageComponent extends CodeCountryCreatePageComponent{
    constructor(
    ) {
        super();
        this.configuration.type = 'update';
        this.configuration.hiddeFields = true;
    }
}
