import { Component } from '@angular/core';
import { ItemDetailConfiguration, ItemDetailTemplateComponent, registerDataGroupDetail } from '@component/item-detail-template/item-detail-template.component';
import { ContractPenalty } from '@interface/contractPenalty';

@Component({
  selector: 'app-contract-penalty-detail-page',
  standalone: true,
  imports: [ItemDetailTemplateComponent],
  templateUrl: './contract-penalty-detail-page.component.html',
  styleUrl: './contract-penalty-detail-page.component.scss'
})
export class ContractPenaltyDetailPageComponent {
  public configuration: ItemDetailConfiguration<ContractPenalty> = {
    title: 'Detalles',
    server: { url: 'contract-penalty' },
    groups: [
        {
            title: 'Datos generales',
            icon: 'account_circle',
            details: [
                {
                    title: 'Razón',
                    displayValueFn: (item) => item.reason
                },
                {
                    title: 'Observación',
                    displayValueFn: (item) => item.observations
                },
            ]
        },
        registerDataGroupDetail(),
    ]
}
}
