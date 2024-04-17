import { Component } from '@angular/core';
import { ItemDetailConfiguration, ItemDetailTemplateComponent, registerDataGroupDetail } from '@component/item-detail-template/item-detail-template.component';
import { ContractAddendum } from '@interface/contractAddendum';

@Component({
  selector: 'app-contract-addendum-detail-page',
  standalone: true,
  imports: [ItemDetailTemplateComponent],
  templateUrl: './contract-addendum-detail-page.component.html',
  styleUrl: './contract-addendum-detail-page.component.scss'
})
export class ContractAddendumDetailPageComponent {
  public configuration: ItemDetailConfiguration<ContractAddendum> = {
    title: 'Detalles',
    server: { url: 'contract-addendum' },
    groups: [
        {
            title: 'Datos generales',
            icon: 'account_circle',
            details: [
                {
                    title: 'Responsable',
                    displayValueFn: (item) => `${item.responsible_name} ${item.responsible_paternal_name} ${item.responsible_maternal_name}`
                },
                {
                    title: 'F. Validación',
                    displayValueFn: (item) => item.validity_date,
                    type: 'date'
                },
                {
                    title: 'F. Firma',
                    displayValueFn: (item) => item.signature_date,
                    type: 'date'
                },
            ]
        },
        registerDataGroupDetail(),
    ]
}
}
