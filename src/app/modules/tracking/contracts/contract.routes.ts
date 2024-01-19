import { Routes } from "@angular/router";

export const contractRoutes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./pages/contract-list/contract-list.component').then(m => m.ContractListComponent),
    },
    {
        path: 'create',
        loadComponent: () => import('./pages/contract-create/contract-create.component').then(m => m.ContractCreateComponent),
    },
    {
        path: 'view/:id',
        loadComponent: () => import('./pages/contract-view/contract-view.component').then(m => m.ContractViewComponent),
        children: [
            {
                path: 'detail',
                children:[
                    {
                        path: '',
                        loadComponent: () => import('./pages/contract-detail/contract-detail.component').then(m => m.ContractDetailComponent),
                    },
                    {
                        path: 'edit',
                        loadComponent: () => import('./pages/contract-edit/contract-edit.component').then(m => m.ContractEditComponent),
                    },
                    {
                        path: '**',
                        redirectTo: '',
                        pathMatch: 'full',
                    }
                ]
            },
            // {
            //     path: 'vehicle',
            // },
            {
                path: '**',
                redirectTo: 'detail',
                pathMatch: 'full',
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full',
    }
]