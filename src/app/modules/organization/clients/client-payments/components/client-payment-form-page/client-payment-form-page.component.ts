import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { InputAutocompleteLocalConfiguration, InputAutocompleteTemplateComponent } from '@component/input-autocomplete-template/input-autocomplete-template.component';
import { InputSelectConfiguration, InputSelectServerConfiguration, InputSelectTemplateComponent } from '@component/input-select-template/input-select-template.component';
import { SelectFileComponent } from '@component/select-file/select-file.component';
import { BoxMovementTypeEnum } from '@interface/boxMovement';
import { BoxOpening } from '@interface/boxOpening';
import { NameModuleDatabase } from '@service/database-storage.service';

@Component({
    selector: 'app-client-payment-form-page',
    standalone: true,
    imports: [
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
    templateUrl: './client-payment-form-page.component.html',
    styleUrl: './client-payment-form-page.component.scss'
})
export class ClientPaymentFormPageComponent {
    private activatedRoute = inject(ActivatedRoute);
    @Input() public form!: FormGroup;

    get boxMovementFormGroup(): FormGroup {
        return this.form.get('box_movement') as FormGroup;
    }
    get clientAccountIdCtrl(): FormControl {
        return this.form.get('client_account_id') as FormControl;
    }
    get bankIdCtrl(): FormControl {
        return this.boxMovementFormGroup.get('bank_id') as FormControl;
    }

    get boxOpeningIdCtrl(): FormControl {
        return this.boxMovementFormGroup.get('box_opening_id') as FormControl;
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
    get toBoxOpeningIdCtrl(): FormControl | null {
        return this.boxMovementFormGroup.get('to_box_opening_id') as FormControl;
    }
    public readonly clientAccountSelectServerConfiguration: InputSelectServerConfiguration = {
        textLabel: 'Cuenta',
        server: {
            url: 'client-box',
            queryParams: `client_id=${this.activatedRoute.snapshot.parent?.parent?.paramMap.get('id')}`
        },
        displayTextFn: (item)=> item.type
    }

    public readonly bankAutocompleteLocalConfiguration: InputAutocompleteLocalConfiguration = {
        textLabel: 'Banco',
        local: { nameModuleDatabase: NameModuleDatabase.Banks }
    }
    public readonly boxOpeningLocalConfiguration: InputAutocompleteLocalConfiguration = {
        textLabel: 'Caja',
        local: { nameModuleDatabase: NameModuleDatabase.BoxOpenings },
        displayTextFn: (item: BoxOpening) => item.box?.name ?? '--',
        // displayTextFn: (box_opening: BoxOpening) => box_opening.box ? `<div class="grid">
        //     <div class="label-large">
        //         ${box_opening?.box?.name}
        //         <span class="label-medium">(${box_opening?.box?.type})</span>
        //     </div>
        //     <div class="body-small flex gap-2">
        //         <span class="py-px px-2 rounded-full bg-tertiary-container text-on-tertiary-container">
        //              ${(box_opening?.box?.account?.coin ?? box_opening?.box?.coin)}
        //         </span>
        //     </div>
        //     </div>` : '--',
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
}
