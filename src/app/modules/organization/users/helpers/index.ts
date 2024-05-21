import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DOCUMENT_TYPES, USER_ROLES } from "@interface/baseModel";
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
        columns: {
            default: 2,
            md: 4,
            sm: 6
        }
    }),
    selectFormInput({
        formControlName: 'document_type',
        textLabel: 'Tipo de documento',
        data: signal(DOCUMENT_TYPES.map((item) => ({ name: item.toUpperCase(), id: item }))),
        columns: {
            default: 2,
            md: 4,
            sm: 6
        }
    }),
    textFormInput({
        formControlName: 'document_number',
        textLabel: 'Número de documento',
        validationOnly: "numbers",
        maxLength: 12,
        columns: {
            default: 2,
            md: 4,
            sm: 6
        }
    }),
    textFormInput({
        formControlName: 'name',
        textLabel: 'Nombre',
        validationOnly: 'letters',
        columns: {
            default: 6,
        }
    }),
    textFormInput({
        formControlName: 'phone',
        textLabel: 'Teléfono',
        validationOnly: 'numbers',
        columns: {
            default: 2,
            md: 3,
            sm: 6
        }
    }),
    textFormInput({
        formControlName: 'cellphone',
        textLabel: 'Celular',
        validationOnly: 'numbers',
        columns: {
            default: 2,
            md: 3,
            sm: 6
        }
    }),
    dateFormInput({
        formControlName: 'birth_date',
        textLabel: 'Fecha de nacimiento',
        columns: {
            default: 2,
            md: 4,
            sm: 6
        }
    }),
    textFormInput({
        formControlName: 'email',
        textLabel: 'Correo electrónico',
        columns: {
            default: 6,
            md: 8,
            sm: 6
        }
    }),
    textareaFormInput({
        formControlName: 'address',
        textLabel: 'Dirección',
        columns: { default: 12 }
    })
];
