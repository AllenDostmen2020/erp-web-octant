import { Component, WritableSignal, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { Contract } from '@interface/contract';
import { ItemFormConfiguration } from '@interface/itemForm';
import { ClientContractDocumentItemFormComponent } from '../../components/client-contract-document-item-form/client-contract-document-item-form.component';

export interface ItemFormDocumentContractItem {
  contract: Contract,
  periods: number,
}

@Component({
  selector: 'app-client-document-create',
  standalone: true,
  imports: [ItemFormTemplateComponent, ClientContractDocumentItemFormComponent],
  templateUrl: './client-document-create.component.html',
  styleUrl: './client-document-create.component.scss'
})
export class ClientDocumentCreateComponent {
  public items: WritableSignal<ItemFormDocumentContractItem[]> = signal([]);
  public formConfiguration: ItemFormConfiguration = {
    title: "Nuevo Documento",
    titleModule: "documento",
    type: "create",
    server: {
      url: 'client-document',
    },
    formGroup: new FormGroup({}),
  }

  addContract(contract: Contract) {
    this.items.update((data) => [...data, { contract, periods: 1 }]);
  }
}
