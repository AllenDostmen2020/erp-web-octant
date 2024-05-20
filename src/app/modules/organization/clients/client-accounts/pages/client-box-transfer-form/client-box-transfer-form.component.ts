import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { InputAutocompleteLocalConfiguration, InputAutocompleteServerConfiguration, InputAutocompleteTemplateComponent } from '@component/input-autocomplete-template/input-autocomplete-template.component';
import { InputSelectConfiguration, InputSelectServerConfiguration, InputSelectTemplateComponent } from '@component/input-select-template/input-select-template.component';
import { ItemFormConfiguration, ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { SelectFileComponent } from '@component/select-file/select-file.component';
import { BoxOpening } from '@interface/boxOpening';
import { ClientAccountTypeEnum, ClientBox } from '@interface/clientBox';
import { DatabaseStorageService, NameModuleDatabase } from '@service/database-storage.service';

@Component({
  selector: 'app-client-box-transfer-form',
  standalone: true,
  imports: [
    ItemFormTemplateComponent,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    InputSelectTemplateComponent,
    InputAutocompleteTemplateComponent,
    SelectFileComponent
  ],
  templateUrl: './client-box-transfer-form.component.html',
  styleUrl: './client-box-transfer-form.component.scss'
})
export class ClientBoxTransferFormComponent {
  private databaseStorage = inject(DatabaseStorageService);
  private activatedRoute = inject(ActivatedRoute);
  public maxAmount: number = 100000;
  public boxOpenings: BoxOpening[] = [];
  public configuration: ItemFormConfiguration = {
    type: 'create',
    titleModule: 'transferencia',
    formGroup: new FormGroup({
      from_client_box_id: new FormControl('', [Validators.required]),
      from_client_box: new FormControl(''),
      to_client_box_id: new FormControl('', [Validators.required]),
      to_client_box: new FormControl(''),
      box_movement: new FormGroup({
        to_box_opening: new FormControl(''),
        to_box_opening_id: new FormControl('', [Validators.required]),
        from_box_opening: new FormControl(''),
        from_box_opening_id: new FormControl('', [Validators.required]),
        payment_date: new FormControl(new Date(), [Validators.required]),
        payment_type: new FormControl('', [Validators.required]),
        bank_id: new FormControl(''),
        amount: new FormControl('', [Validators.required]),
        concept: new FormControl(''),
        operation_code: new FormControl(''),
        // observation: new FormControl(''),
        voucher_file: new FormControl(''),
      }),
    }),
    server: { url: 'client-box/transfer' },
  };

  get boxMovementFormGroup(): FormGroup {
    return this.configuration.formGroup.get('box_movement') as FormGroup;
  }
  get toClientBoxIdCtrl(): FormControl {
    return this.configuration.formGroup.get('to_client_box_id') as FormControl;
  }
  get toClientBoxCtrl(): FormControl {
    return this.configuration.formGroup.get('to_client_box') as FormControl;
  }
  get fromClientBoxIdCtrl(): FormControl {
    return this.configuration.formGroup.get('from_client_box_id') as FormControl;
  }
  get fromClientBoxCtrl(): FormControl {
    return this.configuration.formGroup.get('from_client_box') as FormControl;
  }
  get bankIdCtrl(): FormControl {
    return this.boxMovementFormGroup.get('bank_id') as FormControl;
  }
  get toBoxOpeningCtrl(): FormControl {
    return this.boxMovementFormGroup.get('to_box_opening') as FormControl;
  }
  get toBoxOpeningIdCtrl(): FormControl {
    return this.boxMovementFormGroup.get('to_box_opening_id') as FormControl;
  }
  get fromBoxOpeningCtrl(): FormControl {
    return this.boxMovementFormGroup.get('from_box_opening') as FormControl;
  }
  get fromBoxOpeningIdCtrl(): FormControl {
    return this.boxMovementFormGroup.get('from_box_opening_id') as FormControl;
  }
  get amountCtrl(): FormControl {
    return this.boxMovementFormGroup.get('amount') as FormControl;
  }
  get paymentTypeCtrl(): FormControl {
    return this.boxMovementFormGroup.get('payment_type') as FormControl;
  }
  get voucherFileCtrl(): FormControl {
    return this.boxMovementFormGroup.get('voucher_file') as FormControl;
  }

  public readonly bankAutocompleteLocalConfiguration: InputAutocompleteLocalConfiguration = {
    textLabel: 'Banco',
    local: { nameModuleDatabase: NameModuleDatabase.Banks }
  }
  public readonly toClientBoxSelectServerConfiguration: InputAutocompleteServerConfiguration = {
    textLabel: 'Cuenta destino',
    server: {
      url: 'client-box',
      queryParams: `client_id=${this.activatedRoute.snapshot.parent?.parent?.paramMap.get('id')}`
    },
    parseDataFn: (data) => data.filter(item => {
      const toClientBoxId = this.fromClientBoxIdCtrl.value;
      if (toClientBoxId) return item.id != toClientBoxId
      return true;
    }),
    displayTextFn: (item) => item instanceof Object ? ((item.type).toUpperCase() ?? '') : ''
  }
  public readonly fromClientBoxSelectServerConfiguration: InputAutocompleteServerConfiguration = {
    textLabel: 'Cuenta origen',
    server: {
      url: 'client-box',
      queryParams: `client_id=${this.activatedRoute.snapshot.parent?.parent?.paramMap.get('id')}`
    },
    displayTextFn: (item) => item instanceof Object ? ((item.type).toUpperCase() ?? '') : ''
  }

  public readonly toBoxOpeningLocalConfiguration: InputAutocompleteLocalConfiguration = {
    textLabel: 'Caja destino',
    local: { nameModuleDatabase: NameModuleDatabase.BoxOpenings },
    parseDataFn: (data) => data.filter(item => {
      const toBoxOpeningId = this.fromBoxOpeningIdCtrl.value;
      if (toBoxOpeningId) return item.id != toBoxOpeningId
      return true;
    }),
    conditionFilterFn: (box_opening, value) => {
      return box_opening.box?.name.toLowerCase().includes((value ?? '').toLocaleLowerCase()) ?? false;
    },
    displayTextFn: (box_opening) => box_opening instanceof Object ? (box_opening.box?.name ?? '') : '',
    optionDisplayTextFn: (box_opening: BoxOpening) => box_opening.box ? `<div class="grid">
            <div class="label-large">
                ${box_opening?.box?.name}
                <span class="py-px px-2 rounded-full bg-tertiary-container text-on-tertiary-container">
                     ${(box_opening?.box?.account?.coin ?? box_opening?.box?.coin)}
                </span>
            </div>
            <div class="body-small flex gap-2">
                ${box_opening?.box?.account?.name} | ${box_opening?.box?.account?.bank?.name}
            </div>
            </div>` : '--',
  }

  public readonly fromBoxOpeningLocalConfiguration: InputAutocompleteLocalConfiguration = {
    textLabel: 'Caja origen',
    local: { nameModuleDatabase: NameModuleDatabase.BoxOpenings },
    parseDataFn: (data) => data.filter(item => {
      const fromBoxOpeningId = this.toBoxOpeningIdCtrl.value;
      if (fromBoxOpeningId) return item.id != fromBoxOpeningId
      return true;
    }),
    conditionFilterFn: (box_opening, value) => {
      return box_opening.box?.name.toLowerCase().includes((value ?? '').toLocaleLowerCase()) ?? false;
    },
    displayTextFn: (box_opening) => box_opening instanceof Object ? (box_opening.box?.name ?? '') : '',
    optionDisplayTextFn: (box_opening: BoxOpening) => box_opening.box ? `<div class="grid">
            <div class="label-large">
                ${box_opening?.box?.name}
                <span class="py-px px-2 rounded-full bg-tertiary-container text-on-tertiary-container">
                     ${(box_opening?.box?.account?.coin ?? box_opening?.box?.coin)}
                </span>
            </div>
            <div class="body-small flex gap-2">
                ${box_opening?.box?.account?.name} | ${box_opening?.box?.account?.bank?.name}
            </div>
            </div>` : '--',
  }

  public readonly paymentTypeSelectConfiguration: InputSelectConfiguration = {
    textLabel: 'Tipo de pago',
    data: signal([
      { id: 'transferencia', name: 'Transferencia' },
      { id: 'depósito', name: 'Depósito' },
      { id: 'efectivo', name: 'Efectivo' },
      { id: 'cheque', name: 'Cheque' },
    ]),
  }

  ngOnInit() {
    this.paymentTypeCtrl.setValue('transferencia');
    this.paymentTypeCtrl.disable();
    this.fromClientBoxCtrl.valueChanges.subscribe((item: ClientBox) => {
      if (item.id) {
        this.maxAmount = item.amount_available;
        if (item.type == ClientAccountTypeEnum.Detraccion) {
          this.getBoxOpenings(this.fromBoxOpeningCtrl);
        }
      }
    });
    this.toClientBoxCtrl.valueChanges.subscribe((item: ClientBox) => {
      if (item.id) {
        if (item.type == ClientAccountTypeEnum.Detraccion) {
          this.getBoxOpenings(this.toBoxOpeningCtrl);
        }
      }
    });
  }

  public async getBoxOpenings(boxOpeningSelectedCtrl: FormControl) {
    this.boxOpenings = await this.databaseStorage.getData<BoxOpening>(NameModuleDatabase.BoxOpenings);
    if (this.boxOpenings.length) {
      const boxDetraction = (this.boxOpenings.filter((boxOpening) =>
      (boxOpening.box?.account?.name.toLowerCase().includes('detraccion') &&
        boxOpening.box?.account.bank?.name.toLowerCase().includes('banco de la nación'))))[0];
      boxOpeningSelectedCtrl.setValue(boxDetraction);
      boxOpeningSelectedCtrl.disable();
    }

  }
}
