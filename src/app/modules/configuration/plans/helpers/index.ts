import { FormControl, FormGroup, Validators } from "@angular/forms";
import { COIN, CoinEnum } from "@interface/baseModel";
import { FormInput, numberFormInput, selectFormInput, textFormInput, textareaFormInput } from "@component/item-form-template/item-form-template.component";
import { signal } from "@angular/core";

export const planFormGroup = () => new FormGroup({
    name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      coin: new FormControl(CoinEnum.SOLES, [Validators.required]),
      description: new FormControl(''),
});

export const DEFAULT_DISPLAY_FIELDS_FORM_PLAN: FormInput[] = [
    textFormInput({
        formControlName: 'name',
        textLabel: 'Nombre',
        cssClass: 'col-span-full @2xl:col-span-6',
    }),
    selectFormInput({
        formControlName: 'coin',
        textLabel: 'Moneda',
        data: signal(COIN.map((item) => ({ name: item.toUpperCase(), id: item }))),
        cssClass: 'col-span-6 @2xl:col-span-3',
    }),
    numberFormInput({
        formControlName: 'price',
        textLabel: 'Precio',
        cssClass: 'col-span-6 @2xl:col-span-3',
    }),
    textareaFormInput({
        formControlName: 'description',
        textLabel: 'Descripción',
        cssClass: 'col-span-full'
    })
];
