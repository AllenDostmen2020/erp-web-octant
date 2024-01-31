import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { ItemFormConfiguration } from '@interface/itemForm';
import { BoxFormPageComponent } from '../box-form-page/box-form-page.component';

@Component({
    selector: 'app-box-create-page',
    standalone: true,
    imports: [ItemFormTemplateComponent, BoxFormPageComponent],
    templateUrl: './box-create-page.component.html',
    styleUrl: './box-create-page.component.scss'
})
export class BoxCreatePageComponent {
    public configuration: ItemFormConfiguration = {
        type: 'create',
        titleModule: 'caja',
        formGroup: new FormGroup({
            account_id: new FormControl(''),
            type: new FormControl('', [Validators.required]),
            name: new FormControl('', [Validators.required]),
            description: new FormControl(''),
            coin: new FormControl(''),
        }),
        server: { url: 'box' },
    };
}
