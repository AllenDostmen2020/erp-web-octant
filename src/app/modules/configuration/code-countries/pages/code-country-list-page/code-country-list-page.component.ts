import { Component, signal } from '@angular/core';
import { ItemListConfiguration, ItemListTemplateComponent, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, textColumn } from '@component/item-list-template/item-list-template.component';
import { CodeCountry } from '@interface/codeCountry';

@Component({
  selector: 'app-code-country-list-page',
  standalone: true,
  imports: [ItemListTemplateComponent],
  templateUrl: './code-country-list-page.component.html',
  styleUrl: './code-country-list-page.component.scss'
})
export class CodeCountryListPageComponent {
  public configList: ItemListConfiguration<CodeCountry> = {
    title: 'Códigos de país',
    server: { url: 'code-country' },
    columns: signal([
        textColumn({
            title: 'Código',
            sort: { key: 'code' },
            displayValueFn: (item) => item.code,
        }),
        textColumn({
            title: 'País',
            gridColumn: '1fr',
            sort: {
                key: 'country',
            },
            routerLinkValue: {
                url: (item) => `../detail/${item.id}`,
            },
            displayValueFn: (item) => item.country,
        }),
        itemCreatedAtColumn(),
        itemUpdatedAtColumn(),
        itemStatusColumn(),
    ]),
}
}
