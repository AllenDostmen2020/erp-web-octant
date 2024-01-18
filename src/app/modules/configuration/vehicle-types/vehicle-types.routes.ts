import { Routes } from "@angular/router";

export const vehicleTypeRoutes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./pages/vehicle-type-list-page/vehicle-type-list-page.component').then(m => m.VehicleTypeListPageComponent),
    },
    {
        path: 'create',
        loadComponent: () => import('./pages/vehicle-type-create-page/vehicle-type-create-page.component').then(m => m.VehicleTypeCreatePageComponent),
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./pages/vehicle-type-edit-page/vehicle-type-edit-page.component').then(m => m.VehicleTypeEditPageComponent),
    },
    {
        path: 'view/:id',
        loadComponent: () => import('./pages/vehicle-type-view-page/vehicle-type-view-page.component').then(m => m.VehicleTypeViewPageComponent),
        children: [
            {
                path: 'detail',
                loadComponent: () => import('./pages/vehicle-type-detail-page/vehicle-type-detail-page.component').then(m => m.VehicleTypeDetailPageComponent),
            },
            {
                path: '**',
                redirectTo: 'detail',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full'
    }
];
