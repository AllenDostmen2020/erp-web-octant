import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PaymentTypeEnum } from "@interface/boxMovement";
import { ClientBoxMovement } from "@interface/clientBoxMovement";

export const clientPaymentFormGroup = (data?: Partial<ClientBoxMovement>) => new FormGroup({
    client_id: new FormControl<number|null|undefined>(data?.client_id, [Validators.required]),
    client_box_id: new FormControl<number|undefined>(data?.client_box_id, [Validators.required]),
    box_movement: new FormGroup({
        box_opening_id: new FormControl<number|null|undefined>(data?.box_movement?.box_opening_id, [Validators.required]),
        payment_date: new FormControl<string|Date|null|undefined>(data?.box_movement?.payment_date ?? new Date(), [Validators.required]),
        payment_type: new FormControl<PaymentTypeEnum|null|undefined>(data?.box_movement?.payment_type, [Validators.required]),
        bank_id: new FormControl<number|null|undefined>(data?.box_movement?.bank_id),
        amount: new FormControl<number|null|undefined>(data?.box_movement?.amount),
        operation_code: new FormControl<number|null|undefined>(data?.box_movement?.bank_id),
        observation: new FormControl<string|null|undefined>(data?.box_movement?.observation),
        voucher_file: new FormControl<string|null|undefined>(data?.box_movement?.voucher_file),
    }),
});
