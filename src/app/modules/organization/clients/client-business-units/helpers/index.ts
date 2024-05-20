import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ClientContact } from "@interface/clientContact";
import { FormInput, textFormInput, textareaFormInput } from "@component/item-form-template/item-form-template.component";

export const clientBusinessUnitFormGroup = (item?: Partial<ClientContact>) => new FormGroup({
    client_id: new FormControl(item?.client_id, [Validators.required]),
    name: new FormControl(item?.name, [Validators.required]),
    description: new FormControl(item?.email),
});

export const DEFAULT_DISPLAY_FIELDS_FORM_CLIENT_BUSINESS_UNIT: FormInput[] = [
    textFormInput({
        formControlName: 'name',
        textLabel: 'Nombre',
        columns: { default: 12 }
    }),
    textareaFormInput({
        formControlName: 'description',
        textLabel: 'Descripción',
        columns: { default: 12 }
    })
]
