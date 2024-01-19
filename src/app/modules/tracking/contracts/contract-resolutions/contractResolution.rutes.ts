import { Routes } from "@angular/router";

export const contractResolutionRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/contract-resolution-detail/contract-resolution-detail.component').then(m => m.ContractResolutionDetailComponent),
    },
    {
        path: 'create',
        loadComponent: () => import('./pages/contract-resolution-create/contract-resolution-create.component').then(m => m.ContractResolutionCreateComponent),
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
]