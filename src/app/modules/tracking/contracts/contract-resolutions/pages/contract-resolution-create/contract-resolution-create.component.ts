import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { ContractResolution, ContractResolutionEntityEnum, ContractResolutionTypeEnum } from '@interface/contractResolution';
import { ItemFormConfiguration } from '@interface/itemForm';
import { ContractResolutionFormComponent } from '../../components/contract-resolution-form/contract-resolution-form.component';

@Component({
  selector: 'app-contract-resolution-create',
  templateUrl: './contract-resolution-create.component.html',
  styleUrls: ['./contract-resolution-create.component.css'],
  standalone: true,
  imports: [
    ItemFormTemplateComponent,
    ContractResolutionFormComponent,
  ],
})
export class ContractResolutionCreateComponent {
  private activatedRoute = inject(ActivatedRoute)
  public configuration: ItemFormConfiguration<ContractResolution> = {
    titleModule: 'contrato',
    title: 'Resolución de contrato',
    type: 'create',
    server: { url: 'contract-resolution' },
    formGroup: new FormGroup({
      contract_id: new FormControl(this.activatedRoute.parent?.parent?.snapshot.paramMap.get('id'), [Validators.required]),
      type: new FormControl<ContractResolutionTypeEnum | null>(null),
      resolution_entity: new FormControl<ContractResolutionEntityEnum | null>(null),
      reason: new FormControl<string>(''),
      mutual_agreement: new FormControl<string>(''),
      discharge_from_other_party: new FormControl<string>(''),
      final_agreement: new FormControl<string>(''),
      responsible_user_id: new FormControl<number | null>(null),
      client_responsible_document_type: new FormControl<string>(''),
      client_responsible_document_number: new FormControl<string>(''),
      client_responsible_role: new FormControl<string>(''),
      client_responsible_name: new FormControl<string>(''),
      client_responsible_phone: new FormControl<string>(''),
      client_responsible_email: new FormControl<string>(''),
      link_file: new FormControl<string | null>(null),
      responsible_user: new FormControl(null),
    }),
  }
}
