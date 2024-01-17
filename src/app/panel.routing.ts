import { Routes } from '@angular/router';
import { lateralPanelRouting } from './lateral-panel.routing';
import { organizationRoutes } from './modules/organization/organization.routes';
import { administrationRoutes } from './modules/administration/administration.routes';
import { configurationRoutes } from './modules/configuration/configuration.routes';

export const panelRoutes: Routes =[
    {
        path: 'organization',
        children: organizationRoutes,
        title: 'Clientes | ERP'
    },
    {
        path: 'administration',
        children: administrationRoutes,
        title: 'Cuentas | ERP'
    },
    {
        path: 'configuration',
        children: configurationRoutes,
        title: 'Bancos | ERP'
    },


    /* LATERAL ROUTING */
    ...lateralPanelRouting,
    /* --------------- */

    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    },
]
