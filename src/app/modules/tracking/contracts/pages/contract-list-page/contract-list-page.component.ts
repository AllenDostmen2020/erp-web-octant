import { Component, signal } from '@angular/core';
import { ItemListTemplateComponent, ItemListConfiguration, dateColumn, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, numberColumn, textColumn, uppercaseColumn } from '@component/item-list-template/item-list-template.component';
import { Contract } from '@interface/contract';
import { contractColumnsList } from '../../helpers';

@Component({
  selector: 'app-contract-list-page',
  standalone: true,
  imports: [ItemListTemplateComponent],
  templateUrl: './contract-list-page.component.html',
  styleUrl: './contract-list-page.component.scss'
})
export class ContractListPageComponent {
  public configuration: ItemListConfiguration<Contract> = {
    title: 'Contratos',
    server: {
      url: 'contract',
      queryParams: { relations: 'client,clientBusinessUnit,plan' },
    },
    columns: signal(contractColumnsList())
  };
}
