import { DecimalPipe } from '@angular/common';
import { Component, TemplateRef, ViewChild, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConfirmDialogData, ConfirmDialogTemplateComponent } from '@component/confirm-dialog-template/confirm-dialog-template.component';
import { ItemListConfiguration, ItemListTemplateComponent, changeStatusItemActionButton, clickEventActionButton, editItemActionButton, firstLetterUppercaseColumn, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, numberColumn, restoreItemActionButton, textColumn, viewItemActionButton } from '@component/item-list-template/item-list-template.component';
import { StatusModel } from '@interface/baseModel';
import { Box } from '@interface/box';
import { DatabaseStorageService, NameModuleDatabase } from '@service/database-storage.service';
import { FetchService, RequestInitFetch } from '@service/fetch.service';

@Component({
    selector: 'app-box-list-page',
    standalone: true,
    imports: [
        ItemListTemplateComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    providers: [DecimalPipe],
    templateUrl: './box-list-page.component.html',
    styleUrl: './box-list-page.component.scss'
})
export class BoxListPageComponent {
    @ViewChild('deleteFormTemplate', { static: true }) deleteFormTemplate!: TemplateRef<any>;
    private fetch = inject(FetchService);
    private matDialog = inject(MatDialog);
    private decimalPipe = inject(DecimalPipe);
    private databaseStorage = inject(DatabaseStorageService);
    public configList: ItemListConfiguration<Box> = {
        title: 'Cajas',
        server: {
            url: 'box',
            queryParams: {
                relations: 'account.bank,lastBoxOpening'
            }
        },
        parseDataFn: (data) => {
            this.databaseStorage.clearData(NameModuleDatabase.BoxOpenings);
            this.databaseStorage.clearData(NameModuleDatabase.Boxes);
            return data;
        },
        columns: signal([
            textColumn({
                title: 'Código',
                sort: { key: 'code' },
                displayValueFn: (item) => item.code,
            }),
            textColumn({
                title: 'Nombre',
                sort: { key: 'name' },
                routerLinkValue: { url: (item) => `../view/${item.id}` },
                gridColumn: '1fr',
                displayValueFn: (item) => item?.name ? item.name : '--',
            }),
            firstLetterUppercaseColumn({
                title: 'Tipo',
                sort: { key: 'type' },
                displayValueFn: (item) => item.type,
            }),
            textColumn({
                title: 'Cuenta',
                gridColumn: 'fit-content(160px)',
                displayValueFn: (item) => item.account?.name ?? '--',
            }),
            textColumn({
                title: 'Banco',
                gridColumn: 'fit-content(160px)',
                displayValueFn: (item) => item.account?.bank?.name ?? '--',
            }),
            firstLetterUppercaseColumn({
                title: 'Moneda',
                displayValueFn: (item) => item.account ? item.account.coin : item.coin,
            }),
            textColumn({
                title: 'Monto disponible',
                align: 'right',
                displayValueFn: (item) => this.decimalPipe.transform(item.amount, '1.2-2'),
            }),
            itemCreatedAtColumn(),
            itemUpdatedAtColumn(),
            itemStatusColumn(),
        ]),
        rows: {
            options: [
                viewItemActionButton(),
                editItemActionButton(),
                changeStatusItemActionButton({
                    icon: (item) => item.status == StatusModel.Activa ? 'do_not_disturb_on' : 'check_circle',
                    text: (item) => item.status == StatusModel.Activa ? 'Desactivar' : 'Activar',
                    statusValues: {
                        'activa': 'inactiva',
                        'inactiva': 'activa',
                        'activo': 'activa',
                    }
                }),
            ]
        }
    }

    public deleteForm = new FormGroup({
        comment: new FormControl('', [Validators.required]),
    });
}
