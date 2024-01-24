import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemListTemplateComponent } from '@component/item-list-template/item-list-template.component';
import { ClientBusinessUnit } from '@interface/clientBusinessUnit';
import { ItemListConfiguration, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, textColumn } from '@component/item-list-template/item-list-template.component';

@Component({
  selector: 'app-client-business-unit-list-page',
  standalone: true,
  imports: [ItemListTemplateComponent],
  templateUrl: './client-business-unit-list-page.component.html',
  styleUrl: './client-business-unit-list-page.component.scss'
})
export class ClientBusinessUnitListPageComponent {
    private activatedRoute = inject(ActivatedRoute);
    public configList: ItemListConfiguration<ClientBusinessUnit> = {
        title: 'Unidades de negocio',
        server: {
            url: 'client-business-unit',
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
            itemCreatedAtColumn(),
            itemUpdatedAtColumn(),
            itemStatusColumn(),
        ]),
    }
}
