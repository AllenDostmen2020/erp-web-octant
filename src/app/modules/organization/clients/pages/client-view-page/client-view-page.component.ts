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
                routerLink: './billing-option',
                text: 'Opciones de facturación',
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
                routerLink: './account',
                text: 'Cajas',
            },
            {
                routerLink: './contract',
                text: 'Contratos',
            },
            {
                routerLink: './document',
                text: 'Documentos',
            },
            {
                routerLink: './payment',
                text: 'Pagos',
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
