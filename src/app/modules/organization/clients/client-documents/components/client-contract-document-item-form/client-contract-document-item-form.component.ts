import { CdkMenuModule } from '@angular/cdk/menu';
import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { ItemFormDocumentContractItem } from '../../pages/client-document-create/client-document-create.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, DecimalPipe, UpperCasePipe } from '@angular/common';
import { AutofocusDirectiveDirective } from '@directive/autofocus-directive.directive';
import { FetchService, RequestInitFetch } from '@service/fetch.service';

@Component({
    selector: 'app-client-contract-document-item-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CdkMenuModule,
        DecimalPipe,
        UpperCasePipe,
        AsyncPipe,
        AutofocusDirectiveDirective,
    ],
    templateUrl: './client-contract-document-item-form.component.html',
    styleUrl: './client-contract-document-item-form.component.scss'
})
export class ClientContractDocumentItemFormComponent {
    @Input({ required: true }) public item!: ItemFormDocumentContractItem;
    @Input({ required: true }) public index!: number;
    @Output() deleteItem: EventEmitter<void> = new EventEmitter();
    @Output() updateItem: EventEmitter<ItemFormDocumentContractItem> = new EventEmitter();

    private fetch = inject(FetchService);
    private timeoutSaveItem?: ReturnType<typeof setTimeout>;
    public loadingSaveItem = signal<boolean>(false);

    public form = new FormGroup({
        period: new FormControl(1, [Validators.required]),
    });

    get periodCtrl(): FormControl { return this.form.get('period') as FormControl; }

    public editFucusItems(item: ItemFormDocumentContractItem): void {
        item.edit = true;
        item.inputAutoFocus = 'period';
        this.patchValueForm();
    }

    private patchValueForm(): void {
        this.form.patchValue({
            period: Number(this.item.contract.period),
        }, { emitEvent: false });
    }

    public cancelEditItem(): void {
        this.item.edit = false;
        this.item.inputAutoFocus = undefined;
        this.clearTimeoutSaveItem();
    }

    public clearTimeoutSaveItem(): void {
        if (this.timeoutSaveItem) clearTimeout(this.timeoutSaveItem);
    }

    private isChangesItem(): boolean {
        return true;
        // return this.item.period != this.periodCtrl.value;
    }

    public saveItem(): void {
        if (this.form.invalid) return;
        else if (!this.isChangesItem()) this.timeoutSaveItem = setTimeout(() => this.cancelEditItem(), 250);
        else this.timeoutSaveItem = setTimeout(() => this.saveItemInServer(), 250);
    }

    private async saveItemInServer(): Promise<void> {
        this.loadingSaveItem.set(true);
        const body = this.form.value;
        // const response = await this.fetch.put<UnitCostsWorkforce>(`unit-cost-workforce/${this.item.id}`, body, { confirmDialog: false });
        this.cancelEditItem();
        // this.updateItem.emit({ ...this.item, ...response });
        this.loadingSaveItem.set(false);
    }

    public async deleteItemInServer(): Promise<void> {
        const requestInit: RequestInitFetch = {
            confirmDialog: {
                title: '¿Está seguro de eliminar mano de obra?',
                description: `Se eliminará el ítem. Esta acción no se puede revertir, pero se puede volver a agregar nuevamente`,
            },
            toast: {
                loading: 'Eliminando mano de obra...',
                success: 'Mano de obra eliminada',
                error: 'Error al eliminar mano de obra',
            }
        }
        // await this.fetch.delete(`unit-cost-workforce/${this.item.id}`, requestInit);
        this.deleteItem.emit();
    }
}
