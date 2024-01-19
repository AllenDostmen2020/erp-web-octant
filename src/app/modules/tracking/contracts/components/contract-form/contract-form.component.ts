import { DecimalPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, WritableSignal, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatepickerTemplateComponent } from '@component/datepicker-template/datepicker-template.component';
import { InputAutocompleteServerConfiguration, InputAutocompleteTemplateComponent } from '@component/input-autocomplete-template/input-autocomplete-template.component';
import { InputSelectConfiguration, InputSelectLocalConfiguration, InputSelectTemplateComponent } from '@component/input-select-template/input-select-template.component';
import { LoadImagePrivateDirective } from '@directive/load-image-private.directive';
import { Client } from '@interface/client';
import { RECURRENT_TYPE_VALUES } from '@interface/contract';
import { ContractVehicle } from '@interface/contractVehicle';
import { Vehicle } from '@interface/vehicle';
import { NameModuleDatabase } from '@service/database-storage.service';
import { getDate, getMonth, getYear, format, differenceInDays } from 'date-fns';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-contract-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    InputAutocompleteTemplateComponent,
    InputSelectTemplateComponent,
    DecimalPipe,
    NgClass,
    LoadImagePrivateDirective,
    DatepickerTemplateComponent,
  ],
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractFormComponent {
  @Input({ required: true }) form!: FormGroup;
  
  public vehicleDetail: WritableSignal<'full' | 'single'> = signal('single');

  public readonly nameModuleDatabase = NameModuleDatabase;

  public readonly clientAutocompleteConfiguration: InputAutocompleteServerConfiguration = {
    textLabel: 'Cliente',
    server: {
      url: 'client',
      queryParams: {
        relations: 'clientBusinessUnits'
      }
    }
  }

  public readonly planAutocompleteConfiguration: InputSelectLocalConfiguration = {
    textLabel: 'Plan',
    local: { nameModuleDatabase: NameModuleDatabase.Plans }
  }

  public readonly saleUserAutocompleteConfiguration: InputSelectLocalConfiguration = {
    textLabel: 'Vendedor',
    local: { nameModuleDatabase: NameModuleDatabase.Users }
  }

  public readonly recurrentTypeSelectConfiguration: InputSelectConfiguration = {
    textLabel: 'Tipo de recurrente',
    data: RECURRENT_TYPE_VALUES.map((recurrentType: string) => ({ id: recurrentType, name: recurrentType.toUpperCase() })),
  };

  public readonly periodSelectConfiguration: InputSelectConfiguration = {
    textLabel: 'Duración',
    data: [
      { id: 12, name: '1 año' },
      { id: 24, name: '2 años' },
      { id: 36, name: '3 años' },
      { id: 48, name: '4 años' },
      { id: 60, name: '5 años' },
    ],
  };

  get clientIdCtrl(): FormControl {
    return this.form.get('client_id') as FormControl;
  }

  get clientCtrl(): FormControl {
    return this.form.get('client') as FormControl;
  }

  get planIdCtrl(): FormControl {
    return this.form.get('plan_id') as FormControl;
  }

  get planCtrl(): FormControl {
    return this.form.get('plan') as FormControl;
  }

  get quantityCtrl(): FormControl {
    return this.form.get('quantity') as FormControl;
  }

  get buyPriceCtrl(): FormControl {
    return this.form.get('buy_price') as FormControl;
  }

  get installationPriceCtrl(): FormControl {
    return this.form.get('installation_price') as FormControl;
  }

  get contractVehiclesFormArray(): FormArray<FormGroup> {
    return this.form.get('contract_vehicles') as FormArray<FormGroup>;
  }

  get installationDateCtrl(): FormControl {
    return this.form.get('installation_date') as FormControl;
  }

  get startDateCtrl(): FormControl {
    return this.form.get('start_date') as FormControl;
  }

  get endDateCtrl(): FormControl {
    return this.form.get('end_date') as FormControl;
  }

  get recurrentTypeCtrl(): FormControl {
    return this.form.get('recurrent_type') as FormControl;
  }

  get saleUserIdCtrl(): FormControl {
    return this.form.get('sale_user_id') as FormControl;
  }

  get prorationDaysCtrl(): FormControl {
    return this.form.get('proration_days') as FormControl;
  }

  get periodCtrl(): FormControl {
    return this.form.get('period') as FormControl;
  }

  get clientBusinessUnitIdCtrl(): FormControl {
    return this.form.get('client_business_unit_id') as FormControl;
  }

  ngOnInit() {
    this.quantityCtrlChange();

    this.periodCtrl.valueChanges.subscribe((period: number) => {
      this.calculationDates(this.installationDateCtrl.value);
    });

    this.installationDateCtrl.valueChanges.pipe(startWith(new Date())).subscribe((installationDate: Date | null) => {
      if (!installationDate) return;
      this.calculationDates(installationDate);
    });

    this.clientCtrl.valueChanges.subscribe((client: Client) => {      
      if (client instanceof Object) {
        if(client.client_business_units?.length == 1) {
          this.clientBusinessUnitIdCtrl.setValue(client.client_business_units[0].id, { emitEvent: false });
        }
      }
    });
  }

  private calculationDates(installation_date: Date) {
    const dayInstallationDate = getDate(installation_date);
    const monthInstallationDate = getMonth(installation_date);
    const yearInstallationDate = getYear(installation_date);

    const dayInitContract = 26;
    const monthInitContract = dayInstallationDate > dayInitContract ? monthInstallationDate + 1 : monthInstallationDate;
    const yearInitContract = dayInstallationDate > dayInitContract && monthInstallationDate == 11 ? yearInstallationDate + 1 : yearInstallationDate;

    const startDate = new Date(yearInitContract, monthInitContract, dayInitContract);
    const prorationDays = differenceInDays(startDate, installation_date);
    const period = Number(this.periodCtrl.value ?? 0);
    const endDate = new Date(yearInitContract, monthInitContract + period, dayInitContract - 1);
    
    this.prorationDaysCtrl.setValue(prorationDays, { emitEvent: false });
    this.startDateCtrl.setValue(format(startDate, 'dd/MM/yyyy'), { emitEvent: false });
    this.endDateCtrl.setValue(format(endDate, 'dd/MM/yyyy'), { emitEvent: false });
  }

  public changesContractVehiclesFormArray() {
    this.contractVehiclesFormArray.controls.forEach((formGroupContractVehicle: FormGroup, index) => {
      formGroupContractVehicle.get('vehicle')?.get('plate')?.setValidators([Validators.required, Validators.pattern(this.patternAddPlates(index))]);
      formGroupContractVehicle.get('vehicle')?.get('plate')?.updateValueAndValidity({ emitEvent: false });
    });
  }

  private patternAddPlates(indexExcept: number = -1): string {
    return `^(?!${this.contractVehiclesFormArray.value.filter((_, index) => index != indexExcept).map((contractVehicle: ContractVehicle) => contractVehicle.vehicle!.plate).filter(item => item).join('$|') ?? '----'}$).*`;
  }

  private quantityCtrlChange() {
    this.quantityCtrl.valueChanges.subscribe((value: number) => {
      if (value > this.contractVehiclesFormArray.length) {
        for (let i = this.contractVehiclesFormArray.length; i < value; i++) {
          this.contractVehiclesFormArray.push(new FormGroup({
            vehicle: this.formGroupVehicle()
          }));
        }
      } else {
        for (let i = this.contractVehiclesFormArray.length; i > value; i--) {
          this.contractVehiclesFormArray.removeAt(i - 1);
        }
      }
    });
  }

  private formGroupVehicle(vehicle?: Vehicle) {
    return new FormGroup({
      id: new FormControl(vehicle?.id),
      vehicle_type: new FormControl(vehicle?.vehicle_type),
      vehicle_type_id: new FormControl(vehicle?.vehicle_type_id, [Validators.required]),
      plate: new FormControl(vehicle?.plate, { validators: [Validators.required, Validators.pattern(this.patternAddPlates())], updateOn: 'blur' }),
      brand: new FormControl(vehicle?.brand),
      model: new FormControl(vehicle?.model),
    });
  }

  public getVehicleTypeFormGroup(formGroupContractVehicle: FormGroup): FormControl {
    return formGroupContractVehicle.get('vehicle')?.get('vehicle_type') as FormControl;
  }

  public getVehicleTypeIdFormGroup(formGroupContractVehicle: FormGroup): FormControl {
    return formGroupContractVehicle.get('vehicle')?.get('vehicle_type_id') as FormControl;
  }

  public deleteContractVehicle(index: number) {
    this.contractVehiclesFormArray.removeAt(index);
    this.quantityCtrl.setValue(this.contractVehiclesFormArray.length, { emitEvent: false });
  }
}
