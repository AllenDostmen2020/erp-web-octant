import { Component, inject } from '@angular/core';
import { ItemFormConfiguration, ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { ContractPenalty } from '@interface/contractPenalty';
import { DEFAULT_DISPLAY_FIELDS_FORM_CONTRACT_PENALTY, contractPenaltyFormGroup } from '../../helpers';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contract-penalty-create-page',
  standalone: true,
  imports: [ItemFormTemplateComponent],
  templateUrl: './contract-penalty-create-page.component.html',
  styleUrl: './contract-penalty-create-page.component.scss'
})
export class ContractPenaltyCreatePageComponent {
  private activatedRoute = inject(ActivatedRoute);
  public configuration: ItemFormConfiguration<ContractPenalty> = {
    type: 'create',
    titleModule: 'penalidad',
    formGroup: contractPenaltyFormGroup({
      contract_id: Number(this.activatedRoute.parent?.parent?.snapshot.paramMap.get('id')!)
    }),
    fields: DEFAULT_DISPLAY_FIELDS_FORM_CONTRACT_PENALTY,
    server: { url: 'contract-penalty' },
  };
}
