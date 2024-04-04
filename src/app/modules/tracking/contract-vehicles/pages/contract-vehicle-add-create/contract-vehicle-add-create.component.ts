import { Component, WritableSignal, inject, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { InputSelectConfiguration, InputSelectTemplateComponent } from '@component/input-select-template/input-select-template.component';
import { ItemFormConfiguration, ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { CharactersOnlyDirective } from '@directive/characters-only.directive';
import { NumbersOnlyDirective } from '@directive/numbers-only.directive';
import { DOCUMENT_TYPES, DocumentTypeEnum } from '@interface/baseModel';
import { ContractInstallation } from '@interface/contractInstallation';
import { ContractPlanVehicle } from '@interface/contractPlanVehicle';
import { FetchService } from '@service/fetch.service';

interface ExtContractInstallation extends ContractInstallation {
  selected: boolean;
}
@Component({
  selector: 'app-contract-vehicle-add-create',
  standalone: true,
  imports: [
    MatCheckboxModule,
    ItemFormTemplateComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    InputSelectTemplateComponent,
    MatDatepickerModule,
    NumbersOnlyDirective,
    CharactersOnlyDirective
  ],
  templateUrl: './contract-vehicle-add-create.component.html',
  styleUrl: './contract-vehicle-add-create.component.scss'
})
export class ContractVehicleAddCreateComponent {
  private fetch = inject(FetchService);
  private activatedRoute = inject(ActivatedRoute);
  public contractPlanVehicles: WritableSignal<ContractPlanVehicle[]> = signal([]);

  public configuration: ItemFormConfiguration = {
    type: 'create',
    titleModule: 'Vehículos instalados',
    formGroup: new FormGroup({
      contract_id: new FormControl(this.activatedRoute.snapshot.parent?.parent?.paramMap.get('id')),
      responsible_document_number: new FormControl(null),
      responsible_document_type: new FormControl(null),
      responsible_name: new FormControl(null),
      responsible_paternal_name: new FormControl(null),
      responsible_maternal_name: new FormControl(null),
      date: new FormControl(new Date()),
      observation: new FormControl(null),

      contract_plan_vehicles: new FormArray([]),
    }),
    server: { url: 'contract-installation' },
  };

  get documentTypeCtrl(): FormControl {
    return this.configuration.formGroup.get('responsible_document_type') as FormControl;
  }

  get documentNumberCtrl(): FormControl {
    return this.configuration.formGroup.get('responsible_document_number') as FormControl;
  }
  get contractPlanVehiclesFormArray(): FormArray<FormGroup> {
    return this.configuration.formGroup.get('contract_plan_vehicles') as FormArray<FormGroup>;
  }

  public readonly documentTypeSelectConfiguration: InputSelectConfiguration = {
    textLabel: 'Tipo de documento',
    placeholder: 'Seleccione un tipo de documento',
    data: signal(DOCUMENT_TYPES.filter((item) => item != DocumentTypeEnum.RUC).map((item) => ({ name: item.toUpperCase(), id: item })).sort((a, b) => a.name.localeCompare(b.name)))
  }

  ngOnInit() {
    this.getVehicles();
    this.documentTypeCtrl.valueChanges.subscribe((documentType) => {
      if (documentType == DocumentTypeEnum.DNI) this.updateValidatorsForDocumentNumberCtrl(8);
      else this.updateValidatorsForDocumentNumberCtrl(12);
    })
  }

  private async getVehicles() {
    const contractId = this.activatedRoute.snapshot.parent?.parent?.paramMap.get('id');
    const contractPlanVehicles = await this.fetch.get<ContractPlanVehicle[]>(`contract/${contractId}/contract-plan-vehicle`);
    contractPlanVehicles.forEach((item) => {
      const formGroup = new FormGroup({
        contract_plan_vehicle_id: new FormControl(item.id),
        plate_name: new FormControl(item.vehicle!.plate),
        gps_imei: new FormControl(item.vehicle!.plate),
        selected: new FormControl(false),
      });
      this.contractPlanVehiclesFormArray.push(formGroup);
    });
    this.contractPlanVehicles.set(contractPlanVehicles);
  }

  public maxLengthDocumentNumber: number = 12;

  public updateValidatorsForDocumentNumberCtrl(length: number): void {
    this.documentNumberCtrl.setValidators([
      Validators.required,
      Validators.minLength(length),
      Validators.maxLength(length),
    ]);
    this.documentNumberCtrl.updateValueAndValidity();
    this.maxLengthDocumentNumber = length;
  }

}

