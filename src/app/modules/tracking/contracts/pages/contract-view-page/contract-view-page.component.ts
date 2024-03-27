import { Component } from '@angular/core';
import { ItemViewTemplateComponent, ItemViewConfiguration } from '@component/item-view-template/item-view-template.component';
import { Contract } from '@interface/contract';

@Component({
  selector: 'app-contract-view-page',
  standalone: true,
  imports: [ItemViewTemplateComponent],
  templateUrl: './contract-view-page.component.html',
  styleUrl: './contract-view-page.component.scss'
})
export class ContractViewPageComponent {
  public configuration: ItemViewConfiguration<Contract> = {
    titleModule: 'Contrato',
    server: {
      url: 'contract',
      queryParams: { relations: 'client,clientBusinessUnit' },
    },
    nameItemFn: (item) => `${item.code} - ${item.client?.name}`,
    links: [
      {
        text: 'Detalles',
        routerLink: './detail',
      },
      {
        text: 'Vehículos',
        routerLink: './vehicle',
      },
      {
        text: 'Resolución',
        routerLink: './resolution',
      },
      {
        text: 'Documentos',
        routerLink: './document',
      },

    ]
  }
}
