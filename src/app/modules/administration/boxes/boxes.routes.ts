import { Routes } from "@angular/router";
import { boxOpeningRoutes } from "./box-openings/box-openings.routes";
import { boxMovementRoutes } from "../box-movements/box-movements.routes";

export const boxRoutes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./pages/box-list-page/box-list-page.component').then(m => m.BoxListPageComponent),
    },
    {
        path: 'create',
        loadComponent: () => import('./pages/box-create-page/box-create-page.component').then(m => m.BoxCreatePageComponent),
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./pages/box-edit-page/box-edit-page.component').then(m => m.BoxEditPageComponent),
    },
    {
        path: 'view/:id',
        loadComponent: () => import('./pages/box-view-page/box-view-page.component').then(m => m.BoxViewPageComponent),
        children: [
             {
                path: 'detail',
                children: [
                    {
                        path: '',
                        loadComponent: () => import('./pages/box-detail-page/box-detail-page.component').then(m => m.BoxDetailPageComponent),
                    },
                    {
                        path: 'edit',
                        loadComponent: () => import('./pages/box-edit-page/box-edit-page.component').then(m => m.BoxEditPageComponent),
                    },
                ]
             },
            {
                path: 'box-opening',
                children: boxOpeningRoutes
            },
            {
                path: 'box-movements',
                children: boxMovementRoutes
            },
            {
                path: '**',
                redirectTo: 'detail',
                pathMatch: 'full'
            },
        ]
    },
    {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full'
    },
];
