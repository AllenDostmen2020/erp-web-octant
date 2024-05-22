import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormInput, textFormInput, textareaFormInput } from "@component/item-form-template/item-form-template.component";

export const bankFormGroup = () => new FormGroup({
    name: new FormControl('', [Validators.required]),
    code: new FormControl(''),
    description: new FormControl(''),
});

export const DEFAULT_DISPLAY_FIELDS_FORM_BANK: FormInput[] = [
    textFormInput({
        formControlName: 'code',
        textLabel: 'Código',
        columns: {
            default: 3,
            sm: 6
        }
    }),
    textFormInput({
        formControlName: 'name',
        textLabel: 'Nombre',
        columns: {
            default: 9,
            sm: 6
        }
    }),
    textareaFormInput({
        formControlName: 'description',
        textLabel: 'Descripción',
        columns: { default: 12 }
    })
];
