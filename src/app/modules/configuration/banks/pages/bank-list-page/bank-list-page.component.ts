import { Component, signal } from '@angular/core';
import { ItemListTemplateComponent } from '@component/item-list-template/item-list-template.component';
import { Bank } from '@interface/bank';
import { ItemListConfiguration, defaultCreatedAtColumn, defaultStatusColumn, defaultUpdatedAtColumn, textColumn } from '@interface/itemList';

@Component({
    selector: 'app-bank-list-page',
    standalone: true,
    imports: [ItemListTemplateComponent],
    templateUrl: './bank-list-page.component.html',
    styleUrl: './bank-list-page.component.scss'
})
export class BankListPageComponent {
    public configList: ItemListConfiguration<Bank> = {
        title: 'Bancos',
        serverUrl: 'bank',
        columns: signal([
            textColumn({
                title: 'Código',
                sort: { key: 'code' },
                gridColumn: 'auto',
                displayValueFn: (item) => item.code,
            }),
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
