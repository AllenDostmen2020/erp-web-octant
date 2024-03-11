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
                        title: 'Fecha emisión',
                        displayValueFn: (item) => item.emit_date,
                        type: 'date'
                    },
                    {
                        title: 'Fecha expira',
                        displayValueFn: (item) => item.expiration_date,
                        type: 'date'
                    },
                    {
                        title: 'A crédito',
                        displayValueFn: (item) => item.fees ? 'SI': 'NO',
                    },
                    {
                        title: 'Subtotal.',
                        displayValueFn: (item) => item.total_value,
                        type: 'number'
                    },
                    {
                        title: 'IGV %',
                        displayValueFn: (item) => item.igv,
                        type: 'number'
                    },
                    {
                        title: 'IGV S/.',
                        displayValueFn: (item) => item.total_igv,
                        type: 'number'
                    },
                    {
                        title: 'Retención',
                        displayValueFn: (item) => item.retention ? 'SI' : 'NO',
                    },
                    {
                        title: 'Retención %',
                        displayValueFn: (item) => item.retention_percent,
                    },
                    {
                        title: 'Retención S/.',
                        displayValueFn: (item) => item.total_retention,
                    },
                    {
                        title: 'Percepción',
                        displayValueFn: (item) => item.perception ? 'SI' : 'NO',
                    },
                    {
                        title: 'Percepción %',
                        displayValueFn: (item) => item.perception_percent,
                    },
                    {
                        title: 'Percepción S/.',
                        displayValueFn: (item) => item.total_perception,
                    },
                    {
                        title: 'Detracción',
                        displayValueFn: (item) => item.detraction ? 'SI' : 'NO',
                    },
                    {
                        title: 'Detracción %',
                        displayValueFn: (item) => item.detraction_percent,
                    },
                    {
                        title: 'Detracción S/.',
                        displayValueFn: (item) => item.total_detraction,
                    },
                    {
                        title: 'Total',
                        displayValueFn: (item) => item.total,
                    },
                    {
                        title: 'SUNAT Inf.',
                        displayValueFn: (item) => item.sunat_information,
                    },
                ]
            },
            registerDataGroupDetail(),
        ]
    }
}
