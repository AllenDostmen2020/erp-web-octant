import { Routes } from "@angular/router";

export const bankRoutes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./pages/bank-list-page/bank-list-page.component').then(m => m.BankListPageComponent),
    },
    {
        path: 'create',
        loadComponent: () => import('./pages/bank-create-page/bank-create-page.component').then(m => m.BankCreatePageComponent),
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./pages/bank-edit-page/bank-edit-page.component').then(m => m.BankEditPageComponent),
    },
    {
        path: 'detail/:id',
        loadComponent: () => import('./pages/bank-detail-page/bank-detail-page.component').then(m => m.BankDetailPageComponent),
    },
    {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full'
    }
];
