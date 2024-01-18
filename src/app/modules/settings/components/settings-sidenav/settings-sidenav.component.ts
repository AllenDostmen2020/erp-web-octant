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
        title: 'Principal',
        links: [
          {
            title: 'Perfil',
            routerLink: { url: './application' },
          },
          {
            title: 'Aplicación',
            routerLink: { url: './application' },
          },
          {
            title: 'Notificaciones',
            routerLink: { url: './notifications' },
          },
        ]
      },
      {
        title: 'Seguridad',
        links: [
          {
            title: 'Contraseña',
            routerLink: { url: './password' },
          },
          {
            title: 'Almacenamiento de datos',
            routerLink: { url: './storage' },
            children: [
              {
                title: 'Guía',
                routerLink: { url: './storage/guide' },
              },
              {
                title: 'Datos locales',
                routerLink: { url: './storage/customer' },
              },
              {
                title: 'Datos en servidor',
                routerLink: { url: './storage/provider' },
              },
            ]
          },
        ]
      }
    ]
  }
}
