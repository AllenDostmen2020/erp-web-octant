import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PaymentTypeEnum } from "@interface/boxMovement";
import { ComprobantTypeEnum } from "@interface/clientBillingOption";
import { ClientPayment } from "@interface/clientPayment";

export const clientPaymentFormGroup = (data?: ClientPayment) => new FormGroup({
    client_id: new FormControl(data?.client_id ?? '', [Validators.required]),
    client_account_id: new FormControl<number|undefined>(data?.client_account_id, [Validators.required]),
    box_movement: new FormGroup({
        box_opening_id: new FormControl<number|undefined>(data?.box_movement?.box_opening_id, [Validators.required]),
        payment_type: new FormControl<PaymentTypeEnum|undefined>(data?.box_movement?.payment_type, [Validators.required]),
        payment_date: new FormControl<string|Date|undefined>(data?.box_movement?.payment_date ?? new Date(), [Validators.required]),
        bank_id: new FormControl<number|undefined>(data?.box_movement?.bank_id),
        operation_code: new FormControl<number|undefined>(data?.box_movement?.bank_id),
        observation: new FormControl<string|undefined>(data?.box_movement?.observation, [Validators.required]),
        voucher_type: new FormControl<ComprobantTypeEnum|undefined>(data?.box_movement?.voucher_type, [Validators.required]),
        voucher_file: new FormControl<string|undefined>(data?.box_movement?.voucher_file, [Validators.required]),
    }),
});