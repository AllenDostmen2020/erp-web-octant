import { DatePipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, TemplateRef, ViewChild, ViewEncapsulation, WritableSignal, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { SpinnerDefaultComponent } from '@component/spinner-default/spinner-default.component';
import { CoinEnum, StatusModel } from '@interface/baseModel';
import { Box } from '@interface/box';
import { BoxOpening } from '@interface/boxOpening';
import { ItemDetailConfiguration, ItemDetailTemplateComponent, actionButton, numberDetail, registerDataGroupDetail, textDetail, titlecaseDetail } from '@component/item-detail-template/item-detail-template.component';
import { DatabaseStorageService, NameModuleDatabase } from '@service/database-storage.service';
import { FetchService, RequestInitFetch } from '@service/fetch.service';
import { BoxOpeningCreatePageComponent } from '../../box-openings/pages/box-opening-create-page/box-opening-create-page.component';
import { AlertConfiguration, AlertTemplateComponent } from '@component/alert-template/alert-template.component';
import { ConfirmDialogData, ConfirmDialogTemplateComponent } from '@component/confirm-dialog-template/confirm-dialog-template.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-box-detail-page',
    standalone: true,
    imports: [
        RouterLink,
        SpinnerDefaultComponent,
        DecimalPipe,
        TitleCasePipe,
        DatePipe,
        ItemDetailTemplateComponent,
        AlertTemplateComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './box-detail-page.component.html',
    styleUrl: './box-detail-page.component.scss',
    providers: [DatePipe]
})
export class BoxDetailPageComponent {
    @ViewChild('deleteFormTemplate', { static: true }) deleteFormTemplate!: TemplateRef<any>;
    private fetch = inject(FetchService);
    private matDialog = inject(MatDialog);
    private dialog = inject(MatDialog);
    private router = inject(Router);
    private datePipe = inject(DatePipe);
    private databaseStorage = inject(DatabaseStorageService);
    public alertConfiguration: WritableSignal<null | AlertConfiguration> = signal(null);
    public configuration: ItemDetailConfiguration<Box> = {
        title: 'Detalle de la caja',
        server: {
            url: 'box',
            queryParams: {
                relations: 'account.bank,lastBoxOpening.(openUser|closeUser)'
            },
        },
        subtitle: false,
        updateItemEvent: new EventEmitter(),
        backButton: false,
        afterSetItemFn: (item) => {
            // this.showOpenButton(item);
            this.alertConfigurationMessage();
        },
        groups: [
            {
                details: [
                    titlecaseDetail({
                        title: 'Tipo',
                        displayValueFn: (item) => item.type,
                    }),
                    textDetail({
                        title: 'Nombre',
                        displayValueFn: (item) => item.name,
                    }),
                    numberDetail({
                        title: 'Monto inicial',
                        displayValueFn: (item) => item.amount_init,
                    }),
                    textDetail({
                        title: 'N° de cuenta',
                        displayValueFn: (item) => item.account?.number,
                    }),
                    textDetail({
                        title: 'Banco',
                        displayValueFn: (item) => item.account?.bank?.name,
                    }),
                    titlecaseDetail({
                        title: 'Moneda',
                        displayValueFn: (item) => item.coin,
                    }),
                    textDetail({
                        title: 'Descripción',
                        displayValueFn: (item) => item.description,
                    }),
                ]
            },
            registerDataGroupDetail(),

        ],
        deleteButton: false,
        actionButtons: [
            {
                icon: 'delete',
                text: 'Eliminar',
                type: 'clickEvent',
                clickEvent: (item) => this.deleteBox(item),
                style: 'filled-button'
            }
        ]
    }
    get dataItem() {
        return this.configuration.dataItem!;
    }

    private showOpenButton(box: Box) {
        if (box.last_box_opening?.status != StatusModel.Abierto) {
            this.configuration.actionButtons = [
                {
                    icon: 'lock_open',
                    text: 'Apertura caja',
                    type: 'clickEvent',
                    clickEvent: () => this.openBoxOpening(),
                    style: 'filled-button'
                }
            ]
        } else {
            this.configuration.actionButtons = [];
        }
    }

    public openBoxOpening() {
        const dialogRef = this.dialog.open(BoxOpeningCreatePageComponent, {
            data: {
                ...this.dataItem()!,
            },
        });
        dialogRef.afterClosed().subscribe(async (response: BoxOpening) => {
            if (response && response.amount_init >= 0) {
                const body = { ...response, box_id: this.dataItem()!.id };
                await this.fetch.post('box-opening', body, { confirmDialog: false });
                this.databaseStorage.updateDataLocal(NameModuleDatabase.BoxOpenings);
                this.configuration.updateItemEvent?.emit(true);
            }
        });
    }

    public async closeBoxOpening() {
        const lastBoxOpeningId = this.dataItem()?.last_box_opening?.id;
        const response = await this.fetch.put<BoxOpening>(
            `box-opening/${lastBoxOpeningId}/close-box`,
            { status: StatusModel.Cerrado },
            {
                confirmDialog: {
                    title: '¿Estás seguro de cerrar caja?',
                    description: `Se efectuará el cierre de caja con el monto de ${this.dataItem()?.amount} ${this.dataItem()?.coin}`,
                }
            });
        this.databaseStorage.updateDataLocal(NameModuleDatabase.BoxOpenings);
        this.dataItem.update(item => ({
            ...item!,
            last_box_opening: {
                ...item!.last_box_opening!,
                ...response,
            }
        }))
        // this.showOpenButton(this.dataItem()!);
        this.configuration.updateItemEvent?.emit(true);
    }

    public async delete() {
        await this.fetch.delete<Box>(`box/${this.dataItem()?.id}`);
        this.router.navigate(['/box']);
    }

    private alertConfigurationMessage() {
        const item = this.dataItem()!;
        const lastBoxOpening = item.last_box_opening;
        const simbolCoin = item.coin == CoinEnum.SOLES ? 'S/. ' : '$ ';
        if (lastBoxOpening?.status == StatusModel.Abierto) {
            this.alertConfiguration.set({
                style: 'error',
                icon: 'info',
                title: 'Caja abierta',
                description: `<div class="item-detail__group">
                                    <div class="item-detail__group__row body-small">
                                        <span>Usuario de apertura</span>
                                        <span>:</span>
                                        <span>${lastBoxOpening.open_user?.name}</span>
                                    </div>
                                    <div class="item-detail__group__row body-small">
                                        <span>Fecha de apertura</span>
                                        <span>:</span>
                                        <span>${this.datePipe.transform(lastBoxOpening.date_open, 'longDate')}</span>
                                    </div>
                                    <div class="item-detail__group__row body-small">
                                        <span>Monto de apertura</span>
                                        <span>:</span>
                                        <span>${simbolCoin}${lastBoxOpening.amount_init}</span>
                                    </div>
                                </div>`,
                actionButton: {
                    icon: 'lock',
                    text: 'Cerrar Caja',
                    fn: () => this.closeBoxOpening()
                }
            });
        } else if (lastBoxOpening?.status == StatusModel.Cerrado) {
            this.alertConfiguration.set({
                style: 'primary',
                icon: 'info',
                title: 'Caja cerrada',
                description: `<div class="item-detail__group">
                                    <div class="item-detail__group__row body-small">
                                        <span>Usuario de cierre</span>
                                        <span>:</span>
                                        <span>${lastBoxOpening.close_user?.name}</span>
                                    </div>
                                    <div class="item-detail__group__row body-small">
                                        <span>Fecha de cierre</span>
                                        <span>:</span>
                                        <span>${this.datePipe.transform(lastBoxOpening.date_close, 'longDate')}</span>
                                    </div>
                                    <div class="item-detail__group__row body-small">
                                        <span>Monto de cierre</span>
                                        <span>:</span>
                                        <span>${simbolCoin}${lastBoxOpening.amount_exit}</span>
                                    </div>
                                </div>`,
                actionButton: {
                    icon: 'lock_open',
                    text: 'Aperturar Caja',
                    fn: () => this.openBoxOpening()
                }
            });
        } else {
            this.alertConfiguration!.set({
                icon: 'info',
                style: 'primary',
                title: 'Caja cerrada',
                description: `Para empezar a realizar movimientos deberá aperturar la caja`,
                actionButton: {
                    icon: 'lock_open',
                    text: 'Aperturar Caja',
                    fn: () => this.openBoxOpening()
                }
            });
        }

    }

    public deleteForm = new FormGroup({
        comment: new FormControl('', [Validators.required]),
    });

    get commentCtrl(): FormControl { return this.deleteForm.get('comment')! as FormControl; }
    private confirmDialog(data: ConfirmDialogData): Promise<boolean> {
        return new Promise((resolve) => {
            const dialogRef = this.matDialog.open(ConfirmDialogTemplateComponent, { data });
            dialogRef.afterClosed().subscribe((result) => resolve(result));
        });
    }

    private async deleteBox(item: Box): Promise<Box | null> {
        this.commentCtrl.reset('');
        const dialogData: ConfirmDialogData = {
            icon: 'error',
            title: '¿Está seguro de eliminar la caja?',
            description: '',
            templateRef: this.deleteFormTemplate,
            confirmButton: { disabled: true },
        };
        const subscribe = this.commentCtrl.valueChanges.subscribe(() => dialogData.confirmButton!.disabled = this.commentCtrl.invalid);
        const confirm = await this.confirmDialog(dialogData);
        subscribe.unsubscribe();
        if (!confirm) return null;
        const url = `box/${item.id}`;
        const body = {
            anulation_reason: this.commentCtrl.value
        };
        const request: RequestInitFetch = {
            confirmDialog: false,
            toast: {
                loading: 'Eliminando...',
                success: 'Caja eliminada',
                error: (error) => 'Error al eliminar la caja',
            }
        };
        const response = await this.fetch.delete<Box>(url)
        if (response) this.router.navigate(['/box']);

        return response;
    }
}
