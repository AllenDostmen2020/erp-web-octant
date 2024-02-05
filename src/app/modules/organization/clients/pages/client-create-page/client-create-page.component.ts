import { Component, OnInit, inject } from '@angular/core';
import { ItemFormConfiguration } from '@component/item-form-template/item-form-template.component';
import { DEFAULT_DISPLAY_FIELDS_FORM_CLIENT, clientFormGroup } from '../../helpers';
import { FormControl, Validators } from '@angular/forms';
import { filter } from 'rxjs';
import { DOCUMENT_TYPES, DocumentTypeEnum } from '@interface/baseModel';
import { FetchService } from '@service/fetch.service';
import { getDataPersonFormDocumentNumber } from '@helper/index';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';

@Component({
    selector: 'app-client-create-page',
    standalone: true,
    templateUrl: './client-create-page.component.html',
    styleUrls: ['./client-create-page.component.css'],
    imports: [ItemFormTemplateComponent]
})
export class ClientCreatePageComponent {
    private fetch = inject(FetchService);
    public searchDocumentNumber: boolean = false;
    private abortController: AbortController = new AbortController();
    public minMaxlengthDocumentNumber: number = 12;
    public configuration: ItemFormConfiguration = {
        type: 'create',
        titleModule: 'cliente',
        formGroup: clientFormGroup(),
        fields: DEFAULT_DISPLAY_FIELDS_FORM_CLIENT,
        server: { url: 'client' },
    };

    get documentTypes(): DocumentTypeEnum[] {
        return DOCUMENT_TYPES;
    }
    get documentNumberCtrl(): FormControl {
        return this.configuration.formGroup.get('document_number') as FormControl;
    }
    get documentTypeCtrl(): FormControl {
        return this.configuration.formGroup.get('document_type') as FormControl;
    }
    get nameCtrl(): FormControl {
        return this.configuration.formGroup.get('name') as FormControl;
    }
    get addressCtrl(): FormControl {
        return this.configuration.formGroup.get('address') as FormControl;
    }
    get phoneCtrl(): FormControl {
        return this.configuration.formGroup.get('phone') as FormControl;
    }
    ngOnInit(): void {
        this.documentNumberCtrl.valueChanges
            .pipe(filter(() => this.documentNumberCtrl.valid && this.documentNumberCtrl.enabled))
            .subscribe(() => this.verifyDocuments());

        this.documentTypeCtrl.valueChanges.subscribe(() => {
            const documentSelected = this.documentTypes.find(d => d.toLowerCase() == this.documentTypeCtrl.value);
            if (!documentSelected) return;
            if (documentSelected.toLowerCase() == 'ruc') this.updateValidatorsForDocumentNumberCtrl(11);
            else if (documentSelected.toLowerCase() == 'dni') this.updateValidatorsForDocumentNumberCtrl(8);
            else if (documentSelected.toLowerCase() != 'dni' || documentSelected.toLowerCase() != 'dni') this.updateValidatorsForDocumentNumberCtrl(14);
        });
        this.phoneCtrl.valueChanges.subscribe((value) => this.phoneCtrl.setValue(value.replace(/[^0-9]/gi, ''), { emitEvent: false }));
        this.documentNumberCtrl.valueChanges.subscribe((value) => this.documentNumberCtrl.setValue(value.replace(/[^0-9]/gi, ''), { emitEvent: false }));

    }

    public updateValidatorsForDocumentNumberCtrl(length: number): void {
        console.log(length);

        this.documentNumberCtrl.setValidators([
            Validators.required,
            Validators.minLength(length),
            Validators.maxLength(length),
            Validators.pattern(`[0-9]+`),
        ]);
        this.documentNumberCtrl.updateValueAndValidity();
        this.minMaxlengthDocumentNumber = length;
    }

    private async verifyDocuments() {
        if (this.searchDocumentNumber) {
            this.abortController.abort();
            this.abortController = new AbortController();
        }
        this.searchDocumentNumber = true;
        const documentSelected = this.documentTypes.find(item => item.toLocaleLowerCase() == this.documentTypeCtrl.value);
        const documentNumber = this.documentNumberCtrl.value ?? '';
        if (documentSelected && (documentSelected.toLowerCase() == 'ruc' && documentNumber.length == 11 || documentSelected.toLowerCase() == 'dni' && documentNumber.length == 8)) {
            try {
                const data = await getDataPersonFormDocumentNumber(this.fetch, documentNumber, this.abortController);
                this.searchDocumentNumber = false;
                if (data?.full_name) {
                    this.nameCtrl.setValue(data.full_name);
                    this.nameCtrl.disable();
                    this.addressCtrl.setValue(data.address ?? null);
                } else {
                    this.nameCtrl.setValue(null);
                    this.addressCtrl.setValue(null);
                    this.nameCtrl.enable();
                }
            } catch (error: any) {
                if (error.name != 'AbortError') {
                    this.searchDocumentNumber = false;
                }
            }
        } else {
            this.nameCtrl.setValue(null);
            this.nameCtrl.enable();
        }
    }

}
