import { Component, Input, WritableSignal, computed, effect, inject, input, signal } from '@angular/core';
import { Document } from '@interface/document';
import { FetchService } from '@service/fetch.service';
import { PaginatorData } from '@interface/paginator';
import { DecimalPipe } from '@angular/common';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '@service/toast.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Sort, MatSortModule } from '@angular/material/sort';
import { ClientBox } from '@interface/clientBox';

export interface ExtDocument extends Document {
    total_recaudation: number;
}
@Component({
    selector: 'app-client-document-payment-form',
    standalone: true,
    imports: [
        CdkDropList,
        CdkDrag,
        DecimalPipe,
        MatSortModule
    ],
    templateUrl: './client-document-payment-form.component.html',
    styleUrl: './client-document-payment-form.component.scss',
})
export class ClientDocumentPaymentFormComponent {
    @Input({ required: true }) form!: FormGroup;
    public clientAmounts = input.required<ClientBox[]>();
    private fetch = inject(FetchService);
    private toast = inject(ToastService);
    private activatedRoute = inject(ActivatedRoute);
    public documents: WritableSignal<ExtDocument[]> = signal([]);
    public documentsToPay: WritableSignal<ExtDocument[]> = signal([]);

    public totalsToPay = computed(() => {
        const documents = this.documentsToPay();
        const subtotal = documents.reduce((previousValue, item) => previousValue + Number(item.total_value), 0);
        const igv = documents.reduce((previousValue, item) => previousValue + Number(item.total_igv), 0);
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
        const igv = documents.reduce((previousValue, item) => previousValue + Number(item.total_igv), 0);
        const totalDetraction = documents.reduce((previousValue, item) => previousValue + Number(item.total_detraction), 0);
        const totalRetention = documents.reduce((previousValue, item) => previousValue + Number(item.total_retention), 0);
        const totalRecaudation = documents.reduce((previousValue, item) => previousValue + Number(item.total_recaudation), 0);
        return {
            total_detraction: totalDetraction,
            total_retention: totalRetention,
            total_recaudation: totalRecaudation,
            subtotal: subtotal,
            igv: igv,
            total: subtotal + igv,
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
        const data = (await this.fetch.get<PaginatorData<Document>>(`document?status=emitida&order=correlative|ASC&relations=documentItems&client_id=${clientId}`)).data;
        const parseData = data.map((document) => ({ ...document, total_recaudation: (document.total) - ((document.total_detraction ?? 0) + (document.total_retention ?? 0)) }));
        this.documents.set(parseData);
    }

    sortData(sort: Sort | any) {
        if (!sort.active || sort.direction === '') {
            this.documents.update((items) => {
                return items.sort((a, b) => a.correlative - b.correlative)
            })
            return;
        }
        this.documents.update(items=>{
            return items.sort((a, b)=> {
                const isAsc = sort.direction === 'asc';
            switch (sort.active) {
              case 'name':
                return compare(a.correlative, b.correlative, isAsc);
              case 'detraction':
                return compare(a.total_detraction, b.total_detraction, isAsc);
              case 'retention':
                return compare(a.total_retention, b.total_retention, isAsc);
              case 'recaudation':
                return compare(a.total_recaudation, b.total_recaudation, isAsc);
              case 'total':
                return compare(a.total, b.total, isAsc);
              default:
                return 0;
            }
            })
        })
    }


    drop(event: CdkDragDrop<any[]>, container: 'uno' | 'dos') {
        if (event.previousContainer !== event.container) {
            if (container === 'uno') {
                this.documents.update((documents) => documents.toSpliced(event.currentIndex, 0, this.documentsToPay()[event.previousIndex]))
                this.documentsToPay.update((documents) => documents.toSpliced(event.previousIndex, 1))
            } else {
                const recaudationClientBox = this.clientAmounts().find(item=> item.type.toLowerCase() == 'recaudación');
                const detractionClientBox = this.clientAmounts().find(item=> item.type.toLowerCase() == 'detracción');
                const retentionClientBox = this.clientAmounts().find(item=> item.type.toLowerCase() == 'retención');
                const curentRecaudation = this.totalsToPay().total_recaudation;
                const currentDetraction = this.totalsToPay().total_detraction;
                const currentRetention = this.totalsToPay().total_retention;
                const currentItem = this.documents()[event.previousIndex];
                if (((curentRecaudation + currentItem.total_recaudation) > recaudationClientBox!.amount_available)) {
                    this.toast.open('No se puede agregar el documento, el monto de recaudación supera el monto disponible')
                    return;
                }
                if (((currentDetraction + currentItem.total_detraction) > detractionClientBox!.amount_available)) {
                    this.toast.open('No se puede agregar el documento, el monto de detracción supera el monto disponible')
                    return;
                }
                if (((currentRetention + currentItem.total_retention) > retentionClientBox!.amount_available)) {
                    this.toast.open('No se puede agregar el documento, el monto de retención supera el monto disponible')
                    return;
                }
                this.documentsToPay.update((documents) => documents.toSpliced(event.currentIndex, 0, currentItem))
                this.documents.update((documents) => documents.toSpliced(event.previousIndex, 1))
            }
        }
    }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
