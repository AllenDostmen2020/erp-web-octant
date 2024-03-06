import { Component, Input, Signal, WritableSignal, inject, input, signal } from '@angular/core';
import { Document } from '@interface/document';
import { FetchService } from '@service/fetch.service';
import { PaginatorData } from '@interface/paginator';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { AmountsByClient } from '../../pages/client-document-payment-create/client-document-payment-create.component';

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
    public AmountsByClient = input.required<Signal<AmountsByClient|undefined>>();
    private fetch = inject(FetchService);
    private activatedRoute = inject(ActivatedRoute);
    public documents: WritableSignal<Document[]> = signal([]);
    public documentsToPay: WritableSignal<Document[]> = signal([]);

    public totalsToPay = signal({
        subtotal: 0,
        igv: 0,
        total: 0
    });
    public totals = signal({
        subtotal: 0,
        igv: 0,
        total: 0
    });

    ngOnInit() {
        this.getDocuments();
    }
    ngOnChanges() {
        this.sumItems()
    }

    private async getDocuments() {
        const clientId = this.activatedRoute.snapshot.parent?.paramMap.get('id');
        this.documents.set((await this.fetch.get<PaginatorData<Document>>(`document?relations=documentItems&client_id=${clientId}`)).data);
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
        this.totals.set({
            subtotal: subtotal,
            igv: igv,
            total: subtotal + igv
        });
        const documentToPay = this.documentsToPay();
        const subtotalToPay = documentToPay.reduce((previousValue, item) => previousValue + Number(item.total_value), 0);
        const igvToPay = documentToPay.reduce((previousValue, item) => previousValue + Number(item.total_taxes), 0);
        this.totalsToPay.set({
            subtotal: subtotalToPay,
            igv: igvToPay,
            total: subtotalToPay + igvToPay
        });
    }
}
