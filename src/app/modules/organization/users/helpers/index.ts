import { FormControl, FormGroup, Validators } from "@angular/forms";
import { USER_ROLES } from "@interface/baseModel";
import { FormInput, dateFormInput, selectFormInput, selectLocalFormInput, textFormInput, textareaFormInput } from "@component/item-form-template/item-form-template.component";
import { signal } from "@angular/core";
import { NameModuleDatabase } from "@service/database-storage.service";

export const userFormGroup = () => new FormGroup({
    document_type: new FormControl(null, [Validators.required]),
    document_number: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    address: new FormControl(null),
    phone: new FormControl(null),
    cellphone: new FormControl(null),
    birth_date: new FormControl(null),
    role: new FormControl('', [Validators.required]),
});

export const DEFAULT_DISPLAY_FIELDS_FORM_USER: FormInput[] = [
    selectFormInput({
        formControlName: 'role',
        textLabel: 'Tipo de rol',
        data: signal(USER_ROLES.map((item) => ({ name: item.toUpperCase(), id: item }))),
        cssClass: 'col-span-6 @2xl:col-span-2',
    }),
    selectLocalFormInput({
        formControlName: 'document_type',
        textLabel: 'Tipo de documento',
        local: {nameModuleDatabase: NameModuleDatabase.DocumentTypes},
        cssClass: 'col-span-6 @2xl:col-span-2',
    }),
    textFormInput({
        formControlName: 'document_number',
        textLabel: 'Número de documento',
        cssClass: 'col-span-6 @2xl:col-span-2',
        validationOnly: "numbers",
        maxLength: 12
    }),
    textFormInput({
        formControlName: 'name',
        textLabel: 'Nombre',
        cssClass: 'col-span-full @2xl:col-span-6',
        validationOnly: 'letters'
    }),
    textFormInput({
        formControlName: 'phone',
        textLabel: 'Teléfono',
        cssClass: 'col-span-full @2xl:col-span-2',
        validationOnly: 'numbers'
    }),
    textFormInput({
        formControlName: 'cellphone',
        textLabel: 'Celular',
        cssClass: 'col-span-full @2xl:col-span-2',
        validationOnly: 'numbers'
    }),
    dateFormInput({
        formControlName: 'birth_date',
        textLabel: 'Fecha de nacimiento',
        cssClass: 'col-span-full @2xl:col-span-2',
    }),
    textFormInput({
        formControlName: 'email',
        textLabel: 'Correo electrónico',
        cssClass: 'col-span-full @2xl:col-span-6',
    }),
    textareaFormInput({
        formControlName: 'address',
        textLabel: 'Dirección',
        cssClass: 'col-span-full'
    })
];
