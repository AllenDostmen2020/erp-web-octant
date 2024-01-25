import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormInput, fileFormInput, textFormInput, textareaFormInput } from "@interface/itemForm";

export const vehicleTypeFormGroup = () => new FormGroup({
    name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      file: new FormControl(null),
});

export const DEFAULT_DISPLAY_FIELDS_FORM_VEHICLE_TYPE: FormInput[] = [
    textFormInput({
        formControlName: 'name',
        textLabel: 'Nombre',
        cssClass: 'col-span-full',
    }),
    textareaFormInput({
        formControlName: 'description',
        textLabel: 'Descripción',
        cssClass: 'col-span-full'
    }),
    fileFormInput({
        formControlName: 'file',
        textLabel: 'Imagen',
        cssClass: 'col-span-full'
    }),
];
