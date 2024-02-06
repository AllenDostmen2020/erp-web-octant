import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-client-payment-form-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './client-payment-form-page.component.html',
  styleUrl: './client-payment-form-page.component.scss'
})
export class ClientPaymentFormPageComponent {
  @Input() public form!: FormGroup;

  get boxMovementFormGroup(): FormGroup {
    return this.form.get('box_movement') as FormGroup;
  }

  get clientAccountIdCtrl(): FormControl {
    return this.form.get('client_account_id') as FormControl;
  }
}
