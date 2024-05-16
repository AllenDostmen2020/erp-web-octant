import { Component, ViewEncapsulation, inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { FetchService } from '@service/fetch.service';
import { DatabaseStorageService } from '@service/database-storage.service';
import { ToastService } from '@service/toast.service';

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
  private databaseStorage = inject(DatabaseStorageService);
  private toast = inject(ToastService);

  public async runBootDocuments(): Promise<void> {
    await this.fetch.put('boot/documents', {}, {
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

  public async runBootContracts(): Promise<void> {
    await this.fetch.put('boot/contracts', {}, {
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

  public async deleteLocalData(): Promise<void> {
    await this.databaseStorage.deleteDatabase();
    this.toast.open('Se ha eliminado la información local.');
  }
}
