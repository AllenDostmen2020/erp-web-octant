import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DOCUMENT_TYPES } from "@interface/baseModel";
import { FormInput, selectFormInput, textFormInput, textareaFormInput } from "@component/item-form-template/item-form-template.component";

export const clientFormGroup = () => new FormGroup({
    document_type: new FormControl(null, [Validators.required]),
    document_number: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl(''),
    phone: new FormControl(''),
    cellphone: new FormControl(''),
});

export const DEFAULT_DISPLAY_FIELDS_FORM_CLIENT: FormInput[] = [
    selectFormInput({
        formControlName: 'document_type',
        textLabel: 'Tipo de documento',
        data: DOCUMENT_TYPES.map((item) => ({ name: item.toUpperCase(), id: item })).sort((a, b) => a.name.localeCompare(b.name)),
        cssClass: 'col-span-6 @2xl:col-span-2',
    }),
    textFormInput({
        formControlName: 'document_number',
        textLabel: 'Número de documento',
        cssClass: 'col-span-6 @2xl:col-span-3',
    }),
    textFormInput({
        formControlName: 'name',
        textLabel: 'Nombre',
        cssClass: 'col-span-full @2xl:col-span-7',
    }),
    textFormInput({
        formControlName: 'phone',
        textLabel: 'Teléfono',
        cssClass: 'col-span-full @2xl:col-span-3',
    }),
    textFormInput({
        formControlName: 'cellphone',
        textLabel: 'Celular',
        cssClass: 'col-span-full @2xl:col-span-3',
    }),
    textFormInput({
        formControlName: 'email',
        textLabel: 'Correo electrónico',
        cssClass: 'col-span-full @2xl:col-span-6',
    }),
    textFormInput({
        formControlName: 'address',
        textLabel: 'Dirección',
        cssClass: 'col-span-full'
    })
];
