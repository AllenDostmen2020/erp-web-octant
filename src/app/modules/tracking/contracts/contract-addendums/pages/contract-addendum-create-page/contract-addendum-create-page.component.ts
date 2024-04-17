import { Component } from '@angular/core';
import { contractAddendumFormGroup } from '../../helpers';
import { ItemFormConfiguration, ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { ContractAddendum } from '@interface/contractAddendum';
import { ContractAddendumFormComponent } from '../../components/contract-addendum-form/contract-addendum-form.component';

@Component({
  selector: 'app-contract-addendum-create-page',
  standalone: true,
  imports: [ItemFormTemplateComponent, ContractAddendumFormComponent],
  templateUrl: './contract-addendum-create-page.component.html',
  styleUrl: './contract-addendum-create-page.component.scss'
})
export class ContractAddendumCreatePageComponent {
  public configuration: ItemFormConfiguration<ContractAddendum> = {
    type: 'create',
    titleModule: 'adenda',
    formGroup: contractAddendumFormGroup(),
    server: { url: 'contract-addendum' },
  };
}
