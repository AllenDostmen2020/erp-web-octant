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
        columns: {
            default: 6,
            sm: 12
        }
    }),
    selectFormInput({
        formControlName: 'coin',
        textLabel: 'Moneda',
        data: signal(COIN.map((item) => ({ name: item.toUpperCase(), id: item }))),
        columns: {
            default: 3,
            sm: 6
        }
    }),
    numberFormInput({
        formControlName: 'price',
        textLabel: 'Precio',
        columns: {
            default: 3,
            sm: 6
        }
    }),
    textareaFormInput({
        formControlName: 'description',
        textLabel: 'Descripción',
        columns: { default: 3 }
    })
];
