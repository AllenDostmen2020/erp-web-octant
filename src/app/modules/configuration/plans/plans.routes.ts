import { Routes } from "@angular/router";

export const planRoutes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./pages/plan-list-page/plan-list-page.component').then(m => m.PlanListPageComponent),
    },
    {
        path: 'create',
        loadComponent: () => import('./pages/plan-create-page/plan-create-page.component').then(m => m.PlanCreatePageComponent),
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./pages/plan-edit-page/plan-edit-page.component').then(m => m.PlanEditPageComponent),
    },
    {
        path: 'detail/:id',
        loadComponent: () => import('./pages/plan-detail-page/plan-detail-page.component').then(m => m.PlanDetailPageComponent),
    },
    {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full'
    }
];
