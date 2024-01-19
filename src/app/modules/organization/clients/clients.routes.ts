import { Routes } from "@angular/router";
import { clientAccountRoutes } from "./client-accounts/client-accounts.routes";
import { clientBillingOptionsRoutes } from "./client-billing-options/client-billing-options.routes";
import { clientContactRoutes } from "./client-contacts/client-contacts.routes";

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
                path: 'account',
                children: clientAccountRoutes,
            },
            {
                path: 'contact',
                children: clientContactRoutes,
            },
            {
                path: 'business-unit',
                children: []
            },
            {
                path: 'billing-option',
                children: clientBillingOptionsRoutes,
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
