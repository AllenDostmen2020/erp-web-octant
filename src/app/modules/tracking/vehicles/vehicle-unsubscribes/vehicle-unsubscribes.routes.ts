import { Routes } from "@angular/router";

export const vehicleUnsubscribeRoutes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./pages/vehicle-unsubscribe-list-page/vehicle-unsubscribe-list-page.component').then(m => m.VehicleUnsubscribeListPageComponent),
    },
    {
        path: 'create',
        loadComponent: () => import('./pages/vehicle-unsubscribe-create-page/vehicle-unsubscribe-create-page.component').then(m => m.VehicleUnsubscribeCreatePageComponent),
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./pages/vehicle-unsubscribe-edit-page/vehicle-unsubscribe-edit-page.component').then(m => m.VehicleUnsubscribeEditPageComponent),
    },
    {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full',
    }
]
