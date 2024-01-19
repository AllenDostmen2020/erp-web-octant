import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { InputAutocompleteTemplateComponent } from '@component/input-autocomplete-template/input-autocomplete-template.component';
import { InputSelectTemplateComponent } from '@component/input-select-template/input-select-template.component';
import { ContractResolutionEntityEnum, ContractResolutionTypeEnum } from '@interface/contractResolution';
import { FirstLetterUppercasePipe } from '@pipe/first-letter-uppercase.pipe';
import { NameModuleDatabase } from '@service/database-storage.service';

@Component({
  selector: 'app-contract-resolution-form',
  templateUrl: './contract-resolution-form.component.html',
  styleUrls: ['./contract-resolution-form.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FirstLetterUppercasePipe,
    MatSelectModule,
    InputSelectTemplateComponent,
    InputAutocompleteTemplateComponent,
  ],
})
export class ContractResolutionFormComponent {
  @Input({required: true}) public form!: FormGroup;
  public nameModuleDatabase = NameModuleDatabase;
  public contractResolutionEntities: any = Object.values(ContractResolutionEntityEnum);
  public contractResolutionTypes = Object.values(ContractResolutionTypeEnum);
  public contractResolutionType = ContractResolutionTypeEnum;

  get typeCtrl(): FormControl {
    return this.form.get('type') as FormControl;
  }
  get responsibleUserIdCtrl(): FormControl {
    return this.form.get('responsible_user_id') as FormControl;
  }
}
