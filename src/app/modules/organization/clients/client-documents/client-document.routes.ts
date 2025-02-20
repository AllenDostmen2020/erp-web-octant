import { Routes } from "@angular/router";

export const clientDocumentRoutes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('../../../administration/documents/pages/document-list-page/document-list-page.component').then(m => m.DocumentListPageComponent)
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