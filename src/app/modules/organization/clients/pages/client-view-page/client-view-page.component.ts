import { Component } from '@angular/core';
import { ItemViewTemplateComponent, ItemViewConfiguration } from '@component/item-view-template/item-view-template.component';

@Component({
  selector: 'app-client-view-page',
  standalone: true,
  imports: [ItemViewTemplateComponent],
  templateUrl: './client-view-page.component.html',
  styleUrl: './client-view-page.component.scss'
})
export class ClientViewPageComponent {
    public config: ItemViewConfiguration = {
        server: { url: 'client' },
        titleModule: 'Cliente',
        links: [
            {
                routerLink: './detail',
                text: 'Detalle',
            },
            {
                routerLink: './business-unit',
                text: 'Unidades de negocio',
            },
            {
                routerLink: './contact',
                text: 'Contactos',
            },
            {
                routerLink: './box-movements',
                text: 'Pagos y movimientos',
            },
            {
                routerLink: './contract',
                text: 'Contratos',
            },
            {
                routerLink: './document',
                text: 'Facturas',
            },
            {
                routerLink: './vehicle',
                text: 'Vehículos',
            },
            {
                routerLink: './comprobant-payments',
                text: 'Pagar comprobantes',
            },
        ]
    }
}
