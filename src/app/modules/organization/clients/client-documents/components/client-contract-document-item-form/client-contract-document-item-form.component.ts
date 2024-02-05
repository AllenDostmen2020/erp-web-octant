import { CdkMenuModule } from '@angular/cdk/menu';
import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { ItemFormDocumentContractItem } from '../../pages/client-document-create/client-document-create.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, DecimalPipe, UpperCasePipe } from '@angular/common';
import { AutofocusDirectiveDirective } from '@directive/autofocus-directive.directive';

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

    private timeoutSaveItem?: ReturnType<typeof setTimeout>;
    public loadingSaveItem = signal<boolean>(false);

    public form = new FormGroup({
        period: new FormControl(1, [Validators.required]),
    });

    get periodCtrl(): FormControl { return this.form.get('period') as FormControl; }

    public editFucusItems(): void {
        this.item.edit = true;
        this.item.inputAutoFocus = 'period';
        this.patchValueForm();
    }

    private patchValueForm(): void {
        this.form.patchValue({
            period: Number(this.item.periods),
        }, { emitEvent: false });
    }

    public cancelEditItem(): void {
        this.item.edit = false;
        this.clearTimeoutSaveItem();
    }

    public clearTimeoutSaveItem(): void {
        if (this.timeoutSaveItem) clearTimeout(this.timeoutSaveItem);
    }

    private isChangesItem(): boolean {
        return this.item.periods != this.periodCtrl.value;
    }

    public saveItem(): void {
        if (this.form.invalid) return;
        else if (!this.isChangesItem()) this.timeoutSaveItem = setTimeout(() => {
            this.cancelEditItem();
            this.updateItem.emit();
        }, 250);
        else this.timeoutSaveItem = setTimeout(() => this.saveItemInServer(), 250);
    }

    private async saveItemInServer() {
        this.loadingSaveItem.set(true);
        const body = this.form.value;
        this.item.periods = body.period!;
        this.cancelEditItem();
        this.loadingSaveItem.set(false);
        this.updateItem.emit();
    }

    public async deleteItemInServer() {
        this.deleteItem.emit();
    }
}
