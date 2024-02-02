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
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full',
    }
]
