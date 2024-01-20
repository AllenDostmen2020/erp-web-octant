import { Routes } from "@angular/router";

export const clientContractsRoutes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./pages/client-contract-list-page/client-contract-list-page.component').then(m => m.ClientContractListPageComponent),
    },
    {
        path: 'detail/:id',
        loadComponent: () => import('./pages/client-contract-detail-page/client-contract-detail-page.component').then(m => m.ClientContractDetailPageComponent),
    },
    {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full',
    }
]