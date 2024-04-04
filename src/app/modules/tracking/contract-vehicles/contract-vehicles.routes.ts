import { Routes } from "@angular/router";

export const contractVehiclesRoutes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./pages/contract-vehicle-list-page/contract-vehicle-list-page.component').then(m => m.ContractVehicleListPageComponent),
    },
    {
        path: 'installation/create',
        loadComponent: () => import('./pages/contract-vehicle-add-create/contract-vehicle-add-create.component').then(m => m.ContractVehicleAddCreateComponent),
    },
    {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full',
    }
]
