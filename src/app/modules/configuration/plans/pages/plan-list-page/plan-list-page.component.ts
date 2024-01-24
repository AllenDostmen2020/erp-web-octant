import { Component, signal } from '@angular/core';
import { ItemListTemplateComponent } from '@component/item-list-template/item-list-template.component';
import { CoinEnum } from '@interface/baseModel';
import { ItemListConfiguration, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, textColumn } from '@component/item-list-template/item-list-template.component';
import { Plan } from '@interface/plan';

@Component({
    selector: 'app-plan-list-page',
    standalone: true,
    imports: [ItemListTemplateComponent],
    templateUrl: './plan-list-page.component.html',
    styleUrl: './plan-list-page.component.scss'
})
export class PlanListPageComponent {
    public configList: ItemListConfiguration<Plan> = {
        title: 'Planes',
        server: { url: 'plan' },
        columns: signal([
            textColumn({
                title: 'Nombre',
                sort: { key: 'name' },
                routerLinkValue: { url: (item) => `../detail/${item.id}` },
                gridColumn: '1fr',
                displayValueFn: (item) => item?.name ? item.name : '--',
            }),
            textColumn({
                title: 'Precio',
                sort: { key: 'price' },
                gridColumn: 'auto',
                displayValueFn: (item) => item.coin == CoinEnum.SOLES ? `S/. ${item.price}` : `$ ${item.price}`,
            }),
            itemCreatedAtColumn(),
            itemUpdatedAtColumn(),
            itemStatusColumn(),
        ]),
    }
}
