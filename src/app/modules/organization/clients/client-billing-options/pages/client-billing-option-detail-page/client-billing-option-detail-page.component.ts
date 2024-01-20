import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemDetailTemplateComponent, registerDataGroupDetail } from '@component/item-detail-template/item-detail-template.component';
import { ClientBillingOption } from '@interface/clientBillingOption';
import { FetchErrorResponse } from '@interface/fetch';
import { ItemDetailConfiguration } from '@interface/itemDetail';

@Component({
  selector: 'app-client-billing-option-detail-page',
  standalone: true,
  imports: [ItemDetailTemplateComponent],
  templateUrl: './client-billing-option-detail-page.component.html',
  styleUrl: './client-billing-option-detail-page.component.scss'
})
export class ClientBillingOptionDetailPageComponent {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  public configuration: ItemDetailConfiguration<ClientBillingOption> = {
    title: 'Detalles de opciones de facturación',
    itemPathServer: 'client-billing-option',
    itemId: this.activatedRoute.parent?.parent?.snapshot.paramMap.get('id')!,
    editButton: {
      routerLink: {
        url: '../edit'
      }
    },
    interceptHttpErrorItemFn: (error: FetchErrorResponse) => {
      if (error.status == 404) {
        this.router.navigate(['../create'], { relativeTo: this.activatedRoute });
      }
    },
    groups: [
      {
        title: 'Detalles',
        details: [
          {
            title: 'Tipo de comprobante',
            displayValueFn: (item) => item.comprobant_type.toUpperCase(),
          },
          {
            title: 'Agrupar notas en un solo voucher',
            displayValueFn: (item) => item.group_notes_single_voucher ? 'SI' : 'NO',
          },
          {
            title: 'Detracción',
            displayValueFn: (item) => item.detraction ? 'SI' : 'NO',
          },
          {
            title: 'Porcentaje de detracción',
            displayValueFn: (item) => item.detraction_percent ? item.detraction_percent : 0,
            type: 'number'
          },
          {
            title: 'Retención',
            displayValueFn: (item) => item.retention ? 'SI' : 'NO',
          },
          {
            title: 'Porcentaje de retención',
            displayValueFn: (item) => item.retention_percent ? item.retention_percent : 0,
            type: 'number'
          },
        ]
      },
      registerDataGroupDetail(),
    ],
  }
}
