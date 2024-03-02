import { Component, ViewEncapsulation, WritableSignal, inject, signal } from '@angular/core';
import { Document } from '@interface/document';
import { FetchService } from '@service/fetch.service';
import { PaginatorData } from '@interface/paginator';
import { AsyncPipe } from '@angular/common';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-document-payment-form',
  standalone: true,
  imports: [
    AsyncPipe,
    CdkDropList,
    CdkDrag,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './client-document-payment-form.component.html',
  styleUrl: './client-document-payment-form.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ClientDocumentPaymentFormComponent {
  private fetch = inject(FetchService);
  private activatedRoute = inject(ActivatedRoute);
  // public documents = toSignal(from(this.fetch.get<PaginatorData<Document>>('document')).pipe(map(data => data.data)));
  public documents: WritableSignal<Document[]> = signal([]);;
  public documentsToPay: WritableSignal<Document[]> = signal([]);


  public listFrom: Document[] = [];
  public listTo:Document[] = [];

  ngOnInit() {
    this.getDocuments();
  }

  private async getDocuments() {
    const clientId = this.activatedRoute.snapshot.parent?.paramMap.get('id');
    this.documents.set((await this.fetch.get<PaginatorData<Document>>(`document?relations=documentItems&client_id=${clientId}`)).data);
    this.listFrom = this.documents();
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        console.log('1: ',this.listTo);

    } else {
        transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex,
        );
    }
}
}
