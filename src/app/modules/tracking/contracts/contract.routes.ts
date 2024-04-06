import { Routes } from "@angular/router";
import { contractResolutionRoutes } from "./contract-resolutions/contractResolution.rutes";
import { contractVehiclesRoutes } from "../contract-vehicles/contract-vehicles.routes";
import { clientDocumentRoutes } from "../../organization/clients/client-documents/client-document.routes";
import { contractInstallationsRoutes } from "./contract-installations/contract-installations.routes";

export const contractRoutes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./pages/contract-list-page/contract-list-page.component').then(m => m.ContractListPageComponent),
    },
    {
        path: 'create',
        loadComponent: () => import('./pages/contract-create-page/contract-create-page.component').then(m => m.ContractCreatePageComponent),
    },
    {
        path: 'view/:id',
        loadComponent: () => import('./pages/contract-view-page/contract-view-page.component').then(m => m.ContractViewPageComponent),
        children: [
            {
                path: 'detail',
                children: [
                    {
                        path: '',
                        loadComponent: () => import('./pages/contract-detail-page/contract-detail-page.component').then(m => m.ContractDetailPageComponent),
                    },
                    {
                        path: 'edit',
                        loadComponent: () => import('./pages/contract-edit-page/contract-edit-page.component').then(m => m.ContractEditPageComponent),
                    },
                    {
                        path: '**',
                        redirectTo: 'detail',
                        pathMatch: 'full',
                    }
                ]
            },
            {
                path: 'renew',
                loadComponent: ()=> import('./pages/contract-renew-page/contract-renew-page.component').then(m=> m.ContractRenewPageComponent),
            },
            {
                path: 'vehicle',
                children: contractVehiclesRoutes,
            },
            {
                path: 'resolution',
                children: contractResolutionRoutes,
            },
            {
                path: 'document',
                children: clientDocumentRoutes,
            },
            {
                path: 'installation',
                children: contractInstallationsRoutes,
            },
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
