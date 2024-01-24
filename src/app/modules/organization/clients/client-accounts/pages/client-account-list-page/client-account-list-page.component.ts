import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemListTemplateComponent } from '@component/item-list-template/item-list-template.component';
import { ClientAccount } from '@interface/clientAccount';
import { ItemListConfiguration, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, textColumn } from '@component/item-list-template/item-list-template.component';

@Component({
  selector: 'app-client-account-list-page',
  standalone: true,
  imports: [ItemListTemplateComponent],
  templateUrl: './client-account-list-page.component.html',
  styleUrl: './client-account-list-page.component.scss'
})
export class ClientAccountListPageComponent {
    private activatedRoute = inject(ActivatedRoute);
    public configList: ItemListConfiguration<ClientAccount> = {
        title: 'Cuentas del cliente',
        server: {
            url: 'client-account',
            queryParams: {
                client_id: this.activatedRoute.snapshot.parent?.parent?.paramMap.get('id')
            },
        },
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
            itemCreatedAtColumn(),
            itemUpdatedAtColumn(),
            itemStatusColumn(),
        ]),
    }
}
