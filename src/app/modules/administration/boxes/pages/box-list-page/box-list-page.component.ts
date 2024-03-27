import { Component, signal } from '@angular/core';
import { ItemListConfiguration, ItemListTemplateComponent, firstLetterUppercaseColumn, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, numberColumn, textColumn } from '@component/item-list-template/item-list-template.component';
import { Box } from '@interface/box';

@Component({
  selector: 'app-box-list-page',
  standalone: true,
  imports: [ItemListTemplateComponent],
  templateUrl: './box-list-page.component.html',
  styleUrl: './box-list-page.component.scss'
})
export class BoxListPageComponent {
    public configList: ItemListConfiguration<Box> = {
        server: {
            url: 'box',
            queryParams: {
                relations: 'account,lastBoxOpening'
            }
        },
        title: 'Cajas',
        columns: signal([
            textColumn({
                title: 'Código',
                sort: { key: 'code' },
                displayValueFn: (item) => item.code,
            }),
            textColumn({
                title: 'Nombre',
                sort: { key: 'name' },
                routerLinkValue: { url: (item) => `../view/${item.id}` },
                gridColumn: '1fr',
                displayValueFn: (item) => item?.name ? item.name : '--',
            }),
            firstLetterUppercaseColumn({
                title: 'Tipo',
                sort: { key: 'type' },
                displayValueFn: (item) => item.type,
            }),
            firstLetterUppercaseColumn({
                title: 'Moneda',
                displayValueFn: (item) => item.account ? item.account.coin : item.coin,
            }),
            textColumn({
                title: 'Cuenta',
                gridColumn: 'fit-content(160px)',
                displayValueFn: (item) => item.account?.name ?? '--',
            }),
            numberColumn({
                title: 'Monto disponible',
                displayValueFn: (item) => item.amount,
            }),
            itemCreatedAtColumn(),
            itemUpdatedAtColumn(),
            itemStatusColumn(),
        ]),
    }
}
