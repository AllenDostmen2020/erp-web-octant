import { DatePipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, ViewEncapsulation, WritableSignal, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { SpinnerDefaultComponent } from '@component/spinner-default/spinner-default.component';
import { CoinEnum, StatusModel } from '@interface/baseModel';
import { Box } from '@interface/box';
import { BoxOpening } from '@interface/boxOpening';
import { ItemDetailConfiguration, ItemDetailTemplateComponent, actionButton, registerDataGroupDetail } from '@component/item-detail-template/item-detail-template.component';
import { DatabaseStorageService, NameModuleDatabase } from '@service/database-storage.service';
import { FetchService } from '@service/fetch.service';
import { BoxOpeningCreatePageComponent } from '../../box-openings/pages/box-opening-create-page/box-opening-create-page.component';
import { AlertConfiguration, AlertTemplateComponent } from '@component/alert-template/alert-template.component';

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
        AlertTemplateComponent
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './box-detail-page.component.html',
    styleUrl: './box-detail-page.component.scss',
    providers: [DatePipe]
})
export class BoxDetailPageComponent {
    private fetch = inject(FetchService);
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
                relations: 'account.bank,lastBoxOpening.openUser'
            },
        },
        subtitle: false,
        updateItemEvent: new EventEmitter(),
        backButton: false,
        afterSetItemFn: (item) => {
            this.showOpenButton(item);
            this.alertConfigurationMessage();
        },
        groups: [
            {
                details: [
                    {
                        title: 'Tipo',
                        displayValueFn: (item) => item.type,
                        type: 'titlecase',
                    },
                    {
                        title: 'Nombre',
                        displayValueFn: (item) => item.name,
                        type: 'titlecase'
                    },
                    {
                        title: 'Monto disponible',
                        displayValueFn: (item) => item.amount,
                        type: 'currency',
                    },
                    {
                        title: 'N° de cuenta',
                        displayValueFn: (item) => item.account?.number
                    },
                    {
                        title: 'Banco',
                        displayValueFn: (item) => item.account?.bank?.name
                    },
                    {
                        title: 'Moneda',
                        displayValueFn: (item) => item.coin,
                        type: 'titlecase',
                    },
                    {
                        title: 'Descripción',
                        displayValueFn: (item) => item.description
                    },
                ]
            },
            registerDataGroupDetail(),

        ],
    }
    get dataItem() {
        return this.configuration.dataItem!;
    }

    private showOpenButton(box: Box) {
        if (box.last_box_opening?.status != StatusModel.Abierto) {
            this.configuration.actionButtons = [
                actionButton({
                    icon: 'lock_open',
                    text: 'Apertura caja',
                    clickEvent: () => this.openBoxOpening(),
                    style: 'filled-button',
                }),
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
        this.showOpenButton(this.dataItem()!);
        this.configuration.updateItemEvent?.emit(true);
    }

    public async delete() {
        await this.fetch.delete<Box>(`box/${this.dataItem()?.id}`);
        this.router.navigate(['/box']);
    }

    private alertConfigurationMessage() {
        const lastBoxOpening = this.dataItem()?.last_box_opening!;
        const simbolCoin = this.dataItem()?.coin == CoinEnum.SOLES ? 'S/. ' : '$ ';
        if (lastBoxOpening.status == StatusModel.Abierto) {
            this.alertConfiguration!.set({
                style: 'error',
                icon: 'info',
                title: 'Caja abierta',
                description: `<div class="text-skin-base grid grid-cols-[auto,auto,1fr] gap-x-1">
                                    <div class="contents">
                                        <span class="font-medium">Usuario de apertura</span>
                                        <span>:</span>
                                        <span>${lastBoxOpening.open_user?.name}</span>
                                    </div>
                                    <div class="contents">
                                        <span class="font-medium">Fecha de apertura</span>
                                        <span>:</span>
                                        <span>${this.datePipe.transform(lastBoxOpening.date_open, 'longDate')}</span>
                                    </div>
                                    <div class="contents">
                                        <span class="font-medium">Monto inicial</span>
                                        <span>:</span>
                                        <span>${simbolCoin}${lastBoxOpening.amount_init}</span>
                                    </div>
                                </div>`,
                actionButton: {
                    icon: 'lock',
                    text: 'Cerrar',
                    fn: () => this.closeBoxOpening()
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
                    text: 'Aperturar',
                    fn: () => this.openBoxOpening()
                }
            });
        }

    }
}
