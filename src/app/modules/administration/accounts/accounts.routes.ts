import { Routes } from "@angular/router";

export const accountRoutes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./pages/account-list-page/account-list-page.component').then(m => m.AccountListPageComponent),
    },
    {
        path: 'create',
        loadComponent: () => import('./pages/account-create-page/account-create-page.component').then(m => m.AccountCreatePageComponent),
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./pages/account-edit-page/account-edit-page.component').then(m => m.AccountEditPageComponent),
    },
    {
        path: 'detail/:id',
        loadComponent: () => import('./pages/account-detail-page/account-detail-page.component').then(m => m.AccountDetailPageComponent),
    },
    {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full'
    }
];
