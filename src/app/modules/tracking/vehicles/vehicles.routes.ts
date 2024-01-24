import { Routes } from "@angular/router";
import { vehicleUnsubscribeRoutes } from "./vehicle-unsubscribes/vehicle-unsubscribes.routes";

export const vehicleRoutes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./pages/vehicle-list-page/vehicle-list-page.component').then(m => m.VehicleListPageComponent),
    },
    {
        path: 'create',
        loadComponent: () => import('./pages/vehicle-create-page/vehicle-create-page.component').then(m => m.VehicleCreatePageComponent),
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./pages/vehicle-edit-page/vehicle-edit-page.component').then(m => m.VehicleEditPageComponent),
    },
    {
        path: 'view/:id',
        loadComponent: () => import('./pages/vehicle-view-page/vehicle-view-page.component').then(m => m.VehicleViewPageComponent),
        children: [
            {
                path: 'detail',
                loadComponent: () => import('./pages/vehicle-detail-page/vehicle-detail-page.component').then(m => m.VehicleDetailPageComponent),
            },
            {
                path: 'vehicle-unsubscribe',
                children: vehicleUnsubscribeRoutes,
            },
            {
                path: '**',
                redirectTo: 'detail',
                pathMatch: 'full',
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full',
    }
]
