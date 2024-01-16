import { Routes } from "@angular/router";

const clientLateralPanelRouting: Routes = [
    {
        path: 'client/create',
        loadComponent: () => import('./home/clients/components/client-create/client-create.component').then(m => m.ClientCreateComponent),
        outlet: 'route-lateral'
    },
    {
        path: 'client/detail/:id',
        loadComponent: () => import('./home/clients/components/client-detail/client-detail.component').then(m => m.ClientDetailComponent),
        outlet: 'route-lateral'
    },
    {
        path: 'client/:client_id/business-unit/create',
        loadComponent: () => import('./home/clients/client-business-unit/pages/client-business-unit-create/client-business-unit-create.component').then(m => m.ClientBusinessUnitCreateComponent),
        outlet: 'route-lateral'
    },
    {
        path: 'client/:client_id/contact/create',
        loadComponent: () => import('./home/clients/client-contacts/components/client-contact-create/client-contact-create.component').then(m => m.ClientContactCreateComponent),
        outlet: 'route-lateral'
    },
];

const brandLateralPanelRouting: Routes = [
    {
        path: 'brand/create',
        loadComponent: () => import('./home/brands/components/brand-create/brand-create.component').then(m => m.BrandCreateComponent),
        outlet: 'route-lateral'
    },
    {
        path: 'brand/edit/:id',
        loadComponent: () => import('./home/brands/components/brand-edit/brand-edit.component').then(m => m.BrandEditComponent),
        outlet: 'route-lateral'
    },
    {
        path: 'brand/detail/:id',
        loadComponent: () => import('./home/brands/components/brand-view/brand-view.component').then(m => m.BrandViewComponent),
        outlet: 'route-lateral'
    },
];

const productLateralPanelRouting: Routes = [
    {
        path: 'product/create',
        loadComponent: () => import('./home/products/components/product-create/product-create.component').then(m => m.ProductCreateComponent),
        outlet: 'route-lateral'
    },
    {
        path: 'provider-product/edit/:providerProductId',
        loadComponent: () => import('./home/products/components/product-edit/product-edit.component').then(m => m.ProductEditComponent),
        outlet: 'route-lateral'
    },
    {
        path: 'product/edit/:id',
        loadComponent: () => import('./home/products/components/product-edit/product-edit.component').then(m => m.ProductEditComponent),
        outlet: 'route-lateral'
    },
    {
        path: 'product/detail/:id',
        loadComponent:  () => import('./home/quotation/components/quotation-product/quotation-product.component').then(m => m.QuotationProductComponent),
        outlet: 'route-lateral'
    },
    {
        path: 'quotation/:quotation_id/item/:item_id/product/add',
        loadComponent: () => import('./home/quotation/components/quotation-item-without-unit-costs-dialog/quotation-item-without-unit-costs-dialog.component').then(m => m.QuotationItemWithoutUnitCostsDialogComponent),
        outlet: 'route-lateral'
    },
];

const unitCostLateralPanelRouting: Routes = [
    {
        path: 'quotation/:quotation_id/item/:item_id/unit-cost/create',
        loadComponent: () => import('./home/unit-costs/pages/unit-cost-create-page/unit-cost-create-page.component').then(m => m.UnitCostCreatePageComponent),
        outlet: 'route-lateral',
    },
    {
        path: 'quotation/:quotation_id/item/:item_id/unit-cost/add',
        loadComponent: () => import('./home/quotation/components/quotation-item-unit-costs-dialog/quotation-item-unit-costs-dialog.component').then(m => m.QuotationItemUnitCostsDialogComponent),
        outlet: 'route-lateral'
    },
    {
        path: 'quotation/:quotation_id/item/:item_id/unit-cost/:id/view',
        loadComponent: () => import('./home/unit-costs/pages/unit-cost-detail-page/unit-cost-detail-page.component').then(m => m.UnitCostDetailPageComponent),
        outlet: 'route-lateral'
    },
    {
        path: 'quotation/:quotation_id/item/:item_id/unit-cost/:id/edit',
        loadComponent: () => import('./home/unit-costs/pages/unit-cost-edit-page/unit-cost-edit-page.component').then(m => m.UnitCostEditPageComponent),
        outlet: 'route-lateral'
    },
    {
        path: 'quotation/:quotation_id/item/:item_id/unit-cost/:id/edit/items',
        loadComponent: () => import('./home/unit-costs/pages/unit-cost-items-page/unit-cost-items-page.component').then(m => m.UnitCostItemsPageComponent),
        outlet: 'route-lateral'
    },
    {
        path: 'unit-cost/:id/view',
        loadComponent: () => import('./home/unit-costs/pages/unit-cost-detail-page/unit-cost-detail-page.component').then(m => m.UnitCostDetailPageComponent),
        outlet: 'route-lateral',
    },
    {
        path: 'unit-cost/:id/edit',
        loadComponent: () => import('./home/unit-costs/components/unit-cost-view/unit-cost-view.component').then(m => m.UnitCostViewComponent),
        outlet: 'route-lateral',
    },
    {
        path: 'unit-cost/:id/edit/items',
        loadComponent: () => import('./home/unit-costs/pages/unit-cost-items-page/unit-cost-items-page.component').then(m => m.UnitCostItemsPageComponent),
        outlet: 'route-lateral',
    },
    {
        path: 'unit-cost/:unit_cost_id/workforce/add',
        loadComponent: () => import('./home/unit-costs/components/unit-costs-workforces-add-dialog/unit-costs-workforces-add-dialog.component').then(m => m.UnitCostsWorkforcesAddDialogComponent),
        outlet: 'route-lateral'
    },
    {
        path: 'unit-cost/:unit_cost_id/provider-product/add',
        loadComponent: () => import('./home/unit-costs/components/unit-costs-materials-add-dialog/unit-costs-materials-add-dialog.component').then(m => m.UnitCostsMaterialsAddDialogComponent),
        outlet: 'route-lateral'
    },
    {
        path: 'unit-cost/:unit_cost_id/equipment-tool/add',
        loadComponent: () => import('./home/unit-costs/components/unit-costs-equipment-tools-add-dialog/unit-costs-equipment-tools-add-dialog.component').then(m => m.UnitCostsEquipmentToolsAddDialogComponent),
        outlet: 'route-lateral'
    },
    {
        path: 'unit-cost/:unit_cost_id/subcontract/add',
        loadComponent: () => import('./home/unit-costs/components/unit-costs-subcontracts-add-dialog/unit-costs-subcontracts-add-dialog.component').then(m => m.UnitCostsSubcontractsAddDialogComponent),
        outlet: 'route-lateral'
    },

    {
        path: 'unit-cost/category-create',
        loadComponent: () => import('./home/unit-cost-categories/components/unit-cost-category-create/unit-cost-category-create.component').then(m => m.UnitCostCategoryCreateComponent),
        outlet: 'route-lateral'
    },
    {
        path: 'equipment-tool/create',
        loadComponent: () => import('./home/unit-costs/equipment-tools/components/equipment-tool-create/equipment-tool-create.component').then(m => m.EquipmentToolCreateComponent),
        outlet: 'route-lateral'
    },
    {
        path: 'equipment-tool/edit/:id',
        loadComponent: () => import('./home/unit-costs/equipment-tools/components/equipment-tool-edit/equipment-tool-edit.component').then(m => m.EquipmentToolEditComponent),
        outlet: 'route-lateral'
    },
    {
        path: 'workforce/create',
        loadComponent: () => import('./home/unit-costs/workforces/components/workforce-create/workforce-create.component').then(m => m.WorkforceCreateComponent),
        outlet: 'route-lateral'
    },
    {
        path: 'workforce/edit/:id',
        loadComponent: () => import('./home/unit-costs/workforces/components/workforce-edit/workforce-edit.component').then(m => m.WorkforceEditComponent),
        outlet: 'route-lateral'
    },
    {
        path: 'subcontract/create',
        loadComponent: () => import('./home/unit-costs/subcontracts/components/subcontrac-create/subcontrac-create.component').then(m => m.SubcontracCreateComponent),
        outlet: 'route-lateral'
    },
    {
        path: 'subcontract/edit/:id',
        loadComponent: () => import('./home/unit-costs/subcontracts/components/subcontrac-edit/subcontrac-edit.component').then(m => m.SubcontracEditComponent),
        outlet: 'route-lateral'
    },

    {
        path: 'workforce/detail/:id',
        loadComponent: () => import('./home/unit-costs/workforces/components/workforce-detail/workforce-detail.component').then(m => m.WorkforceDetailComponent),
        outlet: 'route-lateral'
    },
    {
        path: 'equipment-tool/detail/:id',
        loadComponent: () => import('./home/unit-costs/equipment-tools/components/equipment-tool-detail/equipment-tool-detail.component').then(m => m.EquipmentToolDetailComponent),
        outlet: 'route-lateral'
    },
    {
        path: 'subcontract/detail/:id',
        loadComponent: () => import('./home/unit-costs/subcontracts/components/subcontract-detail/subcontract-detail.component').then(m => m.SubcontractDetailComponent),
        outlet: 'route-lateral'
    },
    {
        path: 'material/detail/:id',
        loadComponent: () => import('./home/unit-costs/components/unit-costs-materials-details/unit-costs-materials-details.component').then(m => m.UnitCostsMaterialsDetailsComponent),
        outlet: 'route-lateral'
    },
    {
        path: 'product/view/:id',
        loadComponent: () => import('./home/products/components/product-details/product-details.component').then(m => m.ProductDetailsComponent),
        outlet: 'route-lateral'
    },
];

export const lateralPanelRouting: Routes = [
    ...clientLateralPanelRouting,
    ...productLateralPanelRouting,
    ...unitCostLateralPanelRouting,
    ...brandLateralPanelRouting,
    {
        path: 'provider/:provider_id/contact/create',
        loadComponent: () => import('./home/providers/provider-contact/components/provider-contact-create/provider-contact-create.component').then(m => m.ProviderContactCreateComponent),
        outlet: 'route-lateral',
    },
    {
        path: 'project/create',
        loadComponent: () => import('./home/projects/components/project-create/project-create.component').then(m => m.ProjectCreateComponent),
        outlet: 'route-lateral',
    },
    {
        path: 'category/create',
        loadComponent: () => import('./home/categories/components/category-create/category-create.component').then(m => m.CategoryCreateComponent),
        outlet: 'route-lateral',
    },
    {
        path: 'category-dialog/:category_parent_id/create',
        loadComponent: () => import('./home/categories/components/category-create/category-create.component').then(m => m.CategoryCreateComponent),
        outlet: 'route-lateral',
    },
    {
        path: 'category/edit/:id',
        loadComponent: () => import('./home/categories/components/category-edit/category-edit.component').then(m => m.CategoryEditComponent),
        outlet: 'route-lateral',
    },
    {
        path: 'bank/create',
        loadComponent: () => import('./home/configuration/banks/components/bank-create/bank-create.component').then(m => m.BankCreateComponent),
        outlet: 'route-lateral',
    },
    {
        path: 'business-sector/create',
        loadComponent: () => import('./home/configuration/business-sectors/components/business-sector-create/business-sector-create.component').then(m => m.BusinessSectorCreateComponent),
        outlet: 'route-lateral',
    },
    {
        path: 'document-type/create',
        loadComponent: () => import('./home/configuration/document-types/components/document-type-create/document-type-create.component').then(m => m.DocumentTypeCreateComponent),
        outlet: 'route-lateral',
    },
    {
        path: 'measurement-unit/create',
        loadComponent: () => import('./home/configuration/measurement-unit/components/measurement-unit-create/measurement-unit-create.component').then(m => m.MeasurementUnitCreateComponent),
        outlet: 'route-lateral',
    },
    {
        path: 'position/create',
        loadComponent: () => import('./home/configuration/positions/components/position-create/position-create.component').then(m => m.PositionCreateComponent),
        outlet: 'route-lateral',
    },
    {
        path: 'user-type/create',
        loadComponent: () => import('./home/configuration/user-types/components/user-type-create/user-type-create.component').then(m => m.UserTypeCreateComponent),
        outlet: 'route-lateral',
    },
    {
        path: 'quotation-item-simple/:id',
        loadComponent: () => import('./home/quotation/components/quotation-detail-item-simple/quotation-detail-item-simple.component').then(m => m.QuotationDetailItemSimpleComponent),
        outlet: 'route-lateral',
    },
    {
        path: 'provider/view/:id/provider-contact/create',
        loadComponent: () => import('./home/providers/provider-contact/components/provider-contact-create/provider-contact-create.component').then(m => m.ProviderContactCreateComponent),
        outlet: 'route-lateral',
    },
    {
        path: 'provider/view/:id/bank-account/create',
        loadComponent: () => import('./home/providers/bank-accounts/bank-account-create/bank-account-create.component').then(m => m.BankAccountCreateComponent),
        outlet: 'route-lateral',
    },

    {
        path: 'account/create',
        loadComponent: () => import('./home/configuration/accounts/components/account-create/account-create.component').then(m => m.AccountCreateComponent),
        outlet: 'route-lateral',
    },
    {
        path: 'address/create',
        loadComponent: () => import('./home/configuration/address/components/address-create/address-create.component').then(m => m.AddressCreateComponent),
        outlet: 'route-lateral',
    },
    {
        path: 'purchase-order/:purchaseOrderId/provider/:providerId/item/add',
        loadComponent: () => import('./home/purchase-order/pages/purchase-order-list-quotation-items-page/purchase-order-list-quotation-items-page.component').then(m => m.PurchaseOrderListQuotationItemsPageComponent),
        outlet: 'route-lateral',
    },
    {
        path: 'seller-customer/add/:customer_id',
        loadComponent: () => import('./home/clients/seller-customers/components/seller-customer-create/seller-customer-create.component').then(m => m.SellerCustomerCreateComponent),
        outlet: 'route-lateral',
    },

    {
        path: 'quotation-material-replace/add',
        loadComponent: () => import('./home/quotation/quotation-materials/components/quotation-products-list-add/quotation-products-list-add.component').then(m => m.QuotationProductsListAddComponent),
        outlet: 'route-lateral',
    },

    {
        path: 'quotation-subcontract-replace/add',
        loadComponent: () => import('./home/projects/quotation-subcontract-list-add/quotation-subcontract-list-add.component').then(m => m.QuotationSubcontractListAddComponent),
        outlet: 'route-lateral',
    },

    {
        path: 'project/:project_id/quotation-material/add',
        loadComponent: () => import('./home/quotation/quotation-materials/components/quotation-material-provider-product-add/quotation-material-provider-product-add.component').then(m => m.QuotationMaterialProviderProductAddComponent),
        outlet: 'route-lateral',
    },
    {
        path: 'project/:project_id/quotation-subcontract/add',
        loadComponent: () => import('./home/projects/subcontract-list-to-add/subcontract-list-to-add.component').then(m => m.SubcontractListToAddComponent),
        outlet: 'route-lateral',
    },
    {
        path: 'octant-erp/client/:client_id',
        loadComponent: () => import('./home/octant/pages/octant-client-view-page/octant-client-view-page.component').then(m => m.OctantClientViewPageComponent),
        outlet: 'route-lateral',
    },
]
