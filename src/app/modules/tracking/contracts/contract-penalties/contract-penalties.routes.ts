import { Routes } from "@angular/router";

export const contractPenaltyRoutes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./pages/contract-penalty-list-page/contract-penalty-list-page.component').then(m => m.ContractPenaltyListPageComponent),
    },
    {
        path: 'create',
        loadComponent: () => import('./pages/contract-penalty-create-page/contract-penalty-create-page.component').then(m => m.ContractPenaltyCreatePageComponent),
    },
    {
        path: 'detail/:id',
        loadComponent: () => import('./pages/contract-penalty-detail-page/contract-penalty-detail-page.component').then(m => m.ContractPenaltyDetailPageComponent),
    },
    {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full'
    }
];