import { Routes } from "@angular/router";

export const boxMovementRoutes: Routes = [
    {
        path: 'create',
        loadComponent: () => import('./pages/box-movement-create-page/box-movement-create-page.component').then(m => m.BoxMovementCreatePageComponent)
    },
    {
        path: 'list',
        loadComponent: () => import('./pages/box-movement-list-page/box-movement-list-page.component').then(m => m.BoxMovementListPageComponent)
    },
    {
        path: 'detail/:id',
        loadComponent: () => import('./pages/box-movement-detail-page/box-movement-detail-page.component').then(m => m.BoxMovementDetailPageComponent)
    },
    {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full',
    }
]
