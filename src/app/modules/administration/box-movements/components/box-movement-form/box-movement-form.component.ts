import { DecimalPipe, NgClass } from '@angular/common';
import { Component, Input, WritableSignal, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertConfiguration, AlertTemplateComponent } from '@component/alert-template/alert-template.component';
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
import { DatabaseStorageService, NameModuleDatabase } from '@service/database-storage.service';
import { debounceTime } from 'rxjs';
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
        AutocompleteBoxOpeningComponent,
        AlertTemplateComponent,
    ],
    templateUrl: './box-movement-form.component.html',
    styleUrl: './box-movement-form.component.scss'
})
export class BoxMovementFormComponent {
    private activatedRoute = inject(ActivatedRoute);
    private router = inject(Router);
    private databaseStorage = inject(DatabaseStorageService);
    @Input({ required: true }) form!: FormGroup;
    @Input() minAmount: number = 0;
    @Input() maxAmount: number = 1000000;

    public alertConfiguration: WritableSignal<AlertConfiguration|null> = signal(null);

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
        conditionFilterFn: (box_opening, value) => box_opening.box?.name.toLowerCase().includes((value ?? '').toLocaleLowerCase()) ?? false,
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
    public readonly toBoxOpeningLocalConfiguration: InputAutocompleteLocalConfiguration = {
        textLabel: 'Caja destino',
        local: { nameModuleDatabase: NameModuleDatabase.BoxOpenings },
        parseDataFn: (data) => data.filter(item => {
            const toBoxOpeningId = this.boxOpeningIdCtrl.value;
            if (toBoxOpeningId) return item.id != toBoxOpeningId
            return true;
        }),
        conditionFilterFn: (box_opening, value) => box_opening.box?.name.toLowerCase().includes((value ?? '').toLocaleLowerCase()) ?? false,
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
    get typeCtrl(): FormControl {
        return this.form.get('type') as FormControl;
    }
    get bankIdCtrl(): FormControl {
        return this.form.get('bank_id') as FormControl;
    }

    get boxOpeningIdCtrl(): FormControl {
        return this.form.get('box_opening_id') as FormControl;
    }
    get boxOpeningCtrl(): FormControl {
        return this.form.get('box_opening') as FormControl;
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
        this.verifyBox();
        this.typeCtrl.valueChanges.subscribe(value => {
            if (value) {
                if (value == BoxMovementTypeEnum.MOVIMIENTO_ENTRE_CAJAS) {
                    this.boxOpeningLocalConfiguration.textLabel = 'Caja de origen';
                    this.paymentTypeCtrl.clearValidators();
                    this.paymentTypeCtrl.updateValueAndValidity();
                    this.maxAmount = 100000;
                }
                else if (value == BoxMovementTypeEnum.INGRESO) {
                    this.bankAutocompleteLocalConfiguration.textLabel = 'Banco origen';
                    this.paymentTypeCtrl.setValidators([Validators.required]);
                    this.maxAmount = 100000;
                }
                else if (value == BoxMovementTypeEnum.EGRESO) {
                    this.bankAutocompleteLocalConfiguration.textLabel = 'Banco destino';
                    this.paymentTypeCtrl.setValidators([Validators.required]);
                    if (this.boxOpeningCtrl.value) {
                        console.log(this.boxOpeningCtrl.value.box?.amount);
                        this.maxAmount = Number(this.boxOpeningCtrl.value.box?.amount) ?? 0;
                    }
                }
            };
            this.boxOpeningCtrl.valueChanges.subscribe((item: BoxOpening) => {
                if (this.typeCtrl.value && this.typeCtrl.value == BoxMovementTypeEnum.EGRESO) {
                    this.maxAmount = Number(item.box?.amount) ?? 0;
                }
            });

        })
    }

    private async verifyBox(): Promise<void> {
        if (this.router.url.includes('/box/view/')) {
            const boxOpenings = await this.databaseStorage.getData<BoxOpening>(NameModuleDatabase.BoxOpenings);
            const boxId = Number(this.activatedRoute.snapshot.parent?.parent?.paramMap.get('id'));
            const boxOpening = boxOpenings.find(e => e.box?.id == boxId);
            this.boxOpeningIdCtrl.setValue(boxOpening?.id);
            this.boxOpeningIdCtrl.disable();
            if(!boxOpening) {
                this.alertConfiguration.set({
                    icon: 'info',
                    title: 'Caja cerrada',
                    description: 'Esta caja no está aperturada, primero se debe aperturar para poder hacer movimientos',
                    actionButton: {
                        text: 'Ir a aperturar caja',
                        fn: () => this.router.navigate(['../../detail'], {relativeTo: this.activatedRoute}),
                    }
                })
            }
        }
    }
}
