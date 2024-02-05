import { FormControl, FormGroup, Validators } from "@angular/forms";
import { COMPROBANT_TYPES, ClientBillingOption } from "@interface/clientBillingOption";
import { FormInput, numberFormInput, selectFormInput, switchFormInput } from "@component/item-form-template/item-form-template.component";

export const clientBillingOptionFormGroup = (item?: Partial<ClientBillingOption>) => new FormGroup({
    client_id: new FormControl(item?.id, [Validators.required]),
    comprobant_type: new FormControl(item?.comprobant_type, [Validators.required]),
    group_notes_single_voucher: new FormControl(item?.group_notes_single_voucher ?? false, [Validators.required]),
    detraction: new FormControl(item?.detraction ?? true),
    detraction_percent: new FormControl(item?.detraction_percent, [Validators.required]),
    retention: new FormControl(item?.retention ?? true),
    retention_percent: new FormControl(item?.retention_percent, [Validators.required]),
});

export const DEFAULT_DISPLAY_FIELDS_FORM_CLIENT_BILLING_OPTION: FormInput[] = [
    selectFormInput({
        formControlName: 'comprobant_type',
        textLabel: 'Tipo de comprobante',
        data: COMPROBANT_TYPES.map((item) => ({ name: item.toUpperCase(), id: item })),
        cssClass: 'col-span-6 @2xl:col-span-3',
    }),
    switchFormInput({
        formControlName: 'group_notes_single_voucher',
        textLabel: '¿Agrupar todas la notas de pedido en un solo comprobante?',
        defaultValue: false,
        cssClass: 'col-span-full',
    }),
    switchFormInput({
        formControlName: 'detraction',
        textLabel: '¿Tiene detracción?',
        defaultValue: false,
        cssClass: 'col-span-full',
    }),
    numberFormInput({
        formControlName: 'detraction_percent',
        textLabel: 'Porcentaje de detracción',
        cssClass: 'col-span-full @2xl:col-span-3',
        min: 0.1,
        max: 100,
    }),
    switchFormInput({
        formControlName: 'retention',
        textLabel: '¿Tiene retención?',
        defaultValue: false,
        cssClass: 'col-span-full',
    }),
    numberFormInput({
        formControlName: 'retention_percent',
        textLabel: 'Porcentaje de retención',
        cssClass: 'col-span-full @2xl:col-span-3',
        min: 0.1,
        max: 100,
    }),
]
