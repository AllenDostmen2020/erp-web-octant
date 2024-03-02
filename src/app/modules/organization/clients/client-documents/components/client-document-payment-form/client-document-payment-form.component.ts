import { Component, WritableSignal, inject, signal } from '@angular/core';
import { Document } from '@interface/document';
import { FetchService } from '@service/fetch.service';
import { PaginatorData } from '@interface/paginator';

@Component({
  selector: 'app-client-document-payment-form',
  standalone: true,
  templateUrl: './client-document-payment-form.component.html',
  styleUrl: './client-document-payment-form.component.scss'
})
export class ClientDocumentPaymentFormComponent {
  private fetch = inject(FetchService);
  // public documents = toSignal(from(this.fetch.get<PaginatorData<Document>>('document')).pipe(map(data => data.data)));
  public documents: WritableSignal<Document[]> = signal([]);;
  public documentsToPay: WritableSignal<Document[]> = signal([]);



  ngOnInit() {
    this.getDocuments();
  }

  private async getDocuments() {
    this.documents.set((await this.fetch.get<PaginatorData<Document>>('document')).data);
  }
}
