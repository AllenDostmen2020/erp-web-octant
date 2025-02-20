import { Component, signal } from '@angular/core';
import { ItemListTemplateComponent } from '@component/item-list-template/item-list-template.component';
import { Account } from '@interface/account';
import { ItemListConfiguration, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, textColumn } from '@component/item-list-template/item-list-template.component';

@Component({
    selector: 'app-account-list-page',
    standalone: true,
    imports: [ItemListTemplateComponent],
    templateUrl: './account-list-page.component.html',
    styleUrl: './account-list-page.component.scss'
})
export class AccountListPageComponent {
    public configList: ItemListConfiguration<Account> = {
        title: 'Cuentas',
        server: {
            url: 'account',
            queryParams: { relations: 'bank' },
        },
        columns: signal([
            textColumn({
                title: 'Nombre',
                sort: { key: 'name' },
                routerLinkValue: { url: (item) => `../view/${item.id}` },
                gridColumn: '1fr',
                displayValueFn: (item) => item?.name ? item.name : '--',
            }),
            textColumn({
                title: 'Número',
                sort: { key: 'number' },
                displayValueFn: (item) => item.number,
            }),
            textColumn({
                title: 'Banco',
                gridColumn: 'fit-content(120px)',
                displayValueFn: (item) => item.bank?.name,
            }),
            textColumn({
                title: 'Moneda',
                sort: { key: 'coin' },
                gridColumn: 'fit-content(120px)',
                displayValueFn: (item) => item.coin,
            }),
            itemCreatedAtColumn(),
            itemUpdatedAtColumn(),
            itemStatusColumn(),
        ]),
    }
}
