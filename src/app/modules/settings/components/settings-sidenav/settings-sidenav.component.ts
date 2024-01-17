import { Component } from '@angular/core';
import { PanelDrawerTemplateComponent, PanelSidenavConfiguration } from '@component/panel-drawer-template/panel-drawer-template.component';

@Component({
  selector: 'app-settings-sidenav',
  standalone: true,
  imports: [PanelDrawerTemplateComponent],
  templateUrl: './settings-sidenav.component.html',
  styleUrl: './settings-sidenav.component.scss'
})
export class SettingsSidenavComponent {
  public configuration: PanelSidenavConfiguration = {
    groups: [
      {
        title: 'Cotizaciones',
        links: [
          {
            title: 'Nueva cotización',
            routerLink: { url: '/quotation/create' },
          },
          {
            title: 'Recientes',
            routerLink: { url: './abc' },
          },
          {
            title: 'Almacenamiento',
            routerLink: { url: './storage' },
            children: [
              {
                title: 'Cotizaciones',
                routerLink: { url: './storage/quotation' },
              },
              {
                title: 'Clientes',
                routerLink: { url: './storage/customer' },
              },
              {
                title: 'Proveedores',
                routerLink: { url: './storage/provider' },
              },
            ]
          }
        ]
      }
    ]
  }
}
