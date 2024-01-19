import { Component, signal } from '@angular/core';
import { ItemListTemplateComponent } from '@component/item-list-template/item-list-template.component';
import { ClientAccount } from '@interface/clientAccount';
import { ItemListConfiguration, defaultCreatedAtColumn, defaultStatusColumn, defaultUpdatedAtColumn, textColumn } from '@interface/itemList';

@Component({
  selector: 'app-client-account-list-page',
  standalone: true,
  imports: [ItemListTemplateComponent],
  templateUrl: './client-account-list-page.component.html',
  styleUrl: './client-account-list-page.component.scss'
})
export class ClientAccountListPageComponent {
    public configList: ItemListConfiguration<ClientAccount> = {
        title: 'Cuentas del cliente',
        serverUrl: 'client-account',
        columns: signal([
            textColumn({
                title: 'Nombre',
                sort: { key: 'name' },
                routerLinkValue: { url: (item) => `../detail/${item.id}` },
                gridColumn: '1fr',
                displayValueFn: (item) => item?.name ? item.name : '--',
            }),
            textColumn({
                title: 'Tipo',
                sort: { key: 'type' },
                gridColumn: 'auto',
                displayValueFn: (item) => item?.type,
            }),
            defaultCreatedAtColumn(),
            defaultUpdatedAtColumn(),
            defaultStatusColumn(),
        ]),
    }
}
