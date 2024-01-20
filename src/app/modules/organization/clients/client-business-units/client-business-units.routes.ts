import { Routes } from "@angular/router";

export const clientBusinessUnitRoutes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./pages/client-business-unit-list-page/client-business-unit-list-page.component').then(m => m.ClientBusinessUnitListPageComponent),
    },
    {
        path: 'create',
        loadComponent: () => import('./pages/client-business-unit-create-page/client-business-unit-create-page.component').then(m => m.ClientBusinessUnitCreatePageComponent),
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./pages/client-business-unit-edit-page/client-business-unit-edit-page.component').then(m => m.ClientBusinessUnitEditPageComponent),
    },
    {
        path: 'detail/:id',
        loadComponent: () => import('./pages/client-business-unit-detail-page/client-business-unit-detail-page.component').then(m => m.ClientBusinessUnitDetailPageComponent),
    },
    {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full'
    }
];
