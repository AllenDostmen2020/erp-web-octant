import { Routes } from '@angular/router';
import { lateralPanelRouting } from './lateral-panel.routing';
import { clientRoutes } from './modules/organization/clients/clients.routes';
import { organizationRoutes } from './modules/organization/organization.routes';
import { settingsRoutes } from './modules/settings/settings.routes';

export const panelRoutes: Routes =[
    {
        path: 'organization',
        children: organizationRoutes,
        title: 'Clientes | ERP'
    },
    {
        path: 'settings',
        children: settingsRoutes,
        title: 'Configuración | ERP',
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
