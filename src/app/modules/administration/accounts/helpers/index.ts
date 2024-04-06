import { FormControl, FormGroup, Validators } from "@angular/forms";
import { COIN } from "@interface/baseModel";
import { FormInput, autocompleteLocalFormInput, autocompleteServerFormInput, selectFormInput, textFormInput, textareaFormInput } from "@component/item-form-template/item-form-template.component";
import { signal } from "@angular/core";
import { NameModuleDatabase } from "@service/database-storage.service";

export const accountFormGroup = () => new FormGroup({
    bank_id: new FormControl(null, [Validators.required]),
    bank: new FormControl(null, [Validators.required]),
    name: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
    coin: new FormControl('soles', [Validators.required]),
    description: new FormControl(''),
});

export const DEFAULT_DISPLAY_FIELDS_FORM_ACCOUNT: FormInput[] = [
    autocompleteLocalFormInput({
        formControlName: 'bank_id',
        autocompleteFormControlName: 'bank',
        textLabel: 'Banco',
        local: { nameModuleDatabase: NameModuleDatabase.Banks },
        cssClass: 'col-span-6 @2xl:col-span-2',
    }),
    textFormInput({
        formControlName: 'name',
        textLabel: 'Nombre',
        cssClass: 'col-span-full @2xl:col-span-6',
    }),
    textFormInput({
        formControlName: 'number',
        textLabel: 'N° de cuenta',
        cssClass: 'col-span-6 @2xl:col-span-2',
        validationOnly: 'numbers'
    }),
    selectFormInput({
        formControlName: 'coin',
        textLabel: 'Moneda',
        data: signal(COIN.map((item) => ({ name: item.toUpperCase(), id: item }))),
        cssClass: 'col-span-full @2xl:col-span-2',
    }),
    textareaFormInput({
        formControlName: 'description',
        textLabel: 'Descripción',
        cssClass: 'col-span-full'
    })
];
