import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormInput, autocompleteLocalFormInput, dateFormInput, selectFormInput, textareaFormInput } from "@interface/itemForm";
import { VEHICLE_UNSUBSCRIBE_PROGRAMMING_TYPE } from "@interface/vehicleUnsubscribe";
import { NameModuleDatabase } from "@service/database-storage.service";

export const vehicleFormGroup = () => new FormGroup({
    vehicle_id: new FormControl('', [Validators.required]),
    user_id: new FormControl('', [Validators.required]),
    programming_type: new FormControl('', [Validators.required]),
    reason: new FormControl('', [Validators.required]),
    observations: new FormControl('', [Validators.required]),
    start_date: new FormControl('', [Validators.required]),
    end_date: new FormControl(''),
});

export const DEFAULT_DISPLAY_FIELDS_FORM_VEHICLE: FormInput[] = [
    selectFormInput({
        formControlName: 'programming_type',
        textLabel: 'Tipo de programación',
        data: VEHICLE_UNSUBSCRIBE_PROGRAMMING_TYPE.map((item) => ({ name: item.toUpperCase(), id: item })),
        cssClass: 'col-span-6 @2xl:col-span-2',
    }),
    dateFormInput({
        formControlName: 'start_date',
        textLabel: 'Fecha de inicio',
        cssClass: 'col-span-full @2xl:col-span-2',
    }),
    dateFormInput({
        formControlName: 'end_date',
        textLabel: 'Fecha de fin',
        cssClass: 'col-span-full @2xl:col-span-2',
    }),
    autocompleteLocalFormInput({
        formControlName: 'user_id',
        textLabel: 'Usuario responsable',
        local: { nameModuleDatabase: NameModuleDatabase.Users },
        cssClass: 'col-span-full @2xl:col-span-6',
    }),
    textareaFormInput({
        formControlName: 'reason',
        textLabel: 'Motivo',
        cssClass: 'col-span-full'
    }),
    textareaFormInput({
        formControlName: 'observations',
        textLabel: 'Observaciones',
        cssClass: 'col-span-full'
    }),

];
