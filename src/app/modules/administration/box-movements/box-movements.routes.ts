import { Routes } from "@angular/router";

export const boxMovementRoutes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./pages/box-movement-list-page/box-movement-list-page.component').then(m => m.BoxMovementListPageComponent)
    },
    {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full',
    }
]
