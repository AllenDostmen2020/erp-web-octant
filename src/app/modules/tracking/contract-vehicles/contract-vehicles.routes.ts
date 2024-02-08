import { Routes } from "@angular/router";

export const contractVehiclesRoutes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./pages/contract-vehicle-list-page/contract-vehicle-list-page.component').then(m => m.ContractVehicleListPageComponent),
    },
    {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full',
    }
]
