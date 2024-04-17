import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormInput, textFormInput, textareaFormInput } from "@component/item-form-template/item-form-template.component";

export const contractPenaltyFormGroup = () => new FormGroup({
    reason: new FormControl('', [Validators.required]),
    observations: new FormControl('', [Validators.required]),
});

export const DEFAULT_DISPLAY_FIELDS_FORM_CONTRACT_PENALTY: FormInput[] = [
    textFormInput({
        formControlName: 'reason',
        textLabel: 'Nombre',
        cssClass: 'col-span-full',
    }),
    textareaFormInput({
        formControlName: 'observations',
        textLabel: 'Descripción',
        cssClass: 'col-span-full'
    }),
];