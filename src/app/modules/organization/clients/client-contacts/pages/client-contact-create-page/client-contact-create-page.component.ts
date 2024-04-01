import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DEFAULT_DISPLAY_FIELDS_FORM_CLIENT_CONTACT, clientContactFormGroup } from '../../helpers';
import { FormControl, Validators } from '@angular/forms';
import { ItemFormConfiguration, ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { DOCUMENT_TYPES, DocumentTypeEnum } from '@interface/baseModel';

@Component({
    selector: 'app-client-contact-create-page',
    standalone: true,
    imports: [ItemFormTemplateComponent],
    templateUrl: './client-contact-create-page.component.html',
    styleUrl: './client-contact-create-page.component.scss'
})
export class ClientContactCreatePageComponent {
    public activatedRoute = inject(ActivatedRoute);
    public minMaxlengthDocumentNumber: number = 12;
    public configuration: ItemFormConfiguration = {
        titleModule: 'contacto',
        type: 'create',
        formGroup: clientContactFormGroup({
            client_id: Number(this.activatedRoute.parent?.parent?.snapshot.paramMap.get('id')!)
        }),
        fields: [...DEFAULT_DISPLAY_FIELDS_FORM_CLIENT_CONTACT],
        server: { url: 'client-contact' },
    }

    get documentNumberCtrl(): FormControl {
        return this.configuration.formGroup.get('document_number') as FormControl;
      }
      get documentTypeCtrl(): FormControl {
        return this.configuration.formGroup.get('document_type') as FormControl;
      }
    
      ngOnInit() {
        this.documentTypeCtrl.valueChanges.subscribe((documentType) => {
          if (documentType == DocumentTypeEnum.DNI) this.configuration.fields![1].text!.maxLength = 8;
          else this.configuration.fields![2].text!.maxLength = 12;
        })
      }
}
