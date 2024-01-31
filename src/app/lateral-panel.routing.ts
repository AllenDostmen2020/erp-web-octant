import { Routes } from "@angular/router";

const clientLateralPanelRouting: Routes = [
    // {
    //     path: 'client/create',
    //     loadComponent: () => import('./home/clients/components/client-create/client-create.component').then(m => m.ClientCreateComponent),
    //     outlet: 'route-lateral'
    // },
    // {
    //     path: 'client/detail/:id',
    //     loadComponent: () => import('./home/clients/components/client-detail/client-detail.component').then(m => m.ClientDetailComponent),
    //     outlet: 'route-lateral'
    // },
    // {
    //     path: 'client/:client_id/business-unit/create',
    //     loadComponent: () => import('./home/clients/client-business-unit/pages/client-business-unit-create/client-business-unit-create.component').then(m => m.ClientBusinessUnitCreateComponent),
    //     outlet: 'route-lateral'
    // },
    // {
    //     path: 'client/:client_id/contact/create',
    //     loadComponent: () => import('./home/clients/client-contacts/components/client-contact-create/client-contact-create.component').then(m => m.ClientContactCreateComponent),
    //     outlet: 'route-lateral'
    // },
    {
        path: 'client/:client_id/contract/add',
        loadComponent: () => import('./modules/organization/clients/client-documents/pages/client-document-contract-add/client-document-contract-add.component').then(m => m.ClientDocumentContractAddComponent),
        outlet: 'route-lateral',
    },
];


export const lateralPanelRouting: Routes = [
    ...clientLateralPanelRouting,
]
