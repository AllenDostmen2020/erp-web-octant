import { Routes } from '@angular/router';
import { organizationRoutes } from './modules/organization/organization.routes';
import { administrationRoutes } from './modules/administration/administration.routes';
import { configurationRoutes } from './modules/configuration/configuration.routes';
import { settingsRoutes } from './modules/settings/settings.routes';
import { trackingRoutes } from './modules/tracking/tracking.routes';
import { lateralPanelRouting } from './lateral-panel.routing';
import { isEnableRolesGuard } from '@guard/auth.guard';
import { UserRoleEnum } from '@interface/user';

export const panelRoutes: Routes = [
    {
        path: 'organization',
        children: organizationRoutes,
        canActivate: [isEnableRolesGuard],
        data: { authRoles: [UserRoleEnum.MASTER, UserRoleEnum.KAM, UserRoleEnum.ADMINISTRACIÓN, UserRoleEnum.SOPORTE, UserRoleEnum.TESORERÍA] }
    },
    {
        path: 'administration',
        children: administrationRoutes,
        canActivate: [isEnableRolesGuard],
        data: { authRoles: [UserRoleEnum.MASTER] }
    },
    {
        path: 'configuration',
        children: configurationRoutes,
        canActivate: [isEnableRolesGuard],
        data: { authRoles: [UserRoleEnum.MASTER] }
    },
    {
        path: 'tracking',
        children: trackingRoutes,
        canActivate: [isEnableRolesGuard],
        data: { authRoles: [UserRoleEnum.MASTER] }
    },
    {
        path: 'settings',
        children: settingsRoutes,
        canActivate: [isEnableRolesGuard],
        data: { authRoles: [UserRoleEnum.MASTER] }
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
