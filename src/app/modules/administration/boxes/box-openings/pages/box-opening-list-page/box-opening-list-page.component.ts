import { Component, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ItemListConfiguration, ItemListTemplateComponent, dateColumn, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, numberColumn, textColumn, userColumn, viewItemActionButton } from '@component/item-list-template/item-list-template.component';
import { Box } from '@interface/box';
import { BoxOpening } from '@interface/boxOpening';
import { DatabaseStorageService, NameModuleDatabase } from '@service/database-storage.service';
import { FetchService } from '@service/fetch.service';
import { BoxOpeningCreatePageComponent } from '../box-opening-create-page/box-opening-create-page.component';
import { EventsService } from '@service/events.service';
import { StatusModel } from '@interface/baseModel';

@Component({
  selector: 'app-box-opening-list-page',
  standalone: true,
  imports: [ItemListTemplateComponent],
  templateUrl: './box-opening-list-page.component.html',
  styleUrl: './box-opening-list-page.component.scss'
})
export class BoxOpeningListPageComponent {
    private activatedRoute = inject(ActivatedRoute);
    private fetch = inject(FetchService);
    private dialog = inject(MatDialog);
    private events = inject(EventsService);
    private databaseStorage = inject(DatabaseStorageService);
    public configList: ItemListConfiguration<BoxOpening> = {
        server: {
            url: 'box-opening',
            queryParams: {
                box_id:  this.activatedRoute.parent?.parent?.snapshot?.paramMap.get('id')
            },
        },
        title: 'Aperturas de caja',
        createButton: false,

        columns: signal([
            textColumn({
                title: 'Código',
                sort: { key: 'code' },
                displayValueFn: (item) => item.code,
            }),
            userColumn({
                title: 'Usuario de apertura',
                gridColumn: '1fr',
                displayValueFn: (item) => item.open_user_id,
            }),
            userColumn({
                title: 'Usuario de cierre',
                gridColumn: '1fr',
                displayValueFn: (item) => item.close_user_id,
            }),
            dateColumn({
                title: 'Fecha de apertura',
                dateFormat: 'dd/MM/yyyy hh:mm a',
                displayValueFn: (item) => item.date_open,
            }),
            numberColumn({
                title: 'Monto de apertura',
                displayValueFn: (item) => item.amount_init,
            }),
            numberColumn({
                title: 'Monto de cierre',
                displayValueFn: (item) => item.amount_exit,
            }),
            itemCreatedAtColumn(),
            itemUpdatedAtColumn(),
            itemStatusColumn(),
        ]),
        rows: {
            options: [
              viewItemActionButton()
            ]
          }
    }

    public item?: Box;

    ngOnInit() {
        this.getBox();
    }

    private getBox(): void {
        const id = (this.activatedRoute.parent?.parent?.snapshot.params as any).id;
        this.fetch
            .get<Box>(
                `box/${id}?relations=lastBoxOpening.openUser`
            )
            .then((box) => {
                this.item = box;
            })
            .catch((err) => { });
    }

    public openBoxOpening() {
        const dialogRef = this.dialog.open(BoxOpeningCreatePageComponent, {
            data: {
                ...this.item,
            },
        });
        dialogRef.afterClosed().subscribe(async (response: BoxOpening) => {
            if (response && response.amount_init >= 0) {
                const body = { ...response, box_id: this.item!.id };
                await this.fetch.post('box-opening', body);
                this.databaseStorage.updateDataLocal(NameModuleDatabase.BoxOpenings);
                this.getBox();
                this.events.emitEvent('box-opening_created', response);
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
                    description: `Se efectuará el cierre de caja con el monto de ${this.item!.amount} ${this.item!.coin}`,
                }
            });
        this.databaseStorage.updateDataLocal(NameModuleDatabase.BoxOpenings);
        this.item!.last_box_opening = {
            ...this.item!.last_box_opening,
            ...response as BoxOpening,
        }
    }
}
