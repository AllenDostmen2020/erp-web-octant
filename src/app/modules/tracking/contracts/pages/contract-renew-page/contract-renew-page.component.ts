import { Component, inject } from '@angular/core';
import { ContractCreatePageComponent } from '../contract-create-page/contract-create-page.component';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { Contract } from '@interface/contract';
import { getContractPlanFormGroup, getContractPlanVehicleFormGroup } from '../../helpers';
import { FormArray, FormGroup } from '@angular/forms';
import { ContractFormComponent } from '../../components/contract-form/contract-form.component';
import { AlertTemplateComponent } from '@component/alert-template/alert-template.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contract-renew-page',
  standalone: true,
  imports: [ItemFormTemplateComponent, ContractFormComponent, AlertTemplateComponent],
  templateUrl: './contract-renew-page.component.html',
  styleUrl: './contract-renew-page.component.scss'
})
export class ContractRenewPageComponent extends ContractCreatePageComponent {
  private activatedRoute = inject(ActivatedRoute);
  constructor(
  ) {
    super();
    this.configuration.type = 'update';
    this.configuration.title = 'Renovar contrato';
    this.configuration.server.url = 'contract/renewal';
    this.configuration.itemId = this.activatedRoute.snapshot.parent?.paramMap.get('id')!;
    this.configuration.server.itemUrl = 'contract';
    this.configuration.saveButton = {text: 'Renovar'};
    this.configuration.server.itemQueryParams = { relations: 'client.clientBusinessUnits,contractPlans.(plan|contractPlanVehicles.vehicle)' };
    this.configuration.hiddeFields = true;
    this.configuration.parseItemBeforePatchFormFn = (contract: Contract) => {
      this.contractPlansFormArray.clear();
      contract.contract_plans?.forEach((contractPlan, index) => {
        this.contractPlansFormArray.push(getContractPlanFormGroup());
        const contractPlanVehiclesFormArray = this.contractPlansFormArray.at(index).get('contract_plan_vehicles') as FormArray<FormGroup>;
        contractPlan.contract_plan_vehicles?.forEach(contractPlanVehicle => {
          contractPlanVehiclesFormArray.push(getContractPlanVehicleFormGroup());
        });
      });
      return contract;
    }
  }

  get contractPlansFormArray() {
    return this.configuration.formGroup.get('contract_plans') as FormArray<FormGroup>;
  }
}

