import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ItemDetailTemplateComponent, registerDataGroupDetail, ItemDetailConfiguration, textDetail, dateDetail, numberDetail } from '@component/item-detail-template/item-detail-template.component';
import { Document } from '@interface/document';

@Component({
    selector: 'app-document-detail-page',
    standalone: true,
    imports: [ItemDetailTemplateComponent, TitleCasePipe, DecimalPipe],
    templateUrl: './document-detail-page.component.html',
    styleUrl: './document-detail-page.component.scss'
})
export class DocumentDetailPageComponent {
    @ViewChild('previewRef') previewRef!: TemplateRef<any>;

    public configuration: ItemDetailConfiguration<Document> = {
        title: 'Detalles',
        server: {
            url: 'document',
            queryParams: { 
                relations: 'client,documentItems'
            },
        },
        editButton: false,
        deleteButton: false,
        groups: [
            {
                title: 'Datos generales',
                icon: 'account_circle',
                details: [
                    textDetail({
                        title: 'Cliente',
                        displayValueFn: (item) => item.client?.name,
                    }),
                    textDetail({
                        title: 'Serie',
                        displayValueFn: (item) => item.serie
                    }),
                    textDetail({
                        title: 'Correlativo',
                        displayValueFn: (item) => item.correlative
                    }),
                    dateDetail({
                        title: 'Fecha emisión',
                        displayValueFn: (item) => item.emit_date
                    }),
                    dateDetail({
                        title: 'Fecha expira',
                        displayValueFn: (item) => item.expiration_date
                    }),
                    textDetail({
                        title: '¿En cuotas?',
                        displayValueFn: (item) => item.fees ? 'SI' : 'NO'
                    }),
                    numberDetail({
                        title: 'Subtotal',
                        displayValueFn: (item) => item.total_value
                    }),
                    numberDetail({
                        title: 'IGV %',
                        displayValueFn: (item) => item.igv
                    }),
                    numberDetail({
                        title: 'IGV S/.',
                        displayValueFn: (item) => item.total_igv
                    }),
                    textDetail({
                        title: '¿Retención?',
                        displayValueFn: (item) => item.retention ? 'SI' : 'NO'
                    }),
                    numberDetail({
                        title: 'Retención %',
                        hidden: (item) => !item.retention,
                        displayValueFn: (item) => item.retention_percent
                    }),
                    numberDetail({
                        title: 'Retención S/.',
                        hidden: (item) => !item.retention,
                        displayValueFn: (item) => item.total_retention
                    }),
                    textDetail({
                        title: '¿Percepción?',
                        displayValueFn: (item) => item.perception ? 'SI' : 'NO'
                    }),
                    numberDetail({
                        title: 'Percepción %',
                        hidden: (item) => !item.perception,
                        displayValueFn: (item) => item.perception_percent
                    }),
                    numberDetail({
                        title: 'Percepción S/.',
                        hidden: (item) => !item.perception,
                        displayValueFn: (item) => item.total_perception
                    }),
                    textDetail({
                        title: '¿Detracción?',
                        displayValueFn: (item) => item.detraction ? 'SI' : 'NO'
                    }),
                    numberDetail({
                        title: 'Detracción %',
                        hidden: (item) => !item.detraction,
                        displayValueFn: (item) => item.detraction_percent
                    }),
                    numberDetail({
                        title: 'Detracción S/.',
                        hidden: (item) => !item.detraction,
                        displayValueFn: (item) => item.total_detraction
                    }),
                    numberDetail({
                        title: 'Total',
                        displayValueFn: (item) => item.total
                    }),
                    textDetail({
                        title: 'SUNAT Inf.',
                        displayValueFn: (item) => item.sunat_information
                    }),
                    textDetail({
                        title: '¿Enviado por Email?',
                        displayValueFn: (item) => item.send_email ? 'Si' : 'No',
                    }),
                    // textDetail({
                    //     title: 'Copias Email',
                    //     displayValueFn: (item) => item.cc_email,
                    // }),
                    
                ]
            },
            registerDataGroupDetail(),
        ]
    }

    ngAfterViewInit() {
        console.log(this.previewRef);
        this.configuration.groups.push(
            {
                icon: 'preview',
                title: 'Vista previa',
                template: {
                    ref: this.previewRef,
                },
                details: [],
            }
        )
    }
}
