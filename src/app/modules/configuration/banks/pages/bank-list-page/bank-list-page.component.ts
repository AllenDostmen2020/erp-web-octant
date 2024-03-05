import { Component, signal } from '@angular/core';
import { ItemListTemplateComponent, ItemListConfiguration, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, textColumn } from '@component/item-list-template/item-list-template.component';
import { Bank } from '@interface/bank';

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
        server: { url: 'bank' },
        columns: signal([
            textColumn({
                title: 'Código',
                sort: { key: 'code' },
                displayValueFn: (item) => item.code,
            }),
            textColumn({
                title: 'Nombre',
                gridColumn: '1fr',
                sort: {
                    key: 'name',
                },
                routerLinkValue: {
                    url: (item) => `../detail/${item.id}`,
                },
                displayValueFn: (item) => item.name,
            }),
            itemCreatedAtColumn(),
            itemUpdatedAtColumn(),
            itemStatusColumn(),
        ]),
    }
}
