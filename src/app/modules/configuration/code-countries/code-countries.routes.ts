import { Routes } from "@angular/router";

export const codeCountryRoutes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./pages/code-country-list-page/code-country-list-page.component').then(m => m.CodeCountryListPageComponent),
    },
    {
        path: 'create',
        loadComponent: () => import('./pages/code-country-create-page/code-country-create-page.component').then(m => m.CodeCountryCreatePageComponent),
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./pages/code-country-edit-page/code-country-edit-page.component').then(m => m.CodeCountryEditPageComponent),
    },
    {
        path: 'detail/:id',
        loadComponent: () => import('./pages/code-country-detail-page/code-country-detail-page.component').then(m => m.CodeCountryDetailPageComponent),
    },
    {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full'
    }
];
