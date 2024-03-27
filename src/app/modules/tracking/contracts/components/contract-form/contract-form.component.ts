import { DecimalPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, WritableSignal, inject, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatepickerTemplateComponent } from '@component/datepicker-template/datepicker-template.component';
import { InputAutocompleteServerConfiguration, InputAutocompleteTemplateComponent } from '@component/input-autocomplete-template/input-autocomplete-template.component';
import { InputSelectConfiguration, InputSelectLocalConfiguration, InputSelectTemplateComponent } from '@component/input-select-template/input-select-template.component';
import { LoadImagePrivateDirective } from '@directive/load-image-private.directive';
import { Client } from '@interface/client';
import { RECURRENT_TYPE_VALUES } from '@interface/contract';
import { PathFilesServerPipe } from '@pipe/path-files-server.pipe';
import { NameModuleDatabase } from '@service/database-storage.service';
import { getDate, getMonth, getYear, format, differenceInDays } from 'date-fns';
import { startWith } from 'rxjs/operators';
import { ContractPlanFormComponent } from '../contract-plan-form/contract-plan-form.component';
import { getContractPlanFormGroup } from '../../helpers';
import { ConfirmDialogData, ConfirmDialogTemplateComponent } from '@component/confirm-dialog-template/confirm-dialog-template.component';
import { MatDialog } from '@angular/material/dialog';

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
  ],
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractFormComponent {
  @Input({ required: true }) form!: FormGroup;
  private matDialog = inject(MatDialog);
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

  public clientBusinessUnitAutocompleteConfiguration: InputSelectConfiguration = {
    textLabel: 'Unidad de negocio',
    data: signal([]),
  }

  public readonly saleUserAutocompleteConfiguration: InputSelectLocalConfiguration = {
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

  get clientBusinessUnitIdCtrl(): FormControl {
    return this.form.get('client_business_unit_id') as FormControl;
  }

  ngOnInit() {
    this.periodCtrl.valueChanges.subscribe((period: number) => {
      this.calculationDates(this.installationDateCtrl.value);
    });

    this.installationDateCtrl.valueChanges.pipe(startWith(new Date())).subscribe((installationDate: Date | null) => {
      if (!installationDate) return;
      this.calculationDates(installationDate);
    });

    this.clientCtrl.valueChanges.subscribe((client: Client) => {
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
}
