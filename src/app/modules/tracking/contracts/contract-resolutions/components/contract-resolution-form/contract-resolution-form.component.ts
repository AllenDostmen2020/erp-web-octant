import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ContractResolutionEntityEnum, ContractResolutionTypeEnum } from '@interface/contractResolution';
import { NameModuleDatabase } from '@service/database-storage.service';

@Component({
  selector: 'app-contract-resolution-form',
  templateUrl: './contract-resolution-form.component.html',
  styleUrls: ['./contract-resolution-form.component.css']
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
}
