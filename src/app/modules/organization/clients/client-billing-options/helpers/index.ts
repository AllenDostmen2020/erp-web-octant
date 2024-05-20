import { FormControl, FormGroup, Validators } from "@angular/forms";
import { COMPROBANT_TYPES, ClientBillingOption } from "@interface/clientBillingOption";
import { FormInput, numberFormInput, selectFormInput, switchFormInput } from "@component/item-form-template/item-form-template.component";
import { signal } from "@angular/core";

export const clientBillingOptionFormGroup = (item?: Partial<ClientBillingOption>) => new FormGroup({
    client_id: new FormControl(item?.id, [Validators.required]),
    comprobant_type: new FormControl(item?.comprobant_type, [Validators.required]),
    group_notes_single_voucher: new FormControl(item?.group_notes_single_voucher ?? false, [Validators.required]),
    detraction: new FormControl(item?.detraction ?? true),
    detraction_percent: new FormControl(item?.detraction_percent, [Validators.required]),
    retention: new FormControl(item?.retention ?? true),
    retention_percent: new FormControl(item?.retention_percent, [Validators.required]),
    igv_apply: new FormControl(item?.retention_percent, [Validators.required]),
});

export const DEFAULT_DISPLAY_FIELDS_FORM_CLIENT_BILLING_OPTION: FormInput[] = [
    selectFormInput({
        formControlName: 'comprobant_type',
        textLabel: 'Tipo de comprobante',
        data: signal(COMPROBANT_TYPES.map((item) => ({ name: item.toUpperCase(), id: item }))),
        columns: { default: 12 }
    }),
    switchFormInput({
        formControlName: 'group_notes_single_voucher',
        textLabel: '¿Agrupar todas la notas de pedido en un solo comprobante?',
        defaultValue: false,
        columns: { default: 12 }
    }),
    switchFormInput({
        formControlName: 'retention',
        textLabel: '¿Tiene retención?',
        defaultValue: false,
        columns: { default: 12 }
    }),
    selectFormInput({
        formControlName: 'retention_percent',
        textLabel: 'Porcentaje de retención',
        data: signal([
            { name: '3%', id: '3.00' },
            { name: '6%', id: '6.00' },
        ]),
        columns: { default: 12 }
    }),
    switchFormInput({
        formControlName: 'igv_apply',
        textLabel: '¿Aplica IGV?',
        defaultValue: false,
        columns: { default: 12 }
    }),
]
