import { Component, inject } from '@angular/core';
import { ClientBusinessUnitCreatePageComponent } from '../client-business-unit-create-page/client-business-unit-create-page.component';
import { ActivatedRoute } from '@angular/router';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';

@Component({
  selector: 'app-client-business-unit-edit-page',
  standalone: true,
  imports: [ItemFormTemplateComponent],
  templateUrl: './client-business-unit-edit-page.component.html',
  styleUrl: './client-business-unit-edit-page.component.scss'
})
export class ClientBusinessUnitEditPageComponent extends ClientBusinessUnitCreatePageComponent {
    constructor(
    ) {
        super();
        this.configuration.type = 'update';
        this.configuration.itemPathServer = 'client-business-unit';
        this.configuration.itemId = this.activatedRoute.snapshot.paramMap.get('id')!;
        this.configuration.hiddeFields = true;
    }
}
