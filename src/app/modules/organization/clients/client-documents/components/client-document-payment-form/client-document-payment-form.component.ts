import { Component, Input, Signal, WritableSignal, inject, input, signal } from '@angular/core';
import { Document } from '@interface/document';
import { FetchService } from '@service/fetch.service';
import { PaginatorData } from '@interface/paginator';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { AmountsByClient } from '../../pages/client-document-payment-create/client-document-payment-create.component';

export interface ExtDocument extends Document {
    total_recaudation: number;
}
@Component({
    selector: 'app-client-document-payment-form',
    standalone: true,
    imports: [
        AsyncPipe,
        CdkDropList,
        CdkDrag,
        DecimalPipe
    ],
    templateUrl: './client-document-payment-form.component.html',
    styleUrl: './client-document-payment-form.component.scss',
})
export class ClientDocumentPaymentFormComponent {
    public AmountsByClient = input.required<AmountsByClient | undefined>();
    private fetch = inject(FetchService);
    private activatedRoute = inject(ActivatedRoute);
    public documents: WritableSignal<ExtDocument[]> = signal([]);
    public documentsToPay: WritableSignal<ExtDocument[]> = signal([]);

    public totalsToPay = signal({
        total_detraction: 0,
        total_retention: 0,
        total_recaudation: 0,
        subtotal: 0,
        igv: 0,
        total: 0
    });
    public totals = signal({
        total_detraction: 0,
        total_retention: 0,
        total_recaudation: 0,
        subtotal: 0,
        igv: 0,
        total: 0,
    });

    ngOnInit() {
        this.getDocuments();
    }
    ngOnChanges() {
        console.log(this.AmountsByClient());
        this.sumItems()
    }

    private async getDocuments() {
        const clientId = this.activatedRoute.snapshot.parent?.paramMap.get('id');
        const response = (await this.fetch.get<PaginatorData<Document>>(`document?relations=documentItems&client_id=${clientId}`)).data;
        const documentsData = response.map((document) => ({ ...document, total_recaudation: Number(Number(document.total_detraction) + Number(document.total_retention)) }));
        this.documents.set(documentsData);
        this.sumItems();
    }

    drop(event: CdkDragDrop<any[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
            this.sumItems();
        }
    }

    public sumItems() {

        const document = this.documents();
        const subtotal = document.reduce((previousValue, item) => previousValue + Number(item.total_value), 0);
        const igv = document.reduce((previousValue, item) => previousValue + Number(item.total_taxes), 0);
        const totalDetraction = document.reduce((previousValue, item) => previousValue + Number(item.total_detraction), 0);
        const totalRetention = document.reduce((previousValue, item) => previousValue + Number(item.total_retention), 0);
        const totalRecaudation = document.reduce((previousValue, item) => previousValue + Number(item.total_recaudation), 0);
        this.totals.set({
            total_detraction: totalDetraction,
            total_retention: totalRetention,
            total_recaudation: totalRecaudation,
            subtotal: subtotal,
            igv: igv,
            total: subtotal + igv
        });
        const documentToPay = this.documentsToPay();
        const subtotalToPay = documentToPay.reduce((previousValue, item) => previousValue + Number(item.total_value), 0);
        const igvToPay = documentToPay.reduce((previousValue, item) => previousValue + Number(item.total_taxes), 0);
        const totalDetractionToPay = document.reduce((previousValue, item) => previousValue + Number(item.total_detraction), 0);
        const totalRetentionToPay = document.reduce((previousValue, item) => previousValue + Number(item.total_retention), 0);
        const totalRecaudationToPay = document.reduce((previousValue, item) => previousValue + Number(item.total_recaudation), 0);
        this.totalsToPay.set({
            total_detraction: totalDetractionToPay,
            total_retention: totalRetentionToPay,
            total_recaudation: totalRecaudationToPay,
            subtotal: subtotalToPay,
            igv: igvToPay,
            total: subtotalToPay + igvToPay
        });
    }
}
