import { Component } from '@angular/core';
import { ItemFormConfiguration, ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { DEFAULT_DISPLAY_FIELDS_FORM_USER, userFormGroup } from '../../helpers';
import { DOCUMENT_TYPES, DocumentTypeEnum } from '@interface/baseModel';
import { FormControl } from '@angular/forms';

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
    server: { url: 'user' },
    loading: false,
  }


  get documentNumberCtrl(): FormControl {
    return this.configuration.formGroup.get('document_number') as FormControl;
  }
  get documentTypeCtrl(): FormControl {
    return this.configuration.formGroup.get('document_type') as FormControl;
  }

  ngOnInit() {
    this.documentTypeCtrl.valueChanges.subscribe((documentType) => {
      if (documentType == DocumentTypeEnum.DNI) this.configuration.fields![2].text!.maxLength = 8;
      else if (documentType == DocumentTypeEnum.RUC) this.configuration.fields![2].text!.maxLength = 11;
      else this.configuration.fields![2].text!.maxLength = 12;
    })
  }
}
