import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ClientAccount } from "@interface/clientAccount";

export const clientPaymentFormGroup = (data?: ClientAccount) => new FormGroup({
    client_id: new FormControl(data?.client_id ?? '', [Validators.required]),
    client_account_id: new FormControl<number|undefined>(undefined, [Validators.required]),
    box_movement: new FormGroup({
        type: new FormControl('payment', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        coin: new FormControl('PEN', [Validators.required]),
    }),
});