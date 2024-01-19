import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemFormConfiguration } from '@interface/itemForm';
import { DEFAULT_DISPLAY_FIELDS_FORM_CLIENT_CONTACT, clientContactFormGroup } from '../../helpers';
import { FormControl } from '@angular/forms';
import { DocumentTypeEnum } from '@interface/baseModel';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';

@Component({
    selector: 'app-client-contact-create-page',
    standalone: true,
    imports: [ItemFormTemplateComponent],
    templateUrl: './client-contact-create-page.component.html',
    styleUrl: './client-contact-create-page.component.scss'
})
export class ClientContactCreatePageComponent {
    public activatedRoute = inject(ActivatedRoute);
    public configuration: ItemFormConfiguration = {
        titleModule: 'contacto',
        type: 'create',
        formGroup: clientContactFormGroup({
            client_id: Number(this.activatedRoute.parent?.parent?.snapshot.paramMap.get('id')!)
        }),
        fields: [...DEFAULT_DISPLAY_FIELDS_FORM_CLIENT_CONTACT],
        pathServer: 'client-contact',

        itemId: this.activatedRoute.snapshot.paramMap.get('id')!, // for edit
    }

    get documentTypeCtrl(): FormControl {
        return this.configuration.formGroup.get('document_type') as FormControl;
    }

    get documentNumberCtrl(): FormControl {
        return this.configuration.formGroup.get('document_number') as FormControl;
    }

    ngAfterViewInit(): void {
        // this.documentTypeCtrl.valueChanges.subscribe(value => {
        //     const index = this.configuration.fields!.findIndex(f => f.text?.formControlName == 'document_number');
        //     if (index != -1) this.configuration.fields![index].text?.maxLength  = value == DocumentTypeEnum.DNI ? 8 : value == DocumentTypeEnum.RUC ? 11 : 14;
        // })
    }
}
