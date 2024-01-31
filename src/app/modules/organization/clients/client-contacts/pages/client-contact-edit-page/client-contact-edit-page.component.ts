import { Component } from '@angular/core';
import { ClientContactCreatePageComponent } from '../client-contact-create-page/client-contact-create-page.component';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';

@Component({
  selector: 'app-client-contact-edit-page',
  standalone: true,
  imports: [ItemFormTemplateComponent],
  templateUrl: './client-contact-edit-page.component.html',
  styleUrl: './client-contact-edit-page.component.scss'
})
export class ClientContactEditPageComponent extends ClientContactCreatePageComponent {
  constructor() {
    super();
    this.configuration.type = 'update';
    this.configuration.hiddeFields = true;
  }
}
