import { Routes } from '@angular/router';
import { lateralPanelRouting } from './lateral-panel.routing';
import { clientRoutes } from './modules/clients/clients.routes';

export const panelRoutes: Routes =[
    {
        path: 'client',
        children: clientRoutes,
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
