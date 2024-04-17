import { Component, signal } from '@angular/core';
import { ItemListConfiguration, ItemListTemplateComponent, dateColumn, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, textColumn } from '@component/item-list-template/item-list-template.component';
import { ContractAddendum } from '@interface/contractAddendum';

@Component({
  selector: 'app-contract-addendum-list-page',
  standalone: true,
  imports: [ItemListTemplateComponent],
  templateUrl: './contract-addendum-list-page.component.html',
  styleUrl: './contract-addendum-list-page.component.scss'
})
export class ContractAddendumListPageComponent {
  public configList: ItemListConfiguration<ContractAddendum> = {
    title: 'Adendas',
    server: {
        url: 'contract-addendum',
    },
    columns: signal([
        textColumn({
            title: 'Nombre',
            routerLinkValue: { url: (item) => `../detail/${item.id}` },
            gridColumn: '1fr',
            displayValueFn: (item) => item?.responsible_name ? `${item.responsible_name} ${item.responsible_paternal_name} ${item.responsible_maternal_name}` : '--',
        }),
        dateColumn({
            title: 'F. Validación',
            displayValueFn: (item) => item.validity_date,
        }),
        dateColumn({
            title: 'F. Firma',
            displayValueFn: (item) => item.signature_date,
        }),
        itemCreatedAtColumn(),
        itemUpdatedAtColumn(),
        itemStatusColumn(),
    ]),
}
}
