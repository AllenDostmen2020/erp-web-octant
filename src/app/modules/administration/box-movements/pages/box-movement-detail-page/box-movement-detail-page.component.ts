import { Component } from '@angular/core';
import { ItemDetailConfiguration, ItemDetailTemplateComponent, registerDataGroupDetail } from '@component/item-detail-template/item-detail-template.component';
import { BoxMovement } from '@interface/boxMovement';

@Component({
  selector: 'app-box-movement-detail-page',
  standalone: true,
  imports: [ItemDetailTemplateComponent],
  templateUrl: './box-movement-detail-page.component.html',
  styleUrl: './box-movement-detail-page.component.scss'
})
export class BoxMovementDetailPageComponent {
  public configuration: ItemDetailConfiguration<BoxMovement> = {
    title: 'Detalles',
    server: {
      url: 'box-movement',
      queryParams: { relations: 'bank,boxOpening.box' }
    },
    editButton: false,
    deleteButton: false,
    groups: [
      {
        title: 'Datos generales',
        icon: 'account_circle',
        details: [
          {
            title: 'Tipo',
            displayValueFn: (item) => item.type
          },
          {
            title: 'Concepto',
            displayValueFn: (item) => item.concept
          },
          {
            title: 'Tipo de pago',
            displayValueFn: (item) => item.payment_type
          },
          {
            title: 'Banco',
            displayValueFn: (item) => item.bank?.name
          },
          {
            title: 'Fecha de pago',
            displayValueFn: (item) => item.payment_date,
            type: 'date'
          },
          {
            title: 'Monto',
            displayValueFn: (item) => item.amount,
            type: 'currency'
          },
          {
            title: 'Caja',
            displayValueFn: (item) => item.box_opening?.box?.name,
          },
        ]
      },
      registerDataGroupDetail(),
    ]
  }
}
