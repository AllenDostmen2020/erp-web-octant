import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { ItemFormConfiguration } from '@interface/itemForm';

@Component({
  selector: 'app-client-document-create',
  standalone: true,
  imports: [ItemFormTemplateComponent],
  templateUrl: './client-document-create.component.html',
  styleUrl: './client-document-create.component.scss'
})
export class ClientDocumentCreateComponent {
  public formConfiguration: ItemFormConfiguration = {
    title: "Nuevo Documento",
    titleModule: "documento",
    type: "create",
    server: {
      url: 'client-document',
    },
    formGroup: new FormGroup({}),
  }
}
