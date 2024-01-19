import { Routes } from "@angular/router";

export const clientAccountRoutes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./pages/client-account-list-page/client-account-list-page.component').then(m => m.ClientAccountListPageComponent),
    },
    {
        path: 'create',
        loadComponent: () => import('./pages/client-account-create-page/client-account-create-page.component').then(m => m.ClientAccountCreatePageComponent),
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./pages/client-account-edit-page/client-account-edit-page.component').then(m => m.ClientAccountEditPageComponent),
    },
    {
        path: 'detail/:id',
        loadComponent: () => import('./pages/client-account-detail-page/client-account-detail-page.component').then(m => m.ClientAccountDetailPageComponent),
    },
    {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full'
    }
];
