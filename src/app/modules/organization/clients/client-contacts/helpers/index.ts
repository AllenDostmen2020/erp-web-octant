import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DOCUMENT_TYPES, DocumentTypeEnum } from "@interface/baseModel";
import { ClientContact } from "@interface/clientContact";
import { FormInput, selectFormInput, switchFormInput, textFormInput, textareaFormInput } from "@component/item-form-template/item-form-template.component";
import { signal } from "@angular/core";

export const clientContactFormGroup = (item?: Partial<ClientContact>) => new FormGroup({
    client_id: new FormControl(item?.client_id, [Validators.required]),
    document_type: new FormControl(item?.document_type, [Validators.required]),
    document_number: new FormControl(item?.document_number, [Validators.required]),
    name: new FormControl(item?.name, [Validators.required]),
    paternal_name: new FormControl(item?.paternal_name, [Validators.required]),
    maternal_name: new FormControl(item?.maternal_name, [Validators.required]),
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
        data: signal(DOCUMENT_TYPES.filter((item) => item != DocumentTypeEnum.RUC).map((item) => ({ name: item.toUpperCase(), id: item }))),
        columns: {
            default: 2,
            md: 3,
            sm: 6
        }
    }),
    textFormInput({
        formControlName: 'document_number',
        textLabel: 'Número de documento',
        placeholder: 'Ingrese el número de documento',
        maxLength: 12,
        validationOnly: "numbers",
        columns: {
            default: 2,
            md: 3,
            sm: 6
        }
    }),
    textFormInput({
        formControlName: 'name',
        textLabel: 'Nombre',
        placeholder: 'Ingrese el nombre',
        validationOnly: 'letters',
        columns: {
            default: 4,
            md: 6,
            sm: 12
        }
    }),
    textFormInput({
        formControlName: 'paternal_name',
        textLabel: 'Apellido paterno',
        placeholder: 'Ingrese el apellido',
        validationOnly: 'letters',
        columns: {
            default: 2,
            md: 6,
        }
    }),
    textFormInput({
        formControlName: 'maternal_name',
        textLabel: 'Apellido materno',
        placeholder: 'Ingrese el apellido',
        validationOnly: 'letters',
        columns: {
            default: 2,
            md: 6,
        }
    }),
    textFormInput({
        formControlName: 'phone',
        textLabel: 'Teléfono',
        placeholder: 'Ingrese el teléfono',
        validationOnly: 'numbers',
        columns: {
            default: 3,
            md: 4,
            sm: 6
        }
    }),
    textFormInput({
        formControlName: 'cellphone',
        textLabel: 'Celular',
        placeholder: 'Ingrese el celular',
        validationOnly: 'letters',
        columns: {
            default: 3,
            md: 4,
            sm: 6
        }
    }),
    textFormInput({
        formControlName: 'email',
        textLabel: 'Correo electrónico',
        placeholder: 'Ingrese el correo electrónico',
        columns: {
            default: 6,
            md: 4,
            sm: 12
        }
    }),
    textareaFormInput({
        formControlName: 'address',
        textLabel: 'Dirección',
        placeholder: 'Ingrese la dirección',
        columns: {
            default: 6,
            md: 12,
        }
    }),
    switchFormInput({
        formControlName: 'principal',
        textLabel: '¿Es contacto principal?',
        defaultValue: false,
        columns: { default: 12 }
    }),
]
