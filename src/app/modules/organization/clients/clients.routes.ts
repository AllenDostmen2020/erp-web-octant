import { Routes } from "@angular/router";
import { clientAccountRoutes } from "./client-accounts/client-accounts.routes";
import { clientBillingOptionsRoutes } from "./client-billing-options/client-billing-options.routes";
import { clientContactRoutes } from "./client-contacts/client-contacts.routes";
import { clientBusinessUnitRoutes } from "./client-business-units/client-business-units.routes";
import { clientContractsRoutes } from "./client-contracts/client-contracts.routes";
import { clientDocumentRoutes } from "./client-documents/client-document.routes";
import { clientPaymentRoutes } from "./client-payments/client-payments.routes";
import { clientVehiclesRoutes } from "./client-vehicles/client-vehicles.routes";

export const clientRoutes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./pages/client-list-page/client-list-page.component').then(m => m.ClientListPageComponent),
    },
    {
        path: 'create',
        loadComponent: () => import('./pages/client-create-page/client-create-page.component').then(m => m.ClientCreatePageComponent),
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./pages/client-edit-page/client-edit-page.component').then(m => m.ClientEditPageComponent),
    },
    {
        path: 'view/:id',
        loadComponent: () => import('./pages/client-view-page/client-view-page.component').then(m => m.ClientViewPageComponent),
        children: [
            {
                path: 'detail',
                loadComponent: () => import('./pages/client-detail-page/client-detail-page.component').then(m => m.ClientDetailPageComponent),
            },
            {
                path: 'send-email',
                loadComponent: () => import('./pages/client-send-email-page/client-send-email-page.component').then(m => m.ClientSendEmailPageComponent),
            },
            {
                path: 'account',
                children: clientAccountRoutes,
            },
            {
                path: 'contact',
                children: clientContactRoutes,
            },
            {
                path: 'business-unit',
                children: clientBusinessUnitRoutes,
            },
            {
                path: 'billing-option',
                children: clientBillingOptionsRoutes,
            },
            {
                path: 'contract',
                children: clientContractsRoutes,
            },
            {
                path: 'document',
                children: clientDocumentRoutes,
            },
            {
                path: 'box-movements',
                children: clientPaymentRoutes,
            },
            {
                path: 'vehicle',
                children: clientVehiclesRoutes,
            },
            {
                path: 'comprobant-payments',
                loadComponent: () => import('./client-documents/pages/client-document-payment-create/client-document-payment-create.component').then(m => m.ClientDocumentPaymentCreateComponent)
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
