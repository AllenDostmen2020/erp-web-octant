import { Component, signal } from '@angular/core';
import { ItemListConfiguration, ItemListTemplateComponent, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, textColumn } from '@component/item-list-template/item-list-template.component';
import { ContractPenalty } from '@interface/contractPenalty';

@Component({
  selector: 'app-contract-penalty-list-page',
  standalone: true,
  imports: [ItemListTemplateComponent],
  templateUrl: './contract-penalty-list-page.component.html',
  styleUrl: './contract-penalty-list-page.component.scss'
})
export class ContractPenaltyListPageComponent {
  public configList: ItemListConfiguration<ContractPenalty> = {
    title: 'Penalidades',
    server: {
        url: 'contract-penalty',
    },
    columns: signal([
        textColumn({
            title: 'Razón',
            sort: { key: 'reason' },
            routerLinkValue: { url: (item) => `../detail/${item.id}` },
            gridColumn: '1fr',
            displayValueFn: (item) => item.reason,
        }),
        textColumn({
            title: 'Observación',
            displayValueFn: (item) => item.observations,
        }),
        itemCreatedAtColumn(),
        itemUpdatedAtColumn(),
        itemStatusColumn(),
    ]),
}
}
