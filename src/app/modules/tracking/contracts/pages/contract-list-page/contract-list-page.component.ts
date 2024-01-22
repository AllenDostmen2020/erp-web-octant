import { Component, signal } from '@angular/core';
import { ItemListTemplateComponent } from '@component/item-list-template/item-list-template.component';
import { Contract } from '@interface/contract';
import { ItemListConfiguration, dateColumn, defaultCreatedAtColumn, defaultStatusColumn, defaultUpdatedAtColumn, numberColumn, textColumn } from '@interface/itemList';

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
    serverUrl: 'contract',
    queryParams: { relations: 'client,clientBusinessUnit,plan' },
    columns: signal([
      textColumn({
        title: 'Código',
        displayValueFn: (item) => item.code,
        routerLinkValue: { url: (item) => `/tracking/contract/view/${item.id}` },
      }),
      textColumn({
        title: 'Cliente / Unidad de negocio',
        displayValueFn: (item) => item.client?.name,
        displayAdditionalValueFn: (item) => item.client_business_unit?.name,
        gridColumn: '1fr',
        routerLinkValue: { url: (item) => `/organization/client/view/${item.client?.id}` },
      }),
      textColumn({
        title: 'Plan',
        displayValueFn: (item) => item.plan?.name,
      }),
      numberColumn({
        title: 'Unidades',
        displayValueFn: (item) => item.quantity,
        numberFormat: '2.0-0',
      }),
      numberColumn({
        title: 'Precio Und.',
        displayValueFn: (item) => item.sale_price,
      }),
      dateColumn({
        title: 'Fecha de inicio',
        displayValueFn: (item) => item.start_date,
      }),
      dateColumn({
        title: 'Fecha de fin',
        displayValueFn: (item) => item.end_date,
      }),
      defaultCreatedAtColumn(),
      defaultUpdatedAtColumn(),
      defaultStatusColumn(),
    ])
  }; 
}
