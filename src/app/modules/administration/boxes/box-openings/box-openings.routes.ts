import { Routes } from "@angular/router";

export const boxOpeningRoutes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./pages/box-opening-list-page/box-opening-list-page.component').then(m => m.BoxOpeningListPageComponent),
    },
    {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full'
    },
];
