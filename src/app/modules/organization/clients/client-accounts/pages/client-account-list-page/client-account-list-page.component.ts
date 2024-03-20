import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ItemListTemplateComponent, numberColumn } from '@component/item-list-template/item-list-template.component';
import { ClientBox } from '@interface/clientBox';
import { ItemListConfiguration, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, textColumn } from '@component/item-list-template/item-list-template.component';

@Component({
  selector: 'app-client-account-list-page',
  standalone: true,
  imports: [ItemListTemplateComponent, RouterLink],
  templateUrl: './client-account-list-page.component.html',
  styleUrl: './client-account-list-page.component.scss'
})
export class ClientAccountListPageComponent {
    private activatedRoute = inject(ActivatedRoute);
    public configList: ItemListConfiguration<ClientBox> = {
        title: 'Cuentas del cliente',
        server: {
            url: 'client-box',
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
            numberColumn({
                title: 'Saldo',
                gridColumn: 'auto',
                displayValueFn: (item) => item?.amount_available,
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
