import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormInput, autocompleteLocalFormInput, dateFormInput, selectFormInput, textareaFormInput } from "@component/item-form-template/item-form-template.component";
import { VEHICLE_UNSUBSCRIBE_PROGRAMMING_TYPE, VehicleUnsubscribe } from "@interface/vehicleUnsubscribe";
import { NameModuleDatabase } from "@service/database-storage.service";

export const vehicleUnsubscribeFormGroup = (item?: Partial<VehicleUnsubscribe>) => new FormGroup({
    vehicle_id: new FormControl(item?.vehicle_id ?? null, [Validators.required]),
            user_id: new FormControl(item?.user_id ?? null, [Validators.required]),
            programming_type: new FormControl(item?.programming_type ?? null, [Validators.required]),
            reason: new FormControl(item?.reason ?? null, [Validators.required]),
            observations: new FormControl(item?.observations ?? null, [Validators.required]),
            start_date: new FormControl(item?.start_date ?? null, [Validators.required]),
            end_date: new FormControl(item?.end_date ?? null),
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
