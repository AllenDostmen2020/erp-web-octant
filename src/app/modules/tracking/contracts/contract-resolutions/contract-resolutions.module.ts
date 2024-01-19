import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractResolutionsRoutingModule } from './contract-resolutions-routing.module';
import { ContractResolutionDetailComponent } from './pages/contract-resolution-detail/contract-resolution-detail.component';
import { ContractResolutionCreateComponent } from './pages/contract-resolution-create/contract-resolution-create.component';
import { ItemDetailTemplateComponent } from 'src/app/shared/components/item-detail-template/item-detail-template.component';
import { ItemFormTemplateComponent } from 'src/app/shared/components/item-form-template/item-form-template.component';
import { ContractResolutionFormComponent } from './components/contract-resolution-form/contract-resolution-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLocalTemplateComponent } from 'src/app/shared/components/autocomplete-local-template/autocomplete-local-template.component';
import { FirstLetterUppercasePipe } from '@pipe/first-letter-uppercase.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    ContractResolutionDetailComponent,
    ContractResolutionCreateComponent,
    ContractResolutionFormComponent
  ],
  imports: [
    CommonModule,
    ContractResolutionsRoutingModule,
    ReactiveFormsModule,

    ItemDetailTemplateComponent,
    ItemFormTemplateComponent,
    AutocompleteLocalTemplateComponent,

    FirstLetterUppercasePipe,

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ]
})
export class ContractResolutionsModule { }
