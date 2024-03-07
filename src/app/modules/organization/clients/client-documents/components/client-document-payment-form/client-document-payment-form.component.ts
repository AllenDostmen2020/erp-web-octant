import { Component, Input, WritableSignal, computed, effect, inject, input, signal } from '@angular/core';
import { Document } from '@interface/document';
import { FetchService } from '@service/fetch.service';
import { PaginatorData } from '@interface/paginator';
import { DecimalPipe } from '@angular/common';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { ClientAmounts } from '../../pages/client-document-payment-create/client-document-payment-create.component';
import { ToastService } from '@service/toast.service';
import { FormControl, FormGroup } from '@angular/forms';

export interface ExtDocument extends Document {
    total_recaudation: number;
}
@Component({
    selector: 'app-client-document-payment-form',
    standalone: true,
    imports: [
        CdkDropList,
        CdkDrag,
        DecimalPipe
    ],
    templateUrl: './client-document-payment-form.component.html',
    styleUrl: './client-document-payment-form.component.scss',
})
export class ClientDocumentPaymentFormComponent {
    @Input({ required: true }) form!: FormGroup;
    public clientAmounts = input.required<ClientAmounts>();
    private fetch = inject(FetchService);
    private toast = inject(ToastService);
    private activatedRoute = inject(ActivatedRoute);
    public documents: WritableSignal<ExtDocument[]> = signal([]);
    public documentsToPay: WritableSignal<ExtDocument[]> = signal([]);

    public totalsToPay = computed(() => {
        const documents = this.documentsToPay();
        const subtotal = documents.reduce((previousValue, item) => previousValue + Number(item.total_value), 0);
        const igv = documents.reduce((previousValue, item) => previousValue + Number(item.total_taxes), 0);
        const totalDetraction = documents.reduce((previousValue, item) => previousValue + Number(item.total_detraction), 0);
        const totalRetention = documents.reduce((previousValue, item) => previousValue + Number(item.total_retention), 0);
        const totalRecaudation = documents.reduce((previousValue, item) => previousValue + Number(item.total_recaudation), 0);
        return {
            total_detraction: totalDetraction,
            total_retention: totalRetention,
            total_recaudation: totalRecaudation,
            subtotal: subtotal,
            igv: igv,
            total: subtotal + igv
        };
    });

    public totals = computed(() => {
        const documents = this.documents();
        const subtotal = documents.reduce((previousValue, item) => previousValue + Number(item.total_value), 0);
        const igv = documents.reduce((previousValue, item) => previousValue + Number(item.total_taxes), 0);
        const totalDetraction = documents.reduce((previousValue, item) => previousValue + Number(item.total_detraction), 0);
        const totalRetention = documents.reduce((previousValue, item) => previousValue + Number(item.total_retention), 0);
        const totalRecaudation = documents.reduce((previousValue, item) => previousValue + Number(item.total_recaudation), 0);
        return {
            total_detraction: totalDetraction,
            total_retention: totalRetention,
            total_recaudation: totalRecaudation,
            subtotal: subtotal,
            igv: igv,
            total: subtotal + igv
        };
    });

    constructor() {
        effect(() => {
            const documentsToPay = this.documentsToPay();
            if (documentsToPay.length > 0) this.documentIdsCtrl.setValue(documentsToPay.map((document) => document.id));
            else this.documentIdsCtrl.setValue(null);
        });
    }

    get documentIdsCtrl() {
        return this.form.get('document_ids') as FormControl;
    }

    ngOnInit() {
        this.getDocuments();
    }

    private async getDocuments() {
        const clientId = this.activatedRoute.snapshot.parent?.paramMap.get('id');
        const data = (await this.fetch.get<PaginatorData<Document>>(`document?relations=documentItems&client_id=${clientId}`)).data;
        const parseData = data.map((document) => ({ ...document, total_recaudation: Number(document.total) - (Number(document.total_detraction ?? 0) + Number(document.total_retention ?? 0)) }));
        this.documents.set(parseData);
    }

    drop(event: CdkDragDrop<any[]>, container: 'uno' | 'dos') {
        if (event.previousContainer !== event.container) {
            if (container === 'uno') {
                this.documents.update((documents) => documents.toSpliced(event.currentIndex, 0, this.documentsToPay()[event.previousIndex]))
                this.documentsToPay.update((documents) => documents.toSpliced(event.previousIndex, 1))
            } else {
                const disponible = this.clientAmounts().recaudation_amount;
                const curentRecaudation = this.totalsToPay().total_recaudation;
                const currentItem = this.documents()[event.previousIndex];
                if ((curentRecaudation + currentItem.total_recaudation) > disponible) {
                    this.toast.open('No se puede agregar el documento, el monto de recaudación supera el monto disponible')
                    return;
                }
                this.documentsToPay.update((documents) => documents.toSpliced(event.currentIndex, 0, currentItem))
                this.documents.update((documents) => documents.toSpliced(event.previousIndex, 1))
            }
        }
    }
}
