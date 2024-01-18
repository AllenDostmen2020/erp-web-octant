import { Component } from '@angular/core';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { ItemFormConfiguration } from '@interface/itemForm';
import { DEFAULT_DISPLAY_FIELDS_FORM_USER, userFormGroup } from '../../helpers';

@Component({
  selector: 'app-user-create-page',
  standalone: true,
  imports: [ItemFormTemplateComponent],
  templateUrl: './user-create-page.component.html',
  styleUrl: './user-create-page.component.scss'
})
export class UserCreatePageComponent {
    public configuration: ItemFormConfiguration = {
        titleModule: 'usuario',
        type: 'create',
        formGroup: userFormGroup(),
        fields: [...DEFAULT_DISPLAY_FIELDS_FORM_USER],
        pathServer: 'user',
        loading: false,
      }
}
