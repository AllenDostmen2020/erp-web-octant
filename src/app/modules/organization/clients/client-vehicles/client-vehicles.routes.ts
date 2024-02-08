import { Routes } from "@angular/router";

export const clientVehiclesRoutes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./pages/client-vehicle-list-page/client-vehicle-list-page.component').then(m => m.ClientVehicleListPageComponent),
    },
    {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full',
    }
]
