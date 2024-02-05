import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DOCUMENT_TYPES } from "@interface/baseModel";
import { ClientContact } from "@interface/clientContact";
import { FormInput, selectFormInput, switchFormInput, textFormInput, textareaFormInput } from "@component/item-form-template/item-form-template.component";

export const clientContactFormGroup = (item?: Partial<ClientContact>) => new FormGroup({
    client_id: new FormControl(item?.client_id, [Validators.required]),
    document_type: new FormControl(item?.document_type, [Validators.required]),
    document_number: new FormControl(item?.document_number, [Validators.required]),
    name: new FormControl(item?.name, [Validators.required]),
    email: new FormControl(item?.email),
    address: new FormControl(item?.address),
    phone: new FormControl(item?.phone),
    cellphone: new FormControl(item?.cellphone),
    principal: new FormControl(item?.principal ?? false),
});

export const DEFAULT_DISPLAY_FIELDS_FORM_CLIENT_CONTACT: FormInput[] = [
    selectFormInput({
        formControlName: 'document_type',
        textLabel: 'Tipo de documento',
        data: DOCUMENT_TYPES.map((item) => ({ name: item.toUpperCase(), id: item })),
        cssClass: 'col-span-6 @2xl:col-span-3',
    }),
    textFormInput({
        formControlName: 'document_number',
        textLabel: 'Número de documento',
        placeholder: 'Ingrese el número de documento',
        cssClass: 'col-span-full @2xl:col-span-3',
        maxLength: 12,
    }),
    textFormInput({
        formControlName: 'name',
        textLabel: 'Nombre',
        placeholder: 'Ingrese el nombre',
        cssClass: 'col-span-full @2xl:col-span-6',
    }),
    textFormInput({
        formControlName: 'phone',
        textLabel: 'Teléfono',
        placeholder: 'Ingrese el teléfono',
        cssClass: 'col-span-full @2xl:col-span-4',
    }),
    textFormInput({
        formControlName: 'cellphone',
        textLabel: 'Celular',
        placeholder: 'Ingrese el celular',
        cssClass: 'col-span-full @2xl:col-span-4',
    }),
    textFormInput({
        formControlName: 'email',
        textLabel: 'Correo electrónico',
        placeholder: 'Ingrese el correo electrónico',
        cssClass: 'col-span-full @2xl:col-span-4',
    }),
    textareaFormInput({
        formControlName: 'address',
        textLabel: 'Dirección',
        placeholder: 'Ingrese la dirección',
        cssClass: 'col-span-full',
    }),
    switchFormInput({
        formControlName: 'principal',
        textLabel: '¿Es contacto principal?',
        defaultValue: false,
        cssClass: 'col-span-full',
    }),
]
