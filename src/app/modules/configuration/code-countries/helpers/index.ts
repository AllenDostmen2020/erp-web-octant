import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormInput, textFormInput } from "@component/item-form-template/item-form-template.component";

export const codeCountryFormGroup = () => new FormGroup({
    country: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required]),
});

export const DEFAULT_DISPLAY_FIELDS_FORM_CODE_COUNTRY: FormInput[] = [
    textFormInput({
        formControlName: 'code',
        textLabel: 'Código',
        cssClass: 'col-span-6 @2xl:col-span-3',
    }),
    textFormInput({
        formControlName: 'country',
        textLabel: 'País',
        cssClass: 'col-span-full @2xl:col-span-9',
    }),
];
