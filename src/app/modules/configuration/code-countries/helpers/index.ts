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
        columns: {
            default: 3,
            sm: 6
        }
    }),
    textFormInput({
        formControlName: 'country',
        textLabel: 'País',        
        columns: {
            default: 9,
            sm: 6
        }
    }),
];
