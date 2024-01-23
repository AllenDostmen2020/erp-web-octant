import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormInput, autocompleteLocalFormInput, autocompleteServerFormInput, textFormInput, textareaFormInput } from "@interface/itemForm";
import { NameModuleDatabase } from "@service/database-storage.service";

export const vehicleFormGroup = () => new FormGroup({
    vehicle_type_id: new FormControl('', [Validators.required]),
    client_id: new FormControl('', [Validators.required]),
    client: new FormControl<any>(''),
    plate: new FormControl('', [Validators.required]),
    color: new FormControl(''),
    brand: new FormControl(''),
    model: new FormControl(''),
    year: new FormControl(''),
    file: new FormControl(''),
    description: new FormControl(''),
});

export const DEFAULT_DISPLAY_FIELDS_FORM_VEHICLE: FormInput[] = [
    autocompleteLocalFormInput({
        formControlName: 'vehicle_type_id',
        textLabel: 'Tipo de vehículo',
        local: { nameModuleDatabase: NameModuleDatabase.VehicleTypes },
        cssClass: 'col-span-full @2xl:col-span-6',
    }),
    autocompleteServerFormInput({
        formControlName: 'client_id',
        textLabel: 'Cliente',
        server: { url: 'client' },
        cssClass: 'col-span-full @2xl:col-span-6',
    }),
    textFormInput({
        formControlName: 'plate',
        textLabel: 'Placa',
        cssClass: 'col-span-full @2xl:col-span-2',
    }),
    textFormInput({
        formControlName: 'color',
        textLabel: 'Color',
        cssClass: 'col-span-full @2xl:col-span-2',
    }),
    textFormInput({
        formControlName: 'brand',
        textLabel: 'Marca',
        cssClass: 'col-span-full @2xl:col-span-2',
    }),
    textFormInput({
        formControlName: 'model',
        textLabel: 'Modelo',
        cssClass: 'col-span-full @2xl:col-span-4',
    }),
    textFormInput({
        formControlName: 'year',
        textLabel: 'Año',
        cssClass: 'col-span-full @2xl:col-span-2',
    }),
    textareaFormInput({
        formControlName: 'description',
        textLabel: 'Descripción',
        cssClass: 'col-span-full'
    }),

    // FALTA INPUT PARA SUBIR FOTO
];
