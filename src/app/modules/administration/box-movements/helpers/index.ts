import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BoxMovement } from "@interface/boxMovement";

export const getFormBoxMovementGroup = (data?: Partial<BoxMovement>): FormGroup => {
  return new FormGroup({
      box_opening_id: new FormControl(data?.box_opening_id ?? null, [Validators.required]),
      type: new FormControl(data?.type ?? null, [Validators.required]),
      amount: new FormControl(data?.amount ?? null, [Validators.required]),
      concept: new FormControl(data?.concept ?? null, [Validators.required]),
      link_file: new FormControl(''),
      payment_type: new FormControl('', [Validators.required]),
      bank_id: new FormControl(''),
      opcode: new FormControl(''),
      invoice_number: new FormControl(''),
      voucher_type: new FormControl(''),
      voucher_file: new FormControl(''),
      payment_date: new FormControl(new Date()),
      observation: new FormControl(''),
      business: new FormControl(''),
      addressee: new FormControl(''),
  })
}