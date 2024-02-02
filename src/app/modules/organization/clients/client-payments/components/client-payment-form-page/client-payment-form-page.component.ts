import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-client-payment-form-page',
  standalone: true,
  imports: [],
  templateUrl: './client-payment-form-page.component.html',
  styleUrl: './client-payment-form-page.component.scss'
})
export class ClientPaymentFormPageComponent {
    @Input() public form!: FormGroup;
}
