import { DecimalPipe } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InputAutocompleteTemplateComponent } from '@component/input-autocomplete-template/input-autocomplete-template.component';
import { InputSelectLocalConfiguration, InputSelectTemplateComponent } from '@component/input-select-template/input-select-template.component';
import { NameModuleDatabase } from '@service/database-storage.service';

@Component({
  selector: 'app-contract-plan-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputAutocompleteTemplateComponent,
    InputSelectTemplateComponent,
    MatFormFieldModule,
    MatInputModule,
    DecimalPipe,
  ],
  templateUrl: './contract-plan-form.component.html',
  styleUrl: './contract-plan-form.component.css'
})
export class ContractPlanFormComponent {
  @Input({ required: true }) form!: FormGroup;
  index = input.required<number>();

  public readonly planAutocompleteConfiguration: InputSelectLocalConfiguration = {
    textLabel: 'Plan',
    local: { nameModuleDatabase: NameModuleDatabase.Plans }
  }
  get planIdCtrl(): FormControl {
    return this.form.get('plan_id') as FormControl;
  }
}
