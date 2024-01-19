import { Routes } from "@angular/router";

export const clientContactRoutes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./pages/client-contact-list-page/client-contact-list-page.component').then(m => m.ClientContactListPageComponent),
    },
    {
        path: 'create',
        loadComponent: () => import('./pages/client-contact-create-page/client-contact-create-page.component').then(m => m.ClientContactCreatePageComponent),
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./pages/client-contact-edit-page/client-contact-edit-page.component').then(m => m.ClientContactEditPageComponent),
    },
    {
        path: 'detail/:id',
        loadComponent: () => import('./pages/client-contact-detail-page/client-contact-detail-page.component').then(m => m.ClientContactDetailPageComponent),
    },
    {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full'
    },
];
