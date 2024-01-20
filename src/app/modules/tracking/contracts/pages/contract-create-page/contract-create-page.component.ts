import { Component } from '@angular/core';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { ContractFormComponent } from '../../components/contract-form/contract-form.component';
import { ItemFormConfiguration } from '@interface/itemForm';
import { getContractFormGroup } from '../../helpers';

@Component({
  selector: 'app-contract-create-page',
  standalone: true,
  imports: [
    ItemFormTemplateComponent,
    ContractFormComponent,
  ],
  templateUrl: './contract-create-page.component.html',
  styleUrl: './contract-create-page.component.scss'
})
export class ContractCreatePageComponent {
  public configuration: ItemFormConfiguration = {
    titleModule: 'contrato',
    pathServer: 'contract',
    type: 'create',
    formGroup: getContractFormGroup(),
  }
}
