import { Routes } from "@angular/router";

export const clientBillingOptionsRoutes: Routes = [
    {
        path: 'detail',
        loadComponent: () => import('./pages/client-billing-option-detail-page/client-billing-option-detail-page.component').then(m => m.ClientBillingOptionDetailPageComponent),
    },
    {
        path: 'create',
        loadComponent: () => import('./pages/client-billing-option-create-page/client-billing-option-create-page.component').then(m => m.ClientBillingOptionCreatePageComponent),
    },
    {
        path: 'edit',
        loadComponent: () => import('./pages/client-billing-option-edit-page/client-billing-option-edit-page.component').then(m => m.ClientBillingOptionEditPageComponent),
    },
    {
        path: '**',
        redirectTo: 'detail',
        pathMatch: 'full'
    },
];
