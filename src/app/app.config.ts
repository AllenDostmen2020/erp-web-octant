import { ApplicationConfig, DEFAULT_CURRENCY_CODE, LOCALE_ID, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter, withViewTransitions, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule, NativeDateModule } from '@angular/material/core';
import { MAT_PAGINATOR_DEFAULT_OPTIONS, MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginator } from './paginator.intl';
import { registerLocaleData } from '@angular/common';
import localeEsPE from '@angular/common/locales/es-PE';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DateFnsAdapter } from '@angular/material-date-fns-adapter';
import { provideServiceWorker } from '@angular/service-worker';
import { MyDateAdapter } from '@utility/myDateAdapter';
import { MY_DATE_FORMATS } from '@utility/myDateFormat';
import { DatabaseStorageService } from '@service/database-storage.service';

registerLocaleData(localeEsPE, 'es-PE');

const appareance: () => 'fill' | 'outline' = () => {
  return localStorage.getItem('apareanceInputs') == 'fill' ? 'fill' : 'outline';
}

const config: SocketIoConfig = { url: 'http://localhost:3001', options: {} };

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions(), withComponentInputBinding()),
    provideAnimations(),
    importProvidersFrom(SocketIoModule.forRoot(config)),
    importProvidersFrom(MatDialogModule),
    importProvidersFrom(MatSnackBarModule),
    importProvidersFrom(MatNativeDateModule),
    importProvidersFrom(DatabaseStorageService),

    { provide: LOCALE_ID, useValue: 'es-PE' },
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'S/' },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: appareance(), subscriptSizing: 'dynamic' } },
    { provide: MAT_PAGINATOR_DEFAULT_OPTIONS, useValue: { formFieldAppearance: 'fill', showFirstLastButtons: true, pageSizeOptions: [20, 50, 100], pageSize: 20 } },
    { provide: MatPaginatorIntl, useClass: CustomPaginator },
    DateFnsAdapter,
    { provide: DateAdapter, useClass: MyDateAdapter, deps: [DateFnsAdapter] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
};
