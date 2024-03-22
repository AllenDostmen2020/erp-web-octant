import { Component, inject } from '@angular/core';
import { ClientCreatePageComponent } from '../client-create-page/client-create-page.component';
import { ActivatedRoute } from '@angular/router';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { FormControl } from '@angular/forms';
import { ClientFormComponent } from '../../components/client-form/client-form.component';

@Component({
  selector: 'app-client-edit-page',
  standalone: true,
  imports: [ItemFormTemplateComponent, ClientFormComponent],
  templateUrl: './client-edit-page.component.html',
  styleUrl: './client-edit-page.component.scss'
})
export class ClientEditPageComponent extends ClientCreatePageComponent{

    constructor(
    ) {
        super();
        this.configuration.type = 'update';
        this.configuration.hiddeFields = true;
    }

    get documentTypeCtrl(): FormControl {
      return this.configuration.formGroup.get('document_type') as FormControl;
    }
    get documentNumberCtrl(): FormControl {
      return this.configuration.formGroup.get('document_number') as FormControl;
    }
    get nameCtrl(): FormControl {
      return this.configuration.formGroup.get('name') as FormControl;
    }

    ngOnInit(): void {
      this.documentTypeCtrl.disable();
      this.documentNumberCtrl.disable();
      this.nameCtrl.disable();
    }
}
