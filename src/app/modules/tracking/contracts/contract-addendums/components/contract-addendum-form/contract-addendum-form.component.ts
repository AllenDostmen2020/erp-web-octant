import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contract-addendum-form',
  standalone: true,
  imports: [],
  templateUrl: './contract-addendum-form.component.html',
  styleUrl: './contract-addendum-form.component.scss'
})
export class ContractAddendumFormComponent {
  @Input({ required: true }) form!: FormGroup;
}
