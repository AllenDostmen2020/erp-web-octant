import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractResolutionCreateComponent } from './pages/contract-resolution-create/contract-resolution-create.component';
import { ContractResolutionDetailComponent } from './pages/contract-resolution-detail/contract-resolution-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ContractResolutionDetailComponent,
  },
  {
    path: 'create',
    component: ContractResolutionCreateComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractResolutionsRoutingModule { }
