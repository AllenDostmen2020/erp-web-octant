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

    get documentTypes(): DocumentTypeEnum[] {
        return DOCUMENT_TYPES;
    }

    get documentTypeCtrl(): FormControl {
        return this.configuration.formGroup.get('document_type') as FormControl;
    }

    get documentNumberCtrl(): FormControl {
        return this.configuration.formGroup.get('document_number') as FormControl;
    }

    ngAfterView(): void {
       
        // this.documentTypeCtrl.valueChanges.subscribe(() => {            
        //     const documentSelected = this.documentTypes.find(d => d.toLowerCase() == this.documentTypeCtrl.value);
        //     if (!documentSelected) return;
        //     if (documentSelected.toLowerCase() == 'ruc') this.updateValidatorsForDocumentNumberCtrl(11);
        //     else if (documentSelected.toLowerCase() == 'dni') this.updateValidatorsForDocumentNumberCtrl(8);
        //     else if (documentSelected.toLowerCase() != 'dni' || documentSelected.toLowerCase() != 'dni') this.updateValidatorsForDocumentNumberCtrl(14);
        // });

    }

    // public updateValidatorsForDocumentNumberCtrl(length: number): void {
    //     this.documentNumberCtrl.setValidators([
    //         Validators.required,
    //         Validators.minLength(length),
    //         Validators.maxLength(length),
    //         Validators.pattern(`[0-9]+`),
    //     ]);
    //     this.documentNumberCtrl.updateValueAndValidity();
    //     this.minMaxlengthDocumentNumber = length;
    // }
}
