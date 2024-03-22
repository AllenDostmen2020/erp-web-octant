import { Component } from '@angular/core';
import { ItemDetailTemplateComponent, registerDataGroupDetail } from '@component/item-detail-template/item-detail-template.component';
import { CodeCountry } from '@interface/codeCountry';
import { ItemDetailConfiguration } from '@interface/itemDetail';

@Component({
  selector: 'app-code-country-detail-page',
  standalone: true,
  imports: [ItemDetailTemplateComponent],
  templateUrl: './code-country-detail-page.component.html',
  styleUrl: './code-country-detail-page.component.scss'
})
export class CodeCountryDetailPageComponent {
  public configuration: ItemDetailConfiguration<CodeCountry> = {
    title: 'Detalles',
    server: { url: 'code-country' },
    groups: [
        {
            title: 'Datos generales',
            icon: 'account_circle',
            details: [
                {
                    title: 'Código',
                    displayValueFn: (item) => item.code
                },
                {
                    title: 'país',
                    displayValueFn: (item) => item.country
                },
            ]
        },
        registerDataGroupDetail(),
    ]
}
}
