import { Component, TemplateRef, ViewChild, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConfirmDialogData, ConfirmDialogTemplateComponent } from '@component/confirm-dialog-template/confirm-dialog-template.component';
import { ItemListConfiguration, ItemListTemplateComponent, clickEventActionButton, firstLetterUppercaseColumn, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, numberColumn, restoreItemActionButton, textColumn } from '@component/item-list-template/item-list-template.component';
import { StatusModel } from '@interface/baseModel';
import { Box } from '@interface/box';
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
    templateUrl: './box-list-page.component.html',
    styleUrl: './box-list-page.component.scss'
})
export class BoxListPageComponent {
    @ViewChild('deleteFormTemplate', { static: true }) deleteFormTemplate!: TemplateRef<any>;
    private fetch = inject(FetchService);
    private matDialog = inject(MatDialog);
    public configList: ItemListConfiguration<Box> = {
        server: {
            url: 'box',
            queryParams: {
                relations: 'account,lastBoxOpening'
            }
        },
        title: 'Cajas',
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
            firstLetterUppercaseColumn({
                title: 'Moneda',
                displayValueFn: (item) => item.account ? item.account.coin : item.coin,
            }),
            textColumn({
                title: 'Cuenta',
                gridColumn: 'fit-content(160px)',
                displayValueFn: (item) => item.account?.name ?? '--',
            }),
            numberColumn({
                title: 'Monto disponible',
                displayValueFn: (item) => item.amount,
            }),
            itemCreatedAtColumn(),
            itemUpdatedAtColumn(),
            itemStatusColumn(),
        ]),
        rows: {
            options: [
                clickEventActionButton({
                    text: 'Eliminar',
                    icon: 'delete',
                    fn: async (item, index, { updateChangesItemFn }) => {
                        const response = await this.deleteBox(item);
                        if (response) updateChangesItemFn(index, { ...item, ...response });
                        this.configList.updateListEvent?.emit();
                    },
                    // hidden: (item)=> item.amount > 0 || item.last_box_opening?.status == StatusModel.Abierto || item.status == StatusModel.Eliminado
                }),
                restoreItemActionButton()
            ]
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
        const url = `delete-box/${item.id}`;
        const body = {
            delete_comment: this.commentCtrl.value
        };
        const request: RequestInitFetch = {
            confirmDialog: false,
            toast: {
                loading: 'Eliminando...',
                success: 'Caja eliminada',
                error: (error) => error.error?.message ?? 'Error al eliminar caja',
            }
        };
        const response = await this.fetch.put<Box>(url, body, request);
        console.log(response);

        return response;
    }
}
