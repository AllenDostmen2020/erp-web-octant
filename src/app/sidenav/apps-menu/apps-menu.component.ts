import { Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { FetchService } from '@service/fetch.service';

@Component({
  selector: 'app-apps-menu',
  standalone: true,
  imports: [
    MatMenuModule
  ],
  templateUrl: './apps-menu.component.html',
  styleUrls: ['./apps-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppsMenuComponent {
  private fetch = inject(FetchService);

  public async runBoot(): Promise<void> {
    await this.fetch.put('boot/execute', {}, {
      confirmDialog: {
        title: '¿Está seguro de ejecutar el Boot?',
        description: 'El Boot es un proceso que se ejecuta una vez al día y actualiza la información de la aplicación.',
        confirmButton: {
          text: 'Ejecutar Boot',
        }
      },
      toast: {
        loading: 'Ejecutando Boot...',
        success: 'El Boot se ha ejecutado correctamente.',
        error: 'No se ha podido ejecutar el Boot.'
      }
    });
  }
}
