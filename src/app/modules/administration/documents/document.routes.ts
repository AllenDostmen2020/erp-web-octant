import { Routes } from "@angular/router";

export const documentRoutes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./pages/document-list-page/document-list-page.component').then(m => m.DocumentListPageComponent),
    },
    {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full',
    }
]