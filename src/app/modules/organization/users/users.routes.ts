import { Routes } from "@angular/router";

export const userRoutes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./pages/user-list-page/user-list-page.component').then(m => m.UserListPageComponent),
    },
    {
        path: 'create',
        loadComponent: () => import('./pages/user-create-page/user-create-page.component').then(m => m.UserCreatePageComponent),
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./pages/user-edit-page/user-edit-page.component').then(m => m.UserEditPageComponent),
    },
    {
        path: 'view/:id',
        loadComponent: () => import('./pages/user-view-page/user-view-page.component').then(m => m.UserViewPageComponent),
        children: [
            {
                path: 'detail',
                loadComponent: () => import('./pages/user-detail-page/user-detail-page.component').then(m => m.UserDetailPageComponent),
            },
            {
                path: '**',
                redirectTo: 'detail',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full'
    }
];
