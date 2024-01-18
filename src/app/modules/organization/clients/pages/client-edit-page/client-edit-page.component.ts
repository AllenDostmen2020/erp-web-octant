import { Component, inject } from '@angular/core';
import { ClientCreatePageComponent } from '../client-create-page/client-create-page.component';
import { ActivatedRoute } from '@angular/router';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';

@Component({
  selector: 'app-client-edit-page',
  standalone: true,
  imports: [ItemFormTemplateComponent],
  templateUrl: './client-edit-page.component.html',
  styleUrl: './client-edit-page.component.scss'
})
export class ClientEditPageComponent extends ClientCreatePageComponent{
    private activatedRoute = inject(ActivatedRoute);

    constructor(
    ) {
        super();
        this.configuration.type = 'update';
        this.configuration.itemPathServer = 'client';
        this.configuration.itemId = this.activatedRoute.snapshot.paramMap.get('id')!;
        this.configuration.hiddeFields = true;
    }
}
