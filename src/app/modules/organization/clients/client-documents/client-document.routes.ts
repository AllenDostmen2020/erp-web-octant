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
        path: 'payment',
        loadComponent: () => import('./pages/client-document-payment-create/client-document-payment-create.component').then(m => m.ClientDocumentPaymentCreateComponent)
    },
    {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full',
    }
]