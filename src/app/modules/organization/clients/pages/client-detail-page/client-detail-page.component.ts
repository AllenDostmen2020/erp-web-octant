import { Component, inject } from '@angular/core';
import { ItemDetailTemplateComponent, actionButton, registerDataGroupDetail } from '@component/item-detail-template/item-detail-template.component';
import { Client } from '@interface/client';
import { ItemDetailConfiguration } from '@component/item-detail-template/item-detail-template.component';
import { ActivatedRoute, Router } from '@angular/router';

interface ExtClient extends Client {
    unidad_1: string;
    unidad_2: string;
    unidad_3: string;
    unidad_4: string;
    unidad_5: string;
    unidad_6: string;
}

@Component({
    selector: 'app-client-detail-page',
    standalone: true,
    imports: [ItemDetailTemplateComponent],
    templateUrl: './client-detail-page.component.html',
    styleUrl: './client-detail-page.component.scss'
})
export class ClientDetailPageComponent {
    private activatedRoute = inject(ActivatedRoute);
    private router = inject(Router);
    public configuration: ItemDetailConfiguration<ExtClient> = {
        title: 'Detalles',
        subtitle: false,
        server: {
            url: 'client',
            queryParams: { relations: 'clientBillingOption,clientBusinessUnits' }
        },
        backButton: false,
        editButton: false,
        deleteButton: false,
        parseItemFn: async(item) => {
            item.client_business_units?.forEach((unit, index) => {
                (item as any)[`unidad_${index + 1}`] = unit.name;
            });
            return item;
        },
        groups: [
            {
                title: 'Datos generales',
                icon: 'account_circle',
                details: [
                    {
                        title: 'T. Documento',
                        displayValueFn: (item) => item.document_type.toUpperCase()
                    },
                    {
                        title: 'N° Documento',
                        displayValueFn: (item) => item.document_number
                    },
                    {
                        title: 'Nombre',
                        displayValueFn: (item) => item.name
                    },
                    {
                        title: 'Dirección',
                        displayValueFn: (item) => item.address
                    },
                    {
                        title: 'Teléfono',
                        displayValueFn: (item) => item.phone,
                        type: 'phone'
                    },
                    {
                        title: 'Email',
                        displayValueFn: (item) => item.email,
                        type: 'email',
                    },
                ]
            },
            {
                title: 'Opciones de facturación',
                icon: 'quick_reference',
                details: [
                    {
                        title: 'Tipo de comprobante',
                        displayValueFn: (item) => item.client_billing_option?.comprobant_type.toUpperCase(),
                    },
                    {
                        title: 'Agrupar notas en un solo voucher',
                        displayValueFn: (item) => item.client_billing_option?.group_notes_single_voucher ? 'SI' : 'NO',
                    },
                    {
                        title: 'Detracción',
                        displayValueFn: (item) => item.client_billing_option?.detraction ? 'SI' : 'NO',
                    },
                    {
                        title: 'Porcentaje de detracción',
                        displayValueFn: (item) => item.client_billing_option?.detraction_percent ? item.client_billing_option?.detraction_percent : 0,
                        type: 'number'
                    },
                    {
                        title: 'Retención',
                        displayValueFn: (item) => item.client_billing_option?.retention ? 'SI' : 'NO',
                    },
                    {
                        title: 'Porcentaje de retención',
                        displayValueFn: (item) => item.client_billing_option?.retention_percent ? item.client_billing_option?.retention_percent : 0,
                        type: 'number'
                    },
                    {
                        title: 'Aplica IGV',
                        displayValueFn: (item) => item.client_billing_option?.igv_apply ? 'SI' : 'NO',
                    },
                ],
                actions: [
                    actionButton({
                        icon: 'edit',
                        text: 'Editar opciones de facturación',
                        style: 'text-button',
                        clickEvent: (item) => this.router.navigate(['./billing-option/edit'], { relativeTo: this.activatedRoute }),

                    })
                ]
            },
            {
                title: 'Unidades de negocio',
                icon: 'quick_reference',
                details: [
                    {
                        title: 'Unidad 1',
                        displayValueFn: (item) => item.unidad_1,
                    },
                    {
                        title: 'Unidad 2',
                        displayValueFn: (item) => item.unidad_2,
                    },
                    {
                        title: 'Unidad 3',
                        displayValueFn: (item) => item.unidad_3,
                    },
                    {
                        title: 'Unidad 4',
                        displayValueFn: (item) => item.unidad_4,
                    },
                    {
                        title: 'Unidad 5',
                        displayValueFn: (item) => item.unidad_5,
                    },
                    {
                        title: 'Unidad 6',
                        displayValueFn: (item) => item.unidad_6,
                    },
                ],
                actions: [
                    actionButton({
                        icon: 'edit',
                        text: 'Editar opciones de facturación',
                        style: 'text-button',
                        clickEvent: (item) => this.router.navigate(['./billing-option/edit'], { relativeTo: this.activatedRoute }),

                    })
                ]
            },
            registerDataGroupDetail(),
        ]
    }
}
