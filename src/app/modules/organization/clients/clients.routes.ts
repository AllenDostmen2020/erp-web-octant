import { Routes } from "@angular/router";
import { clientAccountRoutes } from "./client-accounts/client-accounts.routes";
import { clientBillingOptionsRoutes } from "./client-billing-options/client-billing-options.routes";
import { clientContactRoutes } from "./client-contacts/client-contacts.routes";
import { clientBusinessUnitRoutes } from "./client-business-units/client-business-units.routes";
import { clientContractsRoutes } from "./client-contracts/client-contracts.routes";
import { clientDocumentRoutes } from "./client-documents/client-document.routes";
import { clientPaymentRoutes } from "./client-payments/client-payments.routes";
import { clientVehiclesRoutes } from "./client-vehicles/client-vehicles.routes";
import { isEnableRolesGuard } from "@guard/auth.guard";
import { UserRoleEnum } from "@interface/user";

export const clientRoutes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./pages/client-list-page/client-list-page.component').then(m => m.ClientListPageComponent),
    },
    {
        path: 'create',
        loadComponent: () => import('./pages/client-create-page/client-create-page.component').then(m => m.ClientCreatePageComponent),
        canActivate: [isEnableRolesGuard],
        data: { authRoles: [UserRoleEnum.MASTER, UserRoleEnum.ADMINISTRACIÓN] }
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./pages/client-edit-page/client-edit-page.component').then(m => m.ClientEditPageComponent),
        canActivate: [isEnableRolesGuard],
        data: { authRoles: [UserRoleEnum.MASTER, UserRoleEnum.ADMINISTRACIÓN] }
    },
    {
        path: 'view/:id',
        loadComponent: () => import('./pages/client-view-page/client-view-page.component').then(m => m.ClientViewPageComponent),
        children: [
            {
                path: 'detail',
                children: [
                    {
                        path: '',
                        loadComponent: () => import('./pages/client-detail-page/client-detail-page.component').then(m => m.ClientDetailPageComponent),
                    },
                    {
                        path: 'edit',
                        loadComponent: () => import('./pages/client-edit-page/client-edit-page.component').then(m => m.ClientEditPageComponent),
                    },
                    {
                        path: 'billing-option/edit',
                        loadComponent: () => import('./client-billing-options/pages/client-billing-option-edit-page/client-billing-option-edit-page.component').then(m => m.ClientBillingOptionEditPageComponent),
                    }
                ]
            },
            {
                path: 'send-email',
                loadComponent: () => import('./pages/client-send-email-page/client-send-email-page.component').then(m => m.ClientSendEmailPageComponent),
                canActivate: [isEnableRolesGuard],
                data: { authRoles: [UserRoleEnum.MASTER, UserRoleEnum.ADMINISTRACIÓN, UserRoleEnum.KAM] }
            },
            {
                path: 'account',
                children: clientAccountRoutes,
                canActivate: [isEnableRolesGuard],
                data: { authRoles: [UserRoleEnum.MASTER, UserRoleEnum.ADMINISTRACIÓN, UserRoleEnum.KAM] }
            },
            {
                path: 'contact',
                children: clientContactRoutes,
                canActivate: [isEnableRolesGuard],
                data: { authRoles: [UserRoleEnum.MASTER, UserRoleEnum.ADMINISTRACIÓN, UserRoleEnum.KAM, UserRoleEnum.SOPORTE] }
            },
            {
                path: 'business-unit',
                children: clientBusinessUnitRoutes,
                canActivate: [isEnableRolesGuard],
                data: { authRoles: [UserRoleEnum.MASTER, UserRoleEnum.ADMINISTRACIÓN, UserRoleEnum.KAM] }
            },
            {
                path: 'billing-option',
                children: clientBillingOptionsRoutes,
                canActivate: [isEnableRolesGuard],
                data: { authRoles: [UserRoleEnum.MASTER, UserRoleEnum.ADMINISTRACIÓN, UserRoleEnum.KAM] }
            },
            {
                path: 'contract',
                children: clientContractsRoutes,
                canActivate: [isEnableRolesGuard],
                data: { authRoles: [UserRoleEnum.MASTER, UserRoleEnum.ADMINISTRACIÓN, UserRoleEnum.KAM] }
            },
            {
                path: 'document',
                children: clientDocumentRoutes,
                canActivate: [isEnableRolesGuard],
                data: { authRoles: [UserRoleEnum.MASTER, UserRoleEnum.ADMINISTRACIÓN, UserRoleEnum.KAM, UserRoleEnum.TESORERÍA] }
            },
            {
                path: 'box-movements',
                children: clientPaymentRoutes,
                canActivate: [isEnableRolesGuard],
                data: { authRoles: [UserRoleEnum.MASTER, UserRoleEnum.ADMINISTRACIÓN, UserRoleEnum.KAM, UserRoleEnum.TESORERÍA] }
            },
            {
                path: 'vehicle',
                children: clientVehiclesRoutes,
                canActivate: [isEnableRolesGuard],
                data: { authRoles: [UserRoleEnum.MASTER, UserRoleEnum.ADMINISTRACIÓN, UserRoleEnum.KAM, UserRoleEnum.SOPORTE] }
            },
            {
                path: 'comprobant-payments',
                loadComponent: () => import('./client-documents/pages/client-document-payment-create/client-document-payment-create.component').then(m => m.ClientDocumentPaymentCreateComponent),
                canActivate: [isEnableRolesGuard],
                data: { authRoles: [UserRoleEnum.MASTER, UserRoleEnum.ADMINISTRACIÓN, UserRoleEnum.KAM, UserRoleEnum.TESORERÍA] }
            },
            {
                path: '**',
                redirectTo: 'detail',
                pathMatch: 'full',
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full'
    },
];
