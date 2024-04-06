import { DecimalPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, WritableSignal, computed, inject, input, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatepickerTemplateComponent } from '@component/datepicker-template/datepicker-template.component';
import { InputAutocompleteLocalConfiguration, InputAutocompleteServerConfiguration, InputAutocompleteTemplateComponent } from '@component/input-autocomplete-template/input-autocomplete-template.component';
import { InputSelectConfiguration, InputSelectTemplateComponent } from '@component/input-select-template/input-select-template.component';
import { LoadImagePrivateDirective } from '@directive/load-image-private.directive';
import { Client } from '@interface/client';
import { RECURRENT_TYPE_VALUES } from '@interface/contract';
import { PathFilesServerPipe } from '@pipe/path-files-server.pipe';
import { DatabaseStorageService, NameModuleDatabase } from '@service/database-storage.service';
import { getDate, getMonth, getYear, format, differenceInDays } from 'date-fns';
import { startWith } from 'rxjs/operators';
import { ContractPlanFormComponent } from '../contract-plan-form/contract-plan-form.component';
import { getContractPlanFormGroup } from '../../helpers';
import { ConfirmDialogData, ConfirmDialogTemplateComponent } from '@component/confirm-dialog-template/confirm-dialog-template.component';
import { MatDialog } from '@angular/material/dialog';
import { CharactersOnlyDirective } from '@directive/characters-only.directive';
import { NumbersOnlyDirective } from '@directive/numbers-only.directive';
import { DOCUMENT_TYPES, DocumentTypeEnum } from '@interface/baseModel';
import { Plan } from '@interface/plan';

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
    PathFilesServerPipe,
    ContractPlanFormComponent,
    CharactersOnlyDirective,
    NumbersOnlyDirective,
  ],
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractFormComponent {
  @Input({ required: true }) form!: FormGroup;
  private databaseStorage = inject(DatabaseStorageService);
  private matDialog = inject(MatDialog);
  public vehicleDetail: WritableSignal<'full' | 'single'> = signal('single');
  public planIdSelectedEvent = new EventEmitter<{ index: number, values: number[] }>();
  public planIdsSelected: { index: number, value: number }[] = [];
  public plans = signal<Plan[]>([]);
  public lengthPlans = computed(() => this.plans().length);

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

  public readonly documentTypeSelectConfiguration: InputSelectConfiguration = {
    textLabel: 'Tipo de documento',
    placeholder: 'Seleccione un tipo de documento',
    data: signal(DOCUMENT_TYPES.filter((item) => item != DocumentTypeEnum.RUC).map((item) => ({ name: item.toUpperCase(), id: item })).sort((a, b) => a.name.localeCompare(b.name)))
  }

  public clientBusinessUnitAutocompleteConfiguration: InputSelectConfiguration = {
    textLabel: 'Unidad de negocio',
    data: signal([]),
  }

  public readonly saleUserAutocompleteConfiguration: InputAutocompleteLocalConfiguration = {
    textLabel: 'Vendedor',
    local: { nameModuleDatabase: NameModuleDatabase.Users }
  }

  public readonly recurrentTypeSelectConfiguration: InputSelectConfiguration = {
    textLabel: 'Tipo de recurrente',
    data: signal(RECURRENT_TYPE_VALUES.map((recurrentType: string) => ({ id: recurrentType, name: recurrentType.toUpperCase() }))),
  };

  public readonly periodSelectConfiguration: InputSelectConfiguration = {
    textLabel: 'Duración',
    data: signal([
      { id: 12, name: '1 año' },
      { id: 24, name: '2 años' },
      { id: 36, name: '3 años' },
      { id: 48, name: '4 años' },
      { id: 60, name: '5 años' },
    ]),
  };

  get clientIdCtrl(): FormControl {
    return this.form.get('client_id') as FormControl;
  }

  get clientCtrl(): FormControl {
    return this.form.get('client') as FormControl;
  }

  get contractPlansFormArray(): FormArray<FormGroup> {
    return this.form.get('contract_plans') as FormArray<FormGroup>;
  }

  get salePriceCtrl(): FormControl {
    return this.form.get('sale_price') as FormControl;
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

  get periodCtrl(): FormControl {
    return this.form.get('period') as FormControl;
  }
  get documentTypeCtrl(): FormControl {
    return this.form.get('client_responsible_document_type') as FormControl;
  }
  get documentNumberCtrl(): FormControl {
    return this.form.get('client_responsible_document_number') as FormControl;
  }

  get clientBusinessUnitIdCtrl(): FormControl {
    return this.form.get('client_business_unit_id') as FormControl;
  }

  ngOnInit() {
    this.getPlans();
    this.documentTypeCtrl.valueChanges.subscribe((documentType) => {
      if (documentType == DocumentTypeEnum.DNI) this.updateValidatorsForDocumentNumberCtrl(8);
      else this.updateValidatorsForDocumentNumberCtrl(12);
    })

    this.periodCtrl.valueChanges.subscribe((period: number) => {
      this.calculationDates(this.installationDateCtrl.value);
    });

    this.installationDateCtrl.valueChanges.pipe(startWith(new Date())).subscribe((installationDate: Date | null) => {
      if (!installationDate) return;
      this.calculationDates(installationDate);
    });

    this.clientCtrl.valueChanges.pipe(startWith(this.clientCtrl.value)).subscribe((client: Client) => {
      if (client instanceof Object) {
        this.clientBusinessUnitAutocompleteConfiguration.data!.set(client.client_business_units ?? []);
        if (client.client_business_units?.length == 1) {
          this.clientBusinessUnitIdCtrl.setValue(client.client_business_units[0].id, { emitEvent: false });
        }
      } else {
        this.clientBusinessUnitAutocompleteConfiguration.data?.set([]);
      }
    });
  }

  private async getPlans() {
    this.plans.set(await this.databaseStorage.getData<Plan>(NameModuleDatabase.Plans));
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

  public addContractPlan() {
    this.contractPlansFormArray.push(getContractPlanFormGroup());
  }

  private calculationDates(installation_date: Date) {
    const dayInstallationDate = getDate(installation_date);
    const monthInstallationDate = getMonth(installation_date);
    const yearInstallationDate = getYear(installation_date);

    const dayInitContract = 26;
    const monthInitContract = dayInstallationDate > dayInitContract ? monthInstallationDate + 1 : monthInstallationDate;
    const yearInitContract = dayInstallationDate > dayInitContract && monthInstallationDate == 11 ? yearInstallationDate + 1 : yearInstallationDate;

    const startDate = new Date(yearInitContract, monthInitContract, dayInitContract);
    const period = Number(this.periodCtrl.value ?? 0);
    const endDate = new Date(yearInitContract, monthInitContract + period, dayInitContract - 1);

    this.startDateCtrl.setValue(format(startDate, 'dd/MM/yyyy'), { emitEvent: false });
    this.endDateCtrl.setValue(format(endDate, 'dd/MM/yyyy'), { emitEvent: false });
  }

  public async deleteContractPlan(i: number): Promise<any | null> {
    if (this.contractPlansFormArray.at(i).dirty) {
      console.log('No se puede eliminar un plan de contrato que ha sido tocado');
      const dialogData: ConfirmDialogData = {
        icon: 'info',
        title: '¿Está seguro de eliminar la información?',
        description: '',
        confirmButton: { disabled: false },
      };
      const confirm = await this.confirmDialog(dialogData);
      if (!confirm) return null;
      this.contractPlansFormArray.removeAt(i);
    } else {
      this.contractPlansFormArray.removeAt(i);
    }
  }

  private confirmDialog(data: ConfirmDialogData): Promise<boolean> {
    return new Promise((resolve) => {
      const dialogRef = this.matDialog.open(ConfirmDialogTemplateComponent, { data });
      dialogRef.afterClosed().subscribe((result) => resolve(result));
    });
  }

  public planIdSelected($event: { index: number, value: number }) {
    if (!this.planIdsSelected.some((item) => item.index == $event.index)) this.planIdsSelected.push($event);
    else this.planIdsSelected = this.planIdsSelected.map((item) => item.index == $event.index ? $event : item);
    this.planIdsSelected = this.planIdsSelected.sort((a, b) => a.index - b.index);[0, 1, 2, 3, 4]
    if ($event.index < (this.planIdsSelected.length - 1)) this.planIdsSelected = this.planIdsSelected.toSpliced($event.index + 1, (this.planIdsSelected.length - 1) - $event.index)
    this.planIdSelectedEvent.emit({ index: $event.index, values: this.planIdsSelected.map((item) => item.value) });
  }

  public platesChanges(): void {
    const platesArray: string[] = [];
    this.contractPlansFormArray.controls.forEach((formGroup) => {
      const contractPlanVehiclesFormArray = formGroup.get('contract_plan_vehicles') as FormArray<FormGroup>;
      contractPlanVehiclesFormArray.controls.forEach((formGroupContractVehicle: FormGroup, index) => {
        const vehiclePlateCtrl = formGroupContractVehicle.get('vehicle')?.get('plate') as FormControl;
        platesArray.push(vehiclePlateCtrl.value);
      });
    });
    this.contractPlansFormArray.controls.forEach((formGroup, indexFather) => {
      const contractPlanVehiclesFormArray = formGroup.get('contract_plan_vehicles') as FormArray<FormGroup>;
      contractPlanVehiclesFormArray.controls.forEach((formGroupContractVehicle: FormGroup, index) => {
        const vehiclePlateCtrl = formGroupContractVehicle.get('vehicle')?.get('plate') as FormControl;
        let indexInAllPlates = 0;
        if (indexFather > 0) {
          for (let fi = 0; fi < indexFather; fi++) {
            indexInAllPlates += (this.contractPlansFormArray.at(fi).get('contract_plan_vehicles') as FormArray<FormGroup>).length
          }
          indexInAllPlates += index;
        } else {
          indexInAllPlates = index
        }
        vehiclePlateCtrl.setValidators([Validators.required, Validators.pattern(this.patternAddPlates(platesArray, indexInAllPlates))]);
        vehiclePlateCtrl.updateValueAndValidity({ emitEvent: false });
      });
    });
  }
  private patternAddPlates(platesArray: string[], indexExcept: number = -1): string {
    return `^(?!${platesArray.filter((_, index) => index != indexExcept).filter(plate=>plate).join('$|') ?? '----'}$).*`;
  }
}
