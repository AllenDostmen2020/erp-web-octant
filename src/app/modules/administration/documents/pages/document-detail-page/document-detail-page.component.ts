import { Component } from '@angular/core';
import { ItemDetailTemplateComponent, registerDataGroupDetail } from '@component/item-detail-template/item-detail-template.component';
import { Document } from '@interface/document';
import { ItemDetailConfiguration } from '@interface/itemDetail';

@Component({
  selector: 'app-document-detail-page',
  standalone: true,
  imports: [ItemDetailTemplateComponent],
  templateUrl: './document-detail-page.component.html',
  styleUrl: './document-detail-page.component.scss'
})
export class DocumentDetailPageComponent {
    public configuration: ItemDetailConfiguration<Document> = {
        title: 'Detalles',
        server: {
            url: 'document',
            queryParams: {relations: 'client'}
        },
        groups: [
            {
                title: 'Datos generales',
                icon: 'account_circle',
                details: [
                    {
                        title: 'Cliente',
                        displayValueFn: (item) => item.client?.name
                    },
                    {
                        title: 'Serie',
                        displayValueFn: (item) => item.serie
                    },
                    {
                        title: 'Correlativo',
                        displayValueFn: (item) => item.correlative
                    },
                    {
                        title: 'IGV',
                        displayValueFn: (item) => item.igv,
                        type: 'number'
                    },
                    {
                        title: 'Fecha de registro',
                        displayValueFn: (item) => item.registration_date,
                        type: 'date'
                    },
                    {
                        title: 'Fecha de asunto',
                        displayValueFn: (item) => item.issue_date,
                        type: 'date'
                    },
                    {
                        title: 'Fecha de expiración',
                        displayValueFn: (item) => item.expiration_date,
                        type: 'date'
                    },
                    {
                        title: 'Tipo de cambio',
                        displayValueFn: (item) => item.exchange_rate_sale,
                        type: 'number'
                    },
                    {
                        title: 'A crédito',
                        displayValueFn: (item) => item.credit_days ? 'SI': 'NO',
                    },
                    {
                        title: 'En cuotas',
                        displayValueFn: (item) => item.is_fees ? 'SI' : 'NO',
                    },
                    {
                        title: 'Es retención',
                        displayValueFn: (item) => item.is_retention ? 'SI' : 'NO',
                    },
                    {
                        title: 'Retención en (%) y en (S/.)',
                        displayValueFn: (item) => item.total_retention ? `${item.retention_percent}% - ${item.total_retention}0` : '--',
                    },
                    {
                        title: 'Es percepción',
                        displayValueFn: (item) => item.is_perception ? 'SI' : 'NO',
                    },
                    {
                        title: 'Percepción en (%) y en (S/.)',
                        displayValueFn: (item) => item.total_perception ? `${item.perception_percent}% - ${item.total_perception}` : '--',
                    },
                    {
                        title: 'Es detracción',
                        displayValueFn: (item) => item.is_detraction ? 'SI' : 'NO',
                    },
                    {
                        title: 'Detracción en (%) y en (S/.)',
                        displayValueFn: (item) => item.total_detraction ? `${item.detraction_percent}% - ${item.total_detraction}` : '--',
                    },
                    {
                        title: 'Información adicional',
                        displayValueFn: (item) => item.additional_information,
                    },
                    {
                        title: 'Información de la SUNAT',
                        displayValueFn: (item) => item.sunat_information,
                    },
                ]
            },
            registerDataGroupDetail(),
        ]
    }
}
