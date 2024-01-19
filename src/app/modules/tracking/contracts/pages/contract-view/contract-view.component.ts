import { Component } from '@angular/core';
import { ItemViewTemplateComponent } from '@component/item-view-template/item-view-template.component';
import { Contract } from '@interface/contract';
import { ItemViewConfiguration } from '@interface/itemView';

@Component({
  selector: 'app-contract-view',
  standalone: true,
  imports: [
    ItemViewTemplateComponent,
  ],
  templateUrl: './contract-view.component.html',
  styleUrl: './contract-view.component.scss'
})
export class ContractViewComponent {
  public configuration: ItemViewConfiguration<Contract> = {
    titleModule: 'Contrato',
    itemPathServer: 'contract',
    queryParams: { relations: 'client,clientBusinessUnit,plan' },
    nameItemFn: (item) => `${item.code} - ${item.client?.name}`,
    links: []
  }
}
