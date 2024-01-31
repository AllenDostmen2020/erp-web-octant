import { Routes } from "@angular/router";

export const clientDocumentRoutes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./pages/client-document-list/client-document-list.component').then(m => m.ClientDocumentListComponent)
    },
    {
        path: 'create',
        loadComponent: () => import('./pages/client-document-create/client-document-create.component').then(m => m.ClientDocumentCreateComponent)
    },
    {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full',
    }
]