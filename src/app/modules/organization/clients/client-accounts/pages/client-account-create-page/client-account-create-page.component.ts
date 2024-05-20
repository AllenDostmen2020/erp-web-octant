import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ItemFormConfiguration, ItemFormTemplateComponent, selectFormInput, textFormInput } from '@component/item-form-template/item-form-template.component';
import { COIN } from '@interface/baseModel';
import { ClientBox, ClientAccountTypeEnum } from '@interface/clientBox';

@Component({
    selector: 'app-client-account-create-page',
    standalone: true,
    imports: [ItemFormTemplateComponent],
    templateUrl: './client-account-create-page.component.html',
    styleUrl: './client-account-create-page.component.scss'
})
export class ClientAccountCreatePageComponent {
    public activatedRoute = inject(ActivatedRoute);
    public configuration: ItemFormConfiguration<ClientBox> = {
        titleModule: 'cuenta',
        type: 'create',
        formGroup: new FormGroup({
            client_id: new FormControl(this.activatedRoute.parent?.parent?.snapshot.paramMap.get('id'), [Validators.required]),
            type: new FormControl(null, [Validators.required]),
            name: new FormControl(null, [Validators.required]),
            coin: new FormControl(null, [Validators.required]),
        }),
        fields: [
            selectFormInput({
                formControlName: 'type',
                textLabel: 'Tipo de cuenta',
                data: signal(Object.values(ClientAccountTypeEnum).map((item) => ({ name: item.toUpperCase(), id: item }))),
                columns: {
                    default: 12,
                    md: 6
                }
            }),
            selectFormInput({
                formControlName: 'coin',
                textLabel: 'Tipo de moneda',
                data: signal(COIN.map((item) => ({ name: item.toUpperCase(), id: item }))),
                columns: {
                    default: 12,
                    md: 6
                }
            }),
            textFormInput({
                formControlName: 'name',
                textLabel: 'Nombre de la cuenta',
                columns: { default: 12 }
            })
        ],
        server: { url: 'client-box' },
    }
}
