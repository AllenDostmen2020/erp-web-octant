import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DOCUMENT_TYPES } from "@interface/baseModel";
import { FormInput, selectFormInput } from "@interface/itemForm";

export const clientFormGroup = () => new FormGroup({
    document_type: new FormControl(null, [Validators.required]),
    document_number: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    address: new FormControl(''),
    phone: new FormControl(''),
    cellphone: new FormControl(''),
});

export const DEFAULT_DISPLAY_FIELDS_FORM_CLIENT: FormInput[] = [
    // {
    //     type: 'select',
    //     formControlName: 'document_type',
    //     textLabel: 'Tipo de documento',
    //     placeholder: 'Seleccione un tipo de documento',
    //     cssClass: 'col-span-full @2xl:col-span-3',
    //     selectOptions: DOCUMENT_TYPES.map((item) => ({ text: item.toUpperCase(), value: item })),
    // },
    selectFormInput({
        formControlName: 'document_type',
        textLabel: 'Tipo de documento',
        data: DOCUMENT_TYPES.map((item) => ({ name: item.toUpperCase(), id: item })),
        cssClass: 'col-span-full @2xl:col-span-3',
        // displayTextFn: (item) => item.text ?? '',
        // displayValueFn: (item) => item.value
    }),

    // {
    //     type: 'text',
    //     formControlName: 'document_number',
    //     textLabel: 'Número de documento',
    //     placeholder: 'Ingrese el número de documento',
    //     cssClass: 'col-span-full @2xl:col-span-3',
    //     maxLength: 12,
    // },
    // {
    //     type: 'text',
    //     formControlName: 'name',
    //     textLabel: 'Nombre',
    //     placeholder: 'Ingrese el nombre',
    //     cssClass: 'col-span-full @2xl:col-span-6',
    // },
    // {
    //     type: 'text',
    //     formControlName: 'phone',
    //     textLabel: 'Teléfono',
    //     placeholder: 'Ingrese el teléfono',
    //     cssClass: 'col-span-full @2xl:col-span-4',
    // },
    // {
    //     type: 'text',
    //     formControlName: 'cellphone',
    //     textLabel: 'Celular',
    //     placeholder: 'Ingrese el celular',
    //     cssClass: 'col-span-full @2xl:col-span-4',
    // },
    // {
    //     type: 'text',
    //     formControlName: 'email',
    //     textLabel: 'Correo electrónico',
    //     placeholder: 'Ingrese el correo electrónico',
    //     cssClass: 'col-span-full @2xl:col-span-4',
    // },
    // {
    //     type: 'textarea',
    //     formControlName: 'address',
    //     textLabel: 'Dirección',
    //     placeholder: 'Ingrese la dirección',
    //     cssClass: 'col-span-full',
    // },
]
