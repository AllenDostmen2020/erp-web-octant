import { Routes } from '@angular/router';
import { organizationRoutes } from './modules/organization/organization.routes';
import { administrationRoutes } from './modules/administration/administration.routes';
import { configurationRoutes } from './modules/configuration/configuration.routes';
import { settingsRoutes } from './modules/settings/settings.routes';
import { trackingRoutes } from './modules/tracking/tracking.routes';
import { lateralPanelRouting } from './lateral-panel.routing';

export const panelRoutes: Routes = [
    {
        path: 'organization',
        children: organizationRoutes,
    },
    {
        path: 'administration',
        children: administrationRoutes,
    },
    {
        path: 'configuration',
        children: configurationRoutes,
    },
    {
        path: 'tracking',
        children: trackingRoutes,
    },
    {
        path: 'settings',
        children: settingsRoutes,
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
