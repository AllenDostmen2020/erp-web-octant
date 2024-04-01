import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, effect, inject, input, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { InputAutocompleteTemplateComponent } from '@component/input-autocomplete-template/input-autocomplete-template.component';
import { InputSelectConfiguration, InputSelectLocalConfiguration, InputSelectTemplateComponent } from '@component/input-select-template/input-select-template.component';
import { DatabaseStorageService, NameModuleDatabase } from '@service/database-storage.service';
import { getContractPlanVehicleFormGroup } from '../../helpers';
import { ContractPlanVehicle } from '@interface/contractPlanVehicle';
import { PathFilesServerPipe } from '@pipe/path-files-server.pipe';
import { Plan } from '@interface/plan';
import { filter } from 'rxjs';

@Component({
  selector: 'app-contract-plan-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputAutocompleteTemplateComponent,
    InputSelectTemplateComponent,
    MatFormFieldModule,
    MatInputModule,
    DecimalPipe,
    PathFilesServerPipe,
    MatExpansionModule,
  ],
  templateUrl: './contract-plan-form.component.html',
  styleUrl: './contract-plan-form.component.css'
})
export class ContractPlanFormComponent {
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) planIdSelectedEvent!: EventEmitter<{ index: number, values: number[] }>;
  @Input({ required: true }) planIdsSelected!: { index: number, value: number }[];
  public plans = input.required<Plan[]>();
  @Output() public planIdSelected: EventEmitter<{ index: number, value: number }> = new EventEmitter();
  @Output() public deleteItem: EventEmitter<void> = new EventEmitter();

  public index = input.required<number>();
  public readonly nameModuleDatabase = NameModuleDatabase;

  public readonly planSelectConfiguration: InputSelectConfiguration<Plan> = {
    textLabel: 'Plan',
    data: signal([])
  }

  get buyPriceCtrl(): FormControl {
    return this.form.get('buy_price') as FormControl;
  }
  get salePriceCtrl(): FormControl {
    return this.form.get('sale_price') as FormControl;
  }
  get installationPriceCtrl(): FormControl {
    return this.form.get('installation_price') as FormControl;
  }
  get totalInstallationPriceCtrl(): FormControl {
    return this.form.get('total_installation_price') as FormControl;
  }
  get planIdCtrl(): FormControl {
    return this.form.get('plan_id') as FormControl;
  }
  get quantityCtrl(): FormControl {
    return this.form.get('quantity') as FormControl;
  }
  get totalCtrl(): FormControl {
    return this.form.get('total') as FormControl;
  }
  get contractPlanVehiclesFormArray(): FormArray<FormGroup> {
    return this.form.get('contract_plan_vehicles') as FormArray;
  }

  ngOnInit(): void {
    this.initDataSelectPlans();
    this.planIdCtrl.valueChanges.subscribe((planId: number) => {
      this.planIdSelected.emit({ index: this.index(), value: planId });
    });

    this.planIdSelectedEvent.pipe(
      filter(({ index }) => this.index() != index && index < this.index())
    ).subscribe(({ index, values }) => {
      this.planSelectConfiguration?.data?.set(this.plans().filter((plan) => !values.includes(plan.id)));
      this.planIdCtrl.setValue(null, { emitEvent: false })
    });
  }

  private initDataSelectPlans() {
    this.planSelectConfiguration?.data?.set(this.plans().filter((plan) => !this.planIdsSelected.map(({ value }) => value).includes(plan.id)));
  }

  private totalInstallationPriceCtrlChange() {
    if (this.installationPriceCtrl.value) {
      this.totalInstallationPriceCtrl.setValue((this.installationPriceCtrl.value * this.contractPlanVehiclesFormArray.length).toFixed(2), { emitEvent: false });
    }
    if (this.salePriceCtrl.value) {
      this.totalCtrl.setValue((this.salePriceCtrl.value * this.contractPlanVehiclesFormArray.length).toFixed(2), { emitEvent: false });
    }
  }

  public addContractPlanVehicle(): void {
    this.contractPlanVehiclesFormArray.push(getContractPlanVehicleFormGroup());
    this.quantityCtrl.setValue(this.contractPlanVehiclesFormArray.length, { emitEvent: false });
    this.totalInstallationPriceCtrlChange();
  }

  public changesContractVehiclesFormArray() {
    this.contractPlanVehiclesFormArray.controls.forEach((formGroupContractVehicle: FormGroup, index) => {
      formGroupContractVehicle.get('vehicle')?.get('plate')?.setValidators([Validators.required, Validators.pattern(this.patternAddPlates(index))]);
      formGroupContractVehicle.get('vehicle')?.get('plate')?.updateValueAndValidity({ emitEvent: false });
    });
  }

  private patternAddPlates(indexExcept: number = -1): string {
    return `^(?!${this.contractPlanVehiclesFormArray.value.filter((_, index) => index != indexExcept).map((contractVehicle: ContractPlanVehicle) => contractVehicle.vehicle!.plate).filter(item => item).join('$|') ?? '----'}$).*`;
  }

  public getVehicleTypeFormGroup(formGroupContractVehicle: FormGroup): FormControl {
    return formGroupContractVehicle.get('vehicle')?.get('vehicle_type') as FormControl;
  }

  public getVehicleTypeIdFormGroup(formGroupContractVehicle: FormGroup): FormControl {
    return formGroupContractVehicle.get('vehicle')?.get('vehicle_type_id') as FormControl;
  }

  public deleteContractVehicle(index: number) {
    this.contractPlanVehiclesFormArray.removeAt(index);
    this.quantityCtrl.setValue(this.contractPlanVehiclesFormArray.length, { emitEvent: false });
    this.totalInstallationPriceCtrlChange();
    // this.deleteItem.emit()
  }
}
