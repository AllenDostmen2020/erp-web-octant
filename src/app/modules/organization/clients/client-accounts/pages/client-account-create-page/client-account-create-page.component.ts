import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { COIN } from '@interface/baseModel';
import { ClientAccount, ClientAccountTypeEnum } from '@interface/clientAccount';
import { ItemFormConfiguration, selectFormInput, textFormInput } from '@interface/itemForm';

@Component({
    selector: 'app-client-account-create-page',
    standalone: true,
    imports: [ItemFormTemplateComponent],
    templateUrl: './client-account-create-page.component.html',
    styleUrl: './client-account-create-page.component.scss'
})
export class ClientAccountCreatePageComponent {
    public activatedRoute = inject(ActivatedRoute);
    public configuration: ItemFormConfiguration<ClientAccount> = {
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
                data: Object.values(ClientAccountTypeEnum).map((item) => ({ name: item.toUpperCase(), id: item })),
                cssClass: 'col-span-6 @2xl:col-span-3',
            }),
            selectFormInput({
                formControlName: 'coin',
                textLabel: 'Tipo de moneda',
                data: COIN.map((item) => ({ name: item.toUpperCase(), id: item })),
                cssClass: 'col-span-6 @2xl:col-span-3',
            }),
            textFormInput({
                formControlName: 'name',
                textLabel: 'Nombre de la cuenta',
                cssClass: 'col-span-full @2xl:col-span-6',
            })
        ],
        pathServer: 'client-account',
        loading: false,
    }
}
