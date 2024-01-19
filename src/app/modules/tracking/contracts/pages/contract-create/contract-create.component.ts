import { Component } from '@angular/core';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { ItemFormConfiguration } from '@interface/itemForm';
import { getContractFormGroup } from '../../helpers';
import { ContractFormComponent } from '../../components/contract-form/contract-form.component';

@Component({
  selector: 'app-contract-create',
  standalone: true,
  imports: [
    ItemFormTemplateComponent,
    ContractFormComponent,
  ],
  templateUrl: './contract-create.component.html',
  styleUrl: './contract-create.component.scss'
})
export class ContractCreateComponent {
  public configuration: ItemFormConfiguration = {
    titleModule: 'contrato',
    pathServer: 'contract',
    type: 'create',
    formGroup: getContractFormGroup(),
  }
}
