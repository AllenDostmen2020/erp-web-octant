import { Component } from '@angular/core';
import { ItemDetailConfiguration, ItemDetailTemplateComponent, registerDataGroupDetail, textDetail } from '@component/item-detail-template/item-detail-template.component';
import { CodeCountry } from '@interface/codeCountry';

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
                    textDetail({
                        title: 'Código',
                        displayValueFn: (item) => item.code
                    }),
                    textDetail({
                        title: 'país',
                        displayValueFn: (item) => item.country
                    }),
                ]
            },
            registerDataGroupDetail(),
        ]
    }
}
