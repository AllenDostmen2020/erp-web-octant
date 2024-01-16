import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AutocompleteBoxOpeningComponent } from '../autocomplete-box-opening/autocomplete-box-opening.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SelectFileComponent } from '../select-file/select-file.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NameModuleDatabase } from '@service/database-storage.service';
import { BoxMovement, BoxMovementTypeEnum } from '@interface/boxMovement';
import { InputAutocompleteLocalConfiguration } from '@component/input-autocomplete-template/input-autocomplete-template.component';
import { InputSelectConfiguration, InputSelectTemplateComponent } from '@component/input-select-template/input-select-template.component';

export const getFormGroupBoxMovement = (data?: Partial<BoxMovement>): FormGroup => {
    return new FormGroup({
        box_opening_id: new FormControl(data?.box_opening_id ?? null, [Validators.required]),
        type: new FormControl(data?.type ?? null, [Validators.required]),
        amount: new FormControl(data?.amount ?? null, [Validators.required]),
        concept: new FormControl(data?.concept ?? null, [Validators.required]),
        link_file: new FormControl(''),
        payment_type: new FormControl('', [Validators.required]),
        bank_id: new FormControl(''),
        opcode: new FormControl(''),
        invoice_number: new FormControl(''),
        voucher_type: new FormControl(''),
        voucher_file: new FormControl(''),
        payment_date: new FormControl(''),
        observation: new FormControl(''),

        // to_box_opening_id: new FormControl(''),
        // cost_center_id: new FormControl(''),
    })
}

@Component({
    selector: 'app-box-movement-form-template',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        AutocompleteBoxOpeningComponent,
        MatDatepickerModule,
        SelectFileComponent,
        InputSelectTemplateComponent
    ],
    templateUrl: './box-movement-form-template.component.html',
    styleUrls: ['./box-movement-form-template.component.scss']
})
export class BoxMovementFormTemplateComponent {
    @Input({ required: true }) form!: FormGroup;
    @Input() minAmount: number = 0;
    @Input() maxAmount: number = 1000000;

    public boxMovementTypes = Object.values(BoxMovementTypeEnum);

    public readonly bankAutocompleteLocalConfiguration: InputAutocompleteLocalConfiguration = {
        textLabel: 'Banco',
        local: { nameModuleDatabase: NameModuleDatabase.BANKS }
    }
    public readonly voucherTypeSelectConfiguration: InputSelectConfiguration = {
        textLabel: 'Tipo de comprobante',
        data: [
            { id: 'boleta', name: 'Boleta' },
            { id: 'factura', name: 'Factura' },
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

    get bankIdCtrl(): FormControl {
        return this.form.get('bank_id') as FormControl;
    }
    get typeCtrl(): FormControl {
        return this.form.get('type') as FormControl;
    }

    get boxOpeningIdCtrl(): FormControl {
        return this.form.get('box_opening_id') as FormControl;
    }

    get amountCtrl(): FormControl {
        return this.form.get('amount') as FormControl;
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

    get toBoxOpeningIdCtrl(): FormControl | null {
        return this.form.get('to_box_opening_id') as FormControl;
    }

    get costCenterIdCtrl(): FormControl | null {
        return this.form.get('cost_center_id') as FormControl;
    }

    ngOnInit(): void {
        this.typeCtrl.valueChanges.subscribe((value) => {
            if (value === BoxMovementTypeEnum.MOVIMIENTO_ENTRE_CAJAS) {
                this.form.setControl('to_box_opening_id', new FormControl('', [Validators.required]));
                this.form.removeControl('cost_center_id');
            } else if (value === BoxMovementTypeEnum.INGRESO) {
                this.form.removeControl('to_box_opening_id');
                this.form.removeControl('cost_center_id');
            } else if (value === BoxMovementTypeEnum.EGRESO) {
                this.form.removeControl('to_box_opening_id');
                this.form.setControl('cost_center_id', new FormControl('', [Validators.required]));
            }
        });
    }
}
