import { Routes } from "@angular/router";

export const contractInstallationsRoutes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./contract-installation-list-page/contract-installation-list-page.component').then(m => m.ContractInstallationListPageComponent),
    },
    {
        path: 'detail/:id',
        loadComponent: () => import('./contract-installation-detail-page/contract-installation-detail-page.component').then(m => m.ContractInstallationDetailPageComponent),
    },
    {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full',
    }
]
