import { Routes } from "@angular/router";

export const clientPaymentRoutes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./pages/client-payment-list-page/client-payment-list-page.component').then(m => m.ClientPaymentListPageComponent)
    },
    {
        path: 'create',
        loadComponent: () => import('./pages/client-payment-create-page/client-payment-create-page.component').then(m => m.ClientPaymentCreatePageComponent)
    },
    {
        path: 'detail/:id',
        loadComponent: () => import('./pages/client-payment-detail-page/client-payment-detail-page.component').then(m => m.ClientPaymentDetailPageComponent)
    },
    {
        path: 'transfer',
        loadComponent: () => import('../client-accounts/pages/client-box-transfer-form/client-box-transfer-form.component').then(m => m.ClientBoxTransferFormComponent)
    },
    {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full',
    }
]
