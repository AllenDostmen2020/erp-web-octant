import { Routes } from "@angular/router";

export const clientRoutes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./pages/client-list-page/client-list-page.component').then(m => m.ClientListPageComponent),
    },
    {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full'
    },
];
