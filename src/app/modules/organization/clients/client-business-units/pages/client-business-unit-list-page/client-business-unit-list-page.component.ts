import { Component, signal } from '@angular/core';
import { ItemListTemplateComponent } from '@component/item-list-template/item-list-template.component';
import { ClientBusinessUnit } from '@interface/clientBusinessUnit';
import { ItemListConfiguration, defaultCreatedAtColumn, defaultStatusColumn, defaultUpdatedAtColumn, textColumn } from '@interface/itemList';

@Component({
  selector: 'app-client-business-unit-list-page',
  standalone: true,
  imports: [ItemListTemplateComponent],
  templateUrl: './client-business-unit-list-page.component.html',
  styleUrl: './client-business-unit-list-page.component.scss'
})
export class ClientBusinessUnitListPageComponent {
    public configList: ItemListConfiguration<ClientBusinessUnit> = {
        title: 'Unidades de negocio',
        serverUrl: 'client-business-unit',
        columns: signal([
            textColumn({
                title: 'Nombre',
                sort: { key: 'name' },
                routerLinkValue: { url: (item) => `../detail/${item.id}` },
                gridColumn: '1fr',
                displayValueFn: (item) => item?.name ? item.name : '--',
            }),
            defaultCreatedAtColumn(),
            defaultUpdatedAtColumn(),
            defaultStatusColumn(),
        ]),
    }
}
