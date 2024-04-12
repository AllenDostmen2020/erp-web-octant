import { DecimalPipe, NgClass } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { AutocompleteBoxOpeningComponent } from '@component/autocomplete-box-opening/autocomplete-box-opening.component';
import { DatepickerTemplateComponent } from '@component/datepicker-template/datepicker-template.component';
import { InputAutocompleteLocalConfiguration, InputAutocompleteTemplateComponent } from '@component/input-autocomplete-template/input-autocomplete-template.component';
import { InputSelectConfiguration, InputSelectTemplateComponent } from '@component/input-select-template/input-select-template.component';
import { CharactersOnlyDirective } from '@directive/characters-only.directive';
import { LoadImagePrivateDirective } from '@directive/load-image-private.directive';
import { NumbersOnlyDirective } from '@directive/numbers-only.directive';
import { BoxBusinessEnum, BoxMovementTypeEnum, ComprobantTypeEnum } from '@interface/boxMovement';
import { BoxOpening } from '@interface/boxOpening';
import { PathFilesServerPipe } from '@pipe/path-files-server.pipe';
import { NameModuleDatabase } from '@service/database-storage.service';
import { ContractPlanFormComponent } from 'src/app/modules/tracking/contracts/components/contract-plan-form/contract-plan-form.component';

@Component({
    selector: 'app-box-movement-form',
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
        AutocompleteBoxOpeningComponent
    ],
    templateUrl: './box-movement-form.component.html',
    styleUrl: './box-movement-form.component.scss'
})
export class BoxMovementFormComponent {
    private activatedRoute = inject(ActivatedRoute);
    private router = inject(Router);
    @Input({ required: true }) form!: FormGroup;
    @Input() minAmount: number = 0;
    @Input() maxAmount: number = 1000000;

    public readonly bankAutocompleteLocalConfiguration: InputAutocompleteLocalConfiguration = {
        textLabel: 'Banco',
        local: {
            nameModuleDatabase: NameModuleDatabase.Banks
        }

    }

    public readonly typeSelectConfiguration: InputSelectConfiguration = {
        textLabel: 'Tipo',
        data: signal(Object.values(BoxMovementTypeEnum).map((item) => ({ name: item.toUpperCase(), id: item })))
    }
    public readonly businessSelectConfiguration: InputSelectConfiguration = {
        textLabel: 'Negocio',
        data: signal(Object.values(BoxBusinessEnum).map((item) => ({ name: item.toUpperCase(), id: item })))
    }
    public readonly paymentTypeSelectConfiguration: InputSelectConfiguration = {
        textLabel: 'Medio de pago',
        data: signal([
            { id: 'transferencia', name: 'Transferencia' },
            { id: 'depósito', name: 'Depósito' },
            { id: 'efectivo', name: 'Efectivo' },
            { id: 'cheque', name: 'Cheque' },
        ]),
    }
    public readonly voucherTypeSelectConfiguration: InputSelectConfiguration = {
        textLabel: 'Tipo de comprobante',
        data: signal(Object.values(ComprobantTypeEnum).map((item) => ({ name: item.toUpperCase(), id: item })))
    }
    public readonly boxOpeningLocalConfiguration: InputAutocompleteLocalConfiguration = {
        textLabel: 'Caja',
        local: { nameModuleDatabase: NameModuleDatabase.BoxOpenings },
        displayTextFn: (item: BoxOpening) => item instanceof Object ? (item.box?.name ?? '') : '',
    }

    public readonly toBoxOpeningLocalConfiguration: InputAutocompleteLocalConfiguration = {
        textLabel: 'Caja destino',
        local: { nameModuleDatabase: NameModuleDatabase.BoxOpenings },
        parseDataFn: (data) => data.filter(item => {
            const toBoxOpeningId = this.boxOpeningIdCtrl.value;
            if (toBoxOpeningId) return item.id != toBoxOpeningId
            return true;
        }),
        displayTextFn: (item: BoxOpening) => item instanceof Object ? (item.box?.name ?? '') : '',
    }
    get typeCtrl(): FormControl {
        return this.form.get('type') as FormControl;
    }
    get bankIdCtrl(): FormControl {
        return this.form.get('bank_id') as FormControl;
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
    get businessCtrl(): FormControl {
        return this.form.get('business') as FormControl;
    }
    get toBoxOpeningIdCtrl(): FormControl {
        return this.form.get('to_box_opening_id') as FormControl;
    }


    ngOnInit(): void {
        if (this.router.url.includes('/box/view/')) {
            this.boxOpeningIdCtrl.setValue(this.activatedRoute.snapshot.parent?.parent?.paramMap.get('id'));
            this.boxOpeningIdCtrl.disable();
        }
        this.typeCtrl.valueChanges.subscribe(value => {
            if (value == BoxMovementTypeEnum.MOVIMIENTO_ENTRE_CAJAS) {
                this.boxOpeningLocalConfiguration.textLabel = 'Caja de origen';
                this.paymentTypeCtrl.clearValidators();
                this.paymentTypeCtrl.updateValueAndValidity();
            }
            else if (value == BoxMovementTypeEnum.INGRESO) {
                this.bankAutocompleteLocalConfiguration.textLabel = 'Banco origen';
                this.paymentTypeCtrl.setValidators([Validators.required])
            }
            else if (value == BoxMovementTypeEnum.EGRESO) {
                this.bankAutocompleteLocalConfiguration.textLabel = 'Banco destino';
                this.paymentTypeCtrl.setValidators([Validators.required])
            }
        })
    }
}
