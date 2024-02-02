import { Component } from '@angular/core';
import { AlertConfiguration, AlertTemplateComponent } from '@component/alert-template/alert-template.component';
import { ItemViewTemplateComponent } from '@component/item-view-template/item-view-template.component';
import { ItemViewConfiguration } from '@interface/itemView';

@Component({
  selector: 'app-client-view-page',
  standalone: true,
  imports: [ItemViewTemplateComponent, AlertTemplateComponent],
  templateUrl: './client-view-page.component.html',
  styleUrl: './client-view-page.component.scss'
})
export class ClientViewPageComponent {
    public alertConfiguration: AlertConfiguration = {
        showCloseButton: true,
        icon: 'warning',
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque ut eum praesentium accusamus alias libero ipsam, obcaecati reprehenderit dignissimos sed qui pariatur neque aliquam voluptatibus autem, exercitationem vitae nihil! Nisi? Autem, officiis distinctio ipsam ad neque quisquam labore.',
    }
    public config: ItemViewConfiguration = {
        server: { url: 'client' },
        titleModule: 'Cliente',
        links: [
            {
                routerLink: './detail',
                text: 'Detalle',
            },
            {
                routerLink: './account',
                text: 'Cuentas',
            },
            {
                routerLink: './contact',
                text: 'Contactos',
            },
            {
                routerLink: './business-unit',
                text: 'Unidades de negocio',
            },
            {
                routerLink: './billing-option',
                text: 'Opciones de facturación',
            },
            {
                routerLink: './contract',
                text: 'Contratos',
            },
            {
                routerLink: './document',
                text: 'Documentos',
            },
        ]
    }
}
