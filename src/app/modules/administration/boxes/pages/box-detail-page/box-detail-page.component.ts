import { DatePipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, ViewEncapsulation, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { ItemDetailTemplateComponent, registerDataGroupDetail } from '@component/item-detail-template/item-detail-template.component';
import { SpinnerDefaultComponent } from '@component/spinner-default/spinner-default.component';
import { StatusModel } from '@interface/baseModel';
import { Box } from '@interface/box';
import { BoxOpening } from '@interface/boxOpening';
import { ItemDetailConfiguration } from '@component/item-detail-template/item-detail-template.component';
import { DatabaseStorageService, NameModuleDatabase } from '@service/database-storage.service';
import { FetchService } from '@service/fetch.service';
import { BoxOpeningCreatePageComponent } from '../../box-openings/pages/box-opening-create-page/box-opening-create-page.component';

@Component({
    selector: 'app-box-detail-page',
    standalone: true,
    imports: [
        RouterLink,
        SpinnerDefaultComponent,
        DecimalPipe,
        TitleCasePipe,
        DatePipe,
        ItemDetailTemplateComponent
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './box-detail-page.component.html',
    styleUrl: './box-detail-page.component.scss'
})
export class BoxDetailPageComponent {
    private fetch = inject(FetchService);
    private dialog = inject(MatDialog);
    private router = inject(Router);
    private databaseStorage = inject(DatabaseStorageService);
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
        afterSetItemFn: (item) => this.showOpenButton(item),
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

        ]
    }
    get dataItem() {
        return this.configuration.dataItem!;
    }

    private showOpenButton(box: Box) {
        if (box.last_box_opening?.status != StatusModel.Abierto) {
            this.configuration.actionButtons = [
                {
                    id: 'open-surrender-box',
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
            if (response.amount_init) {
                const body = {
                    ...response,
                    box_id: this.dataItem()!.id,
                };
                await this.fetch.post('box-opening', body, { confirmDialog: false });
                this.databaseStorage.updateDataLocal(NameModuleDatabase.BoxOpenings);
                this.configuration.updateItemEvent?.emit(true);
            }
        });
    }

    public async closeBoxOpening(box_opening_id: number) {
        const response = await this.fetch.put<BoxOpening>(
            `box-opening/${box_opening_id}/update-status`,
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
    }

    public async delete() {
        await this.fetch.delete<Box>(`box/${this.dataItem()?.id}`);
        this.router.navigate(['/box']);
    }
}
