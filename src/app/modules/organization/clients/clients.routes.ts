import { Routes } from "@angular/router";
import { clientAccountRoutes } from "./client-accounts/client-accounts.routes";

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
                children: clientAccountRoutes
            },
            {
                path: 'contact',
                children: []
            },
            {
                path: 'business-unit',
                children: []
            },
            {
                path: 'billing-option',
                children: []
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
