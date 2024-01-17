import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormInput, textFormInput, textareaFormInput } from "@interface/itemForm";

export const bankFormGroup = () => new FormGroup({
    name: new FormControl('', [Validators.required]),
    code: new FormControl(''),
    description: new FormControl(''),
});

export const DEFAULT_DISPLAY_FIELDS_FORM_BANK: FormInput[] = [

    textFormInput({
        formControlName: 'code',
        textLabel: 'Código',
        cssClass: 'col-span-6 @2xl:col-span-3',
    }),
    textFormInput({
        formControlName: 'name',
        textLabel: 'Nombre',
        cssClass: 'col-span-full @2xl:col-span-9',
    }),
    textareaFormInput({
        formControlName: 'description',
        textLabel: 'Descripción',
        cssClass: 'col-span-full'
    })
];
