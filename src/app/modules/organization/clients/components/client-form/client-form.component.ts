import { NgClass, UpperCasePipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { InputSelectLocalConfiguration, InputSelectTemplateComponent } from '@component/input-select-template/input-select-template.component';
import { TelCodeFormFieldTemplateComponent } from '@component/tel-code-form-field-template/tel-code-form-field-template.component';
import { CharactersOnlyDirective } from '@directive/characters-only.directive';
import { NumbersOnlyDirective } from '@directive/numbers-only.directive';
import { getDataPersonFormDocumentNumber } from '@helper/index';
import { DOCUMENT_TYPES, DocumentTypeEnum } from '@interface/baseModel';
import { NameModuleDatabase } from '@service/database-storage.service';
import { FetchService } from '@service/fetch.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    NgClass,
    MatInputModule,
    UpperCasePipe,
    InputSelectTemplateComponent,
    TelCodeFormFieldTemplateComponent,
    NumbersOnlyDirective,
    CharactersOnlyDirective
  ],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent {
  private fetch = inject(FetchService);
  @Input() public form!: FormGroup;
  public searchDocumentNumber: boolean = false;
  private abortController: AbortController = new AbortController();
  public minMaxlengthDocumentNumber: number = 12;

  get documentTypes(): DocumentTypeEnum[] {
    return DOCUMENT_TYPES;
  }
  get codePhoneCtrl(): FormControl {
    return this.form.get('code_phone') as FormControl;
  }
  get codeCellphoneCtrl(): FormControl {
    return this.form.get('code_cellphone') as FormControl;
  }
  get cellphoneCtrl(): FormControl {
    return this.form.get('cellphone') as FormControl;
  }
  get phoneCtrl(): FormControl {
    return this.form.get('phone') as FormControl;
  }
  get documentNumberCtrl(): FormControl {
    return this.form.get('document_number') as FormControl;
  }
  get documentTypeCtrl(): FormControl {
    return this.form.get('document_type') as FormControl;
  }
  get nameCtrl(): FormControl {
    return this.form.get('name') as FormControl;
  }
  get addressCtrl(): FormControl {
    return this.form.get('address') as FormControl;
  }

  public readonly documentTypeSelectConfiguration: InputSelectLocalConfiguration = {
    textLabel: 'Tipo de documento',
    placeholder: 'Seleccione un tipo de documento',
    local: { nameModuleDatabase: NameModuleDatabase.DocumentTypes },
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
