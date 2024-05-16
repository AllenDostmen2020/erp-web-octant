import { Component } from '@angular/core';
import { ItemDetailTemplateComponent, actionButton, registerDataGroupDetail } from '@component/item-detail-template/item-detail-template.component';
import { Client } from '@interface/client';
import { ItemDetailConfiguration } from '@component/item-detail-template/item-detail-template.component';

@Component({
  selector: 'app-client-detail-page',
  standalone: true,
  imports: [ItemDetailTemplateComponent],
  templateUrl: './client-detail-page.component.html',
  styleUrl: './client-detail-page.component.scss'
})
export class ClientDetailPageComponent {
    public configuration: ItemDetailConfiguration<Client> = {
        title: 'Detalles',
        subtitle: false,
        server: { 
            url: 'client',
            queryParams: { relations: 'clientBillingOption' }
         },
        backButton: false,
        editButton: false,
        deleteButton: false,
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
                        text: 'Editar',
                        style: 'text-button',
                        clickEvent: (item)=> console.log(item),
                        
                    })
                ]
            },
            registerDataGroupDetail(),
        ]
    }
}
