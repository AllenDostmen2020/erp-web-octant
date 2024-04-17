import { Routes } from "@angular/router";

export const contractAddendumsRoutes: Routes = [
    {
        path: 'create',
        loadComponent: () => import('./pages/contract-addendum-create-page/contract-addendum-create-page.component').then(m => m.ContractAddendumCreatePageComponent),
    },
    {
        path: 'list',
        loadComponent: () => import('./pages/contract-addendum-list-page/contract-addendum-list-page.component').then(m => m.ContractAddendumListPageComponent),
    },
    {
        path: 'detail/:id',
        loadComponent: () => import('./pages/contract-addendum-detail-page/contract-addendum-detail-page.component').then(m => m.ContractAddendumDetailPageComponent),
    },
    {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full',
    }
]