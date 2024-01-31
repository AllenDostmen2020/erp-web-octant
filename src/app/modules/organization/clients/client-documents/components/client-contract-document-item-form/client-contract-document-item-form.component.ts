import { Component, Input, input } from '@angular/core';
import { ItemFormDocumentContractItem } from '../../pages/client-document-create/client-document-create.component';

@Component({
  selector: 'app-client-contract-document-item-form',
  standalone: true,
  imports: [],
  templateUrl: './client-contract-document-item-form.component.html',
  styleUrl: './client-contract-document-item-form.component.scss'
})
export class ClientContractDocumentItemFormComponent {
  @Input({ required: true }) public item!: ItemFormDocumentContractItem;
  @Input({ required: true }) public index!: number;
}
