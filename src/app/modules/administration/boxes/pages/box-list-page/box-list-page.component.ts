import { Component, TemplateRef, ViewChild, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConfirmDialogData, ConfirmDialogTemplateComponent } from '@component/confirm-dialog-template/confirm-dialog-template.component';
import { ItemListConfiguration, ItemListTemplateComponent, clickEventActionButton, firstLetterUppercaseColumn, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, numberColumn, textColumn } from '@component/item-list-template/item-list-template.component';
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
                    fn: async (item, index, { deleteItemFn }) => {
                      const response = await this.deleteBox(item);
                      if (response) deleteItemFn(item.id);
                      this.configList.updateListEvent?.emit();
                    },
                  }),
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
        return await this.fetch.delete<Box>(url);
    }
}
