import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { BoxMovement } from '@interface/boxMovement';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { AutocompleteBoxOpeningComponent } from '../autocomplete-box-opening/autocomplete-box-opening.component';
import { SelectFileComponent } from '../select-file/select-file.component';
import { InputSelectConfiguration, InputSelectTemplateComponent } from '@component/input-select-template/input-select-template.component';
import { InputAutocompleteLocalConfiguration, InputAutocompleteTemplateComponent } from '@component/input-autocomplete-template/input-autocomplete-template.component';
import { NameModuleDatabase } from '@service/database-storage.service';

export interface DataFormEvent {
    type: 'submit' | 'patch' | 'reset';
    emitEvent?: boolean;
    item?: any;
}

export interface ItemFormConfiguration {
    disableBoxOpeningId?: boolean;
    disableType?: boolean;
    disableAmount?: boolean;
    hiddenConcept?: boolean;
}

@Component({
    selector: 'app-box-movement-form',
    standalone: true,
    imports: [CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatInputModule,
        MatSelectModule,
        AutocompleteBoxOpeningComponent,
        MatDatepickerModule,
        SelectFileComponent,
        InputSelectTemplateComponent,
        InputAutocompleteTemplateComponent,
    ],
    templateUrl: './box-movement-form.component.html',
    styleUrls: ['./box-movement-form.component.scss'],
})
export class BoxMovementFormComponent {
    @Output() public saveForm: EventEmitter<BoxMovement> = new EventEmitter();
    @Input() public formEvent?: EventEmitter<DataFormEvent>;
    @Input() public data?: BoxMovement;
    @Input() public configuration?: ItemFormConfiguration;
    @Input() public maxAmount: number = 1000000;
    @Input() public minAmount: number = 0;

    @Input() public form: FormGroup = new FormGroup({
        box_opening_id: new FormControl('', [Validators.required]),
        type: new FormControl('', [Validators.required]),
        amount: new FormControl('', [Validators.required]),
        concept: new FormControl('', [Validators.required]),
        link_file: new FormControl(''),
        payment_type: new FormControl('', [Validators.required]),
        bank_id: new FormControl(''),
        opcode: new FormControl(''),
        invoice_number: new FormControl(''),
        voucher_type: new FormControl(''),
        voucher_file: new FormControl(''),
        payment_date: new FormControl(''),
        observation: new FormControl(''),
    });
    public backAutocompleteConfiguration: InputAutocompleteLocalConfiguration = {
        textLabel: 'Banco',
        local: {
            nameModuleDatabase: NameModuleDatabase.BANKS,
        }
    }
    public readonly voucherTypeSelectConfiguration: InputSelectConfiguration = {
        textLabel: 'Tipo de comprobante',
        data: [
            { id: 'boleta', name: 'Boleta' },
            { id: 'factura', name: 'Factura' },
        ],
    }
    public readonly typeSelectConfiguration: InputSelectConfiguration = {
        textLabel: 'Tipo',
        data: [
            { id: 'ingreso', name: 'Ingreso' },
            { id: 'egreso', name: 'Egreso' },
        ],
    }
    public readonly paymentTypeSelectConfiguration: InputSelectConfiguration = {
        textLabel: 'Tipo de pago',
        data: [
            { id: 'transferencia', name: 'Transferencia' },
            { id: 'depósito', name: 'Depósito' },
            { id: 'efectivo', name: 'Efectivo' },
            { id: 'cheque', name: 'Cheque' },
        ],
    }

    get boxOpeningIdCtrl(): FormControl {
        return this.form.get('box_opening_id') as FormControl;
    }
    
    get typeCtrl(): FormControl {
        return this.form.get('type') as FormControl;
    }

    get amountCtrl(): FormControl {
        return this.form.get('amount') as FormControl;
    }

    get conceptCtrl(): FormControl {
        return this.form.get('concept') as FormControl;
    }

    get coinCtrl(): FormControl {
        return this.form.get('coin') as FormControl;
    }

    get bankIdCtrl(): FormControl {
        return this.form.get('bank_id') as FormControl;
    }

    get opcodeCtrl(): FormControl {
        return this.form.get('opcode') as FormControl;
    }
    
    get paymentTypeCtrl(): FormControl {
        return this.form.get('payment_type') as FormControl;
    }

    get voucherTypeCtrl(): FormControl {
        return this.form.get('voucher_type') as FormControl;
    }

    get voucherFileCtrl(): FormControl {
        return this.form.get('voucher_file') as FormControl;
    }

    ngOnInit(): void {
        if (this.data) {
            this.form.patchValue(this.data);
        }
        if (this.configuration?.disableBoxOpeningId) {
            this.boxOpeningIdCtrl.disable();
            this.boxOpeningIdCtrl.clearValidators();
        }
        if (this.configuration?.disableType) {
            this.typeCtrl.disable();
            this.typeCtrl.clearValidators();
        }
        if (this.configuration?.disableAmount) {
            this.amountCtrl.disable();
            this.amountCtrl.clearValidators();
        }
        if (this.configuration?.hiddenConcept) {
            this.conceptCtrl.clearValidators();
        }

        this.paymentTypeCtrl.valueChanges.subscribe(value => {
            if (value == 'transferencia' || value == 'depósito') {
                this.bankIdCtrl.setValidators([Validators.required]);
                this.bankIdCtrl.updateValueAndValidity();
                this.opcodeCtrl.setValidators([Validators.required]);
                this.opcodeCtrl.updateValueAndValidity();
            } else if (value == 'cheque') {
                this.bankIdCtrl.clearValidators();
                this.bankIdCtrl.updateValueAndValidity();
                this.opcodeCtrl.setValidators([Validators.required]);
                this.opcodeCtrl.updateValueAndValidity();
            } else {
                this.bankIdCtrl.clearValidators();
                this.bankIdCtrl.updateValueAndValidity();
                this.opcodeCtrl.clearValidators();
                this.opcodeCtrl.updateValueAndValidity();
            }
        })

    }

    ngAfterViewInit() {
        this.formEvent?.subscribe(({ item, type, emitEvent = false }) => {
            if (type == 'submit') {
                this.submitForm()
            }
        })
    }

    public submitForm() {
        this.form.markAllAsTouched();
        if (this.form.valid) {
            this.saveForm.emit({
                ...this.form.value,
            })
        }
    }
}
