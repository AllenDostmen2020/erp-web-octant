import { Component, signal } from '@angular/core';
import { ItemListConfiguration, ItemListTemplateComponent, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, numberColumn, textColumn } from '@component/item-list-template/item-list-template.component';
import { BoxMovement } from '@interface/boxMovement';

@Component({
  selector: 'app-box-movement-list-page',
  standalone: true,
  imports: [ItemListTemplateComponent],
  templateUrl: './box-movement-list-page.component.html',
  styleUrl: './box-movement-list-page.component.scss'
})
export class BoxMovementListPageComponent {
    public configList: ItemListConfiguration<BoxMovement> = {
        server: {
            url: 'box-movement',
            queryParams: 'relations=boxOpening.box'
        },
        createButton: false,
        title: 'Cajas',
        columns: signal([
            textColumn({
                title: 'Código',
                sort: { key: 'code' },
                displayValueFn: (item) => item.code,
            }),
            textColumn({
                title: 'Nombre',
                routerLinkValue: {
                    url: (item) => `box-movement/detail/${item.id}`,
                    outlet: 'route-lateral'
                },
                gridColumn: '1fr',
                displayValueFn: (item) => item?.concept ? item.concept : '--',
            }),
            textColumn({
                title: 'Caja',
                gridColumn: 'fit-content(160px)',
                displayValueFn: (item) => item.box_opening?.box?.name ?? '--',
            }),
            numberColumn({
                title: 'Monto',
                displayValueFn: (item) => item.amount,
            }),
            itemCreatedAtColumn(),
            itemUpdatedAtColumn(),
            itemStatusColumn(),
        ]),
    }
}
