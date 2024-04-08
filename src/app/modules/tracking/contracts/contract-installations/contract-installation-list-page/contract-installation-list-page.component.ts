import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemListConfiguration, ItemListTemplateComponent, dateColumn, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, numberColumn, textColumn } from '@component/item-list-template/item-list-template.component';
import { ContractInstallation } from '@interface/contractInstallation';

@Component({
  selector: 'app-contract-installation-list-page',
  standalone: true,
  imports: [ItemListTemplateComponent],
  templateUrl: './contract-installation-list-page.component.html',
  styleUrl: './contract-installation-list-page.component.scss'
})
export class ContractInstallationListPageComponent {
  private activatedRoute = inject(ActivatedRoute);
  public configList: ItemListConfiguration<ContractInstallation> = {
    title: 'Instalaciones',
    server: {
      url: 'contract-installation',
      queryParams: {
        contract_id: this.activatedRoute.snapshot.parent?.parent?.paramMap.get('id')
      }
    },
    columns: signal([
      textColumn({
        title: 'Responsable',
        displayValueFn: (item) => `${item.responsible_name} ${item.responsible_paternal_name} ${item.responsible_maternal_name}`,
        routerLinkValue: {
          url: (item) => `../detail/${item.id}`,
        },
        gridColumn: '1fr',
      }),
      textColumn({
        title: 'Observación',
        gridColumn: 'fit-content(200px)',
        displayValueFn: (item) => item.observation,
      }),
      numberColumn({
        title: 'N° Vehículos',
        gridColumn: 'auto',
        numberFormat: '2.0-0',
        displayValueFn: (item) => item.contract_plan_vehicles_quantity,
      }),
      dateColumn({
        title: 'F. Instalación',
        gridColumn: 'auto',
        displayValueFn: (item) => item.date,
      }),
      itemCreatedAtColumn(),
      itemUpdatedAtColumn(),
      itemStatusColumn(),
    ]),
  }
}
