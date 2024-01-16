import { Routes } from '@angular/router';
import { lateralPanelRouting } from './lateral-panel.routing';
import { clientRoutes } from './modules/organization/clients/clients.routes';
import { organizationRoutes } from './modules/organization/organization.routes';

export const panelRoutes: Routes =[
    {
        path: 'organization',
        children: organizationRoutes,
        title: 'Clientes | ERP'
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
